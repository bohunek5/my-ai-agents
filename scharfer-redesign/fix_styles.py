import os
import glob
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Replace background: 'white' and backgroundColor: 'white' with var(--card-bg)
    content = re.sub(r"background:\s*'white'", "background: 'var(--card-bg)'", content)
    content = re.sub(r"backgroundColor:\s*'white'", "backgroundColor: 'var(--card-bg)'", content)
    content = re.sub(r'background:\s*"white"', 'background: "var(--card-bg)"', content)
    content = re.sub(r'backgroundColor:\s*"white"', 'backgroundColor: "var(--card-bg)"', content)

    # Replace hardcoded borders that might be #eee or #f1f5f9 with var(--c-border)
    content = re.sub(r"border:\s*'1px solid #f1f5f9'", "border: '1px solid var(--c-border)'", content)
    content = re.sub(r"border:\s*'1px solid #eee'", "border: '1px solid var(--c-border)'", content)
    content = re.sub(r"borderBottom:\s*'1px solid #eee'", "borderBottom: '1px solid var(--c-border)'", content)
    content = re.sub(r"borderBottom:\s*'1px solid #f3f4f6'", "borderBottom: '1px solid var(--c-border)'", content)
    content = re.sub(r"borderTop:\s*'1px solid #eee'", "borderTop: '1px solid var(--c-border)'", content)
    
    # Text colors
    content = re.sub(r"color:\s*'#333'", "color: 'var(--foreground)'", content)
    content = re.sub(r"color:\s*'#444'", "color: 'var(--foreground)'", content)
    content = re.sub(r"color:\s*'#555'", "color: 'var(--c-text)'", content)
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {path}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
