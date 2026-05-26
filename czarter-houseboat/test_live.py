from playwright.sync_api import sync_playwright

def test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
        
        print("Navigating...")
        resp = page.goto("https://zeglarstwomazury.pl/apartamenty/", wait_until="networkidle")
        print(f"Status: {resp.status}")
        
        content = page.evaluate("document.body.innerHTML")
        print(f"Body length: {len(content)}")
        
        has_nasze = "Nasze Apartamenty" in content
        print(f"Contains 'Nasze Apartamenty': {has_nasze}")
        
        browser.close()

if __name__ == "__main__":
    test()
