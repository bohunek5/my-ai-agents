import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1200, "height": 6000}, device_scale_factor=1)
        
        file_path = "file:///Users/karolbohdanowicz/my-ai-agents/scharfer_ads.html"
        await page.goto(file_path)
        
        # Wait for any fonts/images to load
        await page.wait_for_load_state('networkidle')
        await asyncio.sleep(1) # Extra wait for fonts
        
        # Remove scaling so screenshots are full size
        await page.evaluate('''() => {
            const wrappers = document.querySelectorAll('.scale-wrapper');
            wrappers.forEach(w => {
                w.style.transform = 'none';
                w.style.marginBottom = '0';
            });
            
            // Hide button and header just in case
            document.querySelector('header').style.display = 'none';
            
            // Adjust body margin to fit full graphics
            document.body.style.margin = "0";
            document.body.style.padding = "0";
        }''')
        
        # Wait a bit for layout recalculation
        await asyncio.sleep(0.5)
        
        downloads_dir = "/Users/karolbohdanowicz/Downloads/"
        
        graphics = [
            {'id': '#graphic-1', 'name': 'Scharfer_Wariant_1_IP67.png'},
            {'id': '#graphic-2', 'name': 'Scharfer_Wariant_2_Gwarancja.png'},
            {'id': '#graphic-3', 'name': 'Scharfer_Wariant_3_Specyfikacja.png'},
            {'id': '#graphic-4', 'name': 'Scharfer_Wariant_4_Problem.png'},
            {'id': '#graphic-5', 'name': 'Scharfer_Wariant_5_B2B.png'}
        ]
        
        for g in graphics:
            element = page.locator(g['id'])
            await element.screenshot(path=os.path.join(downloads_dir, g['name']))
            print(f"Zapisano: {g['name']}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
