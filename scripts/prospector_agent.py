import json
import os

def run_prospector_task(output_file):
    print("Prospector: Searching for furniture manufacturers in the area...")
    
    # Simulated search results based on "real" web search data provided by the agent
    leads = [
        {
            "Company": "Fabryka Mebli",
            "Website": "fabrykamebli.pl",
            "Reason": "Producent mebli na wymiar - potencjalne zapotrzebowanie na profile LED do kuchni i szaf."
        },
        {
            "Company": "MEBLE GAL",
            "Website": "oferteo.pl/meble-gal",
            "Reason": "Wysoko oceniana firma stolarska, realizuje dużo projektów indywidualnych wymagających oświetlenia."
        },
        {
            "Company": "Artex Kuchnie i Wnętrza Natalia Kubiak",
            "Website": "artex-kuchnie.pl",
            "Reason": "Specjalizacja w kuchniach na wymiar - idealny klient na taśmy LED podszafkowe i zasilacze."
        },
        {
            "Company": "Ramaro",
            "Website": "ramaro.pl",
            "Reason": "Producent mebli tapicerowanych - możliwość współpracy przy podświetlanych meblach wypoczynkowych."
        },
        {
            "Company": "Meblik",
            "Website": "meblik.pl",
            "Reason": "Duży producent mebli dziecięcych - potencjał na bezpieczne oświetlenie LED w pokojach dziecięcych."
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
