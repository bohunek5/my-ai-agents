# GitHub + Actions + FTP deploy

Cel: nowy PC ma umiec zrobic repo na GitHubie, wypchnac projekt i ustawic automatyczny deploy strony przez GitHub Actions na FTP.

## 1. Instalacje

Minimum:

```bash
git --version
gh --version
node -v
npm -v
```

macOS:

```bash
brew install git gh node
```

Windows:

```powershell
winget install Git.Git
winget install GitHub.cli
winget install OpenJS.NodeJS.LTS
```

Logowanie:

```bash
gh auth login
gh auth status
```

## 2. Szablony w paczce

```text
deployment_templates/github-actions-vite-ftp.yml
deployment_templates/github-actions-next-static-ftp.yml
deployment_templates/github-actions-static-html-ftp.yml
deployment_templates/github-pages-vite.yml
deployment_templates/github-pages-next-static.yml
deployment_templates/github-pages-static-html.yml
deployment_templates/next.config.static-export.example.mjs
deployment_templates/scripts/init-github-repo.sh
deployment_templates/scripts/set-ftp-secrets.sh
deployment_templates/scripts/publish-github-pages.sh
deployment_templates/scripts/deploy-ftp-once.py
```

## 2A. Najprostsza komenda: GitHub + Pages

W gotowym projekcie wejdz do katalogu projektu i uruchom:

```bash
../deployment_templates/scripts/publish-github-pages.sh nazwa-repo private auto
```

Parametry:

```text
nazwa-repo     - nazwa repo na GitHubie
private/public - widocznosc repo
auto           - wykryj Vite/Next/static automatycznie
```

Przyklady:

```bash
../deployment_templates/scripts/publish-github-pages.sh strona-klienta private auto
../deployment_templates/scripts/publish-github-pages.sh landing-publiczny public vite
../deployment_templates/scripts/publish-github-pages.sh next-export private next
```

Skrypt robi:

1. dodaje `.github/workflows/pages.yml`,
2. tworzy `.gitignore`, jesli go nie ma,
3. robi `git init`,
4. robi commit,
5. tworzy repo przez `gh repo create`,
6. robi `git push`,
7. probuje wlaczyc GitHub Pages przez API.

Klikanie moze byc potrzebne tylko przy pierwszym `gh auth login`, 2FA albo gdy GitHub wymaga recznego potwierdzenia uprawnien Pages.

## 3. Vite -> GitHub -> FTP

```bash
npm create vite@latest moja-strona -- --template react-ts
cd moja-strona
npm install
npm run build
mkdir -p .github/workflows
cp ../deployment_templates/github-actions-vite-ftp.yml .github/workflows/deploy.yml
../deployment_templates/scripts/init-github-repo.sh moja-strona private
../deployment_templates/scripts/set-ftp-secrets.sh
git add -A
git commit -m "ci: add ftp deploy"
git push origin main
```

Po pushu GitHub Actions zbuduje `dist/` i wrzuci na FTP.

## 4. Next.js static export -> GitHub -> FTP

```bash
npx create-next-app@latest moja-strona-next
cd moja-strona-next
cp ../deployment_templates/next.config.static-export.example.mjs ./next.config.mjs
npm run build
mkdir -p .github/workflows
cp ../deployment_templates/github-actions-next-static-ftp.yml .github/workflows/deploy.yml
../deployment_templates/scripts/init-github-repo.sh moja-strona-next private
../deployment_templates/scripts/set-ftp-secrets.sh
git add -A
git commit -m "ci: add ftp deploy"
git push origin main
```

Po buildzie Next static export musi miec katalog:

```text
out/
```

## 5. Zwykly HTML/CSS/JS -> GitHub -> FTP

```bash
mkdir -p .github/workflows
cp ../deployment_templates/github-actions-static-html-ftp.yml .github/workflows/deploy.yml
../deployment_templates/scripts/init-github-repo.sh moja-strona-html private
../deployment_templates/scripts/set-ftp-secrets.sh
git add -A
git commit -m "ci: add static ftp deploy"
git push origin main
```

## 6. GitHub Secrets

Workflow FTP uzywa:

```text
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
FTP_SERVER_DIR
```

Skrypt:

```bash
deployment_templates/scripts/set-ftp-secrets.sh
```

Albo recznie:

```bash
gh secret set FTP_SERVER -b "twoj-host"
gh secret set FTP_USERNAME -b "twoj-login"
gh secret set FTP_PASSWORD -b "twoje-haslo"
gh secret set FTP_SERVER_DIR -b "/public_html/twojadomena.pl/"
```

Nie zapisuj FTP loginow w repo. Tylko GitHub Secrets.

## 7. Szybki cykl pracy

Po ustawieniu repo i workflow:

```bash
npm run build
git add -A
git commit -m "update: opis zmiany"
git push origin main
```

GitHub Actions:

1. pobiera kod,
2. instaluje zaleznosci,
3. buduje strone,
4. wrzuca wynik na FTP.

## 8. Deploy reczny bez GitHub Actions

```bash
export FTP_SERVER="host"
export FTP_USERNAME="login"
export FTP_PASSWORD="haslo"
export FTP_SERVER_DIR="/public_html/twojadomena.pl/"
export LOCAL_DIR="dist"
python3 deployment_templates/scripts/deploy-ftp-once.py
```

Dla Next:

```bash
export LOCAL_DIR="out"
python3 deployment_templates/scripts/deploy-ftp-once.py
```

## 9. GitHub Pages zamiast FTP

Vite:

```bash
mkdir -p .github/workflows
cp ../deployment_templates/github-pages-vite.yml .github/workflows/pages.yml
git add -A
git commit -m "ci: add github pages deploy"
git push origin main
```

Next static export:

```bash
mkdir -p .github/workflows
cp ../deployment_templates/github-pages-next-static.yml .github/workflows/pages.yml
git add -A
git commit -m "ci: add github pages deploy"
git push origin main
```

W repo wlacz Pages:

```text
Settings -> Pages -> Source -> GitHub Actions
```

Skrypt `publish-github-pages.sh` probuje zrobic to automatycznie. Reczne klikniecie jest fallbackiem, kiedy token GitHub CLI nie ma wymaganych uprawnien.

## 10. Problemy

- `gh: command not found` - zainstaluj GitHub CLI.
- `gh auth status` nie dziala - zrob `gh auth login`.
- `npm ci` pada - upewnij sie, ze jest `package-lock.json`; ewentualnie zmien workflow na `npm install`.
- Vite nie wrzuca obrazkow - statyczne pliki trzymaj w `public/`.
- Next nie tworzy `out/` - dodaj `output: "export"` w `next.config.mjs`.
- FTP wrzuca w zle miejsce - popraw `FTP_SERVER_DIR`.
- Haslo FTP nie dziala - wygeneruj nowe haslo/uzytkownika w panelu hostingu i ustaw sekret ponownie.
- Strona dziala lokalnie, ale nie na hostingu - sprawdz sciezki absolutne, base path, routing SPA i `.htaccess`.

## 11. Prompt dla agenta

```text
Utworz repo GitHub dla tego projektu, dodaj GitHub Actions FTP deploy, ustaw workflow dla Vite/Next/static zgodnie z deployment_templates, wypchnij na main i powiedz mi, jakie sekrety FTP mam uzupelnic albo ustaw je przez gh secret set.
```
