const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/democratic-socialism");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Custom centerpiece image for Slide 1
const coverImagePath = path.join(ROOT, "tools/democratic_socialism_custom_cover.jpg");

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("democratic-socialism");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

// Verify cross-check
const checkResult = crossCheckPin("democratic-socialism", compassData.posX, compassData.posY);
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
  .slide-container {
    width: 1080px;
    height: 1350px;
    padding: 56px 85px 50px 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .brand-group {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .brand-logo {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .brand-logo img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
  .brand-name {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 36px;
    font-weight: 600;
    color: #1E293B;
    letter-spacing: -0.5px;
  }
  .slide-pill {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    padding: 7px 18px;
    border-radius: 999px;
    font-size: 17px;
    font-weight: 700;
    color: #64748B;
    letter-spacing: 0.5px;
  }
  .footer-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    color: #64748B;
  }
  .footer-sub {
    color: #0F172A;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// Slide 1: Cover
const slide1Html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${commonCss}
    .cover-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
    }
    .eyebrow {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #DC2626;
      margin-bottom: 12px;
    }
    .main-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 88px;
      line-height: 1.02;
      color: #0F172A;
      font-weight: 400;
      letter-spacing: -1.5px;
      margin-bottom: 14px;
    }
    .subtitle {
      font-size: 23px;
      color: #475569;
      font-weight: 500;
      line-height: 1.35;
      max-width: 820px;
      margin-bottom: 30px;
    }
    .monument-frame {
      width: 910px;
      height: 660px;
      border-radius: 28px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08);
      background: #7F1D1D;
    }
    .monument-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 40%;
      display: block;
    }
    .monument-badge {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.5px;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
    .action-pill {
      background: #0F172A;
      border-radius: 999px;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.15);
      margin-top: 26px;
    }
    .action-text {
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .action-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 8px 20px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">1 / 6</div>
    </div>

    <div class="cover-content">
      <div class="eyebrow">POLITICAL PHILOSOPHY DECODED</div>
      <h1 class="main-title">Democratic Socialism</h1>
      <p class="subtitle">Ballot Box & Public Welfare · Socialism Through Democracy</p>

      <div class="monument-frame">
        <img src="/cover.jpg" alt="Democratic Socialism">
        <div class="monument-badge">🌹 Socialism by the Ballot · Power to the People</div>
      </div>
    </div>

    <div class="action-pill">
      <div class="action-text">💡 Swipe to decode the philosophy</div>
      <div class="action-badge">Swipe 👉</div>
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
      gap: 30px;
      margin-top: 10px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
    .layman-box {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 34px 38px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.05);
      position: relative;
    }
    .layman-box::before {
      content: '';
      position: absolute;
      left: 0;
      top: 24px;
      bottom: 24px;
      width: 6px;
      background: #DC2626;
      border-radius: 0 4px 4px 0;
    }
    .layman-tag {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #DC2626;
      margin-bottom: 12px;
    }
    .layman-p {
      font-size: 22px;
      line-height: 1.52;
      color: #1E293B;
      font-weight: 500;
    }
    .section-label {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #0F172A;
      margin-bottom: 4px;
    }
    .pillars-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .pillar-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 22px 28px;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: flex-start;
      gap: 20px;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
    }
    .pillar-icon {
      font-size: 32px;
      line-height: 1;
      flex: none;
      margin-top: 2px;
    }
    .pillar-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .pillar-title {
      font-size: 21px;
      font-weight: 700;
      color: #0F172A;
    }
    .pillar-desc {
      font-size: 17px;
      line-height: 1.45;
      color: #475569;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">2 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h1 class="slide-title">The Core Idea</h1>
        <p class="slide-desc">What is Democratic Socialism in simple, everyday language?</p>
      </div>

      <div class="layman-box">
        <div class="layman-tag">The Layman Definition</div>
        <p class="layman-p">
          A society that moves beyond raw capitalism through fair democratic elections, not violent revolutions. Crucial essentials—healthcare, education, clean water, energy, and transit—should be publicly owned and run for the common good, while completely protecting voting rights, free speech, and personal liberty.
        </p>
      </div>

      <div class="section-label">The 3 Defining Pillars</div>
      <div class="pillars-list">
        <div class="pillar-card">
          <div class="pillar-icon">🗳️</div>
          <div class="pillar-content">
            <div class="pillar-title">Democracy First</div>
            <div class="pillar-desc">All structural change occurs through constitutional votes, multiparty elections, and voter consent—rejecting violent insurrection and one-party rule.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🏥</div>
          <div class="pillar-content">
            <div class="pillar-title">Public Essentials Guaranteed</div>
            <div class="pillar-desc">Crucial necessities like healthcare, schooling, and public transport are treated as fundamental human rights, run for public benefit rather than private profit.</div>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">⚖️</div>
          <div class="pillar-content">
            <div class="pillar-title">Tax the Ultra-Wealthy</div>
            <div class="pillar-desc">Steep progressive taxation on massive fortunes and excess corporate profits finances world-class public infrastructure and lifts families out of poverty.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 2 / 6</span>
      <span class="footer-sub">Swipe for Society & State 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 3: Society & State
const slide3Html = `<!DOCTYPE html>
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
    .topics-container {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .topic-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 28px 32px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
    }
    .topic-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .topic-title-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .topic-icon {
      font-size: 32px;
      line-height: 1;
    }
    .topic-title {
      font-size: 26px;
      font-weight: 700;
      color: #0F172A;
    }
    .topic-badge {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
      background: #FEF2F2;
      color: #DC2626;
    }
    .topic-summary {
      font-size: 20px;
      line-height: 1.48;
      color: #334155;
      margin-bottom: 18px;
      font-weight: 500;
    }
    .balance-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #FAF8F5;
      border-radius: 18px;
      padding: 18px 22px;
      border: 1px solid #E2E8F0;
    }
    .balance-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 18px;
      line-height: 1.42;
    }
    .tag-pro {
      color: #166534;
      font-weight: 700;
      flex: none;
    }
    .tag-con {
      color: #991B1B;
      font-weight: 700;
      flex: none;
    }
    .balance-text {
      color: #1E293B;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">3 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h1 class="slide-title">Society & The State</h1>
        <p class="slide-desc">Constitutional liberty, workplace rights, and universal public dignity</p>
      </div>

      <div class="topics-container">
        <!-- Topic 1 -->
        <div class="topic-card">
          <div class="topic-header">
            <div class="topic-title-group">
              <span class="topic-icon">🗳️</span>
              <span class="topic-title">Multiparty Democracy & Civil Rights</span>
            </div>
            <span class="topic-badge">CONSTITUTIONAL RIGHTS</span>
          </div>
          <p class="topic-summary">
            Rejects one-party dictatorship. Believes socialism is meaningless without freedom of speech, an independent press, competitive multiparty elections, and robust trade union democracy.
          </p>
          <div class="balance-grid">
            <div class="balance-row">
              <span class="tag-pro">🟢 The Upside:</span>
              <span class="balance-text">Universal suffrage, legal protection of civil liberties, and government power held accountable to regular voter approval.</span>
            </div>
            <div class="balance-row">
              <span class="tag-con">🔴 The Price:</span>
              <span class="balance-text">Policy reform is deliberative and slow; progressive legislation can be repealed if conservative coalitions win future elections.</span>
            </div>
          </div>
        </div>

        <!-- Topic 2 -->
        <div class="topic-card">
          <div class="topic-header">
            <div class="topic-title-group">
              <span class="topic-icon">🤝</span>
              <span class="topic-title">Universal Welfare & Social Equality</span>
            </div>
            <span class="topic-badge">SOCIAL SECURITY</span>
          </div>
          <p class="topic-summary">
            Decouples human dignity from market wealth. Guarantees universal healthcare, affordable public housing, subsidized childcare, and equal educational access for all children.
          </p>
          <div class="balance-grid">
            <div class="balance-row">
              <span class="tag-pro">🟢 The Upside:</span>
              <span class="balance-text">Major reduction in child poverty, dramatic upward mobility for working-class families, and safety nets during personal crises.</span>
            </div>
            <div class="balance-row">
              <span class="tag-con">🔴 The Price:</span>
              <span class="balance-text">High personal income tax brackets, corporate compliance overhead, and government debt risks during economic downturns.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 3 / 6</span>
      <span class="footer-sub">Swipe for Economy & Planning 👉</span>
    </div>
  </div>
</body>
</html>`;

// Slide 4: Economy & World Politics
const slide4Html = `<!DOCTYPE html>
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
    .topics-container {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .topic-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 28px 32px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
    }
    .topic-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .topic-title-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .topic-icon {
      font-size: 32px;
      line-height: 1;
    }
    .topic-title {
      font-size: 26px;
      font-weight: 700;
      color: #0F172A;
    }
    .topic-badge {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
      background: #FEF2F2;
      color: #DC2626;
    }
    .topic-summary {
      font-size: 20px;
      line-height: 1.48;
      color: #334155;
      margin-bottom: 18px;
      font-weight: 500;
    }
    .balance-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #FAF8F5;
      border-radius: 18px;
      padding: 18px 22px;
      border: 1px solid #E2E8F0;
    }
    .balance-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 18px;
      line-height: 1.42;
    }
    .tag-pro {
      color: #166534;
      font-weight: 700;
      flex: none;
    }
    .tag-con {
      color: #991B1B;
      font-weight: 700;
      flex: none;
    }
    .balance-text {
      color: #1E293B;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">4 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h1 class="slide-title">Economy & World Politics</h1>
        <p class="slide-desc">Strategic public ownership, strong unions, and international solidarity</p>
      </div>

      <div class="topics-container">
        <!-- Topic 1 -->
        <div class="topic-card">
          <div class="topic-header">
            <div class="topic-title-group">
              <span class="topic-icon">🏭</span>
              <span class="topic-title">Mixed Economy & Strategic Ownership</span>
            </div>
            <span class="topic-badge">MIXED ECONOMY</span>
          </div>
          <p class="topic-summary">
            Strategic commanding heights—energy grids, public transport, railways, and water—are held in public trust. Consumer goods, dining, and small businesses remain private and cooperative.
          </p>
          <div class="balance-grid">
            <div class="balance-row">
              <span class="tag-pro">🟢 The Upside:</span>
              <span class="balance-text">Essential utilities are protected from price-gouging cartels, with profits reinvested directly back into civic services.</span>
            </div>
            <div class="balance-row">
              <span class="tag-con">🔴 The Price:</span>
              <span class="balance-text">State enterprises risk bureaucratic complacency, lack market-driven efficiency, and often require taxpayer-funded subsidies.</span>
            </div>
          </div>
        </div>

        <!-- Topic 2 -->
        <div class="topic-card">
          <div class="topic-header">
            <div class="topic-title-group">
              <span class="topic-icon">🌍</span>
              <span class="topic-title">Democratic Internationalism & Peace</span>
            </div>
            <span class="topic-badge">GLOBAL SOLIDARITY</span>
          </div>
          <p class="topic-summary">
            Favors global labor standards, fair trade agreements, ecological treaties, and diplomatic peacekeeping over imperial military intervention or corporate exploitation of the Global South.
          </p>
          <div class="balance-grid">
            <div class="balance-row">
              <span class="tag-pro">🟢 The Upside:</span>
              <span class="balance-text">Strong defense of international human rights, climate cooperation, and peaceful settlement of international border disputes.</span>
            </div>
            <div class="balance-row">
              <span class="tag-con">🔴 The Price:</span>
              <span class="balance-text">Diplomatic reluctance to deploy swift military deterrence against aggressive totalitarian foreign powers.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 4 / 6</span>
      <span class="footer-sub">Swipe for Political Compass 👉</span>
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
      background: rgba(220, 38, 38, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
    }
    .pin-ring-inner {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 3px solid #DC2626;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .pin-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #DC2626;
    }

    .info-footer {
      width: 100%;
      background: #FAF8F5;
      border-radius: 18px;
      padding: 18px 24px;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .info-badge {
      background: #16A34A;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 999px;
      letter-spacing: 0.5px;
      flex: none;
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);
    }
    .info-text {
      font-size: 18px;
      font-weight: 600;
      color: #334155;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">5 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h1 class="slide-title">Where It Sits on the Compass</h1>
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

          <div class="axis-label al-top">Authority</div>
          <div class="axis-label al-bottom">Liberty</div>
          <div class="axis-label al-left">Equality</div>
          <div class="axis-label al-right">Markets</div>

          <div class="corner-badge cb-tl">Auth Left</div>
          <div class="corner-badge cb-tr">Auth Right</div>
          <div class="corner-badge cb-bl">Lib Left</div>
          <div class="corner-badge cb-br">Lib Right</div>

          <!-- Exact pin from algorithm -->
          <div class="pin-target">
            <div class="pin-ring-outer">
              <div class="pin-ring-inner">
                <div class="pin-dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="info-footer">
          <div class="info-badge">Libertarian Left (Democratic Socialist)</div>
          <div class="info-text">
            Sits firmly in the bottom-left quadrant: uniting strong public ownership and wealth redistribution with a deep commitment to personal liberty, free speech, and constitutional democracy.
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Slide 5 / 6</span>
      <span class="footer-sub">Swipe for Real-World Track Record 👉</span>
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
      gap: 26px;
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
      gap: 22px;
    }
    .case-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 30px 34px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .case-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .case-badge-good {
      background: #DCFCE7;
      color: #166534;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .case-badge-bad {
      background: #FEE2E2;
      color: #991B1B;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .case-meta {
      font-size: 15px;
      font-weight: 700;
      color: #64748B;
    }
    .case-title {
      font-size: 26px;
      font-weight: 700;
      color: #0F172A;
    }
    .case-text {
      font-size: 19px;
      line-height: 1.5;
      color: #334155;
      font-weight: 500;
    }
    .quiz-cta-box {
      background: #0F172A;
      border-radius: 24px;
      padding: 28px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 16px 36px rgba(15, 23, 42, 0.16);
      margin-top: 10px;
    }
    .cta-text-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cta-main {
      font-size: 26px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .cta-sub {
      font-size: 18px;
      color: #CBD5E1;
      font-weight: 500;
    }
    .cta-btn {
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: #FFFFFF;
      font-size: 20px;
      font-weight: 700;
      padding: 14px 30px;
      border-radius: 999px;
      box-shadow: 0 6px 18px rgba(220, 38, 38, 0.4);
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="slide-container">
    <div class="header-bar">
      <div class="brand-group">
        <div class="brand-logo"><img src="${logoBase64}" alt="ideoMap"></div>
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="slide-pill">6 / 6</div>
    </div>

    <div class="slide-body">
      <div class="title-block">
        <h1 class="slide-title">Real-World Track Record</h1>
        <p class="slide-desc">Democratic Socialism in history: The welfare state vs. economic distortion</p>
      </div>

      <div class="cases-container">
        <!-- Case 1 -->
        <div class="case-card">
          <div class="case-header">
            <span class="case-badge-good">🟢 Inspiring Example</span>
            <span class="case-meta">UK · 1945–1951</span>
          </div>
          <div class="case-title">Clement Attlee's Post-War UK & NHS</div>
          <p class="case-text">
            Elected in a landslide, the Labour government created the National Health Service (free universal healthcare), built over a million council homes, and brought coal, rail, and utilities into democratic public ownership—establishing the bedrock of the modern welfare state.
          </p>
        </div>

        <!-- Case 2 -->
        <div class="case-card">
          <div class="case-header">
            <span class="case-badge-bad">🔴 The Warning Sign</span>
            <span class="case-meta">Venezuela · 1999 onwards</span>
          </div>
          <div class="case-title">Chávez & Maduro's Economic Collapse</div>
          <p class="case-text">
            Aggressive state takeovers of private industries, expropriations, and unchecked currency printing triggered hyperinflation, chronic shortages of basic food and medicines, and the mass economic displacement of over 7 million citizens.
          </p>
        </div>
      </div>

      <div class="quiz-cta-box">
        <div class="cta-text-group">
          <div class="cta-main">Where do you sit on the spectrum?</div>
          <div class="cta-sub">Discover your closest ideology across all 4 key areas in 2 mins</div>
        </div>
        <div class="cta-btn">Take the Quiz →</div>
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
        <stop offset="0%" stop-color="#DC2626" />
        <stop offset="50%" stop-color="#EF4444" />
        <stop offset="100%" stop-color="#FEE2E2" />
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

function getCardHtml(format) {
  const isStory = format === "story";
  const isPost = format === "post";
  const isSquare = format === "square";

  const W = 1080;
  const H = isStory ? 1920 : (isPost ? 1350 : 1080);

  const cardW = isStory ? 940 : (isPost ? 960 : 980);
  const cardH = isStory ? "height: 1620px;" : "";
  const cardPadding = isStory ? "48px 56px 42px 56px" : (isPost ? "34px 48px 30px 48px" : "24px 36px 20px 36px");

  const logoSize = isStory ? 88 : (isPost ? 64 : 52);
  const brandTitleSize = isStory ? 44 : (isPost ? 35 : 28);
  const taglineSize = isStory ? 22 : (isPost ? 16 : 14);

  const leadSize = isStory ? 22 : (isPost ? 15 : 13);
  const titleSize = isStory ? 84 : (isPost ? 68 : 52);
  const badgeFontSize = isStory ? 22 : (isPost ? 17 : 14);
  const badgePadding = isStory ? "9px 24px" : (isPost ? "6px 18px" : "4px 14px");

  const gaugeW = isStory ? 640 : (isPost ? 530 : 430);
  const gaugeH = isStory ? 320 : (isPost ? 265 : 215);
  const gaugeLegendW = isStory ? 580 : (isPost ? 490 : 400);
  const gaugeSideSize = isStory ? 22 : (isPost ? 18 : 15);
  const gaugeMainSize = isStory ? 54 : (isPost ? 42 : 34);

  const descSize = isStory ? 25 : (isPost ? 20 : 16);
  const descLineHeight = isStory ? 1.55 : 1.45;
  const pillarSize = isStory ? 20 : (isPost ? 15 : 13);
  const pillarPadding = isStory ? "8px 18px" : (isPost ? "6px 14px" : "4px 10px");

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
      border: 1px solid #E2E8F0;
      background: #F8FAFC;
      color: #334155;
    }
    .badge.bold {
      font-weight: 700;
      background: #FEF2F2;
      border-color: #FECACA;
      color: #DC2626;
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
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
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
      <div class="title-text">Democratic Socialism</div>
      <div class="badges-row">
        <div class="badge bold">Far Left</div>
        <div class="badge">e.g. Jawaharlal Nehru</div>
      </div>
    </div>

    <!-- Radial Gauge (-63 score, Band 0 Far Left) -->
    <div class="gauge-group">
      ${getGaugeSvg(-63, 0, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">81% Left</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <!-- Description -->
    <div class="desc-text">
      You want to move beyond capitalism through elections, not revolution: public ownership of key industries, strong unions and universal welfare, together with full democracy.
    </div>

    <!-- 3 Pillars -->
    <div class="pillars-row">
      <div class="pillar-tag">🗳️ Democracy First</div>
      <div class="pillar-tag">🏥 Public Essentials</div>
      <div class="pillar-tag">⚖️ Tax Ultra-Wealthy</div>
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

// Map pages for Chrome renderer
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

const server = http.createServer((req, res) => {
  if (req.url === "/cover.jpg") {
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(fs.readFileSync(coverImagePath));
    return;
  }
  const content = pages[req.url] || pages["/slide1"];
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(content);
});

const PORT = 9896;
const DEBUG_PORT = 9564;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Rendering Democratic Socialism assets on port ${PORT}...`);
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
    { url: "/slide1", width: 1080, height: 1350, format: "jpeg", out: "slide_1_cover.jpg", art: "ds_slide_1.jpg" },
    { url: "/slide2", width: 1080, height: 1350, format: "jpeg", out: "slide_2_intro.jpg", art: "ds_slide_2.jpg" },
    { url: "/slide3", width: 1080, height: 1350, format: "jpeg", out: "slide_3_culture.jpg", art: "ds_slide_3.jpg" },
    { url: "/slide4", width: 1080, height: 1350, format: "jpeg", out: "slide_4_economy.jpg", art: "ds_slide_4.jpg" },
    { url: "/slide5", width: 1080, height: 1350, format: "jpeg", out: "slide_5_compass.jpg", art: "ds_slide_5.jpg" },
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg", art: "ds_slide_6.jpg" },
    { url: "/story", width: 1080, height: 1920, format: "png", out: "story_card_story_9x16.png", art: "ds_story_9x16.png" },
    { url: "/post", width: 1080, height: 1350, format: "png", out: "story_card_post_4x5.png", art: "ds_post_4x5.png" },
    { url: "/square", width: 1080, height: 1080, format: "png", out: "story_card_square_1x1.png", art: "ds_square_1x1.png" }
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
    await new Promise(r => setTimeout(r, 600));
    await send("Runtime.evaluate", { expression: "document.fonts.ready" });

    const screenshot = await send("Page.captureScreenshot", {
      format: job.format,
      quality: job.format === "jpeg" ? 96 : undefined,
      captureBeyondViewport: false
    });

    const targetFile = path.join(OUT_DIR, job.out);
    fs.writeFileSync(targetFile, Buffer.from(screenshot.data, "base64"));
    console.log(`✓ Saved: ${targetFile}`);

    // Also copy to artifact directory for presentation
    fs.writeFileSync(path.join(ARTIFACT_DIR, job.art), Buffer.from(screenshot.data, "base64"));
  }

  // Generate clean explanation.txt
  const explanationContent = `🌹 Democratic Socialism Explained in Simple Terms

What is Democratic Socialism?
Democratic Socialism is a political and economic philosophy that advocates moving beyond raw capitalism through fair democratic elections, not violent revolutions. Crucial essentials—like healthcare, education, clean water, energy, and transit—should be publicly owned and run for the common good, while completely protecting free speech, multiparty voting, and personal liberty.

Unlike authoritarian communism, Democratic Socialists reject one-party rule and bureaucratic dictatorship. They insist that economic equality is meaningless without constitutional democracy and civil rights.

The 3 Defining Pillars:
1. 🗳️ Democracy First: All major economic and social changes happen through democratic votes, free elections, and constitutional consent.
2. 🏥 Public Essentials Guaranteed: Critical services like healthcare, schooling, and public transit are non-negotiable human rights, not for-profit commodities.
3. ⚖️ Tax the Ultra-Wealthy: High progressive taxes on immense fortunes and corporate windfalls fund modern public infrastructure, universities, and hospitals.

Key Thinkers & Historical Figures:
• Jawaharlal Nehru (India, 1889–1964) — India's first Prime Minister, who built a democratic 'mixed economy' with state-owned heavy industries, IITs, major public dams, and planned five-year development without compromising parliamentary democracy.
• Clement Attlee (UK, 1883–1967) — British Labour Prime Minister whose post-WWII administration created the free National Health Service (NHS), built thousands of council homes, and nationalized coal, rail, and electricity through parliamentary votes.
• Ram Manohar Lohia (India, 1910–1967) — Visionary Indian socialist thinker and parliamentarian who championed decentralization ('Chaukhambha Raj') and fought for gender and caste equality alongside democratic state investment.

Real-World Case Studies:
🟢 Clement Attlee's UK Government (UK, 1945–1951): Successfully built the modern welfare state by creating the NHS, ensuring cradle-to-grave social security, and providing universal healthcare free at the point of delivery through peaceful parliamentary democracy.
🔴 Venezuela's Economic Collapse (Venezuela, 1999 onwards): Aggressive expropriation of private firms, reckless state price fixing, and unchecked currency printing led to economic contraction, devastating hyperinflation, and severe food and medicine shortages.

Where do you stand? Find your political match in 2 minutes at https://ideomap.in
`;

  fs.writeFileSync(path.join(OUT_DIR, "explanation.txt"), explanationContent, "utf8");
  console.log(`✓ Saved: explanation.txt`);

  // Generate clean hashtags.txt
  const hashtagsContent = `#democraticsocialism #socialism #socialdemocracy #jawaharlalnehru #clementattlee #nhs #politicalcompass #ideomap #politics #welfarestate #publichealth #workersrights #leftwing #politicaltheory #democracy`;
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
  console.log(`\n🎉 All 11 Democratic Socialism assets generated successfully!`);
  process.exit(0);
});
