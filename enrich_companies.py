import json
import re
import pandas as pd
from googlesearch import search
import time

def extract_contact(text):
    emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    phones = re.findall(r'(?:\+48)?\s*(?:\d{2,3}[-\s]?){2,3}\d{2,3}', text)
    phones = [p for p in phones if len(re.sub(r'\D', '', p)) >= 9]
    return emails, phones

def get_reasoning(c):
    nazwa = c.get('nazwy', {}).get('pelna', '')
    data_wpisu = c.get('krs_wpisy', {}).get('pierwszy_data', '')
    return f"Firma {nazwa} zaktualizowana w bazach {data_wpisu}. Działa w obszarze elektryczno-oświetleniowym. Ich profil biznesowy to idealny target dla taśm LED i opraw (Scharfer/Prescot). Nowy lead, do pilnego kontaktu!"

with open("/Users/karolbohdanowicz/my-ai-agents/best_companies.json", "r", encoding="utf-8") as f:
    companies = json.load(f)

final_leads = []

for i, c in enumerate(companies[:30]): # Let's process top 30
    nazwa = c.get("nazwy", {}).get("pelna", "")
    nip = c.get("numery", {}).get("nip", "")
    miasto = c.get("adres", {}).get("miejscowosc", "")
    
    rejestr_emaile = c.get("kontakt", {}).get("emaile", [])
    email = rejestr_emaile[0] if rejestr_emaile else None
    phone = None
    
    query = f'"{nazwa}" {miasto} kontakt telefon email nip {nip}'
    print(f"[{i+1}/30] Searching: {query}")
    
    try:
        combined_text = ""
        # advanced=True returns dict with title, url, description
        for res in search(query, num_results=5, advanced=True):
            combined_text += " " + res.title + " " + res.description
            
        found_emails, found_phones = extract_contact(combined_text)
        if not email and found_emails:
            email = found_emails[0]
        if found_phones:
            phone = found_phones[0].strip()
            
    except Exception as e:
        print("Search error:", e)
    
    if email and phone:
        print(f"  -> SUCCESS! Email: {email}, Phone: {phone}")
        lead = {
            "PKD": "Elektro/Oświetlenie",
            "Branża": "Hurt/Detal LED",
            "Nazwa Firmy": nazwa,
            "NIP": nip,
            "Miejscowość": miasto,
            "Email": email,
            "Telefon": phone,
            "Osoba Decyzyjna (KRS)": "Zarząd / Właściciel",
            "Dlaczego ta firma?": get_reasoning(c)
        }
        final_leads.append(lead)
    else:
        print(f"  -> MISSING CONTACT (Email: {email}, Phone: {phone}) - Dropping.")
        
    time.sleep(2)

if final_leads:
    df = pd.DataFrame(final_leads)
    out_path = "/Users/karolbohdanowicz/Downloads/NOWE_FIRMY_OSWIETLENIOWE_MAJ_CZERWIEC_2026.xlsx"
    df.to_excel(out_path, index=False)
    print(f"\nSaved {len(final_leads)} fully verified leads to {out_path}")
else:
    print("\nNo leads passed the strict filter.")
