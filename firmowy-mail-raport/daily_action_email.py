#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import os
import re
import smtplib
import socket
import ssl
import sys
from email.message import EmailMessage
from pathlib import Path

from weekly_action_report import IGNORE_PATTERNS, filter_ignored, row_for_thread
from monthly_info_report import ROOT, build_analysis, fetch_mail_range, load_monthly_config

sys.path.insert(0, str(ROOT.parent / "tools"))
from ai_brain import AIError, AIUnavailable, generate_json


REPORT_TITLE = "Plan dnia z poczty firmowej"
DEFAULT_RECIPIENT = "karol.bohdanowicz@prescot.pl"


SERVICE_PATTERNS = [
    "plan dnia prescot",
    "raport dzienny",
    "plan dnia z poczty firmowej",
    "workspace-noreply@google.com",
    "google workspace",
    "hasło do konta google",
    "haslo do konta google",
    "mailer-daemon",
    "delivery status notification",
]

SIGNATURE_MARKERS = [
    "--",
    "-- karol bohdanowicz",
    "-- kinga bohdanowicz",
    "-- adam garbowski",
    "-- dariusz nita",
    "karol bohdanowicz",
    "kinga bohdanowicz",
    "adam garbowski",
    "dariusz nita",
    "karol bohdanowicz b2b/b2c",
    "kinga bohdanowicz b2b/b2c",
    "dział handlowy",
    "dzial handlowy",
    "prescot sp. z o.o.",
    "qr opinia google",
    "opinia google",
    "dziękujemy, że jesteś z nami",
    "dziekujemy, ze jestes z nami",
    "oceń nas w 5 sekund",
    "ocen nas w 5 sekund",
    "sch arfer insert",
]

REPLY_MARKERS = [
    r"\bw dniu\s+\d{1,2}[./-]\d{1,2}[./-]\d{2,4}.*?pisze:",
    r"\bon .*? wrote:",
    r"\bfrom:\s.*?\bsubject:",
    r"-{2,}\s*original message\s*-{2,}",
]


def parse_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def report_range(days_back: int, today: dt.date | None = None) -> tuple[dt.date, dt.date]:
    today = today or dt.date.today()
    return today - dt.timedelta(days=days_back), today + dt.timedelta(days=1)


def safe(value: str, limit: int = 220) -> str:
    text = " ".join(str(value or "").split())
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def normalize_for_match(value: str) -> str:
    return " ".join(str(value or "").lower().split())


def strip_html(value: str) -> str:
    text = html.unescape(str(value or ""))
    text = re.sub(r"(?is)<(script|style).*?</\1>", " ", text)
    text = re.sub(r"(?is)<br\s*/?>", "\n", text)
    text = re.sub(r"(?is)</p\s*>", "\n", text)
    text = re.sub(r"(?is)<[^>]+>", " ", text)
    return text


def first_meaningful_text(value: str) -> str:
    text = strip_html(value)
    text = text.replace("\x00", " ").replace("\ufffc", " ")
    text = re.sub(r"\r\n?", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)

    low = text.lower()
    cut_positions = []
    for marker in SIGNATURE_MARKERS:
        idx = low.find(marker)
        if idx >= 0:
            cut_positions.append(idx)
    for pattern in REPLY_MARKERS:
        match = re.search(pattern, low, flags=re.IGNORECASE | re.DOTALL)
        if match:
            cut_positions.append(match.start())
    if cut_positions:
        text = text[: min(cut_positions)]

    lines = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line in {"--", "---"}:
            break
        if line.startswith(">"):
            continue
        low_line = line.lower()
        if any(marker in low_line for marker in SIGNATURE_MARKERS):
            break
        if low_line.startswith(("tel:", "nip:", "regon:", "krs:")):
            continue
        lines.append(line)

    cleaned = " ".join(lines)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def is_service_item(item) -> bool:
    text = normalize_for_match(f"{item.sender_email} {item.sender_name} {item.subject} {item.snippet}")
    if any(pattern in text for pattern in SERVICE_PATTERNS):
        return True
    subject = normalize_for_match(item.subject)
    if subject.startswith(("test", "automatic reply", "undelivered mail")):
        return True
    return False


def daily_categories(subject: str, snippet: str, direction: str = "") -> list[str]:
    text = normalize_for_match(f"{subject} {snippet}")
    categories = []
    rules = [
        ("reklamacja", ["reklamac", "uszkodz", "nie dziala", "nie działa", "zwrot", "gwarancj"]),
        ("faktura", ["faktur", "proforma", "płat", "plat", "korekt", "przelew"]),
        ("zamowienie", ["zamów", "zamow", "wysył", "wysyl", "kurier", "dostaw", "dpd", "list przewoz"]),
        ("wycena", ["wycen", "ofert", "cena", "cennik", "rabat", "dostęp", "dostep"]),
        ("produkt/dane", ["ce ", "deklarac", "etykiet", "karta", "pdf", "zdjec", "zdję", "opis", "system", "b2b", "neta", "badanie", "pomiar"]),
        ("marketing", ["post", "grafik", "facebook", "instagram", "ip 68", "ip68"]),
        ("techniczne", ["blad", "błąd", "wyskakuje", "problem", "nie działa", "nie dziala"]),
    ]
    for name, words in rules:
        if any(word in text for word in words):
            categories.append(name)
    if not categories and direction == "wyslany":
        categories.append("robocze")
    return categories or ["robocze"]


def prepare_daily_items(items: list) -> tuple[list, list]:
    kept = []
    ignored = []
    seen = set()
    for item in items:
        original = item.snippet or ""
        cleaned = first_meaningful_text(original)
        if cleaned:
            item.snippet = cleaned
        else:
            item.snippet = ""
        item.categories = daily_categories(item.subject, item.snippet, item.direction)

        key = (item.sender_email, item.subject, item.snippet[:120], item.date.replace(second=0, microsecond=0))
        if key in seen:
            ignored.append(item)
            continue
        seen.add(key)

        if is_service_item(item):
            ignored.append(item)
            continue
        kept.append(item)
    return kept, ignored


def item_text(item) -> str:
    return f"{item.sender_email} {item.sender_name} {item.subject} {item.snippet}".lower()


def internal_items(items: list) -> list:
    noise = [
        "allegro",
        "emag",
        "emagro",
        "empik",
        "shoper",
        "idosell",
        "wordpress",
        "newsletter",
        "dpd",
        "adobe",
        "corel",
        "wetransfer",
    ]
    out = []
    for item in items:
        text = item_text(item)
        sender = (item.sender_email or "").lower()
        recipients = " ".join(item.recipients).lower()
        is_company = sender.endswith("@prescot.pl") or sender.endswith("@prescot.com.pl") or "@prescot.pl" in recipients or "@prescot.com.pl" in recipients
        if is_company and not any(n in text for n in noise):
            out.append(item)
    return out


