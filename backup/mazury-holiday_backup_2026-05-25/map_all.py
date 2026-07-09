import re
from bs4 import BeautifulSoup
import glob

# 1. Parse all IdoBooking offers from ido_15.html
with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/ido_15.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Try to find all JSON-like dictionaries in html that contain item_id and item_name
# IdoBooking stores them like {"item_id": 13, "item_name": "...", "price": ...}
offers = {}
matches = re.finditer(r'\{"item_id":(\d+),"item_name":"([^"]+)"', html)
for m in matches:
    ido = m.group(1)
    name = m.group(2).replace(r'\u017c', 'ż').replace(r'\u0105', 'ą').replace(r'\u0119', 'ę').replace(r'\u0142', 'ł').replace(r'\u00f3', 'ó').replace(r'\u015b', 'ś').replace(r'\u0107', 'ć').replace(r'\u017a', 'ź').replace(r'\u0144', 'ń')
    offers[ido] = name

print("--- IDOBOOKING OFFERS ---")
for k, v in sorted(offers.items(), key=lambda x: int(x[0])):
    print(f"{k}: {v}")

# 2. Check TS files for idoBookingId
print("\n--- TS FILES ID MAPPING ---")
for filepath in glob.glob('src/data/*.ts'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = re.findall(r"(?:id|title):\s*['\"](.*?)['\"].*?idoBookingId:\s*['\"](\d+)['\"]", content, re.DOTALL)
        if matches:
            print(f"File: {filepath}")
            for name, ido in matches:
                print(f"  {ido}: {name}")

