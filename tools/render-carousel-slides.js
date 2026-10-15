const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const slide5Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 896px;
    height: 1200px;
    background: #FAF8F5;
    font-family: 'Inter', -apple-system, sans-serif;
    color: #0F172A;
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .header-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 24px;
  }
  .badge-brand {
    font-size: 20px;
    font-weight: 500;
    color: #0F172A;
    border: 1.5px solid #0F172A;
    border-radius: 9999px;
    padding: 8px 24px;
    background: transparent;
  }
  .title-section {
    margin-bottom: 28px;
  }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 76px;
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
  .compass-card {
    background: #FFFFFF;
    border-radius: 28px;
    padding: 36px 36px 32px 36px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .compass-grid-wrapper {
    width: 490px;
    height: 490px;
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    border: 1.5px solid #CBD5E1;
    margin: 16px 0 28px 0;
  }
  .quadrant {
    position: absolute;
    width: 50%;
    height: 50%;
  }
  .q-tl { top: 0; left: 0; background: #FFF1F2; } /* Auth Left */
  .q-tr { top: 0; right: 0; background: #EEF2FF; } /* Auth Right */
  .q-bl { bottom: 0; left: 0; background: #F0FDF4; } /* Lib Left */
  .q-br { bottom: 0; right: 0; background: #FEF9C3; } /* Lib Right */
  
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
    background-size: 61.25px 61.25px;
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
  /* Center is 245px. x=+55 -> 245 + (245*0.55) = 379.75px. y=+75 (up) -> 245 - (245*0.75) = 61.25px. */
  .pin-glow {
    position: absolute;
    left: 380px;
    top: 61px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.35);
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  .pin-core {
    position: absolute;
    left: 380px;
    top: 61px;
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
    padding: 8px 18px;
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
    <div class="header-row">
      <div class="badge-brand">ideoMap.in</div>
    </div>
    <div class="title-section">
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
        <div class="compass-badge">Authoritarian Right [+55, +75]</div>
        <div class="compass-text">High state authority combined with aggressive, pro-market capitalism.</div>
      </div>
    </div>
  </div>
</body>
</html>`;

const slide6Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 896px;
    height: 1200px;
    background: #FAF8F5;
    font-family: 'Inter', -apple-system, sans-serif;
    color: #0F172A;
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .header-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 24px;
  }
  .badge-brand {
    font-size: 20px;
    font-weight: 500;
    color: #0F172A;
    border: 1.5px solid #0F172A;
    border-radius: 9999px;
    padding: 8px 24px;
    background: transparent;
  }
  .title-section {
    margin-bottom: 36px;
  }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 76px;
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
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 40px;
  }
  .bento-card {
    background: #FFFFFF;
    border-radius: 26px;
    padding: 34px 38px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    position: relative;
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
    margin-bottom: 14px;
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
    gap: 16px;
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
    padding: 20px 48px;
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
    <div class="header-row">
      <div class="badge-brand">ideoMap.in</div>
    </div>
    <div class="title-section">
      <h1>Real-World In Practice</h1>
      <div class="subtitle">Historical Precedents & Cautionary Lessons</div>
    </div>
    <div class="cards-container">
      <div class="bento-card card-success">
        <div class="card-header-row">
          <span class="pill-status pill-success">🟢 Success Case</span>
          <span class="card-title">Singapore's Economic Miracle • 1965–1990</span>
        </div>
        <div class="card-text">
          Transformed from a vulnerable third-world port into a global financial powerhouse through strict social order and state-backed capitalism under Lee Kuan Yew.
        </div>
      </div>
      <div class="bento-card card-caution">
        <div class="card-header-row">
          <span class="pill-status pill-caution">🔴 Cautionary Case</span>
          <span class="card-title">Pinochet's Violent Crackdowns • Chile, 1973–1990</span>
        </div>
        <div class="card-text">
          Radical free-market deregulation and privatization enforced through military dictatorship, dissolution of congress, and widespread human rights abuses.
        </div>
      </div>
    </div>
  </div>
  <div class="cta-section">
    <div class="cta-btn">Discover your score • ideoMap.in</div>
    <div class="cta-sub">Take the free 12-question quiz to find your ideology</div>
  </div>
</body>
</html>`;

// Static server
const server = http.createServer((req, res) => {
  if (req.url === "/slide5") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(slide5Html);
  } else if (req.url === "/slide6") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(slide6Html);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9876, "127.0.0.1", async () => {
  const DEBUG_PORT = 9444;
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  async function captureSlide(urlPath, outPath) {
    const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:9876${urlPath}`, { method: "PUT" });
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

    // Wait for fonts to load completely
    await send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 800));

    const shotRes = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 95
    });

    fs.writeFileSync(outPath, Buffer.from(shotRes.data, "base64"));
    console.log("Saved:", outPath);
    ws.close();
  }

  try {
    await captureSlide("/slide5", path.join(ROOT, "insta_data/authoritarian-capitalism/slide_5_compass.jpg"));
    await captureSlide("/slide6", path.join(ROOT, "insta_data/authoritarian-capitalism/slide_6_track_record.jpg"));
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
