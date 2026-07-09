import re
with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# page.html contains JSON like "item_id": 1, "item_name": "..."
matches = re.finditer(r'\{"item_id":(\d+),"item_name":"([^"]+)"', html)
offers = {}
for m in matches:
    idd = m.group(1)
    name = m.group(2).encode('utf-8').decode('unicode_escape')
    offers[idd] = name

print("--- OFFERS ---")
for k, v in sorted(offers.items(), key=lambda x: int(x[0])):
    print(f"{k}: {v}")
