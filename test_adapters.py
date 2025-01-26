from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

# Path to the final checkpoint
final_checkpoint_path = "./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters"

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(final_checkpoint_path)
tokenizer.eos_token = tokenizer.pad_token 

# Load the base model
base_model = AutoModelForCausalLM.from_pretrained(
    "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
    load_in_8bit=True,       # Use 8-bit quantization
    device_map="auto",       # Automatically map to available GPUs
    torch_dtype=torch.float16,  # Use mixed precision
)

# Load LoRA adapters from the final checkpoint
model = PeftModel.from_pretrained(base_model, final_checkpoint_path)

# Move model to GPU
model.to("cuda" if torch.cuda.is_available() else "cpu")
model.eval()

print("Model w/ LoRA adapters and tokenizer loaded successfully.")


def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(
        inputs["input_ids"],
        max_length=1024,
        temperature=0.6,
        num_return_sequences=1,
    )
    # Extract only the response by removing the prompt
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text.split('\\n', 1)[1].lstrip()

# Example prompt
prompt = (
    "I'd like to create an animation that visually represents a neural network with three layers: "
    "the first layer having 20 neurons, the second layer 10 neurons, and the third layer 5 neurons. "
    "Each neuron should be relatively small with a clear outline. The neurons should appear one layer "
    "at a time, each layer coming from above and then settling into position. After all layers are displayed, "
    "I want to see an animation that represents the forward pass of data through this network, going from the "
    "first layer to the last. The animation should be clear and hold on the final frame for a short moment before ending."
)

output = generate_response(prompt)
print(output)