import requests
from bs4 import BeautifulSoup
import json
import re
import os

ids_to_scrape = {
    "45": {"ts": "kisajno-data.ts", "dir": "kisajno"},
    "48": {"ts": "mikolajki-data.ts", "dir": "mikolajki"},
    "47": {"ts": "cottages-data.ts", "dir": "skorupki"},
    "28": {"ts": "pokoje-fuleda-data.ts", "dir": "fuleda"},
    "26": {"ts": "fuleda-data.ts", "dir": "fuleda", "part": "parter"},
    "27": {"ts": "fuleda-data.ts", "dir": "fuleda", "part": "pietro"},
}

for idd, target in ids_to_scrape.items():
    url = f"https://client37851.idobooking.com/book-now/index.php?module=modal-room&id={idd}"
    try:
        print(f"Fetching ID {idd} for {target['ts']}...")
        r = requests.get(url, timeout=10)
        soup = BeautifulSoup(r.text, 'html.parser')
        title = soup.find('h4').text.strip() if soup.find('h4') else ""
        
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
                    
        # Download images
        target_dir = f"public/images/{target['dir']}"
        os.makedirs(target_dir, exist_ok=True)
        
        local_imgs = []
        
        prefix = target.get('part', '')
        if prefix:
            prefix += "_"
            
        for i, img_url in enumerate(imgs):
            filename = f"ido_{prefix}{idd}_{i+1}.jpg"
            filepath = os.path.join(target_dir, filename)
            local_imgs.append(f"/images/{target['dir']}/{filename}")
            if not os.path.exists(filepath):
                img_data = requests.get(img_url).content
                with open(filepath, 'wb') as f:
                    f.write(img_data)
        
        print(f"Scraped ID {idd}: {title} | {len(local_imgs)} imgs downloaded")
        
        # Patch the TS file
        ts_path = f"src/data/{target['ts']}"
        if not os.path.exists(ts_path):
            print(f"NOT FOUND: {ts_path}")
            continue
            
        with open(ts_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        safe_title = title.replace('"', '\\"')
        
        if 'part' in target:
            part_id = target['part']
            pattern = re.compile(rf'(id:\s*[\'"]{part_id}[\'"].*?description:\s*[\'"`])(.*?)([\'"`],.*?gallery:\s*\{{\s*heroImage:\s*)([^,]+)(,\s*images:\s*\[)([^\]]*)(\])', re.DOTALL)
            
            def repl(m):
                new_hero = f'getAssetPath("{local_imgs[0]}")' if local_imgs else '""'
                new_imgs = ",\\n".join([f'                getAssetPath("{img}")' for img in local_imgs])
                return m.group(1) + desc + m.group(3) + new_hero + m.group(5) + "\\n" + new_imgs + "\\n            " + m.group(7)
                
            content = pattern.sub(repl, content)
            
            # Since fuleda has parter and pietro, title is inside the same block!
            # We can replace title manually or just keep existing title (e.g. Parter). 
            # IdoBooking calls them "Fuleda - Apartament z 1 sypialnią (parter)". The user just wanted 1:1 desc and images. Let's update title too.
            title_pat = re.compile(rf'(id:\s*[\'"]{part_id}[\'"].*?title:\s*[\'"])(.*?)([\'"],)', re.DOTALL)
            content = title_pat.sub(rf'\g<1>{safe_title}\g<3>', content)
            
        elif target['ts'] == "cottages-data.ts":
            pattern = re.compile(r'(id:\s*[\'"]S\d+[\'"].*?description:\s*[\'"`])(.*?)([\'"`],.*?gallery:\s*\{{\s*heroImage:\s*)([^,]+)(,\s*images:\s*\[)([^\]]*)(\])', re.DOTALL)
            
            def repl(m):
                new_hero = f'getAssetPath("{local_imgs[0]}")' if local_imgs else '""'
                new_imgs = ",\\n".join([f'                getAssetPath("{img}")' for img in local_imgs])
                return m.group(1) + desc + m.group(3) + new_hero + m.group(5) + "\\n" + new_imgs + "\\n            " + m.group(7)
                
            content = pattern.sub(repl, content)
            # The title of domki might be just generic like "Mikołajki Skorupki - Domki nad jeziorem"
            # It's better to keep S1, S2 etc. or replace all? I will replace all.
            # No wait, I won't replace title for cottages since they are S1, S2 etc.
            
        else:
            pattern = re.compile(r'(description:\s*[\'"`])(.*?)([\'"`],.*?gallery:\s*\{{\s*heroImage:\s*)([^,]+)(,\s*images:\s*\[)([^\]]*)(\])', re.DOTALL)
            
            def repl(m):
                new_hero = f'getAssetPath("{local_imgs[0]}")' if local_imgs else '""'
                new_imgs = ",\\n".join([f'                getAssetPath("{img}")' for img in local_imgs])
                return m.group(1) + desc + m.group(3) + new_hero + m.group(5) + "\\n" + new_imgs + "\\n            " + m.group(7)
                
            content = pattern.sub(repl, content)
            
            title_pattern = re.compile(r'(title:\s*[\'"])(.*?)([\'"],)')
            content = title_pattern.sub(rf'\g<1>{safe_title}\g<3>', content)

        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    except Exception as e:
        print(f"Error for ID {idd}: {e}")

print("DONE")
