
import csv
import json
import re

def clean_name(name):
    return re.sub(r'[^a-zA-Z0-9]', '', name.lower())

import os

# Path to existing leads
# Path to new leads directory
new_leads_dir = "/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot/nowe firmy"

# First, read existing names from the mockData.ts
existing_names = set()
with open("/Users/karolbohdanowicz/my-ai-agents/prescot-sales-portal/src/data/mockData.ts", "r", encoding="utf-8") as f:
    content = f.read()
    matches = re.findall(r'"name":\s*"([^"]+)"', content)
    for m in matches:
        existing_names.add(clean_name(m))

print(f"Loaded {len(existing_names)} existing names from mockData.")

new_leads = []
processed_in_this_run = set()
total_duplicates = 0

for filename in os.listdir(new_leads_dir):
    if filename.endswith(".csv"):
        file_path = os.path.join(new_leads_dir, filename)
        print(f"Processing {filename}...")
        try:
            with open(file_path, "r", encoding="utf-8-sig") as f:
                reader = csv.DictReader(f, delimiter=';')
                for row in reader:
                    name = row.get('Nazwa firmy')
                    if not name:
                        for k in row.keys():
                            if 'Nazwa' in k:
                                name = row[k]
                                break
                    if not name:
                        continue
                    
                    c_name = clean_name(name)
                    if c_name in existing_names or c_name in processed_in_this_run:
                        total_duplicates += 1
                        continue
                    
                    processed_in_this_run.add(c_name)
                    
                    # Prepare lead object
                    city = row.get('Lokalizacja', '').split(',')[0].strip()
                    lead = {
                        "id": f"new-{c_name[:15]}-{len(new_leads)}",
                        "name": name,
                        "industry": row.get('Branża', 'Pozostałe'),
                        "city": city,
                        "detail": row.get('Dlaczego Prescot LED?', ''),
                        "phone": row.get('Telefon', '-'),
                        "email": row.get('E-mail', '-'),
                        "person": "Klient Biznesowy",
                        "type": "new_lead",
                        "assignedTo": "" 
                    }
                    new_leads.append(lead)
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print(f"Found {len(new_leads)} unique new leads across all files. {total_duplicates} duplicates ignored.")

# Assign to reps (Dariuszn, Annag, Annaa, Adamg, Iwonab)
reps = ['dariuszn', 'annag', 'annaa', 'adamg', 'iwonab']
for i, lead in enumerate(new_leads):
    lead['assignedTo'] = reps[i % len(reps)]

# Print as JSON for review
# print(json.dumps(new_leads[:5], indent=4, ensure_ascii=False))

# Now I need to append these to ALL_LEADS in mockData.ts
# I'll just write the final array elements to a file so I can copy-paste or use them.
output_path = "/tmp/new_leads_to_add.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(new_leads, f, indent=4, ensure_ascii=False)
