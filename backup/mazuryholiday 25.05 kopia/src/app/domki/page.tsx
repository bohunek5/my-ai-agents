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
        title: "Domki Skorupki",
        subtitle: "Skorupki, jezioro Tałty",
        description: `Domki Skorupki to kameralna osada eleganckich domków wypoczynkowych w spokojnej części Mazur. Oferta łączy prywatność, wysoki standard, bliskość jeziora i dopracowane wnętrza przygotowane zarówno na rodzinny wypoczynek, jak i dłuższy pobyt.\n\n${t('skorupki', 'descriptionPart1')}\n\n${t('skorupki', 'descriptionPart2')}\n\n${t('skorupki', 'descriptionPart3')}\n\n${t('skorupki', 'descriptionPart4')}`,
        mainImage: skorupkiData.gallery.heroImage,
        amenities: {
            living: [
                t('skorupki', 'amenities.ac'),
                t('skorupki', 'amenities.wifi'),
                "Smart TV"
            ],
            kitchen: [
                t('skorupki', 'amenities.fullEquip'),
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
                t('skorupki', 'amenities.garden'),
                t('skorupki', 'amenities.bonfire'),
                t('skorupki', 'amenities.waterAccess'),
                t('skorupki', 'amenities.parking')
            ]
        },
        gallery: galleryImages,
        customBookingUrl: "https://client37851.idobooking.com/book-now/index.php?currency=0&language=0&loc_city=Ryn&from_own_button=1"
    };

    return <ApartmentDetailTemplate data={mappedData} />;
}
