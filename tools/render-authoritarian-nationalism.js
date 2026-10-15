const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/authoritarian-nationalism");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Historical centerpiece for Slide 1
const napoleonBase64 = `data:image/jpeg;base64,${fs.readFileSync(path.join(ROOT, "tools/napoleon_alps.jpg")).toString("base64")}`;

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("authoritarian-nationalism");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

function getMasterTopNavBar(slideNum) {
  return `
    <div class="top-nav-bar">
      <div class="brand-header-center">
        <img class="brand-logo-img" src="${logoBase64}" alt="ideoMap">
        <div class="brand-header-title">ideoMap</div>
      </div>
      <div class="slide-counter">${slideNum} / 6</div>
    </div>
  `;
}

// Slide 1: Cover
const slide1Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
    .cover-header-group {
      text-align: center;
      margin-top: 4px;
    }
    .cover-eyebrow {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 3px;
      color: #DC2626;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .cover-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 88px;
      line-height: 1.02;
      color: #0F172A;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .cover-subtitle {
      font-size: 25px;
      color: #475569;
      font-weight: 400;
      letter-spacing: 0.3px;
    }
    .visual-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 18px 0;
    }
    .monument-frame {
      width: 910px;
      height: 660px;
      border-radius: 28px;
      overflow: hidden;
      position: relative;
      border: 3px solid #FFFFFF;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18), 0 4px 16px rgba(0,0,0,0.06);
    }
    .monument-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
    }
    .frame-badge {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      padding: 10px 24px;
      border-radius: 9999px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
      white-space: nowrap;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .swipe-banner {
      background: #0F172A;
      border-radius: 9999px;
      padding: 20px 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.20);
      margin-bottom: 12px;
    }
    .banner-left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: 600;
    }
    .banner-right {
      background: rgba(255, 255, 255, 0.15);
      padding: 7px 20px;
      border-radius: 9999px;
      font-size: 17px;
      font-weight: 700;
      color: #F8FAFC;
    }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 17px;
      font-weight: 600;
      color: #94A3B8;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      width: 100%;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("1")}

  <div class="cover-header-group">
    <div class="cover-eyebrow">Political Philosophy Decoded</div>
    <div class="cover-title">Authoritarian Nationalism</div>
    <div class="cover-subtitle">Total State Supremacy · One Nation, One Will</div>
  </div>

  <div class="visual-wrapper">
    <div class="monument-frame">
      <img src="${napoleonBase64}" alt="Napoleon Crossing the Alps">
      <div class="frame-badge">⚔️ Historical Symbol · Napoleon Crossing the Alps</div>
    </div>
  </div>

  <div class="swipe-banner">
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

