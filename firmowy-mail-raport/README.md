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

## Tryb AI

Jesli chcesz lokalna klasyfikacje tresci przez Ollama, ustaw:

```env
OLLAMA_MODEL=llama3.1:8b
```

Skrypt wysle do lokalnego Ollama tylko temat i krotki fragment tresci maila. Jesli model jest pusty albo Ollama nie dziala, raport zostanie wygenerowany bez AI.

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
