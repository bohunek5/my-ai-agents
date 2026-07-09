const fs = require('fs');

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page' && t.url && t.url.includes('shopify'));
  if (!target) return;
  
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  
  ws.onopen = async () => {
    // Helper to evaluate script inside the tab
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

    // 1. Inspect 360 Product Elements
    await navigate('https://cooken-store-demo.myshopify.com/products/360-product');
    await new Promise(r => setTimeout(r, 4000));
    const elements360 = await evaluate(`(() => {
      const tags = Array.from(document.querySelectorAll('*'))
        .filter(el => el.tagName.toLowerCase().includes('xo-') || el.tagName.toLowerCase().includes('360') || el.tagName.toLowerCase().includes('model'))
        .map(el => ({ tag: el.tagName.toLowerCase(), id: el.id, class: el.className, html: el.outerHTML.substring(0, 300) }));
      return { url: window.location.href, tags };
    })()`);
    fs.writeFileSync('./components_360.json', JSON.stringify(elements360, null, 2));
    console.log('Saved 360 elements list.');

    // 2. Inspect AR 3D Product Elements
    await navigate('https://cooken-store-demo.myshopify.com/products/product-ar-3d');
    await new Promise(r => setTimeout(r, 4000));
    const elements3D = await evaluate(`(() => {
      const tags = Array.from(document.querySelectorAll('*'))
        .filter(el => el.tagName.toLowerCase().includes('xo-') || el.tagName.toLowerCase().includes('3D') || el.tagName.toLowerCase().includes('model'))
        .map(el => ({ tag: el.tagName.toLowerCase(), id: el.id, class: el.className, html: el.outerHTML.substring(0, 300) }));
      return { url: window.location.href, tags };
    })()`);
    fs.writeFileSync('./components_3d.json', JSON.stringify(elements3D, null, 2));
    console.log('Saved 3D elements list.');

    ws.close();
  };
}

main().catch(console.error);
