import os
import glob
import re

stranda_file = "src/data/stranda-apartments.ts"
content = open(stranda_file, "r").read()

folders = ["A305", "A306", "B102", "B103", "B202", "B304", "B305", "B401", "B402", "B404", "C_Studio", "C205", "C301", "C304", "C402", "C404"]

def get_images_for_folder(folder_name):
    path = os.path.join("public/images/stranda", folder_name)
    if not os.path.isdir(path):
        return None
    
    images = []
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.webp", "*.JPG", "*.JPEG", "*.PNG", "*.WEBP"]:
        images.extend(glob.glob(os.path.join(path, ext)))
    
    if not images:
        return None
        
    rel_images = [img.replace("public", "") for img in images]
    
    wow_img = None
    for img in rel_images:
        if "wow.webp" in img.lower():
            wow_img = img
            break
            
    if wow_img:
        rel_images.remove(wow_img)
        rel_images.insert(0, wow_img)
    else:
        rel_images.sort()
        
    return rel_images

# Split by apartment definition start: `    'ID': {`
parts = re.split(r"(    '[^']+': \{)", content)

new_parts = []
for p in parts:
    # See if this block defines an apartment we care about
    # The split makes parts: [before, delim, body, delim, body...]
    
    # We will process `body` in the next iteration if `delim` matches our ID
    # But wait, it's easier to just find the ID inside the body.
    pass

# Better approach: find start and end of gallery object inside the block
for folder_name in folders:
    apt_id = "c-studio" if folder_name == "C_Studio" else folder_name
    images = get_images_for_folder(folder_name)
    if not images:
        continue
        
    hero_image = images[0]
    images_str = ",\n                ".join([f'getAssetPath("{img}")' for img in images])
    gallery_obj = f'''gallery: {{
            heroImage: getAssetPath("{hero_image}"),
            images: [
                {images_str}
            ]
        }}'''
        
    # Find the block for this apartment
    apt_start = content.find(f"id: '{apt_id}'")
    if apt_start == -1:
        print(f"Could not find {apt_id}")
        continue
        
    # Find the start of the next apartment to bound our search
    next_apt = content.find("id: '", apt_start + 10)
    if next_apt == -1:
        next_apt = len(content)
        
    block = content[apt_start:next_apt]
    
    # Replace the gallery block inside this block
    # A gallery block starts with `gallery: {` and ends with `}` followed by `,` or `\n` or spaces
    # It might have nested brackets, but wait, gallery just has `heroImage` and `images: []`.
    # It doesn't have nested objects inside images. So it ends with `    }` (4 spaces) or `        }` (8 spaces).
    
    new_block = re.sub(r"gallery:\s*\{[\s\S]*?images:\s*\[[\s\S]*?\]\n\s*\}", gallery_obj, block)
    
    if block != new_block:
        content = content[:apt_start] + new_block + content[next_apt:]
        print(f"Updated {apt_id}")
    else:
        print(f"Regex didn't match for {apt_id}")

open("src/data/stranda-apartments.ts", "w").write(content)
print("Done folders")
