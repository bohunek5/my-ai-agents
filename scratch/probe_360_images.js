const fs = require('fs');

async function main() {
  console.log('Probing for product360 image sequence...');
  const activeUrls = [];
  
  // We probe from 1 to 60
  for (let i = 1; i <= 60; i++) {
    const url = `https://cooken-store-demo.myshopify.com/cdn/shop/files/product360-${i}.jpg?v=1762847356`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status === 200) {
        activeUrls.push(url);
        console.log(`Found image: product360-${i}.jpg`);
      } else {
        // Try without query param
        const urlAlt = `https://cooken-store-demo.myshopify.com/cdn/shop/files/product360-${i}.jpg`;
        const resAlt = await fetch(urlAlt, { method: 'HEAD' });
        if (resAlt.status === 200) {
          activeUrls.push(urlAlt);
          console.log(`Found image: product360-${i}.jpg (no query)`);
        }
      }
    } catch (e) {
      console.error(`Error probing ${i}:`, e.message);
    }
  }

  console.log(`Probing complete. Found ${activeUrls.length} images.`);
  fs.writeFileSync('./probed_360_images.json', JSON.stringify(activeUrls, null, 2));
}

main().catch(console.error);
