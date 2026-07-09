import fitz
import os

pdf_path = "/Users/karolbohdanowicz/Downloads/Akcesoria LED 2018v2 - PRESCOT (katalog).pdf"
out_dir = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"

os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        pix = fitz.Pixmap(doc, xref)
        if pix.n - pix.alpha > 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        pix.save(f"{out_dir}/img_page{i}_xref{xref}.png")
        pix = None

print("Images extracted.")
