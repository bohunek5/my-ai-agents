import requests
import json
import time

API_KEY = "93d1bff4-dfc0-41e5-acb7-49aef5b3f248"
HEADERS = {"Authorization": API_KEY}
PKDS = ["46.43.Z", "46.47.Z", "47.59.Z", "27.40.Z", "46.69.Z", "43.21.Z"]
DATE_FROM = "2026-04-01"
DATE_TO = "2026-06-11"

all_companies = []

for pkd in PKDS:
    page = 1
    while True:
        url = "https://rejestr.io/api/v2/org"
        params = {
            "dowolny_pkd": pkd,
            "wpis_pierwszy_data": f"gte:{DATE_FROM},lte:{DATE_TO}",
            "czy_wykreslona": "0",
            "czy_w_likwidacji": "0",
            "czy_w_upadlosci": "0",
            "czy_w_zawieszeniu": "0",
            "ile_na_strone": 100,
            "strona": page
        }
        print(f"Fetching {pkd} page {page}...")
        res = requests.get(url, headers=HEADERS, params=params)
        if res.status_code != 200:
            print("Error:", res.status_code, res.text)
            break
            
        data = res.json()
        wyniki = data.get("wyniki", [])
        if not wyniki:
            break
            
        all_companies.extend(wyniki)
        
        if len(wyniki) < 100:
            break
        page += 1
        time.sleep(1) # rate limit

# Save raw output
with open("/Users/karolbohdanowicz/my-ai-agents/raw_companies.json", "w", encoding="utf-8") as f:
    json.dump(all_companies, f, ensure_ascii=False, indent=2)

print(f"Fetched {len(all_companies)} companies total.")
