import os
import json

brain_dir = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain"
search_terms = ["726400332", "kinga", "603045005", "imessage", "sms"]
print(f"Searching for contact numbers/names in conversation logs...")

found = False
for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file == "transcript.jsonl":
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    for line_num, line in enumerate(f, 1):
                        for term in search_terms:
                            if term in line.lower():
                                print(f"Found '{term}' in {path} at line {line_num}")
                                # Print surrounding lines if possible or the parsed message
                                try:
                                    obj = json.loads(line)
                                    print(f"  Content: {obj.get('content')}")
                                except:
                                    print(f"  Raw: {line[:300]}")
                                found = True
                                break
            except Exception:
                pass

if not found:
    print("No matching conversation logs found.")
