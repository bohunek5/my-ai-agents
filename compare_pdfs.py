import fitz

doc_en = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
doc_pl = fitz.open('/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT PL.pdf')

for page_num in range(min(len(doc_en), 2)):
    print(f"--- PAGE {page_num} EN ---")
    print(doc_en[page_num].get_text().strip()[:200])
    print(f"--- PAGE {page_num} PL ---")
    print(doc_pl[page_num].get_text().strip()[:200])

