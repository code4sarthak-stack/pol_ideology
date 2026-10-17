const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/social-democracy");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Custom centerpiece image for Slide 1
const coverImagePath = path.join(ROOT, "tools/social_democracy_custom_cover.jpg");
let coverBase64 = "";
if (fs.existsSync(coverImagePath)) {
  const imgBuffer = fs.readFileSync(coverImagePath);
  coverBase64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;
}

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("social-democracy");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

// Verify cross-check
const checkResult = crossCheckPin("social-democracy", compassData.posX, compassData.posY);
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
      color: #E11D48;
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
      object-position: center 46%;
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
      <h1 class="main-title">Social Democracy</h1>
      <p class="main-subtitle">Nordic Model · Universal Welfare · Market Dynamism</p>
      
      <div class="hero-container">
        <img class="hero-img" src="${coverBase64}" alt="Social Democracy">
        <div class="floating-pill">
          🤝 Welfare Capitalism · Universal Care
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
      border-left: 6px solid #E11D48;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .layman-kicker {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #E11D48;
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
        <p class="slide-desc">What is Social Democracy in simple, everyday language?</p>
      </div>

      <div class="bento-card layman-card">
        <div class="layman-kicker">THE LAYMAN DEFINITION</div>
        <div class="layman-text">
          Popularly known as the <strong>Nordic Model</strong> (Sweden, Norway, Denmark, Finland). It combines <strong>dynamic capitalist free enterprise</strong> with an <strong>ironclad social safety net</strong> funded by progressive taxation—guaranteeing universal healthcare, free education, paid parental leave, and generous pensions so that no citizen is left in destitution.
        </div>
      </div>

      <div class="pillars-header">THE 3 DEFINING PILLARS</div>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">🏪</div>
          <div class="pillar-info">
            <div class="pillar-name">Pro-Market Economic Dynamism</div>
            <div class="pillar-desc">Private enterprise, trade, and competitive investment generate national wealth and technological innovation.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🛡️</div>
          <div class="pillar-info">
            <div class="pillar-name">Ironclad Universal Welfare</div>
            <div class="pillar-desc">World-class healthcare, tuition-free schooling from nursery to college, and dignified pensions provided as universal civic rights.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🤝</div>
          <div class="pillar-info">
            <div class="pillar-name">Strong Collective Bargaining</div>
            <div class="pillar-desc">Democratic unions and tripartite negotiations ensure employees receive fair wages and safe conditions without state takeovers.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 2 / 6</span>
      <span>Swipe for Society & Welfare 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 3: Society & Welfare
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
      background: #FFE4E6;
      color: #BE123C;
    }
    .card-body-text {
      font-size: 18px;
      line-height: 1.48;
      color: #475569;
      font-weight: 500;
    }
    .quote-box {
      background: #F8FAFC;
      border-left: 4px solid #E11D48;
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
        <h2 class="slide-title">Society & Welfare</h2>
        <p class="slide-desc">Universal public services build high social trust and civic equality</p>
      </div>

      <div class="cards-stack">
        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">🛡️ Universalism Over Means-Testing</span>
            <span class="head-tag">SHARED CITIZENSHIP</span>
          </div>
          <div class="card-body-text">
            Public healthcare and schooling are not stigmatized welfare charities reserved only for the poorest; they are high-standard civic rights utilized by middle and wealthy classes alike, creating exceptional social trust and cohesion.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">📚 Education as the Great Equalizer</span>
            <span class="head-tag">MERITOCRACY</span>
          </div>
          <div class="card-body-text">
            Free schooling, vocational training, and university tuition ensure that a child's destiny is defined by their passion and diligence, never by their family's wealth or zip code.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">👶 High Quality Family Life</span>
            <span class="head-tag">WORK-LIFE HARMONY</span>
          </div>
          <div class="card-body-text">
            Subsidized state daycares, generous paid maternal and paternal leaves, and guaranteed annual vacation time empower citizens to balance fulfilling careers with healthy family life.
          </div>
        </div>

        <div class="quote-box">
          <div class="quote-text">"Society is not an economic machine; it is a community of human beings whose mutual responsibility is the measure of their civilization."</div>
          <div class="quote-author">— Olof Palme, Prime Minister of Sweden</div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 3 / 6</span>
      <span>Swipe for Economy & Labor 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 4: Economy & Labor
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
      background: #F0FDF4;
      color: #166534;
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
    .comp-title.what { color: #E11D48; }
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
        <h2 class="slide-title">Economy & Labor</h2>
        <p class="slide-desc">Capitalist productivity paired with the celebrated 'Flexicurity' model</p>
      </div>

      <div class="cards-stack">
        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">📈 Competitive Free Enterprise</span>
            <span class="head-tag">MARKET INNOVATION</span>
          </div>
          <div class="card-body-text">
            Rejects bureaucratic state ownership of retail and industry. Private companies operate in competitive, open international markets, spurring global brands (IKEA, Volvo, Novo Nordisk) through entrepreneurial dynamism.
          </div>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <span class="head-title">🤝 The 'Flexicurity' Safety Net</span>
            <span class="head-tag">SECURITY + AGILITY</span>
          </div>
          <div class="card-body-text">
            Employers enjoy flexibility to hire and adopt automated tech, while workers are protected by generous state unemployment insurance, government-funded retraining, and quick re-employment placement.
          </div>
        </div>

        <div class="comparison-grid">
          <div class="comp-box">
            <div class="comp-title what">🏪 Vs. Laissez-Faire Capitalism</div>
            <div class="comp-desc">Rejects predatory deregulation where medical bills and job loss cause bankruptcy; taxes top wealth to fund collective human resilience.</div>
          </div>
          <div class="comp-box">
            <div class="comp-title why">🛠️ Vs. State Communism</div>
            <div class="comp-desc">Rejects totalitarian command economies and abolition of private property; believes markets generate wealth best when guided by social democracy.</div>
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
      background: rgba(225, 29, 72, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
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
      background: #E11D48;
    }

    .compass-callout {
      width: 100%;
      background: #FFF1F2;
      border-radius: 18px;
      padding: 20px 24px;
      border: 1px solid #FECDD3;
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
      background: #E11D48;
      white-space: nowrap;
    }
    .quadrant-expl {
      font-size: 17px;
      line-height: 1.45;
      color: #881337;
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
          <div class="quadrant-tag">Libertarian Left (Nordic Model)</div>
          <div class="quadrant-expl">
            Sits in the bottom-left quadrant: combining egalitarian welfare services, progressive taxation, and strong labor protections (equality: -45) with democratic pluralism and civic personal liberties (liberty: -30).
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
      background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
      color: #FFFFFF;
      padding: 14px 32px;
      border-radius: 9999px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 16px rgba(225, 29, 72, 0.4);
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
        <p class="slide-desc">Social Democracy in history: Nordic prosperity vs. fiscal overreach</p>
      </div>

      <div class="case-stack">
        <div class="case-card">
          <div class="case-header">
            <span class="case-badge badge-good">🟢 Inspiring Example</span>
            <span class="case-meta">Sweden · 1930s–1970s</span>
          </div>
          <div class="case-title">Sweden's 'People's Home' Welfare Model</div>
          <div class="case-desc">
            Allowed private enterprise and global corporations to thrive while progressive taxes funded top-quality free schools, universities, and universal healthcare for all citizens with virtually no extreme poverty.
          </div>
        </div>

        <div class="case-card">
          <div class="case-header">
            <span class="case-badge badge-bad">🔴 The Warning Sign</span>
            <span class="case-meta">Greece · 2009–2018</span>
          </div>
          <div class="case-title">Greece's Debt-Fueled Public Entitlement Crisis</div>
          <div class="case-desc">
            Years of unsustainable early pensions and bloated patronage public jobs paid for with foreign borrowing ended in three bailouts; the economy shrank by 25% and over half of young people were left jobless.
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

  // Needle angle for pos = -45: (90 - (-45) * 0.9) = 130.5 deg
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
      <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(2)}" y2="${ny.toFixed(2)}" stroke="#E11D48" stroke-width="4.5" stroke-linecap="round" filter="url(#needleShadow)"/>
      <circle cx="${cx}" cy="${cy}" r="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy}" r="4.5" fill="#E11D48"/>
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
      color: #E11D48;
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
      background: #FFE4E6;
      color: #BE123C;
      border-color: #FECDD3;
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
      background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(225, 29, 72, 0.35);
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
      <div class="title-text">Social Democracy</div>
      <div class="badges-row">
        <div class="badge bold">Left</div>
        <div class="badge">e.g. Manmohan Singh</div>
      </div>
    </div>

    <!-- Radial Gauge (-45 score, Band 1 Left, 72% Left) -->
    <div class="gauge-group">
      ${getGaugeSvg(-45, 1, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">72% Left</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <!-- Description -->
    <div class="desc-text">
      You support a market economy, balanced by higher taxes on the wealthy, strong workers' rights and universal public services like healthcare and education.
    </div>

    <!-- 3 Pillars -->
    <div class="pillars-row">
      <div class="pillar-tag">🏪 Dynamic Markets</div>
      <div class="pillar-tag">🛡️ Universal Welfare</div>
      <div class="pillar-tag">🤝 Strong Worker Rights</div>
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

const PORT = 9897;
const DEBUG_PORT = 9565;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Rendering Social Democracy assets on port ${PORT}...`);
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
    { url: "/slide1", width: 1080, height: 1350, format: "jpeg", out: "slide_1_cover.jpg", art: "socdem_slide_1.jpg" },
    { url: "/slide2", width: 1080, height: 1350, format: "jpeg", out: "slide_2_intro.jpg", art: "socdem_slide_2.jpg" },
    { url: "/slide3", width: 1080, height: 1350, format: "jpeg", out: "slide_3_culture.jpg", art: "socdem_slide_3.jpg" },
    { url: "/slide4", width: 1080, height: 1350, format: "jpeg", out: "slide_4_economy.jpg", art: "socdem_slide_4.jpg" },
    { url: "/slide5", width: 1080, height: 1350, format: "jpeg", out: "slide_5_compass.jpg", art: "socdem_slide_5.jpg" },
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg", art: "socdem_slide_6.jpg" },
    { url: "/story", width: 1080, height: 1920, format: "png", out: "story_card_story_9x16.png", art: "socdem_story_9x16.png" },
    { url: "/post", width: 1080, height: 1350, format: "png", out: "story_card_post_4x5.png", art: "socdem_post_4x5.png" },
    { url: "/square", width: 1080, height: 1080, format: "png", out: "story_card_square_1x1.png", art: "socdem_square_1x1.png" }
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
  const explanationContent = `🤝 Social Democracy Explained in Simple Terms

What is Social Democracy?
Social Democracy (popularly celebrated as the Nordic Model in countries like Sweden, Denmark, Norway, and Finland) is a pragmatic political philosophy that combines the wealth-generating efficiency of a free-market economy with a generous, universal social welfare state funded by progressive taxation.

Rather than abolishing capitalism or placing all industry under state control, Social Democracy believes that private enterprise and competitive trade are the best mechanisms for innovation and job creation. However, it insists that unbridled markets leave human vulnerabilities exposed. Therefore, the democratic state provides universal healthcare, tuition-free education, robust childcare, and strong collective bargaining so that every citizen enjoys real security and equal opportunity.

The 3 Defining Pillars:
1. 🏪 Pro-Business Market Dynamism: Private enterprise and competitive markets thrive without burdensome state micro-management, generating taxable revenue and global innovation.
2. 🛡️ Ironclad Universal Safety Net: High-quality healthcare, free education from pre-K through university, paid parental leave, and dignified pensions provided as universal rights.
3. 🤝 Strong Worker Rights & Collective Bargaining: Democratic trade unions and employers negotiate fair industry wages and safe working conditions collaboratively.

Key Thinkers & Historical Figures:
• Olof Palme (Sweden, 1927–1986) — Prime Minister of Sweden who became the global symbol of democratic social welfare, international human rights, and the 'People's Home' (Folkhemmet).
• Clement Attlee (UK, 1883–1967) — British Labour Prime Minister who established the National Health Service (NHS) and built the modern post-war British welfare state.
• Manmohan Singh (India, 1932–present) — Prime Minister and economist who opened India's economy to private market competition in 1991, while later instituting landmark universal welfare safety nets including the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA).

Real-World Case Studies:
🟢 Sweden's Post-War 'People's Home' Model (Sweden, 1930s–1970s): Allowed private multinational champions like Volvo, IKEA, and Ericsson to compete globally while tax revenues created the world's most egalitarian, healthy, and highly educated society with virtually zero extreme poverty.
🔴 Greece's Debt-Fueled Public Entitlement Crisis (Greece, 2009–2018): Years of unsustainable early retirement pensions and state patronage jobs funded through excessive foreign borrowing led to sovereign bankruptcy, 3 international bailouts, a 25% GDP contraction, and over 50% youth unemployment.

Where do you stand? Find your political match in 2 minutes at https://ideomap.in
`;

  fs.writeFileSync(path.join(OUT_DIR, "explanation.txt"), explanationContent, "utf8");
  console.log(`✓ Saved: explanation.txt`);

  // Generate clean hashtags.txt
  const hashtagsContent = `#socialdemocracy #nordicmodel #welfarestate #universalhealthcare #freeeducation #olofpalme #manmohansingh #workersrights #politicalcompass #ideomap #politics`;
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
  console.log(`\n🎉 All 11 Social Democracy assets generated successfully!`);
  process.exit(0);
});
