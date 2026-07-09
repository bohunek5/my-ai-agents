# Jak używać tej struktury?

## Struktura folderów Oferta

Ta struktura pozwala na łatwą edycję wszystkich opisów i treści strony bez modyfikacji kodu.

### Organizacja

```
Oferta/
├── Apartamenty_Stranda/
│   ├── Opis.md (ogólny opis kategorii)
│   ├── Wytyczne.md (jak wypełniać poszczególne apartamenty)
│   ├── A103/
│   │   ├── Opis.md (kompletny opis apartamentu)
│   │   └── images/ (zdjęcia apartamentu)
│   ├── A104/, A105/, B102/, B106/, B202/, C404/
│   │   └── (podobna struktura)
│  
├── Apartamenty_Kisajno/
│   ├── Opis.md
│   └── Wytyczne.md
│
├── Pokoje_Fuleda/
│   ├── Opis.md
│   └── Wytyczne.md
│
└── Domki_Skorupki/
    ├── Opis.md
    └── Wytyczne.md
```

### Jak edytować treści?

1. **Główny opis kategorii**: Edytuj `Opis.md` w głównym folderze kategorii (np. `Apartamenty_Stranda/Opis.md`)

2. **Poszczególne apartamenty/pokoje**: Wejdź do folderu konkretnego apartamentu i edytuj `Opis.md`

3. **Format pliku Opis.md** dla apartamentu:
   - **YAML frontmatter** (na górze między `---`): podstawowe dane
   - **Sekcja górna**: Tytuł, cena, główny opis
   - **Sekcja środkowa**: Udogodnienia z ikonkami (według kategorii)
   - **Sekcja dolna**: Dodatkowe informacje, zdjęcia, link do rezerwacji

### Dodawanie zdjęć

1. Umieść zdjęcia w folderze `images/` danego apartamentu
2. W pliku `Opis.md` wpisz nazwy plików w sekcji "Zdjęcia"

## Optymalizacja ładowania zdjęć

Zaimplementowano:

- ✅ Lazy loading dla zdjęć poza widokiem (pierwsze 2-3 eager, reszta lazy)
- ✅ Responsive sizes dla Next.js Image
- ✅ Optymalizacja dla każdej galerii (Stranda, Kisajno, Fuleda, Skorupki)

Teraz strona ładuje się znacznie szybciej!

## Link do folderu Oferta

**Pełna ścieżka**: `/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/Oferta/`

## Dalsze kroki

1. Uzupełnij puste pliki `Opis.md` dla Kisajno, Fuleda, Skorupki
2. Dodaj zdjęcia do folderów `images/` (jeśli posiadasz)
3. Uzupełnij kod przycisku iDoBooking w sekcji "Rezerwacja"
4. Daj znać kiedy będzie gotowe - wtedy mechanika odczytywania tych plików zostanie zaimplementowana na stronie
