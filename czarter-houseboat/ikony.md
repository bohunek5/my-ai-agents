# Legenda Ikon Udogodnień

Ten plik służy jako mapa drogowa dla systemu ikon. Mapujemy słowa kluczowe z opisów apartamentów na konkretne ikony SVG.

## Formatowanie

- Wykorzystujemy ikony SVG (Lucide-React lub własne pliki w `/public/icons/`).
- System automatycznie wykrywa słowa kluczowe.

## Mapowanie

| Słowo kluczowe | Ikona | Nazwa w systemie |
| :--- | :--- | :--- |
| TV, Telewizor | 📺 | `Monitor` |
| Sofa, Kanapa | 🛋️ | `Sofa` |
| Stół, Krzesła | 🪑 | `Utensils` |
| Klimatyzacja | ❄️ | `Snowflake` |
| WiFi | 📶 | `Wifi` |
| Płyta indukcyjna | 🔥 | `CookingPot` |
| Lodówka | 🧊 | `Refrigerator` |
| Zmywarka | 🧼 | `Waves` |
| Mikrofalówka | 🍱 | `Microwave` |
| Łóżko, Pościel | 🛏️ | `Bed` |
| Prysznic | 🚿 | `ShowerHead` |
| Suszarka | 💨 | `Wind` |
| Żelazko, Prasowanie | 👔 | `Iron` |
| Jacuzzi, Wanna | 🛁 | `Bath` |
| Taras, Balkon | 🏖️ | `Sun` |
| Widok na jezioro | 🌊 | `Waves` |
| Kawa, Ekspres | ☕ | `Coffee` |
| Pralka | 🧺 | `WashingMachine` |

## Techniczne

Wszystkie ikony są renderowane w komponencie `ApartmentDetailClient` za pomocą funkcji `getAmenityIcon`.