def owner_hint(thread: dict) -> str:
    value = thread.get("salesperson") or ""
    return value if value and value != "-" else "Karol / do ustalenia"


def status_class(text: str) -> str:
    low = text.lower()
    if "pilne" in low or "zaleg" in low or "bez odpowiedzi" in low:
        return "prio"
    if "czeka" in low or "status" in low:
        return "wait"
    return "todo"


def ai_advice(subject: str, snippet: str = "", status: str = "", sender: str = "") -> str:
    text = f"{subject} {snippet} {status} {sender}".lower()

    if "profile prescot led" in text or ("profil" in text and ("wymiar" in text or "rysunk" in text)):
        return "Odblokować dane profili: zapytać Krzyśka/producenta o rysunki wymiarowe, a jeśli ich nie ma, zrobić pomiar suwmiarką i arkusz/katalog z wymiarami do projektów."
    if "zdjec" in text or "zdję" in text or "opisy" in text or "dodaj do neta" in text or "dodaj do b2b" in text:
        return "To jest zadanie produktowe: przygotować zdjęcia, opisy i dane techniczne dla wskazanych pozycji, wrzucić do systemu/B2B i odpisać listą gotowych indeksów albo linków."
    if "andrew" in text and ("photo" in text or "power distributor" in text):
        return "Czeka materiał od Andrew: wyślij mu krótką listę modeli power distributorów, poproś o zdjęcia packshot + detale złącz, po otrzymaniu dopiąć karty produktu."
    if re.search(r"\bce\b", text) or "deklarac" in text or "pr-mad" in text or "pr-xxmad" in text:
        return "Przygotować komplet CE: model, wariant 12/24V, dane zasilania, producent/importer, normy i gotowy PDF. Jeśli czegoś brakuje, pytanie blokujące brzmi: który dokładnie wariant i jaka partia idzie do odprawy?"
    if "etykiet" in text or "chin" in text or "kod kres" in text:
        return "Zrobić plik etykiet: indeks, nazwa handlowa, EAN, ilość, język PL/EN i wersja do wysłania do Chin. Wynik końcowy to gotowy arkusz/PDF, nie kolejny mail."
    if "badanie" in text or "pomiar" in text or "stabilizac" in text:
        return "Odblokować dokumenty badań: znaleźć PDFy, nazwać je po indeksach i odesłać Dariuszowi paczkę/link. Jeśli PDFów nie ma, odpisać wprost, gdzie są dane źródłowe."
    if "tim s.a." in text or "weryfikacja cen" in text:
        return "To jest decyzja cenowa: potwierdzić, czy spadek cen był celowy. Jeśli produkty są wycofane lub do wyczerpania, odpisać TIM: produkty wycofane u nas, cena nie jest aktywną promocją."
    if "post" in text or "ip 68" in text or "ip68" in text or "facebook" in text or "instagram" in text:
        return "Zadanie marketingowe: poprawić copy/grafikę, dopilnować oznaczenia IP i wysłać finalny wariant do akceptu. Nie analizować LED, tylko domknąć materiał publikacyjny."
    if "wyskakuje" in text or "błąd" in text or "blad" in text:
        return "To jest błąd do reprodukcji: poproś o screen, miejsce wystąpienia i kroki. Potem sprawdzić konto/uprawnienia albo system, zamiast zgadywać po samym opisie."
    if any(word in text for word in ["reklamac", "uszkodz", "brak", "nie działa", "problem", "zwrot"]):
        return "Rozwiąż jak reklamację: sprawdź numer zamówienia i produkt, poproś od razu o zdjęcie/film, numer partii i opis montażu. Gotowy tekst: \"Podeślij proszę zdjęcie produktu, zasilacza i miejsca montażu oraz numer zamówienia, wtedy od razu wskażemy rozwiązanie.\""
    if any(word in text for word in ["ofert", "wycen", "cennik", "rabat", "termin", "dostęp", "dostep"]):
        return "Traktuj jak niedokończoną sprzedaż: ustal produkt, ilość, termin, rabat i dostępność. Jeśli brakuje danych, odeślij krótką listę pytań zamiast ogólnego przypomnienia."
    if any(word in text for word in ["faktur", "proforma", "płat", "plat", "korekt"]):
        return "Nie odpowiadaj z pamięci. Sprawdź numer dokumentu, kwotę, NIP i status płatności; potem odpisz konkretem: opłacone / do korekty / czekamy na przelew."
    if any(word in text for word in ["zamów", "zamow", "wysył", "wysyl", "kurier", "dostaw", "dpd"]):
        return "Najpierw znajdź zamówienie i list przewozowy. Klient ma dostać status, termin i następny ruch: wysłane / pakujemy / brakuje produktu / trzeba zamienić wariant."
    if any(word in text for word in ["klus", "profil", "osłon", "oslona", "akcesori"]):
        return "Rozbij temat na komplet: profil, osłona, zaślepki, uchwyty, taśma, zasilacz. Przy KLUŚ sprawdź indeksy, bo jeden brakujący element psuje całą realizację."
    if any(word in text for word in ["taśm", "tasm", "led", "barwa", "kelvin", "zasilacz"]):
        return "Dobierz rozwiązanie, nie sam symbol: zastosowanie, metry, barwa, moc na metr, IP, miejsce zasilacza i zapas mocy. Jeśli brakuje jednego z tych pól, poproś dokładnie o to."
    if "zaleg" in text or "bez pierwszej odpowiedzi" in text or "bez odpowiedzi" in text:
        return "Zaległość zamknij decyzją: albo gotowa odpowiedź, albo telefon, albo jedno pytanie blokujące. Nie wpisuj 'wrócę do tematu' bez konkretnego terminu."
    if "klient odpisał" in text or "do reakcji" in text:
        return "Klient wykonał ruch, więc odpisz ruchem domykającym: decyzja, komplet pytań blokujących albo konkretny termin realizacji. Jedna wiadomość ma przesunąć sprawę dalej."
    if "rados" in text or "narwojsz" in text:
        return "Zamień roboczą rozmowę w zadanie: co robimy, kto bierze temat, do kiedy i jaki plik/link/dowód kończy sprawę."
    if sender.endswith("@prescot.pl") or sender.endswith("@prescot.com.pl"):
        return "Wewnętrzne: zdecyduj, czy to informacja, blokada czy zadanie. Jeśli zadanie, przypisz osobę i wynik końcowy, nie tylko temat do pamiętania."
    return "Wyciągnij blokadę: czego nie wiemy, kto to wie i jaką jedną wiadomość trzeba wysłać, żeby sprawa ruszyła dzisiaj."


