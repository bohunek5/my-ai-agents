import json
import time
import os
import requests
from pathlib import Path

# Jeśli masz bibliotekę duckduckgo_search, odkomentuj:
# from duckduckgo_search import DDGS

# Możesz użyć Ollama (lokalnie) lub OpenAI zależnie od Twojej konfiguracji
# Zgodnie z niedawnymi rozmowami, jeśli używasz lokalnych modeli:
OLLAMA_API_URL = "http://localhost:11434/api/generate"

INCOMING_JSON_PATH = "incoming_companies.json"
OUTPUT_JSON_PATH = "enriched_companies.json"

def search_network(name, nip, address):
    """
    Wyszukuje informacje o firmie w sieci (Google / DuckDuckGo).
    Tutaj dla przykładu użyte darmowe web scraping API, ale w produkcji użyj DDGS.
    """
    query = f"{name} {nip} {address}"
    print(f"[🔍] Wzbudzam Agenta Badawczego. Szukam: {query}")
    
    # Przykładowa integracja darmowego wyszukiwania przez duckduckgo-search
    # try:
    #     results = DDGS().text(query, max_results=3)
    #     return ' '.join([res['body'] for res in results])
    # except ImportError:
    #     print("Zainstaluj duckduckgo_search: pip install duckduckgo-search")
    
    # Placeholder dla wyników z sieci, aby można było przetestować bez psujących się pakietów
    return f"Wyniki z wyszukiwarki: Firma {name} (NIP {nip}) zarejestrowana pod adresem {address}. Działa aktywnie w branży jako dystrybutor / producent. Główny członek zarządu według KRS."

def analyze_with_ai(company_name, nip, search_snippets):
    """
    Wysyła zebrane fakty z Google do Twojego LLM (lokalnego Dr. Karola / Ollamy lub OpenAI)
    aby wyciągnąć konkretne pola: Branża, Decydent, Szczegóły.
    """
    print(f"[🧠] Przetwarzam zebrane informacje z Google przez LLM dla {company_name}...")
    
    prompt = f"""
    Na podstawie poniższych twardych faktów z Google, przygotuj KARTĘ INFORMACYJNĄ FIRMY.
    Format JSON:
    {{
        "industry": "Główna branża (krótko, np. Producent Zasilaczy)",
        "person": "Imię i nazwisko dyrektora/właściciela z zebranych danych",
        "detail": "Bardzo twarde fakty bez lania wody (np. wielkość firmy rynkowo, z czym operują, data założenia)."
    }}
    
    Fakty do przetworzenia:
    {search_snippets}
    """
    
    # Dla LLM'a wywoływanego przez Ollama:
    try:
        response = requests.post(OLLAMA_API_URL, json={
            "model": "mistral", # Zamień na swój model z Dr. Karola
            "prompt": prompt,
            "stream": False,
            "format": "json"
        }, timeout=30)
        
        if response.status_code == 200:
            result = response.json().get("response", "{}")
            return json.loads(result)
        else:
            return {"industry": "Nieznana", "person": "Brak danych z KRS", "detail": f"Błąd LLM: {response.text}"}
    except Exception as e:
        print(f"[!] Błąd połączenia z lokalnym AI (Ollama): {e}")
        return {
            "industry": "Dane tymczasowe (Serwer AI wyłączony)", 
            "person": "Do ustalenia KRS", 
            "detail": search_snippets[:150] + "..."
        }

def process_new_companies():
    if not os.path.exists(INCOMING_JSON_PATH):
        # Tworzy pusty plik jako "kolejkę" dla Ciebie
        with open(INCOMING_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump([], f)
        return

    with open(INCOMING_JSON_PATH, "r", encoding="utf-8") as f:
        try:
            companies = json.load(f)
        except:
            companies = []

    if not companies:
        return

    enriched_companies = []
    if os.path.exists(OUTPUT_JSON_PATH):
        with open(OUTPUT_JSON_PATH, "r", encoding="utf-8") as f:
            try:
                enriched_companies = json.load(f)
            except:
                enriched_companies = []

    for comp in companies:
        name = comp.get("nazwa", "")
        nip = comp.get("nip", "")
        address = comp.get("adres", "")

        # 1. Zbieranie z Google
        snippets = search_network(name, nip, address)
        
        # 2. Inteligentna kompresja twardych faktów
        ai_dossier = analyze_with_ai(name, nip, snippets)

        # 3. Zapisanie struktury gotowej do wklejenia w Frontendzie Portalu CRM
        new_lead = {
            "id": f"agent-{int(time.time())}",
            "name": name,
            "industry": ai_dossier.get("industry", "Brak danych"),
            "city": address.split()[-1] if address else "Nieznane",
            "detail": ai_dossier.get("detail", ""),
            "person": ai_dossier.get("person", "Brak danych KRS"),
            "nip": nip,
            "assignedTo": "admin", # domyślnie przydziela komuś
            "type": "new_lead",
            "status": "enriched_by_agent"
        }
        
        enriched_companies.append(new_lead)
        print(f"[✅] Zakończono dossier dla: {name}\n")

    # Zapis i wyczyszczenie "kolejki"
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(enriched_companies, f, ensure_ascii=False, indent=4)
    
    with open(INCOMING_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump([], f)

if __name__ == "__main__":
    print("==================================================")
    print("🤖 Agent Badawczy (Company Researcher) Aktywowany!")
    print(f"📡 Monitoruję plik: {INCOMING_JSON_PATH}...")
    print("==================================================")
    
    while True:
        process_new_companies()
        time.sleep(10) # Agent sprawdza kolejkę co 10 sekund
