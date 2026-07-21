import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsData } from '@/data/scharferData';

interface ProductPageProps {
  params: Promise<{ index: string }>;
}

export function generateStaticParams() {
  return productsData.map((product) => ({
    index: product.index,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.index === resolvedParams.index);
  if (!product) return {};

  const title = `Zasilacz LED ${product.specs.voltage} ${product.name} | Scharfer`;
  const description = `Wodoodporny zasilacz LED ${product.name} IP67. Praca pod pełnym obciążeniem, certyfikaty CE/RoHS, 7 lat gwarancji. Kod EAN: ${product.ean}`;

  return {
    title,
    description,
    alternates: {
      // Mobile version canonical SHOULD point to the desktop version for SEO best practices
      canonical: `https://www.scharfer.com.pl/produkt/${product.index}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.scharfer.com.pl/produkt/${product.index}/`,
      images: [
        {
          url: `https://www.scharfer.com.pl${product.img}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function MobileProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.index === resolvedParams.index);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.scharfer.com.pl${product.img}`,
    "description": `Profesjonalny, wodoodporny zasilacz LED Scharfer o napięciu ${product.specs.voltage} i prądzie wyjściowym ${product.specs.current}. Klasa szczelności IP67, 7 lat gwarancji.`,
    "sku": product.index,
    "mpn": product.index,
    "brand": {
      "@type": "Brand",
      "name": "Scharfer LED"
    },
    "gtin13": product.ean,
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "1",
      "priceCurrency": "PLN",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "PRESCOT SP. Z O.O."
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.scharfer.com.pl/" },
      { "@type": "ListItem", "position": 2, "name": "Oferta", "item": "https://www.scharfer.com.pl/oferta/" },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://www.scharfer.com.pl/produkt/${product.index}/` }
    ]
  };

  return (
    <div style={{ padding: '80px 20px 40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '20px', fontWeight: 800 }}>
        {product.name}
      </h1>
      
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <img src={product.img} alt={product.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }} />
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#1a1a1a', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Specyfikacja Techniczna</h2>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Indeks:</strong> <span style={{ color: '#555' }}>{product.index}</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Kod EAN:</strong> <span style={{ color: '#555' }}>{product.ean}</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Napięcie:</strong> <span style={{ color: '#555' }}>{product.specs.voltage}</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Prąd:</strong> <span style={{ color: '#555' }}>{product.specs.current}</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Wymiary (L x W x H) [mm]:</strong> <span style={{ color: '#555' }}>{product.specs.dim}</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Szczelność:</strong> <span style={{ color: '#555' }}>IP67</span></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Gwarancja:</strong> <span style={{ color: '#555' }}>7 lat</span></li>
        </ul>
      </div>
      
      <a href={product.pdf} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#e60000', color: '#fff', padding: '15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, marginBottom: '10px' }}>
        Pobierz Kartę (PDF)
      </a>
      
      <a href="/mobile/kontakt" style={{ display: 'block', textAlign: 'center', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Zapytanie B2B
      </a>
    </div>
  );
}
