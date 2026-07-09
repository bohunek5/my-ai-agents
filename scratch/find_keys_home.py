import os
import re

key_patterns = [
    re.compile(r'AIzaSy[A-Za-z0-9_-]{33}'),
    re.compile(r'sk-[A-Za-z0-9]{48}'),
    re.compile(r'ghp_[A-Za-z0-9]{36}')
]

print("Searching home directory for API keys...")
home_dir = "/Users/karolbohdanowicz"
for file in os.listdir(home_dir):
    path = os.path.join(home_dir, file)
    if os.path.isfile(path) and file.startswith('.'):
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for pattern in key_patterns:
                    matches = pattern.findall(content)
                    if matches:
                        print(f"Found key in {path}: {matches}")
        except Exception:
            pass

# Let's search specifically in .gemini and other config directories
gemini_dir = os.path.join(home_dir, ".gemini")
if os.path.exists(gemini_dir):
    for root, dirs, files in os.walk(gemini_dir):
        # Skip browser profile and backup
        dirs[:] = [d for d in dirs if d not in ['antigravity-browser-profile', 'antigravity-backup']]
        for file in files:
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    for pattern in key_patterns:
                        matches = pattern.findall(content)
                        if matches:
                            print(f"Found key in {path}: {matches}")
            except Exception:
                pass

print("Finished home search.")
