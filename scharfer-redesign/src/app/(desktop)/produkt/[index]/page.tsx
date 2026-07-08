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

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.index === resolvedParams.index);
  if (!product) notFound();

  const power = product.name.split(' ').pop() || "";
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `Scharfer PRO ${power} ${product.specs.voltage} IP67`,
    "image": `https://www.scharfer.com.pl${product.img}`,
    "description": `Zasilacz LED ${power} ${product.specs.voltage} profesjonalny, wodoodporny IP67. Praca pod pełnym obciążeniem, 7 lat gwarancji.`,
    "sku": product.index,
    "mpn": product.index,
    "brand": {
      "@type": "Brand",
      "name": "Scharfer LED"
    },
    "gtin13": product.ean,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Moc wyjściowa",
        "value": power
      },
      {
        "@type": "PropertyValue",
        "name": "Napięcie wyjściowe",
        "value": product.specs.voltage
      },
      {
        "@type": "PropertyValue",
        "name": "Klasa szczelności",
        "value": "IP67"
      }
    ],
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
    <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div style={{ padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--c-heading)', marginBottom: '1.5rem', fontWeight: 800 }}>
          {product.name}
        </h1>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img src={product.img} alt={product.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }} />
          </div>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--c-heading)', marginBottom: '1rem', borderBottom: '2px solid var(--c-light-gray)', paddingBottom: '0.5rem' }}>Specyfikacja Techniczna</h2>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Indeks:</strong> <span style={{ color: 'var(--c-text)' }}>{product.index}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Kod EAN:</strong> <span style={{ color: 'var(--c-text)' }}>{product.ean}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Napięcie:</strong> <span style={{ color: 'var(--c-text)' }}>{product.specs.voltage}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Prąd:</strong> <span style={{ color: 'var(--c-text)' }}>{product.specs.current}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Wymiary:</strong> <span style={{ color: 'var(--c-text)' }}>{product.specs.dim}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Szczelność:</strong> <span style={{ color: 'var(--c-text)' }}>IP67</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Gwarancja:</strong> <span style={{ color: 'var(--c-text)' }}>7 lat</span></li>
              </ul>
            </div>
            
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', marginTop: '1rem', padding: '1rem 2rem', textDecoration: 'none' }}>
              Pobierz Kartę Katalogową (PDF)
            </a>
            
            <a href="/kontakt" className="btn-secondary" style={{ display: 'inline-block', textAlign: 'center', marginTop: '0.5rem', padding: '1rem 2rem', textDecoration: 'none' }}>
              Złóż zapytanie B2B
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