def thread_action(thread: dict, kind: str, end_exclusive: dt.date) -> dict[str, str]:
    row = row_for_thread(thread, end_exclusive)
    subject = row["temat"]
    snippet = safe(row["ostatni_fragment"], 260)
    if kind == "client_replied":
        next_step = "Klient odpisał po naszej odpowiedzi. Otworzyć wątek i wykonać kolejny ruch: odpowiedź, decyzja albo przekazanie dalej."
        status = "Do reakcji"
    elif kind == "stale":
        next_step = "Wątek ma długi czas bez pierwszej odpowiedzi. Znaleźć ostatnie pytanie klienta; jeśli go nie ma, wysłać krótką wiadomość z decyzją albo jednym pytaniem blokującym."
        status = "Zaległe"
    elif kind == "offer":
        next_step = "Rozstrzygnąć ofertę: wysłać brakujące dane, domknąć wycenę, zapytać o decyzję albo oznaczyć wynik."
        status = "Oferta / decyzja"
    else:
        next_step = "Ustalić blokadę: brak danych, brak decyzji czy tylko informacja. Potem wysłać jedną wiadomość, która zamknie ten brak."
        status = "Do odblokowania"
    return {
        "date": row["ostatnia_data"],
        "owner": owner_hint(thread),
        "subject": subject,
        "snippet": snippet,
        "next_step": next_step,
        "status": status,
        "ai_advice": ai_advice(subject, snippet, status),
    }


def real_offer_threads(threads: list[dict]) -> list[dict]:
    out = []
    offer_words = ["ofert", "wycen", "cennik", "rabat", "dostęp", "dostep", "quote", "pricing"]
    for thread in threads:
        subject = normalize_for_match(thread["last"].subject)
        snippet = normalize_for_match(thread["last"].snippet)
        cats = set(thread.get("categories") or [])
        if "wycena" in cats or any(word in f"{subject} {snippet}" for word in offer_words):
            out.append(thread)
    return out


