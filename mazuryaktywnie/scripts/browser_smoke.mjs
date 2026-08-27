import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = mkdtempSync(join(tmpdir(), "mazuryaktywnie-smoke-"));
const port = 9333;
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  `--user-data-dir=${profile}`,
  `--remote-debugging-port=${port}`,
  "about:blank",
], { stdio: "ignore" });

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForChrome() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await pause(250);
  }
  throw new Error("Chrome DevTools did not start.");
}

async function main() {
  await waitForChrome();
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent("https://mazuryaktywnie.com.pl/reservation/")}`, { method: "PUT" }).then((response) => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await command("Page.enable");
  await command("Runtime.enable");
  await pause(4000);

  const evaluation = await command("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const next = document.querySelector('.rdp-button_next');
      if (!next) throw new Error('Nie znaleziono przycisku następnego miesiąca.');
      next.click();
      await wait(400);
      const dayButton = (iso) => {
        const cell = document.querySelector('[data-day="' + iso + '"]');
        return cell?.matches('button') ? cell : cell?.querySelector('button');
      };
      const blocked = dayButton('2026-09-07');
      const first = dayButton('2026-09-28');
      const second = dayButton('2026-09-29');
      if (!first || !second) throw new Error('Nie znaleziono dni testowych w kalendarzu.');
      first.click();
      await wait(300);
      const summary = () => {
        const pay = [...document.querySelectorAll('button')].find((button) => /Zarezerwuj i zapłać online/i.test(button.textContent || ''));
        return pay?.closest('div[class*="sticky"]')?.innerText || '';
      };
      const oneDay = summary();
      second.click();
      await wait(300);
      const twoDates = summary();
      const pay = [...document.querySelectorAll('button')].find((button) => /Zarezerwuj i zapłać online/i.test(button.textContent || ''));
      pay?.click();
      await wait(300);
      return {
        blockedDisabled: Boolean(blocked?.disabled),
        oneDayHasOne: /Liczba dni\\s*1/.test(oneDay),
        oneDayHasPrice: /1200 PLN/.test(oneDay),
        twoDatesHasOne: /Liczba dni\\s*1/.test(twoDates),
        twoDatesHasPrice: /1200 PLN/.test(twoDates),
        p24Modal: document.body.innerText.includes('Bezpieczna płatność Przelewy24'),
        hasCardField: Boolean(document.querySelector('#card-number')),
      };
    })()`,
  });

  const result = evaluation.result.value;
  console.log(JSON.stringify(result));
  const passed = result.blockedDisabled && result.oneDayHasOne && result.oneDayHasPrice
    && result.twoDatesHasOne && result.twoDatesHasPrice && result.p24Modal && !result.hasCardField;
  if (!passed) process.exitCode = 1;
  socket.close();
}

try {
  await main();
} finally {
  chrome.kill("SIGTERM");
}
