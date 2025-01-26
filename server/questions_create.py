import requests

# Worker URL
worker_url = "https://openai-worker.rish-worker.workers.dev"

# Prompt to send to the Worker
prompt = "Explain the Pythagorean theorem in simple terms."

# Make the POST request to the Cloudflare Worker
response = requests.post(worker_url, json={"prompt": prompt})

# Check if the request was successful
if response.status_code == 200:
    print("Response from Worker:")
    print(response.text)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
