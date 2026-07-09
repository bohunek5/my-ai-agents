import urllib.request
import json
import re

url = "https://client37851.idobooking.com/pl/search"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    offers = {}
    
    # Try different regexes
    # Sometimes it's inside data-id="123" data-name="Name"
    matches = re.finditer(r'data-id="(\d+)"\s*data-name="([^"]+)"', html)
    for m in matches:
        offers[m.group(1)] = m.group(2)
        
    # Another pattern
    matches2 = re.finditer(r'\{[^{]*"item_id"\s*:\s*(\d+)\s*,\s*"item_name"\s*:\s*"([^"]+)"', html)
    for m in matches2:
        idd = m.group(1)
        name = m.group(2).encode('utf-8').decode('unicode_escape')
        offers[idd] = name
        
    print(f"Found {len(offers)} offers")
    for k, v in sorted(offers.items(), key=lambda x: int(x[0])):
        print(f"ID {k}: {v}")

except Exception as e:
    print(e)
