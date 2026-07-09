# Jak używać optymalizacji zdjęć 🖼️

## Szybki start

Gdy dodajesz nowe zdjęcia do projektu, po prostu uruchom:

```bash
npm run optimize-images
```

## Co robi skrypt?

✅ **Kompresuje zdjęcia** zachowując wysoką jakość (85%)  
✅ **Konwertuje JPG → WebP** (lepszy format, mniejszy rozmiar)  
✅ **Optymalizuje PNG i WebP**  
✅ **Tworzy backup** oryginalnych plików w `public/mazury-holiday/images/originals/`  
✅ **Zmniejsza rozmiar** bardzo dużych zdjęć (max 1920x1920px)  
✅ **Pokazuje statystyki** ile MB zaoszczędziłeś

## Przykładowe wyniki

Przed:

```
skorupki_4.jpg - 4.2 MB
skorupki_5.jpg - 3.8 MB
A103_1.jpg - 5.1 MB
```

Po:

```
skorupki_4.webp - 450 KB (oszczędność: 89%)
skorupki_5.webp - 380 KB (oszczędność: 90%)
A103_1.webp - 520 KB (oszczędność: 89%)
```

## Workflow - jak dodawać zdjęcia?

### Dla apartamentów Stranda

1. Wrzuć zdjęcia do `Oferta/Apartamenty_Stranda/A103/images/`
2. Uruchom `npm run optimize-images`
3. Skrypt zoptymalizuje wszystkie zdjęcia
4. Skopiuj zoptymalizowane pliki do `public/mazury-holiday/images/stranda/A103/`

### Dla innych lokalizacji

1. Wrzuć zdjęcia do odpowiedniego folderu w `public/mazury-holiday/images/`
2. Uruchom `npm run optimize-images`
3. Gotowe!

## Bezpieczeństwo

- ✅ Oryginalne pliki są **zawsze backupowane** do `/originals/`
- ✅ Skrypt **nie nadpisuje** już zoptymalizowanych plików
- ✅ Możesz bezpiecznie uruchamiać wielokrotnie

## Konfiguracja (opcjonalna)

Edytuj `scripts/optimize-images.js` jeśli chcesz zmienić:

```js
const CONFIG = {
    quality: 85,              // Jakość (85 = świetna jakość, mały rozmiar)
    maxWidth: 1920,           // Maksymalna szerokość
    maxHeight: 1920,          // Maksymalna wysokość
    createBackup: true,       // Czy tworzyć backup?
};
```

## FAQ

**Q: Czy stracę jakość zdjęć?**  
A: Nie! Przy 85% jakości różnica jest niewidoczna gołym okiem, a pliki są 10x mniejsze.

**Q: Co z WebP? Czy wszystkie przeglądarki to obsługują?**  
A: Tak! WebP jest wspierany przez 97% przeglądarek (Chrome, Firefox, Safari, Edge).

**Q: Mogę wrócić do oryginałów?**  
A: Tak! Wszystkie oryginały są w `/originals/` folderze.

**Q: Jak często mam to uruchamiać?**  
A: Za każdym razem gdy dodajesz nowe zdjęcia.

## Przykład użycia

```bash
$ npm run optimize-images

🖼️  Optymalizacja obrazów

Jakość: 85%
Backup: TAK

📁 Skanowanie: public/mazury-holiday/images
✅ skorupki_4.jpg → skorupki_4.webp
   4.2 MB → 450 KB (oszczędność: 89.3%)
✅ skorupki_5.jpg → skorupki_5.webp
   3.8 MB → 380 KB (oszczędność: 90.0%)
⏭️  Pominięto (już zoptymalizowany): A103_1.webp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Zakończono!

Przetworzone: 2
Pominięte: 1
Błędy: 0
Zaoszczędzono: 7.2 MB (89.6%)
Czas: 3.4s
```

## Wskazówki

💡 **Przed commitem zawsze uruchom optymalizację** - strona będzie ładować się szybciej!  
💡 **Nie commituj oryginalnych dużych plików** - tylko zoptymalizowane  
💡 **Jeśli zdjęcie > 2MB** - na pewno potrzebuje optymalizacji
