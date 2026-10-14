#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "assets/img/og");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Find Google Chrome binary on macOS
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!fs.existsSync(CHROME_PATH)) {
  console.error("Google Chrome binary not found at", CHROME_PATH);
  process.exit(1);
}

// Load quiz data
const sandbox = { window: { QUIZ: {}, STRINGS: {}, SITE_CONFIG: {} } };
vm.createContext(sandbox);
["config.js", "strings.js", "questions.js", "results.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js", file), "utf8"), sandbox, { filename: file });
});

const ideos = sandbox.window.QUIZ.ideologies;
const iconSvgBase64 = fs.readFileSync(path.join(ROOT, "assets/img/icon.svg")).toString("base64");

function getDomainDescriptor(axisIndex, score, lang) {
  // axisIndex: 0: econ, 1: social, 2: civil, 3: world
  if (lang === "hi") {
    if (axisIndex === 0) {
      if (score <= -60) return "धुर वामपंथी (" + score + ")";
      if (score <= -20) return "समानतावादी (" + score + ")";
      if (score <= 20) return "मिश्रित (" + score + ")";
      if (score <= 60) return "बाज़ारवादी (+" + score + ")";
      return "धुर पूँजीवादी (+" + score + ")";
    }
    if (axisIndex === 1) {
      if (score <= -60) return "क्रांतिकारी प्रगतिशील (" + score + ")";
      if (score <= -20) return "प्रगतिशील (" + score + ")";
      if (score <= 20) return "संतुलित (" + score + ")";
      if (score <= 60) return "परंपरावादी (+" + score + ")";
      return "कट्टर परंपरावादी (+" + score + ")";
    }
    if (axisIndex === 2) {
      if (score <= -60) return "अधिकतम स्वतंत्रता (" + score + ")";
      if (score <= -20) return "नागरिक स्वतंत्रता (" + score + ")";
      if (score <= 20) return "संतुलित (" + score + ")";
      if (score <= 60) return "राज्य सत्ता (+" + score + ")";
      return "सख्त अनुशासन (+" + score + ")";
    }
    if (axisIndex === 3) {
      if (score <= -60) return "वैश्विक नागरिक (" + score + ")";
      if (score <= -20) return "अंतरराष्ट्रीय (" + score + ")";
      if (score <= 20) return "तटस्थ (" + score + ")";
      if (score <= 60) return "राष्ट्र प्रथम (+" + score + ")";
      return "पूर्ण संप्रभुता (+" + score + ")";
    }
  } else {
    if (axisIndex === 0) {
      if (score <= -60) return "Socialist (" + score + ")";
      if (score <= -20) return "Centre-Left (" + score + ")";
      if (score <= 20) return "Mixed (" + score + ")";
      if (score <= 60) return "Free Market (+" + score + ")";
      return "Capitalist (+" + score + ")";
    }
    if (axisIndex === 1) {
      if (score <= -60) return "Radical Progressive (" + score + ")";
      if (score <= -20) return "Progressive (" + score + ")";
      if (score <= 20) return "Moderate (" + score + ")";
      if (score <= 60) return "Traditional (+" + score + ")";
      return "Staunch Traditional (+" + score + ")";
    }
    if (axisIndex === 2) {
      if (score <= -60) return "Max Liberty (" + score + ")";
      if (score <= -20) return "Civil Liberty (" + score + ")";
      if (score <= 20) return "Balanced (" + score + ")";
      if (score <= 60) return "Authority (+" + score + ")";
      return "Strict Order (+" + score + ")";
    }
    if (axisIndex === 3) {
      if (score <= -60) return "Globalist (" + score + ")";
      if (score <= -20) return "International (" + score + ")";
      if (score <= 20) return "Neutral (" + score + ")";
      if (score <= 60) return "Patriotic (+" + score + ")";
      return "Sovereign First (+" + score + ")";
    }
  }
  return score > 0 ? "+" + score : "" + score;
}

