import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]
for idx, img in enumerate(page.get_images()):
    print(f"Image {idx}: xref={img[0]}, smask={img[1]}, width={img[2]}, height={img[3]}, colorspace={img[5]}, ext={img[8]}")
