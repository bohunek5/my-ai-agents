import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1200, "height": 800})
        page = await context.new_page()
        
        pdf_path = "/Users/karolbohdanowicz/Downloads/NAILBAR_tablica_dofinansowanie_UE.pdf"
        url = f"file://{pdf_path}"
        print(f"Opening: {url}")
        await page.goto(url)
        # Wait a bit for the PDF viewer to render
        await page.wait_for_timeout(3000)
        
        screenshot_path = "/Users/karolbohdanowicz/my-ai-agents/NAILBAR/scratch/pdf_screenshot.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to: {screenshot_path}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
