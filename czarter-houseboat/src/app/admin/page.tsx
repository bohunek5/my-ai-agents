import Link from "next/link";
import { ArrowRight, Building2, Languages, TentTree, BedDouble } from "lucide-react";

const quickLinks = [
    {
        href: "/admin/hero",
        title: "Edytor Hero",
        description: "Nagłówek strony głównej, slogan i CTA."
    },
    {
        href: "/admin/apartamenty",
        title: "Edytor Apartamentów",
        description: "Stranda, Fuleda i Kisajno w jednym miejscu."
    },
    {
        href: "/admin/domki",
        title: "Edytor Domków",
        description: "Treść oferty Skorupki i parametry domków."
    },
    {
        href: "/admin/translations",
        title: "Edytor Tłumaczeń",
        description: "Edycja PL i EN obok siebie."
    }
];

export default function AdminDashboardPage() {
    const apartmentCount = 27;
    const cottageCount = 10;
    const roomsCount = 2;

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/30">
                <p className="text-xs uppercase tracking-widest text-amber-300/90">
                    Dashboard
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                    Panel administracyjny Mazury Holiday
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                    To jest osobna strefa do zarządzania treścią. Zmiany zapisują się do plików projektu i nie zmieniają struktury publicznego interfejsu.
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Apartamenty</p>
                        <Building2 className="h-5 w-5 text-amber-300" />
                    </div>
                    <p className="mt-4 text-4xl font-semibold text-white">{apartmentCount}</p>
                    <p className="mt-2 text-sm text-slate-400">Stranda, Fuleda, Kisajno</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Domki</p>
                        <TentTree className="h-5 w-5 text-amber-300" />
                    </div>
                    <p className="mt-4 text-4xl font-semibold text-white">{cottageCount}</p>
                    <p className="mt-2 text-sm text-slate-400">Oferta Skorupki</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Pokoje</p>
                        <BedDouble className="h-5 w-5 text-amber-300" />
                    </div>
                    <p className="mt-4 text-4xl font-semibold text-white">{roomsCount}</p>
                    <p className="mt-2 text-sm text-slate-400">Fuleda</p>
                </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-2">
                {quickLinks.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/40 hover:bg-white/10"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                            <ArrowRight className="mt-1 h-5 w-5 text-amber-300 transition group-hover:translate-x-1" />
                        </div>
                    </Link>
                ))}
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 text-white">
                    <Languages className="h-5 w-5 text-amber-300" />
                    <h3 className="text-lg font-semibold">Szybkie podglądy</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white">
                        Strona główna
                    </Link>
                    <Link href="/apartamenty/stranda/A103" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white">
                        Podgląd Stranda
                    </Link>
                    <Link href="/apartamenty/fuleda/parter" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white">
                        Podgląd Fuleda
                    </Link>
                    <Link href="/apartamenty/kisajno" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white">
                        Podgląd Kisajno
                    </Link>
                    <Link href="/domki" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white">
                        Podgląd Domków
                    </Link>
                </div>
            </section>
        </div>
    );
}
