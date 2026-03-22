import os
import base64
from google import genai
from google.genai import types
from PIL import Image
import io

# Konfiguracja klucza (z pliku .env który znaleźliśmy)
API_KEY = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM"

def test_multimodal_embeddings():
    print("🚀 Inicjalizacja Gemini Embedding 2...")
    client = genai.Client(api_key=API_KEY)
    
    # Ścieżka do przykładowego obrazu
    image_path = "assets/klus_product.png" 
    
    if not os.path.exists(image_path):
        print(f"❌ Nie znaleziono obrazu: {image_path}")
        return

    print(f"📸 Przetwarzanie obrazu: {image_path}...")
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    print("🧠 Generowanie embeddingu multimodalnego (Tekst + Obraz)...")
    try:
        result = client.models.embed_content(
            model="gemini-embedding-2-preview",
            contents=[
                "Wysokiej jakości profil LED do montażu w meblach",
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type="image/png",
                ),
            ],
        )
        
        embeddings = result.embeddings
        print(f"✅ Sukces! Wygenerowano embeddingi dla {len(embeddings)} elementów.")
        print(f"Długość wektora: {len(embeddings[0].values)}")
        
        # Przykładowa analiza
        print("\n--- ANALIZA ---")
        print("Model Gemini 2.0 pomyślnie zmapował tekst i obraz do wspólnej przestrzeni.")
        print("Możemy teraz wyszukiwać produkty wizualnie za pomocą zapytań tekstowych.")
        
    except Exception as e:
        print(f"❌ Błąd API: {e}")

if __name__ == "__main__":
    test_multimodal_embeddings()
