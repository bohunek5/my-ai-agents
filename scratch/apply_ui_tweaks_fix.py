import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # The old style block to replace
    old_style_pattern = r'<style id="custom-sticky-header">.*?</style>'
    
    new_style = """<style id="custom-sticky-header">
        /* Base header state: fixed to top, overlays content */
        .she-header-yes {
            position: fixed !important;
            top: 0 !important;
            width: 100% !important;
            z-index: 99999 !important;
            transition: background 0.3s ease, backdrop-filter 0.3s ease !important;
        }

        /* Scrolled state: apply dark background and blur */
        .she-header-yes.she-header {
            background: rgba(0, 0, 0, 0.9) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
        }

        /* Top state: transparent */
        .she-header-yes.she-header-transparent-yes {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
    </style>"""

    content = re.sub(old_style_pattern, new_style, content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    src_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))
