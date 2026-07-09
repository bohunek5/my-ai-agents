import re

with open("src/data/stranda-apartments.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace empty bedroom arrays
bedroom_replacement = "bedroom: ['łóżko małżeńskie', 'komplet pościeli', 'szafa', 'suszarka na ubrania', 'żelazko'],"
content = re.sub(r"bedroom:\s*\[\s*\],", bedroom_replacement, content)

# Replace empty bathroom arrays
bathroom_replacement = "bathroom: ['prysznic', 'ręczniki', 'suszarka do włosów', 'zestaw kosmetyków'],"
content = re.sub(r"bathroom:\s*\[\s*\],", bathroom_replacement, content)

with open("src/data/stranda-apartments.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied.")
