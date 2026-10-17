const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/national-conservatism");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Custom centerpiece image for Slide 1
const coverImagePath = path.join(ROOT, "tools/national_conservatism_custom_cover.jpg");
let coverBase64 = "";
if (fs.existsSync(coverImagePath)) {
  const imgBuffer = fs.readFileSync(coverImagePath);
  coverBase64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;
}

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("national-conservatism");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

// Verify cross-check
const checkResult = crossCheckPin("national-conservatism", compassData.posX, compassData.posY);
if (!checkResult.passed) {
  throw new Error(`Compass algorithm cross-check failed: diffX=${checkResult.diff.x}, diffY=${checkResult.diff.y}`);
}

// Common CSS
const commonCss = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1350px;
    background: #FAF8F5;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #0F172A;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .canvas {
    width: 1080px;
    height: 1350px;
    padding: 70px 85px 55px 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .brand-chip {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .brand-chip .logo-box {
    width: 42px;
    height: 42px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
    border: 1px solid #E2E8F0;
  }
  .brand-chip .logo-box img {
    width: 24px;
    height: 24px;
  }
  .brand-chip .brand-name {
    font-size: 26px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: -0.6px;
  }
  .slide-counter {
    font-size: 16px;
    font-weight: 700;
    color: #64748B;
    background: #FFFFFF;
    padding: 6px 16px;
    border-radius: 9999px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
  }
  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #64748B;
    border-top: 1px solid #E2E8F0;
    padding-top: 20px;
  }
`;

// Slide 1: Cover
const slide1Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .cover-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
      gap: 12px;
    }
    .kicker {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #9A3412;
    }
    .main-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 86px;
      line-height: 1.02;
      color: #0F172A;
      font-weight: 400;
      margin-top: 2px;
    }
    .main-subtitle {
      font-size: 23px;
      font-weight: 600;
      color: #475569;
      margin-top: 4px;
      letter-spacing: -0.2px;
    }
    .hero-container {
      width: 910px;
      height: 660px;
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      margin-top: 16px;
      box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.16);
      border: 1.5px solid #E2E8F0;
      background: #E2E8F0;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 38%;
      display: block;
    }
    .floating-pill {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(12px);
      padding: 12px 28px;
      border-radius: 9999px;
      color: #FFFFFF;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .swipe-pill-bottom {
      width: 100%;
      background: #0F172A;
      border-radius: 9999px;
      padding: 18px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
      margin-top: 10px;
    }
    .swipe-pill-bottom .left-text {
      font-size: 18px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .swipe-pill-bottom .badge {
      background: rgba(255, 255, 255, 0.16);
      padding: 6px 18px;
      border-radius: 9999px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">1 / 6</div>
    </div>

    <div class="cover-body">
      <div class="kicker">POLITICAL PHILOSOPHY DECODED</div>
      <h1 class="main-title">National Conservatism</h1>
      <p class="main-subtitle">National Sovereignty · Cultural Identity · Strategic Self-Reliance</p>
      
      <div class="hero-container">
        <img class="hero-img" src="${coverBase64}" alt="National Conservatism">
        <div class="floating-pill">
          🦅 Sovereignty · Border Security · Nation First
        </div>
      </div>

      <div class="swipe-pill-bottom">
        <span class="left-text">💡 Swipe to decode the philosophy</span>
        <span class="badge">Swipe 👉</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>Modern Ideology Decoder</span>
      <span>ideomap.in</span>
    </div>
  </div>
</body>
</html>`;

