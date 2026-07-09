import os
import re
import shutil

TEMPLATE_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"
OUTPUT_DIR = "/Users/karolbohdanowicz/Downloads/Katalog_2026_Gotowy"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")
EXTRACTED_IMG_DIR = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"
LOGO_SVG = "/Users/karolbohdanowicz/Downloads/PRESCOT_logo_biale+kolor-01.svg"

os.makedirs(ASSETS_DIR, exist_ok=True)
if os.path.exists(LOGO_SVG):
    shutil.copy(LOGO_SVG, os.path.join(ASSETS_DIR, "logo.svg"))

with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Replace Logo
logo_html = '''<img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16 mb-20">'''
html = re.sub(r'<div class="flex items-center gap-2 mb-20">.*?</div>', logo_html, html, flags=re.DOTALL)

# 2. Replace Cover Image (img_page0_xref4311.png)
cover_img = "img_page0_xref4311.png"
cover_src = os.path.join(EXTRACTED_IMG_DIR, cover_img)
if os.path.exists(cover_src):
    shutil.copy(cover_src, os.path.join(ASSETS_DIR, "cover.png"))
    html = re.sub(r'<img src="https://images.unsplash.com/.*?"', '<img src="assets/cover.png"', html)
else:
    print(f"Cover image {cover_src} not found!")

# 3. Write out the result
out_file = os.path.join(OUTPUT_DIR, "index.html")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Successfully generated initial cover at {out_file}")
