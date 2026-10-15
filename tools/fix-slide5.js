const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_PATH = path.join(ROOT, "insta_data/authoritarian-capitalism/slide_5_compass.jpg");

const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

const slide5Html = `<!DOCTYPE html>
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
    .compass-card {
      background: #FFFFFF;
      border-radius: 32px;
      padding: 34px 38px 30px 38px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.06);
      border: 1px solid rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
      margin-bottom: 16px;
    }
    /* Grid enlarged to 720px x 720px to fill the card! */
    .compass-grid-wrapper {
      width: 720px;
      height: 720px;
      position: relative;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(0,0,0,0.06);
      border: 2px solid #CBD5E1;
    }
    .quadrant {
      position: absolute;
      width: 50%;
      height: 50%;
    }
    .q-tl { top: 0; left: 0; background: #FFF1F2; }
    .q-tr { top: 0; right: 0; background: #EEF2FF; }
    .q-bl { bottom: 0; left: 0; background: #F0FDF4; }
    .q-br { bottom: 0; right: 0; background: #FEF9C3; }
    
    .axis-v {
      position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 2.5px;
      background: #475569;
      transform: translateX(-50%);
      z-index: 2;
    }
    .axis-h {
      position: absolute;
      left: 0; right: 0; top: 50%;
      height: 2.5px;
      background: #475569;
      transform: translateY(-50%);
      z-index: 2;
    }
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px);
      background-size: 72px 72px;
      z-index: 1;
    }
    .label-axis {
      position: absolute;
      font-size: 16px;
      font-weight: 800;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      z-index: 3;
      background: rgba(255, 255, 255, 0.7);
      padding: 3px 10px;
      border-radius: 6px;
    }
    .label-auth { top: 12px; left: 50%; transform: translateX(-50%); }
    .label-lib { bottom: 12px; left: 50%; transform: translateX(-50%); }
    .label-left { left: 12px; top: 50%; transform: translateY(-50%); }
    .label-right { right: 12px; top: 50%; transform: translateY(-50%); }

    .quad-tag {
      position: absolute;
      font-size: 14px;
      font-weight: 700;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      z-index: 3;
      padding: 6px 12px;
      border-radius: 8px;
    }
    .tag-tl { top: 14px; left: 14px; background: rgba(255, 255, 255, 0.8); }
    .tag-tr {
      top: 14px;
      right: 14px;
      background: #4F46E5;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    .tag-bl { bottom: 14px; left: 14px; background: rgba(255, 255, 255, 0.8); }
    .tag-br { bottom: 14px; right: 14px; background: rgba(255, 255, 255, 0.8); }

    /* Pin marker at x: +55%, y: +75% */
    /* Center of 720px is 360px. */
    /* x = 360 + (360 * 0.55) = 558px. */
    /* y = 360 - (360 * 0.75) = 90px. */
    .pin-glow {
      position: absolute;
      left: 558px;
      top: 90px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(79, 70, 229, 0.35);
      transform: translate(-50%, -50%);
      z-index: 4;
    }
    .pin-core {
      position: absolute;
      left: 558px;
      top: 90px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #4F46E5;
      border: 4px solid #FFFFFF;
      box-shadow: 0 0 18px rgba(79, 70, 229, 0.95);
      transform: translate(-50%, -50%);
      z-index: 5;
    }
    .compass-summary {
      display: flex;
      align-items: center;
      gap: 18px;
      width: 100%;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 22px;
      padding: 20px 28px;
    }
    .compass-badge {
      background: #4F46E5;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 21px;
      padding: 10px 24px;
      border-radius: 9999px;
      white-space: nowrap;
    }
    .compass-text {
      font-size: 20px;
      color: #1E293B;
      font-weight: 500;
      line-height: 1.4;
    }
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
  <div>
    <div class="top-nav-bar">
      <div style="width: 70px;"></div>
      <div class="brand-header-center">
        <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
        <span class="brand-header-title">ideoMap</span>
      </div>
      <div class="slide-counter">5 / 6</div>
    </div>

    <div class="title-wrap">
      <h1>Where It Sits on the Compass</h1>
      <div class="subtitle">Exact ideological quadrant mapping</div>
    </div>
  </div>

  <div class="compass-card">
    <div class="compass-grid-wrapper">
      <div class="quadrant q-tl"></div>
      <div class="quadrant q-tr"></div>
      <div class="quadrant q-bl"></div>
      <div class="quadrant q-br"></div>
      <div class="grid-lines"></div>
      <div class="axis-v"></div>
      <div class="axis-h"></div>
      <div class="label-axis label-auth">Authority</div>
      <div class="label-axis label-lib">Liberty</div>
      <div class="label-axis label-left">Equality</div>
      <div class="label-axis label-right">Markets</div>
      <div class="quad-tag tag-tl">Auth Left</div>
      <div class="quad-tag tag-tr">★ Auth Right</div>
      <div class="quad-tag tag-bl">Lib Left</div>
      <div class="quad-tag tag-br">Lib Right</div>
      <div class="pin-glow"></div>
      <div class="pin-core"></div>
    </div>
    <div class="compass-summary">
      <div class="compass-badge">Authoritarian Right</div>
      <div class="compass-text">High state authority combined with aggressive, pro-market capitalism.</div>
    </div>
  </div>

  <div class="footer-bar">
    <span>Swipe for Real-World Track Record</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(slide5Html);
});

server.listen(9896, "127.0.0.1", async () => {
  const DEBUG_PORT = 9563;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:9896/`, { method: "PUT" });
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
  console.log("Successfully re-rendered Slide 5 with 720px compass filling the box:", OUT_PATH);

  ws.close();
  chrome.kill();
  server.close();
  process.exit(0);
});
