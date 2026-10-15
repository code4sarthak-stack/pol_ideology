const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(ROOT, "insta_data/communitarianism");
const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/686acf61-2aee-47b6-9683-6d337fc1ddb0";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Vector SVG logo
const svgLogo = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg"), "utf8");
const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString("base64")}`;

// Custom centerpiece image for Slide 1
const coverImagePath = path.join(ROOT, "tools/communitarianism_custom_cover.jpg");

// Mathematical Compass Engine & Algorithm
const { getCompassModel, crossCheckPin } = require("./compass-algorithm.js");
const compassData = getCompassModel("communitarianism");
console.log(`[Algorithm Verification] ${compassData.title}: pos=[${compassData.pos}] -> Pin at (${compassData.posX}px, ${compassData.posY}px), Quadrant: ${compassData.quadrantName}`);

// Master Top Navigation Bar
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
      padding: 50px 64px 42px 64px;
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
      margin-bottom: 6px;
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
      color: #EA580C;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .cover-title {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 92px;
      line-height: 1.0;
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

    /* Monument Bento Frame */
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
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16), 0 4px 16px rgba(0,0,0,0.06);
      background: #2D1A12;
    }
    .monument-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      display: block;
      filter: contrast(1.03) brightness(0.99);
    }
    .frame-badge {
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(26, 18, 14, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #FFFFFF;
      padding: 10px 24px;
      border-radius: 9999px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
      white-space: nowrap;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
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
    <div class="cover-title">Communitarianism</div>
    <div class="cover-subtitle">Community First · Shared Moral Bonds · Civic Duty</div>
  </div>

  <div class="visual-wrapper">
    <div class="monument-frame">
      <img src="/cover.jpg" alt="Communitarianism - Community and Civic Solidarity">
      <div class="frame-badge">🏘️ Civic Solidarity · Community & Mutual Responsibility</div>
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
      margin-bottom: 16px;
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
    .hero-card {
      background: #FFFFFF;
      border-radius: 26px;
      padding: 34px 38px;
      border-left: 8px solid #EA580C;
      box-shadow: 0 14px 34px rgba(0,0,0,0.05);
      border-top: 1px solid rgba(0,0,0,0.04);
      border-right: 1px solid rgba(0,0,0,0.04);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      margin-bottom: 18px;
    }
    .hero-eyebrow {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #EA580C;
      margin-bottom: 12px;
    }
    .hero-card p {
      font-size: 24px;
      line-height: 1.48;
      color: #1E293B;
      font-weight: 500;
    }
    .pillars-label {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #0F172A;
      margin-bottom: 14px;
    }
    .pillar-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;
    }
    .pillar-item {
      background: #FFFFFF;
      border-radius: 22px;
      padding: 24px 28px;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 6px 18px rgba(0,0,0,0.03);
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
    .pillar-icon {
      font-size: 38px;
      line-height: 1;
      padding-top: 2px;
      flex: none;
    }
    .pillar-content h3 {
      font-size: 23px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 6px;
    }
    .pillar-content p {
      font-size: 19px;
      color: #475569;
      line-height: 1.44;
      font-weight: 450;
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
  ${getMasterTopNavBar("2")}

  <div class="title-wrap">
    <h1>The Core Idea</h1>
    <div class="subtitle">What is Communitarianism in simple language?</div>
  </div>

  <div class="hero-card">
    <div class="hero-eyebrow">The Layman Definition</div>
    <p>Human beings are social beings whose genuine happiness and dignity depend on strong families, supportive neighborhoods, and shared ethical values—not just isolated individuals chasing money. It emphasizes that with every civil right comes a personal duty to care for the community, and that businesses must serve the common good.</p>
  </div>

  <div class="pillars-label">The 3 Defining Pillars</div>
  <div class="pillar-stack">
    <div class="pillar-item">
      <div class="pillar-icon">🏘️</div>
      <div class="pillar-content">
        <h3>Community & Family First</h3>
        <p>Prioritizing healthy local neighborhoods, strong family bonds, voluntary charities, and mutual social support over selfish individualism.</p>
      </div>
    </div>
    <div class="pillar-item">
      <div class="pillar-icon">⚖️</div>
      <div class="pillar-content">
        <h3>Rights Paired with Duties</h3>
        <p>With every constitutional freedom comes an obligation: citizens must actively look after their neighbors, respect public order, and give back to society.</p>
      </div>
    </div>
    <div class="pillar-item">
      <div class="pillar-icon">🤝</div>
      <div class="pillar-content">
        <h3>The Ethical Social Economy</h3>
        <p>Markets and private enterprise are supported, but they must guarantee fair living wages, protect worker dignity, and reinvest in local towns.</p>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Slide 2 / 6</span>
    <span class="swipe-link">Swipe for Society & Culture 👉</span>
  </div>
</body>
</html>`;

