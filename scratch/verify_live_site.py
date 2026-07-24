import sys
import asyncio

async def main():
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("Playwright not installed.")
        sys.exit(1)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))
        page.on("response", lambda res: print(f"RESPONSE ERROR: {res.url} - {res.status}") if res.status >= 400 else None)
        page.on("requestfailed", lambda req: print(f"REQUEST FAILED: {req.url} - {req.failure}"))
        print("Navigating to live site...")
        await page.goto("http://mazuryaktywnie.com.pl/", wait_until="load")
        
        # Verify text logo
        logo_text_element = await page.query_selector(".site-logo-text")
        if logo_text_element:
            print("✅ Text logo found!")
            logo_text = await logo_text_element.inner_text()
            print("   Text content: " + logo_text.strip().replace('\n', ' '))
        else:
            print("❌ Text logo NOT found!")

        # Verify accessibility button in navigation
        wcag_toggle = await page.query_selector(".wcag-menu-toggle")
        if wcag_toggle:
            print("✅ WCAG menu toggle found in navigation!")
        else:
            print("❌ WCAG menu toggle NOT found!")

        # Click the accessibility menu toggle to open the widget
        if wcag_toggle:
            print("Clicking WCAG menu toggle...")
            await wcag_toggle.click()
            await page.wait_for_timeout(1000) # wait for animation
            
            # Check if panel is visible
            panel = await page.query_selector(".ally-panel")
            if panel:
                is_visible = await panel.is_visible()
                print(f"   ally-panel visible: {is_visible}")
                
                # Check for buttons inside the panel
                contrast_btn = await page.query_selector("#toggle-contrast")
                if contrast_btn:
                    print("✅ High Contrast toggle button found inside panel!")
                    # Click contrast button
                    await page.evaluate('document.getElementById("toggle-contrast").click()')
                    print("Clicked High Contrast button via page.evaluate.")
                    await page.wait_for_timeout(1000)
            else:
                print("❌ ally-panel NOT found after clicking toggle!")

        # Save screenshot
        screenshot_path = "/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e952a235-5f1f-4ad0-a78a-6e12a83db938/verify_wcag_widget_live.png"
        await page.screenshot(path=screenshot_path)
        print(f"📸 Screenshot saved to {screenshot_path}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
