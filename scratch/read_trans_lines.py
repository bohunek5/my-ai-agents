import json

path = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/76a27624-2fe7-4fd7-8cea-8569e59be443/.system_generated/logs/transcript.jsonl"
print(f"Reading logs from {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if "imessage" in line.lower() or "sms" in line.lower() or "osascript" in line.lower():
            try:
                obj = json.loads(line)
                print(f"Line {i} | Type: {obj.get('type')} | Status: {obj.get('status')}")
                if "content" in obj:
                    print(f"  Content: {obj['content'][:500]}")
                if "tool_calls" in obj:
                    print(f"  Tool Calls: {obj['tool_calls']}")
                print("-" * 50)
            except Exception as e:
                print(f"Error parsing line {i}: {e}")