// Slide 3: Society & Moral Cohesion
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
      margin-bottom: 16px;
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
    .card-stack {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }
    .topic-card {
      background: #FFFFFF;
      border-radius: 26px;
      padding: 30px 34px;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 10px 28px rgba(0,0,0,0.04);
    }
    .topic-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      background: #FFF7ED;
      color: #C2410C;
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
      color: #334155;
      font-weight: 450;
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
    <h1>Society & Moral Cohesion</h1>
    <div class="subtitle">Belonging and mutual responsibility over hyper-individualism</div>
  </div>

  <div class="card-stack">
    <!-- Card 1 -->
    <div class="topic-card">
      <div class="topic-header">
        <div class="topic-title-group">
          <span class="topic-icon">🌱</span>
          <span class="topic-title">The Social Self & Local Heritage</span>
        </div>
        <span class="topic-badge">CIVIC CULTURE</span>
      </div>
      <div class="topic-summary">
        Communitarians reject viewing individuals as disconnected atoms. Our morality, language, and conscience are formed by families, cultural roots, and neighborhoods. Society thrives when local community institutions—places of worship, clubs, and schools—remain strong.
      </div>
      <div class="balance-grid">
        <div class="balance-row">
          <span class="tag-pro">🟢 The Upside:</span>
          <span class="balance-text">Deep sense of belonging, less social alienation, low loneliness, and a natural grassroots safety net built on mutual trust.</span>
        </div>
        <div class="balance-row">
          <span class="tag-con">🔴 The Price:</span>
          <span class="balance-text">Strong communal expectations can breed conformism, making it harder for eccentric or non-traditional lifestyles to thrive.</span>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="topic-card">
      <div class="topic-header">
        <div class="topic-title-group">
          <span class="topic-icon">⚖️</span>
          <span class="topic-title">Rights Paired With Civic Obligations</span>
        </div>
        <span class="topic-badge">RESPONSIBILITY</span>
      </div>
      <div class="topic-summary">
        A society where everyone demands rights but nobody performs duties will quickly fall apart. Communitarians insist that true freedom requires active participation: volunteering, caring for vulnerable elders, voting, and keeping shared public spaces safe.
      </div>
      <div class="balance-grid">
        <div class="balance-row">
          <span class="tag-pro">🟢 The Upside:</span>
          <span class="balance-text">High civic participation, clean and safe public streets, low crime, and collective resilience during community emergencies.</span>
        </div>
        <div class="balance-row">
          <span class="tag-con">🔴 The Price:</span>
          <span class="balance-text">High expectations of civic conformity can impose heavy social duties, restricting purely self-centered individual freedom.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Slide 3 / 6</span>
    <span class="swipe-link">Swipe for Economy & Welfare 👉</span>
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
      margin-bottom: 16px;
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
    .card-stack {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }
    .topic-card {
      background: #FFFFFF;
      border-radius: 26px;
      padding: 30px 34px;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 10px 28px rgba(0,0,0,0.04);
    }
    .topic-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      background: #ECFDF5;
      color: #059669;
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
      color: #334155;
      font-weight: 450;
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
    <h1>Economy & Global Order</h1>
    <div class="subtitle">Subordinating pure market forces to human well-being and local stability</div>
  </div>

  <div class="card-stack">
    <!-- Card 1 -->
    <div class="topic-card">
      <div class="topic-header">
        <div class="topic-title-group">
          <span class="topic-icon">💼</span>
          <span class="topic-title">The Social Market & Fair Living Wages</span>
        </div>
        <span class="topic-badge">MORAL ECONOMY</span>
      </div>
      <div class="topic-summary">
        Markets are supported as engines of exchange, but they must never reduce human labor into a disposable commodity. Businesses have an obligation to provide fair wages, safe workplaces, and support the community that enables their profits.
      </div>
      <div class="balance-grid">
        <div class="balance-row">
          <span class="tag-pro">🟢 The Upside:</span>
          <span class="balance-text">Stable family incomes, preservation of local town economies, dignity for workers, and reduced economic inequality.</span>
        </div>
        <div class="balance-row">
          <span class="tag-con">🔴 The Price:</span>
          <span class="balance-text">Higher regulatory compliance and community obligations can reduce short-term corporate profits and agility.</span>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="topic-card">
      <div class="topic-header">
        <div class="topic-title-group">
          <span class="topic-icon">🌍</span>
          <span class="topic-title">Subsidiarity & Cultural Sovereignty</span>
        </div>
        <span class="topic-badge">WORLD STAGE</span>
      </div>
      <div class="topic-summary">
        Decisions should always be made at the most local level possible—by families and municipalities before distant national bureaucracies step in. International relations must respect unique cultural traditions rather than imposing universal consumer monoculture.
      </div>
      <div class="balance-grid">
        <div class="balance-row">
          <span class="tag-pro">🟢 The Upside:</span>
          <span class="balance-text">Preserves local cultural heritage, empowers local governments, and curbs unchecked multinational corporate exploitation.</span>
        </div>
        <div class="balance-row">
          <span class="tag-con">🔴 The Price:</span>
          <span class="balance-text">Skepticism of supranational bodies can make large-scale international treaties and global trade pacts slower to negotiate.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Slide 4 / 6</span>
    <span class="swipe-link">Swipe for Political Compass 👉</span>
  </div>
