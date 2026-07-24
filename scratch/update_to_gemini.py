import re

path = "/Users/karolbohdanowicz/my-ai-agents/tools/imessage_ai_agent.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import_statement = "import urllib.request"
new_imports = "from google import genai"

content = content.replace(import_statement, new_imports)

old_function = """def generate_reply(sender, incoming):
    system = (
        "Jestes prywatnym asystentem do iMessage i SMS. "
        "Najpierw po cichu zrozum intencje wiadomosci, ale nie pokazuj rozumowania. "
        "Odpisuj ZAWSZE po polsku, krotko, naturalnie, jak czlowiek w rozmowie SMS. "
        "Nie tlumacz wiadomosci. Nie pisz po angielsku. Nie powtarzaj instrukcji. "
        "Nie wymyslaj cen, terminow ani faktow. "
        "Zwracaj tylko jedna gotowa odpowiedz SMS, bez naglowkow i komentarzy.\\n\\n"
        "Przyklady stylu:\\n"
        "Wiadomosc: Jesli chcesz makaron spaghetti musisz kupic w deli mam tylko moj do mac and cheese\\n"
        "Odpowiedz: Dobra, to kupie spaghetti w deli. Twojego do mac and cheese nie ruszam.\\n"
        "Wiadomosc: Xd\\n"
        "Odpowiedz: xd\\n"
        "Wiadomosc: Bede za 15 min\\n"
        "Odpowiedz: Okej, czekam."
    )
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {"role": "system", "content": system},
            {
                "role": "user",
                "content": f"Nadawca: {sender}\\nWiadomosc: {incoming}\\n\\nOdpowiedz po polsku:",
            },
        ],
        "options": {
            "temperature": 0.15,
            "top_p": 0.85,
            "num_ctx": 2048,
            "num_predict": 220,
            "num_thread": 4,
        },
    }
    request = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data["message"]["content"].strip()"""

new_function = """def get_api_key():
    if "GEMINI_API_KEY" in os.environ:
        return os.environ["GEMINI_API_KEY"]
    env_paths = [
        ROOT / "Prescot-LED-APKA/.env.local",
        ROOT / "mazury-holiday/.env.local"
    ]
    for p in env_paths:
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip()
    return None

def generate_reply(sender, incoming):
    api_key = get_api_key()
    if not api_key:
        return "Błąd: Brak klucza GEMINI_API_KEY."

    client = genai.Client(api_key=api_key)
    
    system = (
        "Jesteś prywatnym asystentem do iMessage i SMS. "
        "Najpierw po cichu zrozum intencje wiadomości, ale nie pokazuj rozumowania. "
        "Odpisuj ZAWSZE po polsku, krótko, naturalnie, jak człowiek w rozmowie SMS. "
        "Nie tłumacz wiadomości. Nie pisz po angielsku. Nie powtarzaj instrukcji. "
        "Nie wymyślaj cen, terminów ani faktów. "
        "Zwracaj tylko jedną gotową odpowiedź SMS, bez nagłówków i komentarzy.\\n\\n"
        "Przykłady stylu:\\n"
        "Wiadomość: Jeśli chcesz makaron spaghetti musisz kupić w deli mam tylko mój do mac and cheese\\n"
        "Odpowiedź: Dobra, to kupię spaghetti w deli. Twojego do mac and cheese nie ruszam.\\n"
        "Wiadomość: Xd\\n"
        "Odpowiedź: xd\\n"
        "Wiadomość: Będę za 15 min\\n"
        "Odpowiedź: Okej, czekam."
    )
    
    prompt = f"Nadawca: {sender}\\nWiadomość: {incoming}\\n\\nOdpowiedz po polsku:"
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            system_instruction=system,
            temperature=0.15,
            top_p=0.85,
        ),
    )
    return response.text.strip()"""

if old_function in content:
    content = content.replace(old_function, new_function)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated to Gemini API successfully")
else:
    print("Could not find the old function block")
