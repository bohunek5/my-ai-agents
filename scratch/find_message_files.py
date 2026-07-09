import os

print("Searching for files with imessage/sms in their name...")
home_dir = "/Users/karolbohdanowicz"
for root, dirs, files in os.walk(home_dir):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'dist', 'build', '.venv', 'venv', 'Library', 'Pictures', 'Music', 'Movies', 'Downloads', 'Applications', 'Documents']]
    for file in files:
        if 'imessage' in file.lower() or 'sms' in file.lower() or 'message' in file.lower():
            path = os.path.join(root, file)
            print(f"Match: {path}")
print("Done.")
