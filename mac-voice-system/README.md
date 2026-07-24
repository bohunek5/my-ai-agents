# Mac Voice System

Prosty lokalny system glosowy dla macOS. Moze uzywac neural TTS z OpenAI i odtwarzac wynik przez glosniki Maca przez `afplay`. Bez klucza API przechodzi na wbudowane `say`.

## Start

```bash
cd /Users/karolbohdanowicz/my-ai-agents/mac-voice-system
python3 voice.py doctor
python3 voice.py speak "Czesc Karol, system glosowy dziala."
```

Jesli masz `OPENAI_API_KEY` w `/Users/karolbohdanowicz/my-ai-agents/.env` albo w srodowisku, uzyje lepszego glosu OpenAI. Jesli nie, uzyje glosu macOS.

## Asystent, ktory odpowiada i mowi

```bash
python3 voice.py ask "Powiedz mi krotko, co mam dzisiaj zrobic priorytetowo."
```

Tylko tekst, bez mowienia:

```bash
python3 voice.py ask --no-speak "Napisz jednozdaniowe przypomnienie."
```

## Zapis audio

```bash
python3 voice.py speak "To zapisze sie jako mp3." --save test.mp3
```

## iMessage na glos

Watcher startuje od aktualnej chwili i czyta tylko nowe przychodzace wiadomosci:

```bash
python3 imessage_voice.py
```

Przeczytaj ostatnia przychodzaca wiadomosc testowo:

```bash
python3 imessage_voice.py --replay-last 1
```

Bez wysylania tresci wiadomosci do AI po sugestie:

```bash
python3 imessage_voice.py --no-ai
```

Jesli macOS odmowi dostepu do `~/Library/Messages/chat.db`, dodaj Terminal albo aplikacje, z ktorej uruchamiasz skrypt, w:

`System Settings -> Privacy & Security -> Full Disk Access`

## Konfiguracja glosu

Edytuj `voice.config.json`.

Najwazniejsze pola:

- `tts_voice`: np. `marin`, `cedar`, `alloy`, `coral`, `onyx`, `nova`, `sage`, `shimmer`
- `tts_speed`: tempo, np. `0.9`, `1.0`, `1.15`
- `tts_instructions`: styl mowienia
- `assistant_model`: model do odpowiedzi tekstowych

OpenAI Speech API generuje audio z tekstu przez `POST /v1/audio/speech`; dokumentacja wymienia m.in. model `gpt-4o-mini-tts`, glosy wbudowane i formaty `mp3`, `wav`, `aac`, `opus`, `flac`, `pcm`.
