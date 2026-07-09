import re
import os

data_dir = '/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/src/data'
files = [f for f in os.listdir(data_dir) if f.endswith('.ts')]

print("# Udogodnienia - Strona (Mazury Holiday)\n")

for file in files:
    with open(os.path.join(data_dir, file), 'r', encoding='utf-8') as f:
        content = f.read()

    # Some files use arrays of objects, some use records (objects with keys). 
    # Let's extract by looking for "title:" ... "premiumAmenities:" ... "amenities:" 
    # This regex is a bit generic. We'll look for blocks that have title and amenities.
    
    # Let's find blocks like: { ... title: 'X', ... premiumAmenities: [ ... ], ... amenities: [ ... ] }
    # Since they can have newlines, we'll use a broad regex
    blocks = re.split(r'id:\s*[\'"]', content)
    
    if len(blocks) > 1:
        print(f"\n## --- {file} ---")
        for block in blocks[1:]:
            title_m = re.search(r'title:\s*[\'"]([^\'"]+)', block)
            if not title_m:
                continue
            title = title_m.group(1)
            
            ido_m = re.search(r'idoBookingId:\s*[\'"]([^\'"]+)', block)
            ido = ido_m.group(1) if ido_m else "Brak"
            
            premium_m = re.search(r'premiumAmenities:\s*\[(.*?)\]', block, re.DOTALL)
            premium_str = premium_m.group(1) if premium_m else ""
            premium = [p.strip().strip("'\"") for p in premium_str.split(',') if p.strip() and not p.strip().startswith('//')]
            
            amenities_m = re.search(r'amenities:\s*\[(.*?)\]', block, re.DOTALL)
            amenities_str = amenities_m.group(1) if amenities_m else ""
            amenities = [a.strip().strip("'\"") for a in amenities_str.split(',') if a.strip() and not a.strip().startswith('//')]
            
            print(f"\n### {title} (IdoBooking: {ido})")
            print(f"**Premium:** {', '.join(premium) if premium else 'Brak'}")
            print(f"**Standard:** {', '.join(amenities) if amenities else 'Brak'}")
