import os
from google import genai
from google.genai import types
from datetime import datetime

class GeminiCore:
    """Centralny klient Gemini 2.0 dla ekosystemu my-ai-agents."""
    
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            # Fallback do klucza znalezionego w Kinga Studio (może wymagać aktualizacji)
            self.api_key = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM" 
        
        self.client = genai.Client(api_key=self.api_key)
        self.log_file = "output/ai_telemetry.log"

    def _log_usage(self, model, tokens, mode):
        os.makedirs("output", exist_ok=True)
        with open(self.log_file, "a") as f:
            f.write(f"{datetime.now().isoformat()} | {model} | {mode} | Tokens: {tokens}\n")

    def generate_content(self, prompt, model="gemini-2.0-flash", parts=None):
        """Generowanie tekstu/analiza multimodalna."""
        contents = [prompt]
        if parts:
            contents.extend(parts)
            
        print(f"🤖 [Gemini 2.0] Wywoływanie modelu {model}...")
        response = self.client.models.generate_content(
            model=model,
            contents=contents
        )
        
        # Logowanie (uproszczone, SDK może nie zwracać tokenów w preview w ten sam sposób)
        self._log_usage(model, "N/A (preview)", "Generation")
        return response.text

    def embed_multimodal(self, contents, model="gemini-embedding-2-preview"):
        """Nowość: Embeddingi multimodalne."""
        print(f"🧠 [Gemini 2.0] Generowanie embeddingów multimodalnych ({model})...")
        result = self.client.models.embed_content(
            model=model,
            contents=contents
        )
        self._log_usage(model, "N/A (preview)", "Embedding")
        return result.embeddings

# Singleton dla ekosystemu
ai = GeminiCore()

if __name__ == "__main__":
    # Test prostego promptu
    print(ai.generate_content("Cześć, potwierdź że działasz jako serce ekosystemu Gemini 2.0."))
