import os

folder = 'src'
for root, dirs, files in os.walk(folder):
    for f in files:
        if f.endswith('.tsx'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            new_content = content.replace('py-6 md:py-16', 'pt-2 pb-8 md:py-16')
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated margins in {filepath}")
