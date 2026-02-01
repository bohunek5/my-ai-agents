import json
import os
from datetime import datetime

def run_writer_strategy_task(input_file, output_file):
    print(f"Writer: Reading leads from {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            leads = json.load(f)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    print("Writer: Developing strategy for each lead...")
    
    strategies = []
    
    for lead in leads:
        company = lead['Company']
        lead_type = lead.get('Type', 'Unknown')
        reason = lead['Reason']
        website = lead['Website']
        
        strategy = {
            "Company": company,
            "Type": lead_type,
            "Website": website,
            "Context": reason,
            "Strategy": {},
        }

        # Strategy Logic based on Type
        if lead_type == 'Furniture':
            strategy["Strategy"] = {
                "Angle": "Jakość i łatwość montażu",
                "PainPoint": "Reklamacje na migające taśmy i trudny montaż profili",
                "ValueProp": "Profile LED idealnie pasujące do płyty 16/18mm + taśmy COB (efekt ciągłej linii światła).",
                "KeySellingPoint": "Wysokie CRI > 90 (naturalne kolory drewna/okleiny).",
                "WIIFM": "Przyspieszenie montażu i zero reklamacji u klienta końcowego." # What In It For Me
            }
        elif lead_type == 'Wholesale':
            strategy["Strategy"] = {
                "Angle": "Stabilność i marża",
                "PainPoint": "Braki towarowe i niska jakość tanich zamienników",
                "ValueProp": "Pełna dostępność magazynowa (wysyłka 24h) i wsparcie marketingowe (stojaki ekspozycyjne).",
                "KeySellingPoint": "Zasilacze z 5-letnią gwarancją i certyfikatami TUV.",
                "WIIFM": "Produkt, który nie wraca na serwis, a klient wraca po więcej."
            }
        else:
            # Fallback
            strategy["Strategy"] = {
                "Angle": "Współpraca B2B",
                "PainPoint": "Brak solidnego dostawcy",
                "ValueProp": "Szeroka oferta oświetlenia LED.",
                "KeySellingPoint": "Korzystne rabaty.",
                "WIIFM": "Lepsze warunki handlowe."
            }
            
        strategies.append(strategy)

    # Save detailed strategy
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(strategies, f, indent=4, ensure_ascii=False)
    
    print(f"Writer: Strategy generated for {len(strategies)} leads. Saved to {output_file}")

if __name__ == "__main__":
    input_path = 'output/nowe_lead_led.json'
    output_path = 'output/writer_strategy.json'
    run_writer_strategy_task(input_path, output_path)
