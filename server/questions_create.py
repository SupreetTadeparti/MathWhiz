import requests

WORKER_URL = "https://openai-worker.rish-worker.workers.dev"


def create_question(prompt: str) -> str:
    response = requests.post(
        WORKER_URL,
        json={
            "prompt": f"count till 200"
        },
    )
    if response.status_code == 200:
        return response.text
    else:
        return f"Error: {response.status_code}"


res = create_question("Pythagorean theorem")
print(res)
