import { getAssetPath } from '@/utils/assetPath';
export type KisajnoData = {
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

export const kisajnoData: KisajnoData = {
    id: "kisajno",
    title: "Apartamenty Kisajno",
    price: 500,
    guests: "4",
    description: "Oferujemy nowoczesny apartament o powierzchni 55 m², położony na parterze z bezpośrednim dostępem do uroków jeziora Kisajno. To oferta premium dla rodzin lub grupy znajomych, które szukają wysokiego standardu, spokojnej lokalizacji i szybkiego dostępu do centrum Giżycka.",
    amenities: [
        "Widok na jezioro",
        "Klimatyzacja",
        "Smart TV",
        "Szybkie WiFi",
        "Pełna kuchnia",
        "Zmywarka",
        "Parking",
        "Port Neptun"
    ],
    gallery: {
        heroImage: getAssetPath("/images/kisajno/kisajno_1.webp"),
        images: [
            getAssetPath("/images/kisajno/kisajno_1.webp"),
            getAssetPath("/images/kisajno/kisajno_2.webp"),
            getAssetPath("/images/kisajno/kisajno_3.webp"),
            getAssetPath("/images/kisajno/kisajno_4.webp"),
            getAssetPath("/images/kisajno/kisajno_5.webp"),
            getAssetPath("/images/kisajno/kisajno_6.webp"),
            getAssetPath("/images/kisajno/kisajno_7.webp"),
            getAssetPath("/images/kisajno/kisajno_8.webp"),
            getAssetPath("/images/kisajno/kisajno_9.webp"),
            getAssetPath("/images/kisajno/kisajno_10.webp"),
            getAssetPath("/images/kisajno/kisajno_11.webp")
        ]
    },
    idoBookingId: "45",
    icalUrl: "https://client37851.idosell.com/panel/offer/icalexport/itemid/45/key/da39a3ee5e6b4b0d3255bfef95601890afd80709"
};
