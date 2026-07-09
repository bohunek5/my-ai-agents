import asyncio
from playwright.async_api import async_playwright

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto("https://client37851.idobooking.com/pl/szczegoly-id15", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        try:
            body = await page.locator("body").inner_text()
            print("ID 15 BODY START===\n" + body[:1000] + "\nBODY END===")
        except Exception as e:
            print(f"Error: {e}")
            
        await browser.close()

asyncio.run(scrape())
