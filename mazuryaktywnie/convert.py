import os
from PIL import Image

folder = 'public/images/gallery'
for root, dirs, files in os.walk(folder):
    for f in files:
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            full_path = os.path.join(root, f)
            try:
                img = Image.open(full_path)
                new_path = os.path.splitext(full_path)[0] + '.webp'
                img.save(new_path, 'webp', quality=80)
                print(f"Converted {f} to webp")
                os.remove(full_path)
            except Exception as e:
                print(f"Failed {f}: {e}")