def priority_key(subject: str) -> str:
    value = normalize_for_match(subject)
    previous = None
    while previous != value:
        previous = value
        value = re.sub(r"^(re|fw|fwd|odp)\s*:\s*", "", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def action_family(advice: str) -> str:
    low = normalize_for_match(advice)
    if "komplet ce" in low:
        return "ce"
    if "dokumenty badań" in low or "dokumenty badan" in low:
        return "badania"
    if "zadanie produktowe" in low:
        return "produkty"
    if "power distributor" in low:
        return "andrew-power-distributor"
    if "decyzja cenowa" in low:
        return "tim-ceny"
    if "plik etykiet" in low:
        return "etykiety"
    return low[:90]


def extract_indexes(text: str, limit: int = 4) -> list[str]:
    found = re.findall(r"\b(?:\d{2})?[A-Z]\d{3}-[A-Z0-9-]{4,}\b", text or "", flags=re.IGNORECASE)
    out = []
    seen = set()
    for value in found:
        normalized = value.upper()
        if normalized in seen:
            continue
        seen.add(normalized)
        out.append(normalized)
        if len(out) >= limit:
            break
    return out


def looks_like_closed_marker(text: str) -> bool:
    low = normalize_for_match(text)
    if not low:
        return False
    closed_values = {
        "gotowe",
        "poszło",
        "poszlo",
        "wysłane",
        "wyslane",
        "proszę bardzo.",
        "prosze bardzo.",
        "ok",
        "oki",
        "dzięki",
        "dzieki",
        "super dzięki ci bardzo",
        "super dzieki ci bardzo",
    }
    return low in closed_values or low.startswith(("gotowe ", "poszło ", "poszlo ", "wysłane ", "wyslane "))


def looks_like_table_noise(subject: str, snippet: str, sender: str = "") -> bool:
    low_subject = normalize_for_match(subject)
    low_snippet = normalize_for_match(snippet)
    low_all = normalize_for_match(f"{sender} {subject} {snippet}")
    if not low_subject and not low_snippet:
        return True
    if low_subject.isdigit() and not low_snippet:
        return True
    if low_subject in {"siema", "re siema", "re: siema"} and (not low_snippet or low_snippet.isdigit()):
        return True
    if low_subject.startswith(("lista ", "re: lista", "re lista")) and (
        not low_snippet or looks_like_closed_marker(low_snippet)
    ):
        return True
    if looks_like_closed_marker(low_snippet) and not any(
        word in low_subject for word in ["ce", "etykiet", "profile", "badanie", "tim", "wyskakuje", "post"]
    ):
        return True
    banter_words = ["misiek", "melisy", "specjalna", "bulbulbul", "ślinka", "slina", "kacikach"]
    if any(word in low_all for word in banter_words) and not any(word in low_all for word in ["tak napisz", "dopracuj", "post", "ip63", "ip 63", "ip68", "ip 68"]):
        return True
    return False


def choose_issue_messages(messages: list) -> tuple[object, object]:
    meaningful = [item for item in messages if not looks_like_table_noise(item.subject, item.snippet, item.sender_email)]
    if not meaningful:
        meaningful = messages
    incoming = [item for item in meaningful if item.direction == "przychodzacy" and not looks_like_closed_marker(item.snippet)]
    first = sorted(meaningful, key=lambda item: item.date)[0]
    signal = incoming[-1] if incoming else sorted(meaningful, key=lambda item: item.date)[-1]
    return first, signal


def issue_summary(subject: str, snippet: str, messages: list | None = None) -> str:
    text = f"{subject} {snippet}"
    low = normalize_for_match(text)
    indexes = extract_indexes(text)
    if "profile prescot led" in low or ("profil" in low and ("wymiar" in low or "rysunk" in low)):
        return "Potrzebne dokładniejsze rysunki/wymiary profili Prescot LED do projektów. Ostatni stan: trzeba pozyskać dane od Krzyśka/producenta albo zmierzyć profile samodzielnie."
    if "zdjec" in low or "zdję" in low or "opisy" in low or "dodaj do neta" in low or "dodaj do b2b" in low:
        return "Zadanie produktowe: przygotować zdjęcia, opisy i dane techniczne dla kilku pozycji, a potem wrzucić je do systemu, sklepu i B2B."
    if "etykiet" in low or "chin" in low:
        if indexes:
            return f"Sprawa etykiet: przygotować dane dla indeksów {', '.join(indexes)}{' i kolejnych pozycji z listy' if len(indexes) >= 3 else ''}."
        return "Sprawa etykiet: z maila wynika potrzeba przygotowania pliku/wersji do produkcji lub Chin."
    if "tim s.a." in low or "weryfikacja cen" in low:
        return "TIM pyta o spadek cen. W wątku jest już odpowiedź, że produkty są wycofane/do wyczerpania, więc temat wymaga oznaczenia jako zamknięty albo potwierdzenia wysyłki."
    if "badanie" in low or "pomiar" in low or "stabilizac" in low:
        return "Dariusz pyta o PDF-y z badań/stabilizacji. Sprawa polega na znalezieniu konkretnych plików i odesłaniu paczki/linku."
    if re.search(r"\bce\b", low) or "pr-mad" in low or "pr-xxmad" in low or "deklarac" in low:
        return "Potrzebny komplet CE/deklaracji dla wskazanych modeli PR-MAD/PR-XXMAD. To ma skończyć się gotowym PDF-em, nie samą korespondencją."
    if "power distributor" in low or "andrew" in low:
        return "Andrew ma dosłać zdjęcia power distributorów, żeby domknąć karty produktu po wejściu towaru na stan."
    if "wyskakuje" in low or "błąd" in low or "blad" in low:
        return "Ktoś zgłasza błąd/komunikat. Bez screena i kroków odtworzenia nie da się tego sensownie rozwiązać."
    if "post" in low or "ip68" in low or "ip 68" in low or "ip63" in low or "ip 63" in low:
        return "Temat marketingowy: dopracowanie tekstu/grafiki posta o IP. Trzeba trzymać się faktów produktu i uprościć komunikat."
    if snippet:
        return safe(snippet, 220)
    return f"Sprawa wynika z tematu: {safe(subject, 180)}"


def concrete_table_step(subject: str, snippet: str, sender: str = "", messages: list | None = None) -> str:
    text = f"{subject} {snippet} {sender}"
    low = normalize_for_match(text)
    if "profile prescot led" in low or ("profil" in low and ("wymiar" in low or "rysunk" in low)):
        return "Najpierw zapytać Krzyśka/producenta o rysunki wymiarowe. Jeśli ich nie ma, zrobić pomiary suwmiarką i arkusz: profil, wymiary, wpust, osłona, akcesoria."
    if "power distributor" in low or "andrew" in low:
        return "Wysłać Andrew listę modeli i poprosić o zdjęcia: packshot, detale złącz, opakowanie. Po zdjęciach dopiąć produkty w systemie/B2B."
    if "zdjec" in low or "zdję" in low or "opisy" in low or "dodaj do neta" in low or "dodaj do b2b" in low:
        return "Wypisać indeksy, zebrać zdjęcia i opisy, uzupełnić dane techniczne, wrzucić do systemu/sklepu/B2B i odpisać listą gotowych pozycji."
    if "etykiet" in low or "chin" in low:
        indexes = extract_indexes(text, 3)
        prefix = f"Dla {', '.join(indexes)}: " if indexes else ""
        return prefix + "uzupełnić nazwę handlową, EAN, ilość i wersję językową; wynikiem ma być gotowy plik etykiet do wysłania/produkcji."
    if "tim s.a." in low or "weryfikacja cen" in low:
        if "wycofałem" in low or "wycofalem" in low or "do wyczerpania" in low:
            return "Nie drążyć od nowa. Sprawdzić, czy odpowiedź poszła do TIM, i oznaczyć: produkty wycofane/do wyczerpania, cena nie jest aktywną promocją."
        return "Odpisać TIM jedną decyzją: celowa zmiana / błąd / produkty wycofane. Bez tej decyzji temat wróci do cen."
    if "badanie" in low or "pomiar" in low or "stabilizac" in low:
        return "Znaleźć PDF-y badań, nazwać po indeksach i odesłać Dariuszowi paczkę/link. Jeśli ich nie ma, odpisać gdzie są dane źródłowe."
    if re.search(r"\bce\b", low) or "pr-mad" in low or "pr-xxmad" in low or "deklarac" in low:
        return "Złożyć PDF CE: model, wariant 12/24V, zasilanie, importer/producent, normy. Jeśli brakuje wariantu albo partii, zadać tylko to pytanie."
    if "wyskakuje" in low or "błąd" in low or "blad" in low:
        return "Poprosić o screen, miejsce w systemie i kroki odtworzenia. Dopiero potem sprawdzić konto/uprawnienia albo konkretny moduł."
    if "post" in low or "ip68" in low or "ip 68" in low or "ip63" in low or "ip 63" in low:
        return "Poprawić copy posta: prosty opis zastosowania, poprawne IP, bez nadmiarowych obietnic. Finalnie wysłać jedną wersję do akceptu."
    if sender.endswith("@prescot.pl") or sender.endswith("@prescot.com.pl"):
        return "Jeśli to zadanie wewnętrzne, nadać właściciela i wynik końcowy. Jeśli to tylko informacja, nie wpisywać do planu działań."
    return "Nadać jeden następny ruch: odpowiedź, pytanie blokujące albo decyzja o zamknięciu. Bez tego nie wpisywać ogólnego follow-upu."


def issue_status(subject: str, snippet: str, messages: list | None = None) -> str:
    all_text = normalize_for_match(" ".join([subject, snippet] + [getattr(item, "snippet", "") for item in (messages or [])]))
    if looks_like_closed_marker(snippet) or "wycofałem" in all_text or "wycofalem" in all_text or "poszło" in all_text or "poszlo" in all_text:
        return "Sprawdzić zamknięcie"
    if any(word in all_text for word in ["pilnie", "muszę", "musze", "agencji celnej", "wyskakuje"]):
        return "Pilne"
    return "Do odblokowania"


def build_recent_issue_rows(items: list, limit: int = 18) -> list[dict[str, str]]:
    grouped: dict[str, list] = {}
    for item in sorted(items, key=lambda i: i.date, reverse=True):
        if looks_like_table_noise(item.subject, item.snippet, item.sender_email):
            continue
        text = normalize_for_match(f"{item.subject} {item.snippet}")
        if not any(
            word in text
            for word in [
                "profile",
                "profil",
                "wymiar",
                "rysunk",
                "etykiet",
                "chin",
                "ce",
                "pr-mad",
                "badanie",
                "pomiar",
                "tim",
                "wyskakuje",
                "post",
                "ip68",
                "ip 68",
                "ip63",
                "ip 63",
                "zdjec",
                "zdję",
                "system",
                "b2b",
                "power distributor",
            ]
        ):
            continue
        key = priority_key(item.subject)
        grouped.setdefault(key, []).append(item)

    rows = []
    for messages in sorted(grouped.values(), key=lambda group: max(item.date for item in group), reverse=True):
        first, signal = choose_issue_messages(messages)
        subject = safe(signal.subject or first.subject, 140)
        summary = issue_summary(subject, signal.snippet, messages)
        step = concrete_table_step(subject, summary, signal.sender_email or signal.sender_name, messages)
        rows.append(
            {
                "date": max(item.date for item in messages).astimezone().strftime("%Y-%m-%d %H:%M"),
                "from": signal.sender_email or signal.sender_name,
                "subject": subject,
                "snippet": summary,
                "status": issue_status(subject, signal.snippet, messages),
                "ai_advice": step,
            }
        )
        if len(rows) >= limit:
            break
    return rows


def render_table(rows: list[dict[str, str]], columns: list[tuple[str, str]], empty: str = "Brak.") -> str:
    if not rows:
        return f'<p class="empty">{html.escape(empty)}</p>'
    head = "".join(f'<th class="col-{html.escape(key)}">{html.escape(label)}</th>' for key, label in columns)
    body = []
    for row in rows:
        tds = []
        for key, label in columns:
            value = row.get(key, "")
            cls_parts = [f"col-{key}"]
            if key == "status":
                cls_parts.append(status_class(value))
            if key == "priority":
                value = f"#{value}"
            cls = f' class="{" ".join(html.escape(part) for part in cls_parts)}"'
            tds.append(f'<td{cls} data-label="{html.escape(label)}">{html.escape(value)}</td>')
        body.append("<tr>" + "".join(tds) + "</tr>")
    return f'<div class="table-wrap"><table><thead><tr>{head}</tr></thead><tbody>{"".join(body)}</tbody></table></div>'


def section(title: str, subtitle: str, content: str, count: int | None = None) -> str:
    badge = f'<span class="section-count">{count}</span>' if count is not None else ""
    return (
        '<section class="panel">'
        f'<div class="section-title"><div><h2>{html.escape(title)}</h2>'
        f'<p>{html.escape(subtitle)}</p></div>{badge}</div>'
        f"{content}"
        "</section>"
    )


def build_operational_guidance(
    priorities: list[dict[str, str]],
    client_replied: list[dict[str, str]],
    stale: list[dict[str, str]],
    offers: list[dict[str, str]],
    firmowe: list,
    radoslaw: list,
) -> tuple[str, str]:
    top_subjects = []
    for row in priorities:
        subject = " ".join((row.get("subject") or "").split())
        if len(subject) < 5:
            continue
        if subject.isdigit():
            continue
        top_subjects.append(subject)
        if len(top_subjects) >= 3:
            break
    top_line = "; ".join(html.escape(subject) for subject in top_subjects)

    if client_replied:
        first_step = (
            f"Najpierw zamknij wątki, gdzie klient już wrócił: {len(client_replied)} tematów czeka na konkretną reakcję."
        )
    elif stale:
        first_step = (
            f"Nie ma świeżych powrotów od klientów, więc pierwszy blok pracy to zaległości: {len(stale)} tematów bez domknięcia."
        )
    elif offers:
        first_step = (
            f"Brak pilnych reakcji i zaległości, więc zacznij od ofert: {len(offers)} tematów wymaga decyzji handlowej albo brakujących danych."
        )
    else:
        first_step = (
            "Nie widać dziś krytycznych czerwonych flag, więc pierwszy blok przeznacz na szybkie porządki i domykanie drobnych spraw."
        )

    risk_parts = []
    if stale:
        risk_parts.append(f"największe ryzyko to {len(stale)} zaległych wątków")
    if offers:
        risk_parts.append(f"{len(offers)} ofert bez jednoznacznego statusu")
    if radoslaw:
        risk_parts.append(f"{len(radoslaw)} wątków roboczych z Radosławem do uporządkowania")
    if not risk_parts:
        risk_parts.append("brak widocznych blokad wymagających eskalacji")
    risk_line = "Dziś operacyjnie najważniejsze jest " + ", ".join(risk_parts) + "."

    if firmowe:
        closing_line = (
            f"Na końcu przejdź przez bieżące sprawy firmowe ({len(firmowe)} pozycji po filtrze), ale tylko po nadaniu decyzji priorytetom."
        )
    else:
        closing_line = "Po priorytetach nie zostaje duży blok spraw firmowych, więc warto wykorzystać dzień na decyzje i domknięcie otwartych pytań."

    queue_line = (
        f"Kolejność pracy na dziś: 1) priorytety, 2) powroty klientów, 3) zaległości, 4) oferty, 5) sprawy firmowe. "
        f"Top tematy z raportu: {top_line if top_line else 'brak jednego dominującego wątku, dzień jest rozproszony.'}"
    )

    status_line = (
        "<b>Interpretacja statusów:</b> "
        "<b>Do reakcji</b> oznacza, że klient wykonał ruch i temat trzeba dziś popchnąć dalej. "
        "<b>Zaległe</b> oznacza, że wątek już traci kontrolę i trzeba go zamknąć decyzją albo kontaktem. "
        "<b>Oferta / decyzja</b> oznacza, że temat handlowy nie może zostać bez wyniku: wyślij brakujące dane, dopytaj o decyzję albo oznacz jako wygrane/przegrane. "
        "<b>Do sprawdzenia</b> oznacza temat roboczy, który wymaga właściciela i następnego kroku."
    )

    note_html = (
        f"<div class=\"note\"><b>Wniosek operacyjny na dziś:</b> {html.escape(first_step)} "
        f"{html.escape(risk_line)} {html.escape(closing_line)} "
        f"Raport jest generowany lokalnie, bez kasowania i przenoszenia wiadomości.</div>"
    )
    summary_html = (
        f"<div class=\"note\"><b>Rekomendacja prowadzenia dnia:</b> {html.escape(queue_line)}</div>"
        f"<div class=\"note\">{status_line}</div>"
    )
    return note_html, summary_html


def build_ai_daily_insights(
    label: str,
    start: dt.date,
    end_exclusive: dt.date,
    raw_count: int,
    ignored_count: int,
    priorities: list[dict[str, str]],
    recent_rows: list[dict[str, str]],
    radoslaw_rows: list[dict[str, str]],
    client_replied_count: int,
    stale_count: int,
    offers_count: int,
) -> dict:
    instructions = (
        "Jestes operacyjnym problem-solverem Karola w Prescot, a nie autorem ogolnych porad. "
        "Analizujesz dzienny wycinek poczty i masz pomagac rozwiazywac sprawy: ustalic co blokuje temat, zaproponowac konkretny ruch, wskazac brakujace dane i dac gotowy szkic odpowiedzi. "
        "Zakazane ogolniki: follow-up, sprawdzic temat, wrocic do klienta, nadac status, uporzadkowac, skontaktowac sie bez tresci wiadomosci. "
        "Jesli danych jest za malo, nie udawaj pewnosci: napisz dokladnie jakie pytanie lub sprawdzenie odblokuje problem. "
        "Nie wymyslaj cen, terminow ani stanow magazynowych spoza danych. Nie wspominaj o CLI, Codex, API, promptach ani narzedziach technicznych. Pisz po polsku, krotko, roboczo i konkretnie. "
        "Zwroc tylko JSON z polami: headline string, solved_problems list[object], decisions list[string], radoslaw string, operating_rule string. "
        "Kazdy obiekt solved_problems ma pola: subject, problem, likely_solution, action_now, missing_data, draft_reply, confidence. "
        "Daj maksymalnie 5 solved_problems. draft_reply ma byc gotowym tekstem maila/SMS do wyslania lub pustym stringiem, jesli nie wolno go napisac bez danych."
    )
    payload = {
        "skrzynka": label,
        "zakres": {
            "start": start.isoformat(),
            "end": (end_exclusive - dt.timedelta(days=1)).isoformat(),
        },
        "liczniki": {
            "raw_count": raw_count,
            "ignored_count": ignored_count,
            "client_replied_count": client_replied_count,
            "stale_count": stale_count,
            "offers_count": offers_count,
        },
        "priorytety": priorities[:10],
        "najnowsze_tematy": recent_rows[:18],
        "radoslaw": radoslaw_rows[:12],
    }
    try:
        data = generate_json(
            instructions=instructions,
            input_data=payload,
            env_prefix="DAILY_MAIL_AI",
            max_output_tokens=int(os.getenv("DAILY_MAIL_AI_MAX_OUTPUT_TOKENS", "2200")),
        )
    except (AIUnavailable, AIError, json.JSONDecodeError, ValueError) as exc:
        return {"available": False, "error": str(exc)}

    solved_problems = []
    for raw_problem in data.get("solved_problems", []):
        if not isinstance(raw_problem, dict):
            continue
        solved_problems.append(
            {
                "subject": safe(str(raw_problem.get("subject", "")), 180),
                "problem": safe(str(raw_problem.get("problem", "")), 360),
                "likely_solution": safe(str(raw_problem.get("likely_solution", "")), 420),
                "action_now": safe(str(raw_problem.get("action_now", "")), 420),
                "missing_data": safe(str(raw_problem.get("missing_data", "")), 360),
                "draft_reply": safe(str(raw_problem.get("draft_reply", "")), 700),
                "confidence": safe(str(raw_problem.get("confidence", "")), 80),
            }
        )
        if len(solved_problems) >= 5:
            break

    return {
        "available": True,
        "headline": safe(str(data.get("headline", "")), 420),
        "solved_problems": solved_problems,
        "decisions": [safe(str(x), 360) for x in data.get("decisions", []) if str(x).strip()][:5],
        "radoslaw": safe(str(data.get("radoslaw", "")), 520),
        "operating_rule": safe(str(data.get("operating_rule", "")), 520),
    }


def render_ai_insights(insights: dict) -> str:
    if not insights.get("available"):
        raw_reason = str(insights.get("error", "AI niedostepne"))
        technical_markers = ["Codex CLI", "OpenAI Codex", "session id", "Traceback", "Error loading rules"]
        if any(marker.lower() in raw_reason.lower() for marker in technical_markers):
            reason = "silnik AI nie zwrocil poprawnej sekcji rozwiazan"
        else:
            reason = safe(raw_reason, 180)
        return section(
            "Rozwiązania z AI",
            "Sekcja problem-solving; gdy model nie odpowie, raport zostaje przy konkretnych regułach lokalnych.",
            '<div class="note"><b>AI:</b> nie wygenerowano sekcji rozwiazan. '
            f"Uzyto lokalnych regul heurystycznych. Powod: {html.escape(reason)}</div>",
        )

    def problem_cards(items: list[dict[str, str]]) -> str:
        if not items:
            return '<p class="small">Brak spraw, które da się sensownie rozwiązać z podanych fragmentów.</p>'
        cards = []
        for item in items:
            draft = item.get("draft_reply") or ""
            draft_html = (
                f'<p><b>Gotowy tekst:</b><br><span class="draft">{html.escape(draft)}</span></p>'
                if draft
                else ""
            )
            cards.append(
                "<div class=\"solution-card\">"
                f"<h3>{html.escape(item.get('subject') or 'Temat bez nazwy')}</h3>"
                f"<p><b>Problem:</b> {html.escape(item.get('problem') or 'Nieustalony')}</p>"
                f"<p><b>Rozwiązanie:</b> {html.escape(item.get('likely_solution') or 'Brak pewnego rozwiązania z danych')}</p>"
                f"<p><b>Ruch teraz:</b> {html.escape(item.get('action_now') or 'Brak jednoznacznego ruchu')}</p>"
                f"<p><b>Brakuje:</b> {html.escape(item.get('missing_data') or 'Nic oczywistego z danych')}</p>"
                f"{draft_html}"
                f"<p class=\"small\">Pewność: {html.escape(item.get('confidence') or 'niepodana')}</p>"
                "</div>"
            )
        return "".join(cards)

    def decision_list(items: list[str]) -> str:
        if not items:
            return '<li class="small">Brak osobnych decyzji.</li>'
        return "".join(f"<li>{html.escape(item)}</li>" for item in items)

    content = f"""
<div class="ai-plan">
  <p><b>{html.escape(insights.get("headline", "Co dzisiaj odblokować"))}</b></p>
  <div class="solution-list">{problem_cards(insights.get("solved_problems", []))}</div>
  <h3>Decyzje do podjęcia</h3>
  <ul>{decision_list(insights.get("decisions", []))}</ul>
  <p><b>Radosław:</b> {html.escape(insights.get("radoslaw", "") or "Brak osobnego wniosku.")}</p>
  <p><b>Zasada dnia:</b> {html.escape(insights.get("operating_rule", "") or "Najpierw odblokować problemy, potem robić porządki.")}</p>
</div>
"""
    return section(
        "Rozwiązania z AI",
        "Najpierw konkretne odblokowanie spraw, potem tabele kontrolne.",
        content,
        len(insights.get("solved_problems", [])),
    )


def render_html(label: str, start: dt.date, end_exclusive: dt.date, raw_count: int, ignored_count: int, analysis: dict, firmowe: list, radoslaw: list, use_ai: bool = True) -> str:
    end = end_exclusive - dt.timedelta(days=1)
    client_replied = [thread_action(t, "client_replied", end_exclusive) for t in analysis["followed_by_client"][:15]]
    stale = [thread_action(t, "stale", end_exclusive) for t in analysis["stale"][:15]]
    offer_threads = real_offer_threads(analysis["offers"])
    offers = [thread_action(t, "offer", end_exclusive) for t in offer_threads[:15]]

    priorities = []
    for source, label_name in [(client_replied, "Klient odpisał"), (stale, "Zaległe"), (offers, "Oferta")]:
        for row in source[:5]:
            priorities.append(
                {
                    "priority": str(len(priorities) + 1),
                    "start_date": row["date"].split(" ")[0],
                    "subject": row["subject"],
                    "summary": f"{label_name}. {row['snippet']}",
                    "next_step": row["next_step"],
                    "status": row["status"],
                    "ai_advice": row["ai_advice"],
                }
            )
            if len(priorities) >= 10:
                break
        if len(priorities) >= 10:
            break

    recent_rows = build_recent_issue_rows(firmowe, 18)

    if not priorities:
        seen_priority_keys = set()
        seen_action_families = set()
        for row in recent_rows:
            subject = row.get("subject", "")
            snippet = row.get("snippet", "")
            low_subject = normalize_for_match(subject)
            low_snippet = normalize_for_match(snippet)
            if not subject or subject.isdigit():
                continue
            if low_subject.startswith(("re: lista", "lista ")) and low_snippet in {"", "proszę bardzo.", "prosze bardzo."}:
                continue
            if row["ai_advice"].startswith("Wewnętrzne:") and low_snippet in {"", "proszę bardzo.", "prosze bardzo.", "gotowe"}:
                continue
            key = priority_key(subject)
            family = action_family(row["ai_advice"])
            if key in seen_priority_keys or family in seen_action_families:
                continue
            seen_priority_keys.add(key)
            seen_action_families.add(family)
            priorities.append(
                {
                    "priority": str(len(priorities) + 1),
                    "start_date": row["date"].split(" ")[0],
                    "subject": subject,
                    "summary": snippet or "Zadanie wynika z tematu wiadomości.",
                    "next_step": row["ai_advice"],
                    "status": "Do odblokowania",
                    "ai_advice": row["ai_advice"],
                }
            )
            if len(priorities) >= 8:
                break

    if not priorities:
        priorities.append(
            {
                "priority": "1",
                "start_date": start.strftime("%d.%m"),
                "subject": "Brak krytycznych zaległości w analizowanym zakresie",
                "summary": "Po filtrach nie widać pilnych zaległych wątków. Zostaje kontrola najnowszych tematów firmowych.",
                "next_step": "Wybrać 3 najnowsze otwarte wątki i zamknąć je decyzją, pytaniem blokującym albo informacją, że temat jest zakończony.",
                "status": "Do odblokowania",
                "ai_advice": "Nie rób samego przeglądu. Każdy otwarty wątek ma skończyć jako: załatwione, czeka na konkretną osobę albo ma wysłane jedno pytanie blokujące.",
            }
        )

    radoslaw_rows = []
    for item in sorted(radoslaw, key=lambda i: i.date, reverse=True)[:20]:
        summary = issue_summary(item.subject, item.snippet)
        radoslaw_rows.append(
            {
                "date": item.date.astimezone().strftime("%d.%m"),
                "subject": safe(item.subject, 160),
                "summary": summary,
                "next_step": concrete_table_step(item.subject, summary, item.sender_email or item.sender_name),
                "status": issue_status(item.subject, item.snippet),
                "ai_advice": concrete_table_step(item.subject, summary, item.sender_email or item.sender_name),
            }
        )

    operational_note, operational_summary = build_operational_guidance(
        priorities, client_replied, stale, offers, firmowe, radoslaw
    )
    ai_insights = (
        build_ai_daily_insights(
            label,
            start,
            end_exclusive,
            raw_count,
            ignored_count,
            priorities,
            recent_rows,
            radoslaw_rows,
            len(client_replied),
            len(stale),
            len(offers),
        )
        if use_ai
        else {"available": False, "error": "wylaczone parametrem --no-ai"}
    )

    return f"""<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>{html.escape(REPORT_TITLE)}</title>
<style>
  body{{font-family:Arial,Helvetica,sans-serif;margin:0;background:#eef2f6;color:#172033;line-height:1.45}}
  .wrap{{max-width:1180px;margin:0 auto;padding:28px}}
  .hero{{background:#10233f;color:#fff;border-radius:10px;padding:22px 24px;margin-bottom:16px}}
  h1{{font-size:28px;margin:0 0 6px;color:#fff}}
  h2{{font-size:18px;margin:0;color:#10233f}}
  .lead{{color:#cbd5e1;margin:0;font-size:14px}}
  .grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0 16px}}
  .stat{{background:#fff;border:1px solid #d8dee8;padding:13px 14px;border-radius:8px}}
  .stat b{{display:block;font-size:25px;color:#ef4b25;line-height:1.1}}.stat span{{font-size:12px;color:#667085}}
  .panel{{background:#fff;border:1px solid #d8dee8;border-radius:10px;margin:16px 0;padding:16px;box-shadow:0 1px 2px rgba(16,35,63,.05)}}
  .section-title{{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin:0 0 12px;border-bottom:1px solid #e5e7eb;padding-bottom:10px}}
  .section-title p{{margin:4px 0 0;color:#667085;font-size:13px}}
  .section-count{{display:inline-block;min-width:28px;text-align:center;background:#eef4ff;color:#175cd3;border:1px solid #c7d7fe;border-radius:999px;padding:4px 9px;font-weight:700;font-size:12px}}
  .table-wrap{{overflow-x:auto;border:1px solid #d8dee8;border-radius:8px;background:#fff}}
  table{{width:100%;border-collapse:separate;border-spacing:0;background:#fff;margin:0;table-layout:fixed}}
  th,td{{border-bottom:1px solid #e5e7eb;padding:10px 11px;vertical-align:top;font-size:13px;word-break:break-word}}
  tr:last-child td{{border-bottom:0}}
  tbody tr:nth-child(even){{background:#f8fafc}}
  tbody tr:hover{{background:#fff7ed}}
  th{{background:#10233f;color:#fff;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.02em}}
  th:first-child{{border-top-left-radius:7px}}th:last-child{{border-top-right-radius:7px}}
  .col-priority{{width:70px;text-align:center;font-weight:700;color:#ef4b25}}
  .col-date,.col-start_date{{width:92px;color:#475467}}
  .col-from{{width:175px;color:#344054}}
  .col-subject{{width:220px;font-weight:700;color:#10233f}}
  .col-status{{width:130px;text-align:center;font-weight:700;border-left:1px solid #edf0f5;border-right:1px solid #edf0f5}}
  .col-summary,.col-snippet{{width:28%}}
  .col-ai_advice,.col-next_step{{width:30%}}
  td.prio{{background:#fff1f3;color:#b42318}}td.done{{background:#ecfdf3;color:#067647}}td.wait{{background:#fffaeb;color:#b54708}}td.todo{{background:#eff8ff;color:#175cd3}}
  .note{{background:#fff7ed;border:1px solid #fed7aa;border-left:4px solid #f97316;border-radius:8px;padding:12px 14px;margin:12px 0;color:#7c2d12}}
  .ai-plan{{background:#ffffff;border:1px solid #c7d7fe;border-left:4px solid #175cd3;padding:14px;margin:12px 0 2px;border-radius:8px}}
  .ai-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}}
  .ai-grid h3{{font-size:14px;margin:0 0 6px;color:#10233f}}
  .ai-grid ol,.ai-grid ul{{margin:0;padding-left:20px}}
  .solution-list{{display:grid;grid-template-columns:1fr;gap:10px;margin:12px 0}}
  .solution-card{{border:1px solid #e5e7eb;border-left:4px solid #12b76a;padding:12px;background:#f8fafc;border-radius:6px}}
  .solution-card h3{{font-size:15px;margin:0 0 8px;color:#10233f}}
  .solution-card p{{margin:6px 0}}
  .draft{{display:block;background:#fff;border:1px solid #d0d5dd;border-radius:4px;padding:8px;color:#172033}}
  .small,.empty{{font-size:12px;color:#667085}}
  @media(max-width:800px){{
    .wrap{{padding:14px}}.hero{{border-radius:8px;padding:18px}}.grid,.ai-grid{{grid-template-columns:1fr}}
    .panel{{padding:12px}}.section-title{{display:block}}.section-count{{margin-top:8px}}
    table,thead,tbody,tr,td{{display:block;width:100%}}
    thead{{display:none}}
    tr{{border-bottom:1px solid #d8dee8;padding:8px 0}}
    td{{border:0;padding:6px 2px 6px 42%;position:relative;font-size:12px;min-height:18px}}
    td::before{{content:attr(data-label);position:absolute;left:2px;top:6px;width:37%;font-weight:700;color:#667085;text-transform:uppercase;font-size:10px}}
    .col-priority,.col-date,.col-start_date,.col-from,.col-subject,.col-status,.col-summary,.col-snippet,.col-ai_advice,.col-next_step{{width:auto;text-align:left}}
  }}
</style>
</head>
<body><div class="wrap">
<div class="hero">
  <h1>{html.escape(REPORT_TITLE)}</h1>
  <p class="lead">Skrzynka: {html.escape(label)}. Zakres: {start:%d.%m.%Y} - {end:%d.%m.%Y}. Firmowe wątki Prescot i robocze self-maile; marketplace, newslettery i automaty pominięte.</p>
</div>
<div class="grid">
  <div class="stat"><b>{raw_count}</b><span>wiadomości pobrane z zakresu</span></div>
  <div class="stat"><b>{len(firmowe)}</b><span>firmowe/robocze po filtrze</span></div>
  <div class="stat"><b>{len(radoslaw)}</b><span>wpisów w wątkach z Radosławem</span></div>
  <div class="stat"><b>{len(priorities)}</b><span>obszarów do planu dnia</span></div>
</div>

{render_ai_insights(ai_insights)}

{section(
    "Najważniejsze priorytety na dziś",
    "Krótka kolejka spraw, które mają realny ruch do wykonania dzisiaj.",
    render_table(priorities, [("priority","Priorytet"),("start_date","Od kiedy"),("subject","Temat"),("summary","Co było / jest do zrobienia"),("status","Status nadany"),("ai_advice","Ruch, który odblokuje sprawę")]),
    len(priorities),
)}

{section(
    "Radosław Narwojsz",
    "Osobne robocze sprawy bez wklejania śmieciowych list i technicznych ogonów.",
    render_table(radoslaw_rows, [("date","Data"),("subject","Temat"),("summary","Sens sprawy"),("next_step","Konkretny ruch"),("status","Status")], "Brak nowych wątków z Radosławem w tym zakresie."),
    len(radoslaw_rows),
)}

{section(
    "Najnowsze firmowe / robocze tematy",
    "Skan najświeższych sensownych tematów po odfiltrowaniu automatów, stopek i pustych odpowiedzi.",
    render_table(recent_rows, [("date","Data"),("from","Od"),("subject","Temat"),("snippet","Sens sprawy"),("status","Status"),("ai_advice","Konkretny ruch")], "Brak firmowych tematów wymagających ruchu po filtrze."),
    len(recent_rows),
)}

{operational_note}
{operational_summary}
</div></body></html>"""


def send_email(env: dict[str, str], to_addr: str, subject: str, html_body: str, attachment: Path | None = None) -> None:
    user = env["IMAP_USER"]
    password = env["IMAP_PASSWORD"]
    host = env.get("SMTP_HOST") or env.get("IMAP_HOST") or "prescot.pl"
    port = int(env.get("SMTP_PORT", "465"))

    msg = EmailMessage()
    msg["From"] = user
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg.set_content("Raport dzienny jest w wersji HTML. Jeśli klient poczty go nie pokazuje, otwórz załącznik HTML.")
    msg.add_alternative(html_body, subtype="html")
    if attachment and attachment.exists():
        msg.add_attachment(attachment.read_bytes(), maintype="text", subtype="html", filename=attachment.name)

    if port == 465:
        with smtplib.SMTP_SSL(host, port, timeout=45, context=ssl.create_default_context()) as smtp:
            smtp.login(user, password)
            smtp.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=45) as smtp:
            smtp.ehlo()
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
            smtp.login(user, password)
            smtp.send_message(msg)


