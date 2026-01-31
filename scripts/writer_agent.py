import json
import os
from datetime import datetime

def run_writer_task(input_file, output_file):
    print(f"Writer: Reading {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            leads = json.load(f)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    print(f"Writer: Generating scenarios for {len(leads)} leads...")
    
    report_lines = []
    report_lines.append("# SCENARIUSZE ROZMÓW HANDLOWYCH")
    report_lines.append(f"Data generacji: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report_lines.append("")

    for lead in leads:
        company = lead['Company']
        days = lead['DaysSincePurchase']
        product = lead['FavoriteProduct']
        last_date = lead['LastPurchaseDate']

        report_lines.append(f"## FIRMA: {company}")
        report_lines.append(f"**Status**: Nieaktywny od {days} dni.")
        report_lines.append("")
        
        # Icebreaker
        report_lines.append("### 1. Lodołamacz")
        report_lines.append(f"- \"Dzień dobry, dzwonię, ponieważ widzę, że ostatnio ({last_date}) zamawialiście u nas **{product}**.")
        report_lines.append(f"- Jak się sprawował ten produkt? Czy wszystko z nim w porządku?\"")
        report_lines.append("")

        # Value Proposition
        report_lines.append("### 2. Propozycja Wartości")
        report_lines.append(f"- \"Zauważyłem, że minęło już {days} dni od ostatnich zakupów.")
        report_lines.append("- Chciałbym zaproponować specjalny rabat powrotny na asortyment z kategorii " + product.split()[0] + "...")
        report_lines.append("- Mamy teraz nową dostawę, która charakteryzuje się wyższą wydajnością.\"")
        report_lines.append("")

        # Objections
        report_lines.append("### 3. Zbijanie Obiekcji")
        report_lines.append("**Klient: \"Mamy już innego dostawcę.\"**")
        report_lines.append("- \"Rozumiem. Warto jednak mieć sprawdzoną alternatywę na wypadek braków magazynowych. Czy mogę podesłać cennik niezobowiązująco?\"")
        report_lines.append("")
        report_lines.append("**Klient: \"Teraz nie potrzebujemy.\"**")
        report_lines.append("- \"Jasne. A kiedy planujecie kolejne zamówienia? Może warto zabezpieczyć towar wcześniej w starej cenie?\"")
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")

    # Save to file
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
    
    print(f"Writer: Report saved to {output_file}")

if __name__ == "__main__":
    input_path = 'output/analyst_result.json'
    output_path = 'output/sales_scenarios.md'
    run_writer_task(input_path, output_path)