// Slide 2: The Core Idea
const slide2Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .slide-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 76px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .slide-desc {
      font-size: 24px;
      color: #475569;
      font-weight: 500;
    }
    .bento-card {
      background: #FFFFFF;
      border-radius: 22px;
      padding: 30px 34px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.05);
    }
    .layman-card {
      border-left: 6px solid #C2410C;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .layman-kicker {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #C2410C;
    }
    .layman-text {
      font-size: 23px;
      line-height: 1.48;
      color: #1E293B;
      font-weight: 500;
    }
    .pillars-header {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #0F172A;
      margin-top: 4px;
    }
    .pillars-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .pillar-card {
      background: #FFFFFF;
      border-radius: 18px;
      padding: 22px 28px;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: flex-start;
      gap: 20px;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
    }
    .pillar-icon {
      font-size: 32px;
      line-height: 1;
      padding-top: 2px;
    }
    .pillar-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pillar-name {
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
    }
    .pillar-desc {
      font-size: 18px;
      line-height: 1.42;
      color: #475569;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">2 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">The Core Idea</h2>
        <p class="slide-desc">What is National Conservatism in simple, everyday language?</p>
      </div>

      <div class="bento-card layman-card">
        <div class="layman-kicker">THE LAYMAN DEFINITION</div>
        <div class="layman-text">
          A political philosophy that prioritizes the <strong>nation-state, national sovereignty, and cultural unity</strong> above globalist institutions and unvetted borderless trade. It maintains that a healthy democracy requires a distinct, self-governing people bound by shared traditions, secure borders, and an economy designed to <strong>strengthen domestic industry and protect working citizens</strong>.
        </div>
      </div>

      <div class="pillars-header">THE 3 DEFINING PILLARS</div>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">🦅</div>
          <div class="pillar-info">
            <div class="pillar-name">Strong Borders & Sovereignty</div>
            <div class="pillar-desc">Securing borders and making national laws without interference from unelected foreign bodies.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🏛️</div>
          <div class="pillar-info">
            <div class="pillar-name">Pride in National Identity</div>
            <div class="pillar-desc">Cherishing national history, language, civic pride, and traditional culture against fragmentation.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">💼</div>
          <div class="pillar-info">
            <div class="pillar-name">Economy for the Nation</div>
            <div class="pillar-desc">Protecting domestic factories, critical supply chains, and prioritizing local jobs over outsourcing.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 2 / 6</span>
      <span>Swipe for Society & Borders 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 3: Society & Sovereignty
const slide3Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 22px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .slide-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 76px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .slide-desc {
      font-size: 24px;
      color: #475569;
      font-weight: 500;
    }
    .bento-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 4px;
    }
    .bento-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 26px 26px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .card-icon {
      font-size: 32px;
      line-height: 1;
    }
    .card-title {
      font-size: 21px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.25;
    }
    .card-text {
      font-size: 16.5px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">3 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">Society & Sovereignty</h2>
        <p class="slide-desc">How National Conservatism views citizenship, culture, and borders</p>
      </div>

      <div class="bento-grid">
        <div class="bento-card">
          <div class="card-icon">🛡️</div>
          <div class="card-title">Sovereignty Above Globalism</div>
          <div class="card-text">
            Rejects supranational bodies dictating domestic policy. True democracy requires an independent nation-state where elected leaders answer strictly to their own citizens.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">🧱</div>
          <div class="card-title">Border Security & Order</div>
          <div class="card-text">
            Maintains that without enforced borders, a nation ceases to exist. Emphasizes strict immigration quotas geared toward economic assimilation and national security.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">🚩</div>
          <div class="card-title">Cultural Unity & Duty</div>
          <div class="card-text">
            Rejects tribal identity politics. Championing a shared civic patriotism, common language, historical reverence, and mutual responsibility binding citizens together.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">⚖️</div>
          <div class="card-title">Law, Order & Strong State</div>
          <div class="card-text">
            Demands a robust, decisive government capable of maintaining domestic safety, deterring external threats, defending national heritage, and honoring public morality.
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 3 / 6</span>
      <span>Swipe for Economic Model 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 4: The Economic Vision
const slide4Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 22px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .slide-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 76px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .slide-desc {
      font-size: 24px;
      color: #475569;
      font-weight: 500;
    }
    .bento-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 4px;
    }
    .bento-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 26px 26px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .card-icon {
      font-size: 32px;
      line-height: 1;
    }
    .card-title {
      font-size: 21px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.25;
    }
    .card-text {
      font-size: 16.5px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">4 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">The Economic Vision</h2>
        <p class="slide-desc">Capitalism guided by national interest, not borderless corporatism</p>
      </div>

      <div class="bento-grid">
        <div class="bento-card">
          <div class="card-icon">🏭</div>
          <div class="card-title">Strategic Industrial Policy</div>
          <div class="card-text">
            Rejects extreme market dogma that offshore factories for cheaper labor. Uses targeted tariffs, infrastructure investment, and support to rebuild domestic manufacturing.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">📦</div>
          <div class="card-title">Critical Supply Chains</div>
          <div class="card-text">
            Treats food, defense, medicine, energy, and key microchips as matters of national survival that must never be outsourced to geopolitical adversaries.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">👷</div>
          <div class="card-title">Domestic Worker First</div>
          <div class="card-text">
            Protects working-class wages against foreign dumping and wage suppression. Believes businesses owe an allegiance to the prosperity of their own nation's workforce.
          </div>
        </div>

        <div class="bento-card">
          <div class="card-icon">👨‍👩‍👧‍👦</div>
          <div class="card-title">Pro-Family Welfare</div>
          <div class="card-text">
            Supports family-focused tax relief, maternal support, and child subsidies that strengthen household resilience and reverse birth rate decline without socialism.
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 4 / 6</span>
      <span>Swipe for Political Compass 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 5: Where It Sits on the Compass
const slide5Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .slide-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 76px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .slide-desc {
      font-size: 24px;
      color: #475569;
      font-weight: 500;
    }
    .compass-container {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 30px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .compass-grid-wrapper {
      width: 720px;
      height: 520px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .compass-svg {
      width: 520px;
      height: 520px;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid #CBD5E1;
    }
    .info-box {
      width: 100%;
      background: #FFF7ED;
      border: 1px solid #FFEDD5;
      border-radius: 16px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .info-badge {
      background: #C2410C;
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 800;
      padding: 8px 16px;
      border-radius: 9999px;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }
    .info-text {
      font-size: 17px;
      line-height: 1.45;
      color: #9A3412;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">5 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">Where It Sits on the Compass</h2>
        <p class="slide-desc">Exact ideological quadrant mapping · 2D spectrum</p>
      </div>

      <div class="compass-container">
        <div class="compass-grid-wrapper">
          <svg class="compass-svg" viewBox="0 0 800 800">
            <!-- Background Quadrants -->
            <!-- Top-Left: Auth Left (Red) -->
            <rect x="0" y="0" width="400" height="400" fill="#FEE2E2" fill-opacity="0.5" />
            <!-- Top-Right: Auth Right (Blue) -->
            <rect x="400" y="0" width="400" height="400" fill="#DBEAFE" fill-opacity="0.5" />
            <!-- Bottom-Left: Lib Left (Green) -->
            <rect x="0" y="400" width="400" height="400" fill="#DCFCE7" fill-opacity="0.5" />
            <!-- Bottom-Right: Lib Right (Yellow) -->
            <rect x="400" y="400" width="400" height="400" fill="#FEF9C3" fill-opacity="0.5" />

            <!-- Grid Lines -->
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" stroke-width="0.75" stroke-opacity="0.3" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#grid)" />

            <!-- Main Axes -->
            <line x1="400" y1="0" x2="400" y2="800" stroke="#1E293B" stroke-width="2.5" />
            <line x1="0" y1="400" x2="800" y2="400" stroke="#1E293B" stroke-width="2.5" />

            <!-- Quadrant Labels -->
            <rect x="20" y="20" width="105" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.85" />
            <text x="72.5" y="40" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#991B1B">AUTH LEFT</text>

            <rect x="675" y="20" width="105" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.85" />
            <text x="727.5" y="40" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#1E40AF">AUTH RIGHT</text>

            <rect x="20" y="750" width="95" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.85" />
            <text x="67.5" y="770" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#166534">LIB LEFT</text>

            <rect x="685" y="750" width="95" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.85" />
            <text x="732.5" y="770" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#854D0E">LIB RIGHT</text>

            <!-- Axis Labels -->
            <rect x="345" y="18" width="110" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.95" stroke="#CBD5E1" stroke-width="1" />
            <text x="400" y="38" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0F172A">AUTHORITY</text>

            <rect x="355" y="752" width="90" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.95" stroke="#CBD5E1" stroke-width="1" />
            <text x="400" y="772" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0F172A">LIBERTY</text>

            <rect x="18" y="385" width="95" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.95" stroke="#CBD5E1" stroke-width="1" />
            <text x="65.5" y="405" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0F172A">EQUALITY</text>

            <rect x="690" y="385" width="92" height="30" rx="6" fill="#FFFFFF" fill-opacity="0.95" stroke="#CBD5E1" stroke-width="1" />
            <text x="736" y="405" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0F172A">MARKETS</text>

            <!-- National Conservatism Pin: (440px, 216px) -->
            <g transform="translate(440, 216)">
              <circle r="22" fill="#C2410C" fill-opacity="0.25">
                <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="12" fill="#C2410C" stroke="#FFFFFF" stroke-width="3.5" />
              <circle r="4" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        <div class="info-box">
          <div class="info-badge">Authoritarian Right (National Order)</div>
          <div class="info-text">
            Sits in the upper-right quadrant: combining strategic patriotic markets (markets: +25) with strong state defense, border security, and national sovereignty (authority: +45).
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 5 / 6</span>
      <span>Swipe for Real-World Track Record 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 6: Real-World Track Record
const slide6Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 22px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .slide-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 76px;
      line-height: 1.05;
      color: #0F172A;
      font-weight: 400;
    }
    .slide-desc {
      font-size: 24px;
      color: #475569;
      font-weight: 500;
    }
    .cases-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .case-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 26px 30px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .case-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .case-tag {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 6px 14px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .tag-good {
      background: #DCFCE7;
      color: #166534;
    }
    .tag-bad {
      background: #FEE2E2;
      color: #991B1B;
    }
    .case-era {
      font-size: 15px;
      font-weight: 600;
      color: #64748B;
    }
    .case-name {
      font-size: 24px;
      font-weight: 700;
      color: #0F172A;
    }
    .case-text {
      font-size: 17.5px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
    .cta-card {
      background: #0F172A;
      border-radius: 20px;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.15);
      margin-top: 4px;
    }
    .cta-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cta-heading {
      font-size: 22px;
      font-weight: 800;
    }
    .cta-sub {
      font-size: 15px;
      color: #94A3B8;
      font-weight: 500;
    }
    .cta-button {
      background: #C2410C;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 700;
      padding: 14px 26px;
      border-radius: 9999px;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-nav">
      <div class="brand-chip">
        <div class="logo-box">
          <img src="${logoBase64}" alt="ideoMap">
        </div>
        <span class="brand-name">ideoMap</span>
      </div>
      <div class="slide-counter">6 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">Real-World Track Record</h2>
        <p class="slide-desc">National Conservatism in history: Sovereign strength vs. chauvinist overreach</p>
      </div>

      <div class="cases-container">
        <!-- Inspiring Case -->
        <div class="case-card">
          <div class="case-header">
            <span class="case-tag tag-good">🟢 Inspiring Example</span>
            <span class="case-era">France · 1958–1969</span>
          </div>
          <div class="case-name">Charles de Gaulle's Sovereign Gaullism</div>
          <div class="case-text">
            Ended years of weak, messy parliamentary deadlock, brought political stability, revitalized domestic industry and nuclear deterrence, and ensured France remained a proud, independent global power resisting superpower vassalage.
          </div>
        </div>

        <!-- Warning Sign Case -->
        <div class="case-card">
          <div class="case-header">
            <span class="case-tag tag-bad">🔴 The Warning Sign</span>
            <span class="case-era">Pakistan · 1971</span>
          </div>
          <div class="case-name">Pakistan's 1971 Coercion in East Pakistan</div>
          <div class="case-text">
            Military rulers weaponized hyper-centralized chauvinism to crush Bengali language rights, cultural autonomy, and landslide election results, unleashing brutal atrocities that sparked a catastrophic liberation war and fractured the country.
          </div>
        </div>

        <!-- CTA Box -->
        <div class="cta-card">
          <div class="cta-left">
            <div class="cta-heading">Where do you sit on the spectrum?</div>
            <div class="cta-sub">Discover your closest ideology across all 4 key areas in 2 mins</div>
          </div>
          <div class="cta-button">Take the Quiz →</div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Free · No Sign-up · 2 Minutes</span>
      <span>ideomap.in</span>
    </div>
  </div>
</body>
</html>`;

// SVG Dial Gauge Generator for Social Cards
function getGaugeSvg(score = 25, activeBand = 4, width = 340, height = 180) {
  // Score +25 -> angle = 90 - (25 * 0.9) = 67.5 deg
  const needleAngle = 90 - (score * 0.9);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 340 180" style="display:block; margin: 0 auto; overflow: visible;">
      <defs>
        <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15" />
        </filter>
      </defs>
      <g transform="translate(170, 160)">
        <!-- Arc 1: Far Left (-100 to -60) -->
        <path d="M -140 0 A 140 140 0 0 1 -113.26 -82.29 L -80.9 -58.78 A 100 100 0 0 0 -100 0 Z"
              fill="${activeBand === 1 ? '#E06B6B' : '#E2E8F0'}" opacity="${activeBand === 1 ? '1' : '0.7'}" />
        
        <!-- Arc 2: Centre-Left (-60 to -20) -->
        <path d="M -113.26 -82.29 A 140 140 0 0 1 -43.26 -133.15 L -30.9 -95.11 A 100 100 0 0 0 -80.9 -58.78 Z"
              fill="${activeBand === 2 ? '#E89874' : '#E2E8F0'}" opacity="${activeBand === 2 ? '1' : '0.7'}" />
        
        <!-- Arc 3: Centre (-20 to +20) -->
        <path d="M -43.26 -133.15 A 140 140 0 0 1 43.26 -133.15 L 30.9 -95.11 A 100 100 0 0 0 -30.9 -95.11 Z"
              fill="${activeBand === 3 ? '#E8C56B' : '#E2E8F0'}" opacity="${activeBand === 3 ? '1' : '0.7'}" />
        
        <!-- Arc 4: Centre-Right (+20 to +60) [ACTIVE: #6B8BA4] -->
        <path d="M 43.26 -133.15 A 140 140 0 0 1 113.26 -82.29 L 80.9 -58.78 A 100 100 0 0 0 30.9 -95.11 Z"
              fill="${activeBand === 4 ? '#6B8BA4' : '#E2E8F0'}" stroke="${activeBand === 4 ? '#0F172A' : 'none'}" stroke-width="${activeBand === 4 ? '2.5' : '0'}" opacity="1" filter="${activeBand === 4 ? 'url(#gaugeShadow)' : 'none'}" />
        
        <!-- Arc 5: Far Right (+60 to +100) -->
        <path d="M 113.26 -82.29 A 140 140 0 0 1 140 0 L 100 0 A 100 100 0 0 0 80.9 -58.78 Z"
              fill="${activeBand === 5 ? '#507890' : '#E2E8F0'}" opacity="${activeBand === 5 ? '1' : '0.7'}" />

        <!-- Needle pointing at 67.5 deg (63% Right) -->
        <g transform="rotate(${needleAngle})">
          <line x1="0" y1="0" x2="0" y2="-128" stroke="#0F172A" stroke-width="4.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="14" fill="#0F172A" />
          <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  `;
}

// Share Cards Generator
function getCardHtml(format) {
  let cardWidth = 1080;
  let cardHeight = 1350;
  let padding = "70px 75px";
  let titleSize = 78;
  let descSize = 22;
  let gaugeW = 340;
  let gaugeH = 180;
  let ctaTitleSize = 30;
  let ctaBtnSize = 21;
  let ctaBtnPadding = "16px 42px";
  let ctaSubSize = 16;
  let ctaSubText = "Link in bio · Take the 2-minute quiz on ideomap.in";

  if (format === "story") {
    // 9:16 Story format (1080 x 1920)
    cardHeight = 1920;
    padding = "160px 80px 140px 80px";
    titleSize = 84;
    descSize = 24;
    gaugeW = 380;
    gaugeH = 200;
    ctaTitleSize = 34;
    ctaBtnSize = 23;
    ctaBtnPadding = "18px 48px";
    ctaSubSize = 18;
    ctaSubText = "👆 Tap the link sticker or visit ideomap.in";
  } else if (format === "square") {
    // 1:1 Square format (1080 x 1080)
    cardHeight = 1080;
    padding = "40px 60px";
    titleSize = 64;
    descSize = 19;
    gaugeW = 290;
    gaugeH = 150;
    ctaTitleSize = 24;
    ctaBtnSize = 18;
    ctaBtnPadding = "12px 34px";
    ctaSubSize = 14;
    ctaSubText = "Link in bio · Free 2-minute quiz on ideomap.in";
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${cardWidth}px;
      height: ${cardHeight}px;
      background: #EFECE6;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .card {
      width: calc(${cardWidth}px - ${format === 'story' ? '80px' : '100px'});
      height: calc(${cardHeight}px - ${format === 'story' ? '80px' : '100px'});
      background: #FAF8F5;
      border-radius: ${format === 'story' ? '44px' : '36px'};
      padding: ${padding};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 25px 60px rgba(15, 23, 42, 0.12);
      border: 1.5px solid #E2E8F0;
      position: relative;
      text-align: center;
    }
    .brand-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .logo-tile {
      width: 52px;
      height: 52px;
      background: #FFFFFF;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
      border: 1px solid #E2E8F0;
      margin-bottom: 4px;
    }
    .logo-tile img {
      width: 30px;
      height: 30px;
    }
    .site-name {
      font-size: 28px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.6px;
    }
    .tagline {
      font-size: 16px;
      font-weight: 600;
      color: #C2410C;
    }
    .hairline {
      width: 100%;
      height: 1px;
      background: #E2E8F0;
      margin-top: 14px;
    }
    .result-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .lead-text {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-transform: uppercase;
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
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 2px;
    }
    .badge {
      font-size: 15px;
      font-weight: 600;
      padding: 6px 18px;
      border-radius: 9999px;
      background: #F1F5F9;
      color: #334155;
      border: 1px solid #CBD5E1;
    }
    .badge.bold {
      font-weight: 700;
      background: #EFF6FF;
      color: #1E40AF;
      border-color: #BFDBFE;
    }
    .gauge-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: ${format === 'square' ? '2px 0' : '8px 0'};
    }
    .gauge-legend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: ${gaugeW}px;
      margin-top: 10px;
    }
    .gauge-side {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #64748B;
    }
    .gauge-main {
      font-size: 32px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.5px;
    }
    .desc-text {
      font-size: ${descSize}px;
      line-height: 1.45;
      color: #334155;
      font-weight: 500;
      max-width: 820px;
      margin: 0 auto;
    }
    .pillars-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .pillar-tag {
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      padding: 8px 18px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      color: #1E293B;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .cta-box {
      width: 100%;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: ${format === 'square' ? '18px 24px' : '26px 32px'};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .cta-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: ${ctaTitleSize}px;
      color: #0F172A;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(30, 64, 175, 0.35);
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
      <div class="lead-text">YOUR POLITICAL IDEOLOGY IS</div>
      <div class="title-text">National Conservatism</div>
      <div class="badges-row">
        <div class="badge bold">Centre-Right</div>
        <div class="badge">e.g. Sardar Vallabhbhai Patel</div>
      </div>
    </div>

    <!-- Radial Gauge (+25 score, Band 4 Centre-Right, 63% Right) -->
    <div class="gauge-group">
      ${getGaugeSvg(25, 4, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">63% Right</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <!-- Description -->
    <div class="desc-text">
      You put the nation first: strong borders, national sovereignty, traditional culture and firm government, with a market economy that serves the national interest.
    </div>

    <!-- 3 Pillars -->
    <div class="pillars-row">
      <div class="pillar-tag">🦅 Strong Borders & Sovereignty</div>
      <div class="pillar-tag">🏛️ Pride in National Identity</div>
      <div class="pillar-tag">💼 Economy for the Nation</div>
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

// Map endpoints
const pages = {
  "/slide1": slide1Html,
  "/slide2": slide2Html,
  "/slide3": slide3Html,
  "/slide4": slide4Html,
  "/slide5": slide5Html,
  "/slide6": slide6Html,
  "/story": getCardHtml("story"),
  "/post": getCardHtml("post"),
  "/square": getCardHtml("square")
};

// HTTP Server
const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(404);
    res.end();
    return;
  }
  const content = pages[req.url] || pages["/slide1"];
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(content);
});

const PORT = 9900;
const DEBUG_PORT = 9568;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Rendering National Conservatism assets on port ${PORT}...`);
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

  let idCounter = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener("message", handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send("Page.enable");

  const jobs = [
    { url: "/slide1", width: 1080, height: 1350, format: "jpeg", out: "slide_1_cover.jpg", art: "natcon_slide_1.jpg" },
    { url: "/slide2", width: 1080, height: 1350, format: "jpeg", out: "slide_2_intro.jpg", art: "natcon_slide_2.jpg" },
    { url: "/slide3", width: 1080, height: 1350, format: "jpeg", out: "slide_3_culture.jpg", art: "natcon_slide_3.jpg" },
    { url: "/slide4", width: 1080, height: 1350, format: "jpeg", out: "slide_4_economy.jpg", art: "natcon_slide_4.jpg" },
    { url: "/slide5", width: 1080, height: 1350, format: "jpeg", out: "slide_5_compass.jpg", art: "natcon_slide_5.jpg" },
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg", art: "natcon_slide_6.jpg" },
    { url: "/story", width: 1080, height: 1920, format: "png", out: "story_card_story_9x16.png", art: "natcon_story_9x16.png" },
    { url: "/post", width: 1080, height: 1350, format: "png", out: "story_card_post_4x5.png", art: "natcon_post_4x5.png" },
    { url: "/square", width: 1080, height: 1080, format: "png", out: "story_card_square_1x1.png", art: "natcon_square_1x1.png" }
  ];

  for (const job of jobs) {
    console.log(`Generating ${job.out}...`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: job.width,
      height: job.height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${job.url}` });
    await new Promise(r => setTimeout(r, 650));

    const screenshot = await send("Page.captureScreenshot", {
      format: job.format,
      quality: job.format === "jpeg" ? 95 : undefined,
      captureBeyondViewport: false
    });

    const targetFile = path.join(OUT_DIR, job.out);
    fs.writeFileSync(targetFile, Buffer.from(screenshot.data, "base64"));
    console.log(`✓ Saved: ${targetFile}`);

    // Also copy to artifact directory for presentation
    fs.writeFileSync(path.join(ARTIFACT_DIR, job.art), Buffer.from(screenshot.data, "base64"));
  }

  // Generate clean explanation.txt
  const explanationContent = `🦅 National Conservatism Explained in Simple Terms

What is National Conservatism?
National Conservatism is a political philosophy that puts the sovereign nation-state, its cultural heritage, its borders, and its citizens first. It is deeply skeptical of transnational organizations, globalist treaties, or borderless corporate trade that weaken local democracy and hollow out domestic manufacturing.

National Conservatism maintains that genuine democracy and civic rights can only function inside self-governing nation-states bound by shared history, secure borders, and mutual civic duty. It pairs a market economy with patriotic guidance—ensuring that economic growth directly benefits domestic workers and secures vital national supply chains.

The 3 Defining Pillars:
1. 🦅 Strong Borders & National Sovereignty: Securing borders, protecting territorial integrity, and ensuring national laws are made by accountable elected officials rather than unelected international bodies.
2. 🏛️ Pride in National Identity & Heritage: Cherishing national history, language, traditional culture, and civic unity over fragmented identity politics or rootless globalism.
3. 💼 Economy for the Nation: Championing domestic manufacturing, critical supply chain independence (food, energy, defense, medicine), and protecting working-class livelihoods.

Key Thinkers & Historical Figures:
• Charles de Gaulle (France, 1890–1970) — Architect of modern French sovereignty (Gaullism), who rebuilt France's strategic independence, restored national self-respect, and pioneered a strong, sovereign foreign policy.
• Sardar Vallabhbhai Patel (India, 1875–1950) — The 'Iron Man of India' who decisively integrated 565 princely states into one united, sovereign Indian republic and established a firm, capable national administrative backbone.
• Yoram Hazony (Israel/USA, b. 1964) — Leading contemporary philosopher and author of 'The Virtue of Nationalism', who argues that the sovereign nation-state is the only proven defense against tyrannical imperialism.

Real-World Case Studies:
🟢 Charles de Gaulle's Sovereign Gaullism (France, 1958–1969): Brought political stability during the Fifth Republic, championed independent defense and nuclear deterrent, fostered rapid industrial growth, and defended national sovereignty on the world stage.
🔴 Pakistan's 1971 Suppression in East Pakistan (Pakistan, 1971): The military establishment used aggressive chauvinism to crush Bengali language, culture, and democratic election victories, triggering atrocities, a catastrophic liberation war, and the disintegration of Pakistan into Bangladesh.

Where do you stand? Find your political match in 2 minutes at https://ideomap.in
`;

  fs.writeFileSync(path.join(OUT_DIR, "explanation.txt"), explanationContent, "utf8");
  console.log(`✓ Saved: explanation.txt`);

  // Generate clean hashtags.txt
  const hashtagsContent = `#nationalconservatism #nationalism #sovereignty #nationfirst #borders #sardarpatel #charlesdegaulle #politicalcompass #ideomap #politics`;
  fs.writeFileSync(path.join(OUT_DIR, "hashtags.txt"), hashtagsContent, "utf8");
  console.log(`✓ Saved: hashtags.txt`);

  // Clean up any legacy or duplicate files in OUT_DIR
  const filesToDelete = [".gitkeep", "result-card.png", "story-card.png"];
  for (const f of filesToDelete) {
    const p = path.join(OUT_DIR, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`✓ Removed obsolete file: ${f}`);
    }
  }

  ws.close();
  chrome.kill();
  server.close();
  console.log(`\n🎉 All 11 National Conservatism assets generated successfully!`);
  process.exit(0);
});
