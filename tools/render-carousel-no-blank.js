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

// Load base64 pillar emblem
let pillarBase64 = "";
const pillarPath = path.join(ROOT, "tools/pillar_emblem.png");
if (fs.existsSync(pillarPath)) {
  pillarBase64 = `data:image/png;base64,${fs.readFileSync(pillarPath).toString("base64")}`;
}

const sharedHead = (slideNum) => `
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      background: #FAF8F5;
      font-family: 'Instrument Sans', -apple-system, sans-serif;
      color: #0F172A;
      padding: 60px 68px 52px 68px;
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
      margin-bottom: 24px;
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
      letter-spacing: -0.5px;
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
    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 80px;
      font-weight: 400;
      line-height: 1.04;
      letter-spacing: -0.5px;
      color: #0F172A;
      margin-bottom: 12px;
    }
    .subtitle {
      font-size: 26px;
      color: #475569;
      font-weight: 400;
    }
    .bento-card {
      background: #FFFFFF;
      border-radius: 30px;
      padding: 40px 46px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.06);
      border: 1px solid rgba(0,0,0,0.05);
    }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 16px;
      border-top: 1px solid #E2E8F0;
      color: #64748B;
      font-size: 20px;
      font-weight: 500;
    }
  </style>
`;

function topBar(num) {
  return `
    <div class="top-nav-bar">
      <div style="width: 70px;"></div>
      <div class="brand-header-center">
        <img src="${logoBase64}" class="brand-logo-img" alt="ideoMap" />
        <span class="brand-header-title">ideoMap</span>
      </div>
      <div class="slide-counter">${num} / 6</div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// SLIDE 1: COVER
// -----------------------------------------------------------------------------
const slide1Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(1)}
<style>
  .slide1-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }
  .title-center-wrap {
    text-align: center;
    margin-bottom: 10px;
  }
  .emblem-stage {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 10px 0;
  }
  .emblem-img {
    max-height: 580px;
    max-width: 540px;
    object-fit: contain;
    mix-blend-mode: multiply;
    filter: drop-shadow(0 24px 40px rgba(0,0,0,0.12));
  }
  .floating-badge {
    position: absolute;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    border-radius: 999px;
    padding: 14px 26px;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #0F172A;
  }
  .badge-pos1 {
    top: 60px;
    left: 20px;
  }
  .badge-pos2 {
    bottom: 60px;
    right: 20px;
  }
  .bottom-cta-banner {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 24px;
    padding: 22px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .banner-left {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 22px;
    font-weight: 600;
    color: #0F172A;
  }
  .banner-right {
    font-size: 22px;
    font-weight: 700;
    color: #4F46E5;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
</head>
<body>
  ${topBar(1)}
  <div class="slide1-body">
    <div class="title-center-wrap">
      <h1>Authoritarian Capitalism</h1>
      <div class="subtitle">Strict Rule + Fast-Track Growth</div>
    </div>
    <div class="emblem-stage">
      <div class="floating-badge badge-pos1">
        <span>📈</span> Pro-Market Speed
      </div>
      ${pillarBase64 ? `<img src="${pillarBase64}" class="emblem-img" alt="Authoritarian Capitalism Emblem" />` : ''}
      <div class="floating-badge badge-pos2">
        <span>🏛️</span> Iron-Clad Authority
      </div>
    </div>
    <div class="bottom-cta-banner">
      <div class="banner-left">
        <span>💡</span> Swipe to decode the philosophy
      </div>
      <div class="banner-right">
        <span>Swipe 👉</span>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Modern Ideology Decoder</span>
    <span>ideomap.in</span>
  </div>
</body>
</html>`;

// -----------------------------------------------------------------------------
// SLIDE 2: LAYMAN INTRO
// -----------------------------------------------------------------------------
const slide2Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(2)}
<style>
  .slide2-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 16px 0;
  }
  .title-wrap {
    margin-bottom: 20px;
  }
  .intro-card {
    background: #FFFFFF;
    border-radius: 32px;
    padding: 48px 52px;
    box-shadow: 0 18px 44px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    margin-bottom: 24px;
    position: relative;
    border-left: 10px solid #4F46E5;
  }
  .intro-quote-tag {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #4F46E5;
    margin-bottom: 16px;
  }
  .intro-text {
    font-size: 36px;
    line-height: 1.45;
    color: #1E293B;
    font-weight: 500;
    letter-spacing: -0.4px;
  }
  .pillars-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .pillar-item {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 22px;
    padding: 22px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  }
  .pillar-icon {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex: none;
  }
  .pillar-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pillar-title {
    font-size: 22px;
    font-weight: 700;
    color: #0F172A;
  }
  .pillar-desc {
    font-size: 18px;
    color: #475569;
    line-height: 1.4;
  }
