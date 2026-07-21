import os
import re

folder = 'src'
for root, dirs, files in os.walk(folder):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css', '.js', '.jsx')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            # replace .jpg and .png with .webp (case insensitive)
            new_content = re.sub(r'\.jpg|\.png', '.webp', content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")
