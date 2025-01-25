import openai

import os
from dotenv import load_dotenv

load_dotenv() 

openai_api_key = os.getenv("OPENAI_API_KEY")

from openai import OpenAI

client = OpenAI(api_key=openai_api_key)

chat_completion = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages = [{"role":"user", "content":"how are you"}]
)
print(chat_completion.choices[0].message.content)
print('helo')