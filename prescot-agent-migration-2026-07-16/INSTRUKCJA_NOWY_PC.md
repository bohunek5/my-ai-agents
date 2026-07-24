# Instrukcja dla nowego PC

Cel: odtworzyc srodowisko do pracy z agentami, Prescot, Stitch -> Vite/Next.js, PDF, MCP, glosnikiem/rozmowa glosowa, LOOK preview oraz Dr Karol Companion.

Najpierw przeczytaj i wykonaj pelna liste instalacji:

```text
INSTALACJE_NOWY_PC_FULL.md
```

Ten plik ma szeroka checkliste programow: Node, Python, Git, Codex, VS Code/Cursor, Chrome, Playwright, Docker, Rust/Tauri, Vite, Next.js, PDF tools, MCP, n8n, NotebookLM, LM Studio/Ollama, voice bridge, LOOK, Dr Karol Companion, deploy i testy.

Do GitHuba, repo, GitHub Actions i deployu przez FTP przeczytaj tez:

```text
GITHUB_FTP_DEPLOY_NOWY_PC.md
deployment_templates/
```

Najprostszy tryb dla agenta po zrobieniu strony:

```bash
../deployment_templates/scripts/publish-github-pages.sh nazwa-repo private auto
```

To ma zrobic repo, push i GitHub Pages z terminala. Klikanie jest potrzebne tylko do pierwszego `gh auth login` albo gdy GitHub wymusi potwierdzenie uprawnien.

## 1. Co jest w paczce

- `prescot_projects/` - projekty i materialy Prescot.
- `prescot_assets/` - logo, CSV, XML i pojedyncze pliki Prescot.
- `agent_system/codex/` - konfiguracja Codexa: `config.toml`, `AGENTS.md`, `rules`, `skills`, `plugins`.
- `agent_system/agents_dotdir/` - dodatkowe skille z `~/.agents`, m.in. Stitch/react-components.
- `agent_system/workspace_agent/` - lokalne agenty, skrypty, `.agent`, MCP i narzedzia.
- `mcp/mcp_config.json` - lokalny config MCP.
- `web_and_voice_environment/` - LOOK, voice bridge, aplikacje lokalne i Dr Karol Companion.
- `deployment_templates/` - gotowe GitHub Actions dla FTP/GitHub Pages oraz skrypty repo/secrets/deploy.
- `optional_gemini_antigravity_prescot/` - przefiltrowane materialy Prescot z Gemini/Antigravity.
- `_manifests/` - lista plikow, katalogow i rozmiary.

## 2. Czego nie ma

Celowo pominiete:

- `node_modules/`
- `.next/`, `dist/`, `build/`, `target/`
- cache/temp
- `.env`, `.env.*`
- pliki z `auth`, `token`, `secret`
- klucze `.pem`, `.key`
- logi serwerow i pliki specjalne/sockety

Sekrety i logowania trzeba ustawic od nowa na nowym PC.

## 3. Bazowe programy

Pelna lista jest w:

```text
INSTALACJE_NOWY_PC_FULL.md
```

Minimum na start:

- Codex / ChatGPT Codex CLI
- Node.js LTS
- npm
- pnpm
- uv
- Python 3.11+
- Git
- GitHub CLI
- VS Code albo Cursor
- Google Chrome
- Docker Desktop
- ripgrep
- jq
- ffmpeg
- ImageMagick
- Poppler
- Playwright browsers po instalacji projektow
- Rust + Cargo, jesli bedzie budowany Dr Karol Companion jako Tauri
- Tauri prerequisites, jesli nowy PC ma budowac aplikacje desktopowe

Na macOS przydatne:

Wiecej komend macOS/Windows jest w `INSTALACJE_NOWY_PC_FULL.md`.

Na Windows najlepiej:

- Node.js LTS z oficjalnego instalatora
- Python z python.org
- Git for Windows
- Rust przez `rustup`
- Visual Studio Build Tools, jesli Tauri/Rust bedzie tego wymagac

## 4. Odtworzenie Codexa i skilli

Skopiuj:

```bash
agent_system/codex/* -> ~/.codex/
agent_system/agents_dotdir/* -> ~/.agents/
```

Potem otworz:

```bash
~/.codex/config.toml
```

I popraw stare sciezki:

```text
/Users/karolbohdanowicz/...
```

na sciezki nowego PC.

Nie kopiuj `auth.json`. Zaloguj Codexa od nowa.

## 5. MCP

Config jest tutaj:

```bash
mcp/mcp_config.json
```

oraz w:

```bash
agent_system/workspace_agent/.agent/mcp_config.json
```

Na nowym PC porownaj go ze swoim lokalnym `.agent/mcp_config.json`. Popraw absolutne sciezki i brakujace komendy.

