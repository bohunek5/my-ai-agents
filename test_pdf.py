import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]

# Find text "FEATURES"
text_instances = page.search_for("FEATURES")
for inst in text_instances:
    page.add_redact_annot(inst)

# Apply redactions, preserving images and graphics
page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_GRAPHICS_NONE)

# Insert new text
page.insert_text(text_instances[0].bl - (0, 0), "CECHY", fontsize=12, color=(0,0,0))

doc.save('/Users/karolbohdanowicz/Downloads/test_output.pdf')
