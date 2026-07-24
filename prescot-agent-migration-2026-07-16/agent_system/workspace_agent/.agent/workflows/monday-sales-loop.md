---
description: Kompleksowa automatyzacja procesu prospekcji i researchu (każdy poniedziałek)
---

Poniższy workflow łączy siły agentów Prospector, Analyst, Writer i Promoter z mocą NotebookLM, aby dostarczyć handlowcom gotowe szanse sprzedażowe.

## KROK 1: Prospekcja (Agent Prospector)

// turbo

1. Uruchom Agenta Prospector, aby znalazł 20 nowych firm z branży (np. producenci mebli, hurtownie).
2. Zapisz listę firm wraz z ich stronami WWW do tymczasowego pliku `output/monday_prospects.md`.

## KROK 2: Deep Research (NotebookLM)

// turbo
3. Dla każdej firmy z listy, uruchom `mcp_notebooklm_research_start` w trybie `fast` lub `deep`.
4. Skup się na: profilu produkcji, używanym oświetleniu i potencjalnych osobach decyzyjnych.
5. Zaimportuj wyniki researchu do notesu `Nauka dla Antygravity`.

## KROK 3: Integracja Produktów (Agent Analyst)

// turbo
6. Pobierz bazę XML z chmury (użyj `read_url_content` na URL podanym w konfiguracji projektu).
7. Dopasuj 3 konkretne produkty z XML do każdej z 20 firm na podstawie researchu z Kroku 2.
8. Przygotuj tabelę w `output/monday_selection.md`.

## KROK 4: Przygotowanie Treści (Agent Writer)

// turbo
9. Przekaż tabelę do Agenta Writer.
10. Wygeneruj dla każdej firmy:
    - Personalizowany "lodołamacz" (nawiązanie do ich realizacji).
    - Scenariusz rozmowy dla handlowca.

## KROK 5: Podział i Wysyłka (Agent Promoter)

// turbo
11. Podziel listę 20 firm na dwa zestawy (po 10 firm).
12. Użyj Agenta Promoter i Gmail MCP, aby wysłać:
    - Zestaw 1 do Handlowca A (mail: <handlowiec1@przyklad.pl>).
    - Zestaw 2 do Handlowca B (mail: <handlowiec2@przyklad.pl>).
13. Maile powinny zawierać link do pliku XML oraz gotowe scenariusze rozmów.

## KROK 6: Podsumowanie

14. Wygeneruj raport końcowy dla koordynatora projektu w `output/report_monday.md`.
