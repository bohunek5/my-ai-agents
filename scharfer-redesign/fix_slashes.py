import re

files = [
    "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(desktop)/page.tsx",
    "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(mobile)/mobile/page.tsx"
]

for fp in files:
    with open(fp, 'r') as f:
        content = f.read()
    
    # Replace \_ with ' where it shouldn't have backslashes
    content = content.replace(r"\'", "'")
    
    with open(fp, 'w') as f:
        f.write(content)

print("Fixed backslashes.")
