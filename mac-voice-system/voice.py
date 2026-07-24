#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DEFAULT_CONFIG = {
    "tts_engine": "auto",
    "tts_model": "gpt-4o-mini-tts",
    "tts_voice": "marin",
    "tts_format": "mp3",
    "tts_speed": 1.0,
    "tts_instructions": (
        "Mow po polsku naturalnie, spokojnie i konkretnie. "
        "Brzmij jak pomocny prywatny asystent, bez teatralnosci."
    ),
    "assistant_model": "gpt-4.1-mini",
    "assistant_instructions": (
        "Odpowiadaj po polsku. Badz konkretny, praktyczny i naturalny. "
        "Nie przeciagaj odpowiedzi, chyba ze uzytkownik prosi o szczegoly."
    ),
}


def load_dotenv(path):
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def load_config():
    config = dict(DEFAULT_CONFIG)
    config_path = ROOT / "voice.config.json"
    if config_path.exists():
        config.update(json.loads(config_path.read_text(encoding="utf-8")))
    return config


def api_post_json(path, payload):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("Brak OPENAI_API_KEY. Ustaw go w srodowisku albo w pliku .env.")

    request = urllib.request.Request(
        f"https://api.openai.com/v1{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API zwrocilo HTTP {exc.code}: {body}") from exc


def api_post_audio(path, payload, output_path):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("Brak OPENAI_API_KEY. Ustaw go w srodowisku albo w pliku .env.")

    request = urllib.request.Request(
        f"https://api.openai.com/v1{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            output_path.write_bytes(response.read())
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API zwrocilo HTTP {exc.code}: {body}") from exc


def mac_say(text, voice=None, rate=None):
    command = ["say"]
    if voice:
        command.extend(["-v", voice])
    if rate:
        command.extend(["-r", str(rate)])
    command.append(text)
    subprocess.run(command, check=True)


def afplay(path):
    subprocess.run(["afplay", str(path)], check=True)


def speak_openai(text, config, save_path=None):
    audio_format = config["tts_format"]
    output_path = Path(save_path) if save_path else Path(tempfile.mkstemp(suffix=f".{audio_format}")[1])
    payload = {
        "model": config["tts_model"],
        "voice": config["tts_voice"],
        "input": text,
        "response_format": audio_format,
        "speed": float(config["tts_speed"]),
    }
    instructions = config.get("tts_instructions")
    if instructions and not config["tts_model"].startswith("tts-1"):
        payload["instructions"] = instructions

    api_post_audio("/audio/speech", payload, output_path)
    afplay(output_path)
    if save_path:
        print(f"Zapisano audio: {output_path}")
    else:
        output_path.unlink(missing_ok=True)


def speak(text, config, engine=None, save_path=None):
    selected = engine or config["tts_engine"]
    if selected == "say":
        mac_say(text)
        return
    if selected == "openai":
        speak_openai(text, config, save_path)
        return
    if selected != "auto":
        raise RuntimeError(f"Nieznany silnik TTS: {selected}")

    if os.environ.get("OPENAI_API_KEY"):
        speak_openai(text, config, save_path)
    else:
        print("Brak OPENAI_API_KEY, uzywam wbudowanego macOS 'say'.", file=sys.stderr)
        mac_say(text)


def response_text(response):
    if response.get("output_text"):
        return response["output_text"]
    chunks = []
    for item in response.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in {"output_text", "text"} and content.get("text"):
                chunks.append(content["text"])
    return "\n".join(chunks).strip()


def ask(prompt, config):
    payload = {
        "model": config["assistant_model"],
        "instructions": config["assistant_instructions"],
        "input": prompt,
    }
    answer = response_text(api_post_json("/responses", payload))
    if not answer:
        raise RuntimeError("Model nie zwrocil tekstowej odpowiedzi.")
    return answer


def read_stdin_if_needed(text):
    if text:
        return " ".join(text).strip()
    if not sys.stdin.isatty():
        return sys.stdin.read().strip()
    return ""


def build_parser():
    parser = argparse.ArgumentParser(description="Lokalny system glosowy dla macOS.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    speak_parser = subparsers.add_parser("speak", help="Powiedz podany tekst przez glosniki Maca.")
    speak_parser.add_argument("text", nargs="*", help="Tekst do wypowiedzenia.")
    speak_parser.add_argument("--engine", choices=["auto", "openai", "say"], help="Silnik mowy.")
    speak_parser.add_argument("--save", help="Zapisz wygenerowane audio do pliku.")

    ask_parser = subparsers.add_parser("ask", help="Zapytaj asystenta i odczytaj odpowiedz.")
    ask_parser.add_argument("text", nargs="*", help="Pytanie dla asystenta.")
    ask_parser.add_argument("--engine", choices=["auto", "openai", "say"], help="Silnik mowy.")
    ask_parser.add_argument("--no-speak", action="store_true", help="Tylko wypisz odpowiedz.")

    subparsers.add_parser("doctor", help="Sprawdz podstawowe zaleznosci.")
    return parser


def doctor():
    checks = {
        "python": sys.version.split()[0],
        "afplay": subprocess.run(["which", "afplay"], capture_output=True, text=True).stdout.strip(),
        "say": subprocess.run(["which", "say"], capture_output=True, text=True).stdout.strip(),
        "OPENAI_API_KEY": "ustawiony" if os.environ.get("OPENAI_API_KEY") else "brak",
    }
    for key, value in checks.items():
        print(f"{key}: {value or 'brak'}")


def main():
    load_dotenv(ROOT.parent / ".env")
    load_dotenv(ROOT / ".env")
    config = load_config()
    args = build_parser().parse_args()

    if args.command == "doctor":
        doctor()
        return

    text = read_stdin_if_needed(args.text)
    if not text:
        raise SystemExit("Podaj tekst albo przekaz go przez stdin.")

    if args.command == "speak":
        speak(text, config, args.engine, args.save)
        return

    if args.command == "ask":
        answer = ask(text, config)
        print(answer)
        if not args.no_speak:
            speak(answer, config, args.engine)


if __name__ == "__main__":
    main()
