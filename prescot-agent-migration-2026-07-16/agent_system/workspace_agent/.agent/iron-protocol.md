# Żelazny Protokół (Anti-Gravity Protocol)

_Zasady operacyjne i wytyczne wydziału operacji projektowych. Ten plik służy jako moja wewnętrzna baza wiedzy na temat sprawności i optymalizacji środowiska. Nie ładujemy go do głównego `gemini.md`, żeby nie spalać tokenów!_

## 1. Architektura Projektów i Skilli

- **Jeden Projekt = Jeden URL:** Każda niezależna strona / appka ma oddzielny folder. Zero miksowania by optymalizować kontekst.
- **Skills Folder (Globalne Zasoby):** Narzędzia i reużywalne instrukcje lądują w `.agent/skills`. Klonujemy je jako wyizolowane jednostki.
- **B.L.A.S.T.:** Zawsze stosuję hierarchię pracy: `Blueprint -> Link -> Architect -> Stylize -> Trigger`.
- **Precyzja:** Korzystam ze znaku `@` (lub ścieżek bezwzględnych) używając plików celowanych – nie zgaduję lokalizacji!

## 2. Optymalizacja Kontekstu (Context Rot)

- **Fast Mode:** Do małych zadań unikam trybu głębokiego planowania. Przechodzę płynnie na operacje i zwrotki.
- **Jeden Cel na Wiadomość:** Jedna konkretna instrukcja ("Zrób ABC w pliku X"). Ogranicza błędy i luki.
- **Limitowanie MCP:** Odpinam MCP, których nie używamy, żeby nie dźwigać ich opisów w każdej nowej turze.
- **Restart Kontekstu:** Rozmowa robi się za długa? Proszę usera o "nowe okno", streszczając mu obecny etap tak, żeby nowy Agent złapał temat od razu bez bagażu starych tokenów.
- **Przełamywanie Pętli:** Jeśli wpadam w pętlę i powtarzam błędy, zatrzymam się i wykonam operację myślową: "Co dokładnie poszło nie tak i JAK to rozwiążę INACZEJ?".

## 3. Kod, UI i Skille

- **Start z Makiet(AI Studio / Skrypty):** Zawsze optymalizuję pracę akceptując HTML z np. UI/UX pro max przed wyrzeźbieniem całej ciężkiej logiki.
- **Budowa Skilli z Powtarzania:** Jeśli robimy coś 2-3 razy w miesiącu (np. deploy do Vercel i GitHub), to pakuję ten flow w oddzielnego skilla.
- **Wykorzystywanie Pokaźnego Arsenalu UI:** Kiedy potrzebny projekt pro-level, będę pamiętać o bazach komponentów 21st.dev czy CodePen, z łatwością adaptując surowy kod na mój użytek.

## 4. Wdrażanie i Środowisko (Deploy & Integracja)

- **GitHub First:** Publikuje zmiany często. Ponad 40 commitów? Trzeba to zachować. Agent informuje o zatwierdzeniu zmian, by móc robić roll-backi.
- **Deploy Automatyczny:** Kombinacja GHI / Vercel do klikalnego podglądu, zawsze jak coś kończymy.
- **Zewnętrzne Interfejsy i Modele:**
  - Gdy trzeba oszczędzać budżet do banalnych spraw → Modele "mniejsze"
  - Do architektury → Thinking Models
  - ⚡ **Ollama (Lokalna Skrzynka Piaskowa):** Do "zapytań na sucho", draftowania kodu, czystej logiki i testowania prostych promptów. Oszczędzam główny silnik, wysyłając szybkie query pod maską do lokalnego localhosta, jeśli zachodzi potrzeba testu bez palenia tokenów.
- **Stitch:** Do weryfikowania kilku wersji designu tego samego elementu (A/B testing).

## 5. Działanie Autonomiczne

- Głos lektora (say Zosia) dla statusów! Mój główny interfejs raportowania w świecie realnym.
- Self-Healing — jak polecenie w konsoli rzuci błędem, nie płaczę, tylko od razu debuguję i odpalam z fixem.
