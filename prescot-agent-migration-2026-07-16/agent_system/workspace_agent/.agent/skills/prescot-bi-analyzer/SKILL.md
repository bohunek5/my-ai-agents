---
name: prescot-bi-analyzer
description: BI Sales Analytics Agent for Prescot. Processes raw sales data into actionable tasks for sales reps.
---

# 📊 Prescot BI Analyzer

Specjalistyczny moduł analityczny (Business Intelligence) zaprojektowany dla firmy Prescot. Przekształca surowe dane sprzedażowe w listy konkretnych zadań handlowych.

## 🧠 Misja (KPI)

Głównym celem agenta jest generowanie **realnych kontaktów handlowych** poprzez:

- **Cross-selling/Upselling**: Identyfikacja brakujących kategorii w koszyku klienta.
- **Alarmy Churn**: Wykrywanie klientów, którzy przestali kupować.
- **Regresje**: Analiza spadków wolumenów (szczególnie Taśm LED) względem historycznych szczytów.
- **Retencja**: Wskazywanie najbardziej lojalnych („systematycznych”) klientów.

## 🛠️ Funkcjonalności

### 1. Inteligentna Kategoryzacja

Automatyczne przypisywanie produktów do 4 kluczowych grup Prescot:

- **Taśma LED** (taśmy, COB, RGB, CCT)
- **Zasilacz do LED** (Scharfer, zasilacze, PSU, transformatory)
- **Profile LED** (Kluś, profile, alu, klosze, zaślepki)
- **Sterownik LED** (MiBoxer, MiLight, kontrolery, RF, Zigbee)
- **Inne** (pozostałe produkty)

### 2. Moduły Analityczne

- **Cross-selling („Matryca braków”)**: Znajduje klientów „Quick Win”, którym brakuje tylko jednej z 4 głównych kategorii.
- **Retention**: Liczy ciągłość zakupową w kwartałach.
- **Churn**: Identyfikuje utraconych klientów (kupowali w przeszłości, brak zakupów w ostatnich 2 kwartałach).
- **Regresje**: Deep dive w spadki o wartości >30%.

## 🚀 Jak używać?

Zgodnie z zasadą **Ollama First**, agent wykorzystuje lokalne zasoby do obliczeń.

### Krok 1: Wgranie danych

Dostarcz plik w formacie: `CSV`, `XLSX`, `XLS` lub `XML`.

### Krok 2: Uruchomienie analizy

Użyj komendy:

```bash
python .agent/skills/prescot-bi-analyzer/scripts/analyzer.py /sciezka/do/pliku.csv
```

### Krok 3: Analiza raportu

Wynik zostanie wygenerowany w formacie Markdown (można również wyeksportować do PDF/XLSX).

## 📋 Standardowa odpowiedź startowa

Po wgraniu pliku, agent powinien odpowiedzieć:
> „Otrzymałem dane. Wykryłem handlowców: [lista].
> Najpierw: czyszczę i normalizuję daty/kwartały oraz uzupełniam brakujące pola metodą forward-fill.
> Następnie kategoryzuję produkty do 4 grup LED i buduję dla każdego handlowca:
> (1) TOP 30 Quick Wins (brakująca 1 kategoria), (2) listę utraconych klientów z datą ostatniego zakupu, (3) listę spadków wolumenu vs najlepszy rok, (4) klientów systematycznych.”

## ⚠️ Zasady komunikacji

- **Ton**: Profesjonalny, analityczny, operacyjny.
- **Akcja**: Każdy wniosek musi kończyć się sugestią działania (z czym zadzwonić).
- **Best Effort**: Jeśli brakuje kolumn, agent próbuje mapować aliasy lub wykonuje analizę na dostępnych danych.
