"use client";

import { useState } from "react";
import { AdminToast } from "@/components/admin/AdminToast";

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

type CottagesEditorProps = {
    initialData: SkorupkiData;
};

export function CottagesEditor({ initialData }: CottagesEditorProps) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(null);

    async function handleSave() {
        setLoading(true);

        try {
            const response = await fetch("/api/admin/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    section: "cottages",
                    payload: data
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Nie udało się zapisać domków.");
            }

            setToast({ message: "Domki zostały zapisane.", tone: "success" });
        } catch (saveError) {
            const message =
                saveError instanceof Error
                    ? saveError.message
                    : "Nie udało się zapisać domków.";
            setToast({ message, tone: "error" });
        } finally {
            setLoading(false);
            window.setTimeout(() => setToast(null), 2500);
        }
    }

    return (
        <div className="space-y-8">
            <AdminToast message={toast?.message ?? null} tone={toast?.tone} />

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <p className="text-xs uppercase tracking-widest text-amber-300/90">Domki</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Edytor oferty Skorupki</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                    Ta sekcja zapisuje podsumowanie oferty domków: nazwę, opis, cenę i maksymalną liczbę osób.
                </p>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm text-slate-300">
                                <span>Nazwa</span>
                                <input
                                    value={data.title}
                                    onChange={(event) => setData((current) => ({ ...current, title: event.target.value }))}
                                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                />
                            </label>
                            <label className="grid gap-2 text-sm text-slate-300">
                                <span>Cena od</span>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(event) => setData((current) => ({ ...current, price: Number(event.target.value) }))}
                                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                />
                            </label>
                            <label className="grid gap-2 text-sm text-slate-300">
                                <span>Max osób</span>
                                <input
                                    value={data.guests}
                                    onChange={(event) => setData((current) => ({ ...current, guests: event.target.value }))}
                                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                />
                            </label>
                        </div>

                        <label className="grid gap-2 text-sm text-slate-300">
                            <span>Opis</span>
                            <textarea
                                value={data.description}
                                onChange={(event) => setData((current) => ({ ...current, description: event.target.value }))}
                                rows={12}
                                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                            />
                        </label>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white">Skrót oferty</h3>
                    <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                        <p className="text-sm text-slate-400">Liczba domków</p>
                        <p className="mt-2 text-4xl font-semibold text-white">{data.unitsCount}</p>
                        <p className="mt-6 text-sm text-slate-400">Cena startowa</p>
                        <p className="mt-2 text-2xl font-semibold text-white">od {data.price} zł / doba</p>
                        <p className="mt-6 text-sm text-slate-400">Goście</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{data.guests} osób</p>
                    </div>

                    <a
                        href="/domki"
                        className="mt-6 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-400/40 hover:text-white"
                    >
                        Podgląd na stronie
                    </a>
                </div>
            </section>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Zapisywanie..." : "Zapisz domki"}
                </button>
            </div>
        </div>
    );
}
