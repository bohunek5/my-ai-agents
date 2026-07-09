const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = './all_products.json';
const OUTPUT_FILE = './cooken-offline/js/products-data.js';
const IMAGES_DIR = './cooken-offline/public/images/products';

// Helper to download an image
async function downloadImage(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    return true;
  } catch (err) {
    console.error(`Failed to download image ${url}:`, err.message);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  console.log('Loading products from JSON...');
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const rawProducts = data.products;

  const processedProducts = [];

  for (let i = 0; i < rawProducts.length; i++) {
    const p = rawProducts[i];
    console.log(`[${i+1}/${rawProducts.length}] Processing "${p.title}" (ID: ${p.id})...`);

    // Parse options (Color, Size)
    let colors = [];
    let sizes = [];

    if (p.options) {
      p.options.forEach(opt => {
        const nameLower = opt.name.toLowerCase();
        if (nameLower.includes('color') || nameLower.includes('kolor')) {
          // Map color names to hex codes if we want, or keep raw names
          colors = opt.values.map(val => {
            const valLower = val.toLowerCase();
            if (valLower === 'black' || valLower === 'czarny') return '#000000';
            if (valLower === 'white' || valLower === 'biały') return '#ffffff';
            if (valLower === 'olive' || valLower === 'oliwkowy') return '#556b2f';
            if (valLower === 'orange' || valLower === 'pomarańczowy') return '#ff8c00';
            if (valLower === 'blue' || valLower === 'niebieski') return '#1e90ff';
            if (valLower === 'grey' || valLower === 'szary') return '#808080';
            if (valLower === 'brown' || valLower === 'brązowy') return '#8b4513';
            if (valLower === 'beige' || valLower === 'beżowy') return '#f5f5dc';
            if (valLower === 'gold' || valLower === 'złoty') return '#ffd700';
            return val; // Fallback to raw value
          });
        } else if (nameLower.includes('size') || nameLower.includes('rozmiar')) {
          sizes = opt.values;
        }
      });
    }

    // Download first image
    let localImagePath = '/images/placeholder.jpg';
    if (p.images && p.images.length > 0) {
      const imgUrl = p.images[0].src;
      const imgExt = path.extname(imgUrl.split('?')[0]) || '.jpg';
      const localFileName = `product_${p.id}${imgExt}`;
      const localDest = path.join(IMAGES_DIR, localFileName);
      
      console.log(`  Downloading image: ${imgUrl}`);
      const success = await downloadImage(imgUrl, localDest);
      if (success) {
        localImagePath = `/images/products/${localFileName}`;
      } else {
        console.log(`  Falling back to CDN image URL`);
        localImagePath = imgUrl; // Fallback to CDN URL if download fails
      }
    }

    // Default variant details
    const firstVariant = p.variants[0] || {};
    const price = parseFloat(firstVariant.price) || 0.0;
    const compareAtPrice = firstVariant.compare_at_price ? parseFloat(firstVariant.compare_at_price) : null;

    processedProducts.push({
      id: p.id,
      title: p.title,
      category: p.product_type || p.tags[0] || p.vendor || 'Akcesoria',
      price: price,
      compareAtPrice: compareAtPrice,
      description: p.body_html ? p.body_html.replace(/<\/?[^>]+(>|$)/g, "").trim().substring(0, 300) + '...' : 'Ekskluzywny produkt z kolekcji Cooken.',
      images: [localImagePath],
      colors: colors,
      sizes: sizes
    });
  }

  // Write out to products-data.js
  const fileContent = `export const products = ${JSON.stringify(processedProducts, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`Saved ${processedProducts.length} processed products to ${OUTPUT_FILE}`);
}

main().catch(console.error);
