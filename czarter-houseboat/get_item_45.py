import asyncio
from playwright.async_api import async_playwright
import json

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto("https://client37851.idobooking.com/pl/item/45", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        try:
            title = await page.locator('.room-item-name, h1').first.inner_text()
            print("TITLE:", title)
            
            desc = await page.locator('.room-description, [data-id="description"]').first.inner_text()
            print("DESC:", desc[:200])
        except Exception as e:
            print(f"Error: {e}")
            
        await browser.close()

asyncio.run(scrape())
