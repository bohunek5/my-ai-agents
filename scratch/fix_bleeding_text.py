import os
import re

def fix_metform_comments(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Regex to match the bleeding text block
    pattern = r"[-]+\s*\* controls_data : find the the props passed indie of data attribute\s*\* props\.SubmitResponseMarkup : contains the markup of error or success message\s*\* https://developer\.mozilla\.org/en-US/docs/Web/JavaScript/Reference/Template_literals\s*[-]+"

    content = re.sub(pattern, '', content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed bleeding text from {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                fix_metform_comments(os.path.join(root, file))

if __name__ == "__main__":
    process_directory("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
