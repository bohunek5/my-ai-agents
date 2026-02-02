export default function Footer() {
    return (
        <footer className="bg-navis-navy text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    {/* Maybe small logo here */}
                    <span className="text-xl font-bold tracking-widest text-white">NAVIS</span>
                    <span className="text-navis-gold font-medium text-sm">| YACHTING SCHOOL</span>
                </div>

                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Navis. All rights reserved.
                </p>

                <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-navis-gold transition-colors"><span className="material-symbols-outlined">facebook</span></a>
                    <a href="#" className="text-gray-400 hover:text-navis-gold transition-colors"><span className="material-symbols-outlined">alternate_email</span></a>
                </div>
            </div>
        </footer>
    );
}
