"use client";

import { useState } from "react";
import { AdminToast } from "@/components/admin/AdminToast";

type HeroEditorProps = {
    initialHero: {
        title: string;
        subtitle: string;
        ctaText: string;
    };
};

export function HeroEditor({ initialHero }: HeroEditorProps) {
    const [hero, setHero] = useState(initialHero);
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
                    section: "hero",
                    payload: hero
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Nie udało się zapisać sekcji Hero.");
            }

            setToast({ message: "Sekcja Hero została zapisana.", tone: "success" });
        } catch (saveError) {
            const message =
                saveError instanceof Error
                    ? saveError.message
                    : "Nie udało się zapisać sekcji Hero.";
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
                <p className="text-xs uppercase tracking-widest text-amber-300/90">Hero</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Edytor strony głównej</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                    Zmieniasz główny nagłówek, podtytuł i tekst przycisku CTA. Ta sekcja zasila ekran startowy strony.
                </p>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="grid gap-6">
                        <label className="grid gap-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Tytuł strony głównej</span>
                            <input
                                value={hero.title}
                                onChange={(event) => setHero((current) => ({ ...current, title: event.target.value }))}
                                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                            />
                        </label>

                        <label className="grid gap-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Podtytuł / slogan</span>
                            <textarea
                                value={hero.subtitle}
                                onChange={(event) => setHero((current) => ({ ...current, subtitle: event.target.value }))}
                                rows={4}
                                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                            />
                        </label>

                        <label className="grid gap-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Tekst przycisku CTA</span>
                            <input
                                value={hero.ctaText}
                                onChange={(event) => setHero((current) => ({ ...current, ctaText: event.target.value }))}
                                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                            />
                        </label>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
                    <p className="text-sm font-medium text-slate-300">Podgląd treści</p>
                    <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
                        <p className="text-xs uppercase tracking-widest text-amber-300/90">Preview</p>
                        <h3 className="mt-6 text-4xl font-semibold leading-tight text-white">
                            {hero.title || "Tytuł sekcji hero"}
                        </h3>
                        <p className="mt-4 text-sm uppercase tracking-widest text-slate-300">
                            {hero.subtitle || "Podtytuł"}
                        </p>
                        <div className="mt-8 inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950">
                            {hero.ctaText || "CTA"}
                        </div>
                    </div>

                    <a
                        href="/"
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
                    {loading ? "Zapisywanie..." : "Zapisz Hero"}
                </button>
            </div>
        </div>
    );
}
