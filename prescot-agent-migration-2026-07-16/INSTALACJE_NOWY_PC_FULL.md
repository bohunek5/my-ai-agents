# Instalacje nowego PC - pelna lista

To jest pelna lista instalacji dla komputera, ktory ma budowac strony, aplikacje, PDF-y, MCP, workflow Stitch -> React/Vite/Next.js, voice bridge, Dr Karol Companion, lokalne AI i automatyzacje.

Nie wszystko jest obowiazkowe pierwszego dnia. Minimum do startu: Node.js, Git, Python, Chrome, VS Code/Cursor, Codex, npm/pnpm, Playwright, Poppler, Docker, uv, ripgrep.

## 0. Zasada migracji

- Nie kopiowac `node_modules`.
- Nie kopiowac `.env`, tokenow, auth, sekretow.
- Nie kopiowac buildow: `.next`, `dist`, `build`, `target`.
- Na nowym PC zaleznosci odtwarzac przez `npm install`, `pnpm install`, `pip install`, `uv tool run`.
- Klucze API wpisac od nowa.
- Absolutne sciezki z `/Users/karolbohdanowicz/...` poprawic pod nowy komputer.

## 1. System bazowy - macOS

Zainstaluj Command Line Tools:

```bash
xcode-select --install
```

Zainstaluj Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Podstawowe narzedzia:

```bash
brew install git gh node pnpm yarn bun python uv pipx rustup
brew install jq yq ripgrep fd fzf tree wget curl git-lfs
brew install ffmpeg imagemagick graphicsmagick poppler ghostscript pandoc
brew install sqlite sqlite-utils
brew install docker docker-compose
brew install --cask google-chrome firefox visual-studio-code cursor docker
brew install --cask github google-drive chatgpt
```

Rust/Tauri:

```bash
rustup-init
rustup update
cargo install tauri-cli
```

Opcjonalnie, ale bardzo przydatne:

```bash
brew install --cask figma postman insomnia tableplus db-browser-for-sqlite
brew install --cask lm-studio ollama
brew install --cask raycast iterm2
```

## 2. System bazowy - Windows

Uruchom PowerShell jako Administrator.

Podstawy:

```powershell
winget install Git.Git
winget install GitHub.cli
winget install OpenJS.NodeJS.LTS
winget install Python.Python.3.12
winget install Microsoft.VisualStudioCode
winget install Google.Chrome
winget install Mozilla.Firefox
winget install Docker.DockerDesktop
winget install GitHub.GitHubDesktop
winget install OpenAI.ChatGPT
```

Dev utilities:

```powershell
winget install BurntSushi.ripgrep.MSVC
winget install sharkdp.fd
winget install jqlang.jq
winget install GnuWin32.Wget
winget install 7zip.7zip
winget install ImageMagick.ImageMagick
winget install SQLite.SQLite
winget install DBBrowserForSQLite.DBBrowserForSQLite
winget install Postman.Postman
winget install Insomnia.Insomnia
```

Rust i build tools:

```powershell
winget install Rustlang.Rustup
winget install Microsoft.VisualStudio.2022.BuildTools
```

Po instalacji:

```powershell
rustup update
cargo install tauri-cli
```

Opcjonalnie:

```powershell
winget install Ollama.Ollama
winget install LMStudio.LMStudio
winget install Figma.Figma
winget install Google.GoogleDrive
```

## 3. Node.js, frontend, Vite, Next.js

Sprawdz:

```bash
node -v
npm -v
```

Globalne narzedzia:

```bash
npm install -g pnpm yarn npm-check-updates serve vercel netlify-cli
npm install -g typescript tsx vite create-vite
npm install -g playwright
```

Playwright browsers:

```bash
npx playwright install
npx playwright install-deps
```

Tworzenie Vite:

```bash
npm create vite@latest moj-projekt -- --template react-ts
cd moj-projekt
npm install
npm run dev
```

Tworzenie Next.js:

```bash
npx create-next-app@latest moj-next
cd moj-next
npm run dev
```

Biblioteki, ktore czesto beda potrzebne do stron:

```bash
npm install lucide-react framer-motion clsx class-variance-authority tailwind-merge
npm install @react-three/fiber three @react-three/drei
npm install recharts date-fns zod react-hook-form
npm install html2canvas jspdf jspdf-autotable
```

Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Shadcn/ui, jesli projekt tego chce:

```bash
npx shadcn@latest init
```

## 4. Stitch workflow

Potrzebne elementy z paczki:

```text
agent_system/agents_dotdir/skills/stitch-loop
agent_system/agents_dotdir/skills/react-components
web_and_voice_environment/stitch
agent_system/workspace_agent/agents/stitch_master.md
```

Na nowym PC trzeba miec:

