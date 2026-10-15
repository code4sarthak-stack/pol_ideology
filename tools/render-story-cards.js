const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// SVG Logo from assets
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Ideology data for Authoritarian Capitalism
const IDEO = {
  key: "authcap",
  slug: "authoritarian-capitalism",
  title: "Authoritarian Capitalism",
  lead: "Your political ideology is",
  overallScore: 75,
  overallBand: 5, // Right
  badges: ["Right", "e.g. Lee Kuan Yew"],
  pillars: [
    "🏢 State-Guided Markets",
    "🛡️ Strict Public Order",
    "🚀 Rapid Infrastructure"
  ],
  leanText: "75% Right",
  desc: "You believe a strong, disciplined government should drive rapid economic growth through business and markets, even if that means limits on dissent and democracy."
};

function getGaugeSvg(value, activeBand, width, height) {
  const colors = ["#e57379", "#f09a9e", "#f4baa5", "#edebe5", "#b8cde8", "#8eb0db", "#557a95"];
  const segWidths = [20, 13.75, 11, 10.5, 11, 13.75, 20];
  const cx = 160, cy = 145, rOut = 124, rIn = 80;
  const rad = Math.PI / 180;
  let currentDeg = 180;
  let paths = "";
  for (let i = 0; i < segWidths.length; i++) {
    const span = segWidths[i] * 1.8;
    const startDeg = currentDeg;
    const endDeg = currentDeg - span;
    currentDeg = endDeg;
    const sAngle = (startDeg - 0.6) * rad;
    const eAngle = (endDeg + 0.6) * rad;
    const x1 = cx + rOut * Math.cos(sAngle), y1 = cy - rOut * Math.sin(sAngle);
    const x2 = cx + rOut * Math.cos(eAngle), y2 = cy - rOut * Math.sin(eAngle);
    const x3 = cx + rIn * Math.cos(eAngle), y3 = cy - rIn * Math.sin(eAngle);
    const x4 = cx + rIn * Math.cos(sAngle), y4 = cy - rIn * Math.sin(sAngle);
    const d = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rOut} ${rOut} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${rIn} ${rIn} 0 0 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
    const isActive = (i === activeBand);
    paths += `<path d="${d}" fill="${colors[i]}" opacity="${isActive ? 1 : 0.45}" stroke="${isActive ? "#0F172A" : "none"}" stroke-width="${isActive ? 2 : 0}" />`;
  }
  const needleAngleDeg = 180 - ((value + 100) / 200) * 180;
  const needleRad = needleAngleDeg * rad;
  const tipX = cx + 112 * Math.cos(needleRad), tipY = cy - 112 * Math.sin(needleRad);
  const tailX = cx - 16 * Math.cos(needleRad), tailY = cy + 16 * Math.sin(needleRad);
  const pRad = needleRad + Math.PI / 2;
  const b1X = cx + 5.5 * Math.cos(pRad), b1Y = cy - 5.5 * Math.sin(pRad);
  const b2X = cx - 5.5 * Math.cos(pRad), b2Y = cy + 5.5 * Math.sin(pRad);

  return `<svg viewBox="0 0 320 160" width="${width}" height="${height}" style="overflow: visible; display: block;">
    <defs>
      <linearGradient id="needleGrad" x1="${tailX}" y1="${tailY}" x2="${tipX}" y2="${tipX}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#3B82F6" />
        <stop offset="50%" stop-color="#60A5FA" />
        <stop offset="100%" stop-color="#EFF6FF" />
      </linearGradient>
      <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.25"/>
      </filter>
    </defs>
    ${paths}
    <polygon points="${tipX.toFixed(2)},${tipY.toFixed(2)} ${b1X.toFixed(2)},${b1Y.toFixed(2)} ${tailX.toFixed(2)},${tailY.toFixed(2)} ${b2X.toFixed(2)},${b2Y.toFixed(2)}" fill="url(#needleGrad)" filter="url(#needleShadow)" />
    <line x1="${cx}" y1="${cy}" x2="${tipX}" y2="${tipY}" stroke="#FFFFFF" stroke-width="1.2" opacity="0.85" />
    <circle cx="${cx}" cy="${cy}" r="13" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" filter="url(#needleShadow)" />
    <circle cx="${cx}" cy="${cy}" r="5.5" fill="#0F172A" />
  </svg>`;
}

