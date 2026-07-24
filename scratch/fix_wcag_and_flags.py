import os
from bs4 import BeautifulSoup
import re

TARGET_DIR = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"

def process_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Remove page names showing on screen (like "Rezerwacja Online" overlapping with logo)
    # The user says "w szablonie cos jest ciagle mam nazy podstron wyjebn je wypierol"
    # Usually this is in a specific Elementor heading widget that is part of the page content or template
    headings = soup.find_all(['h1', 'h2'])
    for h in headings:
        text = h.get_text().strip().lower()
        if text in ['rezerwacja online', 'rezerwacja', 'fundusze europejskie', 'o nas', 'kontakt', 'nasza flota', 'sukces']:
            # We want to hide this heading entirely if it's the standalone page title
            h['style'] = "display: none !important;"
            print(f"Hid heading '{text}' in {os.path.basename(filepath)}")

    # 2. Fix accessibility (WCAG) button and flags
    # The user says "te otwieranie dosptenosci tez calkiem przeob flagi. ztlumaczeniami daj do gornej belki na mobilce szmato"
    
    # Let's see if we can find the language switcher widget and move it
    # We might need to add some custom CSS to ensure it displays correctly in the top bar on mobile
    
    # First, let's inject a CSS rule for the language switcher and WCAG to be in the top bar on mobile
    style_tag = soup.new_tag("style")
    style_tag.string = """
    /* Mobile Top Bar Fixes for Flags and WCAG */
    @media (max-width: 767px) {
        .trp-language-switcher {
            display: flex !important;
            position: absolute !important;
            top: 15px !important;
            right: 70px !important; /* Make room for hamburger menu */
            z-index: 9999 !important;
        }
        
        .elementor-widget-nav-menu .trp-language-switcher {
            display: none !important; /* Hide from standard mobile menu if duplicated */
        }
        
        #wcag-toggle-btn {
            top: auto !important;
            bottom: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important; /* Center at bottom on mobile */
            width: auto !important;
            padding: 10px 20px !important;
            border-radius: 20px !important;
        }
    }
    
    /* PC WCAG Fixes */
    @media (min-width: 768px) {
        #wcag-toggle-btn {
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
        }
        #wcag-panel {
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            top: 50% !important;
        }
    }
    """
    
    head = soup.find('head')
    if head:
        head.append(style_tag)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))

for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.html'):
            process_html(os.path.join(root, file))
            
print("WCAG and Flags CSS fixes applied.")
