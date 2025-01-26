from flask import Flask, request
from manim_model import ManimModel

manim_model = ManimModel()

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/generate_animation')
def generate_animation():
    script = manim_model.generate_script(f"I would like to create an animation that {request.args.get('prompt')}")
    filename = manim_model.generate_unique_filename()
    video_path = manim_model.execute_animation(script, filename)
    return {"video_path": video_path}

if __name__ == '__main__':
    app.run(debug=True)