import fitz

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]

# check all text on page 0 without grouping
print(page.get_text("rawdict")["blocks"][:5])

# Just print all text directly
print("ALL TEXT:", page.get_text())
