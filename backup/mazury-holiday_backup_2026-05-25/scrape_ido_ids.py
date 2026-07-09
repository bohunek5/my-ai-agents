import asyncio
from playwright.async_api import async_playwright
import json

ids_to_scrape = [45, 31, 28, 26, 27]
scraped_data = {}

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        for idd in ids_to_scrape:
            print(f"Scraping ID {idd}...")
            # Changed wait_until to domcontentloaded to avoid hanging on analytics
            await page.goto(f"https://client37851.idobooking.com/pl/szczegoly-id{idd}", wait_until="domcontentloaded")
            await page.wait_for_timeout(3000) # Give it 3s for React to render

            try:
                title = await page.locator('h1.page-title, h1, .offer-title, .offer-name, .room-item-name').first.inner_text()
            except:
                title = f"Item {idd}"
                    
            try:
                desc = await page.locator('.room-description, .description-text, .section-description, [data-id="description"]').first.inner_text()
            except:
                desc = ""

            images = []
            img_els = await page.locator('img').all()
            for img in img_els:
                src = await img.get_attribute('src')
                if src and ('/img/galerie/' in src or '/img/obiekty/' in src):
                    high_res = src.replace('1_1_250_250', '4').replace('_1.jpg', '_4.jpg')
                    if high_res not in images:
                        images.append(high_res)

            if not images:
                bg_els = await page.locator('.photo-bg, .gallery-item').all()
                for bg in bg_els:
                    style = await bg.get_attribute('style')
                    if style and 'url(' in style:
                        src = style.split('url(')[1].split(')')[0].strip('"\'')
                        if '/img/galerie/' in src or '/img/obiekty/' in src:
                            high_res = src.replace('1_1_250_250', '4').replace('_1.jpg', '_4.jpg')
                            if high_res not in images:
                                images.append(high_res)

            print(f"ID {idd}: {title}")
            print(f"Desc: {desc[:50]}...")
            print(f"Images: {len(images)}")
            
            scraped_data[str(idd)] = {
                "title": title.strip() if title else "",
                "desc": desc.strip() if desc else "",
                "images": images
            }

        with open("ido_rest.json", "w") as f:
            json.dump(scraped_data, f, indent=4)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
