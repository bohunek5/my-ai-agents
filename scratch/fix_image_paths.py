import os

directories = ['en', 'de']
base_path = '/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir'

for d in directories:
    dir_path = os.path.join(base_path, d)
    if not os.path.exists(dir_path):
        continue
    for filename in os.listdir(dir_path):
        if filename.endswith('.html'):
            filepath = os.path.join(dir_path, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace broken paths
            content = content.replace('srcset="images/', 'srcset="../images/')
            content = content.replace(', images/', ', ../images/')
            content = content.replace('href="images/', 'href="../images/')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Image paths fixed in en/ and de/ folders.")
