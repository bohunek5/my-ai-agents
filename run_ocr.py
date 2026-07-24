import fitz
import pytesseract
from PIL import Image
import io

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]

# Render page to an image
pix = page.get_pixmap(dpi=150)
img = Image.open(io.BytesIO(pix.tobytes("png")))

# Run OCR to get bounding boxes
data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

# The coordinates from tesseract need to be mapped back to PDF coordinates
# scale factor: PDF pts = pixels / (dpi / 72)
scale = 72.0 / 150.0

for i in range(len(data['text'])):
    word = data['text'][i].strip()
    if word.lower() in ["solid", "wire", "strand"]:
        x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
        pdf_x0 = x * scale
        pdf_y0 = y * scale
        pdf_x1 = (x + w) * scale
        pdf_y1 = (y + h) * scale
        print(f"Found '{word}': bbox=({pdf_x0:.2f}, {pdf_y0:.2f}, {pdf_x1:.2f}, {pdf_y1:.2f})")

