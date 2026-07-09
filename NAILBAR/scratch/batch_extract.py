import fitz
import os
from PIL import Image

pdfs = [
    "/Users/karolbohdanowicz/Downloads/SZABLON_tablica_UE_A4_poziom_1do1.pdf",
    "/Users/karolbohdanowicz/Downloads/NAILBAR_tablica_dofinansowanie_UE.pdf",
    "/Users/karolbohdanowicz/Downloads/NAILBAR_tablica_UE_FINAL_A4_poziom.pdf",
    "/Users/karolbohdanowicz/Downloads/TABLICA_DRUK_NAILBAR_FINAL.pdf",
    "/Users/karolbohdanowicz/Downloads/NAILBAR_OFICJALNA_TABLICA_UE.pdf"
]

for pdf_path in pdfs:
    if not os.path.exists(pdf_path):
        print(f"Skipping (does not exist): {pdf_path}")
        continue
    
    name = os.path.basename(pdf_path).replace(".pdf", "")
    print(f"\nProcessing PDF: {name}")
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)
        
        # Get page images
        image_list = page.get_images()
        print(f"  Found {len(image_list)} images on page 1")
        for idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            w, h = base_image.get("width", 0), base_image.get("height", 0)
            print(f"    Image {idx+1}: xref={xref}, ext={image_ext}, size={w}x{h}")
            
            # Save extracted image
            out_path = f"/Users/karolbohdanowicz/my-ai-agents/NAILBAR/scratch/extracted_{name}_{idx+1}.{image_ext}"
            with open(out_path, "wb") as f:
                f.write(image_bytes)
    except Exception as e:
        print(f"  Error: {e}")
