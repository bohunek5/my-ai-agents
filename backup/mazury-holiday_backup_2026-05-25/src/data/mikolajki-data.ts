import { getAssetPath } from '@/utils/assetPath';

export type MikolajkiData = {
    id: string;
    title: string;
    price: number;
    guests: string;
    description: string;
    amenities: {
        living?: string[];
        kitchen?: string[];
        bedroom?: string[];
        bathroom?: string[];
        terrace?: string[];
        general?: string[];
    };
    gallery: {
        heroImage: string;
        images: string[];
    };
    idoBookingId?: string;
    icalUrl?: string;
};

export const mikolajkiData: MikolajkiData = {
    id: "mikolajki",
    title: "Mikołajki - Apartament Gigu z 1 sypialnią",
    price: 350,
    guests: "4",
    description: `Nowoczesny i komfortowy apartament położony w samym sercu Mikołajek, przy Placu Wolności – idealna lokalizacja dla osób, które chcą mieć wszystko „pod ręką”. Apartament przeznaczony jest dla maksymalnie 4 osób i składa się z przytulnej sypialni z wygodnym łóżkiem podwójnym, salonu z rozkładaną sofą (dodatkowe miejsca do spania), w pełni wyposażonego aneksu kuchennego oraz nowoczesnej łazienki.`,
    amenities: {
        living: ["Rozkładana sofa", "TV", "Szybkie, bezpłatne WiFi"],
        kitchen: ["W pełni wyposażony aneks kuchenny ze zmywarką", "Zestaw startowy (woda, kawa, herbata)"],
        bedroom: ["Wygodne łoże małżeńskie (180x200)", "Komplet świeżej pościeli i ręczników"],
        bathroom: ["Nowoczesna łazienka z kabiną prysznicową"],
        general: ["Centrum Mikołajek - Plac Wolności", "Prywatne wejście i widok na dziedziniec", "Dla maksymalnie 4 osób (2+2)"]
    },
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
