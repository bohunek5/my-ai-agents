path = "/Users/karolbohdanowicz/my-ai-agents/tools/imessage_ai_agent.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('"model": "qwen3.5:latest"', '"model": "llama3.2:latest"')
content = content.replace('timeout=15', 'timeout=60') # if any
content = content.replace('timeout=30', 'timeout=60') # if any
# Make sure timeout is specified if not present
if "urllib.request.urlopen(req, context=ctx)" in content:
    content = content.replace("urllib.request.urlopen(req, context=ctx)", "urllib.request.urlopen(req, context=ctx, timeout=60)")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated model and timeout")
