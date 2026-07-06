import re

file_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/components/InteractiveDiagram.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# Replace feature 3 (index 2): x1: 300, y1: 430, x2: 540, y2: 295, mobileLeft: '24.0%', mobileTop: '53.75%'
# with new mobile positions
content = content.replace("mobileLeft: '24.0%', mobileTop: '53.75%'", "mobileLeft: '78%', mobileTop: '75%'")

# Replace feature 6 (index 5): x1: 1100, y1: 325, x2: 790, y2: 335, mobileLeft: '84%', mobileTop: '58%'
content = content.replace("mobileLeft: '84%', mobileTop: '58%'", "mobileLeft: '78%', mobileTop: '58%'")

with open(file_path, 'w') as f:
    f.write(content)
print("Fixed diagram positions.")
