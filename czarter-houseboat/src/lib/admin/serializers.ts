import type { HeroContent } from "@/data/hero-content";
import type { FuledaApartment } from "@/data/fuleda-data";
import type { Apartment } from "@/types/apartment";
import type { Language } from "@/lib/translations";

import type { KisajnoData } from "@/data/kisajno-data";

type SkorupkiData = {
    id: string;
    title: string;
    price: number;
    guests: string;
    unitsCount: number;
    description: string;
    gallery: {
        heroImage: string;
        images: string[];
    };
};

type TranslationTree = Record<Language, unknown>;

function toTsLiteral(value: unknown) {
    return JSON.stringify(value, null, 4);
}

export function serializeHeroContent(heroContent: HeroContent) {
    return `export type HeroContent = {
    title: string;
    subtitle: string;
    ctaText: string;
};

export const heroContent: HeroContent = ${toTsLiteral(heroContent)};
`;
}

export function serializeStrandaApartments(strandaApartments: Record<string, Apartment>) {
    return `import { Apartment } from "@/types/apartment";

export const strandaApartments: Record<string, Apartment> = ${toTsLiteral(strandaApartments)};
`;
}

export function serializeFuledaApartments(fuledaApartments: Record<string, FuledaApartment>) {
    return `export type FuledaApartment = {
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

export const fuledaApartments: Record<string, FuledaApartment> = ${toTsLiteral(fuledaApartments)};
`;
}

export function serializeKisajnoData(kisajnoData: KisajnoData) {
    return `export type KisajnoData = {
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

export const kisajnoData: KisajnoData = ${toTsLiteral(kisajnoData)};
`;
}

export function serializeSkorupkiData(skorupkiData: SkorupkiData) {
    return `export type SkorupkiData = {
    id: string;
    title: string;
    price: number;
    guests: string;
    unitsCount: number;
    description: string;
    gallery: {
        heroImage: string;
        images: string[];
    };
};

export const skorupkiData: SkorupkiData = ${toTsLiteral(skorupkiData)};
`;
}

export function serializeTranslations(translations: TranslationTree) {
    return `export const translations = ${toTsLiteral(translations)};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.pl;
`;
}
