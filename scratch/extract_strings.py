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

def extract_all():
    src_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir"
    files = ['about.html', 'contact.html', 'fleets.html', 'index.html', 'sailora-home.html']
    
    all_texts = set()
    for filename in files:
        filepath = os.path.join(src_dir, filename)
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
        soup = BeautifulSoup(html, 'html.parser')
        nodes = extract_text_nodes(soup)
        for n in nodes:
            all_texts.add(n.strip())
            
    # Save to json
    out_dict = {text: "" for text in all_texts}
    with open("texts_to_translate.json", "w", encoding="utf-8") as f:
        json.dump(out_dict, f, ensure_ascii=False, indent=2)
    print(f"Extracted {len(all_texts)} unique strings to texts_to_translate.json")

if __name__ == "__main__":
    extract_all()
