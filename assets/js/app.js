/* Political Ideology Quiz — page logic shared by every page. No frameworks, no build step. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var STR = window.STRINGS;
  var QUIZ = window.QUIZ;
  var TOTAL = QUIZ.questions.length;
  var LANGS = ["en", "hi"];
  var MAX = { econ: 0, social: 0 }; // highest possible score on each axis (2 points per question)
  QUIZ.questions.forEach(function (q) { MAX[q.axis] += 2; });
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

  var POINTS = [2, 1, 0, -1, -2]; // Strongly agree … Strongly disagree

  function score(answers) {
    var s = { econ: 0, social: 0 };
    for (var i = 0; i < TOTAL; i++) {
      var q = QUIZ.questions[i];
      s[q.axis] += POINTS[+answers.charAt(i)] * q.dir;
    }
    return s;
  }

  function classify(s) {
    if (Math.abs(s.econ) <= 2 && Math.abs(s.social) <= 2) return "centrist";
    // Exactly neutral on one axis: use the everyday one-word label for the other axis.
    if (s.econ === 0) return s.social < 0 ? "progressive" : "conservative";
    if (s.social === 0) return s.econ < 0 ? "progressive" : "conservative";
    if (s.econ < 0) return s.social > 0 ? "communitarian" : "progressive";
    return s.social > 0 ? "conservative" : "libertarian";
  }

  function isCompleteAnswers(a) {
    return new RegExp("^[0-4]{" + TOTAL + "}$").test(a || "");
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
    if (!/^[0-4]*$/.test(answers)) answers = "";
    if (answers.length >= TOTAL) {
      location.replace(url("result.html", { a: answers.slice(0, TOTAL) }));
      return false;
    }
    var q = answers.length + 1;
    if (params.get("q") !== String(q) || (params.get("a") || "") !== answers) {
      location.replace(url("quiz.html", { q: q, a: answers }));
      return false;
    }

    var question = QUIZ.questions[q - 1][lang];
    document.title = t("quizTitle", { n: q, total: TOTAL });
    document.getElementById("progress-text").textContent = t("progress", { n: q, total: TOTAL });
    document.getElementById("progress-fill").style.width = (q / TOTAL) * 100 + "%";
    var bar = document.getElementById("progress-bar");
    bar.setAttribute("aria-valuenow", q);
    bar.setAttribute("aria-valuemax", TOTAL);
    bar.style.setProperty("--steps", TOTAL); // one segment per question
    document.getElementById("question-text").textContent = question.text;
    document.getElementById("why-text").textContent = question.why;

    var back = document.getElementById("back-link");
    if (q > 1) {
      back.href = url("quiz.html", { q: q - 1, a: answers.slice(0, -1) });
      back.hidden = false;
    }

    var list = document.getElementById("options");
    t("options").forEach(function (label, i) {
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
    var key = classify(s);
    var result = QUIZ.results[key];
    var text = result[lang];
    var name = friend ? "" : load("pq_name");

    document.title = text.title + " — " + t("resultTitle");
    document.getElementById("result-emoji").textContent = result.emoji;
    document.getElementById("result-lead").textContent = friend
      ? t("resultLeadFriend")
      : name ? t("resultLeadNamed", { name: name }) : t("resultLead");
    document.getElementById("result-title").textContent = text.title;
    document.getElementById("result-desc").textContent = text.desc;

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

    renderCompass(s);
    renderAxis("axis-econ", s.econ, MAX.econ, t("econAxis"), t("econLeft"), t("econRight"));
    renderAxis("axis-social", s.social, MAX.social, t("socialAxis"), t("socialLib"), t("socialAuth"));
    setupShare(answers, text.title, key);
    track("view_result", { result: key, shared_view: friend });
  }

  function shareUrl(answers, source) {
    var link = url("result.html", { a: answers, s: 1, utm_source: source, utm_medium: "social", utm_campaign: "result_share" });
    return new URL(link, location.href).href;
  }

  function setupShare(answers, title, key) {
    var message = t("shareText", { result: title });

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
    // 200x200 chart: x = economic (Left → Right), y = social (Order at top, Freedom at bottom).
    var x = 100 + (s.econ / MAX.econ) * 84;
    var y = 100 - (s.social / MAX.social) * 84;
    var grid = "";
    for (var i = 16; i <= 184; i += 21) {
      grid += '<line x1="' + i + '" y1="16" x2="' + i + '" y2="184"/>' +
              '<line x1="16" y1="' + i + '" x2="184" y2="' + i + '"/>';
    }
    var svg =
      '<svg class="compass" viewBox="0 0 200 200" role="img" aria-label="' + esc(t("compassHeading")) + '">' +
      '<defs><clipPath id="compass-clip"><rect x="16" y="16" width="168" height="168" rx="12"/></clipPath></defs>' +
      '<g clip-path="url(#compass-clip)">' +
      '<rect x="16" y="16" width="84" height="84" fill="var(--q-auth-left)"/>' +
      '<rect x="100" y="16" width="84" height="84" fill="var(--q-auth-right)"/>' +
      '<rect x="16" y="100" width="84" height="84" fill="var(--q-lib-left)"/>' +
      '<rect x="100" y="100" width="84" height="84" fill="var(--q-lib-right)"/>' +
      '<g stroke="var(--surface)" stroke-width="0.6" opacity="0.9">' + grid + '</g>' +
      '</g>' +
      '<line x1="100" y1="16" x2="100" y2="184" stroke="var(--ink)" stroke-width="0.75" opacity="0.35"/>' +
      '<line x1="16" y1="100" x2="184" y2="100" stroke="var(--ink)" stroke-width="0.75" opacity="0.35"/>' +
      '<path d="M' + x + ' 100V' + y + 'M100 ' + y + 'H' + x + '" fill="none" stroke="var(--accent)" stroke-width="0.75" stroke-dasharray="2 2" opacity="0.6"/>' +
      '<text x="100" y="10" text-anchor="middle">' + esc(t("socialAuth")) + '</text>' +
      '<text x="100" y="196" text-anchor="middle">' + esc(t("socialLib")) + '</text>' +
      '<text x="10" y="100" text-anchor="middle" transform="rotate(-90 10 100)">' + esc(t("econLeft")) + '</text>' +
      '<text x="190" y="100" text-anchor="middle" transform="rotate(90 190 100)">' + esc(t("econRight")) + '</text>' +
      '<circle cx="' + x + '" cy="' + y + '" r="12" fill="var(--accent)" opacity="0.14"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5.5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>' +
      '</svg>';
    document.getElementById("compass").innerHTML = svg;
  }

  function renderAxis(id, value, max, name, leftLabel, rightLabel) {
    var pct = Math.round((Math.abs(value) / max) * 100);
    var desc = pct === 0 ? t("centre") : pct + "% " + (value < 0 ? leftLabel : rightLabel);
    var el = document.getElementById(id);
    el.querySelector(".axis__name").textContent = name;
    el.querySelector(".axis__value").textContent = desc;
    var pos = ((value + max) / (2 * max)) * 100;
    el.querySelector(".axis__marker").style.left = pos + "%";
    var fill = el.querySelector(".axis__fill"); // bar from the centre out to the marker
    fill.style.left = Math.min(pos, 50) + "%";
    fill.style.width = Math.abs(pos - 50) + "%";
    el.querySelector(".axis__left").textContent = leftLabel;
    el.querySelector(".axis__right").textContent = rightLabel;
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
