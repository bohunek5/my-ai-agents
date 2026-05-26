import json
import time
from playwright.sync_api import sync_playwright

def scrape_ido():
    url = "https://client37851.idobooking.com/"
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        
        # Wait a bit for React to render
        time.sleep(3)
        
        # In IdoBooking, the initial state is often embedded in a script tag (e.g. window.__INITIAL_STATE__)
        # Let's try to extract all offer details from the DOM
        script = """
        () => {
            const results = {};
            // find all offer links
            const links = document.querySelectorAll('a[href*="ob["]');
            for (let a of links) {
                const match = a.href.match(/ob\[(\d+)\]/);
                if (match) {
                    const id = match[1];
                    if (['32', '43', '44'].includes(id)) {
                        results[id] = a.href;
                    }
                }
            }
            return results;
        }
        """
        urls = page.evaluate(script)
        print("Found URLs:", urls)
        
        # Now visit each URL to get description and photos
        details = {}
        for idd, link in urls.items():
            print(f"Fetching {link}...")
            page.goto("https://client37851.idobooking.com/" + link if not link.startswith('http') else link, wait_until="networkidle")
            time.sleep(2)
            
            # Extract description
            desc = page.evaluate("""() => {
                const el = document.querySelector('.object_description, .description, [class*="description"]');
                return el ? el.innerText : '';
            }""")
            
            # Extract images
            images = page.evaluate("""() => {
                const imgs = document.querySelectorAll('img');
                const urls = [];
                for (let img of imgs) {
                    if (img.src.includes('idosell') || img.src.includes('client')) {
                        // filter out small thumbs, try to get big versions
                        if (img.src.includes('/large/') || img.src.includes('/big/')) {
                            urls.push(img.src);
                        } else if (img.src.includes('/thumb/')) {
                            urls.push(img.src.replace('/thumb/', '/large/'));
                        } else {
                            urls.push(img.src);
                        }
                    }
                }
                return [...new Set(urls)].slice(0, 5); // first 5 unique images
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
