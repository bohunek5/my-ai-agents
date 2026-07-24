import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]

blocks = page.get_text("dict")["blocks"]
for b in blocks:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                print(f"Text: '{s['text']}' Font: {s['font']} Size: {s['size']} Color: {s['color']} Bbox: {s['bbox']}")
