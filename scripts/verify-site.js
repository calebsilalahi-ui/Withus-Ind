const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8899;
const WEBSITE_DIR = path.join(__dirname, '..', 'website');

// Static file server
function startServer() {
  const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(WEBSITE_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    const ext = path.extname(filePath).toLowerCase();
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

// Simple CDP client over built-in WebSocket
class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.events = [];
    this.consoleLogs = [];

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.callbacks.has(data.id)) {
        const { resolve, reject } = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      } else if (data.method === 'Runtime.consoleAPICalled') {
        const text = (data.params.args || []).map(a => a.value || a.description || '').join(' ');
        this.consoleLogs.push({ type: data.params.type, text });
      } else if (data.method === 'Runtime.exceptionThrown') {
        this.consoleLogs.push({ type: 'error', text: data.params.exceptionDetails.text });
      }
    };
  }

  ready() {
    return new Promise((resolve) => {
      if (this.ws.readyState === WebSocket.OPEN) resolve();
      else this.ws.onopen = () => resolve();
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval error: ${res.exceptionDetails.text}`);
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log('--- STARTING VERIFICATION TEST SUITE ---');
  const server = await startServer();
  console.log(`Web server listening on http://localhost:${PORT}`);

  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--user-data-dir=/tmp/chrome_verify_profile',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  let tabs = null;
  for (let attempt = 0; attempt < 15; attempt++) {
    try {
      const res = await fetch('http://127.0.0.1:9333/json');
      tabs = await res.json();
      if (tabs && tabs.length > 0) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  let exitCode = 0;
  try {
    const cdp = new CDPClient(tabs[0].webSocketDebuggerUrl);
    await cdp.ready();
    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');

    const pages = [
      'index.html',
      'about.html',
      'services.html',
      'contact.html',
      'promoter-101.html',
      'privacy-policy.html',
      'terms.html'
    ];

    for (const page of pages) {
      console.log(`\nTesting page: ${page}...`);
      await cdp.send('Page.navigate', { url: `http://localhost:${PORT}/${page}` });
      await new Promise(r => setTimeout(r, 800));

      // Check footer injected
      const footerHtml = await cdp.eval('document.getElementById("site-footer")?.innerHTML');
      if (!footerHtml || footerHtml.length < 50) {
        console.error(`FAIL: ${page} footer is empty or missing!`);
        exitCode = 1;
      } else {
        console.log(`  ✓ Footer injected (${footerHtml.length} chars)`);
      }

      // Check for forbidden HQ strings in text
      const pageText = await cdp.eval('document.body.innerText');
      const forbidden = ['Treasury Tower', 'District 8', 'Unit J', 'Lt. 5', 'SCBD, Jakarta Selatan'];
      let foundForbidden = false;
      for (const str of forbidden) {
        if (pageText.includes(str)) {
          console.error(`  FAIL: ${page} contains forbidden HQ string: "${str}"`);
          foundForbidden = true;
          exitCode = 1;
        }
      }
      if (!foundForbidden) {
        console.log(`  ✓ Zero HQ physical office addresses found`);
      }

      // Check for forbidden filler badges
      const fillerBadges = ['[ISI]', '[VERIFIKASI]'];
      for (const badge of fillerBadges) {
        if (pageText.includes(badge)) {
          console.error(`  FAIL: ${page} contains filler badge: "${badge}"`);
          exitCode = 1;
        }
      }

      // Check WhatsApp number
      const hasOldNum = pageText.includes('+62 818') || pageText.includes('0818');
      if (hasOldNum) {
        console.error(`  FAIL: ${page} contains deprecated phone number!`);
        exitCode = 1;
      }
    }

    // Deep testing on index.html
    console.log('\n--- Deep Testing index.html Carousel & Interactions ---');
    await cdp.send('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
    await new Promise(r => setTimeout(r, 1000));

    // Test carousel config
    const carouselInfo = await cdp.eval(`(() => {
      const cc = window.CIRCULAR_CAROUSEL;
      if (!cc) return null;
      return {
        preset: cc.options.preset,
        cardWidth: cc.options.cardWidth,
        aspectRatio: cc.options.aspectRatio,
        speed: cc.options.speed,
        cardsCount: cc.cards.length,
        radius: cc.radius,
        containerW: cc.container.offsetWidth,
        containerH: cc.container.offsetHeight
      };
    })()`);
    console.log('Carousel Info:', carouselInfo);

    // Test drag vs click on carousel!
    console.log('Testing Carousel Drag vs Click Behavior...');
    const modalBeforeDrag = await cdp.eval('!document.getElementById("ev-modal")?.hidden');
    console.log(`Modal open before drag: ${modalBeforeDrag}`);

    // Simulate drag via JavaScript dispatch
    const dragResult = await cdp.eval(`(() => {
      const container = document.getElementById("ring-carousel");
      if (!container) return "no-container";
      const card = container.querySelector(".circular-carousel__card");
      if (!card) return "no-card";

      const rect = card.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      // Pointer down
      container.dispatchEvent(new PointerEvent("pointerdown", {
        clientX: startX,
        clientY: startY,
        button: 0,
        bubbles: true
      }));

      // Pointer move by 150px
      container.dispatchEvent(new PointerEvent("pointermove", {
        clientX: startX - 150,
        clientY: startY,
        bubbles: true
      }));

      // Pointer up
      container.dispatchEvent(new PointerEvent("pointerup", {
        clientX: startX - 150,
        clientY: startY,
        button: 0,
        bubbles: true
      }));

      // Normal browser fires click after drag
      card.dispatchEvent(new MouseEvent("click", {
        clientX: startX - 150,
        clientY: startY,
        bubbles: true
      }));

      return "dispatched";
    })()`);

    await new Promise(r => setTimeout(r, 400));
    const modalAfterDrag = await cdp.eval('!document.getElementById("ev-modal")?.hidden');
    console.log(`Modal open after drag gesture: ${modalAfterDrag}`);
    if (modalAfterDrag) {
      console.error('FAIL: Dragging the carousel erroneously opened the event modal!');
      exitCode = 1;
    } else {
      console.log('✓ Dragging the carousel did NOT open the event modal.');
    }

    // Close modal if open
    await cdp.eval('document.getElementById("modal-close-btn")?.click()');
    await new Promise(r => setTimeout(r, 500));

    // Test clicking a card directly
    console.log('Testing direct card click...');
    await cdp.eval(`(() => {
      const card = document.querySelector(".circular-carousel__card");
      if (card) {
        card.dispatchEvent(new PointerEvent("pointerdown", { clientX: 200, clientY: 200, button: 0, bubbles: true }));
        card.dispatchEvent(new PointerEvent("pointerup", { clientX: 200, clientY: 200, button: 0, bubbles: true }));
        card.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    })()`);
    await new Promise(r => setTimeout(r, 400));
    const modalAfterClick = await cdp.eval('!document.getElementById("ev-modal")?.hidden');
    console.log(`Modal open after card click: ${modalAfterClick}`);
    if (!modalAfterClick) {
      console.error('FAIL: Clicking a card did NOT open the event modal!');
      exitCode = 1;
    } else {
      console.log('✓ Clicking a card opened the event modal.');
    }

    // Test See Event button
    await cdp.eval('document.getElementById("modal-close-btn")?.click()');
    await new Promise(r => setTimeout(r, 400));
    await cdp.eval('document.getElementById("rc-open")?.click()');
    await new Promise(r => setTimeout(r, 400));
    const modalAfterSeeEvent = await cdp.eval('!document.getElementById("ev-modal")?.hidden');
    console.log(`Modal open after See Event click: ${modalAfterSeeEvent}`);
    if (!modalAfterSeeEvent) {
      console.error('FAIL: Clicking #rc-open did not open the modal!');
      exitCode = 1;
    } else {
      console.log('✓ Clicking See Event button opened the event modal.');
    }

    // Check promoter-101.html specific structures
    console.log('\n--- Deep Testing promoter-101.html Structures ---');
    await cdp.send('Page.navigate', { url: `http://localhost:${PORT}/promoter-101.html` });
    await new Promise(r => setTimeout(r, 800));

    const p101Check = await cdp.eval(`(() => {
      const pillars = document.querySelectorAll(".cost-pillars-grid .pillar-card");
      const table = document.querySelector(".table-wrap table.fin-table");
      const rows = table ? table.querySelectorAll("tbody tr") : [];
      return {
        pillarsCount: pillars.length,
        hasTable: !!table,
        rowsCount: rows.length
      };
    })()`);
    console.log('Promoter 101 Check:', p101Check);
    if (p101Check.pillarsCount !== 5) {
      console.error(`FAIL: Expected 5 cost pillars (including Ticketing Fees), found ${p101Check.pillarsCount}`);
      exitCode = 1;
    } else {
      console.log('✓ Found 5 cost pillars on the primary row.');
    }
    if (!p101Check.hasTable || p101Check.rowsCount < 8) {
      console.error(`FAIL: Missing or incomplete financial table: ${p101Check.rowsCount} rows`);
      exitCode = 1;
    } else {
      console.log(`✓ Financial table present with ${p101Check.rowsCount} rows.`);
    }

    cdp.close();
  } catch (err) {
    console.error('Test execution error:', err);
    exitCode = 1;
  } finally {
    chrome.kill();
    server.close();
  }

  console.log(`\nTEST SUITE COMPLETED WITH EXIT CODE: ${exitCode}`);
  process.exit(exitCode);
}

main();
