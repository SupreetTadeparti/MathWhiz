import requests

WORKER_URL = "https://openai-worker.rish-worker.workers.dev"


def create_question(prompt: str) -> str:
    response = requests.post(
        WORKER_URL,
        json={
            "prompt": """Instructions: You will get a prompt. That prompt will be from a learner who is asking to explain a mathematical concept. He will be shown an educational video that explains the topics discussed in the prompt. Your role is to make a quiz of 3 questions with multiple choices in the format a) b) c) d) for each question. These questions should be based on the concepts that you need to recognize based on the learner’s prompt. Your output of the quiz should be in JSON format, i.e. in key-value pairs. For an EXAMPLE input of "Explain the Pythagoras theorem to me" this is an EXAMPLE output - quiz_data = { "quiz": [ { "question": "What is the length of the hypotenuse of a right triangle with legs of 3 and 4 units?", "options": { "a": "5 units", "b": "6 units", "c": "7 units", "d": "8 units" }, "answer": "a" }, { "question": "Which of the following is the Pythagorean triple?", "options": { "a": "2, 3, 5", "b": "3, 4, 5", "c": "5, 12, 14", "d": "8, 15, 18" }, "answer": "b" }, { "question": "The Pythagorean theorem applies to which type of triangle?", "options": { "a": "Equilateral triangle", "b": "Isosceles triangle", "c": "Scalene triangle", "d": "Right triangle" }, "answer": "d" } ] }. - You should directly output ONLY the JSON formatted quiz and no other extraneous text. Do not use any special characters. This is the learner’s prompt - """ + prompt

        },
    )
    if response.status_code == 200:
        return response.text
    else:
        return f"Error: {response.status_code}"
    
print(create_question("Tell me about pythagoras theorem"))

