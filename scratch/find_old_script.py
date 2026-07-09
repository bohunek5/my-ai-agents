import os

search_terms = ["Messages", "chat.db", "osascript"]
print("Searching for old scripts...")

root_dir = "/Users/karolbohdanowicz/my-ai-agents"
for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'dist', 'build', '.venv', 'venv']]
    for file in files:
        if file.endswith(('.py', '.js', '.ts', '.sh', '.command', '.json')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    for term in search_terms:
                        if term in content:
                            print(f"Found {term} in {path}")
            except Exception:
                pass
print("Done.")
