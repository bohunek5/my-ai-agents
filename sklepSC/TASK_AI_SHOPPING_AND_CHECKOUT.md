# 🚀 ZADANIE DLA CODEX / ROO CODE: SklepSC (Prescot LED)

## 📌 Cel główny
Wdrożenie i dopracowanie modułu **Zakupy AI (Asystent Doradca / Rozmawiające Filtry)**, usunięcie wszelkich niedoskonałości wizualnych w prezentacji produktów (brak placków, pustych pól, krzywych marginesów) oraz **całkowite ukrycie dolnego menu mobilnego** w koszyku na etapie dostawy i płatności (checkout).

---

## 🛠️ Moduł 1: Prezentacja Produktów (Zakupy AI & Shop) — Zero placków i pustych pól

### Problemy do naprawy:
1. **Nieregularne karty i „placki”:** Niektóre karty produktów mają pustą przestrzeń w miejscu brakujących zdjęć, parametrów lub specyfikacji.
2. **Krzywe marginesy i paddingi:** W siatce produktów (zarówno w wynikach AI, jak i na liście sklepu) występują nierówne odstępy i łamanie wysokości kart.

### Wymagania implementacyjne:
- [ ] **CSS Grid & Flexbox:** Wymusić spójną wysokość wszystkich kart (`height: 100%`, `display: flex; flex-direction: column; justify-content: space-between`).
- [ ] **Elegancki Fallback dla zdjęć:** Jeżeli brakuje zdjęcia produktu, ładować stylowy placeholder SVG/WebP z logo Prescot i odpowiednim tłem (brak białych plam/brakujących assetów).
- [ ] **Spójne badge i metadane:** Formatowanie metadanych (kategoria, kod produktu, cena za metr / sztukę, badge dostępności) w jednej linii bazowej bez skakania layoutu.
- [ ] **Karty w czacie AI:** Wyniki proponowane przez AI w oknie konwersacji muszą być responsywną minisiatką produktów (`.ai-products-grid`) o dopracowanych marginesach (`margin: 12px 0; gap: 12px;`).

---

## 🤖 Moduł 2: Agent AI — „Rozmawiające Filtry” + Pełna Znajomość Bazy Produktów

### Koncepcja działania:
Agent AI nie ma być tylko prostym botem tekstowym, lecz **inteligentnym silnikiem doradczo-filtrującym**, z którym klient rozmawia językiem naturalnym, a agent tłumaczy to na zapytania do bazy danych produktów (`js/products-data.js` oraz `js/prescot-imported-products.json`).

### Kluczowe scenariusze rozmowy:
1. **Rozpoznawanie przeznaczenia i parametrów:**
   - *„Potrzebuję oświetlenia pod szafki w kuchni 4 metry, żeby nie było widać kropek”*
   - **Logika Agenta:**
     - Dobiera taśmę: COB 24V (brak kropek, gęsty luminofor) w barwie neutralnej (4000K) lub ciepłej (3000K).
     - Oblicza moc: np. 4m * 10W/m = 40W + min. 20% zapasu = dobiera zasilacz Scharfer 24V 60W Ultra-Slim.
     - Dobiera profil aluminiowy: podszafkowy nawierzchniowy z kloszem mlecznym.
     - Proponuje sterowanie: włącznik zbliżeniowy bezdotykowy do profilu lub sterownik radiowy.
2. **Dynamiczne filtry w czasie rzeczywistym:**
   - Gdy użytkownik doprecyzowuje (np. *„A masz coś na 12V?”* lub *„Zmień barwę na zimną 6000K”*), agent natychmiast aktualizuje kontekst sesji i przebudowuje zestaw proponowanych produktów.
3. **Akcje koszykowe:**
   - Przycisk **„Dodaj cały zestaw do koszyka”** oraz pojedyncze akcje **„Dodaj do koszyka”** / **„Szybki zakup”** bezpośrednio z poziomu dymku odpowiedzi AI.
4. **Odporność na brak danych:**
   - Jeśli baza nie zawiera dokładnego dopasowania, agent proponuje najbliższe alternatywy (np. taśmę 24V o zbliżonym strumieniu świetlnym) wraz z krótkim, profesjonalnym uzasadnieniem technicznym.

---

## 📱 Moduł 3: Mobilny Koszyk i Checkout — Ukrycie dolnego menu na etapie płatności i dostawy

### Problem:
Na podstronie `checkout.html` (oraz w koszyku na etapie finalizacji, wyboru paczkomatu InPost, kuriera i płatności) dolny pływający pasek nawigacyjny (`.config-bottom-nav` / `.mobile-bottom-nav`) zasłania kluczowe elementy interfejsu (widget mapy InPost, pola formularza, przycisk „Kupuję i płacę”) oraz niepotrzebnie miga/znika przy przewijaniu.

### Wymagania implementacyjne:
- [ ] **Checkout (`checkout.html`):** Dolny pasek nawigacji ma być **bezwzględnie ukryty** (`display: none !important;`).
- [ ] **Zarządzanie w `js/shared-popups.js`:**
  - W funkcji inicjalizującej nawigację (`upgradeMobileCommerceNavigation`) wykluczyć renderowanie lub automatycznie dodawać klasę `hide-bottom-nav` na stronach `checkout.html` oraz w aktywnym procesie płatności.
- [ ] **Bezpieczny odstęp dolny na mobilce:** Na etapie kasy zapewnić odpowiedni `padding-bottom` (np. `safe-area-inset-bottom` + 24px), aby przyciski finalizacji nie stykały się z krawędzią ekranu telefonu.
- [ ] **Brak konfliktów z InPost GeoWidget:** Upewnić się, że modal mapy paczkomatów ma najwyższy `z-index` i nic z paska nawigacyjnego nie przechwytuje zdarzeń dotykowych (touch events).

---

## 📋 Lista kontrolna odbioru (Checklist):
- [ ] Strona `ai-shopping.html` / moduł AI działa płynnie, prezentuje produkty w idealnych kafelkach bez pustych plam.
- [ ] Agent AI doradza produkty na podstawie rzeczywistej bazy `products-data.js` / JSON.
- [ ] Na `checkout.html` na telefonie nie pojawia się dolne menu mobilne.
- [ ] Formularze dostawy i płatności są w 100% czytelne i wygodne do kliknięcia na smartfonie.
