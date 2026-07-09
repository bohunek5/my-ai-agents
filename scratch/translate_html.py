import os
import sys
import json
from bs4 import BeautifulSoup

def extract_text_nodes(soup):
    nodes = []
    for text_node in soup.find_all(string=True):
        parent = text_node.parent
        if parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]', 'noscript']:
            continue
        text = text_node.strip()
        if text and len(text) > 1 and not text.isdigit():
            nodes.append(text_node)
    return nodes

def process_file(filepath, out_filepath, target_lang, lang_code, root_prefix="", translation_dict=None):
    print(f"Processing {filepath} -> {out_filepath} ({target_lang})")
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Extract and apply translation
    if translation_dict:
        nodes = extract_text_nodes(soup)
        for node in nodes:
            original = node.strip()
            if original in translation_dict and translation_dict[original]:
                translated = translation_dict[original]
                node.replace_with(node.replace(original, translated))
                
    # Update HTML lang attribute
    html_tag = soup.find('html')
    if html_tag:
        html_tag['lang'] = lang_code
        
    # Remove gtranslate widget if it exists since we have static translations now
    gt = soup.find('div', class_='gtranslate_wrapper')
    if gt:
        gt.decompose()

    # Inject language switcher
    # Find navigation menu
    nav_ul = soup.find('ul', id='menu-main-navigation')
    if nav_ul:
        switcher_li = soup.new_tag('li', attrs={'class': 'menu-item nav-item', 'style': 'display: flex; gap: 10px; align-items: center; margin-left: 15px;'})
        
        pl_a = soup.new_tag('a', href=f"{root_prefix}index.html", attrs={'style': 'font-weight: bold; color: inherit; text-decoration: none;'})
        pl_a.string = "PL"
        
        en_a = soup.new_tag('a', href=f"{root_prefix}en/index.html", attrs={'style': 'font-weight: bold; color: inherit; text-decoration: none;'})
        en_a.string = "EN"
        
        de_a = soup.new_tag('a', href=f"{root_prefix}de/index.html", attrs={'style': 'font-weight: bold; color: inherit; text-decoration: none;'})
        de_a.string = "DE"
        
        switcher_li.append(pl_a)
        switcher_li.append(soup.new_string(" | "))
        switcher_li.append(en_a)
        switcher_li.append(soup.new_string(" | "))
        switcher_li.append(de_a)
        
        nav_ul.append(switcher_li)

    # Adjust asset links if in subfolder
    if root_prefix:
        for tag in soup.find_all(['link', 'script', 'img', 'a']):
            if tag.name == 'link' and tag.has_attr('href'):
                href = tag['href']
                if not href.startswith('http') and not href.startswith('/') and not href.startswith('data:') and not href.startswith('#'):
                    tag['href'] = root_prefix + href
            elif tag.name == 'script' and tag.has_attr('src'):
                src = tag['src']
                if not src.startswith('http') and not src.startswith('/') and not src.startswith('data:') and not src.startswith('#'):
                    tag['src'] = root_prefix + src
            elif tag.name == 'img' and tag.has_attr('src'):
                src = tag['src']
                if not src.startswith('http') and not src.startswith('/') and not src.startswith('data:') and not src.startswith('#'):
                    tag['src'] = root_prefix + src
            # for 'a' tags, we also need to prefix local links so they point to the correct subfolder
            elif tag.name == 'a' and tag.has_attr('href'):
                href = tag['href']
                if not href.startswith('http') and not href.startswith('/') and not href.startswith('data:') and not href.startswith('#'):
                    # if it's linking to another html file, we want it to stay in the same language folder
                    pass # actually relative links to other html files work fine if they are in the same directory!
                    # Wait, if we are in /en/about.html and we link to contact.html, it will naturally resolve to /en/contact.html. So we don't prefix 'a' tags for HTML files!
                    
    # Write output
    os.makedirs(os.path.dirname(out_filepath), exist_ok=True)
    with open(out_filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    src_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir"
    files_to_translate = ['about.html', 'contact.html', 'fleets.html', 'index.html', 'sailora-home.html']
    
    with open("texts_pl.json", "r", encoding="utf-8") as f:
        pl_dict = json.load(f)
        
    with open("texts_de.json", "r", encoding="utf-8") as f:
        de_dict = json.load(f)
        
    # We also need an empty dict for English (so no translations are applied)
    en_dict = {}
    
    for filename in files_to_translate:
        filepath = os.path.join(src_dir, filename)
        if not os.path.exists(filepath):
            continue
            
        # 2. English version (/en/) - processed first before we mutate the original files
        process_file(filepath, os.path.join(src_dir, "en", filename), "English", "en-US", "../", en_dict)
        
        # 3. German version (/de/)
        process_file(filepath, os.path.join(src_dir, "de", filename), "German", "de-DE", "../", de_dict)
        
        # 1. Polish version (Root) - processes the original file in place
        process_file(filepath, filepath, "Polish", "pl-PL", "", pl_dict)
        
    print("Done translating all files!")
