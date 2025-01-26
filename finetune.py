from datasets import load_dataset, DatasetDict
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    DataCollatorForLanguageModeling,
    Trainer,
    TrainingArguments,
    EarlyStoppingCallback
)
from peft import (
    prepare_model_for_kbit_training,
    LoraConfig,
    get_peft_model,
    TaskType
)
import torch

# 1. Check for GPU
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# 2. Load the dataset
dataset = load_dataset("generaleoley/manim-codegen")

# 3. Split into train and validation
train_test = dataset["train"].train_test_split(test_size=0.1, seed=42)
split_dataset = DatasetDict({
    "train": train_test["train"],
    "validation": train_test["test"]
})

print(split_dataset)

# 4. Preprocess the dataset
def preprocess_function(examples):
    # Ensure that 'text' is a list of concatenated strings
    return {
        "text": [
            f"### Instruction:\n{q}\n\n### Response:\n{a}"
            for q, a in zip(examples["query"], examples["answer"])
        ]
    }

tokenized_dataset = split_dataset.map(
    preprocess_function,
    batched=True,
    remove_columns=split_dataset["train"].column_names
)

# 5. Load tokenizer and model
model_name = "deepseek-ai/DeepSeek-R1-Distill-Llama-8B"
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Handle tokenizer settings for LLaMA
tokenizer.padding_side = "left"  # LLaMA typically uses left padding
tokenizer.pad_token = tokenizer.eos_token  # Use EOS token for padding

# Load model with memory optimizations
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    load_in_8bit=True,  # Enable 8-bit quantization
    device_map="auto",  # Automatically handle device mapping
    torch_dtype=torch.float16,  # Use fp16 precision
)

# Prepare model for k-bit training
model = prepare_model_for_kbit_training(model)

# Configure LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,  # rank
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    target_modules=[
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
        "gate_proj",
        "up_proj",
        "down_proj",
    ]
)

# Wrap model with LoRA adapter
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# Enable gradient checkpointing
model.gradient_checkpointing_enable()

# 6. Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(
        examples["text"],
        truncation=True,
        max_length=512,  # Reduced from 1024 to save memory
        padding="max_length"
    )

tokenized_dataset = tokenized_dataset.map(
    tokenize_function,
    batched=True,
    remove_columns=["text"]
)

# 7. Data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False  # For causal language modeling
)

# 8. Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    overwrite_output_dir=True,
    num_train_epochs=5,  # Adjust based on dataset size and overfitting
    per_device_train_batch_size=4,  # Can be larger with LoRA
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=4,  # Accumulate gradients to simulate larger batch size
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_dir="./logs",
    logging_steps=10,
    fp16=True,  # Enable mixed precision if supported
    save_total_limit=2,  # Limit the number of saved checkpoints
    learning_rate=2e-4,  # Higher learning rate for LoRA
    weight_decay=0.01,
    warmup_steps=100,
    load_best_model_at_end=True,
    metric_for_best_model="loss",
    gradient_checkpointing=True,  # Enable gradient checkpointing in training
    optim="paged_adamw_8bit"  # Use 8-bit optimizer
)

# 9. Initialize Trainer with Early Stopping
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],  # Stop training if no improvement for 2 evals
)

# 10. Train the model
trainer.train()

# 11. Evaluate the model
results = trainer.evaluate()
print(results)

# 12. Save the fine-tuned model (modified to save adapters)
model.save_pretrained("./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
tokenizer.save_pretrained("./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
