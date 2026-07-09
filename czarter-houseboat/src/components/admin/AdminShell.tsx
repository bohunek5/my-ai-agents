"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Languages, Home, Building2, TentTree, Sparkles } from "lucide-react";
import { ReactNode, useState } from "react";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";

type AdminShellProps = {
    children: ReactNode;
};

const navigation = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard
    },
    {
        href: "/admin/hero",
        label: "Hero",
        icon: Sparkles
    },
    {
        href: "/admin/apartamenty",
        label: "Apartamenty",
        icon: Building2
    },
    {
        href: "/admin/domki",
        label: "Domki",
        icon: TentTree
    },
    {
        href: "/admin/translations",
        label: "Tłumaczenia",
        icon: Languages
    }
];

export function AdminShell({ children }: AdminShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    async function handleLogout() {
        setLoggingOut(true);

        try {
            await fetch("/api/admin/logout", {
                method: "POST"
            });
        } finally {
            document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            router.push("/admin");
            router.refresh();
            setLoggingOut(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col lg:flex-row">
                <aside className="border-b border-white/10 bg-slate-950/95 px-4 py-4 lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
                    <div className="mb-8 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-300/90">
                                Mazury.Holiday
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold">Admin Panel</h1>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-300 transition hover:border-amber-400/50 hover:text-white"
                        >
                            <Home className="h-4 w-4" />
                            Strona
                        </Link>
                    </div>

                    <nav className="grid gap-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                                        active
                                            ? "bg-amber-500 text-slate-950"
                                            : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                                    ].join(" ")}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                        <p className="font-medium text-white">Wskazówka</p>
                        <p className="mt-2 leading-6">
                            Każdy zapis aktualizuje pliki projektu. Po zmianach możesz od razu sprawdzić efekt na stronie.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogOut className="h-4 w-4" />
                        {loggingOut ? "Wylogowywanie..." : "Wyloguj"}
                    </button>
                </aside>

                <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
