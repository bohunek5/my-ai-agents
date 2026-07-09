import urllib.request
import re
from bs4 import BeautifulSoup
import json

def get_ido_details(ido_id):
    url = f"https://client37851.idobooking.com/pl/szczegoly-id{ido_id}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            soup = BeautifulSoup(html, 'html.parser')
            
            # Find the title
            title_el = soup.select_one('h1')
            title = title_el.text.strip() if title_el else "Unknown"
            
            # Find description
            desc_el = soup.select_one('.description-text')
            desc = desc_el.text.strip() if desc_el else ""
            if not desc:
                # alternative place for description?
                desc_el = soup.select_one('.section-description')
                desc = desc_el.text.strip() if desc_el else ""
            
            # Find photos
            # IdoBooking galleries are usually inside div with data-photos or img with class that reveals original
            images = []
            for img in soup.select('img'):
                src = img.get('src', '')
                if '/img/galerie/' in src or '/img/obiekty/' in src:
                    # try to get high res
                    high_res = src.replace('1_1_250_250', '4').replace('_1.jpg', '_4.jpg')
                    if high_res not in images:
                        images.append(high_res)
            
            print(f"ID {ido_id}: {title}")
            print(f"Desc: {desc}")
            print(f"Images: {len(images)}")
            return {"title": title, "desc": desc, "images": images}
    except Exception as e:
        print(f"Failed to fetch ID {ido_id}: {e}")
        return None

get_ido_details(45)
get_ido_details(31)
get_ido_details(28)
