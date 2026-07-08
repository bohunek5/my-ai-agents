import type { Metadata } from "next";
import "./globals.css";
import MobileRedirect from "@/components/MobileRedirect";
import ScrollToTop from "@/components/ScrollToTop";
import ForceScrollToTop from "@/components/ForceScrollToTop";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scharfer.com.pl"),
  title: "Zasilacze LED Scharfer IP67 | 7 lat gwarancji",
  description: "Wodoodporne zasilacze LED IP67 (12V/24V) z 7-letnią gwarancją i pracą pod 100% obciążenia. Zostań dystrybutorem Scharfer.",
  keywords: "zasilacze led, wodoodporne zasilacze, zasilacze ip67, hurtownia zasilaczy, zasilacze b2b, scharfer, zasilacze 12v, zasilacze 24v, praca pod obciążeniem, dystrybutor led",
  verification: {
    google: "MRqVCJkgOQ9mK65AkJU2Hl-cjdRjG2ziBsTLPZl4mdA",
  },
  alternates: {
    canonical: 'https://www.scharfer.com.pl/',
  },
  openGraph: {
    title: "Zasilacze LED Scharfer IP67 | 7 lat gwarancji",
    description: "Wodoodporne zasilacze LED IP67 (12V/24V) z 7-letnią gwarancją i pracą pod 100% obciążenia. Zostań dystrybutorem Scharfer.",
    url: 'https://www.scharfer.com.pl/',
    siteName: 'Scharfer LED',
    images: [
      {
        url: '/assets/scharfer_100.jpg',
        width: 1200,
        height: 630,
        alt: 'Scharfer LED Zasilacze',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zasilacze LED Scharfer IP67 | 7 lat gwarancji",
    description: "Wodoodporne zasilacze LED IP67 (12V/24V) z 7-letnią gwarancją.",
    images: ['/assets/scharfer_100.jpg'],
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
            <ForceScrollToTop />
            <ScrollToTop />
            {children}
          </MobileRedirect>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
