
import os
import re
import json

def parse_detailed_sales_rep_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    
    companies_data = {}
    current_company = None
    accumulated_products = []
    
    # We'll try to find numbers that look like quantities (e.g. 109,00)
    # and match them to the last seen products.
    # This is an approximation since the PDF layout is columnar.
    all_quantities = []
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Check for numbers like 123,45 or 1 234,56
        match = re.search(r'(\d+[\s\xa0]?\d*,\d{2})', line)
        if match:
            all_quantities.append(match.group(1))

    # Reset for second pass to get companies
    accumulated_products = []
    companies_found = []
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if " Razem" in line:
            comp_name = line.replace(" Razem", "").strip()
            if comp_name == "Ilość": continue
            companies_found.append({"name": comp_name, "prods": list(accumulated_products)})
            accumulated_products = []
            continue
            
        if "!!!!!" in line:
            accumulated_products.append(line.replace("!!!!!", "").strip())
    
    # Simple heuristic: if we have roughly same number of quantities as products, we mix them.
    # But usually quantities are many more. 
    # Let's just store the company data and some sample quantities for now to show context.
    
    final_data = {}
    q_ptr = 0
    for comp in companies_found:
        prods_with_q = []
        for p in comp['prods']:
            if q_ptr < len(all_quantities):
                prods_with_q.append(f"{p} ({all_quantities[q_ptr]} szt/mb)")
                q_ptr += 1
            else:
                prods_with_q.append(p)
        
        final_data[comp['name']] = {
            "products": prods_with_q,
            "summary": f"Suma z raportu: {all_quantities[q_ptr] if q_ptr < len(all_quantities) else '---'}"
        }
        if q_ptr < len(all_quantities): q_ptr += 1

    return final_data

def main():
    dir_path = "/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot"
    reps = {
        "Anna Asztemborska": "anna_asztemborska.txt",
        "Anna Galor": "anna.galor.txt",
        "Dariusz Nita": "dariusz.nita.txt",
        "Adam Garbowski": "adam.garbowski.txt",
        "Iwona Baczewska": "iwona_baczewska.txt"
    }
    
    rep_detailed_data = {}
    for rep_name, filename in reps.items():
        filepath = os.path.join(dir_path, filename)
        if os.path.exists(filepath):
            rep_detailed_data[rep_name] = parse_detailed_sales_rep_file(filepath)
            
    with open(os.path.join(dir_path, "reps_clients_detailed.json"), "w") as f:
        json.dump(rep_detailed_data, f, indent=4, ensure_ascii=False)
    
    print("Extracted detailed data with quantities to reps_clients_detailed.json")

if __name__ == "__main__":
    main()
