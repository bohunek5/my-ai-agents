import json
import time
from playwright.sync_api import sync_playwright

def scrape_ido_search():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Go to booking page
        page.goto("https://client37851.idobooking.com/pl/search/offers", wait_until="networkidle")
        time.sleep(5)
        
        # Extract all offers
        script = """
        () => {
            const results = {};
            const items = document.querySelectorAll('.room-item');
            for (let item of items) {
                const nameEl = item.querySelector('.room-name-h2');
                if (!nameEl) continue;
                const name = nameEl.innerText;
                
                // Try to find the data-id or ob[] link
                let idd = null;
                const link = item.querySelector('a[href*="ob["]');
                if (link) {
                    const match = link.href.match(/ob\[(\d+)\]/);
                    if (match) idd = match[1];
                }
                if (!idd) {
                    // try to find form input
                    const inp = item.querySelector('input[name="ob[]"]');
                    if (inp) idd = inp.value;
                }
                
                if (['32', '43', '44'].includes(idd)) {
                    // Extract desc
                    const descEl = item.querySelector('.room-item-description-element-span');
                    const desc = descEl ? descEl.innerText : '';
                    
                    // Extract images
                    const imgs = [];
                    const gallery = item.querySelector('.gallery, .fotorama');
                    if (gallery) {
                        const images = gallery.querySelectorAll('img');
                        for (let img of images) {
                            let src = img.src || img.dataset.src;
                            if (src && !src.includes('data:image')) {
                                imgs.push(src);
                            }
                        }
                    }
                    results[idd] = { name, desc, images: [...new Set(imgs)] };
                }
            }
            return results;
        }
        """
        data = page.evaluate(script)
        
        with open('ido_scraped_search.json', 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print("Scraped:", data.keys())
        browser.close()

if __name__ == "__main__":
    scrape_ido_search()
