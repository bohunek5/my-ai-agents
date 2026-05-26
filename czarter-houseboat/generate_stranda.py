import requests
from bs4 import BeautifulSoup
import re
import os

stranda_ids = [22, 23, 24, 25, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46]

target_dir = "public/images/stranda"
os.makedirs(target_dir, exist_ok=True)

new_apartments = []

for idd in stranda_ids:
    url = f"https://client37851.idobooking.com/book-now/index.php?module=modal-room&id={idd}"
    try:
        print(f"Fetching ID {idd}...")
        r = requests.get(url, timeout=10)
        soup = BeautifulSoup(r.text, 'html.parser')
        title = soup.find('h4').text.strip() if soup.find('h4') else ""
        
        # Try to guess unit name from title (e.g. B104, B202)
        unit = ""
        m = re.search(r'([ABC]\d{3})', title)
        if m:
            unit = m.group(1)
        else:
            # Maybe it's "Apartament z 2 sypialniami" without a number? 
            # If no number, we'll assign a temporary key like ID_43
            unit = f"ID_{idd}"

        building = unit[0] if unit.startswith(('A','B','C')) else "C" # Default to C
        
        desc_div = soup.find('div', class_='room-descr')
        desc = ""
        if desc_div:
            desc = "\\n".join(p.text.strip().replace('"', '\\"') for p in desc_div.find_all('p') if p.text.strip())
            
        imgs = []
        for a in soup.find_all('a', attrs={'data-imagelightbox': 'f'}):
            href = a.get('href')
            if href:
                full_url = f"https://client37851.idobooking.com{href}"
                if full_url not in imgs:
                    imgs.append(full_url)
                    
        local_imgs = []
        for i, img_url in enumerate(imgs):
            filename = f"ido_{idd}_{i+1}.jpg"
            filepath = os.path.join(target_dir, filename)
            local_imgs.append(f"/images/stranda/{filename}")
            if not os.path.exists(filepath):
                img_data = requests.get(img_url).content
                with open(filepath, 'wb') as f:
                    f.write(img_data)
        
        # Parse amenities from description.
        # IdoBooking descriptions usually have lines like:
        # Wyposażenie salonu: TV, kominek...
        # Wyposażenie kuchni: ...
        living = []
        kitchen = []
        bedroom = []
        bathroom = []
        terrace = []
        
        desc_lines = desc.split('\\n')
        for line in desc_lines:
            lower_line = line.lower()
            if "wyposażenie salonu:" in lower_line:
                items = line.split(':')[1].split(',')
                living = [x.strip() for x in items if x.strip()]
            elif "wyposażenie kuchni:" in lower_line:
                items = line.split(':')[1].split(',')
                kitchen = [x.strip() for x in items if x.strip()]
            elif "wyposażenie sypialni:" in lower_line:
                items = line.split(':')[1].split(',')
                bedroom = [x.strip() for x in items if x.strip()]
            elif "wyposażenie łazienki:" in lower_line:
                items = line.split(':')[1].split(',')
                bathroom = [x.strip() for x in items if x.strip()]
            elif "taras" in lower_line and ":" in lower_line:
                items = line.split(':')[1].split(',')
                terrace.extend([x.strip() for x in items if x.strip()])
                
        # Determine type
        apt_type = 'studio'
        if '1 sypialni' in title.lower() or 'jedną sypialni' in title.lower():
            apt_type = 'oneBedroom'
        elif '2 sypialni' in title.lower() or 'dwoma sypialni' in title.lower():
            apt_type = 'twoBedrooms'
        elif 'jacuzzi' in title.lower():
            apt_type = 'jacuzzi'

        # Build JS string
        safe_title = title.replace('`', '')
        safe_desc = desc.replace('`', '')
        
        imgs_str = ",\\n                ".join(f'getAssetPath("{img}")' for img in local_imgs)
        hero_img = f'getAssetPath("{local_imgs[0]}")' if local_imgs else '""'
        
        living_str = str(living) if living else "[]"
        kitchen_str = str(kitchen) if kitchen else "[]"
        bedroom_str = str(bedroom) if bedroom else "[]"
        bathroom_str = str(bathroom) if bathroom else "[]"
        terrace_str = str(terrace) if terrace else "[]"

        block = f"""
    '{unit}': {{
        id: '{unit}',
        building: '{building}',
        type: '{apt_type}',
        price: 300,
        guests: '4',
        title: `{safe_title}`,
        description: `{safe_desc}`,
        amenities: {{
            living: {living_str},
            kitchen: {kitchen_str},
            bedroom: {bedroom_str},
            bathroom: {bathroom_str},
            terrace: {terrace_str}
        }},
        gallery: {{
            heroImage: {hero_img},
            images: [
                {imgs_str}
            ]
        }},
        idoBookingId: '{idd}',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/{idd}/key/da39a3ee5e6b4b0d3255bfef95601890afd80709'
    }},"""
        new_apartments.append(block)
        
    except Exception as e:
        print(f"Error for ID {idd}: {e}")

# Write to a patch file
with open("stranda_new_blocks.ts", "w", encoding="utf-8") as f:
    f.write("\\n".join(new_apartments))

print("DONE extracting stranda")
