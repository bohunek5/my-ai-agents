import type { Metadata } from "next";
import "./globals.css";
import MobileRedirect from "@/components/MobileRedirect";
import ScrollToTop from "@/components/ScrollToTop";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

export const metadata: Metadata = {
  title: "Zasilacze LED Scharfer | 7 Lat Gwarancji | Praca pod pełnym obciążeniem 100%",
  description: "Poszerz swoją ofertę o niezawodne, wodoodporne zasilacze LED Scharfer (IP67). 7 lat gwarancji i praca pod pełnym obciążeniem 100%. Zostań oficjalnym dystrybutorem!",
  keywords: "zasilacze led, wodoodporne zasilacze, zasilacze ip67, hurtownia zasilaczy, zasilacze b2b, scharfer, zasilacze 12v, zasilacze 24v, praca pod obciążeniem, dystrybutor led",
  verification: {
    google: "MRqVCJkgOQ9mK65AkJU2Hl-cjdRjG2ziBsTLPZl4mdA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <AccessibilityProvider>
          <MobileRedirect>
            <ScrollToTop />
            {children}
          </MobileRedirect>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
