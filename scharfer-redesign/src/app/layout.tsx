import type { Metadata } from "next";
import "./globals.css";
import MobileRedirect from "@/components/MobileRedirect";

export const metadata: Metadata = {
  title: "Scharfer | Profesjonalne Zasilacze Instalacyjne LED 12V 24V",
  description: "Scharfer to producent niezawodnych, wodoodpornych zasilaczy LED IP67 (12V i 24V). Oferujemy 7 lat gwarancji, zgodność z normami i atrakcyjne warunki B2B. Zostań naszym dystrybutorem.",
  keywords: "zasilacze led, wodoodporne zasilacze, zasilacze ip67, hurtownia zasilaczy, zasilacze b2b, scharfer, zasilacze 12v, zasilacze 24v",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <MobileRedirect>
          {children}
        </MobileRedirect>
      </body>
    </html>
  );
}
