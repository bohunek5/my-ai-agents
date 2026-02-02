import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingCalendar from "@/components/BookingCalendar";
import LocationCard from "@/components/LocationCard";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white">
            <Header />
            <Hero />
            <BookingCalendar />
            <LocationCard />
            <Footer />
        </main>
    );
}
