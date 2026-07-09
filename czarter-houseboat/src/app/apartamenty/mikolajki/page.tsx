"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { mikolajkiData } from "@/data/mikolajki-data";
import ApartmentDetailTemplate from "@/components/ApartmentDetailTemplate";

export default function MikolajkiPage() {
    const { t } = useLanguage();

    const title = t("mikolajkiPage", "title") || mikolajkiData.title;
    const subtitle = t("mikolajkiPage", "subtitle") || "Centrum Mikołajek – Plac Wolności";
    const description = t("mikolajkiPage", "description") || mikolajkiData.description;

    return (
        <ApartmentDetailTemplate 
            data={{
                id: "mikolajki",
                title: title,
                subtitle: subtitle,
                description: description,
                amenities: mikolajkiData.amenities,
                mainImage: mikolajkiData.gallery.heroImage,
                gallery: mikolajkiData.gallery.images,
                idoBookingId: mikolajkiData.idoBookingId || "31",
                icalUrl: mikolajkiData.icalUrl
            }}
            backUrl="/apartamenty"
        />
    );
}