</body>
</html>`;

// Slide 5: Compass (Authoritarian Left)
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
      width: 3px;
      background: #475569;
      transform: translateX(-50%);
      z-index: 2;
    }
    .axis-h {
      position: absolute;
      left: 0; right: 0; top: 50%;
      height: 3px;
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
      background: rgba(255,255,255,0.85);
    }
    .cb-tl { top: 12px; left: 12px; color: #991B1B; }
    .cb-tr { top: 12px; right: 12px; color: #1E40AF; }
    .cb-bl { bottom: 12px; left: 12px; color: #166534; }
    .cb-br { bottom: 12px; right: 12px; color: #854D0E; }
    
    /* Verified Pin Position from compass-algorithm.js: (${compassData.posX}px, ${compassData.posY}px) */
    .pin-authleft {
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
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(225, 29, 72, 0.32);
      position: absolute;
    }
    .pin-ring {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 6px solid #E11D48;
      box-shadow: 0 4px 16px rgba(225, 29, 72, 0.45);
      position: relative;
      z-index: 2;
    }
    .pin-dot {
      width: 10px;
      height: 10px;
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
      background: #E11D48;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 700;
      padding: 8px 22px;
      border-radius: 999px;
      box-shadow: 0 4px 12px rgba(225, 29, 72, 0.28);
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
      <div class="corner-badge cb-tr">Auth Right</div>
      <div class="corner-badge cb-bl">Lib Left</div>
      <div class="corner-badge cb-br">Lib Right</div>

      <div class="pin-authleft">
        <div class="pin-outer-glow"></div>
        <div class="pin-ring">
          <div class="pin-dot"></div>
        </div>
      </div>
    </div>

    <div class="badge-bar">
      <div class="badge-chip">Authoritarian Left (Civic Order)</div>
      <div class="badge-explanation">Sits in the Authoritarian Left quadrant: combining a community-oriented social market economy with strong civic duty, shared moral traditions, and communal responsibility.</div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>Slide 5 / 6</span>
    <span class="swipe-link">Swipe for Real-World Track Record 👉</span>
  </div>
</body>
</html>`;

