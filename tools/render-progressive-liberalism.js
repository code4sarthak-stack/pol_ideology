const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/progressive-liberalism");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Custom centerpiece image for Slide 1
const coverImagePath = path.join(ROOT, "tools/progressive_liberalism_custom_cover.jpg");
let coverBase64 = "";
if (fs.existsSync(coverImagePath)) {
  const imgBuffer = fs.readFileSync(coverImagePath);
  coverBase64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;
}

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("progressive-liberalism");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

// Verify cross-check
const checkResult = crossCheckPin("progressive-liberalism", compassData.posX, compassData.posY);
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
      color: #0D9488;
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
      object-position: center 44%;
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
      <h1 class="main-title">Progressive Liberalism</h1>
      <p class="main-subtitle">Equal Rights · Social Justice · Sustainable Markets</p>
      
      <div class="hero-container">
        <img class="hero-img" src="${coverBase64}" alt="Progressive Liberalism">
        <div class="floating-pill">
          🌱 Human Rights · Ecological Future
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
      border-left: 6px solid #0D9488;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .layman-kicker {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #0D9488;
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
        <p class="slide-desc">What is Progressive Liberalism in simple, everyday language?</p>
      </div>

      <div class="bento-card layman-card">
        <div class="layman-kicker">THE LAYMAN DEFINITION</div>
        <div class="layman-text">
          A forward-looking philosophy focused on <strong>expanding human rights, modernizing social norms, and protecting the climate</strong>. It believes that society must dismantle outdated prejudices, protect minority rights, and regulate big corporations so markets serve human flourishing and environmental sustainability.
        </div>
      </div>

      <div class="pillars-header">THE 3 DEFINING PILLARS</div>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">🌈</div>
          <div class="pillar-info">
            <div class="pillar-name">Universal Equal Rights</div>
            <div class="pillar-desc">Championing civil liberties, gender equality, minority protections, and genuine inclusion for every marginalized group.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🌿</div>
          <div class="pillar-info">
            <div class="pillar-name">Ecological Future</div>
            <div class="pillar-desc">Decisive action on climate change through renewable clean energy, environmental protection, and green infrastructure.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🛡️</div>
          <div class="pillar-info">
            <div class="pillar-name">Regulated Capitalism</div>
            <div class="pillar-desc">Keeping private enterprise dynamic and innovative while stopping monopolies, protecting workers, and securing a social safety net.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 2 / 6</span>
      <span>Swipe for Society & Justice 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 3: Society & Justice
