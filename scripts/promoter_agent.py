import json
import os
from datetime import datetime

def run_promoter_task(analyst_file, prospector_file, output_file):
    print(f"Promoter: Reading data from {analyst_file} and {prospector_file}...")
    
    leads_analyst = []
    leads_prospector = []
    
    try:
        if os.path.exists(analyst_file):
            with open(analyst_file, 'r', encoding='utf-8') as f:
                leads_analyst = json.load(f)
        if os.path.exists(prospector_file):
            with open(prospector_file, 'r', encoding='utf-8') as f:
                leads_prospector = json.load(f)
    except Exception as e:
        print(f"Error reading files: {e}")
        return

    print(f"Promoter: Drafting emails for {len(leads_analyst)} old clients and {len(leads_prospector)} new leads...")
    
    report_lines = []
    report_lines.append("# GOTOWE WIADOMOŚCI DOTARCIA (E-MAIL + LINKEDIN)")
    report_lines.append(f"Data generacji: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report_lines.append("")
    report_lines.append("---")
    report_lines.append(f"## CZĘŚĆ 1: ODZYSKIWANIE KLIENTÓW (Win-back) - {len(leads_analyst)} firm")
    report_lines.append("---")

    # --- OLD CLIENTS ---
    for lead in leads_analyst:
        company = lead['Company']
        product = lead['FavoriteProduct']
        product_simple = product.split()[0]
        
        report_lines.append(f"### KONTRAHENT (STARY): {company}")
        
        # Email
        report_lines.append("#### 📧 WERSJA E-MAIL")
        subject = f"Temat: Pytanie o {product} / Dostawa do {company}"
        email_body = f"""**{subject}**

Dzień dobry,

Piszę, bo widzę w historii, że regularnie zamawialiście u nas **{product}**. 
Od Waszego ostatniego zamówienia minęło już trochę czasu, a właśnie uzupełniliśmy magazyn o nową, wydajniejszą partię.

Jako stałemu partnerowi, chciałbym zaproponować **rabat lojalnościowy -10%** na powrót, jeśli zdecydujecie się na zamówienie do końca tygodnia.

Kiedy moglibyśmy krótko porozmawiać o szczegółach? 
Wystarczy, że odpiszesz "TAK" lub zadzwonisz do mnie jutro.

Pozdrawiam,
[Twoje Imię]"""
        report_lines.append(email_body)
        report_lines.append("")
        
        # LinkedIn
        report_lines.append("#### 🔗 WERSJA LINKEDIN")
        linkedin_msg = f"""Cześć! 👋

Przeglądałem nasze archiwum i zauważyłem, że {company} długo korzystało z naszych rozwiązań ({product}). 
Jesteście zadowoleni? Mamy teraz świetną ofertę na nową dostawę (lepsza wydajność!).

Chciałbym podesłać Ci spersonalizowaną propozycję. Znajdziesz chwilę w tym tygodniu na krótką rozmowę?

Pozdrowienia!"""
        report_lines.append(linkedin_msg)
        report_lines.append("")
        report_lines.append("---")

    report_lines.append("")
    report_lines.append("---")
    report_lines.append(f"## CZĘŚĆ 2: NOWI KLIENCI (Cold Outreach) - {len(leads_prospector)} firm")
    report_lines.append("---")

    # --- NEW LEADS ---
    for lead in leads_prospector:
        company = lead['Company']
        reason = lead['Reason']
        website = lead['Website']
        
        report_lines.append(f"### KONTRAHENT (NOWY): {company}")
        report_lines.append(f"**WWW**: {website}")
        report_lines.append(f"**Kontekst**: {reason}")
        
        # Email
        report_lines.append("#### 📧 WERSJA E-MAIL (COLD)")
        subject = f"Temat: Współpraca LED dla {company} / Produkcja mebli"
        email_body = f"""**{subject}**

Dzień dobry,

Piszę do Państwa, ponieważ widziałem Wasze realizacje na {website} i jestem pod wrażeniem jakości Waszych mebli.
Jako dostawca profesjonalnych systemów LED, pomagamy producentom takim jak {company} podnosić wartość mebli poprzez nowoczesne oświetlenie (bez awarii i reklamacji).

Chciałbym przesłać próbnik naszych profili i taśm dedykowanych do zabudowy meblowej.
Czy mogę prosić o adres do wysyłki próbek?

Z poważaniem,
[Twoje Imię]"""
        report_lines.append(email_body)
        report_lines.append("")
        
        # LinkedIn
        report_lines.append("#### 🔗 WERSJA LINKEDIN")
        linkedin_msg = f"""Dzień dobry! 👋

Widziałem Państwa ostatnie projekty mebli ({company}) - świetny design!
Zastanawiam się, jakich rozwiązań LED używacie obecnie w swoich realizacjach?

Specjalizujemy się w dostarczaniu niezawodnego oświetlenia dla stolarzy. Chętnie podeślę bezpłatnie próbki naszych profili, żebyście mogli porównać jakość.
Co Państwo na to?

Pozdrawiam!"""
        report_lines.append(linkedin_msg)
        report_lines.append("")
        report_lines.append("---")

    # Save to file
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
    
    print(f"Promoter: Final messages saved to {output_file}")

if __name__ == "__main__":
    analyst_input = 'output/analyst_result.json'
    prospector_input = 'output/nowe_lead_led.json'
    output_path = 'output/finalne_maile_do_wysylki.md'
    run_promoter_task(analyst_input, prospector_input, output_path)
