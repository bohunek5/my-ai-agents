import os
import re
import glob

stranda_file = "src/data/stranda-apartments.ts"
content = open(stranda_file, "r").read()

folders = ["A305", "A306", "B102", "B103", "B202", "B304", "B305", "B401", "B402", "B404", "C_Studio", "C205", "C301", "C304", "C402", "C404"]

def get_images_for_folder(folder_name):
    # Find all images in public/images/stranda/folder_name
    path = os.path.join("public/images/stranda", folder_name)
    if not os.path.isdir(path):
        return None
    
    images = []
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.webp", "*.JPG", "*.JPEG", "*.PNG", "*.WEBP"]:
        images.extend(glob.glob(os.path.join(path, ext)))
    
    if not images:
        return None
        
    # Get relative paths for JS
    rel_images = [img.replace("public", "") for img in images]
    
    # Check for wow.webp
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

for folder_name in folders:
    apt_id = "c-studio" if folder_name == "C_Studio" else folder_name
    images = get_images_for_folder(folder_name)
    if not images:
        print(f"No images found for {folder_name}")
        continue
        
    hero_image = images[0]
    
    images_str = ",\n                ".join([f'getAssetPath("{img}")' for img in images])
    gallery_obj = f'''gallery: {{
            heroImage: getAssetPath("{hero_image}"),
            images: [
                {images_str}
            ]
        }}'''
        
    apt_pattern = re.compile(rf"id:\s*'{apt_id}'[\s\S]*?(?=gallery:)", re.MULTILINE)
    match = apt_pattern.search(content)
    if not match:
        print(f"Could not find apartment {apt_id} to replace gallery.")
        continue
        
    start_idx = match.end()
    
    end_pattern = re.compile(r"gallery:\s*\{[\s\S]*?images:\s*\[[\s\S]*?\]\n\s*\}", re.MULTILINE)
    match_end = end_pattern.match(content[start_idx-8:]) # -8 to include 'gallery:'
    
    if match_end:
        old_gallery = match_end.group(0)
        content = content[:start_idx-8] + gallery_obj + content[start_idx-8 + len(old_gallery):]
        print(f"Replaced gallery for {apt_id}")
    else:
        print(f"Could not find gallery block for {apt_id}")

# Specific fix for A403
a403_gallery_ido = '''gallery: {
            heroImage: getAssetPath("/images/stranda/ido_25_1.jpg"),
            images: [
                getAssetPath("/images/stranda/ido_25_1.jpg"),
                getAssetPath("/images/stranda/ido_25_2.jpg"),
                getAssetPath("/images/stranda/ido_25_3.jpg"),
                getAssetPath("/images/stranda/ido_25_4.jpg"),
                getAssetPath("/images/stranda/ido_25_5.jpg"),
                getAssetPath("/images/stranda/ido_25_6.jpg"),
                getAssetPath("/images/stranda/ido_25_7.jpg"),
                getAssetPath("/images/stranda/ido_25_8.jpg"),
                getAssetPath("/images/stranda/ido_25_9.jpg"),
                getAssetPath("/images/stranda/ido_25_10.jpg"),
                getAssetPath("/images/stranda/ido_25_11.jpg"),
                getAssetPath("/images/stranda/ido_25_12.jpg"),
                getAssetPath("/images/stranda/ido_25_13.jpg"),
                getAssetPath("/images/stranda/ido_25_14.jpg"),
                getAssetPath("/images/stranda/ido_25_15.jpg"),
                getAssetPath("/images/stranda/ido_25_16.jpg"),
                getAssetPath("/images/stranda/ido_25_17.jpg"),
                getAssetPath("/images/stranda/ido_25_18.jpg"),
                getAssetPath("/images/stranda/ido_25_19.jpg"),
                getAssetPath("/images/stranda/ido_25_20.jpg")
            ]
        },
        idoBookingId: '25',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/25/key/da39a3ee5e6b4b0d3255bfef95601890afd80709\''''

apt_pattern = re.compile(rf"id:\s*'A403'[\s\S]*?(?=gallery:)", re.MULTILINE)
match = apt_pattern.search(content)
if match:
    start_idx = match.end()
    # It might have idoBookingId and icalUrl after gallery.
    # The current regex looks for the gallery block.
    # We want to replace the gallery, idoBookingId, and icalUrl for A403.
    
    end_pattern = re.compile(r"gallery:\s*\{[\s\S]*?images:\s*\[[\s\S]*?\]\n\s*\}(?:,\s*idoBookingId:\s*'[^']*')?(?:,\s*icalUrl:\s*'[^']*')?", re.MULTILINE)
    match_end = end_pattern.match(content[start_idx-8:])
    if match_end:
        old_block = match_end.group(0)
        content = content[:start_idx-8] + a403_gallery_ido + content[start_idx-8 + len(old_block):]
        print("Replaced gallery and ids for A403")
    else:
        print("Could not find gallery block for A403")


open("src/data/stranda-apartments.ts", "w").write(content)
print("Finished updating galleries.")
