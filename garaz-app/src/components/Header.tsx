import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#333333]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2">
                        <Wrench className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-white tracking-tight">
                            Garage Rent
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
                            Jak to działa
                        </Link>
                        <Link href="#pricing" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
                            Cennik
                        </Link>
                        <Link href="#location" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
                            Lokalizacja
                        </Link>
                    </nav>

                    <button className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded font-semibold text-sm">
                        Panel Klienta
                    </button>
                </div>
            </div>
        </header>
    );
}
