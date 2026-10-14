#!/usr/bin/env node
/*
 * Builds the static ideology guide pages and sitemap.xml.
 *
 *   node tools/ideology-pages/build.js
 *
 * Reads the short ideology data from assets/js (results.js, questions.js, strings.js) and the
 * long-form text from content.js, then writes plain HTML so search engines and AdSense reviewers
 * can read every word without running JavaScript:
 *
 *   ideology/<slug>.html       English
 *   hi/ideology/<slug>.html    Hindi
 *
 * Only ideologies that have an entry in content.js get a page. Re-run after editing either source
 * and commit the generated files.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "../..");
const CONTENT = require("./content.js");

/* ---------- Load the site's own data files ---------- */

const sandbox = { window: {} };
vm.createContext(sandbox);
["config.js", "strings.js", "questions.js", "results.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js", file), "utf8"), sandbox, { filename: file });
});
const CFG = sandbox.window.SITE_CONFIG;
const STR = sandbox.window.STRINGS;
const QUIZ = sandbox.window.QUIZ;
const SITE = "https://" + CFG.DOMAIN + "/";
const DOMAINS = ["econ", "social", "civil", "world"]; // order matches each ideology's pos[]
const LANGS = ["en", "hi"];

/* ---------- Page text that is the same for every ideology ---------- */

const UI = {
  en: {
    eyebrow: "Political ideology guide",
    simple: "In simple words",
    beliefs: "Core beliefs",
    map: "Where it sits on the political map",
    mapSub: "A typical position on ideoMap's four scales.",
    worked: "When it worked",
    wrong: "When it went wrong",
    supporters: "What supporters say",
    critics: "What critics say",
    people: "Famous figures",
    faq: "Common questions",
    similar: "Similar ideologies",
    opposite: "Most different",
    takeQuiz: "Take the free quiz →",
    ctaTitle: "Which of the 16 ideologies are you?",
    ctaText: "Answer 12 quick questions in about 2 minutes. Free, no sign-up.",
    note: "Examples are simplified to help you think. They are not meant to praise or blame any country, party or people.",
    hubTitle: "All 16 political ideologies, explained simply",
    hubDesc: "Explore all 16 political ideologies from the ideoMap quiz. Simple, plain-language guides with real-world examples from India and the world, pros, cons and key figures.",
    hubIntro: "Every person sees the world through a set of political lenses, whether they realize it or not. Should governments own essential utilities or leave them to competitive markets? Do traditions protect our communities, or do they hold people back? Does national sovereignty matter more than international cooperation? Across modern history, thinkers and everyday citizens have answered these questions in fundamentally different ways, creating 16 distinct political ideologies. Each worldview offers its own vision of fairness, prosperity and human freedom, along with real-world successes and cautionary failures. Below, you will find simple, plain-language guides to all 16 ideologies featured in the ideoMap quiz, with concrete examples from India and around the globe.",
    hubReadMore: "Read full guide →",
    footer: { about: "About", privacy: "Privacy Policy", terms: "Terms of Service", contact: "Contact", stats: "Community Stats", ideologies: "All ideologies" }
  },
  hi: {
    eyebrow: "राजनीतिक विचारधारा गाइड",
    simple: "आसान भाषा में",
    beliefs: "मुख्य विचार",
    map: "राजनीतिक नक़्शे पर इसकी जगह",
    mapSub: "ideoMap के चार पैमानों पर इसकी आम जगह।",
    worked: "जब यह कामयाब रहा",
    wrong: "जब यह नाकाम रहा",
    supporters: "समर्थक क्या कहते हैं",
    critics: "आलोचक क्या कहते हैं",
    people: "जानी-मानी हस्तियाँ",
    faq: "आम सवाल",
    similar: "मिलती-जुलती विचारधाराएँ",
    opposite: "सबसे अलग विचारधारा",
    takeQuiz: "मुफ़्त क्विज़ शुरू करें →",
    ctaTitle: "आप 16 में से कौन-सी विचारधारा हैं?",
    ctaText: "क़रीब 2 मिनट में 12 आसान सवालों के जवाब दीजिए। मुफ़्त, बिना साइन-अप।",
    note: "ये उदाहरण सोचने में मदद के लिए आसान बनाकर लिखे गए हैं। इनका मक़सद किसी देश, पार्टी या लोगों की तारीफ़ या बुराई करना नहीं है।",
    hubTitle: "16 राजनीतिक विचारधाराएँ, आसान भाषा में",
    hubDesc: "ideoMap क्विज़ की सभी 16 राजनीतिक विचारधाराओं को आसान भाषा में समझें। भारत और दुनिया के उदाहरण, फ़ायदे, कमियाँ और प्रमुख हस्तियाँ।",
    hubIntro: "हर इंसान समाज और राजनीति को किसी न किसी नज़रिए से देखता है, चाहे वह इसे कोई नाम दे या न दे। क्या सरकार को अस्पताल और स्कूल चलाने चाहिए या इन्हें खुले बाज़ार के भरोसे छोड़ देना चाहिए? क्या पुरानी परंपराएँ हमें जोड़े रखती हैं या वे व्यक्तिगत आज़ादी में रुकावट बनती हैं? क्या राष्ट्रीय संप्रभुता अंतरराष्ट्रीय सहयोग से ज़्यादा अहम है? आधुनिक इतिहास में विचारकों और आम नागरिकों ने इन बुनियादी सवालों के अलग-अलग जवाब दिए हैं, जिनसे 16 प्रमुख राजनीतिक विचारधाराएँ जन्मी हैं। हर सोच की अपनी खूबियाँ, ऐतिहासिक कामयाबियाँ और चेतावनियाँ हैं। यहाँ ideoMap क्विज़ की सभी 16 विचारधाराओं को आसान भाषा में समझाया गया है, भारत और दुनिया के ठोस उदाहरणों के साथ।",
    hubReadMore: "पूरी गाइड पढ़ें →",
    footer: { about: "हमारे बारे में", privacy: "प्राइवेसी पॉलिसी", terms: "नियम और शर्तें", contact: "संपर्क", stats: "कम्युनिटी आँकड़े", ideologies: "सभी विचारधाराएँ" }
  }
};

