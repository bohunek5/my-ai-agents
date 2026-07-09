import re

with open('src/data/stranda-apartments.ts', 'r') as f:
    content = f.read()

# The file has imports at the top, then export const STRANDA_APARTMENTS = { ... };
header_match = re.match(r'^([\s\S]*?export const STRANDA_APARTMENTS: Record<string, ApartmentTemplateData> = \{\n)([\s\S]*?)(\n\};\n?)$', content)

if not header_match:
    print("Could not match file structure")
    exit(1)

header = header_match.group(1)
body = header_match.group(2)
footer = header_match.group(3)

# Split body by blocks
blocks = re.split(r'\n    \'([A-Za-z0-9_ -]+)\': \{', "\n" + body)

apartments = {}
for i in range(1, len(blocks), 2):
    key = blocks[i]
    val = "{" + blocks[i+1].rstrip()
    if val.endswith(","):
        val = val[:-1]
    
    # Exclude the bad keys
    if key in ["C_Studio", "C_1_Sypialnia", "C_2_Sypialnie", "C Studio", "C 1-Sypialnia", "C 2-Sypialnie"]:
        continue
    
    # We keep the last one to naturally deduplicate
    apartments[key] = val

def replace_gallery(block, ido_id):
    import os
    img_dir = f"/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/public/images/stranda/"
    files = []
    try:
        all_files = os.listdir(img_dir)
        files = [f for f in all_files if f.startswith(f"ido_{ido_id}_") and f.endswith(".jpg")]
        files.sort(key=lambda x: int(x.split('_')[2].split('.')[0]))
    except Exception as e:
        print(f"Error reading dir for {ido_id}: {e}")
        pass
        
    if not files:
        return block
        
    hero = f'getAssetPath("/images/stranda/{files[0]}")'
    images_arr = ",\n                ".join([f'getAssetPath("/images/stranda/{f}")' for f in files])
    
    new_gallery = f'''gallery: {{
            "heroImage": {hero},
            "images": [
                {images_arr}
            ]
        }}'''
    
    block = re.sub(r'gallery:\s*\{[\s\S]*?\}', new_gallery, block)
    return block

def replace_title(block, title):
    return re.sub(r"title: `[^`]+`", f"title: `{title}`", block)

# Fix specific apartments
for key in ['B304', 'B305', 'C_1BEDROOM']:
    if key in apartments:
        apartments[key] = replace_gallery(apartments[key], '44')

if 'C_STUDIO' in apartments:
    apartments['C_STUDIO'] = replace_gallery(apartments['C_STUDIO'], '32')
    apartments['C_STUDIO'] = replace_title(apartments['C_STUDIO'], 'C Studio')

if 'C_1BEDROOM' in apartments:
    apartments['C_1BEDROOM'] = replace_title(apartments['C_1BEDROOM'], 'C z jedną sypialnią')

if 'C_2BEDROOM' in apartments:
    apartments['C_2BEDROOM'] = replace_gallery(apartments['C_2BEDROOM'], '43')
    apartments['C_2BEDROOM'] = replace_title(apartments['C_2BEDROOM'], 'C z dwoma sypialniami')

# Fix C304, C301, B402, C404, A302 which might have C_Generic
fixes = {'C304': '30', 'C301': '40', 'B402': '24', 'C404': '41', 'A302': '42'}
for k, ido in fixes.items():
    if k in apartments:
        apartments[k] = replace_gallery(apartments[k], ido)

# Reassemble
new_body = ""
for k, v in apartments.items():
    new_body += f"    '{k}': {v},\n"

# Remove the trailing comma from the last item
new_body = new_body.rstrip().rstrip(",") + "\n"

with open('src/data/stranda-apartments.ts', 'w') as f:
    f.write(header + new_body + footer)

print("Fixed stranda-apartments.ts")