const slide3Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
    .cards-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .feature-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 26px 30px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .head-title {
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .head-tag {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 9999px;
      background: #CCFBF1;
      color: #0F766E;
    }
    .card-body-text {
      font-size: 18px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
    .quote-box {
      background: #F8FAFC;
      border-left: 4px solid #0D9488;
      padding: 18px 24px;
      border-radius: 12px;
      margin-top: 6px;
    }
    .quote-text {
      font-size: 17px;
      font-style: italic;
      color: #334155;
      line-height: 1.45;
    }
    .quote-author {
      font-size: 14px;
      font-weight: 700;
      color: #64748B;
      margin-top: 6px;
      font-style: normal;
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
        <h2 class="slide-title">Society & Justice</h2>
        <p class="slide-desc">Dismantling historic prejudices to build an inclusive democracy</p>
      </div>

      <div class="cards-stack">
        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">🌈 Universal Pluralism & Inclusion</span>
            <span class="head-tag">CIVIL LIBERTIES</span>
          </div>
          <div class="card-body-text">
            Society thrives when every person enjoys full bodily autonomy, freedom of expression, and equal protection under secular law regardless of gender, religion, race, or sexual orientation.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">📜 Living Constitutionalism</span>
            <span class="head-tag">DYNAMIC REFORM</span>
          </div>
          <div class="card-body-text">
            Constitutions and legal frameworks are not static relics. They must adapt dynamically to expand voting access, protect digital privacy, and redress systemic historical disadvantages.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">🌿 Climate & Intergenerational Justice</span>
            <span class="head-tag">SUSTAINABILITY</span>
          </div>
          <div class="card-body-text">
            Preserving a habitable planet is a fundamental human right. Environmental justice requires cutting emissions aggressively while ensuring working-class and indigenous communities are supported in the green transition.
          </div>
        </div>

        <div class="quote-box">
          <div class="quote-text">"Indifferentism is the worst kind of disease that you can be infected with... Cultivation of mind should be the ultimate aim of human existence."</div>
          <div class="quote-author">— Dr. B.R. Ambedkar, Architect of the Indian Constitution</div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 3 / 6</span>
      <span>Swipe for Economy & Markets 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 4: Economy & Markets
const slide4Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
    .cards-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .feature-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 26px 30px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .head-title {
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .head-tag {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 9999px;
      background: #EFF6FF;
      color: #1E40AF;
    }
    .card-body-text {
      font-size: 18px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 4px;
    }
    .comp-box {
      background: #F8FAFC;
      border-radius: 16px;
      padding: 20px 22px;
      border: 1px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .comp-title {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .comp-title.what { color: #0D9488; }
    .comp-title.why { color: #2563EB; }
    .comp-desc {
      font-size: 16px;
      line-height: 1.42;
      color: #334155;
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
        <h2 class="slide-title">Economy & Markets</h2>
        <p class="slide-desc">Harnessing economic enterprise while curbing corporate abuse</p>
      </div>

      <div class="cards-stack">
        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">📈 Pro-Competition & Antitrust</span>
            <span class="head-tag">FAIR MARKETS</span>
          </div>
          <div class="card-body-text">
            Markets thrive on open competition, not monopolies. Government uses antitrust regulations, transparent standards, and consumer protection laws to prevent corporate exploitation.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">🛡️ Resilient Social Safety Net</span>
            <span class="head-tag">EQUAL OPPORTUNITY</span>
          </div>
          <div class="card-body-text">
            Affordable healthcare, high-quality public schooling, and worker protections are not hand-outs; they are baseline prerequisites that give every citizen the freedom to innovate and take risks.
          </div>
        </div>

        <div class="comparison-grid">
          <div class="comp-box">
            <div class="comp-title what">🌱 Vs. Traditional Conservatism</div>
            <div class="comp-desc">Rejects rigid moral policing, entrenched privilege, and social hierarchies; champions an inclusive, progressive secular society.</div>
          </div>
          <div class="comp-box">
            <div class="comp-title why">⚖️ Vs. Dogmatic Socialism</div>
            <div class="comp-desc">Preserves private property, entrepreneurship, and market pricing, choosing smart public regulation over state monopoly control.</div>
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

// Slide 5: Political Compass
const slide5Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .slide-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
    .compass-card {
      background: #FFFFFF;
      border-radius: 28px;
      padding: 30px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.06);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
    .compass-frame {
      width: 720px;
      height: 720px;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: inset 0 0 0 1px #CBD5E1;
    }
    .quadrant-bg {
      position: absolute;
      width: 360px;
      height: 360px;
    }
    .q-tl { top: 0; left: 0; background: #FFF1F2; }
    .q-tr { top: 0; right: 0; background: #EFF6FF; }
    .q-bl { bottom: 0; left: 0; background: #F0FDF4; }
    .q-br { bottom: 0; right: 0; background: #FEFCE8; }

    .grid-lines {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .axis-v {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 359px;
      width: 2px;
      background: #334155;
      z-index: 2;
    }
    .axis-h {
      position: absolute;
      left: 0;
      right: 0;
      top: 359px;
      height: 2px;
      background: #334155;
      z-index: 2;
    }
    .axis-label {
      position: absolute;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #1E293B;
      background: #FFFFFF;
      padding: 4px 12px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      z-index: 4;
    }
    .al-top { top: 12px; left: 50%; transform: translateX(-50%); }
    .al-bottom { bottom: 12px; left: 50%; transform: translateX(-50%); }
    .al-left { left: 12px; top: 50%; transform: translateY(-50%); }
    .al-right { right: 12px; top: 50%; transform: translateY(-50%); }

    .corner-badge {
      position: absolute;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 6px;
      z-index: 3;
    }
    .cb-tl { top: 16px; left: 16px; color: #991B1B; background: rgba(254, 226, 226, 0.7); }
    .cb-tr { top: 16px; right: 16px; color: #1E40AF; background: rgba(219, 234, 254, 0.7); }
    .cb-bl { bottom: 16px; left: 16px; color: #166534; background: rgba(220, 252, 231, 0.7); }
    .cb-br { bottom: 16px; right: 16px; color: #854D0E; background: rgba(254, 240, 138, 0.7); }

    .pin-target {
      position: absolute;
      left: ${compassData.posX}px;
      top: ${compassData.posY}px;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pin-ring-outer {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(13, 148, 136, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(13, 148, 136, 0.4);
    }
    .pin-ring-inner {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .pin-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #0D9488;
    }

    .compass-callout {
      width: 100%;
      background: #F0FDFA;
      border-radius: 18px;
      padding: 20px 24px;
      border: 1px solid #99F6E4;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .quadrant-tag {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.5px;
      padding: 8px 18px;
      border-radius: 9999px;
      color: #FFFFFF;
      background: #0D9488;
      white-space: nowrap;
    }
    .quadrant-expl {
      font-size: 17px;
      line-height: 1.45;
      color: #134E4A;
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
      <div class="slide-counter">5 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h2 class="slide-title">Where It Sits on the Compass</h2>
        <p class="slide-desc">Exact ideological quadrant mapping · 2D spectrum</p>
      </div>

      <div class="compass-card">
        <div class="compass-frame">
          <div class="quadrant-bg q-tl"></div>
          <div class="quadrant-bg q-tr"></div>
          <div class="quadrant-bg q-bl"></div>
          <div class="quadrant-bg q-br"></div>
          <div class="grid-lines"></div>

          <div class="axis-v"></div>
          <div class="axis-h"></div>

          <div class="axis-label al-top">AUTHORITY</div>
          <div class="axis-label al-bottom">LIBERTY</div>
          <div class="axis-label al-left">EQUALITY</div>
          <div class="axis-label al-right">MARKETS</div>

          <div class="corner-badge cb-tl">AUTH LEFT</div>
          <div class="corner-badge cb-tr">AUTH RIGHT</div>
          <div class="corner-badge cb-bl">LIB LEFT</div>
          <div class="corner-badge cb-br">LIB RIGHT</div>

          <div class="pin-target">
            <div class="pin-ring-outer">
              <div class="pin-ring-inner">
                <div class="pin-dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="compass-callout">
          <div class="quadrant-tag">Libertarian Left (Centre-Left)</div>
          <div class="quadrant-expl">
            Sits in the bottom-left quadrant: combining regulated markets and a solid social safety net (equality: -25) with strong personal liberty, civil rights, and social justice (liberty: -55).
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
      gap: 20px;
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
    .case-stack {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .case-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 30px 34px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .case-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .case-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }
    .badge-good {
      background: #DCFCE7;
      color: #15803D;
    }
    .badge-bad {
      background: #FEE2E2;
      color: #B91C1C;
    }
    .case-meta {
      font-size: 16px;
      font-weight: 700;
      color: #64748B;
    }
    .case-title {
      font-size: 26px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: -0.4px;
    }
    .case-desc {
      font-size: 19px;
      line-height: 1.5;
      color: #475569;
      font-weight: 500;
    }
    .cta-card {
      background: #0F172A;
      border-radius: 24px;
      padding: 28px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
      box-shadow: 0 16px 36px rgba(15, 23, 42, 0.15);
      margin-top: 4px;
    }
    .cta-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cta-main {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .cta-sub {
      font-size: 17px;
      color: #94A3B8;
      font-weight: 500;
    }
    .cta-btn {
      background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
      color: #FFFFFF;
      padding: 14px 32px;
      border-radius: 9999px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 16px rgba(13, 148, 136, 0.4);
      white-space: nowrap;
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
        <p class="slide-desc">Progressive Liberalism in history: Universal human rights vs. retail theft unintended fallout</p>
      </div>

      <div class="case-stack">
        <div class="case-card">
          <div class="case-header">
            <span class="case-badge badge-good">🟢 Inspiring Example</span>
            <span class="case-meta">USA & UN · 1946–1948</span>
          </div>
          <div class="case-title">Eleanor Roosevelt's Universal Human Rights Declaration</div>
          <div class="case-desc">
            Chaired the United Nations committee that drafted the historic Universal Declaration of Human Rights—establishing for the first time globally that all human beings are born free and equal in dignity.
          </div>
        </div>

        <div class="case-card">
          <div class="case-header">
            <span class="case-badge badge-bad">🔴 The Warning Sign</span>
            <span class="case-meta">California, USA · 2014–2024</span>
          </div>
          <div class="case-title">Proposition 47's Decriminalization Backfire</div>
          <div class="case-desc">
            To reduce prison crowding, non-violent thefts under $950 were reduced to misdemeanors; repeat shoplifting surged, local businesses struggled, and in 2024 voters decisively reinstated tougher penalties.
          </div>
        </div>

        <div class="cta-card">
          <div class="cta-left">
            <div class="cta-main">Where do you sit on the spectrum?</div>
            <div class="cta-sub">Discover your closest ideology across all 4 key areas in 2 mins</div>
          </div>
          <div class="cta-btn">Take the Quiz →</div>
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

// Story & Post Cards HTML Templates matching exact master standard
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
    const largeArc = span > 180 ? 1 : 0;
    const isAct = (i === activeBand);
    const strokeAttr = isAct ? 'stroke="#0F172A" stroke-width="3" stroke-linejoin="round"' : "";
    paths += `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z" fill="${colors[i]}" ${strokeAttr} />`;
  }

  // Needle angle for pos = -25: (90 - (-25) * 0.9) = 112.5 deg
  const needleAngle = 90 - (value * 0.9);
  const nRad = needleAngle * rad;
  const nx = cx + (rOut - 8) * Math.cos(nRad);
  const ny = cy - (rOut - 8) * Math.sin(nRad);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 320 175" style="overflow: visible;">
      <defs>
        <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(15,23,42,0.3)"/>
        </filter>
      </defs>
      ${paths}
      <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(2)}" y2="${ny.toFixed(2)}" stroke="#0D9488" stroke-width="4.5" stroke-linecap="round" filter="url(#needleShadow)"/>
      <circle cx="${cx}" cy="${cy}" r="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy}" r="4.5" fill="#0D9488"/>
    </svg>
  `;
}

function getCardHtml(type) {
  const isStory = type === "story";
  const isPost = type === "post";
  const isSquare = type === "square";

  const W = 1080;
  const H = isStory ? 1920 : (isPost ? 1350 : 1080);
  const cardW = isStory ? 920 : (isPost ? 960 : 960);
  const cardH = isStory ? "height: 1680px;" : (isPost ? "height: 1180px;" : "height: 960px;");
  const cardPadding = isStory ? "60px 54px" : (isPost ? "44px 48px" : "34px 44px");

  const logoSize = isStory ? 64 : (isPost ? 52 : 44);
  const siteNameSize = isStory ? 36 : (isPost ? 30 : 25);
  const tagSize = isStory ? 20 : (isPost ? 17 : 14);

  const leadSize = isStory ? 19 : (isPost ? 16 : 13);
  const titleSize = isStory ? 74 : (isPost ? 62 : 52);
  const badgeSize = isStory ? 18 : (isPost ? 16 : 13);

  const gaugeW = isStory ? 440 : (isPost ? 380 : 320);
  const gaugeH = isStory ? 240 : (isPost ? 208 : 175);
  const gaugeLegendW = isStory ? 460 : (isPost ? 400 : 340);
  const gaugeSideSize = isStory ? 17 : (isPost ? 15 : 13);
  const gaugeMainSize = isStory ? 44 : (isPost ? 38 : 32);

  const descSize = isStory ? 24 : (isPost ? 21 : 17);
  const descLineHeight = 1.45;

  const pillarSize = isStory ? 20 : (isPost ? 17 : 14);
  const pillarPadding = isStory ? "14px 24px" : (isPost ? "10px 18px" : "8px 14px");

  const ctaPadding = isStory ? "28px 36px" : (isPost ? "22px 28px" : "16px 22px");
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
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${W}px;
      height: ${H}px;
      background: #F1EFEA;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .card {
      width: ${cardW}px;
      ${cardH}
      background: #FFFFFF;
      border-radius: ${isStory ? 44 : (isPost ? 36 : 28)}px;
      padding: ${cardPadding};
      box-shadow: 0 24px 64px rgba(15, 23, 42, 0.12);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }

    /* Brand Header */
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
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: ${isStory ? 12 : (isPost ? 10 : 8)}px;
    }
    .logo-tile img {
      width: ${logoSize * 0.6}px;
      height: ${logoSize * 0.6}px;
    }
    .site-name {
      font-size: ${siteNameSize}px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.6px;
    }
    .tagline {
      font-size: ${tagSize}px;
      color: #0D9488;
      font-weight: 600;
      margin-top: 2px;
    }
    .hairline {
      width: 100%;
      height: 1px;
      background: #E2E8F0;
      margin-top: ${isStory ? 20 : (isPost ? 16 : 12)}px;
    }

    /* Result Title */
    .result-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${isStory ? 8 : (isPost ? 6 : 4)}px;
    }
    .lead-text {
      font-size: ${leadSize}px;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #64748B;
    }
    .title-text {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: ${titleSize}px;
      color: #0F172A;
      font-weight: 400;
      line-height: 1.05;
    }
    .badges-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 2px;
    }
    .badge {
      font-size: ${badgeSize}px;
      font-weight: 700;
      padding: ${isStory ? "6px 20px" : (isPost ? "4px 14px" : "3px 12px")};
      border-radius: 9999px;
      background: #F1F5F9;
      color: #475569;
      border: 1px solid #E2E8F0;
    }
    .badge.bold {
      background: #CCFBF1;
      color: #0F766E;
      border-color: #99F6E4;
    }

    /* Gauge */
    .gauge-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: ${isStory ? "4px 0" : (isPost ? "2px 0" : "0")};
    }
    .gauge-legend {
      width: ${gaugeLegendW}px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: ${isStory ? -8 : -6}px;
    }
    .gauge-side {
      font-size: ${gaugeSideSize}px;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: #64748B;
    }
    .gauge-main {
      font-size: ${gaugeMainSize}px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.5px;
    }

    /* Description */
    .desc-text {
      font-size: ${descSize}px;
      line-height: ${descLineHeight};
      color: #334155;
      max-width: ${isStory ? 820 : (isPost ? 840 : 880)}px;
      font-weight: 500;
    }

    /* Pillars */
    .pillars-row {
      display: flex;
      gap: ${isStory ? 10 : (isPost ? 8 : 6)}px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .pillar-tag {
      font-size: ${pillarSize}px;
      font-weight: 600;
      color: #1E293B;
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      padding: ${pillarPadding};
      border-radius: 8px;
    }

    /* CTA */
    .cta-box {
      width: 100%;
      background: #FAF8F5;
      border: 1.5px solid #E2E8F0;
      border-radius: ${isStory ? 24 : (isPost ? 20 : 16)}px;
      padding: ${ctaPadding};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${isStory ? 12 : (isPost ? 10 : 6)}px;
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
      background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(13, 148, 136, 0.35);
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
      <div class="title-text">Progressive Liberalism</div>
      <div class="badges-row">
        <div class="badge bold">Centre-Left</div>
        <div class="badge">e.g. Dr. B.R. Ambedkar</div>
      </div>
    </div>

    <!-- Radial Gauge (-25 score, Band 2 Centre-Left, 62% Left) -->
    <div class="gauge-group">
      ${getGaugeSvg(-25, 2, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">62% Left</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <!-- Description -->
    <div class="desc-text">
      You champion equal rights, personal freedom, and social justice, with a regulated market and a solid safety net. You're open to change and to the wider world.
    </div>

    <!-- 3 Pillars -->
    <div class="pillars-row">
      <div class="pillar-tag">🌈 Equal Rights</div>
      <div class="pillar-tag">🌿 Green Future</div>
      <div class="pillar-tag">🛡️ Regulated Markets</div>
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

const PORT = 9896;
const DEBUG_PORT = 9564;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Rendering Progressive Liberalism assets on port ${PORT}...`);
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
    { url: "/slide1", width: 1080, height: 1350, format: "jpeg", out: "slide_1_cover.jpg", art: "prog_slide_1.jpg" },
    { url: "/slide2", width: 1080, height: 1350, format: "jpeg", out: "slide_2_intro.jpg", art: "prog_slide_2.jpg" },
    { url: "/slide3", width: 1080, height: 1350, format: "jpeg", out: "slide_3_culture.jpg", art: "prog_slide_3.jpg" },
    { url: "/slide4", width: 1080, height: 1350, format: "jpeg", out: "slide_4_economy.jpg", art: "prog_slide_4.jpg" },
    { url: "/slide5", width: 1080, height: 1350, format: "jpeg", out: "slide_5_compass.jpg", art: "prog_slide_5.jpg" },
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg", art: "prog_slide_6.jpg" },
    { url: "/story", width: 1080, height: 1920, format: "png", out: "story_card_story_9x16.png", art: "prog_story_9x16.png" },
    { url: "/post", width: 1080, height: 1350, format: "png", out: "story_card_post_4x5.png", art: "prog_post_4x5.png" },
    { url: "/square", width: 1080, height: 1080, format: "png", out: "story_card_square_1x1.png", art: "prog_square_1x1.png" }
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
  const explanationContent = `🌱 Progressive Liberalism Explained in Simple Terms

What is Progressive Liberalism?
Progressive Liberalism (often called Modern Social Liberalism) is an open, forward-looking political philosophy that champions universal civil liberties, social justice, and environmental sustainability, alongside a regulated market economy with a robust public safety net.

It believes that individual freedom cannot truly exist if citizens are crushed by poverty, caste/racial discrimination, systemic prejudice, or environmental degradation. Therefore, it uses democratic institutions and scientific inquiry to dismantle outdated traditions, expand human rights, and ensure private enterprise is directed toward the common good.

The 3 Defining Pillars:
1. 🌈 Universal Equal Rights: Equal dignity, bodily autonomy, and anti-discrimination protections for all genders, minority faiths, and historically marginalized groups.
2. 🌿 Ecological Stewardship & Green Future: Aggressive climate transition through clean renewable energy, circular economy incentives, and strict environmental conservation.
3. 🛡️ Regulated Capitalism & Strong Safety Net: Protecting consumer rights and workers through antitrust laws, accompanied by high-quality public healthcare, education, and social security.

Key Thinkers & Historical Figures:
• Dr. B.R. Ambedkar (India, 1891–1956) — Polymath, social reformer, and chief architect of the Constitution of India who fought tirelessly against caste discrimination, championing constitutional morality, gender rights, and secular democracy.
• Eleanor Roosevelt (USA, 1884–1962) — First Lady and diplomat who chaired the UN committee that drafted the Universal Declaration of Human Rights, establishing the modern standard for global human dignity.
• John Maynard Keynes (UK, 1883–1946) — Pioneering economist who showed how active government monetary and fiscal policy can manage economic cycles, prevent unemployment, and sustain democratic societies.

Real-World Case Studies:
🟢 Eleanor Roosevelt's Universal Declaration (UN · 1948): Created the first global agreement proclaiming that every person is born free and equal, laying the bedrock for international civil rights and asylum laws worldwide.
🔴 California's Proposition 47 Missteps (USA · 2014–2024): Aiming to reduce mass incarceration, shoplifting under $950 was reduced to a non-custodial misdemeanor; repeat offenses escalated, small businesses struggled, and in 2024 voters reinstated harsher penalties.

Where do you stand? Find your political match in 2 minutes at https://ideomap.in
`;

  fs.writeFileSync(path.join(OUT_DIR, "explanation.txt"), explanationContent, "utf8");
  console.log(`✓ Saved: explanation.txt`);

  // Generate clean hashtags.txt
  const hashtagsContent = `#progressiveliberalism #humanrights #socialjustice #climateaction #ambedkar #eleanorroosevelt #livingconstitution #politicalcompass #ideomap #politics`;
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
  console.log(`\n🎉 All 11 Progressive Liberalism assets generated successfully!`);
  process.exit(0);
});