</style>
</head>
<body>
  ${topBar(2)}
  <div class="slide2-body">
    <div class="title-wrap">
      <h1>What is Authoritarian Capitalism in Simple Terms?</h1>
    </div>
    <div class="intro-card">
      <div class="intro-quote-tag">Core Definition</div>
      <div class="intro-text">
        A strong, disciplined government that drives high-speed business growth while banning strikes, protests, and political disruption.
      </div>
    </div>
    <div class="pillars-container">
      <div class="pillar-item">
        <div class="pillar-icon">⚡</div>
        <div class="pillar-content">
          <div class="pillar-title">High-Speed Market Growth</div>
          <div class="pillar-desc">Low corporate taxes, rapid deregulation, and state-backed mega infrastructure.</div>
        </div>
      </div>
      <div class="pillar-item">
        <div class="pillar-icon">🏛️</div>
        <div class="pillar-content">
          <div class="pillar-title">Uncompromising State Order</div>
          <div class="pillar-desc">Centralized government authority that moves decisively without parliamentary deadlock.</div>
        </div>
      </div>
      <div class="pillar-item">
        <div class="pillar-icon">🚫</div>
        <div class="pillar-content">
          <div class="pillar-title">Zero Disruption or Dissent</div>
          <div class="pillar-desc">Strict ban on public protests and worker walkouts to guarantee 24/7 business stability.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Swipe for Culture & Civil Liberties</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

