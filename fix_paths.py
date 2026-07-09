import os

src_dir = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src'
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.js')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if '"/scharfer/' in content or "'/scharfer/" in content or "`/scharfer/" in content:
                content = content.replace('"/scharfer/', '"/')
                content = content.replace("'/scharfer/", "'/")
                content = content.replace("`/scharfer/", "`/")
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {path}")
