#!/usr/bin/env python3
import json
import os
import sys
import urllib.error
import urllib.request

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434/api/chat")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "message-reply-local")


def generate_reply(message: str, context: str = "") -> str:
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Odpisujesz na wiadomosci po polsku. "
                    "Ton: naturalny, konkretny, bez lania wody. "
                    "Pisz w pierwszej osobie jako nadawca odpowiedzi. "
                    "Nie obiecuj rzeczy, ktorych nie ma w kontekscie. "
                    "Nie dodawaj prefiksow typu 'gotowa odpowiedz'. "
                    "Jesli ktos pyta o cene, a w kontekscie jej nie ma, napisz ze zalezy od zakresu "
                    "i popros o krotki opis potrzeb."
                ),
            },
            {
                "role": "user",
                "content": f"Kontekst:\n{context}\n\nWiadomosc:\n{message}\n\nOdpowiedz jednym krotkim akapitem:",
            },
        ],
        "options": {
            "temperature": 0.3,
            "top_p": 0.85,
            "num_ctx": 2048,
            "num_predict": 512,
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
        return data["message"]["content"].strip()


def main() -> int:
    if len(sys.argv) > 1:
        message = " ".join(sys.argv[1:])
    else:
        message = sys.stdin.read().strip()

    if not message:
        print("Usage: ollama_reply.py 'wiadomosc' albo echo 'wiadomosc' | ollama_reply.py", file=sys.stderr)
        return 2

    try:
        print(generate_reply(message))
        return 0
    except urllib.error.URLError as exc:
        print(f"Ollama error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
