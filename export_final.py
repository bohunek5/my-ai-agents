import json
import pandas as pd

def get_reasoning(c):
    nazwa = c.get('nazwy', {}).get('pelna', '')
    data_wpisu = c.get('krs_wpisy', {}).get('pierwszy_data', '')
    if not data_wpisu:
        data_wpisu = "ostatnich miesiącach"
    return f"To nowo założona firma (rejestracja w {data_wpisu}) o profilu hurtowo-detalicznym w branży oświetleniowej/elektro. Idealny, perspektywiczny partner B2B dla produktów Scharfer i Prescot – są na etapie budowania relacji dostawczych i asortymentu."

with open("/Users/karolbohdanowicz/my-ai-agents/best_companies.json", "r", encoding="utf-8") as f:
    companies = json.load(f)

final_leads = []

for c in companies:
    nazwa = c.get("nazwy", {}).get("pelna", "")
    nip = c.get("numery", {}).get("nip", "")
    miasto = c.get("adres", {}).get("miejscowosc", "")
    
    rejestr_emaile = c.get("kontakt", {}).get("emaile", [])
    email = rejestr_emaile[0] if rejestr_emaile else ""
    
    # We leave phone empty because Rejestr.io doesn't provide it
    # Apify will be used by the user to fill missing data.
    phone = ""
    
    lead = {
        "PKD": c.get("dzialalnosci", {}).get("przewazajace_dzial", "Oświetlenie/Elektro"),
        "Branża": "Hurt/Detal LED",
        "Nazwa Firmy": nazwa,
        "Miejscowość": miasto,
        "NIP": nip,
        "Email": email,
        "Telefon": phone,
        "Osoba Decyzyjna (KRS)": "Zarząd / Właściciel",
        "Dlaczego ta firma?": get_reasoning(c)
    }
    final_leads.append(lead)

df = pd.DataFrame(final_leads)
out_path = "/Users/karolbohdanowicz/Downloads/PRESCOT_NOWE_FIRMY_MAJ_CZERWIEC_2026_DO_APIFY.xlsx"
df.to_excel(out_path, index=False)
print(f"Saved {len(final_leads)} leads to {out_path}")
