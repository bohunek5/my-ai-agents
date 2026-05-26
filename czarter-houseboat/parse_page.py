import re
import json

with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/page.html', 'r') as f:
    html = f.read()

# IdoBooking structure:
# Typically there's an offer container with data-id="32"
# Let's search for "ob[32]" or "id=32" or data-id="32"

for target_id in ['32', '43', '44']:
    print(f"--- Searching for ID {target_id} ---")
    # find something like offer-32 or data-id="32"
    matches = re.finditer(f'data-id="{target_id}"', html)
    for m in matches:
        start = max(0, m.start() - 1000)
        end = min(len(html), m.end() + 2000)
        snippet = html[start:end]
        
        # Try to find images
        imgs = re.findall(r'<img[^>]*src="([^"]+)"', snippet)
        print("Images:", [i for i in imgs if 'client' in i or 'idosell' in i][:3])
        
        # Try to find desc
        desc_match = re.search(r'<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)</div>', snippet, re.DOTALL)
        if desc_match:
            print("Desc:", re.sub(r'<[^>]+>', '', desc_match.group(1)).strip())
        break
