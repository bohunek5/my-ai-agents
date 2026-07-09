const fs = require('fs');

async function main() {
  // 1. GET /password
  const getRes = await fetch('https://cooken-store-demo.myshopify.com/password', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });
  
  const getHtml = await getRes.text();
  const getCookies = getRes.headers.get('set-cookie') || '';
  
  // Parse authenticity_token
  const tokenMatch = getHtml.match(/name="authenticity_token"\s+value="([^"]+)"/);
  if (!tokenMatch) {
    console.error('Failed to parse authenticity_token!');
    return;
  }
  const token = tokenMatch[1];
  console.log('Found authenticity_token:', token);

  // Extract initial cookies
  const cookiesList = [];
  const matches = getCookies.matchAll(/([^=\s]+=[^;]+);/g);
  for (const m of matches) {
    cookiesList.push(m[1]);
  }
  const initialCookieHeader = cookiesList.join('; ');

  // 2. POST to /password
  console.log('Posting password and token...');
  const postRes = await fetch('https://cooken-store-demo.myshopify.com/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': initialCookieHeader,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Origin': 'https://cooken-store-demo.myshopify.com',
      'Referer': 'https://cooken-store-demo.myshopify.com/password'
    },
    body: `form_type=storefront_password&authenticity_token=${encodeURIComponent(token)}&password=engo`
  });

  const postHtml = await postRes.text();
  fs.writeFileSync('./post_response.html', postHtml);
  console.log('Saved POST response to post_response.html');
  console.log('POST status:', postRes.status);
  console.log('POST cookies:', postRes.headers.get('set-cookie'));
}

main().catch(console.error);
