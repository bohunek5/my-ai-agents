from google import genai
from PIL import Image
from pathlib import Path
import os

ROOT = Path("/Users/karolbohdanowicz/my-ai-agents")

def get_api_key():
    if "GEMINI_API_KEY" in os.environ:
        return os.environ["GEMINI_API_KEY"]
    env_paths = [
        ROOT / "Prescot-LED-APKA/.env.local",
        ROOT / "mazury-holiday/.env.local",
        ROOT / "lumigen-led-studio/.env"
    ]
    for p in env_paths:
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                if "GEMINI_API_KEY=" in line:
                    return line.split("=", 1)[1].strip()
    return None

api_key = get_api_key()
print(f"Extracted API Key: {api_key[:10] if api_key else 'None'}...")

try:
    if not api_key:
        raise ValueError("No Gemini API key found in .env files!")
        
    client = genai.Client(api_key=api_key)
    
    media_dir = "/Users/karolbohdanowicz/my-ai-agents/LASERTAG/assets/media"
    cennik_path = os.path.join(media_dir, "CENNIKIKI I PAKIETY LT.jpg")
    plakat_path = os.path.join(media_dir, "PLAKAT LT.jpg")
    
    print("Analyzing Cennik...")
    cennik_img = Image.open(cennik_path)
    response_cennik = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            cennik_img,
            "Przeczytaj dokładnie i przepisz słowo w słowo wszystkie teksty, cenniki, pakiety, ceny, liczby minut i zasady, które znajdują się na tym obrazku (cenniku laser tag). Zwróć to w postaci czytelnego Markdown."
        ]
    )
    print("\n--- CENNIK INFO ---")
    print(response_cennik.text)
    
    print("\nAnalyzing Plakat...")
    plakat_img = Image.open(plakat_path)
    response_plakat = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            plakat_img,
            "Przeczytaj dokładnie i przepisz słowo w słowo wszystkie teksty, informacje, godziny, cenniki i szczegóły oferty, które znajdują się na tym plakacie laser tag. Zwróć to w postaci czytelnego Markdown."
        ]
    )
    print("\n--- PLAKAT INFO ---")
    print(response_plakat.text)

except Exception as e:
    print(f"Error: {e}")
