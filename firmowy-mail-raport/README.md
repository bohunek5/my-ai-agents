# Firmowy raport poczty przez IMAP

Lokalny skrypt do testowego nadzoru jednej skrzynki. Czyta poczte przez IMAP w trybie read-only, generuje tygodniowy raport HTML i PDF, niczego nie kasuje, nie przenosi i nie odpisuje.

## Start

1. Skopiuj konfiguracje:

```bash
cd /Users/karolbohdanowicz/my-ai-agents/firmowy-mail-raport
cp .env.example .env
```

2. Wpisz dane skrzynki w `.env`.

Nie wklejaj hasla na czacie. Dane zostaja lokalnie na Macu.

3. Sprawdz foldery IMAP:

```bash
python3 mail_report.py --list-folders
```

4. Uruchom raport:

```bash
python3 mail_report.py
```

5. Test bez poczty:

```bash
python3 mail_report.py --demo
```

## Co raportuje

- ile maili przyszlo i ile wyszlo,
- ile maili klientow zostalo bez odpowiedzi,
- ile maili czeka ponad 24h i ponad 48h,
- orientacyjny sredni czas odpowiedzi,
- kto odpisal i po jakim czasie,
- aktywnosc dzienna,
- najczestsze domeny klientow,
- najaktywniejszych klientow,
- potencjalne tematy: wyceny, zamowienia, reklamacje, faktury, serwis, hurt/B2B,
- potencjalne leady sprzedazowe,
- maile pilne lub problemowe,
- liste "do ogarniecia w poniedzialek",
- liste ostatnich wiadomosci do szybkiego przegladu.

## Home.pl

W `IMAP_HOST` wpisz adres serwera IMAP z Panelu Klienta home.pl. Port SSL to zwykle `993`.

Najpierw uruchom:

```bash
python3 mail_report.py --list-folders
```

Potem wpisz nazwy folderow do `.env`:

```env
MAIL_FOLDERS=INBOX
SENT_FOLDERS=Sent
```

Folder wyslanych moze miec inna nazwe, np. `Sent Items`, `Wyslane`, `Wyslane elementy` albo `Elementy wyslane`. Uzyj dokladnie tej nazwy, ktora pokazal IMAP.

## Tryb AI przez OpenAI

Codzienny plan dnia moze dodac sekcje AI do rozwiazywania spraw: co blokuje temat, jaki ruch wykonac teraz, czego brakuje i jaki tekst mozna wyslac. Jesli nie ustawisz API, skrypt sprobuje uzyc lokalnego `codex exec` z zalogowanego Codexa.

Minimalnie ustaw:

```env
OPENAI_MODEL=gpt-5.6
OPENAI_REASONING_EFFORT=medium
DAILY_MAIL_AI_MODEL=gpt-5.6
DAILY_MAIL_AI_REASONING_EFFORT=medium
```

Opcjonalnie, dla szybszego backendu API:

```env
OPENAI_API_KEY=wstaw_lokalnie_klucz_api
```

Skrypt wysyla do AI tylko metadane raportu, tematy i krotkie fragmenty wiadomosci uzyte w planie. Nie odpisuje na maile i nie modyfikuje skrzynki. Model ma zakaz ogolnikow typu "zrob follow-up"; jesli nie ma danych, ma wskazac konkretne pytanie lub sprawdzenie, ktore odblokuje sprawe.

Test bez wysylania maila:

```bash
python3 daily_action_email.py --env-file .env --days-back 2
```

Wysylka:

```bash
python3 daily_action_email.py --env-file .env --days-back 2 --send --to karol.bohdanowicz@prescot.pl
```

Awaryjnie bez AI:

```bash
python3 daily_action_email.py --env-file .env --days-back 2 --no-ai
```

Stary tryb Ollama zostaje tylko dla starszych raportow/klasyfikacji, ale dzienny plan korzysta z OpenAI API, jesli jest `OPENAI_API_KEY`.

## Raport miesieczny dla info@prescot.com.pl

Konfiguracja testowej skrzynki jest w `.env.info`. Haslo wpisz lokalnie w:

```env
IMAP_PASSWORD=WSTAW_HASLO_TUTAJ
```

Najpierw sprawdz foldery:

```bash
python3 monthly_info_report.py --env-file .env.info --list-folders
```

Potem uruchom raport za poprzedni miesiac kalendarzowy:

```bash
python3 monthly_info_report.py --env-file .env.info
```

Raport miesieczny rozdziela:

- realne watki klientow i handlowcow,
- maile bez odpowiedzi,
- czas odpowiedzi handlowca,
- konwersacje, gdzie klient odpisal po handlowcu i na czym stanely,
- oferty i wyceny wyslane do klientow,
- najaktywniejsze domeny klientow,
- tematy biznesowe,
- oddzielny raport systemow/marketplace/Shoper/Allegro/Empik z zamowieniami, problemami i alertami.