// -----------------------------------------------------------------------------
// SLIDE 3: CULTURE & FREEDOM
// -----------------------------------------------------------------------------
const slide3Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(3)}
<style>
  .slide3-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 16px 0;
  }
  .title-wrap {
    margin-bottom: 20px;
  }
  .cards-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .culture-card {
    background: #FFFFFF;
    border-radius: 30px;
    padding: 38px 44px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .card-header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-tag-title {
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 17px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-amber { background: #D97706; }
  .pill-red { background: #DC2626; }
  .card-quote-sub {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 32px;
    color: #0F172A;
    line-height: 1.2;
  }
  .card-body-text {
    font-size: 22px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .card-micro-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
  }
  .micro-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 15px;
    font-weight: 600;
    color: #475569;
  }
</style>
</head>
<body>
  ${topBar(3)}
  <div class="slide3-body">
    <div class="title-wrap">
      <h1>Culture & Freedom</h1>
      <div class="subtitle">Authoritarian Capitalism: Order Over Liberty</div>
    </div>
    <div class="cards-stack">
      <div class="culture-card">
        <div class="card-header-line">
          <span class="card-tag-title">SOCIETY & CULTURE</span>
          <span class="pill-indicator pill-amber">Social Stability</span>
        </div>
        <div class="card-quote-sub">"Discipline and work ethic above individualism."</div>
        <div class="card-body-text">
          Strict work ethic, traditional family discipline, and social stability are prioritized to maximize national economic productivity and pride.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">Family Stability</span>
          <span class="micro-badge">Social Cohesion</span>
          <span class="micro-badge">Workforce Discipline</span>
        </div>
      </div>
      <div class="culture-card">
        <div class="card-header-line">
          <span class="card-tag-title">CIVIL LIBERTIES</span>
          <span class="pill-indicator pill-red">State Authority</span>
        </div>
        <div class="card-quote-sub">"Public order over political opposition."</div>
        <div class="card-body-text">
          The state heavily restricts political protests, independent labor unions, and opposition media to guarantee uninterrupted commerce and law enforcement.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">No Labor Strikes</span>
          <span class="micro-badge">State Surveillance</span>
          <span class="micro-badge">Controlled Dissent</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Swipe for Economy & World Politics</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

// -----------------------------------------------------------------------------
// SLIDE 4: MONEY & THE WORLD
// -----------------------------------------------------------------------------
const slide4Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(4)}
<style>
  .slide4-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 16px 0;
  }
  .title-wrap {
    margin-bottom: 20px;
  }
  .cards-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .econ-card {
    background: #FFFFFF;
    border-radius: 30px;
    padding: 38px 44px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .card-header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-tag-title {
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #0F172A;
  }
  .pill-indicator {
    font-size: 17px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 9999px;
    color: #FFFFFF;
  }
  .pill-green { background: #059669; }
  .pill-indigo { background: #4338CA; }
  .card-quote-sub {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 32px;
    color: #0F172A;
    line-height: 1.2;
  }
  .card-body-text {
    font-size: 22px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .card-micro-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
  }
  .micro-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 15px;
    font-weight: 600;
    color: #475569;
  }
</style>
</head>
<body>
  ${topBar(4)}
  <div class="slide4-body">
    <div class="title-wrap">
      <h1>Money & The World</h1>
      <div class="subtitle">State-Steered Capitalism on the Global Stage</div>
    </div>
    <div class="cards-stack">
      <div class="econ-card">
        <div class="card-header-line">
          <span class="card-tag-title">THE ECONOMY</span>
          <span class="pill-indicator pill-green">Free Enterprise</span>
        </div>
        <div class="card-quote-sub">"Aggressive pro-growth capitalism."</div>
        <div class="card-body-text">
          Unleashes fierce private enterprise, low corporate taxes, and deregulated export zones, protected and accelerated by decisive state power.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">Low Business Taxes</span>
          <span class="micro-badge">Free Market Zones</span>
          <span class="micro-badge">Fast-Track Approvals</span>
        </div>
      </div>
      <div class="econ-card">
        <div class="card-header-line">
          <span class="card-tag-title">WORLD POLITICS</span>
          <span class="pill-indicator pill-indigo">Strategic Trade</span>
        </div>
        <div class="card-quote-sub">"Welcome foreign investment, guard the borders."</div>
        <div class="card-body-text">
          Aggressively courts multinational corporations and foreign direct investment while fiercely defending domestic sovereignty and security.
        </div>
        <div class="card-micro-tags">
          <span class="micro-badge">FDI Magnet</span>
          <span class="micro-badge">Global Finance Hub</span>
          <span class="micro-badge">Sovereign Defense</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Swipe for Political Compass</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

// -----------------------------------------------------------------------------
// SLIDE 5: POLITICAL COMPASS
// -----------------------------------------------------------------------------
const slide5Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(5)}
<style>
  .slide5-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 16px 0;
  }
  .title-wrap {
    margin-bottom: 16px;
  }
  .compass-card {
    background: #FFFFFF;
    border-radius: 32px;
    padding: 32px 38px 28px 38px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .compass-grid-wrapper {
    width: 540px;
    height: 540px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0,0,0,0.06);
    border: 1.5px solid #CBD5E1;
    margin: 8px 0 20px 0;
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
    background-size: 67.5px 67.5px;
    z-index: 1;
  }
  .label-axis {
    position: absolute;
    font-size: 15px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 3;
  }
  .label-auth { top: 12px; left: 50%; transform: translateX(-50%); }
  .label-lib { bottom: 12px; left: 50%; transform: translateX(-50%); }
  .label-left { left: 12px; top: 50%; transform: translateY(-50%); }
  .label-right { right: 12px; top: 50%; transform: translateY(-50%); }

  .quad-tag {
    position: absolute;
    font-size: 13px;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 3;
  }
  .tag-tl { top: 14px; left: 14px; }
  .tag-tr { top: 14px; right: 14px; color: #4F46E5; font-weight: 700; }
  .tag-bl { bottom: 14px; left: 14px; }
  .tag-br { bottom: 14px; right: 14px; }

  /* Pin marker at x: +55%, y: +75% */
  /* Center is 270px. x=+55 -> 270 + (270*0.55) = 418.5px. y=+75 (up) -> 270 - (270*0.75) = 67.5px. */
  .pin-glow {
    position: absolute;
    left: 418px;
    top: 68px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.35);
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  .pin-core {
    position: absolute;
    left: 418px;
    top: 68px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4F46E5;
    border: 3.5px solid #FFFFFF;
    box-shadow: 0 0 16px rgba(79, 70, 229, 0.95);
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .compass-summary {
    display: flex;
    align-items: center;
    gap: 18px;
    width: 100%;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 22px;
    padding: 20px 26px;
  }
  .compass-badge {
    background: #4F46E5;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
    padding: 10px 22px;
    border-radius: 9999px;
    white-space: nowrap;
  }
  .compass-text {
    font-size: 19px;
    color: #1E293B;
    font-weight: 500;
    line-height: 1.4;
  }
</style>
</head>
<body>
  ${topBar(5)}
  <div class="slide5-body">
    <div class="title-wrap">
      <h1>Where It Sits on the Compass</h1>
      <div class="subtitle">Exact ideological quadrant mapping</div>
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
        <div class="quad-tag tag-tl">Auth Left</div>
        <div class="quad-tag tag-tr">★ Auth Right</div>
        <div class="quad-tag tag-bl">Lib Left</div>
        <div class="quad-tag tag-br">Lib Right</div>
        <div class="pin-glow"></div>
        <div class="pin-core"></div>
      </div>
      <div class="compass-summary">
        <div class="compass-badge">Authoritarian Right</div>
        <div class="compass-text">High state authority combined with aggressive, pro-market capitalism.</div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Swipe for Real-World Track Record</span>
    <span>Swipe 👉</span>
  </div>
</body>
</html>`;

// -----------------------------------------------------------------------------
// SLIDE 6: REAL-WORLD TRACK RECORD
// -----------------------------------------------------------------------------
const slide6Html = `<!DOCTYPE html>
<html>
<head>
${sharedHead(6)}
<style>
  .slide6-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0 16px 0;
  }
  .title-wrap {
    margin-bottom: 20px;
  }
  .cards-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .record-card {
    background: #FFFFFF;
    border-radius: 28px;
    padding: 34px 40px;
    box-shadow: 0 16px 36px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);
    border-left: 10px solid transparent;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .card-success { border-left-color: #16A34A; }
  .card-caution { border-left-color: #DC2626; }
  .record-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .status-badge {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 6px 16px;
    border-radius: 9999px;
  }
  .badge-success { background: #DCFCE7; color: #15803D; }
  .badge-caution { background: #FEE2E2; color: #B91C1C; }
  .record-era {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 600;
    color: #64748B;
  }
  .record-title {
    font-size: 26px;
    font-weight: 700;
    color: #0F172A;
  }
  .record-desc {
    font-size: 20px;
    line-height: 1.5;
    color: #334155;
    font-weight: 400;
  }
  .record-highlight {
    background: #F8FAFC;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cta-section {
    background: #0F172A;
    border-radius: 28px;
    padding: 32px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 18px 44px rgba(15, 23, 42, 0.2);
    color: #FFFFFF;
  }
  .cta-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .cta-heading {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 1.1;
  }
  .cta-subtext {
    font-size: 17px;
    color: #94A3B8;
  }
  .cta-button {
    background: #4F46E5;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    padding: 16px 32px;
    border-radius: 999px;
    white-space: nowrap;
    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
</head>
<body>
  ${topBar(6)}
  <div class="slide6-body">
    <div class="title-wrap">
      <h1>Real-World In Practice</h1>
      <div class="subtitle">Historical Precedents & Cautionary Lessons</div>
    </div>
    <div class="cards-stack">
      <div class="record-card card-success">
        <div class="record-header-row">
          <span class="status-badge badge-success">🟢 Success Case</span>
          <span class="record-era">Singapore • 1965–1990</span>
        </div>
        <div class="record-title">Singapore's Economic Miracle</div>
        <div class="record-desc">
          Transformed from a vulnerable third-world port into a global financial powerhouse through strict social order and state-backed capitalism under Lee Kuan Yew.
        </div>
        <div class="record-highlight">
          <span>📊</span> Key Result: GDP per capita surged from $970 to over $14,000.
        </div>
      </div>
      <div class="record-card card-caution">
        <div class="record-header-row">
          <span class="status-badge badge-caution">🔴 Cautionary Case</span>
          <span class="record-era">Chile • 1973–1990</span>
        </div>
        <div class="record-title">Pinochet's Violent Crackdowns</div>
        <div class="record-desc">
          Radical free-market deregulation and privatization enforced through military dictatorship, dissolution of congress, and widespread human rights abuses.
        </div>
        <div class="record-highlight">
          <span>⚠️</span> Key Impact: Total suppression of democracy and severe social inequality.
        </div>
      </div>
    </div>
    <div class="cta-section">
      <div class="cta-left">
        <div class="cta-heading">Where do you stand?</div>
        <div class="cta-subtext">Take the free 12-question quiz to find your ideology</div>
      </div>
      <div class="cta-button">
        <span>ideomap.in</span>
        <span>→</span>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span>Share this carousel with friends</span>
    <span>Save & Follow</span>
  </div>
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

const PORT = 9890;
server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Server listening on ${PORT}`);
  const DEBUG_PORT = 9557;
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
    // Standard 4:5 Instagram Portrait resolution: 1080 x 1350 px!
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1080,
      height: 1350,
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
    console.log("Successfully rendered at 1080x1350:", path.basename(outPath));
    ws.close();
  }

  try {
    for (const s of slides) {
      await captureSlide(s.path, path.join(OUT_DIR, s.file));
    }
    console.log("\nAll 6 slides rendered at full 1080x1350 with ZERO dead blank space!");
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
