import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologia zasilaczy Scharfer – IP67, 100% mocy',
  description: 'Aluminiowa obudowa, zalanie żywicą, zabezpieczenia OVP/SCP/OTP/OLP, testy Burn-in. Poznaj budowę zasilaczy LED Scharfer.',
  alternates: {
    canonical: 'https://www.scharfer.com.pl/poznaj/',
  },
  openGraph: {
    title: 'Technologia zasilaczy Scharfer – IP67, 100% mocy',
    description: 'Aluminiowa obudowa, zalanie żywicą, zabezpieczenia OVP/SCP/OTP/OLP, testy Burn-in. Poznaj budowę zasilaczy LED Scharfer.',
    url: 'https://www.scharfer.com.pl/poznaj/',
  },
};

export default function PoznajLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
