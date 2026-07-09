const fs = require('fs');

async function main() {
  console.log('Fetching active Chrome targets...');
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  
  // Find a target we can use (prefer a shopify or localhost one)
  const target = targets.find(t => t.type === 'page' && t.url && (t.url.includes('shopify') || t.url.includes('localhost')));
  if (!target) {
    console.error('No suitable target found. Targets:', targets);
    return;
  }
  
  const wsUrl = target.webSocketDebuggerUrl;
  console.log(`Connecting to Target: ${target.title} (${target.url})`);
  console.log(`WS URL: ${wsUrl}`);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = async () => {
    console.log('Connected! Starting navigation and inspection sequence...');
    
    // Helper to evaluate script inside the tab
    const evaluate = (expression) => {
      return new Promise((resolve) => {
        const id = Math.floor(Math.random() * 1000000);
        const onMsg = (event) => {
          const response = JSON.parse(event.data);
          if (response.id === id) {
            ws.removeEventListener('message', onMsg);
            if (response.error) {
              resolve({ error: response.error });
            } else {
              resolve(response.result);
            }
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({
          id,
          method: 'Runtime.evaluate',
          params: {
            expression,
            awaitPromise: true,
            returnByValue: true
          }
        }));
      });
    };

    // Helper to navigate the tab
    const navigate = (url) => {
      return new Promise((resolve) => {
        const id = Math.floor(Math.random() * 1000000);
        const onMsg = (event) => {
          const response = JSON.parse(event.data);
          if (response.id === id) {
            ws.removeEventListener('message', onMsg);
            resolve(response.result);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({
          id,
          method: 'Page.navigate',
          params: { url }
        }));
      });
    };

    // Enable Page domain
    ws.send(JSON.stringify({ id: 9999, method: 'Page.enable' }));

    // Wait a bit
    await new Promise(r => setTimeout(r, 1000));

    // 1. Inspect 360-product
    console.log('\n--- Navigating to 360-product ---');
    await navigate('https://cooken-store-demo.myshopify.com/products/360-product');
    console.log('Waiting 5s for page render...');
    await new Promise(r => setTimeout(r, 5000));
    
    let result = await evaluate(`(() => {
      // Look for 360 tags or scripts or image list
      const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
      const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src || s.innerText.substring(0, 100));
      const htmlSnippet = document.querySelector('.product-media-container, .product-single__media, .product__media-wrapper')?.outerHTML || document.body.innerHTML.substring(0, 1000);
      return { url: window.location.href, imagesCount: images.length, htmlSnippet, scriptsCount: scripts.length };
    })()`);
    fs.writeFileSync('./inspect_360_product.json', JSON.stringify(result, null, 2));
    console.log('Saved 360 inspection output.');

    // 2. Inspect AR 3D product
    console.log('\n--- Navigating to product-ar-3d ---');
    await navigate('https://cooken-store-demo.myshopify.com/products/product-ar-3d');
    console.log('Waiting 5s for page render...');
    await new Promise(r => setTimeout(r, 5000));
    
    result = await evaluate(`(() => {
      // Look for model-viewer or 3D tags
      const modelViewer = document.querySelector('model-viewer')?.outerHTML || 'not found';
      const xrButtons = Array.from(document.querySelectorAll('[data-shopify-xr]')).map(b => b.outerHTML);
      const htmlSnippet = document.querySelector('.product-media-container, .product-single__media, .product__media-wrapper')?.outerHTML || document.body.innerHTML.substring(0, 1000);
      return { url: window.location.href, modelViewer, xrButtons, htmlSnippet };
    })()`);
    fs.writeFileSync('./inspect_ar_3d.json', JSON.stringify(result, null, 2));
    console.log('Saved AR 3D inspection output.');

    // 3. Inspect filter-hidden
    console.log('\n--- Navigating to filter-hidden ---');
    await navigate('https://cooken-store-demo.myshopify.com/collections/filter-hidden');
    console.log('Waiting 5s for page render...');
    await new Promise(r => setTimeout(r, 5000));
    
    result = await evaluate(`(() => {
      const htmlSnippet = document.querySelector('.collection-filters, .facets, #CollectionFiltersForm')?.outerHTML || document.body.innerHTML.substring(0, 1000);
      return { url: window.location.href, htmlSnippet };
    })()`);
    fs.writeFileSync('./inspect_filters.json', JSON.stringify(result, null, 2));
    console.log('Saved Filters inspection output.');

    ws.close();
  };

  ws.onerror = (err) => {
    console.error('WebSocket Error:', err);
  };

  ws.onclose = () => {
    console.log('WS Connection closed.');
  };
}

main().catch(console.error);