// Same icons as the result page (assets/js/app.js).
const ICON = {
  good: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 10V9"/><path d="M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/></svg>',
  bad: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></svg>'
};

/* ---------- Helpers (scoring mirrors assets/js/app.js) ---------- */

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function bandIndex(v) {
  return v <= -60 ? 0 : v < -20 ? 1 : v <= 20 ? 2 : v < 60 ? 3 : 4;
}

function overallIndex(v) {
  const bands = QUIZ.overallBands;
  for (let i = 0; i < bands.length - 1; i++) if (v <= bands[i].max) return i;
  return bands.length - 1;
}

function overallScore(pos) {
  return Math.round(0.5 * pos[0] + 0.5 * ((pos[1] + pos[2] + pos[3]) / 3));
}

function distance(a, b) {
  return a.pos.reduce((sum, v, i) => sum + Math.pow(v - b.pos[i], 2), 0);
}

function getSlug(key) {
  const ideo = QUIZ.ideologies.find((o) => o.key === key);
  if (!ideo || !ideo.slug) throw new Error(`Missing slug in results.js for ideology: ${key}`);
  return ideo.slug;
}

function pagePath(key, lang) {
  return (lang === "hi" ? "hi/" : "") + "ideology/" + getSlug(key) + ".html";
}

// Link from one generated page to another (both live in ideology/ or both in hi/ideology/).
function siblingHref(key) {
  return getSlug(key) + ".html";
}

/* ---------- Page sections ---------- */

function meter(value, leftName, rightName, label) {
  const leftPct = Math.round((100 - value) / 2);
  const rightPct = 100 - leftPct;
  const segs = ["l2", "l1", "mid", "r1", "r2"].map((seg, i) =>
    `<span class="meter__seg meter__seg--${seg}${i === bandIndex(value) ? " is-active" : ""}" style="flex-basis: 20%;"></span>`).join("");
  return `<div class="meter">` +
    `<div class="meter__track" role="img" aria-label="${esc(`${leftPct}% ${leftName}, ${rightPct}% ${rightName} · ${label}`)}">` +
    `${segs}<span class="meter__marker" style="left: ${(value + 100) / 2}%;"></span></div>` +
    `<div class="meter__ends" aria-hidden="true"><span class="meter__end"><strong>${leftPct}%</strong> ${esc(leftName)}</span>` +
    `<span class="meter__end">${esc(rightName)} <strong>${rightPct}%</strong></span></div></div>`;
}

