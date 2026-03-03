
import os
import re

def parse_sales_rep_file(filepath):
    companies = []
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    current_company = None
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Look for company names. They usually end with " Razem" or are followed by product categories.
        # Based on the text structure seen:
        # Line 1: Rep Name
        # Line 3: Company Name
        # ... categories ...
        # Line X: Company Name Razem
        
        if " Razem" in line:
            company = line.replace(" Razem", "").strip()
            if company and company not in companies and company != "Ilość":
                companies.append(company)
    
    return companies

def main():
    dir_path = "/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot"
    reps = {
        "Anna Asztemborska": "anna_asztemborska.txt",
        "Anna Galor": "anna.galor.txt",
        "Dariusz Nita": "dariusz.nita.txt",
        "Adam Garbowski": "adam.garbowski.txt",
        "Iwona Baczewska": "iwona_baczewska.txt"
    }
    
    rep_data = {}
    for rep_name, filename in reps.items():
        filepath = os.path.join(dir_path, filename)
        if os.path.exists(filepath):
            companies = parse_sales_rep_file(filepath)
            rep_data[rep_name] = companies
        else:
            rep_data[rep_name] = []
            
    import json
    with open(os.path.join(dir_path, "reps_clients.json"), "w") as f:
        json.dump(rep_data, f, indent=4, ensure_ascii=False)
    
    print("Extracted companies for each rep to reps_clients.json")

if __name__ == "__main__":
    main()
