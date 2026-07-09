import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        async def handle_response(response):
            print(f"URL: {response.url}")

        page.on("response", handle_response)
        
        try:
            await page.goto("https://client37851.idobooking.com/pl/szczegoly-id45", wait_until="networkidle")
        except:
            pass
            
        await page.wait_for_timeout(3000)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
