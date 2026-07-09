import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        all_offers = []

        async def handle_response(response):
            # The search API usually ends with something like 'search' or returns JSON
            if "search" in response.url and response.status == 200:
                try:
                    data = await response.json()
                    # Check if it has items
                    if "items" in data:
                        print("Found items in API response!")
                        for item in data["items"]:
                            print(f"ID {item.get('item_id')}: {item.get('item_name')}")
                            all_offers.append(item)
                except:
                    pass

        page.on("response", handle_response)

        print("Navigating to search page...")
        await page.goto("https://client37851.idobooking.com/pl/search")
        
        # Wait for the network idle
        await page.wait_for_timeout(5000)
        
        # Try to type "Domek" in the search or just click search
        try:
            await page.click('button.search-panel-submit', timeout=5000)
            await page.wait_for_timeout(3000)
        except Exception as e:
            print("Could not click search button")

        # Let's see if we captured offers
        if not all_offers:
            # Let's just evaluate the global window variable if any
            state = await page.evaluate("window.__INITIAL_STATE__")
            if state:
                print("Found __INITIAL_STATE__")
                # Try to dump it
                with open("ido_state.json", "w") as f:
                    json.dump(state, f)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
