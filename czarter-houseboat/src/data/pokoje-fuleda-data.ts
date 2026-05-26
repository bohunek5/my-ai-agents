import { getAssetPath } from '@/utils/assetPath';
export type PokojeData = {
    id: string;
    title: string;
    price: string;
    guests: string;
    description: string;
    amenities: {
        room1: string[];
        room2: string[];
        bathroom: string[];
        kitchen: string[];
        terrace: string[];
    };
    gallery: {
        heroImage: string;
        images: string[];
    };
    idoBookingId?: string;
    icalUrl?: string;
};

export const pokojeFuledaData: PokojeData = {
    id: 'pokoje',
    title: 'Fuleda - Dwa pokoje z łazienką',
    price: 'od 375 zł/doba',
    guests: '4',
    idoBookingId: '28',
    icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/28/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
    description: `Oferujemy do wynajęcia dwa pokoje: jeden z łóżkiem podwójnym, drugi z dwoma pojedynczymi, łazienka z prysznicem i wc. Przy pokojach zadaszony taras. W osobnym budynku oddalonym o 10m od pokoi kuchnia z dodatkowym wc. Wszystko znajduje się na półwyspie Fuledzki Róg nad brzegiem jeziora Dobskie ze strefą ciszy na ogrodzonym terenie Folwark Fuleda. Wspaniałe miejsce dla osób ceniących sobie dziką naturę, ciszę i spokój. Z dala od miasta.

Budynek szeregowy zlokalizowany na prywatnych ogródkach działkowych nad jeziorem Dobskim. W głównym budynku do prywatnego użytku są dwa pokoje, łazienka z prysznicem i wc, zadaszony taras. Na przeciwko tarasu w odległości około 10m jest budynek w którym znajduje się kuchnia z drugim WC (również do prywatnego użytku). Z drugiej strony budynku w odległości około 20m jest prywatne dojście do jeziora na którym znajduje się taras widokowy z grillem, miejsce na ognisko oraz łódź wiosłowa.

W odległości około 250m znajduje się ogólnodostępna plaża. Fuleda położona jest około 10km od Giżycka, 20km od Kętrzyna i Gierłoży gdzie znajduje się Wilczy Szaniec kwatera Hitlera. W pobliżu lasy, łąki, trasy rowerowe, płac zabaw. Najbliższy sklep około 3km.

Polecany rodzinom z dziećmi, wędkarzom, grzybiarzom i miłośnikom natury.

Wyposażenie: Wifi, TV, pralka, żelazko, deska do prasowania, suszarka do włosów, odkurzacz, wiatrak, mikrofala, toster, czajnik, kuchenka gazowa, lodówka, ekspres do kawy, naczynia, garnki, sztućce, kubki.
Przy zameldowaniu komplet pościeli i ręczników.

Pokój 1
łóżko dla 2 osób, wyjście na taras
odkurzacz, suszarka
żelazko, deska do prasowania

Pokój 2
dwa łóżka pojedyncze
TV
wyjście na taras

Łazienka
prysznic, pralka
suszarka do włosów, prostownica
ręczniki, szlafroki, kosmetyki

Kuchnia
obok w budynku (10m)
lodówka, zmywarka, mikrofalówka, toster
komplet naczyń i sztućców

Taras
przestronny taras
prywatne zejście do jeziora
miejsce na grilla i ognisko`,
    amenities: {
        room1: ['Łóżko dla 2 osób', 'Wyjście na taras', 'Odkurzacz', 'Suszarka', 'Żelazko', 'Deska do prasowania'],
        room2: ['Dwa łóżka pojedyncze', 'TV', 'Wyjście na taras'],
        bathroom: ['Prysznic', 'Pralka', 'Suszarka do włosów', 'Prostownica', 'Ręczniki', 'Szlafroki', 'Kosmetyki'],
        kitchen: ['Lodówka', 'Zmywarka', 'Mikrofalówka', 'Toster', 'Komplet naczyń i sztućców', 'Kuchnia gazowa', 'Ekspres do kawy'],
        terrace: ['Przestronny taras', 'Prywatne zejście do jeziora', 'Miejsce na grilla i ognisko', 'Łódź wiosłowa', 'Taras widokowy']
    },
    gallery: {
        heroImage: getAssetPath("/images/pokoje_fuleda/fuleda_pokoje_hero.webp"),
        images: [
            getAssetPath("/images/pokoje_fuleda/fuleda_pokoje_hero.webp"),
            getAssetPath("/images/pokoje_fuleda/335.webp"),
            getAssetPath("/images/pokoje_fuleda/336.webp"),
            getAssetPath("/images/pokoje_fuleda/337.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_2.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_3.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_4.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_5.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_6.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_7.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_8.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_9.webp"),
            getAssetPath("/images/pokoje_fuleda/pokoje/pokoje_10.webp"),
            getAssetPath("/images/pokoje_fuleda/314.webp"),
            getAssetPath("/images/pokoje_fuleda/315.webp"),
            getAssetPath("/images/pokoje_fuleda/316.webp"),
            getAssetPath("/images/pokoje_fuleda/317.webp"),
            getAssetPath("/images/pokoje_fuleda/318.webp"),
            getAssetPath("/images/pokoje_fuleda/319.webp"),
            getAssetPath("/images/pokoje_fuleda/321.webp"),
            getAssetPath("/images/pokoje_fuleda/322.webp"),
            getAssetPath("/images/pokoje_fuleda/326.webp"),
            getAssetPath("/images/pokoje_fuleda/327.webp"),
            getAssetPath("/images/pokoje_fuleda/329.webp"),
            getAssetPath("/images/pokoje_fuleda/331.webp"),
            getAssetPath("/images/pokoje_fuleda/332.webp"),
            getAssetPath("/images/pokoje_fuleda/104029_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104030_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104036_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104037_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104040_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104043_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104044_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104045_8.webp"),
            getAssetPath("/images/pokoje_fuleda/104046_8.webp"),
            getAssetPath("/images/pokoje_fuleda/pietro_20.webp"),
            getAssetPath("/images/pokoje_fuleda/pietro_21.webp")
        ]
    }
};
