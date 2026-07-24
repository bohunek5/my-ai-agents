import os
from playwright.sync_api import sync_playwright
import fitz
import shutil

html_dir = '/Users/karolbohdanowicz/my-ai-agents/scratch/pdf_builder'
out_dir = '/Users/karolbohdanowicz/my-ai-agents/scratch/pdf_builder/output'
os.makedirs(out_dir, exist_ok=True)

pdf_files = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    for i in range(1, 5):
        html_path = f'file://{html_dir}/page_{i}.html'
        pdf_path = f'{out_dir}/page_{i}.pdf'
        
        page.goto(html_path, wait_until="networkidle")
        # Ensure the web fonts are loaded. Inter should load relatively fast, but we can wait a bit.
        page.evaluate('document.fonts.ready')
        
        # We need exact dimensions to match our 595.276 x 807.874 (72 dpi points = CSS pixels for PDF generation)
        page.pdf(
            path=pdf_path,
            width="595.276px",
            height="807.874px",
            print_background=True,
            margin={"top":"0", "right":"0", "bottom":"0", "left":"0"}
        )
        pdf_files.append(pdf_path)
        print(f"Rendered {pdf_path}")
        
    browser.close()

print("Combining PDFs...")
final_doc = fitz.open()
for pdf_file in pdf_files:
    d = fitz.open(pdf_file)
    final_doc.insert_pdf(d)
    
final_out = '/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT PL.pdf'
final_doc.save(final_out)
print(f"Final PDF saved to {final_out}")

# Create preview PNGs for the user
preview_dir = '/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/c845d1d1-33ac-44db-b334-e418870bc328/html_built_preview'
os.makedirs(preview_dir, exist_ok=True)
for i, page in enumerate(final_doc):
    pix = page.get_pixmap(dpi=150)
    pix.save(f'{preview_dir}/page_{i+1}.png')
print("Preview images generated.")
