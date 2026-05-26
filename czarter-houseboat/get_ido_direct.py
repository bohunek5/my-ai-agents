import json
import time
from playwright.sync_api import sync_playwright

def scrape_ido():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        details = {}
        for idd in ['32', '43', '44']:
            # The direct link for an offer is usually like this:
            url = f"https://client37851.idobooking.com/pl/oferta/Apartament/{idd}"
            print(f"Fetching {url}...")
            # We don't care if the URL is "Apartament-typu-Studio", it usually redirects or loads the ID!
            response = page.goto(url, wait_until="networkidle")
            time.sleep(3)
            
            # Check if it loaded an offer
            title = page.title()
            print("Title:", title)
            
            desc = page.evaluate("""() => {
                const el = document.querySelector('.object-description, .description, [class*="description"], [class*="desc"]');
                return el ? el.innerText : '';
            }""")
            
            images = page.evaluate("""() => {
                const imgs = document.querySelectorAll('.gallery img, [class*="gallery"] img, .fotorama img');
                if (imgs.length === 0) {
                     return Array.from(document.querySelectorAll('img')).map(i => i.src);
                }
                const urls = [];
                for (let img of imgs) {
                    if (img.src.includes('idosell') || img.src.includes('client')) {
                        if (img.src.includes('/large/') || img.src.includes('/big/')) {
                            urls.push(img.src);
                        } else if (img.src.includes('/thumb/')) {
                            urls.push(img.src.replace('/thumb/', '/large/'));
                        } else {
                            urls.push(img.src);
                        }
                    }
                }
                return [...new Set(urls)].slice(0, 5);
            }""")
            
            details[idd] = {
                'desc': desc,
                'images': images
            }
            
        with open('ido_3_apartments.json', 'w') as f:
            json.dump(details, f, indent=2, ensure_ascii=False)
            
        print("Saved details to ido_3_apartments.json")
        browser.close()

if __name__ == "__main__":
    scrape_ido()