function buildHtml(ideo, lang) {
  const isHi = lang === "hi";
  const data = ideo[lang] || ideo.en;
  const pos = ideo.pos || [0, 0, 0, 0];

  const axes = [
    {
      name: isHi ? "अर्थव्यवस्था" : "Economy",
      left: isHi ? "समानता (वाम)" : "Socialist (Left)",
      right: isHi ? "बाज़ार (दक्षिण)" : "Free Market (Right)",
      score: pos[0],
      accent: "#a855f7"
    },
    {
      name: isHi ? "समाज" : "Society",
      left: isHi ? "प्रगतिशील" : "Progressive",
      right: isHi ? "परंपरावादी" : "Traditional",
      score: pos[1],
      accent: "#ec4899"
    },
    {
      name: isHi ? "नागरिक आज़ादी" : "Governance",
      left: isHi ? "स्वतंत्रता" : "Liberty",
      right: isHi ? "सत्ता" : "Authority",
      score: pos[2],
      accent: "#3b82f6"
    },
    {
      name: isHi ? "विश्व दृष्टिकोण" : "Worldview",
      left: isHi ? "वैश्विक" : "Global",
      right: isHi ? "राष्ट्रीय" : "National",
      score: pos[3],
      accent: "#10b981"
    }
  ];

  const pillarsHtml = (data.pillars || []).map((p) => {
    // Separate icon/emoji if present
    const parts = p.split(":");
    if (parts.length > 1) {
      return `<div class="pillar-item"><strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(":").trim()}</div>`;
    }
    return `<div class="pillar-item">${p}</div>`;
  }).join("\n");

  const axesHtml = axes.map((a, idx) => {
    const pct = Math.max(2, Math.min(98, ((a.score + 100) / 200) * 100));
    const desc = getDomainDescriptor(idx, a.score, lang);
    const fillStyle = a.score < 0
      ? `left: ${pct}%; width: ${50 - pct}%; background: linear-gradient(90deg, ${a.accent}, rgba(168, 85, 247, 0.4));`
      : `left: 50%; width: ${pct - 50}%; background: linear-gradient(90deg, rgba(168, 85, 247, 0.4), ${a.accent});`;

    return `
      <div class="axis-item">
        <div class="axis-labels">
          <span>${a.left}</span>
          <span class="axis-desc" style="color: ${a.accent}">${desc}</span>
          <span>${a.right}</span>
        </div>
        <div class="axis-bar-wrap">
          <div class="axis-center-line"></div>
          ${a.score !== 0 ? `<div class="axis-fill" style="${fillStyle}"></div>` : ""}
          <div class="axis-dot" style="left: ${pct}%; border-color: ${a.accent}; box-shadow: 0 0 12px ${a.accent};"></div>
        </div>
      </div>
    `;
  }).join("\n");

  const eyebrow = isHi ? "राजनीतिक विचारधारा परिणाम" : "POLITICAL IDEOLOGY PROFILE";
  const verified = isHi ? "सत्यापित परिणाम कार्ड" : "OFFICIAL RESULT CARD";
  const spectrumTitle = isHi ? "स्पेक्ट्रम स्थिति" : "SPECTRUM POSITION";
  const analysisTitle = isHi ? "4-धुरी विश्लेषण" : "4-AXIS ANALYSIS";
  const footerCta = isHi
    ? 'अपनी राजनीतिक विचारधारा 2 मिनट में जानें 👉 <span>ideomap.in</span>'
    : 'Find your political ideology in 2 minutes 👉 <span>ideomap.in</span>';
  const footerMeta = isHi
    ? '12 त्वरित प्रश्न · 100% मुफ़्त · कोई साइन-अप नहीं'
    : '12 Questions · 100% Free · No Sign-up Required';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #090d16;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  .bg-glow-1 {
    position: absolute;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(124, 58, 237, 0) 70%);
    top: -180px;
    left: -120px;
    pointer-events: none;
  }
  .bg-glow-2 {
    position: absolute;
    width: 550px;
    height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0) 70%);
    bottom: -140px;
    right: -80px;
    pointer-events: none;
  }
  .card {
    width: 1140px;
    height: 570px;
    background: rgba(15, 23, 42, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 28px;
    padding: 34px 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(24px);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .brand-logo-img {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }
  .brand-name {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(to right, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .badge-quiz {
    background: rgba(139, 92, 246, 0.18);
    border: 1px solid rgba(139, 92, 246, 0.45);
    color: #c4b5fd;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
  .main-content {
    display: flex;
    gap: 36px;
    align-items: center;
    flex: 1;
    margin: 16px 0;
  }
  .left-col {
    flex: 1.15;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .eyebrow {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #a78bfa;
  }
  .title-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .emoji {
    font-size: 50px;
    line-height: 1;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
  }
  .title {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.1;
    color: #ffffff;
  }
  .tagline-badge {
    display: inline-block;
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: #e2e8f0;
    padding: 5px 13px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  .pillars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
  }
  .pillar-item {
    font-size: 13.5px;
    line-height: 1.38;
    color: #cbd5e1;
    background: rgba(0, 0, 0, 0.28);
    padding: 7px 12px;
    border-radius: 8px;
    border-left: 3px solid #8b5cf6;
  }
  .pillar-item strong {
    color: #ffffff;
    font-weight: 700;
  }
  .right-col {
    flex: 1.1;
    background: rgba(0, 0, 0, 0.38);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 20px;
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.06);
  }
  .graph-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #94a3b8;
    display: flex;
    justify-content: space-between;
  }
  .axis-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .axis-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
  }
  .axis-desc {
    font-weight: 700;
    font-size: 12.5px;
  }
  .axis-bar-wrap {
    height: 14px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 7px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: visible;
  }
  .axis-center-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-50%);
    z-index: 1;
  }
  .axis-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 7px;
    opacity: 0.85;
  }
  .axis-dot {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid #8b5cf6;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 14px;
  }
  .footer-cta {
    font-size: 16px;
    font-weight: 700;
    color: #e2e8f0;
  }
  .footer-cta span {
    color: #38bdf8;
  }
  .footer-meta {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="card">
    <div class="header">
      <div class="brand">
        <img class="brand-logo-img" src="data:image/svg+xml;base64,${iconSvgBase64}" alt="ideoMap Logo">
        <div class="brand-name">ideoMap</div>
      </div>
      <div class="badge-quiz">${verified}</div>
    </div>

    <div class="main-content">
      <div class="left-col">
        <div class="eyebrow">${eyebrow}</div>
        <div class="title-row">
          <div class="emoji">${ideo.emoji}</div>
          <div class="title">${data.title}</div>
        </div>
        <div class="tagline-badge">${data.simpleTitle}</div>
        <div class="pillars">
          ${pillarsHtml}
        </div>
      </div>

      <div class="right-col">
        <div class="graph-title">
          <span>${spectrumTitle}</span>
          <span style="color:#a78bfa">${analysisTitle}</span>
        </div>
        ${axesHtml}
      </div>
    </div>

    <div class="footer">
      <div class="footer-cta">${footerCta}</div>
      <div class="footer-meta">${footerMeta}</div>
    </div>
  </div>
</body>
</html>`;
}

async function renderCard(htmlPath, outPath) {
  try {
    execFileSync(CHROME_PATH, [
      "--headless",
      "--disable-gpu",
      `--screenshot=${outPath}`,
      "--window-size=1200,630",
      htmlPath
    ], { stdio: "ignore" });
    return true;
  } catch (err) {
    console.error("Error generating", outPath, err.message);
    return false;
  }
}

async function main() {
  console.log(`Generating custom OG cards for ${ideos.length} ideologies in English and Hindi...`);
  const tempHtml = path.join("/tmp", "ideomap-og-temp.html");

  for (let i = 0; i < ideos.length; i++) {
    const ideo = ideos[i];
    
    // 1. English Card
    const enHtml = buildHtml(ideo, "en");
    fs.writeFileSync(tempHtml, enHtml);
    const enOut = path.join(OUT_DIR, `${ideo.slug}.png`);
    await renderCard(tempHtml, enOut);
    console.log(`[${i + 1}/${ideos.length}] Created EN: assets/img/og/${ideo.slug}.png`);

    // 2. Hindi Card
    const hiHtml = buildHtml(ideo, "hi");
    fs.writeFileSync(tempHtml, hiHtml);
    const hiOut = path.join(OUT_DIR, `${ideo.slug}-hi.png`);
    await renderCard(tempHtml, hiOut);
    console.log(`[${i + 1}/${ideos.length}] Created HI: assets/img/og/${ideo.slug}-hi.png`);
  }

  try { fs.unlinkSync(tempHtml); } catch (e) {}
  console.log("All 32 custom preview cards generated successfully!");
}

main().catch(console.error);
