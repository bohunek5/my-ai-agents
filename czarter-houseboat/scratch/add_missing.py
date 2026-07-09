import re

# 1. Update stranda-apartments.ts
content = open("src/data/stranda-apartments.ts", "r").read()

# B304, B305 based on B402
b402_match = re.search(r"    'B402': \{[\s\S]*?icalUrl:[^\n]*\n    \},", content)
if b402_match and "B304" not in content:
    b402_block = b402_match.group(0)
    b304_block = b402_block.replace("B402", "B304").replace("czwarte piętro", "trzecie piętro").replace("3 piętrze", "2 piętrze").replace("4 piętrze", "3 piętrze")
    b305_block = b402_block.replace("B402", "B305").replace("czwarte piętro", "trzecie piętro").replace("3 piętrze", "2 piętrze").replace("4 piętrze", "3 piętrze")
    
    # insert before the last `}`
    last_brace_idx = content.rfind("};")
    content = content[:last_brace_idx] + "\n" + b304_block + "\n\n" + b305_block + "\n" + content[last_brace_idx:]

# C205 based on C404
c404_match = re.search(r"    'C404': \{[\s\S]*?icalUrl:[^\n]*\n    \},", content)
if c404_match and "C205" not in content:
    c404_block = c404_match.group(0)
    c205_block = c404_block.replace("C404", "C205").replace("3 piętrze", "1 piętrze").replace("jacuzzi na dachu", "")
    
    last_brace_idx = content.rfind("};")
    content = content[:last_brace_idx] + "\n" + c205_block + "\n" + content[last_brace_idx:]

open("src/data/stranda-apartments.ts", "w").write(content)

# 2. Update translations.ts
trans = open("src/lib/translations.ts", "r").read()
# Find B402 in trans and clone it for B304, B305, C205
for lang in ['pl', 'en', 'de']:
    b402_t_match = re.search(r"B402:\s*\"[^\"]*\",", trans)
    if b402_t_match:
        b402_str = b402_t_match.group(0)
        if "B304:" not in trans:
            trans = trans.replace(b402_str, b402_str + "\n            B304: " + b402_str.replace("B402", "B304").replace("4 piętrze", "3 piętrze").replace("4th floor", "3rd floor").replace("4. Etage", "3. Etage").split("B304: ")[-1])
        if "B305:" not in trans:
            trans = trans.replace(b402_str, b402_str + "\n            B305: " + b402_str.replace("B402", "B305").replace("4 piętrze", "3 piętrze").replace("4th floor", "3rd floor").replace("4. Etage", "3. Etage").split("B305: ")[-1])
            
    c404_t_match = re.search(r"C404:\s*\"[^\"]*\",", trans)
    if c404_t_match:
        c404_str = c404_t_match.group(0)
        if "C205:" not in trans:
            trans = trans.replace(c404_str, c404_str + "\n            C205: " + c404_str.replace("C404", "C205").split("C205: ")[-1])
            
open("src/lib/translations.ts", "w").write(trans)
print("Added missing apartments")