// Slide 6: Real-World Track Record
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
      margin-bottom: 18px;
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
    .cases-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-bottom: 16px;
    }
    .case-card {
      background: #FFFFFF;
      border-radius: 26px;
      padding: 26px 32px;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 10px 28px rgba(0,0,0,0.04);
    }
    .case-badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .case-badge {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
    }
    .cb-good { background: #DCFCE7; color: #166534; }
    .cb-bad { background: #FEE2E2; color: #991B1B; }
    .case-meta {
      font-size: 16px;
      font-weight: 600;
      color: #64748B;
    }
    .case-name {
      font-size: 24px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .case-desc {
      font-size: 19px;
      line-height: 1.48;
      color: #334155;
      font-weight: 450;
    }
    .cta-banner {
      background: #0F172A;
      border-radius: 26px;
      padding: 30px 36px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 16px 36px rgba(15, 23, 42, 0.22);
      margin-bottom: 10px;
    }
    .cta-left h3 {
      font-size: 28px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .cta-left p {
      font-size: 19px;
      color: #CBD5E1;
      font-weight: 450;
    }
    .cta-btn {
      background: #4F46E5;
      color: #FFFFFF;
      font-size: 19px;
      font-weight: 700;
      padding: 16px 30px;
      border-radius: 999px;
      box-shadow: 0 6px 18px rgba(79, 70, 229, 0.4);
      white-space: nowrap;
      text-decoration: none;
      display: inline-block;
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
  ${getMasterTopNavBar("6")}

  <div class="title-wrap">
    <h1>Real-World Track Record</h1>
    <div class="subtitle">Communitarianism in practice: Mutual solidarity vs. forced conformity</div>
  </div>

  <div class="cases-stack">
    <!-- Good Case -->
    <div class="case-card">
      <div class="case-badge-row">
        <span class="case-badge cb-good">🟢 Inspiring Example</span>
        <span class="case-meta">Western Europe · 1945–1960s</span>
      </div>
      <div class="case-name">Europe's Post-War Christian Democracy & The Social Market</div>
      <div class="case-desc">
        Rebuilt broken nations after WWII by putting family values, community solidarity, worker co-determination, and public healthcare ahead of cutthroat profit. This balanced model drove the German "Economic Miracle" while ensuring no citizen was left stranded.
      </div>
    </div>

    <!-- Bad Case -->
    <div class="case-card">
      <div class="case-badge-row">
        <span class="case-badge cb-bad">🔴 The Warning Sign</span>
        <span class="case-meta">Pakistan · Present Day</span>
      </div>
      <div class="case-name">Jirga Village Councils & Honour-Based Oppression</div>
      <div class="case-desc">
        When unofficial community councils place collective "honour" and tradition above universal human rights, communal rule turns tyrannical. In rural regions, illegal councils brutally punish couples marrying by choice, resulting in over 1,000 honour killings reported annually.
      </div>
    </div>
  </div>

  <div class="cta-banner">
    <div class="cta-left">
      <h3>Where do you sit on the spectrum?</h3>
      <p>Discover your closest ideology across all 4 key areas in 2 mins</p>
    </div>
    <div class="cta-btn">Take the Quiz →</div>
  </div>

  <div class="footer-bar">
    <span>Free · No Sign-up · 2 Minutes</span>
    <span>ideomap.in</span>
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
        <stop offset="0%" stop-color="#E11D48" />
        <stop offset="50%" stop-color="#FB7185" />
        <stop offset="100%" stop-color="#FFF1F2" />
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
  const titleSize = isStory ? 88 : (isPost ? 72 : 56);
  const badgeFontSize = isStory ? 22 : (isPost ? 17 : 14);
  const badgePadding = isStory ? "9px 24px" : (isPost ? "6px 18px" : "4px 14px");

  const gaugeW = isStory ? 640 : (isPost ? 530 : 430);
  const gaugeH = isStory ? 320 : (isPost ? 265 : 215);
  const gaugeLegendW = isStory ? 580 : (isPost ? 490 : 400);
  const gaugeSideSize = isStory ? 22 : (isPost ? 18 : 15);
  const gaugeMainSize = isStory ? 54 : (isPost ? 42 : 34);

  const descSize = isStory ? 26 : (isPost ? 21 : 17);
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${W}px;
      height: ${H}px;
      background: #F8FAFC;
      background-image: radial-gradient(circle at 50% ${Math.round(H * 0.2)}px, rgba(234, 88, 12, 0.10) 0%, rgba(254, 242, 242, 0.35) 45%, rgba(248, 250, 252, 0) 75%);
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
      background: #FFF1F2;
      border-color: #FECDD3;
      color: #E11D48;
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
      background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
      color: #FFFFFF;
      font-size: ${ctaBtnSize}px;
      font-weight: 700;
      padding: ${ctaBtnPadding};
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(234, 88, 12, 0.30);
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
      <div class="title-text">Communitarianism</div>
      <div class="badges-row">
        <div class="badge bold">Centre-Left</div>
        <div class="badge">e.g. Nanaji Deshmukh</div>
      </div>
    </div>

    <!-- Radial Gauge (-25 score, Band 2 Centre-Left) -->
    <div class="gauge-group">
      ${getGaugeSvg(-25, 2, gaugeW, gaugeH)}
      <div class="gauge-legend">
        <div class="gauge-side">FAR LEFT</div>
        <div class="gauge-main">62% Centre-Left</div>
        <div class="gauge-side">FAR RIGHT</div>
      </div>
    </div>

    <!-- Description -->
    <div class="desc-text">
      You believe strong families, communities and shared moral values matter as much as individual rights, and that markets should serve the common good through welfare and fair wages.
    </div>

    <!-- 3 Pillars -->
    <div class="pillars-row">
      <div class="pillar-tag">🏘️ Community First</div>
      <div class="pillar-tag">⚖️ Rights Paired with Duties</div>
      <div class="pillar-tag">🤝 Ethical Economy</div>
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

const PORT = 9898;
const DEBUG_PORT = 9565;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Rendering Communitarianism assets on port ${PORT}...`);
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
    { url: "/slide6", width: 1080, height: 1350, format: "jpeg", out: "slide_6_track_record.jpg" },
    { url: "/story", width: 1080, height: 1920, format: "png", out: "story_card_story_9x16.png" },
    { url: "/post", width: 1080, height: 1350, format: "png", out: "story_card_post_4x5.png" },
    { url: "/square", width: 1080, height: 1080, format: "png", out: "story_card_square_1x1.png" }
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

    // Copy to artifact directory for presentation
    fs.writeFileSync(path.join(ARTIFACT_DIR, job.out), Buffer.from(screenshot.data, "base64"));
  }

  // Generate clean explanation.txt
  const explanationContent = `🏘️ Communitarianism Explained in Simple Terms

What is Communitarianism?
Communitarianism is the political philosophy that places community, family, and shared ethical duty at the heart of human life. It argues that people are not just isolated individuals chasing money or self-interest; our happiness and moral foundation come from belonging to supportive neighborhoods and social networks.

Communitarians believe that with every constitutional right comes a personal duty to help your local community, and that businesses must serve the common good rather than extracting pure profit.

The 3 Defining Pillars:
1. 🏘️ Community & Family First: Strengthening neighborhood bonds, extended families, local charities, and mutual social support over selfish individualism.
2. ⚖️ Rights Paired with Duties: Freedom is incomplete without responsibility. Citizens have an obligation to contribute, volunteer, care for neighbors, and respect public order.
3. 🤝 The Ethical Social Economy: Businesses and markets must guarantee fair living wages, protect worker dignity, and reinvest in the communities that support them.

Key Thinkers & Historical Champions:
• Nanaji Deshmukh (India, 1916–2010) — Bharat Ratna recipient who championed rural communitarian self-reliance in Chitrakoot, building dispute-free villages through grassroots community participation.
• Michael Sandel & Amitai Etzioni — Renowned political philosophers who argued against hyper-individualism, showing that democracy requires shared civic virtue and moral bonds.

Real-World Case Studies:
🟢 Post-War European Christian Democracy (Western Europe, 1945–1960s): Rebuilt war-torn societies on social market principles, worker co-determination, and family support, powering the German economic miracle while maintaining civic peace.
🔴 Jirga Honour Rulings (Pakistan & Tribal Regions, Present Day): When unofficial village councils place collective "honour" above individual human rights, communal pressure becomes tyrannical, leading to unlawful honour-based punishments.

Where do you stand? Find your political match in 2 minutes at https://ideomap.in
`;

  fs.writeFileSync(path.join(OUT_DIR, "explanation.txt"), explanationContent, "utf8");
  console.log(`✓ Saved: explanation.txt`);

  // Generate clean hashtags.txt
  const hashtagsContent = `#communitarianism #community #civicduty #familyvalues #socialmarket #politicalcompass #ideomap #politics #nanajideshmukh #michaelsandel #solidarity #ethics #governance #democracy #civics`;
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
  console.log(`\n🎉 All 11 Communitarianism assets generated successfully!`);
  process.exit(0);
});
