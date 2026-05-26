import re

with open('src/data/stranda-apartments.ts', 'r') as f:
    content = f.read()

# We need to extract the strandaApartments object and re-serialize or re-order it
# Since it's a TS file with template literals and functions (getAssetPath), 
# it's easiest to parse it by finding top-level keys.

dict_start = content.find('export const strandaApartments: Record<string, Apartment> = {')
dict_end_match = re.search(r'\n};\n', content[dict_start:])
if not dict_end_match:
    print("Could not find end of dict")
    exit(1)
dict_end = dict_start + dict_end_match.end() - 2 # point to }

dict_content = content[dict_start + len('export const strandaApartments: Record<string, Apartment> = {') : dict_end]

# Extract each apartment
apts = {}
# Regex to find top level keys:
# e.g. 'A103': { ... },
# We can find them by looking for \n    'KEY': {
matches = list(re.finditer(r"\n\s*'([A-Z0-9]+)':\s*\{", dict_content))

for i in range(len(matches)):
    key = matches[i].group(1)
    start_idx = matches[i].start()
    end_idx = matches[i+1].start() if i + 1 < len(matches) else len(dict_content)
    apt_str = dict_content[start_idx:end_idx]
    
    # Add Widok na jezioro if it has it
    if 'widok na jezioro' in apt_str.lower() or 'widokiem na jezioro' in apt_str.lower() or 'jezioro' in apt_str.lower():
        # Find additionalInfo array
        if 'additionalInfo: [' in apt_str:
            # check if it already has it
            if '"Widok na jezioro"' not in apt_str and "'Widok na jezioro'" not in apt_str:
                apt_str = re.sub(r'additionalInfo:\s*\[\s*\]', "additionalInfo: ['Widok na jezioro']", apt_str)
                apt_str = re.sub(r'additionalInfo:\s*\[(.*?)\]', lambda m: m.group(0) if 'Widok na jezioro' in m.group(0) or m.group(1).strip() == '' else f"additionalInfo: [{m.group(1)}, 'Widok na jezioro']", apt_str, flags=re.DOTALL)
    
    apts[key] = apt_str

# Desired order
ordered_keys = ['A204', 'A105', 'A103', 'A205', 'A104', 'A306', 'A305', 'B102', 'B404', 'C304', 'B201', 'B401', 'C301', 'B202', 'B402', 'B305', 'A302', 'C404', 'B103', 'B106']

# Add any missing keys
for k in apts.keys():
    if k not in ordered_keys:
        ordered_keys.append(k)

new_dict_content = "".join([apts[k] for k in ordered_keys if k in apts])

new_content = content[:dict_start + len('export const strandaApartments: Record<string, Apartment> = {')] + new_dict_content + content[dict_end:]

with open('src/data/stranda-apartments.ts', 'w') as f:
    f.write(new_content)

print("Updated and ordered stranda apartments successfully")
