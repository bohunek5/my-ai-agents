"use client";

type AdminToastProps = {
    message: string | null;
    tone?: "success" | "error";
};

export function AdminToast({ message, tone = "success" }: AdminToastProps) {
    if (!message) {
        return null;
    }

    return (
        <div className="fixed right-4 top-4 z-50">
            <div
                className={[
                    "rounded-2xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur",
                    tone === "success"
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                        : "border-red-500/40 bg-red-500/15 text-red-100"
                ].join(" ")}
            >
                {message}
            </div>
        </div>
    );
}
