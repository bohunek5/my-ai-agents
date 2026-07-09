"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { kisajnoData } from "@/data/kisajno-data";
import ApartmentDetailTemplate from "@/components/ApartmentDetailTemplate";

export default function KisajnoPage() {
    const { t } = useLanguage();

    const title = t("kisajnoPage", "title") || kisajnoData.title;
    const subtitle = t("kisajnoPage", "subtitle") || "Giżycko, Jezioro Kisajno";
    const description = t("kisajnoPage", "description") || kisajnoData.description;

    return (
        <ApartmentDetailTemplate 
            data={{
                id: "kisajno",
                title: title,
                subtitle: subtitle,
                description: description,
                amenities: {
                    living: [
                        t("kisajnoPage", "amenities.ac"),
                        t("kisajnoPage", "amenities.smartTv"),
                        t("kisajnoPage", "amenities.wifi"),
                    ].filter(Boolean) as string[],
                    kitchen: [
                        t("kisajnoPage", "amenities.kitchen"),
                        t("kisajnoPage", "amenities.dishwasher"),
                    ].filter(Boolean) as string[],
                    general: [
                        t("kisajnoPage", "amenities.lakeView"),
                        t("kisajnoPage", "amenities.parking"),
                        t("kisajnoPage", "amenities.port"),
                    ].filter(Boolean) as string[]
                },
                mainImage: kisajnoData.gallery.heroImage,
                gallery: kisajnoData.gallery.images,
                idoBookingId: kisajnoData.idoBookingId || "45",
                icalUrl: kisajnoData.icalUrl
            }}
            backUrl="/apartamenty"
        />
    );
}
