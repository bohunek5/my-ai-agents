import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f0f0f] border-t border-white/5 py-12 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-4">Garage Rent</h3>
                        <p className="text-gray-500 max-w-sm">
                            Pierwszy w Giżycku profesjonalny warsztat samoobsługowy na godziny.
                            Naprawiaj swoje auto w komfortowych warunkach.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Szybkie linki</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Strona główna</a></li>
                            <li><a href="#how-it-works" className="text-gray-500 hover:text-primary transition-colors">Jak to działa</a></li>
                            <li><a href="#pricing" className="text-gray-500 hover:text-primary transition-colors">Cennik</a></li>
                            <li><a href="#location" className="text-gray-500 hover:text-primary transition-colors">Kontakt</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Kontakt</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li>ul. Sybiraków 28</li>
                            <li>11-500 Giżycko</li>
                            <li className="pt-2 text-white">tel. +48 123 456 789</li>
                            <li>kontakt@garaz-rent.pl</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600">
                        &copy; {new Date().getFullYear()} Garage Rent. Wszelkie prawa zastrzeżone.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
