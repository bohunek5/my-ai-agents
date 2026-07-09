"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { skorupkiData } from "@/data/skorupki-data";
import ApartmentDetailTemplate from "@/components/ApartmentDetailTemplate";
import { getAssetPath } from "@/utils/assetPath";

export default function DomkiPage() {
    const { t } = useLanguage();

    const galleryIndices = Array.from({ length: 55 }, (_, i) => i + 4); // 4 to 58
    const galleryImages = [
        getAssetPath("/images/skorupki/skorupki_1.webp"),
        getAssetPath("/images/skorupki/skorupki_2.webp"),
        getAssetPath("/images/skorupki/skorupki_3.webp"),
        ...galleryIndices.map(num => getAssetPath(`/images/skorupki/skorupki_${num}.webp`))
    ];

    const mappedData = {
        id: skorupkiData.id,
        title: t("apartments", "items.domkiSkorupki.title") || "Domki Skorupki",
        subtitle: t("apartments", "items.domkiSkorupki.location") || "Skorupki, jezioro Tałty",
        description: `${t('skorupki', 'descriptionPart1')}\n\n${t('skorupki', 'descriptionPart2')}\n\n${t('skorupki', 'descriptionPart3')}\n\n${t('skorupki', 'descriptionPart4')}`,
        mainImage: skorupkiData.gallery.heroImage,
        amenities: {
            living: [
                t('details', 'items.ac') || "Klimatyzacja",
                t('details', 'items.wifi') || "WiFi",
                "Smart TV"
            ],
            kitchen: [
                t('details', 'items.kitchen') || "W pełni wyposażony aneks kuchenny",
                "Zmywarka",
                "Płyta indukcyjna"
            ],
            bedroom: [
                "Łóżka małżeńskie i pojedyncze",
                "Pościel"
            ],
            bathroom: [
                "Prysznic",
                "Ręczniki"
            ],
            terrace: [
                "Prywatny taras z grillem",
                "Miejsce na ognisko",
                "Dostęp do jeziora",
                "Miejsce parkingowe"
            ]
        },
        gallery: galleryImages,
        customBookingUrl: "https://client37851.idobooking.com/book-now/index.php?currency=0&language=0&loc_city=Ryn&from_own_button=1"
    };

    return <ApartmentDetailTemplate data={mappedData} />;
}
