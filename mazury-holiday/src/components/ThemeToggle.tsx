"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={cn("w-10 h-10", className)} />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500",
                className
            )}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <Sun
                    className="absolute inset-0 h-full w-full rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500"
                />
                <Moon
                    className="absolute inset-0 h-full w-full rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400"
                />
            </div>
        </button>
    );
}
