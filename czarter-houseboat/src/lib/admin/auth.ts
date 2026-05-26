import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "mazury_admin_session";

export function getAdminPassword() {
    return process.env.ADMIN_PASSWORD ?? "mazury2026";
}

export function createAdminSessionToken(password = getAdminPassword()) {
    return createHash("sha256").update(password).digest("hex");
}

export function isAdminSessionToken(token?: string | null) {
    if (!token) {
        return false;
    }

    return token === createAdminSessionToken();
}
