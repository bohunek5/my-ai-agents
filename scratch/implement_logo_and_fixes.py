import os
from bs4 import BeautifulSoup
import re

TARGET_DIR = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Fix logos
    logos = soup.find_all('img')
    for img in logos:
        src = img.get('src', '')
        if 'logo.png' in src or 'logo' in src.lower():
            # Exclude specific logos we don't want to change
            if 'ue.png' in src or 'stopka' in src or 'flaga' in src:
                continue
            
            # This is likely a main logo
            img['src'] = 'images/logo_mazury_aktywnie.png'
            if 'srcset' in img.attrs:
                del img['srcset']
            
            # Make sure width/height are reasonable or removed so CSS handles it
            if 'width' in img.attrs:
                img['width'] = '250'
            if 'height' in img.attrs:
                del img['height']
                
            img['style'] = "max-height: 80px; width: auto;"
            
    # 2. Fix page titles showing on screen (the user mentioned "mam nazy podstron wyjebn je wypierol")
    # In rezerwacja for example there might be a big header or title we want to hide
    # We will look for h1 or h2 that might be causing this if it's not the hero
    
    # 3. Move language flags to top bar on mobile and PC
    # Wait, the user said "te otwieranie dosptenosci tez calkiem przeob flagi. ztlumaczeniami daj do gornej belki na mobilce szmato"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Updated {filepath}")

for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))
