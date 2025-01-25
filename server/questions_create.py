import openai

import os
from dotenv import load_dotenv

load_dotenv() 

openai_api_key = os.getenv("OPENAI_API_KEY")

from openai import OpenAI

client = OpenAI(api_key=openai_api_key)

chat_completion = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages = [{"role":"user", "content":"Instructions: You have to make 10 questions with 4 multiple answer choices for a quiz based on a prompt that will be given to you. The prompt is a request to explain a particular concept, and the user will be shown an educational video based on it. Based on the concepts, design the questions and the multiple answer choices for the quiz and list them in the format - Question : a) b) c) d). This is the prompt - 'Explain the Pythagoras Theorem' "}]
)
print(chat_completion.choices[0].message.content)