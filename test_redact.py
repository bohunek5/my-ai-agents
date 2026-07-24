import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]

text_instances = page.search_for("FEATURES")
for inst in text_instances:
    # Use cross_out=False to prevent the red X, fill=None to prevent filling
    page.add_redact_annot(inst, cross_out=False, fill=None)

# Apply redactions, preserving images (images=0) and graphics (graphics=0)
page.apply_redactions(images=0, graphics=0)

# Insert new text using Helvetica
page.insert_text((inst.x0, inst.y1 - 5), "CECHY", fontsize=20, fontname="helv", color=(0,0,0))

doc.save('/Users/karolbohdanowicz/Downloads/test_redact_output.pdf')
