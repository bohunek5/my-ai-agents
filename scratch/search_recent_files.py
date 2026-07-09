import os
import time

current_time = time.time()
print("Searching for recently modified files...")
root_dir = "/Users/karolbohdanowicz/my-ai-agents"

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'dist', 'build', '.venv', 'venv', 'backup_temp', '_archive', 'mazury-holiday-backup-14-06-2026.zip']]
    for file in files:
        path = os.path.join(root, file)
        try:
            mtime = os.path.getmtime(path)
            # Checked in the last 7 days (7 * 24 * 3600 seconds)
            if current_time - mtime < 7 * 24 * 3600:
                # print name if it looks like a script we made
                if file.endswith(('.py', '.js', '.ts', '.sh', '.command')):
                    # Let's print out the file and its size
                    size = os.path.getsize(path)
                    print(f"File: {path} | Modified: {time.ctime(mtime)} | Size: {size} bytes")
        except Exception:
            pass
print("Finished search.")
