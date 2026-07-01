import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin, urlparse

url = "https://skutery-gizycko.pl/"
output_dir = "assets/images"

os.makedirs(output_dir, exist_ok=True)

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

images = soup.find_all('img')
for img in images:
    src = img.get('src')
    if not src:
        continue
    if src.startswith('data:'):
        continue
        
    full_url = urljoin(url, src)
    if 'wp-smiley' in full_url or 'wp-emoji' in full_url:
        continue
        
    parsed_url = urlparse(full_url)
    filename = os.path.basename(parsed_url.path)
    
    if not filename:
        continue
        
    try:
        img_data = requests.get(full_url).content
        with open(os.path.join(output_dir, filename), 'wb') as f:
            f.write(img_data)
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed to download {full_url}: {e}")

# also get background images from inline styles if any
import re
styles = soup.find_all('style')
for style in styles:
    if style.string:
        urls = re.findall(r'url\((.*?)\)', style.string)
        for bg_url in urls:
            bg_url = bg_url.strip('\'"')
            full_url = urljoin(url, bg_url)
            parsed_url = urlparse(full_url)
            filename = os.path.basename(parsed_url.path)
            if not filename:
                continue
            try:
                img_data = requests.get(full_url).content
                with open(os.path.join(output_dir, filename), 'wb') as f:
                    f.write(img_data)
                print(f"Downloaded bg: {filename}")
            except Exception as e:
                pass
