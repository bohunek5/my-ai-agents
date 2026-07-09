"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { strandaApartments } from "@/data/stranda-apartments";
import ApartmentDetailTemplate from "@/components/ApartmentDetailTemplate";

interface ApartmentDetailClientProps {
    id?: string;
}

export default function ApartmentDetailClient({ id }: ApartmentDetailClientProps) {
    const { t } = useLanguage();
    const data = strandaApartments[id as keyof typeof strandaApartments];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Apartament nie odnaleziony.</p>
            </div>
        );
    }

    return (
        <ApartmentDetailTemplate 
            data={{
                id: id,
                title: `${t("stranda", "apartment")} ${id} ${t("strandaTypes", data.type as any) || data.type}`,
                description: t("strandaDescriptions", id as any) || data.description,
                amenities: data.amenities,
                mainImage: data.gallery.heroImage,
                gallery: data.gallery.images,
                idoBookingId: data.idoBookingId,
                icalUrl: data.icalUrl
            }} 
            backUrl="/apartamenty/stranda"
        />
    );
}
