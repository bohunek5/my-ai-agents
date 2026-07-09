import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        captured_data = {}

        async def handle_response(response):
            if "api" in response.url and response.status == 200:
                try:
                    data = await response.json()
                    # Check if it has offer data
                    print(f"API url: {response.url}")
                    with open("last_api.json", "w") as f:
                        json.dump(data, f)
                except:
                    pass

        page.on("response", handle_response)
        print("Navigating to ID 45...")
        # Just goto and wait 5 seconds. Don't wait for networkidle or domcontentloaded
        await page.goto("https://client37851.idobooking.com/pl/szczegoly-id45", wait_until="load", timeout=15000)
        await page.wait_for_timeout(5000)
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
