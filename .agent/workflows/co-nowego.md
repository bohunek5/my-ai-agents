---
description: Sprawdź co nowego w growth_log.md - podsumuj najnowsze wpisy z analiz maili Antigravity
---

# Workflow: co nowego?

Gdy użytkownik wpisze "co nowego?" lub "/co-nowego":

1. Przeczytaj plik `/Users/karolbohdanowicz/my-ai-agents/.agent/knowledge/growth_log.md`
2. Wyodrębnij wpisy dodane od ostatniej odpowiedzi (na podstawie timestampów `### DD.MM.YYYY, HH:MM:SS`)
3. Wygeneruj **zwięzłe executive briefing** w formacie:

```markdown
## 📬 CO NOWEGO — [data]

### 🎯 TOP LEADS (max 3)
- [konkretna szansa biznesowa z maila]

### 📚 KEY LESSONS (max 3)  
- [nowa wiedza techniczna/AI/trendy]

### ⚡ PROPONOWANE DZIAŁANIA
- [co konkretnie robimy dalej w my-ai-agents / Prescot]

### 🧠 DELEGACJA NOTEBOOKLM (WIDEO)
- [Jeśli w logu są wpisy #DELEGACJA_NOTEBOOKLM, wypisz tu linki i krótki opis "Co to jest?". Zapytaj czy uruchomić głęboką analizę NoteBookLM.]

### 📊 STATYSTYKI
- Nowych wpisów: X
- Maili przeanalizowanych: Y
- Delegacje wideo: Z
- Okres: [od] → [do]
```

4. Na końcu zapytaj: **"Co robimy z tymi informacjami?"** i czekaj na decyzję użytkownika.

## Uwagi

- Jeśli growth_log.md jest pusty lub brak nowych wpisów → poinformuj użytkownika
- Zawsze pokazuj najnowsze wpisy pierwsze
- Filtruj duplikaty (ten sam temat analizowany wielokrotnie)
- Używasz POLISH language zawsze

## 🚀 Głęboka Analiza NoteBookLM (Jeśli użytkownik zatwierdzi delegację)

1. Uruchom skill `course-creator` (lub wejdź przez browser na notebooklm.google.com)
2. Wklej link z maila
3. Wygeneruj "Deep Dive Analysis" (A do Z)
4. Podsumuj wnioski dla Antigravity w czacie.
5. Zaktualizuj wpis w `growth_log.md` zmieniając status z PENDING na DONE.