W paczce klucze MCP sa zastapione placeholderami:

```text
UZUPELNIJ_NOWYM_KLUCZEM_STITCH_GOOGLE_API
UZUPELNIJ_NOWYM_KLUCZEM_N8N
UZUPELNIJ_SCIEZKE_DO_GITKRAKEN_GITLENS_GK
UZUPELNIJ_SCIEZKE_DO_GOOGLE_WORKSPACE_MCP_PROXY
```

Trzeba wpisac nowe wartosci na nowym PC.

Wazne: MCP zwykle psuje sie nie przez sam config, tylko przez:

- inna sciezke do projektu,
- brak Node/Python,
- brak lokalnych zaleznosci,
- brak tokenow/API keys.

## 6. Stitch -> Vite/Next.js workflow

Skille i pliki zwiazane ze Stitch sa w:

```bash
agent_system/agents_dotdir/skills/stitch-loop
agent_system/agents_dotdir/skills/react-components
web_and_voice_environment/stitch
agent_system/workspace_agent/agents/stitch_master.md
```

Typowy workflow:

1. Wygeneruj layout w Stitch.
2. Pobierz lub skopiuj design/source do workspace.
3. Uzyj skilla `react-components` do konwersji na komponenty React.
4. Dla Vite:

```bash
npm create vite@latest nazwa-projektu -- --template react-ts
cd nazwa-projektu
npm install
npm run dev
```

5. Dla Next.js:

```bash
npx create-next-app@latest nazwa-projektu
cd nazwa-projektu
npm run dev
```

6. Do podgladu wielu viewportow uzywaj LOOK:

```bash
cd web_and_voice_environment/LOOK
npm install
npm start
```

albo:

```bash
./START_LOOK.command
```

## 7. PDF

Skill PDF jest w:

```bash
agent_system/codex/skills/pdf
```

Do pracy z PDF na nowym PC przydatne:

```bash
python -m pip install pdfplumber pypdf reportlab pymupdf
```

Na macOS do renderowania:

```bash
brew install poppler
```

## 8. Polaczenia glosowe / rozmowa przez glosniki

Elementy lokalne:

```bash
web_and_voice_environment/voice-bridge
web_and_voice_environment/dr-karol-companion/conversation-server.js
web_and_voice_environment/apps/
agent_system/workspace_agent/tools/imessage_ai_agent.py
```

Po rozpakowaniu:

```bash
cd web_and_voice_environment/voice-bridge
npm install
node server.js
```

Dr Karol Companion:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run dev
```

Jezeli ma dzialac jako aplikacja desktopowa Tauri:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run tauri dev
```

Jesli glos ma mowic przez glosniki, na nowym PC trzeba osobno ustawic:

- mikrofon systemowy,
- domyslne wyjscie audio,
- zgody przegladarki/aplikacji na mikrofon,
- klucz API do modelu glosowego, jesli dany mostek go wymaga.

## 9. Dr Karol Companion

Zrodla sa w:

```bash
web_and_voice_environment/dr-karol-companion
```

Celowo nie ma:

```bash
node_modules/
src-tauri/target/
```

To sa zaleznosci/buildy. Odtwarza sie je przez:

```bash
npm install
npm run dev
```

albo dla Tauri:

```bash
npm run tauri build
```

## 10. NotebookLM / LM

Nie da sie przeniesc zalogowanej sesji NotebookLM jako pliku. Do przeniesienia masz:

- materialy Prescot,
- PDF-y,
- raporty,
- pliki `llms.txt`,
- pomocnicze skrypty `generate_llms.py` i `upload_llms.py`, jesli byly w workspace.

Na nowym PC trzeba zalogowac sie do NotebookLM/Google od nowa i wrzucic zrodla ponownie.

## 11. Po rozpakowaniu - szybki test

Sprawdz:

```bash
node -v
npm -v
python3 --version
git --version
```

Potem:

```bash
cd web_and_voice_environment/LOOK
npm install
npm start
```

I osobno:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run dev
```

## 12. Najwazniejsze poprawki po migracji

- Popraw absolutne sciezki w `~/.codex/config.toml`.
- Popraw sciezki w `.agent/mcp_config.json`.
- Zaloguj uslugi od nowa.
- Ustaw API keys w nowych `.env`, ale nie kopiuj starych sekretow.
- W kazdym projekcie odtworz zaleznosci przez `npm install`.
- Nie kopiuj `node_modules` miedzy komputerami.
- Zaloguj GitHub CLI przez `gh auth login`.
- Dla deployu FTP ustaw sekrety `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
- Do projektu skopiuj workflow z `deployment_templates/` do `.github/workflows/deploy.yml`.
- Dla GitHub Pages uzyj `deployment_templates/scripts/publish-github-pages.sh`.
