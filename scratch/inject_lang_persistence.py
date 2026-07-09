import os
from bs4 import BeautifulSoup

def inject_lang_script(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Avoid injecting multiple times
    if "id=\"lang-persistence-script\"" in html:
        return

    soup = BeautifulSoup(html, 'html.parser')

    script_tag = soup.new_tag("script", id="lang-persistence-script")
    script_content = """
    document.addEventListener('DOMContentLoaded', function() {
        // Save language on flag click
        var flags = document.querySelectorAll('img[src*="flagcdn.com"]');
        flags.forEach(function(img) {
            img.parentElement.addEventListener('click', function(e) {
                var lang = img.getAttribute('alt').toLowerCase();
                localStorage.setItem('preferred_lang', lang);
            });
        });

        // Check redirection on initial entry
        var prefLang = localStorage.getItem('preferred_lang');
        if (prefLang) {
            var isInternal = document.referrer && document.referrer.indexOf(window.location.hostname) !== -1;
            if (!isInternal) {
                var currentPath = window.location.pathname;
                var currentLang = 'pl'; // default
                if (currentPath.indexOf('/en/') !== -1) currentLang = 'en';
                else if (currentPath.indexOf('/de/') !== -1) currentLang = 'de';

                if (prefLang !== currentLang) {
                    var targetFlag = document.querySelector('img[alt="' + prefLang.toUpperCase() + '"]');
                    if (targetFlag && targetFlag.parentElement && targetFlag.parentElement.href) {
                        window.location.replace(targetFlag.parentElement.href);
                    }
                }
            }
        }
    });
    """
    script_tag.string = script_content
    
    if soup.head:
        soup.head.append(script_tag)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Injected lang script into {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                inject_lang_script(os.path.join(root, file))

if __name__ == "__main__":
    process_directory("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
