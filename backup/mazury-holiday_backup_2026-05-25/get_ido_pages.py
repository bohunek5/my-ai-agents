import urllib.request
from bs4 import BeautifulSoup
import json

urls = {
    '32': 'https://client37851.idobooking.com/pl/apartamenty-typu-studio',
    '44': 'https://client37851.idobooking.com/pl/apartament-z-1-sypialnia',  # guess
    '43': 'https://client37851.idobooking.com/pl/apartament-typu-suite-z-dwoma-sypialniami'
}

results = {}
for key, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        
        # Get description
        content_div = soup.find('div', class_='milenia-entity-content')
        if content_div:
            desc = content_div.get_text(separator='\n', strip=True)
        else:
            desc = ""
            for p in soup.find_all('p'):
                if "znajdują się w budynku" in p.text:
                    desc += p.text + "\n"
        
        # Get images
        imgs = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if 'galerie' in src and ('_4.jpg' in src or '_3.jpg' in src or '_7.jpg' in src):
                imgs.append(src if src.startswith('http') else 'https://client37851.idobooking.com' + src)
        
        imgs = list(dict.fromkeys(imgs))
        
        results[key] = {
            'desc': desc.strip(),
            'images': imgs
        }
        print(f"Scraped {key}: {len(imgs)} images, desc length: {len(desc)}")
    except Exception as e:
        print(f"Failed {key}: {e}")

with open('ido_scraped_data.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

