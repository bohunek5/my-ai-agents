import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Backgrounds
    content = re.sub(r"background:\s*'white'", "background: 'var(--card-bg)'", content)
    content = re.sub(r"backgroundColor:\s*'white'", "backgroundColor: 'var(--card-bg)'", content)
    content = re.sub(r'background:\s*"white"', 'background: "var(--card-bg)"', content)
    content = re.sub(r'backgroundColor:\s*"white"', 'backgroundColor: "var(--card-bg)"', content)
    content = re.sub(r"background:\s*white([;}])", r"background: var(--card-bg)\1", content)
    content = re.sub(r"background-color:\s*white([;}])", r"background-color: var(--card-bg)\1", content)
    content = re.sub(r"background-color:\s*#fff(?:fff)?([;}])", r"background-color: var(--card-bg)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"background:\s*#fff(?:fff)?([;}])", r"background: var(--card-bg)\1", content, flags=re.IGNORECASE)
    
    content = re.sub(r"background:\s*#f8f9fa([;}])", r"background: var(--background)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"background-color:\s*#f8f9fa([;}])", r"background-color: var(--background)\1", content, flags=re.IGNORECASE)
    
    # Text colors
    # Text usually #333, #444, #555, #6b7280, #4b5563, #9ca3af, #0f172a, #111827
    content = re.sub(r"color:\s*#333([;}])", r"color: var(--c-heading)\1", content)
    content = re.sub(r"color:\s*#444([;}])", r"color: var(--c-heading)\1", content)
    content = re.sub(r"color:\s*#555([;}])", r"color: var(--c-text)\1", content)
    content = re.sub(r"color:\s*#999([;}])", r"color: var(--c-text)\1", content)
    content = re.sub(r"color:\s*#6b7280([;}])", r"color: var(--c-text)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"color:\s*#4b5563([;}])", r"color: var(--c-text)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"color:\s*#9ca3af([;}])", r"color: var(--c-text)\1", content, flags=re.IGNORECASE)
    
    content = re.sub(r"color:\s*#111827([;}])", r"color: var(--c-heading)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"color:\s*#1e293b([;}])", r"color: var(--c-heading)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"color:\s*#0f172a([;}])", r"color: var(--c-heading)\1", content, flags=re.IGNORECASE)
    
    # Borders
    content = re.sub(r"border:\s*1px solid #e5e7eb([;}])", r"border: 1px solid var(--c-border)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"border:\s*1px solid #eee([;}])", r"border: 1px solid var(--c-border)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"border-bottom:\s*1px solid #eee([;}])", r"border-bottom: 1px solid var(--c-border)\1", content, flags=re.IGNORECASE)
    content = re.sub(r"border-top:\s*1px solid #eee([;}])", r"border-top: 1px solid var(--c-border)\1", content, flags=re.IGNORECASE)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed CSS in {path}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.css') or file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
