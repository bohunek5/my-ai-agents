import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating to client37851.idobooking.com/pl/search...")
        await page.goto("https://client37851.idobooking.com/pl/search", wait_until="networkidle")
        
        # Click "Szukaj" to show all
        await page.click('button.search-panel-submit')
        await page.wait_for_timeout(3000)
        
        # Scroll down to load all
        for _ in range(10):
            await page.mouse.wheel(0, 1000)
            await page.wait_for_timeout(500)
            
        items = await page.locator('.room-item').all()
        print(f"Found {len(items)} room items")
        for item in items:
            name_el = await item.locator('.room-item-name').first
            name = await name_el.inner_text() if name_el else "Unknown"
            
            link_el = await item.locator('a.room-item-link').first
            href = await link_el.get_attribute('href') if link_el else ""
            
            idd = ""
            if href and 'id=' in href:
                idd = href.split('id=')[1].split('&')[0]
                
            print(f"ID {idd}: {name.strip()}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
