import fitz
import os

pdf_path = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/Akcesoria LED 2018v2 - PRESCOT (katalog).pdf"
out_dir = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/drawings_extracted"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Catalog Page 7 is PDF index 7 (due to cover page being index 0? Wait, let's verify if index 7 is page 7 or 8)
# Let's extract indexes 7 and 11
pages_to_extract = [7, 11]

for p_idx in pages_to_extract:
    page = doc[p_idx]
    image_list = page.get_images(full=True)
    print(f"Page {p_idx+1} has {len(image_list)} images")
    
    for img_idx, img_info in enumerate(image_list):
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        filename = f"real_p{p_idx+1}_img_{img_idx+1}_xref{xref}.{image_ext}"
        filepath = os.path.join(out_dir, filename)
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Extracted: {filename}")
