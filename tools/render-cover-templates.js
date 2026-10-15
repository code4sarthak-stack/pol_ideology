const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/authoritarian-capitalism");

const svgContent = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

const sharedHead = `
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
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
    .title-center {
      text-align: center;
      margin-bottom: 20px;
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
    .swipe-tag {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #64748B;
      padding: 12px 24px;
    }
  </style>
`;

function brandHeader() {
  return `
    <div class="brand-header-center">
      <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
      <span class="brand-header-title">ideoMap</span>
    </div>
  `;
}

// -------------------------------------------------------------
// TEMPLATE 1: The Glass Terminal / Status Widget (Tech & Meme literate)
// -------------------------------------------------------------
const t1Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead}
<style>
  .t1-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 10px 0;
  }
  .t1-terminal {
    width: 100%;
    background: #0F172A;
    border-radius: 32px;
    padding: 36px 40px;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #F8FAFC;
    position: relative;
    overflow: hidden;
  }
  .t1-terminal::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
    border-radius: 50%;
  }
  .t1-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .t1-dots {
    display: flex;
    gap: 8px;
  }
  .t1-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot-r { background: #EF4444; }
  .dot-y { background: #F59E0B; }
  .dot-g { background: #10B981; }
  .t1-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .t1-rows {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .t1-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 16px 22px;
  }
  .t1-label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 500;
  }
  .t1-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 999px;
  }
  .val-green { background: rgba(16, 185, 129, 0.2); color: #34D399; }
  .val-red { background: rgba(239, 68, 68, 0.2); color: #F87171; }
  .val-blue { background: rgba(99, 102, 241, 0.25); color: #818CF8; }
  
  .t1-floating-pill {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 999px;
    padding: 12px 26px;
    font-size: 19px;
    font-weight: 600;
    color: #0F172A;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }
</style>
</head>
<body>
  <div>
    ${brandHeader()}
    <div class="title-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">Strict Rule + Fast-Track Growth</div>
    </div>
  </div>
  <div class="t1-container">
    <div class="t1-terminal">
      <div class="t1-top-bar">
        <div class="t1-dots">
          <span class="t1-dot dot-r"></span>
          <span class="t1-dot dot-y"></span>
          <span class="t1-dot dot-g"></span>
        </div>
        <span class="t1-tag">SYSTEM_SIMULATION // V1.0</span>
      </div>
      <div class="t1-rows">
        <div class="t1-row">
          <div class="t1-label"><span>📈</span> GDP Growth Priority</div>
          <div class="t1-val val-green">MAXIMUM (100%)</div>
        </div>
        <div class="t1-row">
          <div class="t1-label"><span>🤐</span> Public Protests & Strikes</div>
          <div class="t1-val val-red">BLOCKED (0%)</div>
        </div>
        <div class="t1-row">
          <div class="t1-label"><span>💼</span> Corporate Tax Havens</div>
          <div class="t1-val val-blue">UNRESTRICTED</div>
        </div>
      </div>
    </div>
    <div class="t1-floating-pill">
      <span>💡</span> "The Singapore & Pinochet Playbook"
    </div>
  </div>
  <div class="swipe-tag">
    Swipe to decode 👉
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// TEMPLATE 2: The High-Contrast Sticker / Subversive Editorial Zine
// -------------------------------------------------------------
const t2Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead}
<style>
  .t2-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 10px 0;
  }
  .t2-banner-strip {
    background: #0F172A;
    color: #F8FAFC;
    transform: rotate(-3deg);
    width: 108%;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    box-shadow: 0 16px 36px rgba(0,0,0,0.15);
    border-top: 3px solid #4F46E5;
    border-bottom: 3px solid #4F46E5;
    margin-bottom: 36px;
  }
  .t2-badge-center {
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #4F46E5, #1E1B4B);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 20px 50px rgba(79, 70, 229, 0.35);
    border: 8px solid #FFFFFF;
    color: #FFFFFF;
    text-align: center;
    position: relative;
  }
  .t2-badge-icon {
    font-size: 72px;
    margin-bottom: 8px;
  }
  .t2-badge-text {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 34px;
    line-height: 1.1;
  }
  .t2-sticker-1 {
    position: absolute;
    left: 40px;
    bottom: 40px;
    background: #FEF08A;
    color: #854D0E;
    border: 2px solid #EAB308;
    padding: 12px 22px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 20px;
    transform: rotate(-7deg);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
  }
  .t2-sticker-2 {
    position: absolute;
    right: 40px;
    top: 50px;
    background: #FEE2E2;
    color: #991B1B;
    border: 2px solid #EF4444;
    padding: 12px 22px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 20px;
    transform: rotate(6deg);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
  }
</style>
</head>
<body>
  <div>
    ${brandHeader()}
    <div class="title-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">Strict Rule + Fast-Track Growth</div>
    </div>
  </div>
  <div class="t2-container">
    <div class="t2-sticker-2">🚫 "NO PROTESTS"</div>
    <div class="t2-badge-center">
      <div class="t2-badge-icon">🏛️⚡</div>
      <div class="t2-badge-text">Order + Markets</div>
    </div>
    <div class="t2-sticker-1">📈 "GROWTH AT ALL COSTS"</div>
    <div class="t2-banner-strip">
      <span>FAST GROWTH</span> • <span>IRON DISCIPLINE</span> • <span>TOP DOLLAR</span>
    </div>
  </div>
  <div class="swipe-tag">
    Swipe to decode 👉
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// TEMPLATE 3: The Curiosity Gap / Split Dilemma (Billionaire vs Citizen)
// -------------------------------------------------------------
const t3Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead}
<style>
  .t3-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 22px;
    margin: 10px 0;
  }
  .t3-card {
    background: #FFFFFF;
    border-radius: 26px;
    padding: 32px 36px;
    box-shadow: 0 16px 36px rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    gap: 24px;
    position: relative;
  }
  .t3-card-left {
    border-left: 10px solid #16A34A;
  }
  .t3-card-right {
    border-left: 10px solid #DC2626;
  }
  .t3-icon-box {
    width: 68px;
    height: 68px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex: none;
  }
  .icon-green { background: #DCFCE7; }
  .icon-red { background: #FEE2E2; }
  .t3-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .t3-heading {
    font-size: 24px;
    font-weight: 700;
    color: #0F172A;
  }
  .t3-desc {
    font-size: 19px;
    color: #475569;
    line-height: 1.4;
  }
  .t3-vs-pill {
    align-self: center;
    background: #0F172A;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 800;
    padding: 8px 24px;
    border-radius: 999px;
    letter-spacing: 2px;
    margin: -6px 0;
    z-index: 2;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }
</style>
</head>
<body>
  <div>
    ${brandHeader()}
    <div class="title-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">The Great Faustian Bargain of Modern Politics</div>
    </div>
  </div>
  <div class="t3-container">
    <div class="t3-card t3-card-left">
      <div class="t3-icon-box icon-green">🚀</div>
      <div class="t3-info">
        <div class="t3-heading">The Upside: Hyper-Speed Growth</div>
        <div class="t3-desc">Mega-skylines, zero union strikes, low taxes, and instant infrastructure approvals.</div>
      </div>
    </div>
    <div class="t3-vs-pill">THE TRADE-OFF</div>
    <div class="t3-card t3-card-right">
      <div class="t3-icon-box icon-red">🔒</div>
      <div class="t3-info">
        <div class="t3-heading">The Cost: Zero Civil Dissent</div>
        <div class="t3-desc">Heavy state surveillance, banned protests, silenced journalists, and one-way authority.</div>
      </div>
    </div>
  </div>
  <div class="swipe-tag">
    Swipe to see how it works 👉
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// TEMPLATE 4: The 3D Chrome Hologram & Stock Ticker Vector
// -------------------------------------------------------------
const t4Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead}
<style>
  .t4-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 10px 0;
  }
  .t4-visual-orb {
    width: 380px;
    height: 380px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .t4-ring {
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    border: 3px dashed #CBD5E1;
  }
  .t4-ring-inner {
    position: absolute;
    inset: 45px;
    border-radius: 50%;
    border: 2px solid rgba(79, 70, 229, 0.4);
    background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
  }
  .t4-center-card {
    background: #FFFFFF;
    border-radius: 32px;
    padding: 38px 46px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    z-index: 2;
  }
  .t4-emoji-main {
    font-size: 64px;
  }
  .t4-card-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 32px;
    color: #0F172A;
  }
  .t4-tag-row {
    display: flex;
    gap: 10px;
  }
  .t4-micro-tag {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    background: #EEF2FF;
    color: #4F46E5;
    padding: 4px 12px;
    border-radius: 999px;
  }
  .t4-quote-strip {
    margin-top: 24px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    padding: 16px 28px;
    font-size: 19px;
    font-weight: 500;
    color: #334155;
    box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  }
</style>
</head>
<body>
  <div>
    ${brandHeader()}
    <div class="title-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">When Wall Street Meets The Iron Fist</div>
    </div>
  </div>
  <div class="t4-container">
    <div class="t4-visual-orb">
      <div class="t4-ring"></div>
      <div class="t4-ring-inner"></div>
      <div class="t4-center-card">
        <div class="t4-emoji-main">📈 🏛️ 🔒</div>
        <div class="t4-card-title">Order Drives Capital</div>
        <div class="t4-tag-row">
          <span class="t4-micro-tag">Top Growth</span>
          <span class="t4-micro-tag">Zero Strikes</span>
        </div>
      </div>
    </div>
    <div class="t4-quote-strip">
      ⚡ "Discipline in the streets, deregulation in the boardrooms."
    </div>
  </div>
  <div class="swipe-tag">
    Swipe to decode 👉
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// TEMPLATE 5: The Luxury Dark-Bento Contrast Feature
// -------------------------------------------------------------
const t5Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead}
<style>
  .t5-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 10px 0;
  }
  .t5-dark-card {
    background: #0F172A;
    border-radius: 36px;
    padding: 52px 48px;
    color: #F8FAFC;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
    overflow: hidden;
  }
  .t5-dark-card::after {
    content: '';
    position: absolute;
    bottom: -60px;
    right: -60px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.45) 0%, transparent 70%);
    border-radius: 50%;
  }
  .t5-badge-top {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(79, 70, 229, 0.3);
    color: #A5B4FC;
    border: 1px solid rgba(165, 180, 252, 0.3);
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 24px;
  }
  .t5-big-quote {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 46px;
    line-height: 1.25;
    color: #FFFFFF;
    margin-bottom: 28px;
  }
  .t5-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    position: relative;
    z-index: 2;
  }
  .t5-feat {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 18px 22px;
  }
  .t5-feat-title {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    color: #94A3B8;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }
  .t5-feat-val {
    font-size: 18px;
    font-weight: 600;
    color: #F8FAFC;
  }
</style>
</head>
<body>
  <div>
    ${brandHeader()}
    <div class="title-center">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">Strict Rule + Fast-Track Growth</div>
    </div>
  </div>
  <div class="t5-container">
    <div class="t5-dark-card">
      <div class="t5-badge-top">
        <span>⚡</span> The Core Formula
      </div>
      <div class="t5-big-quote">
        "Grow the wealth at all costs. Crush any disruption that slows it down."
      </div>
      <div class="t5-features-grid">
        <div class="t5-feat">
          <div class="t5-feat-title">Markets</div>
          <div class="t5-feat-val">💸 High-Speed Capitalism</div>
        </div>
        <div class="t5-feat">
          <div class="t5-feat-title">Politics</div>
          <div class="t5-feat-val">🏛️ Iron-Clad Authority</div>
        </div>
      </div>
    </div>
  </div>
  <div class="swipe-tag">
    Swipe to decode 👉
  </div>
</body>
</html>`;

const templates = [
  { path: "/t1", html: t1Html, file: "cover_template_1_terminal.jpg" },
  { path: "/t2", html: t2Html, file: "cover_template_2_sticker.jpg" },
  { path: "/t3", html: t3Html, file: "cover_template_3_hook.jpg" },
  { path: "/t4", html: t4Html, file: "cover_template_4_chrome.jpg" },
  { path: "/t5", html: t5Html, file: "cover_template_5_dark_bento.jpg" }
];

const server = http.createServer((req, res) => {
  const match = templates.find(t => t.path === req.url);
  if (match) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(match.html);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 9889;
server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Server listening on ${PORT}`);
  const DEBUG_PORT = 9556;
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
    await new Promise(r => setTimeout(r, 600));

    const shotRes = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 95
    });

    fs.writeFileSync(outPath, Buffer.from(shotRes.data, "base64"));
    console.log("Successfully generated:", path.basename(outPath));
    ws.close();
  }

  try {
    for (const t of templates) {
      await captureSlide(t.path, path.join(OUT_DIR, t.file));
    }
    console.log("\nAll 5 cover templates generated successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
