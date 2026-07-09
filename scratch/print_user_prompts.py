import json

path = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/76a27624-2fe7-4fd7-8cea-8569e59be443/.system_generated/logs/transcript.jsonl"
print(f"Reading logs from {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        try:
            obj = json.loads(line)
            tp = obj.get("type")
            src = obj.get("source")
            if tp == "USER_INPUT" or (src == "MODEL" and "tool_calls" in obj):
                print(f"Line {i} | Source: {src} | Type: {tp}")
                if tp == "USER_INPUT":
                    print(f"  User: {obj.get('content')}")
                elif "tool_calls" in obj:
                    for tc in obj["tool_calls"]:
                        print(f"  Tool Call: {tc.get('name')} | Args: {tc.get('argumentsJson')[:300]}")
                print("-" * 50)
        except Exception as e:
            pass
