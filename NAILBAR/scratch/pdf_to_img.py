import fitz  # PyMuPDF
import sys

def convert_pdf(pdf_path, output_image_path):
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # load the first page
    
    # Increase resolution (zoom factor)
    zoom = 2.0  # 2x zoom
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat)
    
    pix.save(output_image_path)
    print(f"Saved first page to: {output_image_path}")
    
    # Let's also list any images on the page
    image_list = page.get_images()
    print(f"Found {len(image_list)} images on the first page.")
    for image_idx, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        extracted_path = f"/Users/karolbohdanowicz/my-ai-agents/NAILBAR/scratch/extracted_img_{image_idx}.{image_ext}"
        with open(extracted_path, "wb") as f:
            f.write(image_bytes)
        print(f"Extracted image {image_idx} to: {extracted_path}")

if __name__ == "__main__":
    pdf = "/Users/karolbohdanowicz/Downloads/NAILBAR_tablica_dofinansowanie_UE.pdf"
    out = "/Users/karolbohdanowicz/my-ai-agents/NAILBAR/scratch/dofinansowanie_converted.png"
    convert_pdf(pdf, out)
