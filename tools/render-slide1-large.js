const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_PATH = path.join(ROOT, "insta_data/authoritarian-capitalism/slide_1_cover.jpg");

const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

const pillarBase64 = `data:image/png;base64,${fs.readFileSync(path.join(ROOT, "tools/pillar_emblem_clean.png")).toString("base64")}`;

const slide1Html = `<!DOCTYPE html>
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
      padding: 52px 64px 44px 64px;
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
      margin-bottom: 8px;
    }
    .brand-header-center {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-logo-img {
      width: 46px;
      height: 46px;
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
    .title-center-wrap {
      text-align: center;
      margin-top: 4px;
    }
    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 84px;
      font-weight: 400;
      line-height: 1.04;
      letter-spacing: -0.5px;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 26px;
      color: #475569;
      font-weight: 500;
    }
    .emblem-stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 4px 0;
    }
    .emblem-img {
      height: 840px;
      width: auto;
      object-fit: contain;
      mix-blend-mode: multiply;
      -webkit-mask-image: radial-gradient(ellipse at center, black 65%, transparent 95%);
      mask-image: radial-gradient(ellipse at center, black 65%, transparent 95%);
    }
    .floating-badge {
      position: absolute;
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 12px 28px rgba(0,0,0,0.08);
      border-radius: 999px;
      padding: 14px 26px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #0F172A;
      z-index: 3;
    }
    .badge-pos1 {
      top: 100px;
      left: 10px;
    }
    .badge-pos2 {
      bottom: 100px;
      right: 10px;
    }
    .bottom-cta-banner {
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      border-radius: 24px;
      padding: 20px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      margin-bottom: 12px;
    }
    .banner-left {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 22px;
      font-weight: 600;
      color: #0F172A;
    }
    .banner-right {
      font-size: 22px;
      font-weight: 700;
      color: #4F46E5;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 14px;
      border-top: 1px solid #E2E8F0;
      color: #64748B;
      font-size: 19px;
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
    <div class="slide-counter">1 / 6</div>
  </div>

  <div class="title-center-wrap">
    <h1>Authoritarian Capitalism</h1>
    <div class="subtitle">Strict Rule + Fast-Track Growth</div>
  </div>

  <div class="emblem-stage">
    <div class="floating-badge badge-pos1">
      <span>📈</span> Pro-Market Speed
    </div>
    <img src="${pillarBase64}" class="emblem-img" alt="Authoritarian Capitalism Emblem" />
    <div class="floating-badge badge-pos2">
      <span>🏛️</span> Iron-Clad Authority
    </div>
  </div>

  <div class="bottom-cta-banner">
    <div class="banner-left">
      <span>💡</span> Swipe to decode the philosophy
    </div>
    <div class="banner-right">
      <span>Swipe 👉</span>
    </div>
  </div>

  <div class="footer-bar">
    <span>Modern Ideology Decoder</span>
    <span>ideomap.in</span>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(slide1Html);
});

server.listen(9892, "127.0.0.1", async () => {
  const DEBUG_PORT = 9559;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:9892/`, { method: "PUT" });
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
  console.log("Successfully re-rendered Slide 1 with feathered mask:", OUT_PATH);

  ws.close();
  chrome.kill();
  server.close();
  process.exit(0);
});
