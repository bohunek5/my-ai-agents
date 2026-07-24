import re

path = "/Users/karolbohdanowicz/my-ai-agents/tools/imessage_ai_agent.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# We'll completely replace the generate_reply logic and add the Ollama fallback
new_logic = """def get_api_key():
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

def generate_reply_ollama(sender, incoming, system_prompt):
    payload = {
        "model": "qwen3.5:latest", # Using a smarter model than the previous one
        "stream": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"Nadawca: {sender}\\nWiadomość: {incoming}\\n\\nOdpowiedz po polsku:",
            },
        ],
        "options": {
            "temperature": 0.15,
            "top_p": 0.85,
            "num_ctx": 4096,
            "num_predict": 256,
        },
    }
    request = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data["message"]["content"].strip()

def generate_reply(sender, incoming):
    system = (
        "Jesteś prywatnym asystentem do iMessage i SMS. "
        "Najpierw po cichu zrozum intencje wiadomości, ale nie pokazuj rozumowania. "
        "Odpisuj ZAWSZE po polsku, krótko, naturalnie, jak człowiek w rozmowie SMS. "
        "Masz doskonałą wiedzę ogólną i geograficzną o Polsce (np. wiesz że Giżycko to Mazury, a nie kujawsko-pomorskie). "
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

    api_key = get_api_key()
    
    # Try Gemini 2.0 API first
    if api_key:
        try:
            client = genai.Client(api_key=api_key)
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
            return response.text.strip()
        except Exception as e:
            log(f"Gemini API failed: {e}. Falling back to local Ollama (qwen3.5).")
            # Fall back to Ollama
            pass
    else:
        log("No valid Gemini API key found. Falling back to local Ollama (qwen3.5).")

    # Fallback to Ollama
    try:
        return generate_reply_ollama(sender, incoming, system)
    except Exception as e:
        log(f"Ollama also failed: {e}")
        return ""
"""

# Extract the old get_api_key and generate_reply
match = re.search(r"def get_api_key\(\):.*?return response\.text\.strip\(\)", content, re.DOTALL)
if match:
    content = content.replace(match.group(0), new_logic.strip())
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated agent script successfully")
else:
    print("Regex failed to match")
