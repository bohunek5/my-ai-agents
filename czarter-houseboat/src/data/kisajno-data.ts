import { getAssetPath } from '@/utils/assetPath';
export type KisajnoData = {
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

export const kisajnoData: KisajnoData = {
    id: "kisajno",
    title: "Giżycko Kisajno - Apartament z dwoma sypialniami (nr15)",
    price: 500,
    guests: "4",
    description: `Apartament Kisajno 15A Suite znajduje się na parterze budynku, posiada przestronny salon z aneksem kuchennym i rozkładaną sofę, dwie sypialnie, łazienkę z prysznicem i taras z widokiem na zatokę Tracz i jezioro Kisajno\nSuite z dwoma sypialniami (maksymalna ilość osób 6) Wyposażenie kuchni: ekspres do kawy, płyta indukcyjna, mikrofalówka, piekarnik, lodówka, zmywarka, komplet naczyń i sztućców\nWyposażenie salonu: TV, sofa 2os., stół, krzesła, odkurzacz, klimatyzacja\nWyposażenie sypialni 1: TV, łóżko 160x200, komplet pościeli, suszarka na ubrania, deska do prasowania, żelazko\nWyposażenie sypialni 2: łóżko 160x200, komplet pościeli\nWyposażenie łazienki: prysznic, pralka, suszarka do włosów, ręczniki, żel pod prysznic, mydło, balsam do ciała Wyposażenie tarasu: stolik, krzesełka\nPozostałe: internet, wifi, komplet pościeli i ręczników, zestaw startowy (woda, kawa, herbata).`,
    amenities: {
        living: ['TV', 'sofa 2os.', 'stół', 'krzesła', 'odkurzacz', 'klimatyzacja'],
        kitchen: ['ekspres do kawy', 'płyta indukcyjna', 'mikrofalówka', 'piekarnik', 'lodówka', 'zmywarka', 'komplet naczyń i sztućców'],
        bedroom: ['TV', 'łóżko 160x200', 'komplet pościeli', 'suszarka na ubrania', 'deska do prasowania', 'żelazko'],
        bathroom: ['prysznic', 'pralka', 'suszarka do włosów', 'ręczniki', 'żel pod prysznic', 'mydło', 'balsam do ciała'],
        terrace: ['stolik', 'krzesełka'],
        general: ['Widok na jezioro', 'Parking', 'Port Neptun', 'Zestaw startowy (woda, kawa, herbata)']
    },
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
