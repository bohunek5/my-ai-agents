const fs = require('fs');

async function main() {
  const wsUrl = 'ws://127.0.0.1:9222/devtools/page/F5FD68CAE1AEE5913B5B630A7B234FC3';
  console.log('Connecting to Chrome CDP WebSocket:', wsUrl);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log('Connected! Sending Runtime.evaluate command...');
    const command = {
      id: 1,
      method: 'Runtime.evaluate',
      params: {
        expression: "fetch('/products.json?limit=100').then(res => res.json())",
        awaitPromise: true,
        returnByValue: true
      }
    };
    ws.send(JSON.stringify(command));
  };
  
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (response.id === 1) {
      if (response.error) {
        console.error('CDP Error:', response.error);
      } else {
        const productsData = response.result.result.value;
        if (productsData && productsData.products) {
          console.log(`Successfully retrieved ${productsData.products.length} products!`);
          fs.writeFileSync('./all_products.json', JSON.stringify(productsData, null, 2));
          console.log('Saved to all_products.json');
        } else {
          console.error('Invalid products data response:', response.result);
        }
      }
      ws.close();
    }
  };
  
  ws.onerror = (err) => {
    console.error('WebSocket Error:', err);
  };
  
  ws.onclose = () => {
    console.log('WebSocket connection closed.');
  };
}

main().catch(console.error);
