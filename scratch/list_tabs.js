async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const tabs = await res.json();
  console.log('Available tabs:');
  tabs.forEach(t => {
    console.log(`- Title: "${t.title}"`);
    console.log(`  URL: ${t.url}`);
    console.log(`  WebSocket URL: ${t.webSocketDebuggerUrl}`);
    console.log(`  ID: ${t.id}`);
    console.log('---');
  });
}

main().catch(console.error);
