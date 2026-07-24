import json
import requests
import sys
import re

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2:latest"

def query_ollama(prompt):
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        return response.json().get('response', '').strip()
    except Exception as e:
        return f"Error: {str(e)}"

def generate_recon(company_name, city):
    # Professional 3-4 sentence logical analysis
    short_prompt = f"""
    Jesteś profesjonalnym analitykiem biznesowym. Przygotuj krótki rekonesans firmy: {company_name} z siedzibą w {city}.
    Napisz dokładnie od 3 do 4 logicznych, opartych na profilu rynkowym zdań. 
    Skup się na: profilu działalności, roku założenia (jeśli znany lub zakres), skali operacji.
    ZAKAZ: bełkotu, pustych przymiotników, losowych słów. Ma to wyglądać jak profesjonalna notatka w CRM.
    Język klienta: Polski.
    """
    
    # Detailed full profile
    full_prompt = f"""
    Jesteś systemem NotebookLM. Przygotuj rozszerzony profil firmy {company_name} ({city}).
    Stwórz paczkę informacji zawierającą:
    1. Specjalizacja: jakie konkretnie produkty/usługi oferują?
    2. Rynek: Lokalny, ogólnopolski czy zagraniczny?
    3. Synergia: Jak ta firma może wykorzystać produkty oświetleniowe (profile LED, zasilacze, taśmy)? 
       Czy są wykonawcami, producentami mebli, czy biurem projektowym?
    Napisz to w formie konkretnych punktów. Unikaj zbędnego lania wody.
    Język klienta: Polski.
    """
    
    short_analysis = query_ollama(short_prompt)
    full_profile = query_ollama(full_prompt)
    
    return short_analysis, full_profile

def extract_leads_from_ts(file_path, target_reps):
    # Since the file is HUGE (4.7MB), we'll use a regex search for specific blocks
    # or just read lines and track assignments.
    processed_leads = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Simple regex to find blocks between { and } in ALL_LEADS array
    # Note: This is an approximation since a lead can have nested objects, 
    # but here the schema is flat.
    lead_blocks = re.findall(r'\{\s*"id":\s*".*?".*?\}', content, re.DOTALL)
    
    for block in lead_blocks:
        try:
            # Add quotes to keys if missing (though they are present in the .ts)
            # and parse
            lead_data = json.loads(block)
            if lead_data.get('assignedTo') in target_reps:
                processed_leads.append(lead_data)
        except:
            continue
            
    return processed_leads

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python recon_agent.py <command>")
        print("Commands: single <name> <city> | batch <ts_file_path>")
        sys.exit(1)
        
    cmd = sys.argv[1]
    
    if cmd == "single":
        name = sys.argv[2]
        city = sys.argv[3]
        short, full = generate_recon(name, city)
        print(json.dumps({"short": short, "full": full}, ensure_ascii=False))
        
    elif cmd == "batch":
        ts_path = sys.argv[2]
        target_reps = ["dariuszn", "annag", "annaa", "adamg", "iwonab"]
        leads = extract_leads_from_ts(ts_path, target_reps)
        
        # We only process a few for testing to avoid huge runtime
        # The user can run it for more later.
        results = []
        for lead in leads[:3]: # LIMIT for safety in demo
            print(f"Processing: {lead['name']}...")
            short, full = generate_recon(lead['name'], lead['city'])
            lead['companyAnalysis'] = short
            lead['fullProfile'] = full
            results.append(lead)
            
        with open("enriched_leads_sample.json", "w", encoding="utf-8") as out:
            json.dump(results, out, indent=4, ensure_ascii=False)
        print("\nProcessed 3 leads. Check enriched_leads_sample.json")
