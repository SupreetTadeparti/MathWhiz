import re
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch
import os
import subprocess
import tempfile
import uuid
from datetime import datetime
import ast

def is_valid_python(code: str) -> bool:
    try:
        ast.parse(code)
        return True
    except SyntaxError as e:
        print(f"SyntaxError in generated script: {e}")
        return False
class ManimModel():
    def init_model(self):
        self.tokenizer = AutoTokenizer.from_pretrained("./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
        self.model = AutoModelForCausalLM.from_pretrained(
            "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
            device_map="auto",
            torch_dtype=torch.float16,
        )
        self.model = PeftModel.from_pretrained(self.model, "./fine-tuned-DeepSeek-R1-Distill-Llama-8B-adapters")
        self.model.to("cuda" if torch.cuda.is_available() else "cpu")
        self.model.eval()

    def generate_script(self, prompt) -> str:
        if not self.model: self.init_model()
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        outputs = self.model.generate(
            inputs["input_ids"],
            max_length=1024,
            temperature=0.6,
            num_return_sequences=1,
        )
        generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated_text.split('\\n', 1)[1].lstrip()

    def execute_animation(self, script_content, output_filename):
        # Validate the generated script
        if not is_valid_python(script_content):
            print("Generated script contains syntax errors.")
            print(script_content)
            return None

        # Proceed with creating and executing the temporary script
        with tempfile.NamedTemporaryFile(suffix='.py', mode='w', delete=False) as tf:
            tf.write(script_content)
            temp_filename = tf.name

        try:
            # Execute manim command with specified output file
            subprocess.run(['manim', '-qm', temp_filename, '--output_file', output_filename], check=True)
            
            # Construct the expected video path
            newest_folder = max(
                [f for f in os.listdir("./media/videos/") if os.path.isdir(os.path.join("./media/videos/", f))],
                key=lambda x: os.path.getmtime(os.path.join("./media/videos/", x))
            )
            dir_path = os.path.join('.', 'media', 'videos', newest_folder, "720p30")
            mp4_files = [f for f in os.listdir(dir_path) if f.endswith('.mp4')]
            if mp4_files: return os.path.join(dir_path, mp4_files[0])
            else: 
                print("Video file was not found.")
                return None 

        except subprocess.CalledProcessError as e:
            print(f"Manim failed to execute the script: {e}")
            return None
        finally:
            # Clean up the temporary file
            os.unlink(temp_filename)


    def generate_unique_filename(self, base_name="animation"):
        """Generate a unique filename using UUID and timestamp."""
        unique_id = uuid.uuid4().hex[:8]  # Short UUID
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        return f"{base_name}_{timestamp}_{unique_id}"

if __name__ == "__main__":
    load_model = ManimModel()
    prompt = (
        "I would like to create an animation that shows me how to solve an integral."
    )
    output_script = load_model.generate_script(prompt)
    
    # Generate a unique filename
    unique_filename = load_model.generate_unique_filename(base_name="solve_integral")
    
    # Execute animation with the unique filename
    video_path = load_model.execute_animation(output_script, unique_filename)
    if video_path:
        print(f"Animation generated at: {video_path}")
    else:
        print("Failed to generate animation.")