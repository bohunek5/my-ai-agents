import os
import re

def replace_in_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replacements
                content = content.replace("SAILORA", "Mazury Aktywnie")
                content = content.replace("Sailora", "Mazury Aktywnie")
                content = content.replace("info@sailora.com", "kontakt@mazuryaktywnie.com.pl")
                content = content.replace("sailora-home.html", "mazuryaktywnie-home.html")
                content = content.replace("sailora", "mazuryaktywnie")
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

    # Rename files containing 'sailora'
    for root, dirs, files in os.walk(directory):
        for file in files:
            if "sailora" in file:
                old_filepath = os.path.join(root, file)
                new_filepath = os.path.join(root, file.replace("sailora", "mazuryaktywnie"))
                os.rename(old_filepath, new_filepath)
                print(f"Renamed {old_filepath} to {new_filepath}")

if __name__ == "__main__":
    replace_in_files("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
