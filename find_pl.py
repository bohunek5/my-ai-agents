import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT PL.pdf')
page = doc[0]

for b in page.get_text("dict")["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if "Drut" in s["text"] or "Linka" in s["text"] or "Solid" in s["text"]:
                    print(f"Found '{s['text']}': bbox={s['bbox']}")
