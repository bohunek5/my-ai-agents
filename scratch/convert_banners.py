import os
from PIL import Image

src_dir = "/Users/karolbohdanowicz/Downloads/uzyj"
dest_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline/public/images"

files_map = {
    "ok okładka.png": "slide_okladka.webp",
    "okładka ok ok.png": "slide_okladka_alt.webp",
    "24d180-13-3080-1010_1024d180-13-3080-1010 XD.png": "slide_tasma_10.webp",
    "24d180-13-3080-1010_3624d180-13-3080-1010 XD.png": "slide_tasma_36.webp",
    "taśma cri97 4000K i niska i wysoka_9.png": "slide_tasma_cri97.webp"
}

for src_name, dest_name in files_map.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        print(f"Converting {src_name} to {dest_name}...")
        img = Image.open(src_path)
        if img.width > 2000:
            ratio = 2000.0 / img.width
            new_height = int(img.height * ratio)
            img = img.resize((2000, new_height), Image.Resampling.LANCZOS)
        img.save(dest_path, "WEBP", quality=85)
        print(f"Saved to {dest_path}")
    else:
        print(f"File not found: {src_path}")
