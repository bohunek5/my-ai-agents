import urllib.request
import json

url = "http://localhost:11434/api/chat"
data = {
    "model": "qwen3.5:latest",
    "messages": [
        {
            "role": "user",
            "content": "Napisz krótkie 'hej xd' po polsku"
        }
    ],
    "stream": False
}

req = urllib.request.Request(
    url, 
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode('utf-8'))
        print("Ollama Response:")
        print(res['message']['content'])
except Exception as e:
    print(f"Error calling Ollama: {e}")
