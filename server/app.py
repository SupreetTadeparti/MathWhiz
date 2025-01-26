from flask import Flask, request
from manim_model import ManimModel
import os
from openai import OpenAI

client = OpenAI()
manim_model = ManimModel()

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/generate_animation_openai')
def generate_animation_openai():
    prompt = request.args.get('prompt')
    if not prompt:
        return {"error": "No prompt provided."}, 400
    completion = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = [
            #TODO: Write prompt
            {"role":"system", "content":"You are an assistant who specifically serves python scripts to create Manim animations."},
        ]
    )
    try:
        script = manim_model.generate_script(prompt)
        filename = manim_model.generate_unique_filename()
        video_path = manim_model.execute_animation(script, filename)
        
        if video_path and os.path.exists(video_path):
            return {"video_path": video_path}
        else:
            return {"error": "Failed to generate animation"}, 500
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/generate_animation_legacy')
def generate_animation():
    prompt = request.args.get('prompt')
    if not prompt:
        return {"error": "No prompt provided."}, 400
    
    try:
        script = manim_model.generate_script(f"I would like to create an animation that {prompt}")
        filename = manim_model.generate_unique_filename()
        video_path = manim_model.execute_animation(script, filename)
        
        if video_path and os.path.exists(video_path):
            return {"video_path": video_path}
        else:
            return {"error": "Failed to generate animation"}, 500
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)