- Chrome
- Node.js
- npm/pnpm
- Playwright
- Codex
- dostep do Stitch
- klucz/API dla Stitch MCP, jesli MCP ma byc aktywne

MCP Stitch jest w:

```text
mcp/mcp_config.json
agent_system/workspace_agent/.agent/mcp_config.json
```

W configu uzupelnij:

```text
UZUPELNIJ_NOWYM_KLUCZEM_STITCH_GOOGLE_API
```

Workflow:

1. Zrob design w Stitch.
2. Pobierz albo wyciagnij source/design.
3. Uzyj skilla `react-components`.
4. Wrzuc komponenty do Vite albo Next.js.
5. Odpal dev server.
6. Zweryfikuj w Chrome/Playwright/LOOK.

## 5. Codex, agenci i skille

Skopiuj:

```text
agent_system/codex/* -> ~/.codex/
agent_system/agents_dotdir/* -> ~/.agents/
agent_system/workspace_agent/.agent -> wybrany workspace
agent_system/workspace_agent/agents -> wybrany workspace
agent_system/workspace_agent/scripts -> wybrany workspace
```

Potem popraw:

```text
~/.codex/config.toml
.agent/mcp_config.json
```

Wymagane programy dla agentow:

```bash
git --version
gh --version
node -v
npm -v
python3 --version
uv --version
rg --version
```

## 6. MCP - instalacje i zaleznosci

W paczce jest config:

```text
mcp/mcp_config.json
```

Zawiera serwery:

- `stitch` - zdalny MCP przez `https://stitch.googleapis.com/mcp`
- `notebooklm` - przez `uv tool run --from notebooklm-mcp-server notebooklm-mcp`
- `GitKraken` / GitLens - wymaga poprawnej sciezki do `gk`
- `n8n` - przez `npx -y @mpiliukov/n8n-mcp`
- `google-workspace` - wymaga lokalnego proxy Gemini/Google Workspace

Instalacje bazowe dla MCP:

```bash
npm install -g npm
python -m pip install --upgrade pip
pipx install uv
```

Test NotebookLM MCP:

```bash
uv tool run --from notebooklm-mcp-server notebooklm-mcp
```

Test n8n MCP:

```bash
npx -y @mpiliukov/n8n-mcp
```

n8n lokalnie przez Docker:

```bash
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

Potem wejdz:

```text
http://localhost:5678
```

I wygeneruj nowy `N8N_API_KEY`. Nie uzywaj starego.

## 7. PDF, katalogi, raporty

Systemowe:

```bash
brew install poppler ghostscript imagemagick pandoc ffmpeg
```

Windows:

```powershell
winget install ImageMagick.ImageMagick
winget install 7zip.7zip
```

Python:

```bash
python -m pip install --upgrade pip
python -m pip install pdfplumber pypdf reportlab pymupdf pillow pandas openpyxl python-docx
python -m pip install playwright beautifulsoup4 lxml requests
```

Node PDF:

```bash
npm install jspdf jspdf-autotable pdf-lib puppeteer playwright
```

Render PDF przez Playwright:

```bash
npx playwright install chromium
```

## 8. Voice, rozmowa glosowa, glosniki

Programy:

- Chrome
- ChatGPT Desktop
- sterowniki audio systemu
- wybrany mikrofon
- wybrane wyjscie audio/glosniki
- Node.js
- Python

Z paczki:

```text
web_and_voice_environment/voice-bridge
web_and_voice_environment/dr-karol-companion
web_and_voice_environment/apps
agent_system/workspace_agent/tools/imessage_ai_agent.py
agent_system/workspace_agent/.agent/skills/ai-ultra-voice
```

Voice bridge:

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

Tauri desktop:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run tauri dev
```

Na nowym PC ustaw:

- mikrofon jako default input,
- glosniki jako default output,
- zgody mikrofonu dla Chrome/aplikacji,
- API key do glosu, jesli projekt tego wymaga,
- brak trybu oszczedzania energii na mikrofonie USB/Bluetooth.

## 9. LOOK preview

Z paczki:

```text
web_and_voice_environment/LOOK
```

Start:

```bash
cd web_and_voice_environment/LOOK
npm install
npm start
```

Albo na macOS:

```bash
./START_LOOK.command
```

Uzywac do podgladu lokalnych stron na wielu viewportach.

## 10. Dr Karol Companion

Z paczki:

```text
web_and_voice_environment/dr-karol-companion
```

Nie ma:

```text
node_modules/
src-tauri/target/
```

