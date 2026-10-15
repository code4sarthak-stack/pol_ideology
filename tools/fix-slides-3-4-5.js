const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/authoritarian-capitalism");

const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

const sharedHead = (slideNum) => `
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
      margin-bottom: 16px;
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
      margin-bottom: 22px; /* Tight, direct connection to next box! */
    }
    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 80px;
      font-weight: 400;
      line-height: 1.04;
      letter-spacing: -0.5px;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 26px;
      color: #475569;
      font-weight: 400;
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
`;

function topBar(num) {
  return `
    <div class="top-nav-bar">
      <div style="width: 70px;"></div>
      <div class="brand-header-center">
        <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
        <span class="brand-header-title">ideoMap</span>
      </div>
      <div class="slide-counter">${num} / 6</div>
    </div>
  `;
}

// -------------------------------------------------------------
// SLIDE 3: CULTURE & FREEDOM (Tight gap, rich tall cards)
// -------------------------------------------------------------
const slide3Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(3)}
<style>
  .slide3-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .cards-stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .culture-card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 30px;
    padding: 38px 44px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-tag-title {
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 17px;
    font-weight: 700;
    padding: 8px 22px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-amber { background: #D97706; }
  .pill-red { background: #DC2626; }
  .card-quote-sub {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 34px;
    color: #0F172A;
    line-height: 1.2;
    margin: 4px 0;
  }
  .card-body-text {
    font-size: 23px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .card-micro-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 6px;
  }
  .micro-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #475569;
  }
</style>
</head>
<body>
  <div>
    ${topBar(3)}
    <div class="title-wrap">
      <h1>Culture & Freedom</h1>
      <div class="subtitle">Authoritarian Capitalism: Order Over Liberty</div>
    </div>
  </div>
  <div class="slide3-content">
    <div class="cards-stack">
      <div class="culture-card">
        <div class="card-header-line">
          <span class="card-tag-title">SOCIETY & CULTURE</span>
          <span class="pill-indicator pill-amber">Social Stability</span>
        </div>
        <div class="card-quote-sub">"Discipline and work ethic above individualism."</div>
        <div class="card-body-text">
          Strict work ethic, traditional family discipline, and social stability are prioritized to maximize national economic productivity and collective pride.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">Family Stability</span>
          <span class="micro-badge">Social Cohesion</span>
          <span class="micro-badge">Workforce Discipline</span>
        </div>
      </div>
      <div class="culture-card">
        <div class="card-header-line">
          <span class="card-tag-title">CIVIL LIBERTIES</span>
          <span class="pill-indicator pill-red">State Authority</span>
        </div>
        <div class="card-quote-sub">"Public order over political opposition."</div>
        <div class="card-body-text">
          The state heavily restricts political protests, independent labor unions, and opposition media to guarantee uninterrupted commerce and strict law enforcement.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">No Labor Strikes</span>
          <span class="micro-badge">State Surveillance</span>
          <span class="micro-badge">Controlled Dissent</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Swipe for Economy & World Politics</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// SLIDE 4: MONEY & THE WORLD (Tight gap, rich tall cards)
// -------------------------------------------------------------
const slide4Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(4)}
<style>
  .slide4-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .cards-stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .econ-card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 30px;
    padding: 38px 44px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-tag-title {
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 17px;
    font-weight: 700;
    padding: 8px 22px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-green { background: #059669; }
  .pill-indigo { background: #4338CA; }
  .card-quote-sub {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 34px;
    color: #0F172A;
    line-height: 1.2;
    margin: 4px 0;
  }
  .card-body-text {
    font-size: 23px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .card-micro-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 6px;
  }
  .micro-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #475569;
  }
</style>
</head>
<body>
  <div>
    ${topBar(4)}
    <div class="title-wrap">
      <h1>Money & The World</h1>
      <div class="subtitle">State-Steered Capitalism on the Global Stage</div>
    </div>
  </div>
  <div class="slide4-content">
    <div class="cards-stack">
      <div class="econ-card">
        <div class="card-header-line">
          <span class="card-tag-title">THE ECONOMY</span>
          <span class="pill-indicator pill-green">Free Enterprise</span>
        </div>
        <div class="card-quote-sub">"Aggressive pro-growth capitalism."</div>
        <div class="card-body-text">
          Unleashes fierce private enterprise, low corporate taxes, and deregulated export zones, protected and accelerated by decisive state power.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">Low Business Taxes</span>
          <span class="micro-badge">Free Market Zones</span>
          <span class="micro-badge">Fast-Track Approvals</span>
        </div>
      </div>
      <div class="econ-card">
        <div class="card-header-line">
          <span class="card-tag-title">WORLD POLITICS</span>
          <span class="pill-indicator pill-indigo">Strategic Trade</span>
        </div>
        <div class="card-quote-sub">"Welcome foreign investment, guard the borders."</div>
        <div class="card-body-text">
          Aggressively courts multinational corporations and foreign direct investment while fiercely defending domestic sovereignty and security.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">FDI Magnet</span>
          <span class="micro-badge">Global Finance Hub</span>
          <span class="micro-badge">Sovereign Defense</span>
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

// -------------------------------------------------------------
// SLIDE 5: POLITICAL COMPASS (Tight gap, centered prominent compass)
// -------------------------------------------------------------
const slide5Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(5)}
<style>
  .slide5-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .compass-card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 32px;
    padding: 34px 44px 30px 44px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .compass-grid-wrapper {
    width: 580px;
    height: 580px;
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0,0,0,0.06);
    border: 1.5px solid #CBD5E1;
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
    width: 2px;
    background: #64748B;
    transform: translateX(-50%);
    z-index: 2;
  }
  .axis-h {
    position: absolute;
    left: 0; right: 0; top: 50%;
    height: 2px;
    background: #64748B;
    transform: translateY(-50%);
    z-index: 2;
  }
  .grid-lines {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px);
    background-size: 72.5px 72.5px;
    z-index: 1;
  }
  .label-axis {
    position: absolute;
    font-size: 15px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 3;
  }
  .label-auth { top: 12px; left: 50%; transform: translateX(-50%); }
  .label-lib { bottom: 12px; left: 50%; transform: translateX(-50%); }
  .label-left { left: 12px; top: 50%; transform: translateY(-50%); }
  .label-right { right: 12px; top: 50%; transform: translateY(-50%); }

  .quad-tag {
    position: absolute;
    font-size: 13px;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 3;
  }
  .tag-tl { top: 14px; left: 14px; }
  .tag-tr { top: 14px; right: 14px; color: #4F46E5; font-weight: 700; }
  .tag-bl { bottom: 14px; left: 14px; }
  .tag-br { bottom: 14px; right: 14px; }

  /* Pin marker at x: +55%, y: +75% */
  /* Center is 290px. x=+55 -> 290 + (290*0.55) = 449.5px. y=+75 (up) -> 290 - (290*0.75) = 72.5px. */
  .pin-glow {
    position: absolute;
    left: 450px;
    top: 73px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.35);
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  .pin-core {
    position: absolute;
    left: 450px;
    top: 73px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #4F46E5;
    border: 3.5px solid #FFFFFF;
    box-shadow: 0 0 16px rgba(79, 70, 229, 0.95);
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
    padding: 22px 28px;
    margin-top: 14px;
  }
  .compass-badge {
    background: #4F46E5;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
    padding: 10px 24px;
    border-radius: 9999px;
    white-space: nowrap;
  }
  .compass-text {
    font-size: 19px;
    color: #1E293B;
    font-weight: 500;
    line-height: 1.4;
  }
</style>
</head>
<body>
  <div>
    ${topBar(5)}
    <div class="title-wrap">
      <h1>Where It Sits on the Compass</h1>
      <div class="subtitle">Exact ideological quadrant mapping</div>
    </div>
  </div>
  <div class="slide5-content">
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
  </div>
  <div class="footer-bar">
    <span>Swipe for Real-World Track Record</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

const slides = [
  { path: "/slide3", html: slide3Html, file: "slide_3_culture.jpg" },
  { path: "/slide4", html: slide4Html, file: "slide_4_economy.jpg" },
  { path: "/slide5", html: slide5Html, file: "slide_5_compass.jpg" }
];

const server = http.createServer((req, res) => {
  const match = slides.find(s => s.path === req.url);
  if (match) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(match.html);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 9893;
server.listen(PORT, "127.0.0.1", async () => {
  const DEBUG_PORT = 9560;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  async function captureSlide(urlPath, outPath) {
    const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:${PORT}${urlPath}`, { method: "PUT" });
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

    fs.writeFileSync(outPath, Buffer.from(shotRes.data, "base64"));
    console.log("Successfully re-rendered:", path.basename(outPath));
    ws.close();
  }

  try {
    for (const s of slides) {
      await captureSlide(s.path, path.join(OUT_DIR, s.file));
    }
    console.log("\nSlides 3, 4, 5 re-rendered with tight, seamless gap!");
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
