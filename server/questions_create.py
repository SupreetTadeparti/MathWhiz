import requests

WORKER_URL = "https://openai-worker.rish-worker.workers.dev"


def create_question(prompt: str) -> str:
    response = requests.post(
        WORKER_URL,
        json={
            "prompt": f"Instructions: You will get a prompt. That prompt will be from a learner who is asking to explain a mathematical concept. He will be shown an educational video that explains the topics discussed in the prompt. Your role is to make a quiz of 10 questions with multiple choices in the format a) b) c) d) for each question. These questions should be based on the concepts that you need to recognize based on the learner’s prompt. Your output should ONLY contain the questions and the MCQs, not any other extraneous text. This is the learner's prompt - {prompt}"
        },
    )
    if response.status_code == 200:
        return response.text
    else:
        return f"Error: {response.status_code}"