Odtworzenie:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run dev
```

Desktop/Tauri:

```bash
npm run tauri dev
npm run tauri build
```

Jesli Tauri krzyczy o brakach, doinstaluj Rust, Cargo, Build Tools/Xcode CLT.

## 11. Lokalne AI / LM / NotebookLM

Zainstaluj:

- ChatGPT Desktop
- LM Studio
- Ollama
- Google Drive Desktop
- Chrome

Ollama:

```bash
ollama pull llama3.1
ollama pull qwen2.5-coder
ollama pull nomic-embed-text
ollama serve
```

NotebookLM:

- zalogowac sie w Google,
- wrzucic PDF-y/materialy z paczki,
- nie przenosi sie sesji jako pliku,
- MCP `notebooklm` wymaga `uv`.

## 12. Bazy danych i dane

Zainstaluj:

- DB Browser for SQLite
- TablePlus albo DBeaver
- SQLite CLI
- Docker Desktop

Komendy:

```bash
sqlite3 --version
docker --version
docker compose version
```

Python data stack:

```bash
python -m pip install pandas numpy openpyxl xlsxwriter sqlalchemy sqlite-utils
```

## 13. Deploy, hosting, GitHub

Zainstaluj:

- Git
- GitHub CLI
- GitHub Desktop
- Vercel CLI
- Netlify CLI
- Docker Desktop

Komendy:

```bash
gh auth login
npm install -g vercel netlify-cli
vercel login
netlify login
```

Do automatycznego deployu na FTP przez GitHub Actions uzyj:

```text
GITHUB_FTP_DEPLOY_NOWY_PC.md
deployment_templates/github-actions-vite-ftp.yml
deployment_templates/github-actions-next-static-ftp.yml
deployment_templates/github-actions-static-html-ftp.yml
deployment_templates/scripts/publish-github-pages.sh
deployment_templates/scripts/init-github-repo.sh
deployment_templates/scripts/set-ftp-secrets.sh
```

Do automatycznego GitHub Pages po zrobieniu strony:

```bash
../deployment_templates/scripts/publish-github-pages.sh nazwa-repo private auto
```

Minimalny cykl:

```bash
gh auth login
mkdir -p .github/workflows
cp ../deployment_templates/github-actions-vite-ftp.yml .github/workflows/deploy.yml
../deployment_templates/scripts/init-github-repo.sh nazwa-repo private
../deployment_templates/scripts/set-ftp-secrets.sh
git add -A
git commit -m "ci: add ftp deploy"
git push origin main
```

Do HOME.PL / FTP / hostingow:

```bash
brew install lftp
```

Windows:

```powershell
winget install FileZilla.FileZilla.Client
```

## 14. Przegladarki i testy

Zainstaluj:

- Chrome
- Firefox
- Edge
- Chrome DevTools
- Lighthouse

Playwright:

```bash
npx playwright install
npx playwright test
```

Lighthouse:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## 15. Grafika i media

Przydatne:

- Figma
- Canva
- Photoshop/Adobe, jesli masz subskrypcje
- ImageMagick
- FFmpeg
- HandBrake

Komendy:

```bash
ffmpeg -version
magick -version
```

## 16. Minimalny test po instalacji

Uruchom:

```bash
node -v
npm -v
pnpm -v
python3 --version
uv --version
git --version
gh --version
rg --version
docker --version
ffmpeg -version
magick -version
```

Test Vite:

```bash
npm create vite@latest test-vite -- --template react-ts
cd test-vite
npm install
npm run dev
```

Test Next:

```bash
npx create-next-app@latest test-next
cd test-next
npm run dev
```

Test Playwright:

```bash
npx playwright install
npx playwright codegen http://localhost:3000
```

Test LOOK:

```bash
cd web_and_voice_environment/LOOK
npm install
npm start
```

Test Dr Karol:

```bash
cd web_and_voice_environment/dr-karol-companion
npm install
npm run dev
```

## 17. Checklista koncowa

- Codex dziala.
- `~/.codex/config.toml` ma poprawne sciezki.
- `~/.agents/skills` istnieje.
- `.agent/mcp_config.json` ma nowe klucze.
- Stitch MCP ma nowy API key.
- n8n dziala na `localhost:5678`.
- NotebookLM MCP startuje przez `uv`.
- Google/Drive/GitHub zalogowane od nowa.
- Vite odpala lokalny projekt.
- Next.js odpala lokalny projekt.
- Playwright ma zainstalowane przegladarki.
- PDF-y renderuja sie przez Poppler/PyMuPDF.
- Voice bridge widzi mikrofon i glosniki.
- Dr Karol Companion odpala sie bez buildow ze starego komputera.
- GitHub CLI jest zalogowany przez `gh auth login`.
- GitHub Actions FTP ma ustawione sekrety `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
- Projekt ma workflow z `deployment_templates/` w `.github/workflows/deploy.yml`.
- GitHub Pages mozna odpalic skryptem `deployment_templates/scripts/publish-github-pages.sh`.
