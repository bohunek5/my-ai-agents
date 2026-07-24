import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
lines_set = set()
for page in doc:
    blocks = page.get_text("dict")["blocks"]
    for b in blocks:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if text and not text.isdigit():
                        lines_set.add(text)

for t in sorted(list(lines_set)):
    print(t)
