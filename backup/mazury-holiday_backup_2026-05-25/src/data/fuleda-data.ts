import { getAssetPath } from '@/utils/assetPath';
export type FuledaApartment = {
    id: string;
    type: string;
    price: number;
    guests: string;
    description: string;
    amenities: {
        living: string[];
        kitchen: string[];
        bedroom: string[];
        bathroom: string[];
        terrace: string[];
    };
    gallery: {
        heroImage: string;
        images: string[];
    };
    idoBookingId?: string;
    icalUrl?: string;
};

export const fuledaApartments: Record<string, FuledaApartment> = {
    'parter': {
        id: 'parter',
        type: 'Parter',
        price: 250,
        guests: '2+2',
        idoBookingId: '26',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/26/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
        description: `Apartament z jedną sypialnią zlokalizowany na parterze budynku to pięknie i stylowo wykończony obiekt. Położony nad jeziorem Dobskim, które jest objęte strefą ciszy to gwarancja wypoczynku w ciszy i spokoju, na łonie pięknej, nieskazitelnej mazurskiej przyrody.
Nasze apartamenty ulokowane są w miejscowości Fuleda na półwyspie nad brzegiem jeziora. Rozpościera się z niego piękny widok na panoramę jezioro Dobskiego, wyspę Kormoranów, wyspę Heleny.  Apartament jest luksusowo wykończony i zapewnia wysoki komfort wypoczynku. Na miejscu można skorzystać z prywatnego dostępu do wody, grilla i ogniska. Giżycko (oddalone o około 12km) umożliwia korzystanie z wielu atrakcji turystycznych, ofert wielu restauracji i pubów. Lokalizacja obiektu, ułatwia również poznawanie Mazur pod kątem przyrodniczym i historycznym.
Apartament Fuleda (parter) z bezpośrednim widokiem na jezioro Dobskie znajduje się na parterze budynku, posiada przestronny salon z aneksem kuchennym i rozkładaną sofę, sypialnię, łazienkę z prysznicem i dwa zadaszone tarasy: jeden z przodu budynku z bezpośrednim widokiem na jezioro Dobskie, drugi z tyłu budynku.
Położenie: parter
Maksymalna ilość osób: 2+2
Wyposażenie kuchni: kapsułkowy ekspres do kawy Tchibo, kuchenka, piekarnik, lodówka, zmywarka, komplet naczyń i sztućców
Wyposażenie salonu: TV, kominek, rozkładana sofa 2os., stół, krzesła, odkurzacz, żelazko, deska do prasowania, klimatyzacja, suszarka na ubrania, szafa
Wyposażenie sypialni: TV, łózko 160x200, dwie szafki nocne, komplet pościeli, szafa
Wyposażenie łazienki: prysznic, pralka, suszarka do włosów, prostownica, ręczniki, żel pod prysznic, mydło, balsam do ciała
Taras przód: fotele, stolik, kokon
Taras tył: zestaw mebli tarasowych, grill
Prywatne dojście do jeziora z miejscem na ognisko i grilla, hamak, dwa leżaki
Pozostałe: internet, wifi
Apartament jest kompleksowo wyposażony, ogrzewany, zapewnia komfortowy wypoczynek przez cały rok.
Fuleda położona jest około 10km od Giżycka, 20km od Kętrzyna i Gierłoży gdzie znajduje się Wilczy Szaniec - kwatera Hitlera. W pobliżu lasy, łąki, trasy rowerowe, płac zabaw,. Najbliższy sklep około 3km.`,
        amenities: {
            living: ['Klimatyzacja', 'Sofa 2-osobowa', 'TV', 'Stół i krzesła', 'Kominek', 'WiFi'],
            kitchen: ['Ekspres do kawy', 'Kuchenka', 'Lodówka', 'Zmywarka', 'Chłodziarka do wina', 'Komplet naczyń'],
            bedroom: ['Łóżko 180x200', 'TV', 'Komplet pościeli', 'Suszarka na ubrania', 'Deska do prasowania', 'Żelazko'],
            bathroom: ['Prysznic', 'Pralka', 'Suszarka do włosów', 'Prostownica', 'Ręczniki', 'Szlafroki', 'Kosmetyki'],
            terrace: ['Meble wypoczynkowe', 'Prywatne zejście do jeziora', 'Miejsce na grilla', 'Miejsce na ognisko']
        },
        gallery: {
            heroImage: getAssetPath("/images/fuleda/ido_parter_26_1.jpg"),
            images: [
                getAssetPath("/images/fuleda/ido_parter_26_1.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_2.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_3.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_4.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_5.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_6.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_7.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_8.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_9.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_10.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_11.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_12.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_13.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_14.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_15.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_16.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_17.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_18.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_19.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_20.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_21.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_22.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_23.jpg"),
                getAssetPath("/images/fuleda/ido_parter_26_24.jpg")
            ]
        }
    },
    'pietro': {
        id: 'pietro',
        type: 'Piętro',
        price: 200,
        guests: '2+1',
        idoBookingId: '27',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/27/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
        description: `Apartament z jedną sypialnią zlokalizowany na piętrze budynku to pięknie i stylowo wykończony obiekt. Położony nad jeziorem Dobskim, które jest objęte strefą ciszy to gwarancja wypoczynku w ciszy i spokoju, na łonie pięknej, nieskazitelnej mazurskiej przyrody.
Nasze apartamenty ulokowane są w miejscowości Fuleda na półwyspie nad brzegiem jeziora. Rozpościera się z niego piękny widok na panoramę jezioro Dobskiego, wyspę Kormoranów, wyspę Heleny.  Apartament jest luksusowo wykończony i zapewnia wysoki komfort wypoczynku. Na miejscu można skorzystać z prywatnego dostępu do wody, grilla i ogniska. Giżycko (oddalone o około 12km) umożliwia korzystanie z wielu atrakcji turystycznych, ofert wielu restauracji i pubów. Lokalizacja obiektu, ułatwia również poznawanie Mazur pod kątem przyrodniczym i historycznym.
Apartament Fuleda (piętro) z bezpośrednim widokiem na jezioro Dobskie znajduje się na piętrze budynku, posiada salon z aneksem kuchennym i rozkładaną wersalke, sypialnię, łazienkę z prysznicem i dwa zadaszone tarasy: jeden z przodu budynku z bezpośrednim widokiem na jezioro Dobskie, drugi z tyłu budynku.
Położenie: 1 piętro (poddasze)
Maksymalna ilość osób: 2+1
Wyposażenie kuchni: kapsułkowy ekspres do kawy Tchibo, kuchenka, piekarnik, lodówka, zmywarka, komplet naczyń i sztućców
Wyposażenie salonu: TV, kominek, rozkładana sofa 2os., stół, krzesła, odkurzacz, żelazko, deska do prasowania, klimatyzacja, suszarka na ubrania, szafa
Wyposażenie sypialni: TV, łózko 160x200, dwie szafki nocne, komplet pościeli, szafa
Wyposażenie łazienki: prysznic, pralka, suszarka do włosów, prostownica, ręczniki, żel pod prysznic, mydło, balsam do ciała
Taras z widokiem na jezioro: dwa leżaki, fotele, stolik
Prywatne dojście do jeziora z miejscem na ognisko i grilla, hamak, dwa leżaki
Pozostałe: internet, wifi
Apartament jest kompleksowo wyposażony, ogrzewany, zapewnia komfortowy wypoczynek przez cały rok.
Fuleda położona jest około 10km od Giżycka, 20km od Kętrzyna i Gierłoży gdzie znajduje się Wilczy Szaniec - kwatera Hitlera. W pobliżu lasy, łąki, trasy rowerowe, płac zabaw,. Najbliższy sklep około 3km.`,
        amenities: {
            living: ['Klimatyzacja', 'Sofa 2-osobowa', 'TV', 'Stół i krzesła', 'Kominek', 'WiFi'],
            kitchen: ['Ekspres do kawy', 'Kuchenka', 'Lodówka', 'Zmywarka', 'Chłodziarka do wina', 'Komplet naczyń'],
            bedroom: ['Łóżko 180x200', 'TV', 'Komplet pościeli', 'Suszarka na ubrania', 'Deska do prasowania', 'Żelazko'],
            bathroom: ['Prysznic', 'Pralka', 'Suszarka do włosów', 'Prostownica', 'Ręczniki', 'Szlafroki', 'Kosmetyki'],
            terrace: ['Meble wypoczynkowe', 'Prywatne zejście do jeziora', 'Miejsce na grilla', 'Miejsce na ognisko']
        },
        gallery: {
            heroImage: getAssetPath("/images/fuleda/ido_pietro_27_1.jpg"),
            images: [
                getAssetPath("/images/fuleda/ido_pietro_27_1.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_2.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_3.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_4.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_5.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_6.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_7.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_8.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_9.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_10.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_11.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_12.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_13.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_14.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_15.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_16.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_17.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_18.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_19.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_20.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_21.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_22.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_23.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_24.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_25.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_26.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_27.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_28.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_29.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_30.jpg"),
                getAssetPath("/images/fuleda/ido_pietro_27_31.jpg")
            ]
        }
    }
};


