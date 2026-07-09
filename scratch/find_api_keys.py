import os
import re

key_patterns = [
    re.compile(r'AIzaSy[A-Za-z0-9_-]{33}'),
    re.compile(r'sk-[A-Za-z0-9]{48}'),
    re.compile(r'ghp_[A-Za-z0-9]{36}')
]

print("Searching for API key patterns...")
root_dir = "/Users/karolbohdanowicz/my-ai-agents"
for root, dirs, files in os.walk(root_dir):
    # Prune ignore dirs
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'dist', 'build', '.venv', 'venv', 'backup_temp', '_archive', 'mazury-holiday-backup-14-06-2026.zip']]
    for file in files:
        if file.endswith(('.py', '.js', '.ts', '.tsx', '.json', '.env', '.local', '.md', '.yml', '.yaml', '.sh', '.command')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    for pattern in key_patterns:
                        matches = pattern.findall(content)
                        if matches:
                            print(f"Found match in {path}: {matches}")
            except Exception as e:
                pass
print("Finished search.")
