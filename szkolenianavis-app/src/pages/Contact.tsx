import ContactComponent from '../components/Contact';

export default function Contact() {
    return (
        <div className="pt-12">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h1 className="text-5xl font-black text-navis-navy dark:text-white mb-4">Kontakt</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400">Jesteśmy do Twojej dyspozycji w każdej sprawie.</p>
            </div>
            <ContactComponent />
        </div>
    );
}
