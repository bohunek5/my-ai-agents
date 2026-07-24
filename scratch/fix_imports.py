path = "/Users/karolbohdanowicz/my-ai-agents/tools/imessage_ai_agent.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

if "import urllib.request" not in content:
    content = content.replace("from google import genai", "from google import genai\nimport urllib.request")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed imports")
