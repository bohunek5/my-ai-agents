import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    content = re.sub(r"background:\s*'#f8f9fa'", "background: 'var(--background)'", content)
    content = re.sub(r"backgroundColor:\s*'#f8f9fa'", "backgroundColor: 'var(--background)'", content)
    
    # Text colors
    content = re.sub(r"color:\s*'#6b7280'", "color: 'var(--c-text)'", content)
    content = re.sub(r"color:\s*'#4b5563'", "color: 'var(--c-text)'", content)
    content = re.sub(r"color:\s*'#9ca3af'", "color: 'var(--c-text)'", content)
    
    # Headings / text
    content = re.sub(r"color:\s*'#111827'", "color: 'var(--c-heading)'", content)
    content = re.sub(r"color:\s*'#1e293b'", "color: 'var(--c-heading)'", content)
    content = re.sub(r"backgroundColor:\s*'#1e293b'", "backgroundColor: 'var(--c-heading)'", content)
    
    # Borders
    content = re.sub(r"border:\s*'1px solid #e5e7eb'", "border: '1px solid var(--c-border)'", content)
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed colors in {path}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
