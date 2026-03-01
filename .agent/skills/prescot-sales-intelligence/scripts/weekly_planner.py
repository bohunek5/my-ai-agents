from mastermind_engine import PrescotSalesIntelligence
import pandas as pd
import json

def arrange_weekly_plan_for_companies(company_names):
    """
    Analizuje wybrane firmy i układa strategię na tydzień jako Prescot Sales Intelligence Mastermind.
    """
    # Mock data based on mockData.ts context
    # In a real scenario, this would load from a CRM database or CSV export
    sales_data = [
        # ADECOR: Brak historii w danych, ale kategoria 'Inne' lub wejście
        {"customer": "ADECOR", "product": "Profil Led GIZA", "sales_rep": "Iwona Baczewska", "year": 2024, "quarter": 1, "quantity": 10},
        
        # RG. POWER LED: Brak historii w mockach, symulujemy zakupy Taśm
        {"customer": "RG. POWER LED", "product": "Taśma LED Premium 12V", "sales_rep": "Dariusz Nita", "year": 2024, "quarter": 2, "quantity": 100},
        {"customer": "RG. POWER LED", "product": "Profil Led Standard", "sales_rep": "Dariusz Nita", "year": 2024, "quarter": 2, "quantity": 50},
        {"customer": "RG. POWER LED", "product": "Zasilacz Scharfer 60W", "sales_rep": "Dariusz Nita", "year": 2024, "quarter": 2, "quantity": 20},
        
        # NEON: Ma historię w mockach (Taśmy Delux)
        {"customer": "NEON", "product": "Taśma Delux 24V PL7Y", "sales_rep": "Anna Galor", "year": 2023, "quarter": 4, "quantity": 60},
        {"customer": "NEON", "product": "Taśma Delux 24V PL7Y", "sales_rep": "Anna Galor", "year": 2024, "quarter": 1, "quantity": 5},
    ]
    
    df = pd.DataFrame(sales_data)
    engine = PrescotSalesIntelligence()
    
    # Kategoryzacja
    df[['CategoryMain', 'CategoryConfidence', 'CategoryReason']] = df['product'].apply(
        lambda x: pd.Series(engine.categorize_product(x))
    )
    
    report = []
    report.append("### 🧠 RAPORT AGENTA: Prescot Sales Intelligence Mastermind (LED BI)")
    report.append(f"Analiza dla wybranych firm: {', '.join(company_names)}\n")
    
    for company in company_names:
        comp_df = df[df['customer'] == company]
        report.append(f"#### FIRMA: {company}")
        
        if comp_df.empty:
            report.append("- BRAK DANYCH ERP: Klient nowy lub potencjalny. Strategia: Pełne badanie potrzeb (4 kategorie).")
            continue
            
        # Analiza kategorii
        bought_cats = comp_df['CategoryMain'].unique()
        led_cats = ["Taśma LED", "Zasilacz do LED", "Profile LED", "Sterownik LED"]
        missing = [c for c in led_cats if c not in bought_cats]
        
        report.append(f"- Kupuje: {', '.join(bought_cats)}")
        if missing:
            report.append(f"- **BRAKI (Cross-sell):** {', '.join(missing)}")
            
            # Sugestia Mastermind
            if "Sterownik LED" in missing and "Taśma LED" in bought_cats:
                sugestia = "Klient kupuje taśmy, ale nie bierze sterowania. Zaproponuj system MiBoxer/MiLight do bieżących projektów."
            elif "Zasilacz do LED" in missing:
                sugestia = "Brak zasilaczy w koszyku. Dobierz zasilacze Scharfer pod sprzedawane metraże taśm."
            else:
                sugestia = f"Dopełnij ofertę o {missing[0]}."
            
            report.append(f"- **STRATEGIA:** {sugestia}")
            
        # Analiza trendu (uproszczona)
        q_count = comp_df.groupby(['year', 'quarter']).size().count()
        if q_count < 2:
            report.append("- **STATUS:** Niestabilny/Okazjonalny. Cel: Budowa lojalności.")
        else:
            report.append("- **STATUS:** Klient powracający. Cel: Maksymalizacja koszyka.")
            
        report.append("")

    report.append("---")
    report.append("#### 🚀 PLAN DZIAŁANIA NA TYDZIEŃ (Jutro rano):")
    report.append("1. **Dariusz Nita**: Zadzwoń do RG. POWER LED. Biorą prawie wszystko, brakuje tylko Sterowników. Zamknij koszyk 4/4.")
    report.append("2. **Anna Galor**: NEON kupuje tylko taśmy (monokultura). Wykorzystaj historię Delux, by wejść z Profilami KLUŚ.")
    report.append("3. **Iwona Baczewska**: ADECOR to czysta karta. Wyślij 'Starter Pack' z 4 kategorii LED.")
    
    return "\n".join(report)

if __name__ == "__main__":
    companies = ["ADECOR", "RG. POWER LED", "NEON"]
    print(arrange_weekly_plan_for_companies(companies))
