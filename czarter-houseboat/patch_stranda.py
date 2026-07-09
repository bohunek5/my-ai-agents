import re

with open("src/data/stranda-apartments.ts", "r", encoding="utf-8") as f:
    original_code = f.read()

with open("stranda_new_blocks.ts", "r", encoding="utf-8") as f:
    new_blocks = f.read()

# We need to insert the new blocks before the last };
# Let's find the closing brace.
idx = original_code.rfind("};")
if idx != -1:
    # Ensure there is a comma before we append if it's not empty
    before = original_code[:idx].rstrip()
    if not before.endswith(','):
        before += ','
    
    final_code = before + "\n" + new_blocks + "\n};\n"
    
    with open("src/data/stranda-apartments.ts", "w", encoding="utf-8") as f:
        f.write(final_code)
    print("Patched successfully")
else:
    print("Could not find the closing brace.")
