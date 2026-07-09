const fs = require('fs');

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page' && t.url && t.url.includes('shopify'));
  if (!target) {
    console.error('No shopify target tab found.');
    return;
  }
  
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

    console.log('Fetching 360 product JSON inside Chrome tab...');
    const data360 = await evaluate(`fetch('/products/360-product.json').then(res => res.json())`);
    fs.writeFileSync('./product_360_raw.json', JSON.stringify(data360, null, 2));
    console.log('Saved product_360_raw.json');

    console.log('Fetching 3D product JSON inside Chrome tab...');
    const data3d = await evaluate(`fetch('/products/product-ar-3d.json').then(res => res.json())`);
    fs.writeFileSync('./product_ar_raw.json', JSON.stringify(data3d, null, 2));
    console.log('Saved product_ar_raw.json');

    ws.close();
  };
}

main().catch(console.error);
