import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

export const metadata = {
  title: "Mazury Aktywnie - Luksusowy Czarter Houseboat Stillo 31 bez patentu",
  description: "Wynajmij luksusowy jacht motorowy Stillo 31 na Mazurach. Houseboat bez patentu z bogatym wyposażeniem i dodatkami: SUP, e-bike. Zgodność z WCAG 2.1 AA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col min-h-screen overflow-x-hidden">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <Header />
            <main id="main-content" className="flex-grow pb-16 xl:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <ScrollToTop />
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
