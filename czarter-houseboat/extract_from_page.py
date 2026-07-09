from bs4 import BeautifulSoup
import json

with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

items = soup.find_all('div', class_='room-item')
results = {}

for item in items:
    name_el = item.find('h2', class_='room-name-h2')
    if not name_el: continue
    name = name_el.text
    
    idd = None
    if 'Apartament typu Studio' in name and '(A103)' not in name and '(C304)' not in name:
        idd = '32'
    elif 'Apartament z 1 sypialnią' in name and '(' not in name:
        idd = '44'
    elif 'Apartament z 2 sypialniami' in name and '(' not in name:
        idd = '43'
        
    if idd:
        desc_el = item.find('div', class_='room-item-description-element-span')
        desc = desc_el.text if desc_el else ''
        
        imgs = []
        gallery = item.find('div', class_='fotorama') or item.find('div', class_='gallery')
        if gallery:
            for img in gallery.find_all('img'):
                src = img.get('src') or img.get('data-src')
                if src: imgs.append(src)
                
        results[idd] = { 'name': name, 'desc': desc, 'images': imgs }

with open('extracted_ido.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("Done extracting!")
