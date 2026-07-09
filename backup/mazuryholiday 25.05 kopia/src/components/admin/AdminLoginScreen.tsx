"use client";

import { FormEvent, useState } from "react";

type AdminLoginScreenProps = {
    onSuccess?: () => void;
};

export function AdminLoginScreen({ onSuccess }: AdminLoginScreenProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Nie udało się zalogować.");
            }

            if (onSuccess) {
                onSuccess();
            } else {
                window.location.reload();
            }
        } catch (loginError) {
            const message =
                loginError instanceof Error
                    ? loginError.message
                    : "Nie udało się zalogować.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-slate-950/50 backdrop-blur md:grid-cols-2">
                    <div className="flex flex-col justify-between border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-12">
                        <div>
                            <p className="mb-4 text-sm uppercase tracking-widest text-amber-300/90">
                                Mazury.Holiday CMS
                            </p>
                            <h1 className="max-w-md text-4xl font-semibold tracking-tight text-white md:text-5xl">
                                Panel administracyjny dla właściciela obiektu.
                            </h1>
                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
                                Ten panel służy do edycji treści strony bez pracy na kodzie. Zmiany zapisują
                                się bezpośrednio do plików projektu.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                Hero
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                Apartamenty i domki
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                Tłumaczenia PL / EN
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="admin-password">
                                    Hasło administratora
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 text-white outline-none transition focus:border-amber-400"
                                    placeholder="Wpisz hasło"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {error ? (
                                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-amber-500 px-4 py-4 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Logowanie..." : "Zaloguj się"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
