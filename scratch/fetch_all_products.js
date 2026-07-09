const fs = require('fs');

async function fetchProducts() {
  console.log('Fetching password page to extract authenticity token...');
  
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
    console.error('Failed to parse authenticity_token! HTML snippet:', getHtml.substring(0, 1000));
    return;
  }
  const token = tokenMatch[1];
  console.log('Found authenticity_token:', token);

  // Extract initial cookies to send back
  const cookiesList = [];
  const matches = getCookies.matchAll(/([^=\s]+=[^;]+);/g);
  for (const m of matches) {
    cookiesList.push(m[1]);
  }
  const initialCookieHeader = cookiesList.join('; ');
  console.log('Sending initial cookies:', initialCookieHeader);

  // 2. POST to /password
  console.log('Posting password and token to storefront...');
  const postRes = await fetch('https://cooken-store-demo.myshopify.com/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': initialCookieHeader,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    body: `form_type=storefront_password&authenticity_token=${encodeURIComponent(token)}&password=engo`
  });

  const postCookies = postRes.headers.get('set-cookie') || '';
  console.log('POST Response cookies:', postCookies);

  // Parse storefront_digest
  let digest = '';
  const digestMatch = postCookies.match(/storefront_digest=[^;]+/);
  if (digestMatch) {
    digest = digestMatch[0];
  } else {
    // Check if it's already in the initial cookies or if there was a redirect
    const location = postRes.headers.get('location');
    console.log('POST Status:', postRes.status, 'Location:', location);
  }
  
  if (!digest) {
    // Try to check if we got redirect and cookies there
    console.error('Failed to get storefront_digest cookie from POST!');
    return;
  }
  
  console.log('Successfully authenticated! digest:', digest);

  // 3. Fetch products.json
  console.log('Fetching products.json...');
  const prodRes = await fetch('https://cooken-store-demo.myshopify.com/products.json?limit=50', {
    headers: {
      'Cookie': `${digest}; ${initialCookieHeader}`,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });

  if (!prodRes.ok) {
    console.error('Failed to fetch products.json, status:', prodRes.status);
    return;
  }

  const productsData = await prodRes.json();
  console.log(`Successfully fetched ${productsData.products.length} products!`);
  
  fs.writeFileSync('./all_products.json', JSON.stringify(productsData, null, 2));
  console.log('Saved to all_products.json');
}

fetchProducts().catch(err => console.error(err));
