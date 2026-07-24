#!/usr/bin/env python3
import json
import os
import sqlite3
import subprocess
import time
from collections import deque
from google import genai
import urllib.request
from pathlib import Path

ROOT = Path("/Users/karolbohdanowicz/my-ai-agents")
APP_SUPPORT = Path.home() / "Library/Application Support/iMessageAIAgent"
STATE_PATH = APP_SUPPORT / "state.json"
LOG_PATH = APP_SUPPORT / "agent.log"
ALLOWLIST_PATH = APP_SUPPORT / "allowlist.txt"
DB_PATH = Path.home() / "Library/Messages/chat.db"
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434/api/chat")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "message-reply-local")
POLL_SECONDS = int(os.getenv("IMESSAGE_AI_POLL_SECONDS", "8"))


def log(message):
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime("%Y-%m-%d %H:%M:%S")
    with LOG_PATH.open("a", encoding="utf-8") as handle:
        handle.write(f"[{stamp}] {message}\n")


def notify(title, body):
    subprocess.run(
        ["osascript", "-e", f'display notification {json.dumps(body)} with title {json.dumps(title)}'],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def extract_text(row_text, attributed_body):
    if row_text:
        return row_text
    if not attributed_body:
        return None
    blob = attributed_body
    markers = [b"NSString\x01\x94\x84\x01+", b"NSMutableString\x01\x94\x84\x01+"]
    for marker in markers:
        idx = blob.find(marker)
        if idx == -1:
            continue
        start = idx + len(marker)
        if start >= len(blob):
            continue
        length = blob[start]
        text_start = start + 1
        if length == 0x81 and start + 1 < len(blob):
            length = blob[start + 1]
            text_start = start + 2
        try:
            return blob[text_start : text_start + length].decode("utf-8")
        except Exception:
            pass
    return None


def load_state():
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    if not STATE_PATH.exists():
        return {}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_state(state):
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def current_max_rowid():
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute("SELECT COALESCE(MAX(ROWID), 0) FROM message").fetchone()
    return int(row[0] or 0)


def read_allowlist():
    if not ALLOWLIST_PATH.exists():
        return set()
    return {
        line.strip().lower()
        for line in ALLOWLIST_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.strip().startswith("#")
    }


def is_meaningful_text(text):
    if not text:
        return False
    cleaned = text.strip().replace("\ufffc", "").strip()
    return bool(cleaned)


def new_messages(after_rowid):
    query = """
    SELECT
        m.ROWID,
        m.text,
        m.attributedBody,
        h.id as sender_id,
        h.service,
        m.is_from_me
    FROM message m
    LEFT JOIN handle h ON m.handle_id = h.ROWID
    WHERE m.ROWID > ?
    ORDER BY m.ROWID ASC
    """
    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute(query, (after_rowid,)).fetchall()


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

def generate_reply_ollama(sender, incoming, system_prompt):
    payload = {
        "model": "llama3.2:latest", # Using a smarter model than the previous one
        "stream": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"Nadawca: {sender}\nWiadomość: {incoming}\n\nOdpowiedz po polsku:",
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
        "Zwracaj tylko jedną gotową odpowiedź SMS, bez nagłówków i komentarzy.\n\n"
        "Przykłady stylu:\n"
        "Wiadomość: Jeśli chcesz makaron spaghetti musisz kupić w deli mam tylko mój do mac and cheese\n"
        "Odpowiedź: Dobra, to kupię spaghetti w deli. Twojego do mac and cheese nie ruszam.\n"
        "Wiadomość: Xd\n"
        "Odpowiedź: xd\n"
        "Wiadomość: Będę za 15 min\n"
        "Odpowiedź: Okej, czekam."
    )

    api_key = get_api_key()
    
    # Try Gemini 2.0 API first
    if api_key:
        try:
            client = genai.Client(api_key=api_key)
            prompt = f"Nadawca: {sender}\nWiadomość: {incoming}\n\nOdpowiedz po polsku:"
            
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


def send_message(recipient, body):
    script = """
on run argv
    set targetRecipient to item 1 of argv
    set messageBody to item 2 of argv
    tell application "Messages"
        try
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy targetRecipient of targetService
            send messageBody to targetBuddy
            return "OK:iMessage"
        on error
            set targetService to 1st service whose service type = SMS
            set targetBuddy to buddy targetRecipient of targetService
            send messageBody to targetBuddy
            return "OK:SMS"
        end try
    end tell
end run
"""
    result = subprocess.run(
        ["osascript", "-e", script, recipient, body],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


recent_replies = deque(maxlen=100)

def main():
    if not DB_PATH.exists():
        notify("AI iMessage wylaczony", "Nie znaleziono bazy Messages.")
        raise SystemExit(1)

    state = load_state()
    if "last_rowid" not in state:
        try:
            state["last_rowid"] = current_max_rowid()
        except sqlite3.DatabaseError as exc:
            log(f"PERMISSION_ERROR: {exc}")
            notify(
                "AI iMessage brak uprawnien",
                "Dodaj Python lub AI-iMessage-Agent do Full Disk Access i wlacz ponownie.",
            )
            raise SystemExit(77)
        save_state(state)
        log(f"Initialized at ROWID {state['last_rowid']}")

    notify("AI iMessage wlaczony", "Agent dziala w tle i odpowiada lokalnie przez Ollama.")
    log("Agent started")

    while True:
        state = load_state()
        last_rowid = int(state.get("last_rowid", 0))
        allowlist = read_allowlist()
        max_seen = last_rowid

        try:
            rows = new_messages(last_rowid)
        except sqlite3.DatabaseError as exc:
            log(f"PERMISSION_ERROR: {exc}")
            notify(
                "AI iMessage brak uprawnien",
                "macOS blokuje czytanie Messages. Wlacz Full Disk Access.",
            )
            raise SystemExit(77)

        for rowid, text, attributed_body, sender, service, is_from_me in rows:
            max_seen = max(max_seen, int(rowid))
            if not sender:
                continue
            
            normalized_sender = sender.lower()
            incoming = extract_text(text, attributed_body)
            
            if is_from_me:
                if normalized_sender != "prezes@zeglarstwomazury.pl":
                    continue
                if incoming in recent_replies:
                    log(f"Skipped {rowid} from {sender}: it is our own AI reply")
                    continue

            if allowlist and normalized_sender not in allowlist:
                log(f"Skipped {rowid} from {sender}: not in allowlist")
                continue

            if not is_meaningful_text(incoming):
                log(f"Skipped {rowid} from {sender}: empty text")
                continue

            try:
                log(f"Incoming rowid={rowid} from {sender}: {incoming.strip()}")
                reply = generate_reply(sender, incoming.strip())
                if not reply:
                    log(f"Skipped {rowid} from {sender}: empty reply")
                    continue
                log(f"Generated rowid={rowid} to {sender}: {reply}")
                send_result = send_message(sender, reply)
                log(f"Replied to {sender} rowid={rowid} via {send_result}: {reply}")
                recent_replies.append(reply)
            except Exception as exc:
                log(f"ERROR rowid={rowid} sender={sender}: {exc}")

        if max_seen > last_rowid:
            state["last_rowid"] = max_seen
            save_state(state)

        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
