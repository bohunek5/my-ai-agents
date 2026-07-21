import urllib.request
import json
import ssl

prompt = "Hello"
url = "http://localhost:11434/api/generate"
data = json.dumps({
    "model": "qwen3.5:latest",
    "prompt": prompt,
    "stream": False
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
try:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    with urllib.request.urlopen(req, context=ctx, timeout=30) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Success:", result.get("response", "").strip())
except Exception as e:
    print("Error:", e)
