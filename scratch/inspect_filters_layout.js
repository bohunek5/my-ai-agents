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

    // Nav to hidden filters page
    await navigate('https://cooken-store-demo.myshopify.com/collections/filter-hidden');
    await new Promise(r => setTimeout(r, 4000));
    
    const details = await evaluate(`(() => {
      // Find all buttons, drawers, or toggle elements related to filters
      const buttons = Array.from(document.querySelectorAll('button, a'))
        .filter(el => el.innerText.toLowerCase().includes('filter') || el.innerText.toLowerCase().includes('filtrowanie') || el.className.includes('filter'))
        .map(el => ({ text: el.innerText, tag: el.tagName, class: el.className, html: el.outerHTML }));
        
      // Look for a drawer wrapper (often contains drawer, offcanvas, modal, or facets)
      const drawers = Array.from(document.querySelectorAll('[class*="drawer"], [class*="offcanvas"], [class*="facets"], [id*="Drawer"], [id*="filter"]'))
        .map(el => ({ tag: el.tagName, id: el.id, class: el.className, html: el.outerHTML.substring(0, 300) }));
        
      return { buttons, drawers };
    })()`);
    fs.writeFileSync('./details_filters.json', JSON.stringify(details, null, 2));
    console.log('Saved filters layout details.');

    // Now let's find the list of ALL 360-degree image URLs from the 360-product page
    await navigate('https://cooken-store-demo.myshopify.com/products/360-product');
    await new Promise(r => setTimeout(r, 4000));
    
    const images360 = await evaluate(`(() => {
      // Find all image URLs containing "product360" or "360"
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src || img.dataset.src)
        .filter(src => src && (src.includes('product360') || src.includes('360_')));
    })()`);
    fs.writeFileSync('./images_360_list.json', JSON.stringify(images360, null, 2));
    console.log('Saved 360 images list.');

    ws.close();
  };
}

main().catch(console.error);
