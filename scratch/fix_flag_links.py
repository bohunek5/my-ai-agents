import os
import re
from bs4 import BeautifulSoup

def get_page_name(filepath, root_dir):
    # Get the relative path from root_dir
    rel_path = os.path.relpath(filepath, root_dir)
    # Extract the base filename (e.g., 'contact.html', 'about.html', 'index.html')
    basename = os.path.basename(rel_path)
    return basename

def fix_flag_links(filepath, root_dir):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    
    # Determine the relative path back to the root directory
    rel_path = os.path.relpath(filepath, root_dir)
    if os.path.dirname(rel_path) == '':
        root_prefix = ''
    else:
        root_prefix = '../' * len(os.path.dirname(rel_path).split(os.sep))

    page_name = get_page_name(filepath, root_dir)

    # Find the language switcher (the one with flagcdn)
    changed = False
    for li in soup.find_all('li', class_='menu-item nav-item'):
        if 'margin-left: 15px' in li.get('style', ''):
            links = li.find_all('a')
            if len(links) == 3:
                # Expecting PL, EN, DE in that order
                pl_link = links[0]
                en_link = links[1]
                de_link = links[2]

                # Ensure these are the flag links by checking if they contain flagcdn images
                if pl_link.find('img') and 'flagcdn.com' in pl_link.find('img').get('src', ''):
                    # Set the correct hrefs
                    new_pl_href = f"{root_prefix}{page_name}"
                    new_en_href = f"{root_prefix}en/{page_name}"
                    new_de_href = f"{root_prefix}de/{page_name}"

                    if pl_link['href'] != new_pl_href or en_link['href'] != new_en_href or de_link['href'] != new_de_href:
                        pl_link['href'] = new_pl_href
                        en_link['href'] = new_en_href
                        de_link['href'] = new_de_href
                        changed = True

    if changed:
        # Save the file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Fixed flag links in {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                fix_flag_links(os.path.join(root, file), directory)

if __name__ == "__main__":
    process_directory("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
