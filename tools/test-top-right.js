const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(ROOT, reqPath);
  const ext = path.extname(filePath);
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".png": "image/png"
  };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
});

async function run() {
  await new Promise(r => server.listen(8780, "127.0.0.1", r));
  const DEBUG_PORT = 9460;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=/tmp/chrome-tr-test`
  ]);
  await new Promise(r => setTimeout(r, 1200));

  try {
    const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:8780/index.html`, { method: "PUT" });
    const tab = await tabRes.json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = {};
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks[data.id]) {
        callbacks[data.id](data.result);
        delete callbacks[data.id];
      }
    };
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks[msgId] = resolve;
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }
    await new Promise(r => ws.onopen = r);
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 500));

    // Test 1: On index.html (no lang switch), brand on left, 2-line powered by ExamLytix on top right
    await send("Runtime.evaluate", {
      expression: `(() => {
        // Reset header to clean brand on left
        const header = document.querySelector(".site-header");
        header.innerHTML = \`
          <a class="brand" href="index.html">
            <img src="assets/img/icon.svg" alt="" width="28" height="28">
            <span class="brand__text">
              <span class="brand__title">ideoMap</span>
              <span class="brand__sub">Left or Right</span>
            </span>
          </a>
          <a href="https://examlytix.com" target="_blank" rel="noopener" class="header-powered-tr" aria-label="Powered by ExamLytix">
            <span class="powered-label">powered by</span>
            <span class="powered-brand"><span class="powered-logo-dot"></span>Exam<span class="brand-highlight">Lytix</span></span>
          </a>
        \`;

        const style = document.createElement("style");
        style.id = "tr-style";
        style.textContent = \`
          .header-powered-tr {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
            text-decoration: none;
            line-height: 1.15;
            flex-shrink: 0;
            user-select: none;
            -webkit-user-select: none;
            transition: opacity 0.15s ease;
          }
          .header-powered-tr:hover { opacity: 0.85; }
          .header-powered-tr .powered-label {
            font-family: 'Space Grotesk', -apple-system, sans-serif;
            font-size: 0.62rem;
            font-weight: 500;
            color: #64748b;
            letter-spacing: 0.04em;
            text-transform: lowercase;
          }
          .header-powered-tr .powered-brand {
            font-family: 'Space Grotesk', -apple-system, sans-serif;
            font-size: 0.84rem;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: 0.02em;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .header-powered-tr .powered-logo-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-image: url('assets/img/examlytix-logo.png');
            background-size: cover;
            display: inline-block;
          }
        \`;
        document.head.appendChild(style);
      })()`
    });
    await new Promise(r => setTimeout(r, 400));
    const shot1 = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 390, height: 200, scale: 1 } });
    fs.writeFileSync(path.join(ROOT, "screenshots", "tr-index-390px.png"), Buffer.from(shot1.data, "base64"));

    // Test 2: On start.html (has lang switch): brand on left, lang switch + powered by ExamLytix on right
    await send("Page.navigate", { url: "http://127.0.0.1:8780/start.html" });
    await new Promise(r => setTimeout(r, 600));

    await send("Runtime.evaluate", {
      expression: `(() => {
        const header = document.querySelector(".site-header");
        header.innerHTML = \`
          <a class="brand" href="index.html" data-link="index.html">
            <img src="assets/img/icon.svg" alt="" width="28" height="28">
            <span class="brand__text">
              <span class="brand__title">ideoMap</span>
              <span class="brand__sub">Left or Right</span>
            </span>
          </a>
          <div class="site-header__right">
            <a class="lang-switch" href="#" data-lang-switch>हिन्दी</a>
            <a href="https://examlytix.com" target="_blank" rel="noopener" class="header-powered-tr" aria-label="Powered by ExamLytix">
              <span class="powered-label">powered by</span>
              <span class="powered-brand"><span class="powered-logo-dot"></span>Exam<span class="brand-highlight">Lytix</span></span>
            </a>
          </div>
        \`;

        const style = document.createElement("style");
        style.textContent = \`
          .site-header__right {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
          }
          .header-powered-tr {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
            text-decoration: none;
            line-height: 1.15;
            flex-shrink: 0;
            user-select: none;
            -webkit-user-select: none;
            transition: opacity 0.15s ease;
          }
          .header-powered-tr:hover { opacity: 0.85; }
          .header-powered-tr .powered-label {
            font-family: 'Space Grotesk', -apple-system, sans-serif;
            font-size: 0.62rem;
            font-weight: 500;
            color: #64748b;
            letter-spacing: 0.04em;
            text-transform: lowercase;
          }
          .header-powered-tr .powered-brand {
            font-family: 'Space Grotesk', -apple-system, sans-serif;
            font-size: 0.84rem;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: 0.02em;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .header-powered-tr .powered-logo-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-image: url('assets/img/examlytix-logo.png');
            background-size: cover;
            display: inline-block;
          }
        \`;
        document.head.appendChild(style);
      })()`
    });
    await new Promise(r => setTimeout(r, 400));
    const shot2 = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 390, height: 200, scale: 1 } });
    fs.writeFileSync(path.join(ROOT, "screenshots", "tr-start-390px.png"), Buffer.from(shot2.data, "base64"));

    // Test 3: Narrow 320px screen
    await send("Emulation.setDeviceMetricsOverride", { width: 320, height: 600, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 400));
    const shot3 = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 320, height: 200, scale: 1 } });
    fs.writeFileSync(path.join(ROOT, "screenshots", "tr-start-320px.png"), Buffer.from(shot3.data, "base64"));

    console.log("Top-right test screenshots captured!");
    ws.close();
  } finally {
    chrome.kill();
    server.close();
  }
}
run().catch(console.error);
