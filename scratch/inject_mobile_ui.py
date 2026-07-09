import os
from bs4 import BeautifulSoup

def get_nav_items(lang, relative_prefix):
    if lang == 'pl':
        return [
            {'icon': 'fas fa-home', 'text': 'Strona główna', 'href': f'{relative_prefix}index.html'},
            {'icon': 'fas fa-anchor', 'text': 'Czarter', 'href': f'{relative_prefix}fleets.html'},
            {'icon': 'fas fa-info-circle', 'text': 'O nas', 'href': f'{relative_prefix}about.html'},
            {'icon': 'fas fa-envelope', 'text': 'Kontakt', 'href': f'{relative_prefix}contact.html'}
        ]
    elif lang == 'en':
        return [
            {'icon': 'fas fa-home', 'text': 'Home', 'href': f'{relative_prefix}index.html'},
            {'icon': 'fas fa-anchor', 'text': 'Charter', 'href': f'{relative_prefix}fleets.html'},
            {'icon': 'fas fa-info-circle', 'text': 'About Us', 'href': f'{relative_prefix}about.html'},
            {'icon': 'fas fa-envelope', 'text': 'Contact', 'href': f'{relative_prefix}contact.html'}
        ]
    elif lang == 'de':
        return [
            {'icon': 'fas fa-home', 'text': 'Startseite', 'href': f'{relative_prefix}index.html'},
            {'icon': 'fas fa-anchor', 'text': 'Charter', 'href': f'{relative_prefix}fleets.html'},
            {'icon': 'fas fa-info-circle', 'text': 'Über uns', 'href': f'{relative_prefix}about.html'},
            {'icon': 'fas fa-envelope', 'text': 'Kontakt', 'href': f'{relative_prefix}contact.html'}
        ]

def inject_mobile_ui(filepath, root_dir):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    if "id=\"mobile-bottom-nav\"" in html:
        return

    soup = BeautifulSoup(html, 'html.parser')

    # Determine language and relative path based on directory
    rel_path = os.path.relpath(filepath, root_dir)
    dir_parts = rel_path.split(os.sep)
    
    lang = 'pl'
    relative_prefix = ''
    if len(dir_parts) > 1:
        if dir_parts[0] == 'en':
            lang = 'en'
            relative_prefix = ''
        elif dir_parts[0] == 'de':
            lang = 'de'
            relative_prefix = ''
            
    # Wait, the `href` in the same directory doesn't need `../`.
    # Wait, if we are in `/en/index.html`, linking to `fleets.html` means `/en/fleets.html`, so just `fleets.html` is fine!
    # If the file is in a deeper subfolder, we would need `../`. 
    # But all HTML files are flat inside root, `/en/`, or `/de/`. So `relative_prefix` is always just ''.
    
    relative_prefix = ''
    
    nav_items = get_nav_items(lang, relative_prefix)
    
    nav_html = '<nav id="mobile-bottom-nav">'
    for item in nav_items:
        nav_html += f'<a href="{item["href"]}" class="mobile-nav-item"><i class="{item["icon"]}"></i><span>{item["text"]}</span></a>'
    nav_html += '</nav>'
    
    nav_soup = BeautifulSoup(nav_html, 'html.parser')
    
    # CSS for the mobile UI
    style_tag = soup.new_tag("style", id="mobile-app-ui-styles")
    style_tag.string = """
    /* Hide the original mobile menu button */
    @media (max-width: 921px) {
        .ast-mobile-menu-buttons {
            display: none !important;
        }
        
        /* Padding for the bottom nav */
        body {
            padding-bottom: 70px !important;
        }

        /* Bottom Navigation Bar */
        #mobile-bottom-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background-color: #fff;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            z-index: 999999;
        }

        .mobile-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none !important;
            color: #555;
            font-size: 11px;
            font-weight: 600;
            flex: 1;
            padding: 5px 0;
        }

        .mobile-nav-item i {
            font-size: 22px;
            margin-bottom: 4px;
            color: #046bd2; /* Primary blue */
        }

        .mobile-nav-item:hover, .mobile-nav-item:focus {
            color: #046bd2;
        }
        
        /* Make header flex space-between */
        .ast-main-header-bar-alignment {
            display: flex;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100%;
        }
        
        .ast-site-header-cart {
            display: none !important;
        }
        
        /* Hide everything in header except logo and flags on mobile */
        .ast-mobile-header-stack .main-header-bar .ast-search-menu-icon,
        .ast-mobile-header-stack .main-header-bar .ast-builder-menu-mobile {
            display: none !important;
        }
        
        /* Ensure flags are visible and positioned correctly in header */
        .custom-flags-mobile-container {
            display: flex !important;
            align-items: center;
            gap: 10px;
        }
    }
    
    @media (min-width: 922px) {
        #mobile-bottom-nav {
            display: none !important;
        }
        .custom-flags-mobile-container {
            display: none !important;
        }
    }
    """
    
    if soup.head:
        soup.head.append(style_tag)
        
    if soup.body:
        soup.body.append(nav_soup)
        
        # We need to make sure the flags exist in a format that works well on mobile.
        # Since we hide .ast-builder-menu-mobile (which contains the original flags injected into the menu),
        # we need to inject a clone of the flags right next to the logo for mobile view.
        
        # Find logo wrapper
        logo_div = soup.find('div', class_='ast-site-identity')
        if logo_div:
            # We want to place the flags inside the header, perhaps right after ast-site-identity.
            # But the header structure is complex. Usually it's in .site-branding or .ast-site-identity.
            # Let's just create a custom container for mobile flags and put it next to the logo.
            
            # Extract flags HTML from the original menu
            flags_img = soup.find_all('img', src=lambda s: s and 'flagcdn.com' in s)
            if flags_img:
                mobile_flags_html = '<div class="custom-flags-mobile-container">'
                seen_langs = set()
                for img in flags_img:
                    a_tag = img.find_parent('a')
                    if a_tag:
                        lang_alt = img.get('alt', '')
                        if lang_alt not in seen_langs:
                            mobile_flags_html += str(a_tag)
                            seen_langs.add(lang_alt)
                mobile_flags_html += '</div>'
                
                flags_soup = BeautifulSoup(mobile_flags_html, 'html.parser')
                logo_div.insert_after(flags_soup)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Injected mobile UI into {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                inject_mobile_ui(os.path.join(root, file), directory)

if __name__ == "__main__":
    process_directory("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
