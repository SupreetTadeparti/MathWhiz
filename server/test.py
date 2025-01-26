from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    pipeline,
    BitsAndBytesConfig
)
from peft import PeftModel

def test_model():
    # Model paths
    base_model_name = "mistralai/Mixtral-8x7B-Instruct-v0.1"
    lora_adapter_path = "generaleoley/mixtral-8x7b-manim-lora"
    
    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(base_model_name)
    
    print("Setting up BitsAndBytes configuration...")
    quantization_config = BitsAndBytesConfig(
        load_in_4bit=True,
        llm_int8_enable_fp32_cpu_offload=True  # Enable CPU offloading for certain modules
    )
    
    print("Loading base model with quantization and offloading...")
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_name,
        quantization_config=quantization_config,
        device_map="auto"  # Automatically assign layers to GPU and CPU based on memory constraints
    )
    base_model.gradient_checkpointing_enable()
    
    print("Applying LoRA adapter...")
    model = PeftModel.from_pretrained(base_model, lora_adapter_path)
    
    print("Setting up pipeline...")
    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0)  # Ensure pipeline uses GPU
    
    # Test prompt
    test_prompt = (
        "Can you create an educational animation featuring five pentagons with different hues, "
        "placed side by side, that first appear by drawing their borders and then filling with color? "
        "After they appear, can each pentagon rotate around its center, with each one using a different "
        "animation speed or pattern to showcase various rotation effects?"
    )
    
    print("\nGenerating code from test prompt...")
    generated = pipe(test_prompt, max_length=500, num_return_sequences=1)
    
    print("\nGenerated Code:")
    print(generated[0]['generated_text'])

if __name__ == "__main__":
    test_model()
