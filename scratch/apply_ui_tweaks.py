import os
from bs4 import BeautifulSoup

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    modified = False

    # 1. Sticky Header Styles
    style_str = """
    <style id="custom-sticky-header">
        /* Make sure the header stays fixed at the top */
        .she-header-yes {
            position: fixed !important;
            top: 0 !important;
            width: 100% !important;
            z-index: 99999 !important;
            background: rgba(0, 0, 0, 0.9) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
        }
        
        /* Mobile menu fixes for sticky header */
        @media (max-width: 1024px) {
            .she-header-yes {
                background: rgba(0, 0, 0, 0.95) !important;
            }
        }
    </style>
    """
    if not soup.find('style', id='custom-sticky-header'):
        head = soup.find('head')
        if head:
            head.append(BeautifulSoup(style_str, 'html.parser'))
            modified = True
            
        # Clean up any duplicate style injections
        for duplicate in soup.find_all('style', id='custom-sticky-header')[1:]:
            duplicate.decompose()

    # 2. Update Language Switcher
    for li in soup.find_all('li', class_='menu-item nav-item'):
        if 'margin-left: 15px' in li.get('style', ''):
            links = li.find_all('a')
            if len(links) == 3 and links[0].text.strip() == 'PL':
                # It's our text switcher. Let's replace with flags.
                links[0].clear()
                pl_img = soup.new_tag('img', src='https://flagcdn.com/w40/pl.png', width="24", alt="PL", style="border-radius:2px;")
                links[0].append(pl_img)

                links[1].clear()
                en_img = soup.new_tag('img', src='https://flagcdn.com/w40/gb.png', width="24", alt="EN", style="border-radius:2px;")
                links[1].append(en_img)

                links[2].clear()
                de_img = soup.new_tag('img', src='https://flagcdn.com/w40/de.png', width="24", alt="DE", style="border-radius:2px;")
                links[2].append(de_img)

                # Remove the " | " text nodes
                for text_node in li.find_all(string=True, recursive=False):
                    if '|' in text_node:
                        text_node.extract()

                modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Updated {filepath}")

if __name__ == "__main__":
    src_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))
