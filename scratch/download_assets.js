const fs = require('fs');
const path = require('path');

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${url}: ${res.statusText}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Downloaded: ${path.basename(dest)}`);
    return true;
  } catch (e) {
    console.error(`Error downloading ${url}:`, e.message);
    return false;
  }
}

async function main() {
  const baseDir = '/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline';
  
  // 1. Download GLB
  const glbUrl = 'https://cooken-store-demo.myshopify.com/cdn/shop/3d/models/o/663ce6e9095bda1b/product-3D.glb';
  const glbDest = path.join(baseDir, 'models/product-3D.glb');
  console.log('Downloading GLB model...');
  await downloadFile(glbUrl, glbDest);

  // 2. Download Poster
  const posterUrl = 'https://cooken-store-demo.myshopify.com/cdn/shop/files/preview_images/product-3D.jpg?crop=center&height=1024&v=1762847364&width=600';
  const posterDest = path.join(baseDir, 'images/product-3D-poster.jpg');
  console.log('Downloading 3D poster...');
  await downloadFile(posterUrl, posterDest);

  // 3. Download 360 images
  console.log('Downloading 360 image sequence...');
  for (let i = 1; i <= 39; i++) {
    const imgUrl = `https://cooken-store-demo.myshopify.com/cdn/shop/files/product360-${i}.jpg?v=1762847356`;
    const imgDest = path.join(baseDir, `images/360/product360-${i}.jpg`);
    await downloadFile(imgUrl, imgDest);
  }
  console.log('All downloads finished.');
}

main().catch(console.error);
