import os
import json

brain_dir = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain"
print("Searching for osascript/Messages code in transcripts...")

for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file == "transcript.jsonl":
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    for line_num, line in enumerate(f, 1):
                        if "osascript" in line or "Messages" in line:
                            # Let's inspect if it's a command execution or code
                            try:
                                obj = json.loads(line)
                                # Check tool calls
                                tool_calls = obj.get("tool_calls", [])
                                for tc in tool_calls:
                                    args = tc.get("argumentsJson", "")
                                    if "osascript" in args or "Messages" in args or "chat.db" in args:
                                        print(f"Match in {path} at line {line_num}:")
                                        print(f"  Tool: {tc.get('name')}")
                                        print(f"  Args: {args[:500]}")
                                        print("-" * 50)
                            except:
                                pass
            except Exception as e:
                pass
print("Logs search complete.")
