import json
import pandas as pd
from apify_client import ApifyClient

client = ApifyClient("apify_api_pYI2s8mQkhrzYOviIr1p3cURhIh9tY0kDniD")

print("Pobieram wyniki z run: ogf3TIQrKQrZeLIQF")
run = client.run("ogf3TIQrKQrZeLIQF").get()
if not run:
    print("Nie znaleziono runa")
    exit(1)

dataset_id = run["defaultDatasetId"]
print(f"Dataset ID: {dataset_id}")

results = list(client.dataset(dataset_id).iterate_items())
print(f"Pobrano {len(results)} elementow z Apify.")

with open("/Users/karolbohdanowicz/my-ai-agents/best_companies.json", "r", encoding="utf-8") as f:
    companies = json.load(f)

def get_reasoning(c):
    nazwa = c.get('nazwy', {}).get('pelna', '')
    data_wpisu = c.get('krs_wpisy', {}).get('pierwszy_data', '')
    if not data_wpisu:
        data_wpisu = "ostatnich miesiącach"
    return f"To nowo założona firma (rejestracja w {data_wpisu}) o profilu hurtowo-detalicznym w branży oświetleniowej/elektro. Idealny, perspektywiczny partner B2B dla produktów Scharfer i Prescot – są na etapie budowania relacji dostawczych i asortymentu."

company_map = {}
for c in companies:
    nazwa = c.get("nazwy", {}).get("pelna", "")
    miasto = c.get("adres", {}).get("miejscowosc", "")
    search_str = f"{nazwa} {miasto}"
    company_map[search_str.lower()] = c

extracted_data = {}
for res in results:
    s_string = res.get("searchString", "").lower()
    extracted_data[s_string] = {
        "phone": res.get("phone") or res.get("phoneUnformatted", ""),
        "website": res.get("website", "")
    }

final_leads = []
dropped = 0

for search_str, c in company_map.items():
    ext = extracted_data.get(search_str, {})
    phone = ext.get("phone", "")
    
    rejestr_emaile = c.get("kontakt", {}).get("emaile", [])
    email = rejestr_emaile[0] if rejestr_emaile else ""
    
    if not phone and not email:
        dropped += 1
        continue
        
    nazwa = c.get("nazwy", {}).get("pelna", "")
    nip = c.get("numery", {}).get("nip", "")
    miasto = c.get("adres", {}).get("miejscowosc", "")
    
    lead = {
        "PKD": c.get("dzialalnosci", {}).get("przewazajace_dzial", "Oświetlenie/Elektro"),
        "Branża": "Hurt/Detal LED",
        "Nazwa Firmy": nazwa,
        "Miejscowość": miasto,
        "NIP": nip,
        "Email": email,
        "Telefon": phone,
        "Strona WWW": ext.get("website", ""),
        "Osoba Decyzyjna (KRS)": "Zarząd / Właściciel",
        "Dlaczego ta firma?": get_reasoning(c)
    }
    final_leads.append(lead)

df = pd.DataFrame(final_leads)
out_path = "/Users/karolbohdanowicz/Downloads/PRESCOT_FINAL_NOWE_FIRMY_PELNE_KONTAKTY_2026.xlsx"
df.to_excel(out_path, index=False)

print(f"Sukces! Odnaleziono numery/maile dla {len(final_leads)} firm. Odrzucono {dropped} bez danych kontaktowych.")