function compass(ideo, lang) {
  // 200x200 chart: x = economic (Left → Right), y = civil (Authority at top, Liberty at bottom).
  const civil = QUIZ.domains.civil[lang];
  const x = (100 + (ideo.pos[0] / 100) * 84).toFixed(1);
  const y = (100 - (ideo.pos[2] / 100) * 84).toFixed(1);
  let grid = "";
  for (let i = 16; i <= 184; i += 21) {
    grid += `<line x1="${i}" y1="16" x2="${i}" y2="184"/><line x1="16" y1="${i}" x2="184" y2="${i}"/>`;
  }
  return `<svg class="compass" viewBox="0 0 200 210" role="img" aria-label="${esc(UI[lang].map)}">` +
    `<defs><clipPath id="compass-clip"><rect x="16" y="16" width="168" height="168" rx="14"/></clipPath>` +
    `<filter id="compass-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.22"/></filter></defs>` +
    `<g clip-path="url(#compass-clip)">` +
    `<rect x="16" y="16" width="84" height="84" fill="var(--q-auth-left)"/><rect x="100" y="16" width="84" height="84" fill="var(--q-auth-right)"/>` +
    `<rect x="16" y="100" width="84" height="84" fill="var(--q-lib-left)"/><rect x="100" y="100" width="84" height="84" fill="var(--q-lib-right)"/>` +
    `<g stroke="var(--surface)" stroke-width="0.75" opacity="0.95">${grid}</g></g>` +
    `<rect x="16" y="16" width="168" height="168" rx="14" fill="none" stroke="var(--border-strong)" stroke-width="1"/>` +
    `<line x1="100" y1="16" x2="100" y2="184" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>` +
    `<line x1="16" y1="100" x2="184" y2="100" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>` +
    `<path d="M${x} 100V${y}M100 ${y}H${x}" fill="none" stroke="var(--accent)" stroke-width="0.85" stroke-dasharray="2.5 2.5" opacity="0.65"/>` +
    `<text x="100" y="11" text-anchor="middle" class="compass-label">${esc(civil.right)}</text>` +
    `<text x="100" y="198" text-anchor="middle" class="compass-label">${esc(civil.left)}</text>` +
    `<text x="9" y="100" text-anchor="middle" transform="rotate(-90 9 100)" class="compass-label">${esc(STR[lang].left)}</text>` +
    `<text x="191" y="100" text-anchor="middle" transform="rotate(90 191 100)" class="compass-label">${esc(STR[lang].right)}</text>` +
    `<circle cx="${x}" cy="${y}" r="5.5" fill="var(--accent)" stroke="#ffffff" stroke-width="2" filter="url(#compass-shadow)"/>` +
    `</svg>`;
}

function example(kind, ex, lang) {
  return `<article class="example example--${kind}">` +
    `<p class="example__tag">${ICON[kind]}<span>${esc(STR[lang][kind + "Tag"])}</span></p>` +
    `<h3 class="example__name">${esc(ex.name)}</h3>` +
    `<p class="example__when">${esc(ex.when)}</p>` +
    `<p class="example__text">${esc(ex.text)}</p></article>`;
}

function pillar(text) {
  // "🏪 Pro-business: Private enterprise …" → icon, bold label, explanation.
  const m = text.match(/^(\S+)\s+([^:]+):\s*(.*)$/);
  if (!m) return `<li>${esc(text)}</li>`;
  return `<li><span class="ideo-beliefs__icon" aria-hidden="true">${m[1]}</span>` +
    `<span><strong>${esc(m[2])}:</strong> ${esc(m[3])}</span></li>`;
}

function chip(ideo, lang) {
  const inner = `<span class="neighbour-chip__emoji" aria-hidden="true">${ideo.emoji}</span>` +
    `<span class="neighbour-chip__name">${esc(ideo[lang].title)}</span>`;
  return CONTENT[ideo.key]
    ? `<a class="neighbour-chip" href="${siblingHref(ideo.key)}">${inner}</a>`
    : `<span class="neighbour-chip neighbour-chip--static">${inner}</span>`;
}

