import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt B2B – zostań dystrybutorem Scharfer',
  description: 'Skontaktuj się z działem B2B Prescot. Warunki hurtowe, rabaty i wyłączność terytorialna na zasilacze LED Scharfer.',
  alternates: {
    canonical: 'https://www.scharfer.com.pl/kontakt/',
  },
  openGraph: {
    title: 'Kontakt B2B – zostań dystrybutorem Scharfer',
    description: 'Skontaktuj się z działem B2B Prescot. Warunki hurtowe, rabaty i wyłączność terytorialna na zasilacze LED Scharfer.',
    url: 'https://www.scharfer.com.pl/kontakt/',
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
