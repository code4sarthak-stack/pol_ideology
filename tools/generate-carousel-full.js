const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/authoritarian-capitalism");

// Load base64 SVG logo
const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

// Load base64 pillar emblem for slide 1
let pillarBase64 = "";
const pillarPath = path.join(ROOT, "tools/pillar_emblem.png");
if (fs.existsSync(pillarPath)) {
  pillarBase64 = `data:image/png;base64,${fs.readFileSync(pillarPath).toString("base64")}`;
}

const sharedCss = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 896px;
    height: 1200px;
    background: #FAF8F5;
    font-family: 'Instrument Sans', -apple-system, sans-serif;
    color: #0F172A;
    padding: 56px 60px 48px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .brand-header-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .brand-logo-img {
    width: 44px;
    height: 44px;
    border-radius: 11px;
    box-shadow: 0 4px 14px rgba(79, 70, 229, 0.22);
    flex: none;
  }
  .brand-header-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-size: 38px;
    font-weight: 700;
    color: #0F172A;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 72px;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.5px;
    color: #0F172A;
    margin-bottom: 12px;
  }
  .subtitle {
    font-size: 24px;
    color: #475569;
    font-weight: 400;
  }
  .bento-card {
    background: #FFFFFF;
    border-radius: 28px;
    padding: 38px 42px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
  }
`;

function getBrandHeader() {
  return `
    <div class="brand-header-center">
      <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
      <span class="brand-header-title">ideoMap</span>
    </div>
  `;
}

// SLIDE 1
const slide1Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .title-section-center {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .emblem-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }
  .emblem-img {
    max-height: 520px;
    max-width: 480px;
    object-fit: contain;
    mix-blend-mode: multiply;
  }
  .swipe-tag {
    text-align: center;
    font-size: 21px;
    font-weight: 500;
    color: #64748B;
    padding: 12px 24px;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
    <div class="title-section-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">Strict Rule + Fast-Track Growth</div>
    </div>
  </div>
  <div class="emblem-wrapper">
    ${pillarBase64 ? `<img src="${pillarBase64}" class="emblem-img" alt="Authoritarian Capitalism Emblem" />` : ''}
  </div>
  <div class="swipe-tag">
    Swipe to decode 👉
  </div>
</body>
</html>`;

