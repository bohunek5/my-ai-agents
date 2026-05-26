import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { HeroContent } from "@/data/hero-content";
import type { FuledaApartment } from "@/data/fuleda-data";
import type { Apartment } from "@/types/apartment";
import {
    serializeFuledaApartments,
    serializeHeroContent,
    serializeKisajnoData,
    serializeSkorupkiData,
    serializeStrandaApartments,
    serializeTranslations
} from "@/lib/admin/serializers";
import { ADMIN_COOKIE_NAME, isAdminSessionToken } from "@/lib/admin/auth";

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

type SaveRequest =
    | {
        section: "hero";
        payload: HeroContent;
    }
    | {
        section: "apartments";
        payload: {
            stranda: Record<string, Apartment>;
            fuleda: Record<string, FuledaApartment>;
            kisajno: KisajnoData;
        };
    }
    | {
        section: "cottages";
        payload: SkorupkiData;
    }
    | {
        section: "translations";
        payload: any;
    };

export const runtime = "nodejs";

function fileInSrc(...segments: string[]) {
    return path.join(process.cwd(), "src", ...segments);
}

async function ensureAuthenticated() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    return isAdminSessionToken(sessionToken);
}

export async function POST(request: Request) {
    if (!(await ensureAuthenticated())) {
        return NextResponse.json(
            { error: "Sesja administratora wygasła. Zaloguj się ponownie." },
            { status: 401 }
        );
    }

    const body = await request.json() as SaveRequest;

    switch (body.section) {
        case "hero":
            await writeFile(
                fileInSrc("data", "hero-content.ts"),
                serializeHeroContent(body.payload),
                "utf8"
            );
            break;
        case "apartments":
            await Promise.all([
                writeFile(
                    fileInSrc("data", "stranda-apartments.ts"),
                    serializeStrandaApartments(body.payload.stranda),
                    "utf8"
                ),
                writeFile(
                    fileInSrc("data", "fuleda-data.ts"),
                    serializeFuledaApartments(body.payload.fuleda),
                    "utf8"
                ),
                writeFile(
                    fileInSrc("data", "kisajno-data.ts"),
                    serializeKisajnoData(body.payload.kisajno),
                    "utf8"
                )
            ]);
            break;
        case "cottages":
            await writeFile(
                fileInSrc("data", "skorupki-data.ts"),
                serializeSkorupkiData(body.payload),
                "utf8"
            );
            break;
        case "translations":
            await writeFile(
                fileInSrc("lib", "translations.ts"),
                serializeTranslations(body.payload),
                "utf8"
            );
            break;
        default:
            return NextResponse.json({ error: "Nieobsługiwana sekcja zapisu." }, { status: 400 });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin");
    revalidatePath("/apartamenty");
    revalidatePath("/domki");
    revalidatePath("/pokoje");

    return NextResponse.json({ success: true });
}
