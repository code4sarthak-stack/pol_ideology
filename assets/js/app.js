/* Political Ideology Quiz — page logic shared by every page. No frameworks, no build step. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var STR = window.STRINGS;
  var QUIZ = window.QUIZ;
  var TOTAL = QUIZ.questions.length;
  var LANGS = ["en", "hi"];
  var DOMAINS = ["econ", "social", "civil", "world"]; // order matches each ideology's pos[]
  var MAX = { econ: 0, social: 0, civil: 0, world: 0 }; // highest possible raw score per domain
  QUIZ.questions.forEach(function (q) {
    MAX[q.domain] += Math.max.apply(null, q.scores.map(Math.abs));
  });
  var params = new URLSearchParams(location.search);
  var page = document.body.getAttribute("data-page");

  /* ---------- Storage (wrapped: it can throw in private mode or with blocked site data) ---------- */

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ---------- Language ---------- */

  function resolveLang() {
    var l = params.get("lang");
    if (LANGS.indexOf(l) === -1) l = load("pq_lang");
    if (LANGS.indexOf(l) === -1) l = /^hi\b/i.test(navigator.language || "") ? "hi" : "en";
    return l;
  }
  var lang = resolveLang();
  save("pq_lang", lang);

  function t(key, vars) {
    var s = STR[lang][key];
    if (s === undefined) s = STR.en[key];
    if (vars && typeof s === "string") {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    }
    return s;
  }

  // Build an internal link that keeps the current language. Never put the user's name in a URL:
  // URLs are sent to ad and analytics servers, and Google policy forbids passing them personal data.
  function url(path, extra) {
    var p = new URLSearchParams();
    p.set("lang", lang);
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        if (extra[k] !== "" && extra[k] !== undefined && extra[k] !== null) p.set(k, extra[k]);
      });
    }
    return path + "?" + p.toString();
  }

  function applyI18n() {
    if (page !== "home") document.documentElement.lang = lang; // home page is bilingual
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-link]").forEach(function (el) {
      el.setAttribute("href", url(el.getAttribute("data-link")));
    });
    var sw = document.querySelector("[data-lang-switch]");
    if (sw) {
      var p = new URLSearchParams(location.search);
      p.set("lang", lang === "en" ? "hi" : "en");
      sw.setAttribute("href", location.pathname + "?" + p.toString());
      sw.textContent = t("langSwitch");
      sw.setAttribute("lang", lang === "en" ? "hi" : "en");
      sw.addEventListener("click", function () { save("pq_lang", lang === "en" ? "hi" : "en"); });
    }
  }

  /* ---------- Analytics (optional, GA4) ---------- */

  function initAnalytics() {
    if (!CFG.GA_MEASUREMENT_ID) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CFG.GA_MEASUREMENT_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CFG.GA_MEASUREMENT_ID, { content_group: page, language: lang });
  }

  function track(name, data) {
    if (window.gtag) window.gtag("event", name, data || {});
  }

  /* ---------- Ads ---------- */

  var adsEnabled = /^ca-pub-\d{10,}$/.test(CFG.ADSENSE_CLIENT || "");

  function renderAds() {
    var slots = document.querySelectorAll("[data-ad]");
    if (adsEnabled) {
      // One script tag also enables Auto ads (anchor + vignette), which you switch on in AdSense.
      var s = document.createElement("script");
      s.async = true;
      s.crossOrigin = "anonymous";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + CFG.ADSENSE_CLIENT;
      document.head.appendChild(s);
    }
    slots.forEach(function (el) {
      var kind = el.getAttribute("data-ad");
      var label = document.createElement("div");
      label.className = "ad__label";
      label.textContent = t("adLabel");
      var box = document.createElement("div");
      box.className = "ad__box";
      el.appendChild(label);
      el.appendChild(box);

      if (!adsEnabled) {
        box.classList.add("ad__box--placeholder");
        box.textContent = kind === "top" ? "Ad · 320×100 / 320×50" : "Ad · 300×250 / responsive";
        return;
      }
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.setAttribute("data-ad-client", CFG.ADSENSE_CLIENT);
      ins.setAttribute("data-ad-slot", (CFG.AD_SLOTS || {})[kind] || "");
      if (kind === "top") {
        ins.style.display = "inline-block"; // fixed size set in CSS: 320x100, or 320x50 on short screens
      } else {
        ins.style.display = "block";
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
      }
      box.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Scoring ---------- */

  // Answers are one digit per question: the index of the chosen option.
  function isValidPrefix(a) {
    if (!/^[0-9]*$/.test(a) || a.length > TOTAL) return false;
    for (var i = 0; i < a.length; i++) {
      if (+a.charAt(i) >= QUIZ.questions[i].scores.length) return false;
    }
    return true;
  }

  function isCompleteAnswers(a) {
    return !!a && a.length === TOTAL && isValidPrefix(a);
  }

  // Each domain runs from -100 (left pole) to +100 (right pole).
  // Overall = 50% economics + 50% the cultural dimension (mean of society, civil liberties, world),
  // following the economic left-right + GAL-TAN model used in comparative politics.
  function score(answers) {
    var raw = { econ: 0, social: 0, civil: 0, world: 0 };
    for (var i = 0; i < TOTAL; i++) {
      var q = QUIZ.questions[i];
      raw[q.domain] += q.scores[+answers.charAt(i)];
    }
    var s = {};
    DOMAINS.forEach(function (d) { s[d] = Math.round((raw[d] / MAX[d]) * 100); });
    s.overall = Math.round(0.5 * s.econ + 0.5 * ((s.social + s.civil + s.world) / 3));
    return s;
  }

  // 5 bands per domain: ≤-60 · -59…-21 · -20…20 · 21…59 · ≥60
  function bandIndex(v) {
    return v <= -60 ? 0 : v < -20 ? 1 : v <= 20 ? 2 : v < 60 ? 3 : 4;
  }

  function overallIndex(v) {
    var bands = QUIZ.overallBands;
    for (var i = 0; i < bands.length - 1; i++) {
      if (v <= bands[i].max) return i;
    }
    return bands.length - 1;
  }

  // Meter segments: [width %, colour step]. Widths follow the band boundaries, so the
  // highlighted segment always matches the label shown next to the meter.
  var DOMAIN_SEGS = [[20, "l2"], [20, "l1"], [20, "mid"], [20, "r1"], [20, "r2"]];
  var OVERALL_SEGS = [[20, "l2"], [13.75, "lm"], [11, "l1"], [10.5, "mid"], [11, "r1"], [13.75, "rm"], [20, "r2"]];

  // Ideologies sorted by distance between their typical position and the user's four scores.
  function rankIdeologies(s) {
    return QUIZ.ideologies.map(function (ideo) {
      var d = 0;
      DOMAINS.forEach(function (k, i) { d += Math.pow(s[k] - ideo.pos[i], 2); });
      return { ideo: ideo, d: d };
    }).sort(function (a, b) { return a.d - b.d; }).map(function (r) { return r.ideo; });
  }

  /* ---------- Pages ---------- */

  function homePage() {
    document.querySelectorAll("[data-choose-lang]").forEach(function (el) {
      el.addEventListener("click", function () {
        var chosen = el.getAttribute("data-choose-lang");
        save("pq_lang", chosen);
        track("select_language", { language: chosen });
      });
    });
  }

  function startPage() {
    document.title = t("startTitle");
    var form = document.getElementById("name-form");
    var input = document.getElementById("name-input");
    var error = document.getElementById("name-error");
    input.value = load("pq_name") || "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = input.value.replace(/\s+/g, " ").trim().slice(0, 30);
      if (!name) {
        error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }
      save("pq_name", name);
      track("quiz_start", { language: lang });
      location.href = url("quiz.html", { q: 1 });
    });
    input.addEventListener("input", function () {
      error.hidden = true;
      input.removeAttribute("aria-invalid");
    });
  }

  function quizPage() {
    // State lives in the URL (?q=3&a=12): every question is a real page load, so each one
    // counts as a page view with fresh ads, and the browser Back button just works.
    var answers = params.get("a") || "";
    if (!isValidPrefix(answers)) answers = "";
    if (answers.length >= TOTAL) {
      location.replace(url("result.html", { a: answers.slice(0, TOTAL) }));
      return false;
    }
    var q = answers.length + 1;
    if (params.get("q") !== String(q) || (params.get("a") || "") !== answers) {
      location.replace(url("quiz.html", { q: q, a: answers }));
      return false;
    }

    var item = QUIZ.questions[q - 1];
    var question = item[lang];
    var domain = QUIZ.domains[item.domain];
    document.title = t("quizTitle", { n: q, total: TOTAL });
    document.getElementById("progress-text").textContent = t("progress", { n: q, total: TOTAL });
    document.getElementById("progress-fill").style.width = (q / TOTAL) * 100 + "%";
    var bar = document.getElementById("progress-bar");
    bar.setAttribute("aria-valuemax", TOTAL);
    bar.setAttribute("aria-valuenow", q);
    document.getElementById("question-domain").textContent = domain.icon + " " + domain[lang].name;
    document.getElementById("question-text").textContent = question.text;
    document.getElementById("why-text").textContent = question.why;

    var back = document.getElementById("back-link");
    if (q > 1) {
      back.href = url("quiz.html", { q: q - 1, a: answers.slice(0, -1) });
      back.hidden = false;
    }

    var list = document.getElementById("options");
    question.options.forEach(function (label, i) {
      var next = answers + i;
      // Real links (not JS navigation) so AdSense vignette ads can show between questions.
      var a = document.createElement("a");
      a.className = "option";
      a.href = q < TOTAL ? url("quiz.html", { q: q + 1, a: next }) : url("result.html", { a: next });
      var dot = document.createElement("span");
      dot.className = "option__dot";
      dot.setAttribute("aria-hidden", "true");
      var text = document.createElement("span");
      text.textContent = label;
      a.appendChild(dot);
      a.appendChild(text);
      a.addEventListener("click", function () {
        a.classList.add("is-chosen");
        track("answer", { question: q, choice: i });
        if (q === TOTAL) track("quiz_complete", { language: lang });
      });
      list.appendChild(a);
    });
  }

  function resultPage() {
    var answers = params.get("a");
    if (!isCompleteAnswers(answers)) {
      location.replace(url("index.html"));
      return false;
    }
    var friend = params.get("s") === "1";
    var s = score(answers);
    var ranked = rankIdeologies(s);
    var ideo = ranked[0];
    var text = ideo[lang];
    var overallBand = overallIndex(s.overall);
    var overall = QUIZ.overallBands[overallBand][lang];
    var name = friend ? "" : load("pq_name");

    document.title = text.title + " — " + t("resultTitle");
    document.getElementById("result-emoji").textContent = ideo.emoji;
    document.getElementById("result-lead").textContent = friend
      ? t("resultLeadFriend")
      : name ? t("resultLeadNamed", { name: name }) : t("resultLead");
    document.getElementById("result-title").textContent = text.title;
    document.getElementById("result-desc").textContent = text.desc;

    var overallBox = document.getElementById("overall");
    overallBox.appendChild(meterHead(t("overall"), overall));
    overallBox.appendChild(meter(s.overall, t("left"), t("right"), overall, OVERALL_SEGS, overallBand));
    document.getElementById("also-close").textContent = t("alsoClose", {
      list: ranked.slice(1, 3).map(function (r) { return r.emoji + " " + r[lang].title; }).join(" · ")
    });

    document.getElementById("ideology-examples-heading").textContent = t("ideologyExamples", { ideology: text.title });
    document.getElementById("ideology-examples").appendChild(examples(text.good, text.bad));

    if (friend) {
      var cta = document.getElementById("friend-cta");
      cta.hidden = false;
      cta.addEventListener("click", function () { track("friend_cta_click"); });
      var take = document.getElementById("retake-link");
      take.setAttribute("href", url("index.html"));
      take.textContent = t("friendCta");
    } else {
      document.getElementById("retake-link").setAttribute("href", url("quiz.html", { q: 1 }));
    }

    // Two domain cards, then the middle ad (static in the HTML), then the other two.
    DOMAINS.forEach(function (d, i) {
      document.getElementById(i < 2 ? "domains-a" : "domains-b").appendChild(domainCard(d, s[d]));
    });

    renderCompass(s);
    setupShare(answers, text.title, overall, ideo.key);
    track("view_result", { result: ideo.key, overall: s.overall, shared_view: friend });
  }

  /* ---------- Result building blocks ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function meterHead(title, label) {
    var head = el("div", "meter-head");
    head.appendChild(el("span", "meter-head__title", title));
    head.appendChild(el("span", "badge", label));
    return head;
  }

  // A diverging meter: band segments (strong left … strong right) and a marker at the score.
  function meter(value, leftName, rightName, label, segs, active) {
    var leftPct = Math.round((100 - value) / 2);
    var rightPct = 100 - leftPct;
    var wrap = el("div", "meter");

    var track = el("div", "meter__track");
    track.setAttribute("role", "meter");
    track.setAttribute("aria-valuemin", "-100");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(value));
    track.setAttribute("aria-valuetext",
      t("meterValue", { left: leftPct, leftName: leftName, right: rightPct, rightName: rightName }) + " · " + label);
    segs.forEach(function (seg, i) {
      var part = el("span", "meter__seg meter__seg--" + seg[1] + (i === active ? " is-active" : ""));
      part.style.flexBasis = seg[0] + "%";
      track.appendChild(part);
    });
    var marker = el("span", "meter__marker");
    marker.style.left = (value + 100) / 2 + "%";
    track.appendChild(marker);
    wrap.appendChild(track);

    var ends = el("div", "meter__ends");
    ends.setAttribute("aria-hidden", "true");
    var l = el("span", "meter__end");
    l.appendChild(el("strong", "", leftPct + "%"));
    l.appendChild(document.createTextNode(" " + leftName));
    var r = el("span", "meter__end");
    r.appendChild(document.createTextNode(rightName + " "));
    r.appendChild(el("strong", "", rightPct + "%"));
    ends.appendChild(l);
    ends.appendChild(r);
    wrap.appendChild(ends);
    return wrap;
  }

  function example(kind, ex) {
    var box = el("article", "example example--" + kind);
    box.appendChild(el("p", "example__tag", t(kind === "good" ? "goodTag" : "badTag")));
    box.appendChild(el("h4", "example__name", ex.name));
    box.appendChild(el("p", "example__when", ex.when));
    box.appendChild(el("p", "example__text", ex.text));
    return box;
  }

  function examples(good, bad) {
    var grid = el("div", "examples");
    grid.appendChild(example("good", good));
    grid.appendChild(example("bad", bad));
    return grid;
  }

  function domainCard(d, value) {
    var dom = QUIZ.domains[d];
    var names = dom[lang];
    var band = QUIZ.bands[d][bandIndex(value)][lang];
    var card = el("section", "card domain");
    card.appendChild(meterHead(dom.icon + " " + names.name, band.label));
    card.appendChild(meter(value, names.left, names.right, band.label, DOMAIN_SEGS, bandIndex(value)));
    card.appendChild(el("p", "domain__desc", band.desc));
    card.appendChild(examples(band.good, band.bad));
    return card;
  }

  function shareUrl(answers, source) {
    var link = url("result.html", { a: answers, s: 1, utm_source: source, utm_medium: "social", utm_campaign: "result_share" });
    return new URL(link, location.href).href;
  }

  function setupShare(answers, title, overall, key) {
    var message = t("shareText", { result: title, overall: overall });

    var wa = document.getElementById("share-whatsapp");
    wa.href = "https://wa.me/?text=" + encodeURIComponent(message + " " + shareUrl(answers, "whatsapp"));
    wa.addEventListener("click", function () { track("share", { method: "whatsapp", result: key }); });

    var more = document.getElementById("share-native");
    if (navigator.share) {
      more.hidden = false;
      more.addEventListener("click", function () {
        track("share", { method: "native", result: key });
        navigator.share({ title: t("siteName"), text: message, url: shareUrl(answers, "share") }).catch(function () {});
      });
    }

    var copy = document.getElementById("share-copy");
    var status = document.getElementById("copy-status");
    copy.addEventListener("click", function () {
      var link = shareUrl(answers, "copy");
      track("share", { method: "copy", result: key });
      var done = function () { status.textContent = t("copied"); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(link).then(done, function () { fallbackCopy(link); done(); });
      } else {
        fallbackCopy(link);
        done();
      }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function renderCompass(s) {
    // 200x200 chart: x = economic (Left → Right), y = civil (Authority at top, Liberty at bottom).
    var civil = QUIZ.domains.civil[lang];
    var x = 100 + (s.econ / 100) * 84;
    var y = 100 - (s.civil / 100) * 84;
    var grid = "";
    for (var i = 16; i <= 184; i += 21) {
      grid += '<line x1="' + i + '" y1="16" x2="' + i + '" y2="184"/>' +
              '<line x1="16" y1="' + i + '" x2="184" y2="' + i + '"/>';
    }
    var svg =
      '<svg class="compass" viewBox="0 0 200 200" role="img" aria-label="' + esc(t("compassHeading")) + '">' +
      '<rect x="16" y="16" width="84" height="84" fill="var(--q-auth-left)"/>' +
      '<rect x="100" y="16" width="84" height="84" fill="var(--q-auth-right)"/>' +
      '<rect x="16" y="100" width="84" height="84" fill="var(--q-lib-left)"/>' +
      '<rect x="100" y="100" width="84" height="84" fill="var(--q-lib-right)"/>' +
      '<g stroke="var(--grid)" stroke-width="0.5" opacity="0.6">' + grid + '</g>' +
      '<line x1="100" y1="16" x2="100" y2="184" stroke="var(--muted)" stroke-width="1"/>' +
      '<line x1="16" y1="100" x2="184" y2="100" stroke="var(--muted)" stroke-width="1"/>' +
      '<text x="100" y="11" text-anchor="middle">' + esc(civil.right) + '</text>' +
      '<text x="100" y="196" text-anchor="middle">' + esc(civil.left) + '</text>' +
      '<text x="11" y="100" text-anchor="middle" transform="rotate(-90 11 100)">' + esc(t("left")) + '</text>' +
      '<text x="189" y="100" text-anchor="middle" transform="rotate(90 189 100)">' + esc(t("right")) + '</text>' +
      '<circle cx="' + x + '" cy="' + y + '" r="9" fill="var(--primary)" opacity="0.25"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5.5" fill="var(--primary)" stroke="var(--surface)" stroke-width="2"/>' +
      '</svg>';
    document.getElementById("compass").innerHTML = svg;
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Boot ---------- */

  applyI18n();
  initAnalytics();
  var pages = { home: homePage, start: startPage, quiz: quizPage, result: resultPage };
  var redirecting = pages[page] ? pages[page]() === false : false;
  if (!redirecting) renderAds(); // never request ads on a page that is about to redirect
})();
