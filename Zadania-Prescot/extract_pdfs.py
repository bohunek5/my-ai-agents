
import os
from pdfminer.high_level import extract_text

def extract_pdf_data(directory):
    pdf_files = [f for f in os.listdir(directory) if f.endswith('.pdf')]
    results = {}
    for pdf in pdf_files:
        path = os.path.join(directory, pdf)
        try:
            text = extract_text(path)
            results[pdf] = text
            # Save extracted text to a .txt file for easier viewing
            with open(os.path.join(directory, pdf.replace('.pdf', '.txt')), 'w') as f:
                f.write(text)
        except Exception as e:
            results[pdf] = f"Error: {e}"
    return results

if __name__ == "__main__":
    dir_path = "/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot"
    extract_pdf_data(dir_path)
