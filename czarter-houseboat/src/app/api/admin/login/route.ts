import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    createAdminSessionToken,
    getAdminPassword
} from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password !== getAdminPassword()) {
        return NextResponse.json(
            { error: "Nieprawidłowe hasło administratora." },
            { status: 401 }
        );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: createAdminSessionToken(password),
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });

    return response;
}