function page(ideo, lang) {
  const c = CONTENT[ideo.key][lang];
  const d = ideo[lang];
  const ui = UI[lang];
  const other = lang === "en" ? "hi" : "en";
  const root = lang === "hi" ? "../../" : "../";
  const self = SITE + pagePath(ideo.key, lang);
  const quizHref = `${root}start.html?lang=${lang}`;
  const otherHref = (lang === "en" ? "../hi/ideology/" : "../../ideology/") + siblingHref(ideo.key);

  const ranked = QUIZ.ideologies.filter((o) => o.key !== ideo.key).sort((a, b) => distance(ideo, a) - distance(ideo, b));
  const similar = ranked.slice(0, 3);
  const opposite = ranked[ranked.length - 1];

  const meters = DOMAINS.map((dom, i) => {
    const value = ideo.pos[i];
    const names = QUIZ.domains[dom][lang];
    const label = QUIZ.bands[dom][bandIndex(value)][lang].label;
    return `<div class="ideo-map__row"><div class="meter-head"><span class="meter-head__title">${QUIZ.domains[dom].icon} ${esc(names.name)}</span>` +
      `<span class="badge">${esc(label)}</span></div>${meter(value, names.left, names.right, label)}</div>`;
  }).join("\n          ");

  const list = (items) => items.map((s) => `<li>${esc(s)}</li>`).join("");

  const slug = getSlug(ideo.key);
  const ogImg = (lang === "hi") ? `${SITE}assets/img/og/${slug}-hi.png` : `${SITE}assets/img/og/${slug}.png`;

  return `<!doctype html>
<html lang="${lang}" data-lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(c.metaTitle)} | ideoMap</title>
  <meta name="description" content="${esc(c.metaDescription)}">
  <link rel="canonical" href="${self}">
  <link rel="alternate" hreflang="en" href="${SITE + pagePath(ideo.key, "en")}">
  <link rel="alternate" hreflang="hi" href="${SITE + pagePath(ideo.key, "hi")}">
  <link rel="alternate" hreflang="x-default" href="${SITE + pagePath(ideo.key, "en")}">
  <meta name="theme-color" content="#fcfcfd">
  <link rel="icon" href="${root}assets/img/icon.svg" type="image/svg+xml">
  <link rel="manifest" href="${root}site.webmanifest">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="ideoMap">
  <meta property="og:title" content="${esc(d.title + ": " + d.simpleTitle)}">
  <meta property="og:description" content="${esc(c.metaDescription)}">
  <meta property="og:url" content="${self}">
  <meta property="og:image" content="${ogImg}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${ogImg}">
  <link rel="preload" href="${root}assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${root}assets/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${root}assets/css/style.css">
</head>
<body data-page="ideology">
  <header class="site-header">
    <a class="brand" href="${root}index.html"><img src="${root}assets/img/icon.svg" alt="" width="28" height="28"><span>ideoMap</span></a>
    <a class="lang-switch" href="${otherHref}" lang="${other}" hreflang="${other}">${esc(STR[lang].langSwitch)}</a>
  </header>

  <main class="container ideo">
    <section class="card ideo-hero">
      <p class="ideo-hero__eyebrow">${esc(ui.eyebrow)}</p>
      <h1 class="ideo-hero__title"><span class="ideo-hero__emoji" aria-hidden="true">${ideo.emoji}</span>${esc(d.title)}</h1>
      <div class="ideo-hero__badges">
        <span class="badge badge--accent">${esc(d.simpleTitle)}</span>
        <span class="badge">${esc(QUIZ.overallBands[overallIndex(overallScore(ideo.pos))][lang])}</span>
      </div>
      <p class="ideo-hero__lead">${esc(c.lead)}</p>
      <p class="ideo-hero__ask">${esc(c.ctaQuestion)}</p>
      <a class="btn btn--primary" href="${quizHref}">${esc(ui.takeQuiz)}</a>
    </section>

    <section class="card ideo-section">
      <h2>${esc(ui.simple)}</h2>
      ${c.simple.map((p) => `<p>${esc(p)}</p>`).join("\n      ")}
    </section>

    <section class="card ideo-section">
      <h2>${esc(ui.beliefs)}</h2>
      <ul class="ideo-beliefs">${d.pillars.map(pillar).join("")}</ul>
    </section>

    <div class="ad" data-ad="middle"></div>

    <section class="card ideo-section">
      <h2>${esc(ui.map)}</h2>
      <p class="muted">${esc(ui.mapSub)}</p>
      <div class="ideo-map">
        <div class="ideo-map__meters">
          ${meters}
        </div>
        <div class="ideo-map__compass">${compass(ideo, lang)}</div>
      </div>
    </section>

    <section class="card ideo-section">
      <h2>${esc(ui.worked)}</h2>
      <div class="examples examples--list">${c.good.map((ex) => example("good", ex, lang)).join("")}</div>
    </section>

    <section class="card ideo-section">
      <h2>${esc(ui.wrong)}</h2>
      <div class="examples examples--list">${c.bad.map((ex) => example("bad", ex, lang)).join("")}</div>
    </section>

    <div class="ad" data-ad="middle"></div>

    <div class="card-grid">
      <section class="card ideo-section ideo-voices ideo-voices--for">
        <h2>${esc(ui.supporters)}</h2>
        <ul>${list(c.supporters)}</ul>
      </section>
      <section class="card ideo-section ideo-voices ideo-voices--against">
        <h2>${esc(ui.critics)}</h2>
        <ul>${list(c.critics)}</ul>
      </section>
    </div>

    <section class="card ideo-section">
      <h2>${esc(ui.people)}</h2>
      <ul class="ideo-people">${c.people.map((p) =>
        `<li><p class="ideo-people__name">${esc(p.name)}</p><p class="ideo-people__when">${esc(p.when)}</p><p>${esc(p.text)}</p></li>`).join("")}</ul>
    </section>

    <section class="card ideo-section ideo-faq">
      <h2>${esc(ui.faq)}</h2>
      ${c.faq.map((f) => `<h3>${esc(f.q)}</h3>\n      <p>${esc(f.a)}</p>`).join("\n      ")}
    </section>

    <div class="ad" data-ad="bottom"></div>

    <section class="card ideo-section">
      <h2>${esc(ui.similar)}</h2>
      <div class="neighbour-chips">${similar.map((o) => chip(o, lang)).join("")}</div>
      <h3 class="ideo-section__sub">${esc(ui.opposite)}</h3>
      <div class="neighbour-chips">${chip(opposite, lang)}</div>
    </section>

    <section class="card ideo-cta">
      <h2>${esc(ui.ctaTitle)}</h2>
      <p>${esc(ui.ctaText)}</p>
      <a class="btn btn--primary" href="${quizHref}">${esc(ui.takeQuiz)}</a>
    </section>

    <p class="ideo-note">${esc(ui.note)}</p>
  </main>

  <footer class="site-footer">
    <nav>
      <a href="${root}about.html">${esc(ui.footer.about)}</a>
      <a href="${root}privacy.html">${esc(ui.footer.privacy)}</a>
      <a href="${root}terms.html">${esc(ui.footer.terms)}</a>
      <a href="${root}contact.html">${esc(ui.footer.contact)}</a>
      <a href="${root}stats.html">${esc(ui.footer.stats)}</a>
      <a href="index.html" class="footer-ideo-link">${esc(ui.footer.ideologies)}</a>
    </nav>
    <p>© ideoMap · Powered by <a href="https://examlytix.com" target="_blank" rel="noopener">Examlytix</a></p>
  </footer>

  <script src="${root}assets/js/config.js"></script>
  <script src="${root}assets/js/strings.js"></script>
  <script src="${root}assets/js/questions.js"></script>
  <script src="${root}assets/js/app.js"></script>
</body>
</html>
`;
}

