import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Garage Rent | Twój warsztat na godziny w Giżycku",
    description: "Wynajmij profesjonalny, w pełni wyposażony warsztat samochodowy na godziny. Podnośnik, narzędzia, ogrzewanie. Giżycko, ul. Sybiraków 28.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <body className={`${inter.variable} font-sans bg-[#1A1A1A] text-white antialiased`}>
                {children}
            </body>
        </html>
    );
}
