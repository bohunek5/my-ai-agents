#!/usr/bin/env python3
import argparse
import os
import re
import sqlite3
import sys
import time
from pathlib import Path

import voice


ROOT = Path(__file__).resolve().parent
MESSAGES_DB = Path.home() / "Library" / "Messages" / "chat.db"


def connect_messages_db():
    if not MESSAGES_DB.exists():
        raise RuntimeError(f"Nie znaleziono bazy Messages: {MESSAGES_DB}")
    return sqlite3.connect(f"file:{MESSAGES_DB}?mode=ro", uri=True, timeout=5)


def newest_message_id():
    with connect_messages_db() as conn:
        row = conn.execute("select coalesce(max(ROWID), 0) from message").fetchone()
        return int(row[0] or 0)


def incoming_after(last_rowid):
    query = """
        select
            m.ROWID,
            coalesce(nullif(m.text, ''), '[wiadomosc bez tekstu]') as text,
            coalesce(h.id, 'nieznany nadawca') as sender,
            coalesce(m.service, 'Messages') as service
        from message m
        left join handle h on h.ROWID = m.handle_id
        where m.ROWID > ?
          and m.is_from_me = 0
        order by m.ROWID asc
    """
    with connect_messages_db() as conn:
        conn.row_factory = sqlite3.Row
        return [dict(row) for row in conn.execute(query, (last_rowid,))]


def clean_message(text):
    text = re.sub(r"\s+", " ", text or "").strip()
    return text if text else "[wiadomosc bez tekstu]"


def friendly_sender(sender):
    if not sender:
        return "nieznany nadawca"
    if "@" in sender:
        return sender
    digits = re.sub(r"\D", "", sender)
    if len(digits) >= 7:
        return "numer " + " ".join(digits[-9:])
    return sender


def fallback_suggestion(message):
    lowered = message.lower()
    if "?" in message:
        return "Moja sugestia: odpisz krotko i konkretnie, ze sprawdzisz i dasz znac."
    if any(word in lowered for word in ["pilne", "asap", "teraz", "zaraz"]):
        return "Moja sugestia: odpisz, ze widzisz temat i zaraz reagujesz."
    if any(word in lowered for word in ["dzieki", "dziękuję", "thx", "thanks"]):
        return "Moja sugestia: odpisz po prostu: jasne, nie ma sprawy."
    return "Moja sugestia: odpisz neutralnie: okej, dzieki za info."


def ai_suggestion(sender, message, config):
    prompt = (
        "Dostalem nowa wiadomosc iMessage.\n"
        f"Nadawca: {sender}\n"
        f"Tresc: {message}\n\n"
        "Zaproponuj jedna krotka odpowiedz po polsku. "
        "Nie tlumacz. Zacznij od tekstu odpowiedzi, maksymalnie dwa zdania."
    )
    try:
        return voice.ask(prompt, config)
    except Exception as exc:
        print(f"Nie udalo sie wygenerowac sugestii AI: {exc}", file=sys.stderr)
        return fallback_suggestion(message)


def announce_message(item, config, engine, use_ai):
    sender = friendly_sender(item["sender"])
    message = clean_message(item["text"])
    if message == "[wiadomosc bez tekstu]":
        spoken_message = "wyslal wiadomosc bez tekstu albo zalacznik"
    else:
        spoken_message = message

    if use_ai and os.environ.get("OPENAI_API_KEY"):
        suggestion = ai_suggestion(sender, message, config)
        speech = f"Nowa wiadomosc od {sender}. {spoken_message}. Sugeruje odpisac: {suggestion}"
    else:
        suggestion = fallback_suggestion(message)
        speech = f"Nowa wiadomosc od {sender}. {spoken_message}. {suggestion}"

    print(f"[{item['ROWID']}] {sender}: {message}")
    print(f"Suggestion: {suggestion}")
    voice.speak(speech, config, engine=engine)


def build_parser():
    parser = argparse.ArgumentParser(description="Czytaj nowe iMessage na glos.")
    parser.add_argument("--interval", type=float, default=2.0, help="Co ile sekund sprawdzac wiadomosci.")
    parser.add_argument("--replay-last", type=int, default=0, help="Na starcie przeczytaj ostatnie N wiadomosci.")
    parser.add_argument("--engine", choices=["auto", "openai", "say"], help="Silnik mowy.")
    parser.add_argument("--no-ai", action="store_true", help="Nie wysylaj tresci do AI po sugestie odpowiedzi.")
    return parser


def main():
    voice.load_dotenv(ROOT.parent / ".env")
    voice.load_dotenv(ROOT / ".env")
    config = voice.load_config()
    args = build_parser().parse_args()

    current = newest_message_id()
    last_rowid = max(0, current - args.replay_last) if args.replay_last else current
    print("iMessage voice watcher dziala.")
    print(f"Startuje od ROWID {last_rowid}. Ctrl+C zatrzymuje.")
    print("Sugestie AI:", "wlaczone" if os.environ.get("OPENAI_API_KEY") and not args.no_ai else "fallback lokalny")

    try:
        while True:
            for item in incoming_after(last_rowid):
                last_rowid = max(last_rowid, int(item["ROWID"]))
                announce_message(item, config, args.engine, use_ai=not args.no_ai)
            time.sleep(args.interval)
    except KeyboardInterrupt:
        print("\nZatrzymano iMessage voice watcher.")


if __name__ == "__main__":
    main()