function hubPage(lang) {
  const ui = UI[lang];
  const other = lang === "en" ? "hi" : "en";
  const root = lang === "hi" ? "../../" : "../";
  const rel = (lang === "hi" ? "hi/" : "") + "ideology/index.html";
  const self = SITE + rel;
  const otherHref = (lang === "en" ? "../hi/ideology/" : "../../ideology/") + "index.html";
  const quizHref = `${root}start.html?lang=${lang}`;

  const cards = QUIZ.ideologies.map((ideo) => {
    const c = CONTENT[ideo.key][lang];
    const d = ideo[lang];
    const guideHref = siblingHref(ideo.key);
    return `<a class="card ideo-hub-card" href="${guideHref}">` +
      `<div class="ideo-hub-card__top">` +
      `<span class="ideo-hub-card__emoji" aria-hidden="true">${ideo.emoji}</span>` +
      `<div class="ideo-hub-card__titles">` +
      `<h2 class="ideo-hub-card__title">${esc(d.title)}</h2>` +
      `<span class="badge badge--accent">${esc(d.simpleTitle)}</span>` +
      `</div></div>` +
      `<p class="ideo-hub-card__lead">${esc(c.lead)}</p>` +
      `<span class="ideo-hub-card__link">${esc(ui.hubReadMore)}</span>` +
      `</a>`;
  });

  const firstEight = cards.slice(0, 8).join("\n      ");
  const lastEight = cards.slice(8, 16).join("\n      ");

  return `<!doctype html>
<html lang="${lang}" data-lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(ui.hubTitle)} | ideoMap</title>
  <meta name="description" content="${esc(ui.hubDesc)}">
  <link rel="canonical" href="${self}">
  <link rel="alternate" hreflang="en" href="${SITE}ideology/index.html">
  <link rel="alternate" hreflang="hi" href="${SITE}hi/ideology/index.html">
  <link rel="alternate" hreflang="x-default" href="${SITE}ideology/index.html">
  <meta name="theme-color" content="#fcfcfd">
  <link rel="icon" href="${root}assets/img/icon.svg" type="image/svg+xml">
  <link rel="manifest" href="${root}site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ideoMap">
  <meta property="og:title" content="${esc(ui.hubTitle)}">
  <meta property="og:description" content="${esc(ui.hubDesc)}">
  <meta property="og:url" content="${self}">
  <meta property="og:image" content="${SITE}assets/img/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="${root}assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${root}assets/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${root}assets/css/style.css">
</head>
<body data-page="ideology-hub">
  <header class="site-header">
    <a class="brand" href="${root}index.html"><img src="${root}assets/img/icon.svg" alt="" width="28" height="28"><span>ideoMap</span></a>
    <a class="lang-switch" href="${otherHref}" lang="${other}" hreflang="${other}">${esc(STR[lang].langSwitch)}</a>
  </header>

  <main class="container ideo ideo-hub">
    <section class="card ideo-hero">
      <p class="ideo-hero__eyebrow">${esc(ui.eyebrow)}</p>
      <h1 class="ideo-hero__title">${esc(ui.hubTitle)}</h1>
      <p class="ideo-hero__lead">${esc(ui.hubIntro)}</p>
      <a class="btn btn--primary" href="${quizHref}">${esc(ui.takeQuiz)}</a>
    </section>

    <div class="ideo-hub-grid">
      ${firstEight}
    </div>

    <div class="ad" data-ad="middle"></div>

    <div class="ideo-hub-grid">
      ${lastEight}
    </div>

    <div class="ad" data-ad="bottom"></div>

    <section class="card ideo-cta">
      <h2>${esc(ui.ctaTitle)}</h2>
      <p>${esc(ui.ctaText)}</p>
      <a class="btn btn--primary" href="${quizHref}">${esc(ui.takeQuiz)}</a>
    </section>
  </main>

  <footer class="site-footer">
    <nav>
      <a href="${root}about.html">${esc(ui.footer.about)}</a>
      <a href="${root}privacy.html">${esc(ui.footer.privacy)}</a>
      <a href="${root}terms.html">${esc(ui.footer.terms)}</a>
      <a href="${root}contact.html">${esc(ui.footer.contact)}</a>
      <a href="${root}stats.html">${esc(ui.footer.stats)}</a>
      <a href="index.html" class="footer-ideo-link">${esc(ui.footer.ideologies)}</a>
    </nav>
    <p>© ideoMap · Powered by <a href="https://examlytix.com" target="_blank" rel="noopener">Examlytix</a></p>
  </footer>

  <script src="${root}assets/js/config.js"></script>
  <script src="${root}assets/js/strings.js"></script>
  <script src="${root}assets/js/questions.js"></script>
  <script src="${root}assets/js/app.js"></script>
</body>
</html>
`;
}

/* ---------- Write pages and sitemap ---------- */

const written = [];
Object.keys(CONTENT).forEach((key) => {
  const ideo = QUIZ.ideologies.find((o) => o.key === key);
  if (!ideo) throw new Error(`content.js has "${key}", which is not an ideology in results.js`);
  LANGS.forEach((lang) => {
    const rel = pagePath(key, lang);
    const file = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page(ideo, lang));
    written.push(rel);
  });
});

// Write hub pages: ideology/index.html and hi/ideology/index.html
LANGS.forEach((lang) => {
  const rel = (lang === "hi" ? "hi/" : "") + "ideology/index.html";
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, hubPage(lang));
  written.push(rel);
});

// stats.html is left out on purpose: it is marked noindex.
const STATIC_PAGES = ["", "about.html", "faq.html", "privacy.html", "terms.html", "contact.html"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.concat(written).map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

console.log(`Wrote ${written.length} pages:\n  ${written.join("\n  ")}\nUpdated sitemap.xml`);

