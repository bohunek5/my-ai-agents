import os
from bs4 import BeautifulSoup

TARGET_DIR = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Update logo sources to use SVG
    logos = soup.find_all('img')
    for img in logos:
        src = img.get('src', '')
        if 'logo_mazury_aktywnie.png' in src or 'logo.png' in src or 'logo' in src.lower():
            if 'ue.png' in src or 'stopka' in src or 'flaga' in src:
                continue
                
            img['src'] = 'images/logo_mazury_aktywnie.svg'
            
            # The style might need to be adjusted for SVG to display properly without cutoffs
            img['style'] = "max-height: 50px; width: auto; object-fit: contain;"
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))

for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))
            
print("Updated HTML files to use new SVG logo.")
