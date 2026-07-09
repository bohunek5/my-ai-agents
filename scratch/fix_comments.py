import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Fix stripped comments
    comments_to_fix = ['ast-container', '#content', '#page', 'wp:paragraph', '/wp:paragraph']
    for c in comments_to_fix:
        # Regex to find the string NOT inside an HTML comment
        pattern = r"(?<!<!--)\s*" + re.escape(c) + r"\s*(?!-->)"
        content = re.sub(pattern, f"<!-- {c} -->", content)

    # 2. Remove flags.js (gtranslate)
    content = re.sub(r'<script[^>]*src="[^"]*js/flags\.js"[^>]*><\/script>', '', content)
    
    # 3. Also remove inline gtranslate settings
    content = re.sub(r'window\.gtranslateSettings\s*=\s*/\*\s*document\.write\s*\*/.*?;</script>', '</script>', content, flags=re.DOTALL)
    # The previous regex might leave <script> if it was on the same line, but wait, looking at the grep earlier:
    # <script>window.gtranslateSettings = /* document.write */ window.gtranslateSettings || {};window.gtranslateSettings['24683266'] = {...};</script>
    content = re.sub(r'<script[^>]*>\s*window\.gtranslateSettings.*?;</script>', '', content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    process_directory("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
