import json
import os

def run_prospector_task(output_file):
    print("Prospector: Searching for furniture manufacturers and wholesalers in Warsaw...")
    
    # Real data from search results
    leads = [
        # 5 Furniture Manufacturers in Warsaw
        {
            "Company": "Fabryka Mebli",
            "Website": "fabrykamebli.pl",
            "Type": "Furniture",
            "Reason": "Renomowany producent mebli na wymiar w Warszawie. Potencjalne zapotrzebowanie na profile wpuszczane do szaf i kuchni."
        },
        {
            "Company": "Pracownia Stolarska Rozbicki",
            "Website": "rozbickimeble.pl",
            "Type": "Furniture",
            "Reason": "Specjalizacja w meblach kuchennych i szafach. Idealny klient na taśmy LED o wysokim CRI do oświetlenia blatów."
        },
        {
            "Company": "Meble Bieniek",
            "Website": "meblebieniek.pl",
            "Type": "Furniture",
            "Reason": "Firma z tradycjami (od 1937), robi meble kuchenne i łazienkowe. Możliwość modernizacji oferty o inteligentne sterowanie LED."
        },
        {
            "Company": "Fraktal Meble",
            "Website": "localo.site (Fraktal)",
            "Type": "Furniture",
            "Reason": "Wysoko oceniana za precyzję. Klienci premium oczekują idealnego oświetlenia bez efektu 'kropek' (profile COB)."
        },
        {
            "Company": "MkDesign",
            "Website": "stolarz-warszawa.pl",
            "Type": "Furniture",
            "Reason": "Solidne wykonanie kuchni. Warto zaproponować gotowe zestawy LED na wymiar, co przyspieszy ich montaż."
        },
        # 3 Electrical Wholesalers in Warsaw
        {
            "Company": "Kim Sp. z o.o. - CENTRALA",
            "Website": "kim24.pl",
            "Type": "Wholesale",
            "Reason": "Lider rankingu hurtowni w Warszawie. Ogromny potencjał na stałą współpracę dystrybucyjną (zasilacze, sterowniki)."
        },
        {
            "Company": "GRODNO S.A.",
            "Website": "grodno.pl",
            "Type": "Wholesale",
            "Reason": "Duża sieć z oddziałem w Warszawie. Szukają nowości i stabilnych dostawców oświetlenia technicznego."
        },
        {
            "Company": "Droker",
            "Website": "drokersc.com.pl",
            "Type": "Wholesale",
            "Reason": "Hurtownia na Targówku. Bezpośrednie dotarcie do lokalnych instalatorów, którzy kupują tam osprzęt."
        }
    ]
    
    # Save results
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(leads, f, indent=4, ensure_ascii=False)
    
    print(f"Prospector: Found {len(leads)} new leads. Saved to {output_file}")

if __name__ == "__main__":
    output_path = 'output/nowe_lead_led.json'
    run_prospector_task(output_path)
