import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog zasilaczy LED 12V/24V IP67 | Scharfer',
  description: 'Pełny katalog wodoodpornych zasilaczy LED Scharfer 12V i 24V (18–400W), IP67, 7 lat gwarancji. Dane techniczne i EAN.',
  alternates: {
    canonical: 'https://www.scharfer.com.pl/oferta/',
  },
  openGraph: {
    title: 'Katalog zasilaczy LED 12V/24V IP67 | Scharfer',
    description: 'Pełny katalog wodoodpornych zasilaczy LED Scharfer 12V i 24V (18–400W), IP67, 7 lat gwarancji. Dane techniczne i EAN.',
    url: 'https://www.scharfer.com.pl/oferta/',
  },
};

export default function OfertaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
