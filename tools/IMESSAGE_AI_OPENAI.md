# AI iMessage Agent przez OpenAI

Ten agent czyta nowe iMessage/SMS z lokalnej bazy macOS Messages i odpisuje tylko kontaktom z allowlisty, jesli allowlista istnieje.

## 1. Konfiguracja modelu

Utworz plik:

```bash
mkdir -p "$HOME/Library/Application Support/iMessageAIAgent"
nano "$HOME/Library/Application Support/iMessageAIAgent/.env"
```

Minimalnie wystarczy konfiguracja kanalu sterowania:

```env
IMESSAGE_AI_MODEL=gpt-5.6
IMESSAGE_AI_REASONING_EFFORT=medium
IMESSAGE_AI_CONTEXT_LIMIT=30
IMESSAGE_AI_PROMPT_CONTEXT_MESSAGES=30
IMESSAGE_AI_MAX_REPLY_CHARS=280
IMESSAGE_AI_CONTROL_PHONE=603045005
IMESSAGE_AI_CONTROL_EMAIL=prezes@zeglarstwomazury.pl
IMESSAGE_AI_CONTROL_REPLY_TARGET=603045005
IMESSAGE_AI_CONTROL_REPLY_FROM_EMAIL=prezes@zeglarstwomazury.pl
```

`OPENAI_API_KEY` nie jest wymagany, jesli na Macu dziala lokalny `codex exec` z Twoim zalogowanym kontem. Agent uzyje wtedy fallbacku Codex CLI.

Opcjonalnie, jesli chcesz szybsze i tansze w utrzymaniu odpowiedzi przez API, dopisz lokalnie:

```env
OPENAI_API_KEY=wstaw_lokalnie_klucz_api
```

Nie wpisuj klucza API do repo.

## 2. Allowlista

Jesli chcesz ograniczyc automatyczne odpowiedzi do konkretnych osob:

```bash
nano "$HOME/Library/Application Support/iMessageAIAgent/allowlist.txt"
```

Jedna osoba na linie, np.:

```text
+48123123123
prezes@zeglarstwomazury.pl
```

Jesli pliku nie ma albo jest pusty, agent zachowa dotychczasowy tryb i moze reagowac szerzej.

## 3. Start/stop

```bash
tools/toggle_imessage_ai_agent.sh on
tools/toggle_imessage_ai_agent.sh off
tools/toggle_imessage_ai_agent.sh status
```

Ikona korzysta z tego samego skryptu.

## 4. Jak agent odpowiada

- uzywa OpenAI Responses API,
- bierze pod uwage kilka poprzednich wiadomosci z danego kontaktu,
- pisze krotko i po polsku,
- nie wymysla faktow, cen ani terminow,
- nie odpisuje na kody, hasla, BLIK, banki i tematy wymagajace osobistej decyzji,
- gdy model uzna temat za ryzykowny, zwraca `NIE_ODPISUJ`, a skrypt nic nie wysyla.

## 5. Kanał sterowania Karola

Wiadomosci z numeru `IMESSAGE_AI_CONTROL_PHONE` albo wlasne wiadomosci do `IMESSAGE_AI_CONTROL_EMAIL` nie ida przez zwykle auto-odpisywanie. To jest kanal sterowania agentem. Odpowiedz kontrolna idzie do `IMESSAGE_AI_CONTROL_REPLY_TARGET`, ale agent probuje wyslac ja przez konto iMessage `IMESSAGE_AI_CONTROL_REPLY_FROM_EMAIL`, zeby na telefonie wygladala jak wiadomosc od tego konta.

Komendy:

```text
status
log
cmd: git status --short
codex: zrob landing page w projekcie X i odpal preview
stop
```

Dłuższa wiadomosc bez prefiksu nie uruchamia Codexa domyslnie. Zadanie rusza po `codex:`, `zrob:` / `zrób:` albo po jasnej komendzie zaczynajacej sie np. od `napraw`, `odpal`, `wrzuc`, `stworz`, `sprawdz`, `dodaj`, `popraw`. Jesli mimo wszystko chcesz tryb "kazda dluzsza wiadomosc to zadanie", ustaw `IMESSAGE_AI_CONTROL_DEFAULT_TO_CODEX=1`.

Po starcie agent wysyla na `IMESSAGE_AI_CONTROL_REPLY_TARGET` wiadomosc:

```text
Karol, czuwam nad Twoimi wiadomościami i będę odpisywał za Ciebie.
```

Status:

- zielony / `on` oznacza, ze proces dziala,
- czerwony / `off` oznacza, ze proces nie dziala,
- plik stanu: `~/Library/Application Support/iMessageAIAgent/status`.

## 6. Opcjonalny fallback Ollama

Domyslnie wylaczony. Jesli naprawde chcesz awaryjny lokalny fallback:

```env
IMESSAGE_AI_ALLOW_OLLAMA_FALLBACK=1
OLLAMA_URL=http://127.0.0.1:11434/api/chat
OLLAMA_MODEL=message-reply-local
```
