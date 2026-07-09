import os
import json

brain_dir = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain"
search_terms = ["sms", "imessage", "chat.db", "odpis"]
print(f"Searching logs in {brain_dir}...")

for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file == "transcript.jsonl":
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    for line_num, line in enumerate(f, 1):
                        for term in search_terms:
                            if term in line.lower():
                                # Try parsing as json to make output cleaner
                                try:
                                    obj = json.loads(line)
                                    content = obj.get("content", "")
                                    print(f"Match '{term}' in {path} (line {line_num}):")
                                    print(f"  Content: {content[:200]}")
                                except:
                                    print(f"Match '{term}' in {path} (line {line_num}): {line[:200]}")
                                break
            except Exception as e:
                print(f"Error reading {path}: {e}")

print("Logs search done.")