def main() -> None:
    parser = argparse.ArgumentParser(description="Codzienny plan działań z poczty firmowej.")
    parser.add_argument("--env-file", default=".env")
    parser.add_argument("--days-back", type=int, default=2)
    parser.add_argument("--start", default="")
    parser.add_argument("--end-exclusive", default="")
    parser.add_argument("--no-ai", action="store_true", help="Wylacz synteze przez OpenAI API i uzyj tylko lokalnych regul.")
    parser.add_argument("--send", action="store_true")
    parser.add_argument("--to", default=DEFAULT_RECIPIENT)
    args = parser.parse_args()

    socket.setdefaulttimeout(45)
    env_file = Path(args.env_file)
    if not env_file.is_absolute():
        env_file = ROOT / env_file
    config = load_monthly_config(env_file)
    env = parse_env(env_file)

    if args.start and args.end_exclusive:
        start = dt.date.fromisoformat(args.start)
        end_exclusive = dt.date.fromisoformat(args.end_exclusive)
    else:
        start, end_exclusive = report_range(args.days_back)

    raw = fetch_mail_range(config, start, end_exclusive)
    marketplace_filtered, marketplace_ignored = filter_ignored(raw)
    filtered, daily_ignored = prepare_daily_items(marketplace_filtered)
    ignored = marketplace_ignored + daily_ignored
    analysis = build_analysis(config, filtered, end_exclusive)
    firmowe = internal_items(filtered)
    radoslaw = [item for item in filtered if "narwojsz" in item_text(item) or "rados" in item_text(item)]

    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    end = end_exclusive - dt.timedelta(days=1)
    base_name = f"daily_action_{config.base.mailbox_label}_{start.isoformat()}_{end.isoformat()}_{stamp}"
    out_dir = config.base.reports_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    html_path = out_dir / f"{base_name}.html"

    html_body = render_html(
        config.base.mailbox_label,
        start,
        end_exclusive,
        len(raw),
        len(ignored),
        analysis,
        firmowe,
        radoslaw,
        use_ai=not args.no_ai,
    )
    html_path.write_text(html_body, encoding="utf-8")

    print(f"RAW: {len(raw)}")
    print(f"IGNORED: {len(ignored)}")
    print(f"FIRMOWE: {len(firmowe)}")
    print(f"RADOSLAW: {len(radoslaw)}")
    print(f"HTML: {html_path}")

    if args.send:
        subject = f"Plan dnia Prescot - {dt.date.today():%Y-%m-%d}"
        send_email(env, args.to, subject, html_body, html_path)
        print(f"SENT: {args.to}")


if __name__ == "__main__":
    main()
