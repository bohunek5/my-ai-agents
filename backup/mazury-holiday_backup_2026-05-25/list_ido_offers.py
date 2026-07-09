import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("Navigating to idobooking main page...")
        await page.goto("https://client37851.idobooking.com/pl/search", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        # Get all offer links
        links = await page.locator('a[href*="szczegoly-id"]').all()
        ids = set()
        for link in links:
            href = await link.get_attribute("href")
            if href:
                idd = href.split("szczegoly-id")[1].split("?")[0]
                ids.add(idd)
                
        print(f"Found IDs: {ids}")
        
        # also get titles
        titles = await page.locator('.room-item-name, .offer-name').all()
        for t in titles:
            print(f"Title: {await t.inner_text()}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
