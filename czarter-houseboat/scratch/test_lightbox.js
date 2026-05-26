const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to czarter...');
  await page.goto('http://localhost:3000/czarter', { waitUntil: 'load' });
  
  console.log('Clicking the first image...');
  await page.waitForSelector('div.cursor-pointer.group:has(img)', { timeout: 10000 });
  await page.click('div.cursor-pointer.group:has(img)');
  
  await page.waitForTimeout(2000);
  console.log('Test complete');
  
  await browser.close();
})();
