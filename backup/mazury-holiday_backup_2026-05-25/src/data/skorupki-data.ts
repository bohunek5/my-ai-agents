import { getAssetPath } from '@/utils/assetPath';
export type SkorupkiData = {
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

export const skorupkiData: SkorupkiData = {
    id: "skorupki",
    title: "Domki Skorupki",
    price: 600,
    guests: "6",
    unitsCount: 10,
    description: `Domki Skorupki to kameralna osada eleganckich domków wypoczynkowych w spokojnej części Mazur. Oferta łączy prywatność, wysoki standard, bliskość jeziora i dopracowane wnętrza przygotowane zarówno na rodzinny wypoczynek, jak i dłuższy pobyt.`,
        gallery: {
        heroImage: getAssetPath("/images/skorupki/skorupki_1.webp"),
        images: []
    }
};