function renderHtml(format) {
  const isStory = format === "story";
  const isPost = format === "post";
  const isSquare = format === "square";

  const W = 1080;
  const H = isStory ? 1920 : (isPost ? 1350 : 1080);

  // Card dimensions and padding
  const cardW = isStory ? 940 : (isPost ? 960 : 980);
  const cardH = isStory ? "height: 1620px;" : "";
  const cardPadding = isStory ? "48px 56px 42px 56px" : (isPost ? "34px 48px 30px 48px" : "24px 36px 20px 36px");

  // Logo & Header
  const logoSize = isStory ? 88 : (isPost ? 64 : 52);
  const brandTitleSize = isStory ? 44 : (isPost ? 35 : 28);
  const taglineSize = isStory ? 22 : (isPost ? 16 : 14);

  // Result Section
  const leadSize = isStory ? 22 : (isPost ? 15 : 13);
  const titleSize = isStory ? 88 : (isPost ? 72 : 56);
  const badgeFontSize = isStory ? 22 : (isPost ? 17 : 14);
  const badgePadding = isStory ? "9px 24px" : (isPost ? "6px 18px" : "4px 14px");

  // Gauge
  const gaugeW = isStory ? 640 : (isPost ? 530 : 430);
  const gaugeH = isStory ? 320 : (isPost ? 265 : 215);
  const gaugeLegendW = isStory ? 580 : (isPost ? 490 : 400);
  const gaugeSideSize = isStory ? 22 : (isPost ? 18 : 15);
  const gaugeMainSize = isStory ? 54 : (isPost ? 42 : 34);

  // Description & Pillars
  const descSize = isStory ? 26 : (isPost ? 21 : 17);
  const descLineHeight = isStory ? 1.55 : 1.45;
  const pillarSize = isStory ? 20 : (isPost ? 15 : 13);
  const pillarPadding = isStory ? "8px 18px" : (isPost ? "6px 14px" : "4px 10px");

  // CTA Box
  const ctaPadding = isStory ? "26px 32px" : (isPost ? "18px 24px" : "12px 18px");
  const ctaTitleSize = isStory ? 36 : (isPost ? 27 : 21);
  const ctaBtnSize = isStory ? 28 : (isPost ? 22 : 17);
  const ctaBtnPadding = isStory ? "16px 52px" : (isPost ? "11px 36px" : "8px 28px");
  const ctaSubSize = isStory ? 19 : (isPost ? 14 : 12);

  const ctaSubText = isStory 
    ? "👇 Tap the link in caption below or sticker"
    : "👇 Link in bio · Take the 2-minute quiz on ideomap.in";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${W}px;
      height: ${H}px;
      background: #F8FAFC;
      background-image: radial-gradient(circle at 50% ${Math.round(H * 0.2)}px, rgba(79, 70, 229, 0.10) 0%, rgba(238, 240, 255, 0.35) 45%, rgba(248, 250, 252, 0) 75%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Instrument Sans', -apple-system, sans-serif;
      color: #0F172A;
      overflow: hidden;
    }

    .card {
      width: ${cardW}px;
      ${cardH}
      background: #FFFFFF;
      border: 2px solid #E2E8F0;
      border-radius: ${isStory ? 44 : (isPost ? 36 : 28)}px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
      padding: ${cardPadding};
      display: flex;
      flex-direction: column;
      ${isStory ? "justify-content: space-between;" : ""}
      align-items: center;
      text-align: center;
      gap: ${isStory ? 0 : (isPost ? 14 : 10)}px;
    }

    /* Top Brand */
    .brand-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .logo-tile {
      width: ${logoSize}px;
      height: ${logoSize}px;
      border-radius: ${isStory ? 20 : (isPost ? 16 : 12)}px;
      background: #FFFFFF;
      border: 2px solid #E2E8F0;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: ${isStory ? 8 : (isPost ? 6 : 4)}px;
    }
    .logo-tile img {
      width: 78%;
      height: 78%;
      object-fit: contain;
    }
    .site-name {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: ${brandTitleSize}px;
      font-weight: 600;
      color: #334155;
      line-height: 1.1;
    }
    .tagline {
      font-size: ${taglineSize}px;
      font-weight: 500;
      color: #64748B;
      margin-top: 2px;
    }
    .hairline {
      width: 100%;
      height: 1.5px;
      background: #E2E8F0;
      margin-top: ${isStory ? 16 : (isPost ? 10 : 8)}px;
    }

    /* Result Section */
    .result-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: ${isStory ? 6 : (isPost ? 4 : 2)}px;
    }
    .lead-text {
      font-size: ${leadSize}px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
    }
    .title-text {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: ${titleSize}px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .badges-row {
      display: flex;
      gap: ${isStory ? 10 : (isPost ? 8 : 6)}px;
      justify-content: center;
      align-items: center;
      margin-top: 2px;
    }
    .badge {
      font-size: ${badgeFontSize}px;
      font-weight: 600;
      padding: ${badgePadding};
      border-radius: 9999px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      color: #0F172A;
      letter-spacing: 0.2px;
    }
    .badge.bold {
      font-weight: 700;
      background: #EFF6FF;
      border-color: #BFDBFE;
      color: #1D4ED8;
    }

    /* Gauge Section */
    .gauge-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .gauge-legend {
      width: ${gaugeLegendW}px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -6px;
    }
    .gauge-side {
      font-size: ${gaugeSideSize}px;
      font-weight: 700;
      color: #64748B;
      letter-spacing: 1px;
    }
    .gauge-main {
      font-size: ${gaugeMainSize}px;
      font-weight: 700;
      color: #0F172A;
    }

    /* Description */
    .desc-text {
      font-size: ${descSize}px;
      line-height: ${descLineHeight};
      color: #334155;
      max-width: 820px;
      text-align: center;
      padding: 0 10px;
    }

    /* Pillars Row */
    .pillars-row {
      display: flex;
      gap: ${isStory ? 10 : (isPost ? 8 : 6)}px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .pillar-tag {
      font-size: ${pillarSize}px;
      font-weight: 600;
      padding: ${pillarPadding};
      border-radius: 8px;
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      color: #334155;
      white-space: nowrap;
    }

    /* CTA Box */
    .cta-box {
      width: 100%;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      border-radius: ${isStory ? 26 : (isPost ? 20 : 16)}px;
      padding: ${ctaPadding};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${isStory ? 10 : (isPost ? 8 : 6)}px;
    }
    .cta-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: ${ctaTitleSize}px;
      color: #0F172A;
      line-height: 1.15;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.30);
      letter-spacing: 0.3px;
    }
    .cta-sub {
      font-size: ${ctaSubSize}px;
      font-weight: 600;
      color: #16A34A;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="card">
    <!-- Brand Header -->
    <div class="brand-group">
      <div class="logo-tile">
        <img src="${logoBase64}" alt="ideoMap">
      </div>
      <div class="site-name">ideoMap</div>
      <div class="tagline">Test your Political Ideology Today</div>
      <div class="hairline"></div>
    </div>

    <!-- Result Title -->
    <div class="result-group">
      <div class="lead-text">${IDEO.lead}</div>
      <div class="title-text">${IDEO.title}</div>
      <div class="badges-row">
        <div class="badge bold">${IDEO.badges[0]}</div>
        <div class="badge">${IDEO.badges[1]}</div>
      </div>
    </div>

    <!-- Radial Gauge -->
    <div class="gauge-group">
      ${getGaugeSvg(IDEO.overallScore, IDEO.overallBand, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">${IDEO.leanText}</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <div class="hairline" style="margin-top: 0;"></div>

    <!-- Description -->
    <div class="desc-text">
      ${IDEO.desc}
    </div>

    <!-- Pillars / Core Traits -->
    <div class="pillars-row">
      <div class="pillar-tag">${IDEO.pillars[0]}</div>
      <div class="pillar-tag">${IDEO.pillars[1]}</div>
      <div class="pillar-tag">${IDEO.pillars[2]}</div>
    </div>

    <!-- CTA Box -->
    <div class="cta-box">
      <div class="cta-title">Which ideology are you? Take the free quiz</div>
      <div class="cta-btn">👉 ideomap.in</div>
      <div class="cta-sub">${ctaSubText}</div>
    </div>
  </div>
</body>
</html>`;
}

// HTTP Server
let currentFormat = "story";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(renderHtml(currentFormat));
});

const PORT = 9893;
const DEBUG_PORT = 9560;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Server listening on port ${PORT}...`);
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:${PORT}/`, { method: "PUT" });
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

  const targets = [
    {
      format: "story",
      width: 1080,
      height: 1920,
      filename: "story_card_story_9x16.png",
      alsoSaveAs: "story-card.png"
    },
    {
      format: "post",
      width: 1080,
      height: 1350,
      filename: "story_card_post_4x5.png",
      alsoSaveAs: "story_card_post.png"
    },
    {
      format: "square",
      width: 1080,
      height: 1080,
      filename: "story_card_square_1x1.png"
    }
  ];

  const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";
  const IDEO_DIR = path.join(ROOT, "insta_data/authoritarian-capitalism");

  for (const t of targets) {
    console.log(`Rendering ${t.format} (${t.width}x${t.height})...`);
    currentFormat = t.format;

    await send("Emulation.setDeviceMetricsOverride", {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 600));

    await send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 400));

    const shotRes = await send("Page.captureScreenshot", {
      format: "png"
    });

    const buf = Buffer.from(shotRes.data, "base64");
    const outPrimary = path.join(IDEO_DIR, t.filename);
    fs.writeFileSync(outPrimary, buf);
    console.log(`Saved: ${outPrimary}`);

    if (t.alsoSaveAs) {
      const outSecondary = path.join(IDEO_DIR, t.alsoSaveAs);
      fs.writeFileSync(outSecondary, buf);
      console.log(`Also saved: ${outSecondary}`);
    }

    // Copy to artifact dir
    const artifactOut = path.join(ARTIFACT_DIR, t.filename);
    fs.writeFileSync(artifactOut, buf);
    console.log(`Artifact saved: ${artifactOut}`);
  }

  ws.close();
  chrome.kill();
  server.close();
  console.log("All story cards re-rendered with perfect safe zones!");
  process.exit(0);
});
