import json
import os
from datetime import datetime

def run_promoter_final_task(input_file, output_file):
    print(f"Promoter: Reading strategy from {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            strategies = json.load(f)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    print("Promoter: Writing beautiful emails...")
    
    report_lines = []
    report_lines.append("# RAPORT PROSPECTINGOWY: Producenci Mebli i Hurtownie (Warszawa)")
    report_lines.append(f"Data generacji: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report_lines.append("")
    report_lines.append("> Celem jest nawiązanie relacji handlowej. Styl: Ludzki, profesjonalny, konkretny.")
    report_lines.append("")

    for item in strategies:
        company = item['Company']
        lead_type = item['Type']
        website = item['Website']
        context = item['Context']
        strategy = item['Strategy']
        
        angle = strategy['Angle']
        pain_point = strategy['PainPoint']
        value_prop = strategy['ValueProp']
        key_selling_point = strategy['KeySellingPoint']
        wiifm = strategy['WIIFM'] # What's in it for me

        report_lines.append("---")
        report_lines.append(f"## {company} ({lead_type})")
        report_lines.append(f"**Strategia**: {angle}")
        report_lines.append(f"**Ból klienta**: {pain_point}")
        report_lines.append("")
        
        # --- EMAIL COPY ---
        report_lines.append("### 📧 TREŚĆ E-MAILA")
        
        # Subject
        if lead_type == 'Furniture':
            subject = f"Temat: Pytanie o oświetlenie LED w Państwa meblach"
        elif lead_type == 'Wholesale':
            subject = f"Temat: Dostępność zasilaczy prądowych / Współpraca z {company}"
        else:
            subject = f"Temat: Współpraca w zakresie LED"
            
        report_lines.append(f"**{subject}**")
        report_lines.append("")
        
        # Body
        email_body = ""
        
        if lead_type == 'Furniture':
            email_body = f"""Dzień dobry,

Widzę, że stawiają Państwo na wysoką jakość mebli (przeglądałem {website}) i szukam partnerów, którzy oczekują tego samego od oświetlenia.

Jako dostawca LED, często spotykam się z problemem widocznych "kropek" światła w tanich profilach lub taśmami, które zmieniają barwę po pół roku.
Chciałbym temu zaradzić w Państwa realizacjach.

Nasz "Konik" to:
- **{key_selling_point}** (drewno i okleiny wyglądają naturalnie).
- **{value_prop}**.
- Stabilne zasilanie, które "nie piszczy".

{wiifm}

Czy mogę podesłać darmowy 'box' z próbkami profili i taśm do testów na warsztacie?
Adres z wzięty ze strony ({website}) czy wolicie inny?

Pozdrowienia,
[Twoje Imię]"""

        elif lead_type == 'Wholesale':
             email_body = f"""Dzień dobry,

Piszę bezpośrednio do Państwa, bo widzę, że {company} jest liderem w dystrybucji na terenie Warszawy.
Szukam solidnego partnera handlowego, który chciałby uzupełnić ofertę oświetleniową o segment Premium/Professional, ale w rozsądnej cenie.

Dlaczego warto z nami rozmawiać?
1. **{value_prop}** (towar zawsze na półce).
2. **{key_selling_point}** (nie boimy się o jakość).
3. Czyste zasady współpracy i wsparcie techniczne dla Waszych handlowców.

{wiifm}

Kiedy znajdziesz 5 minut, żeby porozmawiać o marżach i warunkach startowych?

Udanego dnia,
[Twoje Imię]"""
        
        else:
            email_body = f"""Dzień dobry,
            
Piszę w sprawie potencjalnej współpracy.
Oferujemy {value_prop}, co daje {wiifm}.
Nasz wyróżnik to {key_selling_point}.

Porozmawiajmy?

Pozdrawiam,
[Twoje Imię]"""

        report_lines.append(email_body)
        report_lines.append("")

    # Save to file
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
    
    print(f"Promoter: Final emails saved to {output_file}")

if __name__ == "__main__":
    input_path = 'output/writer_strategy.json'
    output_path = 'output/final_prospecting_emails.md'
    run_promoter_final_task(input_path, output_path)
