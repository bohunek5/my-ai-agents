const fs = require('fs');

async function main() {
  const res = await fetch('https://cooken-store-demo.myshopify.com/password', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('./password_page.html', html);
  console.log('Saved page to password_page.html');
}

main().catch(console.error);
