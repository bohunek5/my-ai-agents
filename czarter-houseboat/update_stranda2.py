import re
import ast

with open('src/data/stranda-apartments.ts', 'r') as f:
    content = f.read()

# Instead of complex regex, let's use the simplest logic
dict_start = content.find('export const strandaApartments: Record<string, Apartment> = {')
dict_end_match = re.search(r'\n};\n', content[dict_start:])
dict_end = dict_start + dict_end_match.end() - 2

dict_content = content[dict_start + len('export const strandaApartments: Record<string, Apartment> = {') : dict_end]

# Split by top-level keys
# To split safely, we can split by "\n    'KEY': {"
pattern = r"\n\s*'([A-Z0-9]+)':\s*\{"
matches = list(re.finditer(pattern, dict_content))

apts = {}
for i in range(len(matches)):
    key = matches[i].group(1)
    start_idx = matches[i].start()
    end_idx = matches[i+1].start() if i + 1 < len(matches) else len(dict_content)
    
    apt_str = dict_content[start_idx:end_idx]
    
    # Add Widok na jezioro
    lower_str = apt_str.lower()
    if 'widok na jezioro' in lower_str or 'widokiem na jezioro' in lower_str or 'jezioro' in lower_str:
        if 'additionalInfo: [' in apt_str:
            if '"Widok na jezioro"' not in apt_str and "'Widok na jezioro'" not in apt_str:
                # Use a specific replace that handles empty and non-empty arrays
                apt_str = re.sub(r'additionalInfo:\s*\[\s*\]', r"additionalInfo: ['Widok na jezioro']", apt_str)
                # For non empty
                def repl(m):
                    inner = m.group(1)
                    if 'Widok na jezioro' in inner or not inner.strip():
                        return m.group(0)
                    else:
                        return f"additionalInfo: [{inner.rstrip()}, 'Widok na jezioro']"
                apt_str = re.sub(r'additionalInfo:\s*\[(.*?)\]', repl, apt_str, flags=re.DOTALL)
    
    # Ensure apt_str has a trailing comma if it's not the last one, wait, it's easier to just keep exactly what's between them
    # But wait, the trailing commas are part of the text. Let's make sure every apt ends with `    },`
    apt_str = apt_str.strip()
    if not apt_str.endswith(','):
        apt_str += ','
    apt_str = '\n    ' + apt_str
    
    apts[key] = apt_str

ordered_keys = ['A204', 'A105', 'A103', 'A205', 'A104', 'A306', 'A305', 'B102', 'B404', 'C304', 'B201', 'B401', 'C301', 'B202', 'B402', 'B305', 'A302', 'C404', 'B103', 'B106', 'B304']

# add remaining
for k in apts.keys():
    if k not in ordered_keys:
        ordered_keys.append(k)

# build new dict content
new_dict_content = "".join([apts[k] for k in ordered_keys if k in apts])

# remove the last comma
new_dict_content = new_dict_content.rstrip(',')

new_content = content[:dict_start + len('export const strandaApartments: Record<string, Apartment> = {')] + new_dict_content + "\n" + content[dict_end:]

with open('src/data/stranda-apartments.ts', 'w') as f:
    f.write(new_content)
print("Done")
