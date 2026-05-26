"use client";

import { useDeferredValue, useState } from "react";
import { AdminToast } from "@/components/admin/AdminToast";

type TranslationEditorProps = {
    initialTranslations: Record<string, unknown>;
};

function flattenStrings(value: unknown, prefix = ""): Record<string, string> {
    if (typeof value === "string") {
        return prefix ? { [prefix]: value } : {};
    }

    if (Array.isArray(value)) {
        return value.reduce<Record<string, string>>((accumulator, item, index) => {
            const nextPrefix = prefix ? `${prefix}.${index}` : String(index);
            return {
                ...accumulator,
                ...flattenStrings(item, nextPrefix)
            };
        }, {});
    }

    if (value && typeof value === "object") {
        return Object.entries(value).reduce<Record<string, string>>((accumulator, [key, nestedValue]) => {
            const nextPrefix = prefix ? `${prefix}.${key}` : key;
            return {
                ...accumulator,
                ...flattenStrings(nestedValue, nextPrefix)
            };
        }, {});
    }

    return {};
}

function cloneWithUpdatedValue(value: unknown, segments: string[], nextValue: string): unknown {
    if (segments.length === 0) {
        return nextValue;
    }

    const [head, ...rest] = segments;
    const index = Number(head);
    const isArrayIndex = Number.isInteger(index) && head === index.toString();

    if (Array.isArray(value)) {
        const clone = [...value];
        clone[index] = cloneWithUpdatedValue(clone[index], rest, nextValue);
        return clone;
    }

    const objectValue = value && typeof value === "object" ? value as Record<string, unknown> : {};
    return {
        ...objectValue,
        [isArrayIndex ? index : head]: cloneWithUpdatedValue(objectValue[head], rest, nextValue)
    };
}

export function TranslationsEditor({ initialTranslations }: TranslationEditorProps) {
    const [translations, setTranslations] = useState(initialTranslations);
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(null);

    const plTranslations = flattenStrings(translations.pl);
    const enTranslations = flattenStrings(translations.en);
    const allKeys = Array.from(new Set([...Object.keys(plTranslations), ...Object.keys(enTranslations)])).sort();
    const filteredKeys = allKeys.filter((key) => {
        const normalizedQuery = deferredQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return true;
        }

        return (
            key.toLowerCase().includes(normalizedQuery) ||
            (plTranslations[key] ?? "").toLowerCase().includes(normalizedQuery) ||
            (enTranslations[key] ?? "").toLowerCase().includes(normalizedQuery)
        );
    });

    function updateLanguage(language: "pl" | "en", path: string, value: string) {
        setTranslations((current) => ({
            ...current,
            [language]: cloneWithUpdatedValue(current[language], path.split("."), value)
        }));
    }

    async function handleSave() {
        setLoading(true);

        try {
            const response = await fetch("/api/admin/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    section: "translations",
                    payload: translations
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Nie udało się zapisać tłumaczeń.");
            }

            setToast({ message: "Tłumaczenia zostały zapisane.", tone: "success" });
        } catch (saveError) {
            const message =
                saveError instanceof Error
                    ? saveError.message
                    : "Nie udało się zapisać tłumaczeń.";
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
                <p className="text-xs uppercase tracking-widest text-amber-300/90">Translations</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Edytor tłumaczeń PL / EN</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                    Poniżej są wszystkie tekstowe pola znalezione w strukturach `pl` i `en`. Możesz filtrować po kluczu albo treści.
                </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <label className="grid gap-2 text-sm text-slate-300">
                    <span>Szukaj po kluczu lub treści</span>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                        placeholder="np. hero.title albo Zarezerwuj"
                    />
                </label>
            </section>

            <section className="space-y-4">
                {filteredKeys.map((key) => {
                    const plValue = plTranslations[key] ?? "";
                    const enValue = enTranslations[key] ?? "";
                    const multiline = plValue.includes("\n") || enValue.includes("\n") || plValue.length > 80 || enValue.length > 80;

                    return (
                        <div
                            key={key}
                            className="rounded-3xl border border-white/10 bg-white/5 p-5"
                        >
                            <p className="mb-4 font-mono text-xs text-amber-300/90">{key}</p>
                            <div className="grid gap-4 xl:grid-cols-2">
                                <label className="grid gap-2 text-sm text-slate-300">
                                    <span className="font-medium text-white">PL</span>
                                    {multiline ? (
                                        <textarea
                                            value={plValue}
                                            onChange={(event) => updateLanguage("pl", key, event.target.value)}
                                            rows={5}
                                            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                        />
                                    ) : (
                                        <input
                                            value={plValue}
                                            onChange={(event) => updateLanguage("pl", key, event.target.value)}
                                            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                        />
                                    )}
                                </label>

                                <label className="grid gap-2 text-sm text-slate-300">
                                    <span className="font-medium text-white">EN</span>
                                    {multiline ? (
                                        <textarea
                                            value={enValue}
                                            onChange={(event) => updateLanguage("en", key, event.target.value)}
                                            rows={5}
                                            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                        />
                                    ) : (
                                        <input
                                            value={enValue}
                                            onChange={(event) => updateLanguage("en", key, event.target.value)}
                                            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                                        />
                                    )}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </section>

            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                    Widoczne pola: {filteredKeys.length}
                </p>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Zapisywanie..." : "Zapisz tłumaczenia"}
                </button>
            </div>
        </div>
    );
}