// SLIDE 2
const slide2Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 36px;
    margin-top: -30px;
  }
  .title-section {
    text-align: left;
  }
  .intro-card {
    background: #FFFFFF;
    border-radius: 30px;
    padding: 56px 48px;
    box-shadow: 0 18px 44px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
  }
  .intro-text {
    font-size: 34px;
    line-height: 1.48;
    color: #1E293B;
    font-weight: 500;
    letter-spacing: -0.3px;
  }
  .pills-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .pill-badge {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 9999px;
    padding: 16px 26px;
    font-size: 21px;
    font-weight: 600;
    color: #1E293B;
    box-shadow: 0 4px 14px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
  </div>
  <div class="main-content">
    <div class="title-section">
      <h1>What is Authoritarian Capitalism in Simple Terms?</h1>
    </div>
    <div class="intro-card">
      <div class="intro-text">
        A strong, disciplined government that drives high-speed business growth while banning strikes, protests, and political disruption.
      </div>
    </div>
    <div class="pills-row">
      <div class="pill-badge">⚡ High-Speed Growth</div>
      <div class="pill-badge">🏛️ Strict State Order</div>
      <div class="pill-badge">🚫 Zero Dissent</div>
    </div>
  </div>
  <div></div>
</body>
</html>`;

// SLIDE 3
const slide3Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    margin-top: -30px;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .card-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .card-category {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 16px;
    font-weight: 700;
    padding: 9px 20px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-amber { background: #D97706; }
  .pill-red { background: #DC2626; }
  .card-body-text {
    font-size: 25px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
  </div>
  <div class="main-content">
    <div>
      <h1>Culture & Freedom</h1>
      <div class="subtitle">Authoritarian Capitalism: Order Over Liberty</div>
    </div>
    <div class="cards-container">
      <div class="bento-card">
        <div class="card-top-row">
          <span class="card-category">SOCIETY & CULTURE</span>
          <span class="pill-indicator pill-amber">Social Stability</span>
        </div>
        <div class="card-body-text">
          Strict work ethic, traditional discipline, and social stability are prioritized to maximize national economic productivity.
        </div>
      </div>
      <div class="bento-card">
        <div class="card-top-row">
          <span class="card-category">CIVIL LIBERTIES</span>
          <span class="pill-indicator pill-red">State Authority</span>
        </div>
        <div class="card-body-text">
          The state heavily restricts political protests, independent labor unions, and opposition media to maintain uninterrupted commerce.
        </div>
      </div>
    </div>
  </div>
  <div></div>
</body>
</html>`;

// SLIDE 4
const slide4Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    margin-top: -30px;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .card-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .card-category {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 16px;
    font-weight: 700;
    padding: 9px 20px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-green { background: #059669; }
  .pill-indigo { background: #4338CA; }
  .card-body-text {
    font-size: 25px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
  </div>
  <div class="main-content">
    <div>
      <h1>Money & The World</h1>
      <div class="subtitle">State-Steered Capitalism on the Global Stage</div>
    </div>
    <div class="cards-container">
      <div class="bento-card">
        <div class="card-top-row">
          <span class="card-category">ECONOMY</span>
          <span class="pill-indicator pill-green">Free Enterprise</span>
        </div>
        <div class="card-body-text">
          Unleashes fierce private enterprise, low corporate taxes, and deregulated export zones, protected by decisive state power.
        </div>
      </div>
      <div class="bento-card">
        <div class="card-top-row">
          <span class="card-category">WORLD POLITICS</span>
          <span class="pill-indicator pill-indigo">Strategic Trade</span>
        </div>
        <div class="card-body-text">
          Aggressively courts foreign direct investment while fiercely defending domestic sovereignty and national security.
        </div>
      </div>
    </div>
  </div>
  <div></div>
</body>
</html>`;

// SLIDE 5
const slide5Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    margin-top: -20px;
  }
  .compass-card {
    background: #FFFFFF;
    border-radius: 28px;
    padding: 30px 36px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .compass-grid-wrapper {
    width: 500px;
    height: 500px;
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    border: 1.5px solid #CBD5E1;
    margin: 12px 0 24px 0;
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
    background-size: 62.5px 62.5px;
    z-index: 1;
  }
  .label-axis {
    position: absolute;
    font-size: 14px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    z-index: 3;
  }
  .label-auth { top: 12px; left: 50%; transform: translateX(-50%); }
  .label-lib { bottom: 12px; left: 50%; transform: translateX(-50%); }
  .label-left { left: 12px; top: 50%; transform: translateY(-50%); }
  .label-right { right: 12px; top: 50%; transform: translateY(-50%); }

  /* Pin marker at x: +55%, y: +75% */
  /* Center is 250px. x=+55 -> 250 + (250*0.55) = 387.5px. y=+75 (up) -> 250 - (250*0.75) = 62.5px. */
  .pin-glow {
    position: absolute;
    left: 388px;
    top: 63px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.35);
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  .pin-core {
    position: absolute;
    left: 388px;
    top: 63px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4F46E5;
    border: 3px solid #FFFFFF;
    box-shadow: 0 0 14px rgba(79, 70, 229, 0.9);
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .compass-summary {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    padding: 18px 24px;
  }
  .compass-badge {
    background: #4F46E5;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 19px;
    padding: 8px 20px;
    border-radius: 9999px;
    white-space: nowrap;
  }
  .compass-text {
    font-size: 18px;
    color: #1E293B;
    font-weight: 500;
    line-height: 1.35;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
  </div>
  <div class="main-content">
    <div>
      <h1>Where It Sits on the Compass</h1>
      <div class="subtitle">Exact ideological coordinate mapping</div>
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
        <div class="pin-glow"></div>
        <div class="pin-core"></div>
      </div>
      <div class="compass-summary">
        <div class="compass-badge">Authoritarian Right</div>
        <div class="compass-text">High state authority combined with aggressive, pro-market capitalism.</div>
      </div>
    </div>
  </div>
  <div></div>
</body>
</html>`;

// SLIDE 6
const slide6Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${sharedCss}
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    margin-top: -10px;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .card-record {
    border-left: 10px solid transparent;
  }
  .card-success {
    border-left-color: #16A34A;
  }
  .card-caution {
    border-left-color: #DC2626;
  }
  .card-header-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }
  .pill-status {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 6px 16px;
    border-radius: 9999px;
  }
  .pill-success {
    background: #DCFCE7;
    color: #15803D;
  }
  .pill-caution {
    background: #FEE2E2;
    color: #B91C1C;
  }
  .card-title {
    font-size: 23px;
    font-weight: 700;
    color: #0F172A;
  }
  .card-text {
    font-size: 19px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .cta-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
  .cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #4F46E5;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 600;
    padding: 18px 46px;
    border-radius: 9999px;
    box-shadow: 0 12px 28px rgba(79, 70, 229, 0.35);
    text-decoration: none;
    letter-spacing: -0.2px;
  }
  .cta-sub {
    font-size: 17px;
    color: #64748B;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div>
    ${getBrandHeader()}
  </div>
  <div class="main-content">
    <div>
      <h1>Real-World In Practice</h1>
      <div class="subtitle">Historical Precedents & Cautionary Lessons</div>
    </div>
    <div class="cards-container">
      <div class="bento-card card-record card-success">
        <div class="card-header-row">
          <span class="pill-status pill-success">🟢 Success Case</span>
          <span class="card-title">Singapore's Economic Miracle • 1965–1990</span>
        </div>
        <div class="card-text">
          Transformed from a vulnerable third-world port into a global financial powerhouse through strict social order and state-backed capitalism under Lee Kuan Yew.
        </div>
      </div>
      <div class="bento-card card-record card-caution">
        <div class="card-header-row">
          <span class="pill-status pill-caution">🔴 Cautionary Case</span>
          <span class="card-title">Pinochet's Violent Crackdowns • Chile, 1973–1990</span>
        </div>
        <div class="card-text">
          Radical free-market deregulation and privatization enforced through military dictatorship, dissolution of congress, and widespread human rights abuses.
        </div>
      </div>
    </div>
    <div class="cta-section">
      <div class="cta-btn">Discover your score • ideoMap.in</div>
      <div class="cta-sub">Take the free 12-question quiz to find your ideology</div>
    </div>
  </div>
  <div></div>
</body>
</html>`;

const slides = [
  { path: "/slide1", html: slide1Html, file: "slide_1_cover.jpg" },
  { path: "/slide2", html: slide2Html, file: "slide_2_intro.jpg" },
  { path: "/slide3", html: slide3Html, file: "slide_3_culture.jpg" },
  { path: "/slide4", html: slide4Html, file: "slide_4_economy.jpg" },
  { path: "/slide5", html: slide5Html, file: "slide_5_compass.jpg" },
  { path: "/slide6", html: slide6Html, file: "slide_6_track_record.jpg" }
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

const PORT = 9888;
server.listen(PORT, "127.0.0.1", async () => {
  const DEBUG_PORT = 9555;
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
      width: 896,
      height: 1200,
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
    console.log("Successfully rendered:", path.basename(outPath));
    ws.close();
  }

  try {
    for (const s of slides) {
      await captureSlide(s.path, path.join(OUT_DIR, s.file));
    }
    console.log("\nAll 6 slides rendered with centered layouts!");
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
