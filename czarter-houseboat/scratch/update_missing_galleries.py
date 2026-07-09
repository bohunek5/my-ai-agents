import re
import os
import glob

stranda_file = "src/data/stranda-apartments.ts"
content = open(stranda_file, "r").read()

folders = ["A305", "A306", "B102", "B103"]

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

for apt_id in folders:
    images = get_images_for_folder(apt_id)
    if not images:
        continue
        
    hero_image = images[0]
    images_str = ",\n                ".join([f'getAssetPath("{img}")' for img in images])
    gallery_obj = f''',\n        gallery: {{
            heroImage: getAssetPath("{hero_image}"),
            images: [
                {images_str}
            ]
        }}'''
        
    apt_start = content.find(f"id: '{apt_id}'")
    if apt_start == -1:
        continue
        
    next_apt = content.find("id: '", apt_start + 10)
    if next_apt == -1:
        next_apt = len(content)
        
    block = content[apt_start:next_apt]
    
    # Check if amenities is the last thing, or if idoBookingId is there
    # Look for the last `    }` or `        }` in the block before the next apartment
    # Actually, we can just insert the gallery right after `amenities: { ... }`
    
    amenities_match = re.search(r'amenities:\s*\{[\s\S]*?\n\s{8}\}', block)
    if amenities_match:
        old_amenities = amenities_match.group(0)
        new_block = block.replace(old_amenities, old_amenities + gallery_obj)
        if block != new_block:
            content = content[:apt_start] + new_block + content[next_apt:]
            print(f"Added gallery for {apt_id}")
            
open("src/data/stranda-apartments.ts", "w").write(content)
