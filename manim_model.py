from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

class ManimModel():
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
        self.model = AutoModelForCausalLM.from_pretrained(
            "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
            device_map="auto",
            torch_dtype=torch.float16,
        )
        self.model = PeftModel.from_pretrained(self.model, "./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
        self.model.to("cuda" if torch.cuda.is_available() else "cpu")
        self.model.eval()


    def generate_response(self, prompt):
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        outputs = self.model.generate(
            inputs["input_ids"],
            max_length=1024,
            temperature=0.6,
            num_return_sequences=1,
        )
        generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated_text.split('\\n', 1)[1].lstrip()

if __name__ == "__main__":
    load_model = ManimModel()
    prompt = (
        "I would like to create an animation that shows me how to solve an integral"
    )
    output = load_model.generate_response(prompt)
    print(output)