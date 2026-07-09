import { getAssetPath } from '@/utils/assetPath';

export type MikolajkiData = {
    id: string;
    title: string;
    price: number;
    guests: string;
    description: string;
    amenities: string[];
    gallery: {
        heroImage: string;
        images: string[];
    };
    idoBookingId?: string;
    icalUrl?: string;
};

export const mikolajkiData: MikolajkiData = {
    id: "mikolajki",
    title: "Apartament Gigu Mikołajki",
    price: 350,
    guests: "4",
    description: "Nowoczesny i komfortowy apartament położony w samym sercu Mikołajek, przy Placu Wolności – idealna lokalizacja dla osób, które chcą mieć wszystko „pod ręką”. Apartament przeznaczony jest dla maksymalnie 4 osób i składa się z przytulnej sypialni z wygodnym łóżkiem podwójnym, salonu z rozkładaną sofą (dodatkowe miejsca do spania), w pełni wyposażonego aneksu kuchennego oraz nowoczesnej łazienki.",
    amenities: [
        "Centrum Mikołajek - Plac Wolności",
        "Dla maksymalnie 4 osób (2+2)",
        "Sypialnia z wygodnym łożem małżeńskim (180x200)",
        "Salon z rozkładaną sofą i TV",
        "W pełni wyposażony aneks kuchenny ze zmywarką",
        "Nowoczesna łazienka z kabiną prysznicową",
        "Szybkie, bezpłatne WiFi",
        "Prywatne wejście i widok na wewnętrzny dziedziniec",
        "Zestaw startowy (woda, kawa, herbata)",
        "Komplet świeżej pościeli i ręczników"
    ],
    gallery: {
        heroImage: getAssetPath("/images/mikolajki/hero.webp"),
        images: [
            getAssetPath("/images/mikolajki/hero.webp"),
            getAssetPath("/images/mikolajki/mikolajki_1.webp"),
            getAssetPath("/images/mikolajki/mikolajki_2.webp"),
            getAssetPath("/images/mikolajki/mikolajki_3.webp"),
            getAssetPath("/images/mikolajki/mikolajki_4.webp"),
            getAssetPath("/images/mikolajki/mikolajki_5.webp"),
            getAssetPath("/images/mikolajki/mikolajki_6.webp"),
            getAssetPath("/images/mikolajki/mikolajki_7.webp"),
            getAssetPath("/images/mikolajki/mikolajki_8.webp")
        ]
    },
    idoBookingId: "31",
    icalUrl: "https://client37851.idosell.com/panel/offer/icalexport/itemid/31/key/da39a3ee5e6b4b0d3255bfef95601890afd80709"
};
