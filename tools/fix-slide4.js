const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_PATH = path.join(ROOT, "insta_data/authoritarian-capitalism/slide_4_economy.jpg");

const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

const slide4Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      background: #FAF8F5;
      font-family: 'Instrument Sans', -apple-system, sans-serif;
      color: #0F172A;
      padding: 56px 68px 48px 68px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .top-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 12px;
    }
    .brand-header-center {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-logo-img {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.22);
      flex: none;
    }
    .brand-header-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-style: italic;
      font-size: 42px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: -0.5px;
      line-height: 1;
    }
    .slide-counter {
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      font-weight: 700;
      color: #64748B;
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      border-radius: 999px;
      padding: 8px 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .title-wrap {
      margin-top: 4px;
      margin-bottom: 20px;
    }
    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 80px;
      font-weight: 400;
      line-height: 1.04;
      letter-spacing: -0.5px;
      color: #0F172A;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 26px;
      color: #475569;
      font-weight: 400;
    }
    .cards-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 16px;
    }
    .bento-card {
      background: #FFFFFF;
      border-radius: 28px;
      padding: 34px 40px;
      box-shadow: 0 14px 36px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-category {
      font-size: 19px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #0F172A;
    }
    .pill-indicator {
      font-size: 16px;
      font-weight: 700;
      padding: 7px 20px;
      border-radius: 9999px;
      color: #FFFFFF;
    }
    .pill-green { background: #059669; }
    .pill-indigo { background: #4338CA; }
    .card-main-text {
      font-size: 22px;
      line-height: 1.48;
      color: #1E293B;
      font-weight: 500;
    }
    .examples-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: 18px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .example-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 19px;
      line-height: 1.4;
      color: #334155;
    }
    .example-tag {
      font-weight: 700;
      white-space: nowrap;
      flex: none;
    }
    .tag-good { color: #15803D; }
    .tag-bad { color: #B91C1C; }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 14px;
      border-top: 1px solid #E2E8F0;
      color: #64748B;
      font-size: 20px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="top-nav-bar">
    <div style="width: 70px;"></div>
    <div class="brand-header-center">
      <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
      <span class="brand-header-title">ideoMap</span>
    </div>
    <div class="slide-counter">4 / 6</div>
  </div>

  <div class="title-wrap">
    <h1>Money & The World</h1>
    <div class="subtitle">State-Steered Capitalism on the Global Stage</div>
  </div>

  <div class="cards-container">
    <!-- BOX 1: THE ECONOMY -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">THE ECONOMY</span>
        <span class="pill-indicator pill-green">Free Enterprise</span>
      </div>
      <div class="card-main-text">
        Unleashes fierce private enterprise, low corporate taxes, and deregulated export zones, protected and accelerated by decisive state power.
      </div>
      <div class="examples-box">
        <div class="example-row">
          <span class="example-tag tag-good">🟢 The Upside:</span>
          <span>Massive foreign investment inflow, lightning-fast infrastructure execution, low business taxes, and high GDP growth.</span>
        </div>
        <div class="example-row">
          <span class="example-tag tag-bad">🔴 The Price:</span>
          <span>Widening wealth inequality, minimal safety net for low-wage laborers, and cronyism favoring politically loyal conglomerates.</span>
        </div>
      </div>
    </div>

    <!-- BOX 2: WORLD POLITICS -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">WORLD POLITICS</span>
        <span class="pill-indicator pill-indigo">Strategic Trade</span>
      </div>
      <div class="card-main-text">
        Aggressively courts multinational corporations and foreign capital while fiercely defending domestic sovereignty and national security.
      </div>
      <div class="examples-box">
        <div class="example-row">
          <span class="example-tag tag-good">🟢 The Upside:</span>
          <span>Becomes an indispensable global trade and banking hub with sovereign geopolitical bargaining power.</span>
        </div>
        <div class="example-row">
          <span class="example-tag tag-bad">🔴 The Price:</span>
          <span>High vulnerability to international trade shocks and moral friction with Western democratic allies.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <span>Swipe for Political Compass</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(slide4Html);
});

server.listen(9895, "127.0.0.1", async () => {
  const DEBUG_PORT = 9562;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:9895/`, { method: "PUT" });
  const tab = await tabRes.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  await new Promise(resolve => ws.onopen = resolve);

  let id = 1;
  function send(method, params = {}) {
    return new Promise(resolve => {
      const curId = id++;
      const handler = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === curId) {
          ws.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1080,
    height: 1350,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => true)",
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 500));

  const shotRes = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 95
  });

  fs.writeFileSync(OUT_PATH, Buffer.from(shotRes.data, "base64"));
  console.log("Successfully re-rendered Slide 4 with upside/downside examples:", OUT_PATH);

  ws.close();
  chrome.kill();
  server.close();
  process.exit(0);
});