// Slide 2: Intro & 3 Pillars
const slide2Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
      gap: 18px;
      margin-bottom: 16px;
    }
    .core-definition-card {
      background: #FFFFFF;
      border-radius: 28px;
      padding: 34px 40px;
      box-shadow: 0 14px 36px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.05);
      border-left: 8px solid #DC2626;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .core-def-tag {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #DC2626;
    }
    .core-def-statement {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.35;
      color: #1E293B;
    }
    .pillar-row {
      background: #FFFFFF;
      border-radius: 22px;
      padding: 24px 30px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      gap: 22px;
    }
    .pillar-icon-box {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      background: #FEF2F2;
      border: 1.5px solid #FECACA;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      flex: none;
    }
    .pillar-info {
      flex: 1;
    }
    .pillar-headline {
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 4px;
    }
    .pillar-detail {
      font-size: 18px;
      color: #475569;
      line-height: 1.45;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 17px;
      font-weight: 600;
      color: #64748B;
    }
    .swipe-link {
      color: #0F172A;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("2")}

  <div class="title-wrap">
    <h1>What is Authoritarian Nationalism?</h1>
    <div class="subtitle">In Simple Terms · The Core Ideological Foundation</div>
  </div>

  <div class="cards-container">
    <div class="core-definition-card">
      <div class="core-def-tag">Core Definition</div>
      <div class="core-def-statement">
        The supreme survival, honor, and unity of the nation matter far more than any individual rights or liberties.
      </div>
    </div>

    <div class="pillar-row">
      <div class="pillar-icon-box">⚔️</div>
      <div class="pillar-info">
        <div class="pillar-headline">Supreme State Power</div>
        <div class="pillar-detail">The government commands total authority to mobilize industry, laws, and citizens exclusively for national glory.</div>
      </div>
    </div>

    <div class="pillar-row">
      <div class="pillar-icon-box">🚩</div>
      <div class="pillar-info">
        <div class="pillar-headline">Uncompromising Loyalty & Order</div>
        <div class="pillar-detail">Individual dissent and political strikes are outlawed; all citizens are expected to march in lockstep with the state.</div>
      </div>
    </div>

    <div class="pillar-row">
      <div class="pillar-icon-box">🛡️</div>
      <div class="pillar-info">
        <div class="pillar-headline">Formidable Armed Strength</div>
        <div class="pillar-detail">Maximum military readiness, sealed borders, and overwhelming deterrence against both foreign and internal enemies.</div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Swipe for Culture & Civil Liberties</span>
    <span class="swipe-link">Swipe 👉</span>
  </div>
</body>
</html>`;

// Slide 3: Society & Culture / Civil Liberties (Tight cards, zero blank space)
const slide3Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
    .pill-red { background: #DC2626; }
    .card-main-text {
      font-size: 22px;
      line-height: 1.48;
      color: #334155;
    }
    .breakdown-box {
      background: #F8FAFC;
      border-radius: 18px;
      padding: 20px 24px;
      border: 1.5px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .item-line {
      display: flex;
      align-items: baseline;
      gap: 12px;
      font-size: 20px;
      line-height: 1.45;
    }
    .tag-green {
      color: #16A34A;
      font-weight: 700;
      flex: none;
    }
    .tag-red {
      color: #DC2626;
      font-weight: 700;
      flex: none;
    }
    .item-body {
      color: #475569;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 19px;
      font-weight: 600;
      color: #64748B;
    }
    .swipe-link {
      color: #0F172A;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("3")}

  <div class="title-wrap">
    <h1>Society & Civil Liberties</h1>
    <div class="subtitle">Authoritarian Nationalism · Order & Unity Over Liberty</div>
  </div>

  <div class="cards-container">
    <!-- Box 1: Society & Culture -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">🏛️ Society & Culture</span>
        <span class="pill-indicator pill-red">National Conformity</span>
      </div>
      <div class="card-main-text">
        Instills deep patriotic devotion, cultural pride, and civic discipline. Citizens are raised to view the collective survival and honor of the motherland as the highest moral purpose.
      </div>
      <div class="breakdown-box">
        <div class="item-line">
          <span class="tag-green">🟢 The Upside:</span>
          <span class="item-body">Powerful collective unity, massive civic mobilization, and near-zero tolerance for street crime or social breakdown.</span>
        </div>
        <div class="item-line">
          <span class="tag-red">🔴 The Price:</span>
          <span class="item-body">Severe social conformism; minority cultures, independent thinkers, and alternative lifestyles are suppressed as threats.</span>
        </div>
      </div>
    </div>

    <!-- Box 2: Civil Liberties -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">⚖️ Civil Liberties</span>
        <span class="pill-indicator pill-red">Total State Supremacy</span>
      </div>
      <div class="card-main-text">
        Individual rights are subordinate to state security. The judiciary, police, and intelligence services operate with sweeping authority to stamp out sabotage and political disorder.
      </div>
      <div class="breakdown-box">
        <div class="item-line">
          <span class="tag-green">🟢 The Upside:</span>
          <span class="item-body">Lightning-fast governance; zero legislative deadlocks, partisan gridlock, or paralyzing court injunctions.</span>
        </div>
        <div class="item-line">
          <span class="tag-red">🔴 The Price:</span>
          <span class="item-body">Free press, protests, and independent opposition parties are outlawed; constant risk of surveillance and arbitrary arrest.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Swipe for The Economy & World Politics</span>
    <span class="swipe-link">Swipe 👉</span>
  </div>
</body>
</html>`;

// Slide 4: Economy & World Politics
const slide4Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
    .pill-blue { background: #2563EB; }
    .pill-slate { background: #475569; }
    .card-main-text {
      font-size: 22px;
      line-height: 1.48;
      color: #334155;
    }
    .breakdown-box {
      background: #F8FAFC;
      border-radius: 18px;
      padding: 20px 24px;
      border: 1.5px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .item-line {
      display: flex;
      align-items: baseline;
      gap: 12px;
      font-size: 20px;
      line-height: 1.45;
    }
    .tag-green {
      color: #16A34A;
      font-weight: 700;
      flex: none;
    }
    .tag-red {
      color: #DC2626;
      font-weight: 700;
      flex: none;
    }
    .item-body {
      color: #475569;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 19px;
      font-weight: 600;
      color: #64748B;
    }
    .swipe-link {
      color: #0F172A;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("4")}

  <div class="title-wrap">
    <h1>The Economy & World Politics</h1>
    <div class="subtitle">Authoritarian Nationalism · Strategic Production & Sovereignty</div>
  </div>

  <div class="cards-container">
    <!-- Box 1: The Economy -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">💼 The Economy</span>
        <span class="pill-indicator pill-blue">Strategic Corporatism</span>
      </div>
      <div class="card-main-text">
        Private business operates under state oversight. Strategic industries (steel, energy, defense, shipping) are tightly directed to ensure national self-reliance and domestic industrial power.
      </div>
      <div class="breakdown-box">
        <div class="item-line">
          <span class="tag-green">🟢 The Upside:</span>
          <span class="item-body">Immunity to foreign supply shocks, rapid mobilization for national mega-projects, and protected domestic jobs.</span>
        </div>
        <div class="item-line">
          <span class="tag-red">🔴 The Price:</span>
          <span class="item-body">Loss of consumer freedom, bureaucratic favoritism for loyal oligarchs, and zero tolerance for worker strikes.</span>
        </div>
      </div>
    </div>

    <!-- Box 2: World Politics -->
    <div class="bento-card">
      <div class="card-header-row">
        <span class="card-category">🌍 World Politics</span>
        <span class="pill-indicator pill-slate">Fortress Sovereignty</span>
      </div>
      <div class="card-main-text">
        Deep skepticism toward global treaties, foreign courts, and international organizations. Views international diplomacy as an unyielding contest of strength between sovereign powers.
      </div>
      <div class="breakdown-box">
        <div class="item-line">
          <span class="tag-green">🟢 The Upside:</span>
          <span class="item-body">Total protection of national sovereignty, impenetrable borders, and zero submission to foreign economic blackmail.</span>
        </div>
        <div class="item-line">
          <span class="tag-red">🔴 The Price:</span>
          <span class="item-body">Severe diplomatic isolation, crippling sanctions, military arms races, and high risk of devastating regional warfare.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Swipe for The Compass Spectrum</span>
    <span class="swipe-link">Swipe 👉</span>
  </div>
</body>
</html>`;

// Slide 5: The Compass (Exact 720x720 grid from fix-slide5.js, NO numbers)
const slide5Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
      background-size: 72px 72px;
      background-image: 
        linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
      z-index: 1;
    }
    .axis-label {
      position: absolute;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #0F172A;
      text-transform: uppercase;
      background: #FFFFFF;
      padding: 3px 10px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      z-index: 3;
    }
    .label-top { top: 8px; left: 50%; transform: translateX(-50%); }
    .label-bottom { bottom: 8px; left: 50%; transform: translateX(-50%); }
    .label-left { left: 8px; top: 50%; transform: translateY(-50%); }
    .label-right { right: 8px; top: 50%; transform: translateY(-50%); }
    
    .corner-badge {
      position: absolute;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 6px 14px;
      border-radius: 8px;
      z-index: 3;
      text-transform: uppercase;
    }
    .cb-tl { top: 12px; left: 12px; background: rgba(255,255,255,0.85); color: #991B1B; }
    .cb-tr { top: 12px; right: 12px; background: #DC2626; color: #FFFFFF; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
    .cb-bl { bottom: 12px; left: 12px; background: rgba(255,255,255,0.85); color: #166534; }
    .cb-br { bottom: 12px; right: 12px; background: rgba(255,255,255,0.85); color: #854D0E; }
    
    /* Verified Pin position from compass algorithm: pos=[${compassData.pos}] */
    .pin-authoritarian {
      position: absolute;
      left: ${compassData.posX}px;
      top: ${compassData.posY}px;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pin-outer-glow {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(220, 38, 38, 0.25);
      position: absolute;
    }
    .pin-ring {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 6px solid #DC2626;
      box-shadow: 0 4px 14px rgba(220,38,38,0.4);
      position: relative;
      z-index: 2;
    }
    .pin-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #0F172A;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
    }
    .badge-bar {
      width: 100%;
      background: #F8FAFC;
      border-radius: 20px;
      padding: 16px 24px;
      border: 1.5px solid #E2E8F0;
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .badge-chip {
      background: #DC2626;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 700;
      padding: 8px 22px;
      border-radius: 999px;
      box-shadow: 0 4px 12px rgba(220,38,38,0.25);
      white-space: nowrap;
    }
    .badge-explanation {
      font-size: 18px;
      font-weight: 600;
      color: #334155;
      line-height: 1.4;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 19px;
      font-weight: 600;
      color: #64748B;
    }
    .swipe-link {
      color: #0F172A;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("5")}

  <div class="title-wrap">
    <h1>Where It Sits on the Compass</h1>
    <div class="subtitle">Exact ideological quadrant mapping · 2D spectrum</div>
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

      <div class="axis-label label-top">Authority</div>
      <div class="axis-label label-bottom">Liberty</div>
      <div class="axis-label label-left">Equality</div>
      <div class="axis-label label-right">Markets</div>

      <div class="corner-badge cb-tl">Auth Left</div>
      <div class="corner-badge cb-tr">★ Auth Right</div>
      <div class="corner-badge cb-bl">Lib Left</div>
      <div class="corner-badge cb-br">Lib Right</div>

      <div class="pin-authoritarian">
        <div class="pin-outer-glow"></div>
        <div class="pin-ring">
          <div class="pin-dot"></div>
        </div>
      </div>
    </div>

    <div class="badge-bar">
      <div class="badge-chip">Authoritarian Right</div>
      <div class="badge-explanation">High state authority combined with national strategic corporatism.</div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Swipe for Real-World Track Record</span>
    <span class="swipe-link">Swipe 👉</span>
  </div>
</body>
</html>`;

// Slide 6: Real-World Track Record & CTA
const slide6Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
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
      gap: 18px;
      margin-bottom: 16px;
    }
    .case-card {
      background: #FFFFFF;
      border-radius: 26px;
      padding: 28px 34px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .case-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .case-title {
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
    }
    .badge-good {
      background: #ECFDF5;
      border: 1.5px solid #A7F3D0;
      color: #059669;
      font-size: 14px;
      font-weight: 700;
      padding: 5px 16px;
      border-radius: 9999px;
      letter-spacing: 0.3px;
    }
    .badge-bad {
      background: #FEF2F2;
      border: 1.5px solid #FECACA;
      color: #DC2626;
      font-size: 14px;
      font-weight: 700;
      padding: 5px 16px;
      border-radius: 9999px;
      letter-spacing: 0.3px;
    }
    .case-when {
      font-size: 15px;
      font-weight: 600;
      color: #64748B;
    }
    .case-desc {
      font-size: 19px;
      line-height: 1.48;
      color: #334155;
    }
    .cta-banner {
      background: #0F172A;
      border-radius: 26px;
      padding: 30px 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
      box-shadow: 0 14px 36px rgba(15, 23, 42, 0.22);
      color: #FFFFFF;
    }
    .cta-question {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 38px;
      font-weight: 400;
      line-height: 1.15;
    }
    .cta-button {
      background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%);
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 700;
      padding: 16px 52px;
      border-radius: 9999px;
      box-shadow: 0 10px 24px rgba(79, 70, 229, 0.35);
      letter-spacing: 0.3px;
    }
    .cta-subtext {
      font-size: 16px;
      color: #94A3B8;
      font-weight: 500;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 18px;
      font-weight: 600;
      color: #64748B;
    }
  </style>
</head>
<body>
  ${getMasterTopNavBar("6")}

  <div class="title-wrap">
    <h1>The Real-World Record</h1>
    <div class="subtitle">Historical Precedents & Cautionary Lessons</div>
  </div>

  <div class="cards-container">
    <!-- Case 1: Bismarck -->
    <div class="case-card">
      <div class="case-header">
        <div class="case-title">🟢 Otto von Bismarck's German Empire</div>
        <div class="badge-good">STRENGTH & WELFARE</div>
      </div>
      <div class="case-when">Germany · 1862–1890</div>
      <div class="case-desc">
        Unified scattered German principalities into a modern industrial superpower. Combined disciplined state authority with the world's first worker pensions, accident insurance, and healthcare to guarantee social cohesion.
      </div>
    </div>

    <!-- Case 2: Extreme Fascism -->
    <div class="case-card">
      <div class="case-header">
        <div class="case-title">🔴 The Extreme Disaster: 1930s Fascism</div>
        <div class="badge-bad">TOTAL DESTRUCTION</div>
      </div>
      <div class="case-when">Europe · 1933–1945</div>
      <div class="case-desc">
        Racial scapegoating, blind dictator worship, brutal police surveillance, and fanatical militarism caused the murder of millions, total devastation of cities, and complete collapse of the nation.
      </div>
    </div>

    <!-- CTA Box -->
    <div class="cta-banner">
      <div class="cta-question">Where do your political beliefs truly sit?</div>
      <div class="cta-button">👉 Discover Your Compass on ideomap.in</div>
      <div class="cta-subtext">Free 2-minute quiz · 100% anonymous · Instant visual score card</div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Modern Ideology Decoder</span>
    <span>ideomap.in</span>
  </div>
</body>
</html>`;

// Server map
const pages = {
  "/slide1": slide1Html,
  "/slide2": slide2Html,
  "/slide3": slide3Html,
  "/slide4": slide4Html,
  "/slide5": slide5Html,
  "/slide6": slide6Html
};

const server = http.createServer((req, res) => {
  const content = pages[req.url] || pages["/slide1"];
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(content);
});

const PORT = 9895;
const DEBUG_PORT = 9562;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Re-rendering refined slides on port ${PORT}...`);
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:${PORT}/slide1`, { method: "PUT" });
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

  const jobs = [
    { url: "/slide1", width: 1080, height: 1350, format: "jpeg", out: "slide_1_cover.jpg" },
    { url: "/slide2", width: 1080, height: 1350, format: "jpeg", out: "slide_2_intro.jpg" },
    { url: "/slide3", width: 1080, height: 1350, format: "jpeg", out: "slide_3_culture.jpg" },
    { url: "/slide4", width: 1080, height: 1350, format: "jpeg", out: "slide_4_economy.jpg" },
    { url: "/slide5", width: 1080, height: 1350, format: "jpeg", out: "slide_5_compass.jpg" },
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg" }
  ];

  for (const job of jobs) {
    console.log(`Re-generating ${job.out}...`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: job.width,
      height: job.height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${job.url}` });
    await new Promise(r => setTimeout(r, 600));

    await send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 400));

    const shotRes = await send("Page.captureScreenshot", {
      format: job.format,
      quality: 95
    });

    const buf = Buffer.from(shotRes.data, "base64");
    const outPath = path.join(OUT_DIR, job.out);
    fs.writeFileSync(outPath, buf);
    console.log(`✓ Re-saved: ${outPath}`);

    // Copy to artifact directory
    fs.writeFileSync(path.join(ARTIFACT_DIR, job.out), buf);
  }

  ws.close();
  chrome.kill();
  server.close();
  console.log("\nAll 6 refined carousel slides re-rendered successfully!");
  process.exit(0);
});
