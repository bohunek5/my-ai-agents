"use client";

import { ReactNode, useEffect, useState } from "react";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";
import { AdminLoginScreen } from "@/components/admin/AdminLoginScreen";
import { AdminShell } from "@/components/admin/AdminShell";

type AdminGateProps = {
    children: ReactNode;
};

export function AdminGate({ children }: AdminGateProps) {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        setAuthenticated(document.cookie.includes(`${ADMIN_COOKIE_NAME}=`));
    }, []);

    if (authenticated === null) {
        return <div className="min-h-screen bg-slate-950" />;
    }

    if (!authenticated) {
        return <AdminLoginScreen onSuccess={() => setAuthenticated(true)} />;
    }

    return <AdminShell>{children}</AdminShell>;
}
