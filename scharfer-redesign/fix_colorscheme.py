import re

with open('src/app/globals.css', 'r') as f:
    content = f.read()

if 'color-scheme' not in content:
    content = content.replace('html {', 'html {\n  color-scheme: light dark;')
    with open('src/app/globals.css', 'w') as f:
        f.write(content)
