import re
from bs4 import BeautifulSoup

with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

offers = soup.find_all('div', class_='room-item')

for offer in offers:
    name_el = offer.find('h2', class_='room-name-h2')
    if not name_el: continue
    name = name_el.text
    if 'Apartament typu Studio' in name or 'Apartament z 1 sypialnią' in name or 'Apartament z 2 sypialniami' in name:
        if '(A103)' in name or '(A204)' in name or '(A205)' in name or '(A305)' in name or '(A302)' in name or '(C301)' in name or '(nr15)' in name:
            continue # skip named ones
            
        print("===" * 10)
        print("Found:", name)
        desc_el = offer.find('div', class_='room-item-description-element-span')
        if desc_el:
            print("Desc:", desc_el.text)
        
        # find images
        gallery = offer.find('div', class_='gallery')
        if gallery:
            imgs = gallery.find_all('img')
            for i in imgs[:5]:
                print("Image:", i.get('src') or i.get('data-src'))
        
