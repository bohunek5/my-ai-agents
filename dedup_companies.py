import pandas as pd
import json
import os
import re

def extract_nips(filepath):
    nips = set()
    if not os.path.exists(filepath):
        return nips
        
    try:
        if filepath.endswith('.xlsx'):
            df = pd.read_excel(filepath)
        elif filepath.endswith('.csv'):
            df = pd.read_csv(filepath)
        else:
            return nips
            
        # Find nip column (case insensitive)
        nip_col = next((c for c in df.columns if 'nip' in str(c).lower()), None)
        if nip_col:
            for val in df[nip_col].dropna():
                clean_nip = re.sub(r'[^0-9]', '', str(val))
                if clean_nip:
                    nips.add(clean_nip)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        
    return nips

historical_files = [
    '/Users/karolbohdanowicz/Downloads/PRESCOT_FINAL_NOWE_FIRMY_ELEKTRO_2025_2026.xlsx',
    '/Users/karolbohdanowicz/Downloads/localo_firmy_wzbogacone_fast.csv',
    '/Users/karolbohdanowicz/Downloads/Firmy GOOGLE + tel.xlsx'
]

known_nips = set()
for f in historical_files:
    known_nips.update(extract_nips(f))
    
print(f"Found {len(known_nips)} known NIPs in historical files.")

with open("/Users/karolbohdanowicz/my-ai-agents/raw_companies.json", "r", encoding="utf-8") as f:
    raw_companies = json.load(f)
    
new_companies = []
for c in raw_companies:
    nip = c.get('numery', {}).get('nip', '')
    if nip and nip not in known_nips:
        new_companies.append(c)

with open("/Users/karolbohdanowicz/my-ai-agents/new_companies_to_scrape.json", "w", encoding="utf-8") as f:
    json.dump(new_companies, f, ensure_ascii=False, indent=2)

print(f"Total raw: {len(raw_companies)}")
print(f"After deduplication: {len(new_companies)} new companies to scrape.")
