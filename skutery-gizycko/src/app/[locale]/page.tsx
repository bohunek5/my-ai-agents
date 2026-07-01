import Hero from '@/components/Hero';
import About from '@/components/About';
import Fleet from '@/components/Fleet';
import HowItWorks from '@/components/HowItWorks';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Fleet />
      <HowItWorks />
      <Gallery />
      <Contact />
    </main>
  );
}
