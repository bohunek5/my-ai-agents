const fs = require('fs');

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page' && t.url && t.url.includes('shopify'));
  if (!target) return;
  
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  
  ws.onopen = async () => {
    const evaluate = (expression) => {
      return new Promise((resolve) => {
        const id = Math.floor(Math.random() * 1000000);
        const onMsg = (event) => {
          const response = JSON.parse(event.data);
          if (response.id === id) {
            ws.removeEventListener('message', onMsg);
            resolve(response.result?.result?.value);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({
          id,
          method: 'Runtime.evaluate',
          params: { expression, awaitPromise: true, returnByValue: true }
        }));
      });
    };

    const navigate = (url) => {
      return new Promise((resolve) => {
        const id = Math.floor(Math.random() * 1000000);
        const onMsg = (event) => {
          const response = JSON.parse(event.data);
          if (response.id === id) {
            ws.removeEventListener('message', onMsg);
            resolve();
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id, method: 'Page.navigate', params: { url } }));
      });
    };

    // Inspect 360 viewer element
    await navigate('https://cooken-store-demo.myshopify.com/products/360-product');
    await new Promise(r => setTimeout(r, 4000));
    
    // Let's click the 360 trigger if it's there or evaluate it directly
    const details360 = await evaluate(`(() => {
      const viewer = document.querySelector('xo-360-viewer');
      if (!viewer) return { error: 'xo-360-viewer not found' };
      
      // Let's find images used inside the 360 sequence
      // Many 360 viewers have a json config or a list of images
      const scriptConfigs = Array.from(document.querySelectorAll('script[type="application/json"]'))
        .map(s => s.innerText)
        .filter(t => t.includes('360') || t.includes('product360'));
        
      return {
        outerHTML: viewer.outerHTML,
        attributes: Array.from(viewer.attributes).map(a => ({ name: a.name, value: a.value })),
        scriptConfigs
      };
    })()`);
    fs.writeFileSync('./details_360.json', JSON.stringify(details360, null, 2));
    console.log('Saved 360 details.');

    // Inspect 3D Model element
    await navigate('https://cooken-store-demo.myshopify.com/products/product-ar-3d');
    await new Promise(r => setTimeout(r, 4000));
    
    // Let's click the poster to load the 3D model, then inspect it
    await evaluate(`(() => {
      const poster = document.querySelector('.xb-product-model__poster');
      if (poster) poster.click();
    })()`);
    await new Promise(r => setTimeout(r, 4000)); // wait for model to load
    
    const details3d = await evaluate(`(() => {
      const modelEl = document.querySelector('xo-product-model');
      if (!modelEl) return { error: 'xo-product-model not found' };
      
      const innerHTML = modelEl.innerHTML;
      
      // Look for model-viewer inside the shadow DOM or loaded after click
      const modelViewerTag = modelEl.querySelector('model-viewer')?.outerHTML || 'not found in light DOM';
      
      // Let's search JSON scripts for GLB files
      const glbUrls = Array.from(document.querySelectorAll('script'))
        .map(s => s.innerText)
        .filter(t => t.includes('.glb') || t.includes('.gltf'));

      return {
        outerHTML: modelEl.outerHTML,
        modelViewerTag,
        glbUrls: glbUrls.map(t => t.substring(0, 1000)) // truncate just in case
      };
    })()`);
    fs.writeFileSync('./details_3d.json', JSON.stringify(details3d, null, 2));
    console.log('Saved 3D details.');

    ws.close();
  };
}

main().catch(console.error);
