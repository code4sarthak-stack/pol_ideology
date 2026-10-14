/* ideoMap — page logic shared by every page. No frameworks, no build step. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var STR = window.STRINGS;
  var QUIZ = window.QUIZ;
  var FULL = QUIZ.questions.length; // In-depth quiz: all 24 questions, 6 per domain
  var QUICK = 12;                   // Quick quiz: questions 1–12, 3 per domain
  var LANGS = ["en", "hi"];
  var DOMAINS = ["econ", "social", "civil", "world"]; // order matches each ideology's pos[]
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
    // Pages written in a single language (the ideology guides) fix it with <html data-lang>.
    var l = document.documentElement.getAttribute("data-lang");
    if (LANGS.indexOf(l) === -1) l = params.get("lang");
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
      var target = el.getAttribute("data-link");
      if (target === "ideology/index.html" && lang === "hi") {
        el.setAttribute("href", "hi/ideology/index.html");
      } else {
        el.setAttribute("href", url(target));
      }
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
    if (!/^[0-9]*$/.test(a) || a.length > FULL) return false;
    for (var i = 0; i < a.length; i++) {
      if (+a.charAt(i) >= QUIZ.questions[i].scores.length) return false;
    }
    return true;
  }

  // A finished quiz is either the Quick (12) or the In-depth (24) set.
  function isCompleteAnswers(a) {
    return !!a && (a.length === QUICK || a.length === FULL) && isValidPrefix(a);
  }

  // Highest possible raw score per domain over the first n questions, so a 12- and a
  // 24-answer result are both scaled to the same -100 … +100 range.
  function maxScores(n) {
    var max = { econ: 0, social: 0, civil: 0, world: 0 };
    QUIZ.questions.slice(0, n).forEach(function (q) {
      max[q.domain] += Math.max.apply(null, q.scores.map(Math.abs));
    });
    return max;
  }

  // Each domain runs from -100 (left pole) to +100 (right pole).
  // Overall = 50% economics + 50% the cultural dimension (mean of society, civil liberties, world),
  // following the economic left-right + GAL-TAN model used in comparative politics.
  function score(answers) {
    var max = maxScores(answers.length);
    var raw = { econ: 0, social: 0, civil: 0, world: 0 };
    for (var i = 0; i < answers.length; i++) {
      var q = QUIZ.questions[i];
      raw[q.domain] += q.scores[+answers.charAt(i)];
    }
    var s = {};
    DOMAINS.forEach(function (d) { s[d] = Math.round((raw[d] / max[d]) * 100); });
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

  /* ---------- Firebase Live Counter (Atomic Concurrency-Safe) ---------- */

  var fbDbInstance = null;

  function getFirebaseDb() {
    if (fbDbInstance) return fbDbInstance;
    if (!window.firebase || !CFG.FIREBASE || !CFG.FIREBASE.apiKey) return null;
    try {
      if (!window.firebase.apps || !window.firebase.apps.length) {
        window.firebase.initializeApp(CFG.FIREBASE);
      }
      fbDbInstance = window.firebase.database();
      return fbDbInstance;
    } catch (e) {
      console.warn("Firebase initialization error:", e);
      return null;
    }
  }

  function bindLiveCounter(elementId, wrapId) {
    var wrap = document.getElementById(wrapId || "live-counter-wrap");
    var numEl = document.getElementById("live-counter-num");
    var textEl = document.getElementById("live-counter-text");
    var textHiEl = document.getElementById("live-counter-text-hi");

    // Legacy fallback if only elementId exists:
    if (!numEl && elementId) numEl = document.getElementById(elementId);
    if (!wrap && !numEl) return;

    function renderCount(rawCount) {
      var count = Number(rawCount);
      if (isNaN(count) || count < 0) return;

      // Always format large numbers with commas: e.g. 50,000,000 (never 50M or 50000000)
      var formatted = count.toLocaleString("en-US");

      if (numEl) {
        numEl.textContent = formatted;
      }

      // Line 2: Text description
      if (textEl) {
        textEl.textContent = count === 1 ? t("liveCounterSingular") : t("liveCounterPlural");
      }
      if (textHiEl) {
        var hiStr = STR && STR.hi ? (count === 1 ? STR.hi.liveCounterSingular : STR.hi.liveCounterPlural) : "अब तक लोगों ने यह क्विज़ लिया";
        textHiEl.textContent = hiStr;
      }

      // Legacy fallback if single element only:
      if (!textEl && numEl && !document.getElementById("live-counter-text")) {
        numEl.textContent = t("liveCounter", { count: formatted });
      }

      if (wrap) wrap.hidden = false;
    }

    // Support URL test override: ?test_count=50000000 (allows verifying scale without mutating DB)
    var testCountParam = params.get("test_count");
    if (testCountParam !== null && testCountParam !== "" && !isNaN(Number(testCountParam))) {
      renderCount(Number(testCountParam));
      return;
    }

    // 1. Instant REST fetch: provides immediate real-time count in ~50ms
    if (CFG.FIREBASE && CFG.FIREBASE.databaseURL) {
      var restUrl = CFG.FIREBASE.databaseURL.replace(/\/+$/, "") + "/quiz_count.json";
      fetch(restUrl)
        .then(function (r) { return r.json(); })
        .then(function (val) {
          if (typeof val === "number" && val >= 0) {
            renderCount(val);
          } else if (val === null) {
            renderCount(0);
          }
        })
        .catch(function (e) {
          console.warn("Live counter REST fetch notice:", e);
        });
    }

    // 2. Real-time Firebase listener: synchronizes live count updates across users
    var db = getFirebaseDb();
    if (db) {
      try {
        var counterRef = db.ref("quiz_count");
        counterRef.on("value", function (snapshot) {
          var val = snapshot.val();
          if (typeof val === "number" && val >= 0) {
            renderCount(val);
          } else if (val === null) {
            renderCount(0);
          }
        });
      } catch (e) {
        console.warn("Live counter listener notice:", e);
      }
    }
  }

  function incrementQuizCounter(answers) {
    if (params.get("s") === "1") return; // Never increment on friend shared preview links
    // Keyed on the first 12 answers: a Quick result and the 24-answer result that continues it
    // are one quiz, so they count once. Also stops a page refresh or revisit counting again.
    var countedKey = "pq_counted_" + (answers || "submitted").slice(0, QUICK);
    if (load(countedKey)) return;

    var db = getFirebaseDb();
    if (db) {
      try {
        var counterRef = db.ref("quiz_count");
        // Atomic transaction: locks and sequences concurrent submissions so counts never collide
        counterRef.transaction(function (current) {
          return (current || 0) + 1;
        }, function (error, committed) {
          if (committed) {
            save(countedKey, "1");
          }
        });
        return;
      } catch (e) {
        console.warn("Quiz counter transaction error:", e);
      }
    }

    // Direct REST fallback if SDK is unavailable or blocked
    if (CFG.FIREBASE && CFG.FIREBASE.databaseURL) {
      var url = CFG.FIREBASE.databaseURL.replace(/\/+$/, "") + "/quiz_count.json";
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (current) {
          var nextVal = (typeof current === "number" && current >= 0) ? current + 1 : 1;
          return fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nextVal)
          });
        })
        .then(function () {
          save(countedKey, "1");
        })
        .catch(function (err) {
          console.warn("REST quiz counter increment warning:", err);
        });
    }
  }

  /* ---------- Pages ---------- */

  function homePage() {
    bindLiveCounter();

    document.querySelectorAll("[data-choose-lang]").forEach(function (el) {
      el.addEventListener("click", function () {
        var chosen = el.getAttribute("data-choose-lang");
        save("pq_lang", chosen);
        track("select_language", { language: chosen });
      });
    });

    var ideoBtn = document.getElementById("ideology-guide-btn");
    if (ideoBtn && lang === "hi") {
      ideoBtn.setAttribute("href", "hi/ideology/index.html");
    }

    var counterWrap = document.getElementById("live-counter-wrap");
    if (counterWrap) {
      counterWrap.addEventListener("click", function (e) {
        if (!e.target.closest("a")) {
          window.location.href = url("stats.html");
        }
      });
    }
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
      var picked = form.querySelector('input[name="total"]:checked');
      var total = picked && picked.value === String(FULL) ? FULL : QUICK;
      save("pq_name", name);
      track("quiz_start", { language: lang, total: total });
      location.href = url("quiz.html", { q: 1, total: total });
    });
    input.addEventListener("input", function () {
      error.hidden = true;
      input.removeAttribute("aria-invalid");
    });
  }

  function setProgress(n, total) {
    document.getElementById("progress-text").textContent = t("progress", { n: n, total: total });
    document.getElementById("progress-fill").style.width = (n / total) * 100 + "%";
    var bar = document.getElementById("progress-bar");
    bar.setAttribute("aria-valuenow", n);
    bar.setAttribute("aria-valuemax", total);
    bar.style.setProperty("--steps", total); // one segment per question
  }

  function quizPage() {
    // State lives in the URL (?q=3&a=12&total=12): every question is a real page load, so each
    // one counts as a page view with fresh ads, and the browser Back button just works.
    var answers = params.get("a") || "";
    if (!isValidPrefix(answers)) answers = "";
    if (answers.length >= FULL) {
      location.replace(url("result.html", { a: answers }));
      return false;
    }
    // Quiz length: 12 (Quick) or 24 (In-depth). Past question 12 only the In-depth quiz applies.
    var total = params.get("total") === String(FULL) || answers.length > QUICK ? FULL : QUICK;
    var checkpoint = total === QUICK && answers.length === QUICK;
    var q = answers.length + 1;

    // Normalise the URL (old links without total=, edited or stale parameters).
    var expected = checkpoint
      ? { step: "checkpoint", q: "", a: answers, total: total }
      : { step: "", q: q, a: answers, total: total };
    var isCanonical = Object.keys(expected).every(function (k) {
      return (params.get(k) || "") === String(expected[k]);
    });
    if (!isCanonical) {
      location.replace(url("quiz.html", expected));
      return false;
    }
    if (checkpoint) return checkpointView(answers);

    var item = QUIZ.questions[q - 1];
    var question = item[lang];
    var domain = QUIZ.domains[item.domain];
    document.title = t("quizTitle", { n: q, total: total });
    setProgress(q, total);
    document.getElementById("question-domain").textContent = domain.icon + " " + domain[lang].name;
    document.getElementById("question-text").textContent = question.text;
    document.getElementById("why-text").textContent = question.why;

    var back = document.getElementById("back-link");
    if (q > 1) {
      back.href = url("quiz.html", { q: q - 1, a: answers.slice(0, -1), total: total });
      back.hidden = false;
    }

    var list = document.getElementById("options");
    question.options.forEach(function (label, i) {
      var next = answers + i;
      // Real links (not JS navigation) so AdSense vignette ads can show between questions.
      var a = document.createElement("a");
      a.className = "option";
      if (q < total) a.href = url("quiz.html", { q: q + 1, a: next, total: total });
      else if (total === QUICK) a.href = url("quiz.html", { step: "checkpoint", a: next, total: QUICK });
      else a.href = url("result.html", { a: next });
      var dot = document.createElement("span");
      dot.className = "option__dot";
      dot.setAttribute("aria-hidden", "true");
      var text = document.createElement("span");
      text.textContent = label;
      a.appendChild(dot);
      a.appendChild(text);
      a.addEventListener("click", function () {
        a.classList.add("is-chosen");
        track("answer", { question: q, choice: i, total: total });
        if (q === FULL) track("quiz_complete", { language: lang, total: FULL });
      });
      list.appendChild(a);
    });
  }

  // After question 12 of the Quick quiz: see the result now, or carry on to 24 questions.
  // A page of its own (one more page view), and both choices are real links for vignette ads.
  function checkpointView(answers) {
    document.title = t("checkpointTitle");
    setProgress(QUICK, QUICK);
    document.getElementById("question-card").hidden = true;
    document.getElementById("checkpoint").hidden = false;
    document.getElementById("why-heading").textContent = t("checkpointWhyHeading");
    document.getElementById("why-text").textContent = t("checkpointWhy");

    var back = document.getElementById("back-link");
    back.href = url("quiz.html", { q: QUICK, a: answers.slice(0, -1), total: QUICK });
    back.hidden = false;

    var more = document.getElementById("checkpoint-continue");
    more.href = url("quiz.html", { q: QUICK + 1, a: answers, total: FULL });
    more.addEventListener("click", function () {
      track("checkpoint_choice", { choice: "continue" });
    });
    var now = document.getElementById("checkpoint-results");
    now.href = url("result.html", { a: answers });
    now.addEventListener("click", function () {
      track("checkpoint_choice", { choice: "results" });
      track("quiz_complete", { language: lang, total: QUICK });
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
    var emojiEl = document.getElementById("result-emoji");
    if (emojiEl) emojiEl.textContent = ideo.emoji;
    document.getElementById("result-lead").textContent = friend
      ? t("resultLeadFriend")
      : name ? t("resultLeadNamed", { name: name }) : t("resultLead");
    document.getElementById("result-title").textContent = text.title;
    document.getElementById("result-desc").textContent = text.desc;

    var guideLinkEl = document.getElementById("result-guide-link");
    if (guideLinkEl && ideo.slug) {
      guideLinkEl.href = (lang === "hi" ? "hi/" : "") + "ideology/" + ideo.slug + ".html";
      guideLinkEl.textContent = t("readFullGuide");
      guideLinkEl.hidden = false;
    }

    var badgeEl = document.getElementById("result-badge");
    if (badgeEl) badgeEl.textContent = overall;

    var exampleEl = document.getElementById("result-example-badge");
    if (exampleEl && text.examplePerson) {
      exampleEl.textContent = exampleLabel(text.examplePerson);
      exampleEl.hidden = false;
    }

    var overallBox = document.getElementById("overall");
    if (overallBox) {
      overallBox.innerHTML = "";
      overallBox.appendChild(renderRadialGauge(s.overall, t("left"), t("right"), overall, overallBand));
    }

    // Template 3 Bento: Ideological neighbours chips
    initIdeologyModal();
    var chipsContainer = document.getElementById("neighbour-chips");
    if (chipsContainer) {
      chipsContainer.innerHTML = "";
      ranked.slice(1, 4).forEach(function (r) {
        var chip = el("button", "neighbour-chip");
        chip.type = "button";
        chip.setAttribute("aria-haspopup", "dialog");
        chip.setAttribute("aria-label", t("openExplainer", { ideology: r[lang].title }) || ("Learn about " + r[lang].title));

        var em = el("span", "neighbour-chip__emoji", r.emoji);
        var title = el("span", "neighbour-chip__name", r[lang].title);
        var info = el("span", "neighbour-chip__info");
        info.setAttribute("aria-hidden", "true");
        info.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

        chip.appendChild(em);
        chip.appendChild(title);
        chip.appendChild(info);

        chip.addEventListener("click", function () {
          openIdeologyModal(r, chip);
        });

        chipsContainer.appendChild(chip);
      });
    }

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
      document.getElementById("retake-link").setAttribute("href", url("start.html"));
    }

    // A Quick (12-answer) result can be deepened: questions 13–24 pick up where it stopped.
    if (!friend && answers.length === QUICK) {
      var deeper = document.getElementById("precision-card");
      deeper.hidden = false;
      var deeperLink = document.getElementById("precision-link");
      deeperLink.href = url("quiz.html", { q: QUICK + 1, a: answers, total: FULL });
      deeperLink.addEventListener("click", function () { track("precision_continue", { result: ideo.key }); });
    }
    document.getElementById("method1").textContent = t("method1", { n: answers.length / DOMAINS.length });

    // Two domain cards, then the middle ad (static in the HTML), then the other two.
    DOMAINS.forEach(function (d, i) {
      document.getElementById(i < 2 ? "domains-a" : "domains-b").appendChild(domainCard(d, s[d]));
    });

    renderCompass(s);
    setupShare(answers, text.title, overall, ideo, s, name);

    // Atomic live quiz counter increment and live badge
    incrementQuizCounter(answers);
    bindLiveCounter();

    // Save quiz result anonymously and display community comparison
    if (!friend && window.QUIZ_DB) {
      window.QUIZ_DB.saveSubmission({
        ideology: ideo.key,
        overall_band: overallBand,
        overall_score: s.overall,
        econ_score: s.econ,
        social_score: s.social,
        civil_score: s.civil,
        world_score: s.world,
        lang: lang,
        answers: answers
      }).then(function () {
        renderCommunityComparison(s.overall, ideo, overallBand);
      }).catch(function () {
        renderCommunityComparison(s.overall, ideo, overallBand);
      });
    } else {
      renderCommunityComparison(s.overall, ideo, overallBand);
    }

    track("view_result", { result: ideo.key, overall: s.overall, shared_view: friend, total: answers.length });
  }

  /* ---------- Result building blocks ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function overallBandLabel(score) {
    var idx = overallIndex(score);
    return QUIZ.overallBands[idx][lang];
  }

  function findIdeology(key) {
    for (var i = 0; i < QUIZ.ideologies.length; i++) {
      if (QUIZ.ideologies[i].key === key) return QUIZ.ideologies[i];
    }
    return null;
  }

  var SKULL_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skull preview-icon" aria-hidden="true"><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></svg>';

  var INSPIRING_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-face-grinning preview-icon" aria-hidden="true"><path d="M15 10V9"/><path d="M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/></svg>';

  function exampleTag(kind, className, tagType) {
    var tag = el(tagType || "p", className || "example__tag");
    if (kind === "bad") {
      tag.innerHTML = SKULL_ICON_SVG + '<span>' + esc(t("badTag")) + '</span>';
    } else {
      tag.innerHTML = INSPIRING_ICON_SVG + '<span>' + esc(t("goodTag")) + '</span>';
    }
    return tag;
  }

  /* ---------- Ideology Explainer Modal ---------- */

  var activeModalTrigger = null;
  var modalInitialized = false;

  function initIdeologyModal() {
    if (modalInitialized) return;
    modalInitialized = true;
    var modal = document.getElementById("ideology-modal");
    if (!modal) return;
    var closeBtn = document.getElementById("modal-close-btn");

    function closeModal() {
      if (!modal.classList.contains("is-active")) return;
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (activeModalTrigger && typeof activeModalTrigger.focus === "function") {
        activeModalTrigger.focus();
      }
      activeModalTrigger = null;
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-active")) {
        closeModal();
      }
    });

    window.closeIdeologyModal = closeModal;
  }

  function openIdeologyModal(ideo, triggerEl) {
    var modal = document.getElementById("ideology-modal");
    var body = document.getElementById("modal-body");
    if (!modal || !body || !ideo) return;

    activeModalTrigger = triggerEl || null;

    var text = ideo[lang] || ideo.en;
    var laymanText = text.layman || text.desc;
    var pillars = text.pillars || [];
    var good = text.good;
    var bad = text.bad;

    body.innerHTML = "";

    // 1. Header: Emoji, Badge, Title
    var header = el("div", "modal-header");
    var em = el("div", "modal-header__emoji", ideo.emoji);
    var meta = el("div", "modal-header__meta");
    var badge = el("span", "modal-header__badge", t("laymanExplainerBadge"));
    var title = el("h3", "modal-header__title", text.title);
    meta.appendChild(badge);
    meta.appendChild(title);
    if (text.examplePerson) {
      var exBadge = el("div", "modal-header__example");
      exBadge.innerHTML = '<span class="muted">' + (lang === "hi" ? "जानी-मानी मिसाल: " : "Familiar example: ") + '</span><strong>' + esc(text.examplePerson) + '</strong>';
      meta.appendChild(exBadge);
    }
    header.appendChild(em);
    header.appendChild(meta);
    body.appendChild(header);

    // 2. Layman Box ("In Simple Terms")
    var laymanBox = el("div", "modal-layman");
    var laymanTitle = el("div", "modal-layman__title");
    laymanTitle.innerHTML = '<span aria-hidden="true">💡</span> ' + esc(t("inLaymanTerms"));
    var laymanP = el("p", "modal-layman__text", laymanText);
    laymanBox.appendChild(laymanTitle);
    laymanBox.appendChild(laymanP);
    body.appendChild(laymanBox);

    // 3. Pillars ("What They Stand For")
    if (pillars && pillars.length > 0) {
      var secPillars = el("div", "modal-section");
      secPillars.appendChild(el("h4", "modal-section__title", t("keyPillars")));
      var list = el("ul", "modal-pillars");
      pillars.forEach(function (p) {
        var li = el("li", "modal-pillar-item");
        li.textContent = p;
        list.appendChild(li);
      });
      secPillars.appendChild(list);
      body.appendChild(secPillars);
    }

    // 4. Real World Examples (Good & Cautionary)
    if (good || bad) {
      var secEx = el("div", "modal-section");
      secEx.appendChild(el("h4", "modal-section__title", t("realWorldExamples")));
      var exGrid = el("div", "modal-examples-grid");

      if (good) {
        var gCard = el("div", "modal-example-card modal-example-card--good");
        gCard.appendChild(exampleTag("good", "modal-example-card__tag", "div"));
        gCard.appendChild(el("div", "modal-example-card__name", good.name));
        gCard.appendChild(el("div", "modal-example-card__when", good.when));
        gCard.appendChild(el("p", "modal-example-card__text", good.text));
        exGrid.appendChild(gCard);
      }

      if (bad) {
        var bCard = el("div", "modal-example-card modal-example-card--bad");
        bCard.appendChild(exampleTag("bad", "modal-example-card__tag", "div"));
        bCard.appendChild(el("div", "modal-example-card__name", bad.name));
        bCard.appendChild(el("div", "modal-example-card__when", bad.when));
        bCard.appendChild(el("p", "modal-example-card__text", bad.text));
        exGrid.appendChild(bCard);
      }

      secEx.appendChild(exGrid);
      body.appendChild(secEx);
    }

    // 5. Why this aligns with you note
    var whyBox = el("div", "modal-why");
    whyBox.innerHTML = '<span aria-hidden="true">🧭</span> <span>' + esc(t("whyNeighbour")) + '</span>';
    body.appendChild(whyBox);

    // 6. Action Button: "Got it"
    var footer = el("div", "modal-footer");
    var gotItBtn = el("button", "btn btn--primary", t("modalGotIt"));
    gotItBtn.type = "button";
    gotItBtn.addEventListener("click", function () {
      if (window.closeIdeologyModal) window.closeIdeologyModal();
    });
    footer.appendChild(gotItBtn);
    body.appendChild(footer);

    // Show modal
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Focus close button
    var closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) closeBtn.focus();
    track("ideology_modal_open", { ideology: ideo.key, language: lang });
  }

  /* Community Comparison Widget (Below Compass) */
  function renderCommunityComparison(userScore, userIdeo, userBand) {
    var card = document.getElementById("community-card");
    if (!card || !window.QUIZ_DB) return;

    window.QUIZ_DB.getStats().then(function (stats) {
      // 1. Badge & Subtitle
      var badge = document.getElementById("community-badge");
      if (badge) {
        var label = stats.isLive ? t("statsLiveBadge") : t("statsParticipantsCount", { n: stats.total.toLocaleString() });
        badge.innerHTML = '<span class="live-pulse-dot"></span> ' + esc(label);
        badge.className = "badge " + (stats.isLive ? "badge--live" : "badge--sample");
      }
      var sub = document.getElementById("community-sub");
      if (sub) {
        sub.textContent = t("communityOverallSub");
      }

      // 2. KPIs
      var kpiTotal = document.getElementById("comm-kpi-total");
      var kpiAvg = document.getElementById("comm-kpi-avg");
      var kpiTop = document.getElementById("comm-kpi-top");

      if (kpiTotal) kpiTotal.textContent = stats.total.toLocaleString();
      if (kpiAvg) {
        var avgVal = stats.averages.overall;
        kpiAvg.textContent = (avgVal > 0 ? "+" : "") + avgVal + " · " + (overallBandLabel ? overallBandLabel(avgVal) : "");
      }
      if (kpiTop && stats.topIdeology) {
        var topIdeoObj = findIdeology(stats.topIdeology);
        if (topIdeoObj) {
          var topPct = (stats.ideologies[stats.topIdeology] || {}).pct || 0;
          var cleanTitle = topIdeoObj[lang].title.split(" (")[0];
          kpiTop.innerHTML =
            '<div class="community-kpi-top-row">' +
              '<span class="community-kpi-top-row__icon" aria-hidden="true">' + topIdeoObj.emoji + '</span>' +
              '<div class="community-kpi-top-row__body">' +
                '<span class="community-kpi-top-row__title">' + esc(cleanTitle) + '</span>' +
                '<span class="community-kpi-top-row__pct">' + topPct + '%</span>' +
              '</div>' +
            '</div>';
          kpiTop.style.cursor = "pointer";
          kpiTop.title = t("laymanTapHint") || "Tap to learn more";
          kpiTop.onclick = function () {
            openIdeologyModal(topIdeoObj, kpiTop);
          };
        }
      }

      // 3. User Comparison Callout & Benchmark Labels
      var userIdeoStat = stats.ideologies[userIdeo.key] || { count: 0, pct: 0 };
      var diff = userScore - stats.averages.overall;
      var absDiff = Math.abs(diff);
      var userScoreFmt = (userScore > 0 ? "+" : "") + userScore;
      var avgFmt = (stats.averages.overall > 0 ? "+" : "") + stats.averages.overall;
      var avgBandName = overallBandLabel ? overallBandLabel(stats.averages.overall) : "";
      var userBandName = overallBandLabel ? overallBandLabel(userScore) : "";

      var avgLabelEl = document.getElementById("benchmark-avg-label");
      if (avgLabelEl) {
        avgLabelEl.textContent = (t("statsAvgSpectrum") || "Community Center") + ": " + avgFmt + (avgBandName ? " (" + avgBandName + ")" : "");
      }

      var userLabelEl = document.getElementById("benchmark-user-label");
      if (userLabelEl) {
        userLabelEl.textContent = (t("youTag") || "You") + ": " + userScoreFmt + (userBandName ? " (" + userBandName + ")" : "");
      }

      var diffDesc = "";
      if (absDiff <= 4) {
        diffDesc = t("communityDiffCenter", { userScore: userScoreFmt, avg: avgFmt });
      } else if (diff < 0) {
        diffDesc = t("communityDiffLeft", { userScore: userScoreFmt, points: absDiff, avg: avgFmt });
      } else {
        diffDesc = t("communityDiffRight", { userScore: userScoreFmt, points: absDiff, avg: avgFmt });
      }

      var calloutText = document.getElementById("community-callout-text");
      if (calloutText) {
        calloutText.innerHTML =
          '<strong>' + esc(t("communityShareStat", { pct: userIdeoStat.pct, ideology: userIdeo[lang].title.split(" (")[0] })) + '</strong> ' +
          esc(diffDesc);
      }

      // 4. Dual-Marker Comparison Bar
      var bar = document.getElementById("community-compare-bar");
      if (bar) {
        bar.innerHTML = renderCommunityCompareBar(userScore, stats.averages.overall);
      }

      // 5. Left ↔ Right Spectrum 7-Band Distribution
      var specContainer = document.getElementById("community-spectrum-bars");
      if (specContainer) {
        var bandColors = [
          "var(--div-l2)",
          "var(--div-lm)",
          "var(--div-l1)",
          "var(--div-mid)",
          "var(--div-r1)",
          "var(--div-rm)",
          "var(--div-r2)"
        ];
        var specHtml = QUIZ.overallBands.map(function (band, i) {
          var bStat = stats.bands[i] || { count: 0, pct: 0 };
          var isUserBand = (i === userBand);
          return (
            '<div class="spectrum-band-row' + (isUserBand ? ' is-user-row' : '') + '">' +
            '  <div class="spectrum-band-head">' +
            '    <span class="spectrum-band-dot" style="background: ' + bandColors[i] + ';"></span>' +
            '    <span class="spectrum-band-name">' + esc(band[lang]) + (isUserBand ? ' <span class="badge stats-bar-user-badge">' + esc(t("youTag")) + '</span>' : '') + '</span>' +
            '    <span class="spectrum-band-pct">' + bStat.pct + '% (' + bStat.count + ')</span>' +
            '  </div>' +
            '  <div class="spectrum-band-track">' +
            '    <div class="spectrum-band-fill" style="width: ' + bStat.pct + '%; background: ' + bandColors[i] + ';"></div>' +
            '  </div>' +
            '</div>'
          );
        }).join("");
        specContainer.innerHTML = specHtml;
      }

      // 6. Ideological Distribution Bars (all 16, ranked by popularity, with user highlight)
      var ideoBarsContainer = document.getElementById("community-ideology-bars");
      if (ideoBarsContainer) {
        var list = QUIZ.ideologies.map(function (item) {
          var iStat = stats.ideologies[item.key] || { count: 0, pct: 0 };
          var textObj = item[lang] || item.en;
          return {
            key: item.key,
            emoji: item.emoji,
            title: textObj.title,
            examplePerson: textObj.examplePerson || "",
            count: iStat.count,
            pct: iStat.pct,
            isUser: (item.key === userIdeo.key)
          };
        }).sort(function (a, b) {
          return b.count - a.count;
        });

        var maxPct = Math.max(1, list[0].pct);

        function renderBarItem(item) {
          var widthRatio = ((item.pct / maxPct) * 100).toFixed(1);
          var exHtml = item.examplePerson
            ? '<span class="stats-bar-sub">' + (lang === "hi" ? "उदा. " : "e.g. ") + esc(item.examplePerson) + '</span>'
            : '';
          return (
            '<div class="stats-bar-item' + (item.isUser ? ' is-user' : '') + '" data-key="' + esc(item.key) + '" role="button" tabindex="0" title="' + esc(item.title) + '">' +
            '  <div class="stats-bar-main">' +
            '    <div class="stats-bar-icon" aria-hidden="true">' + item.emoji + '</div>' +
            '    <div class="stats-bar-content">' +
            '      <div class="stats-bar-title-wrap">' +
            '        <span class="stats-bar-title">' + esc(item.title) + '</span>' +
            (item.isUser ? ' <span class="stats-bar-user-badge">' + esc(t("youTag")) + '</span>' : '') +
            '      </div>' +
            exHtml +
            '    </div>' +
            '    <div class="stats-bar-metric">' +
            '      <span class="stats-bar-pct">' + item.pct + '%</span>' +
            '      <span class="stats-bar-count">(' + item.count + ')</span>' +
            '    </div>' +
            '  </div>' +
            '  <div class="stats-bar-track">' +
            '    <div class="stats-bar-fill' + (item.isUser ? ' is-user-fill' : '') + '" style="width: ' + widthRatio + '%;"></div>' +
            '  </div>' +
            '</div>'
          );
        }

        var isExpanded = false;
        var topLimit = 6;

        function updateListDisplay() {
          var displayList;
          if (isExpanded || list.length <= topLimit) {
            displayList = list;
          } else {
            displayList = list.slice(0, topLimit);
            var userInTop = displayList.some(function (it) { return it.isUser; });
            if (!userInTop) {
              var userItem = list.find(function (it) { return it.isUser; });
              if (userItem) displayList.push(userItem);
            }
          }

          var html = displayList.map(renderBarItem).join("");

          if (list.length > topLimit) {
            var toggleLabel = isExpanded
              ? (lang === "hi" ? "कम दिखाएँ ↑" : "Show Top " + topLimit + " ↑")
              : (lang === "hi" ? "सभी 16 विचारधाराएँ देखें (" + (list.length - topLimit) + " और) ↓" : "Show all " + list.length + " worldviews (" + (list.length - topLimit) + " more) ↓");

            html += '<button type="button" class="stats-bars-toggle-btn" id="btn-toggle-ideo-bars">' + esc(toggleLabel) + '</button>';
          }

          ideoBarsContainer.innerHTML = html;

          var toggleBtn = document.getElementById("btn-toggle-ideo-bars");
          if (toggleBtn) {
            toggleBtn.addEventListener("click", function () {
              isExpanded = !isExpanded;
              updateListDisplay();
            });
          }
        }

        updateListDisplay();

        ideoBarsContainer.addEventListener("click", function (e) {
          if (e.target.closest("#btn-toggle-ideo-bars")) return;
          var itemEl = e.target.closest(".stats-bar-item");
          if (!itemEl) return;
          var key = itemEl.getAttribute("data-key");
          if (!key) return;
          var ideoObj = findIdeology(key);
          if (ideoObj && typeof openIdeologyModal === "function") {
            openIdeologyModal(ideoObj, itemEl);
          }
        });
      }
    });
  }

  function renderCommunityCompareBar(userScore, avgScore) {
    var userPct = Math.min(95, Math.max(5, (userScore + 100) / 2));
    var avgPct = Math.min(95, Math.max(5, (avgScore + 100) / 2));

    var avgFmt = (avgScore > 0 ? "+" : "") + avgScore;
    var userFmt = (userScore > 0 ? "+" : "") + userScore;
    // Near either end, anchor the label to that end so it can't run past the card edge.
    function edge(pct) { return pct < 20 ? " is-start" : pct > 80 ? " is-end" : ""; }

    return (
      '<div class="compare-bar">' +
      '  <div class="compare-bar__track">' +
      '    <div class="compare-bar__mid-line" style="left: 50%;"></div>' +
      '    <div class="compare-bar__avg-line' + edge(avgPct) + '" style="left: ' + avgPct.toFixed(1) + '%;" title="' + esc(t("statsAvgSpectrum")) + ': ' + avgFmt + '">' +
      '      <span class="compare-bar__marker-pill compare-bar__marker-pill--avg">' + avgFmt + '</span>' +
      '    </div>' +
      '    <div class="compare-bar__user-pin' + edge(userPct) + '" style="left: ' + userPct.toFixed(1) + '%;" title="' + esc(t("youTag")) + ': ' + userFmt + '">' +
      '      <span class="compare-bar__user-dot"></span>' +
      '      <span class="compare-bar__marker-pill compare-bar__marker-pill--user">' + userFmt + '</span>' +
      '    </div>' +
      '  </div>' +
      '  <div class="compare-bar__ends">' +
      '    <span>← ' + esc(t("left")) + ' (-100)</span>' +
      '    <span class="compare-bar__mid-tag">0</span>' +
      '    <span>' + esc(t("right")) + ' (+100) →</span>' +
      '  </div>' +
      '</div>'
    );
  }

  // "55% Right" style summary of an overall score, as shown under the gauge.
  function leanText(value, leftName, rightName) {
    var leftPct = Math.round((100 - value) / 2);
    var rightPct = 100 - leftPct;
    return leftPct > rightPct
      ? leftPct + "% " + leftName
      : rightPct > leftPct
      ? rightPct + "% " + rightName
      : "50% " + leftName + " / " + rightName;
  }

  function exampleLabel(person) {
    return (lang === "hi" ? "जानी-मानी मिसाल: " : "e.g. ") + person;
  }

  /* Template 3: Semi-Circular Radial Gauge (Speedometer) */
  function renderRadialGauge(value, leftName, rightName, bandLabel, activeBand) {
    var mainPctText = leanText(value, leftName, rightName);

    var wrap = el("div", "gauge-widget");

    // Palette matching Template 3 bento gauge
    var colors = [
      "#e57379", // Far Left (terracotta / rose)
      "#f09a9e", // Left (soft rose)
      "#f4baa5", // Centre-Left (soft peach)
      "#edebe5", // Centre (warm neutral)
      "#b8cde8", // Centre-Right (soft sky tint)
      "#8eb0db", // Right (soft slate blue)
      "#557a95"  // Far Right (deep steel slate)
    ];

    var segWidths = [20, 13.75, 11, 10.5, 11, 13.75, 20];
    var cx = 160;
    var cy = 145;
    var rOut = 124;
    var rIn = 80;

    var rad = Math.PI / 180;
    var currentDeg = 180;
    var pathsHtml = "";

    for (var i = 0; i < segWidths.length; i++) {
      var span = segWidths[i] * 1.8;
      var startDeg = currentDeg;
      var endDeg = currentDeg - span;
      currentDeg = endDeg;

      // Subtle 1.2-deg separation gap between segments
      var sAngle = (startDeg - 0.6) * rad;
      var eAngle = (endDeg + 0.6) * rad;

      var x1 = cx + rOut * Math.cos(sAngle);
      var y1 = cy - rOut * Math.sin(sAngle);
      var x2 = cx + rOut * Math.cos(eAngle);
      var y2 = cy - rOut * Math.sin(eAngle);
      var x3 = cx + rIn * Math.cos(eAngle);
      var y3 = cy - rIn * Math.sin(eAngle);
      var x4 = cx + rIn * Math.cos(sAngle);
      var y4 = cy - rIn * Math.sin(sAngle);

      var d = "M " + x1.toFixed(2) + " " + y1.toFixed(2) +
              " A " + rOut + " " + rOut + " 0 0 1 " + x2.toFixed(2) + " " + y2.toFixed(2) +
              " L " + x3.toFixed(2) + " " + y3.toFixed(2) +
              " A " + rIn + " " + rIn + " 0 0 0 " + x4.toFixed(2) + " " + y4.toFixed(2) +
              " Z";

      var isActive = (i === activeBand);
      var opacity = isActive ? "1" : "0.55";
      var stroke = isActive ? "var(--ink)" : "none";
      var strokeW = isActive ? "1.5" : "0";

      pathsHtml += '<path d="' + d + '" fill="' + colors[i] + '" opacity="' + opacity + '" stroke="' + stroke + '" stroke-width="' + strokeW + '" class="gauge-seg' + (isActive ? " is-active" : "") + '"/>';
    }

    // Needle pointing angle: value ranges from -100 to +100
    var needleAngleDeg = 180 - ((value + 100) / 200) * 180;
    var needleRad = needleAngleDeg * rad;

    var tipL = 112;
    var tipX = cx + tipL * Math.cos(needleRad);
    var tipY = cy - tipL * Math.sin(needleRad);

    var tailL = 16;
    var tailX = cx - tailL * Math.cos(needleRad);
    var tailY = cy + tailL * Math.sin(needleRad);

    var pRad = needleRad + Math.PI / 2;
    var b1X = cx + 5.5 * Math.cos(pRad);
    var b1Y = cy - 5.5 * Math.sin(pRad);
    var b2X = cx - 5.5 * Math.cos(pRad);
    var b2Y = cy + 5.5 * Math.sin(pRad);

    var needlePoints = tipX.toFixed(2) + "," + tipY.toFixed(2) + " " +
                       b1X.toFixed(2) + "," + b1Y.toFixed(2) + " " +
                       tailX.toFixed(2) + "," + tailY.toFixed(2) + " " +
                       b2X.toFixed(2) + "," + b2Y.toFixed(2);

    var svg =
      '<svg class="gauge-svg" viewBox="0 0 320 180" role="img" aria-label="' + esc(bandLabel) + ': ' + esc(mainPctText) + '">' +
      '<defs>' +
      '  <filter id="needle-shadow" x="-30%" y="-30%" width="160%" height="160%">' +
      '    <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" flood-opacity="0.28"/>' +
      '  </filter>' +
      '  <linearGradient id="needle-grad" x1="0%" y1="100%" x2="0%" y2="0%">' +
      '    <stop offset="0%" stop-color="#4a709c"/>' +
      '    <stop offset="60%" stop-color="#7bb7e8"/>' +
      '    <stop offset="100%" stop-color="#eef6fc"/>' +
      '  </linearGradient>' +
      '</defs>' +
      '<g class="gauge-tracks">' + pathsHtml + '</g>' +
      '<polygon points="' + needlePoints + '" fill="url(#needle-grad)" filter="url(#needle-shadow)"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + tipX.toFixed(2) + '" y2="' + tipY.toFixed(2) + '" stroke="#ffffff" stroke-width="1.2" opacity="0.85"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#ffffff" stroke="var(--border-strong)" stroke-width="2" filter="url(#needle-shadow)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="5.5" fill="var(--ink)"/>' +
      '</svg>';

    var legend =
      '<div class="gauge-legend">' +
      '  <span class="gauge-end gauge-end--left">' + esc(t("farLeft")) + '</span>' +
      '  <div class="gauge-center">' +
      '    <strong class="gauge-pct">' + esc(mainPctText) + '</strong>' +
      '  </div>' +
      '  <span class="gauge-end gauge-end--right">' + esc(t("farRight")) + '</span>' +
      '</div>';

    wrap.innerHTML = svg + legend;
    return wrap;
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
    box.appendChild(exampleTag(kind, "example__tag", "p"));
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

  /* ── Share Preview Modal helpers ──────────────────────────── */

  function closeSharePreviewModal() {
    var modal = document.getElementById("share-preview-modal");
    if (!modal) return;
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  /**
   * Opens the share-preview modal, renders the story card canvas into it,
   * then shows the correct confirm button(s) for the given platform.
   *
   * @param {string}   platform   "whatsapp" | "instagram" | "download"
   * @param {object}   cardData   The same cardData object passed to buildStoryCardCanvas
   * @param {string}   waHref     Ready-to-use wa.me URL (only used for "whatsapp")
   * @param {function} onInsta    Callback that runs the Instagram native share/download flow
   * @param {function} onDownload Callback that runs the explicit download flow
   */
  function openSharePreviewModal(platform, cardData, waHref, onInsta, onDownload) {
    var modal       = document.getElementById("share-preview-modal");
    var loading     = document.getElementById("share-preview-loading");
    var imgWrap     = document.getElementById("share-preview-img-wrap");
    var hint        = document.getElementById("share-preview-hint");
    var actions     = document.getElementById("share-preview-actions");
    var titleEl     = document.getElementById("share-preview-title");
    var subtitleEl  = document.getElementById("share-preview-subtitle");
    var waBtn       = document.getElementById("share-preview-wa-btn");
    var instaBtn    = document.getElementById("share-preview-insta-btn");
    var dlBtn       = document.getElementById("share-preview-dl-btn");
    var closeBtn    = document.getElementById("share-preview-close");
    if (!modal) return;

    // Reset state
    loading.hidden   = false;
    imgWrap.hidden   = true;
    hint.hidden      = true;
    actions.hidden   = true;
    imgWrap.innerHTML = "";
    if (waBtn)    { waBtn.hidden = true;    waBtn.onclick = null; }
    if (instaBtn) { instaBtn.hidden = true; instaBtn.onclick = null; }
    if (dlBtn)    { dlBtn.onclick = null; }

    // Platform-specific header text
    if (platform === "whatsapp") {
      if (titleEl)    titleEl.textContent = "📤 Preview — WhatsApp Share";
      if (subtitleEl) subtitleEl.textContent = "This story image + link will be sent on WhatsApp";
    } else if (platform === "instagram") {
      if (titleEl)    titleEl.textContent = "📸 Preview — Instagram Story";
      if (subtitleEl) subtitleEl.textContent = "Save this card, then post it as your Instagram Story";
    } else {
      if (titleEl)    titleEl.textContent = "💾 Preview — Save Story Card";
      if (subtitleEl) subtitleEl.textContent = "Your personalised story image is ready to download";
    }

    // Open modal
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.focus();

    // Close button
    if (closeBtn) {
      closeBtn.onclick = closeSharePreviewModal;
    }
    // Backdrop click closes
    modal.addEventListener("click", function onBdClick(e) {
      if (e.target === modal) { closeSharePreviewModal(); modal.removeEventListener("click", onBdClick); }
    });
    // Escape key closes
    document.addEventListener("keydown", function onEsc(e) {
      if (e.key === "Escape") { closeSharePreviewModal(); document.removeEventListener("keydown", onEsc); }
    });

    // Build canvas asynchronously so the modal animation plays first
    setTimeout(function () { loadStoryLogo(renderPreview); }, 60);

    function renderPreview() {
      var canvas;
      try {
        canvas = buildStoryCardCanvas(cardData);
      } catch (err) {
        console.error("Story card canvas error:", err);
        loading.hidden = true;
        imgWrap.hidden = false;
        imgWrap.innerHTML = "<p style='color:var(--warn);font-size:0.85rem;padding:8px'>Could not generate preview.</p>";
        return;
      }

      loading.hidden   = false; // keep spinner until canvas ready
      imgWrap.innerHTML = "";
      imgWrap.appendChild(canvas);
      loading.hidden   = true;
      imgWrap.hidden   = false;

      // Platform hint text
      if (platform === "instagram") {
        hint.textContent = "🔗 Your link is already copied — paste it as an Instagram Link Sticker!";
        hint.hidden = false;
      } else if (platform === "whatsapp") {
        hint.textContent = "The image + your result link will open in WhatsApp.";
        hint.hidden = false;
      }

      // Wire confirm buttons
      if (platform === "whatsapp" && waBtn) {
        waBtn.hidden = false;
        waBtn.onclick = function () {
          closeSharePreviewModal();
          window.open(waHref, "_blank", "noopener,noreferrer");
        };
      }
      if (platform === "instagram" && instaBtn) {
        instaBtn.hidden = false;
        instaBtn.onclick = function () {
          closeSharePreviewModal();
          if (typeof onInsta === "function") onInsta();
        };
      }
      if (dlBtn) {
        dlBtn.onclick = function () {
          closeSharePreviewModal();
          if (typeof onDownload === "function") onDownload();
        };
      }

      actions.hidden = false;
    }
  }

  function showQuickShareToast(msg, type) {
    var toast = document.getElementById("hero-share-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = "quick-share__toast quick-share__toast--" + (type || "info");
    toast.hidden = false;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function () {
      toast.hidden = true;
    }, 5500);
  }

  function copyLinkWithFeedback(link, callback) {
    var done = function () {
      if (typeof callback === "function") callback();
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link).then(done, function () {
        fallbackCopy(link);
        done();
      });
    } else {
      fallbackCopy(link);
      done();
    }
  }

  function downloadBlob(blob, filename) {
    var a = document.createElement("a");
    var urlObj = URL.createObjectURL(blob);
    a.href = urlObj;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObj);
    }, 1500);
  }

  // The logo is drawn onto the story card, so it is loaded once up front.
  var storyLogo = null;
  function loadStoryLogo(done) {
    if (!storyLogo) {
      storyLogo = new Image();
      storyLogo.src = "assets/img/icon-512.png";
    }
    if (storyLogo.complete) {
      if (done) done();
      return;
    }
    if (done) {
      storyLogo.addEventListener("load", done, { once: true });
      storyLogo.addEventListener("error", done, { once: true });
    }
  }

  // Mirrors the result card on the page: brand, title, badges, gauge, description,
  // then the website link as the call to action.
  function buildStoryCardCanvas(data) {
    var canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    var ctx = canvas.getContext("2d");
    var hi = data.lang === "hi";
    var SANS = "'Instrument Sans', 'Kohinoor Devanagari', 'Noto Sans Devanagari', 'Nirmala UI', system-ui, -apple-system, sans-serif";
    var SERIF = "'Instrument Serif', Georgia, serif";
    var INK = "#0f172a", TEXT = "#334155", MUTED = "#64748b", BORDER = "#e2e8f0", BORDER_STRONG = "#cbd5e1";

    function drawRoundRect(x, y, w, h, r, fill, stroke, strokeWidth) {
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, h, r);
      } else {
        var radius = typeof r === "number" ? r : 16;
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth || 1;
        ctx.stroke();
      }
      ctx.restore();
    }

    // Splits text into lines that fit maxWidth in the current font; the last allowed line ends in "...".
    function wrapLines(text, maxWidth, maxLines) {
      var words = String(text || "").split(" ");
      var lines = [];
      var line = "";
      for (var n = 0; n < words.length; n++) {
        var testLine = line ? line + " " + words[n] : words[n];
        if (line && ctx.measureText(testLine).width > maxWidth) {
          lines.push(line);
          line = words[n];
        } else {
          line = testLine;
        }
      }
      if (line) lines.push(line);
      if (maxLines && lines.length > maxLines) {
        var last = lines.slice(maxLines - 1).join(" ");
        while (last.length > 0 && ctx.measureText(last + "...").width > maxWidth) last = last.slice(0, -1);
        lines = lines.slice(0, maxLines - 1).concat(last.replace(/\s+$/, "") + "...");
      }
      return lines;
    }

    // Sets the font, shrinking it until text fits maxWidth. Returns the size used.
    function fitFont(text, weight, size, minSize, family, maxWidth) {
      ctx.font = weight + " " + size + "px " + family;
      while (size > minSize && ctx.measureText(text).width > maxWidth) {
        size -= 2;
        ctx.font = weight + " " + size + "px " + family;
      }
      return size;
    }

    function divider(y) {
      ctx.beginPath();
      ctx.moveTo(contentX, y);
      ctx.lineTo(contentX + contentW, y);
      ctx.strokeStyle = BORDER;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    var cardX = 70;
    var cardW = 940;
    var contentX = cardX + 60;
    var contentW = cardW - 120;

    // The description is the only part whose height varies, so measure it first,
    // then size the card to fit and centre it on the canvas.
    var descFont = (hi ? "28px " : "30px ") + SANS;
    var descLH = hi ? 52 : 48;
    ctx.font = descFont;
    var descLines = wrapLines(data.desc, contentW, 5);

    // Offsets below are measured from the top of the card.
    var gaugeScale = 2.4;
    var gaugeCy = 590 + 145 * gaugeScale;
    var descDivY = gaugeCy + 150;
    var descTop = descDivY + 58;
    var ctaTop = descTop + (descLines.length - 1) * descLH + 52;
    var ctaH = 250;
    var cardH = ctaTop + ctaH + 44;
    var cardY = Math.max(60, Math.round((1920 - cardH) / 2));

    // 1. Canvas background with a soft top glow
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 1080, 1920);
    var topGlow = ctx.createRadialGradient(540, cardY + 120, 40, 540, cardY + 120, 620);
    topGlow.addColorStop(0, "rgba(79, 70, 229, 0.12)");
    topGlow.addColorStop(0.65, "rgba(238, 240, 255, 0.4)");
    topGlow.addColorStop(1, "rgba(248, 250, 252, 0)");
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, 1080, 1100);

    // 2. Card
    ctx.save();
    ctx.shadowColor = "rgba(15, 23, 42, 0.08)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 14;
    drawRoundRect(cardX, cardY, cardW, cardH, 44, "#ffffff", BORDER, 2);
    ctx.restore();
    var cardGlow = ctx.createRadialGradient(540, cardY, 20, 540, cardY, 700);
    cardGlow.addColorStop(0, "rgba(79, 70, 229, 0.05)");
    cardGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    drawRoundRect(cardX + 1, cardY + 1, cardW - 2, cardH - 2, 43, cardGlow, null);

    ctx.textAlign = "center";

    // 3. Brand: logo tile, name and tagline
    var logoSize = 100;
    var logoY = cardY + 54;
    ctx.save();
    ctx.shadowColor = "rgba(15, 23, 42, 0.10)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    drawRoundRect(540 - logoSize / 2, logoY, logoSize, logoSize, 24, "#ffffff", BORDER, 2);
    ctx.restore();
    if (storyLogo && storyLogo.complete && storyLogo.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") ctx.roundRect(540 - logoSize / 2 + 2, logoY + 2, logoSize - 4, logoSize - 4, 22);
      else ctx.rect(540 - logoSize / 2 + 2, logoY + 2, logoSize - 4, logoSize - 4);
      ctx.clip();
      ctx.drawImage(storyLogo, 540 - logoSize / 2 + 2, logoY + 2, logoSize - 4, logoSize - 4);
      ctx.restore();
    } else {
      ctx.font = "56px 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText("🏛️", 540, logoY + logoSize / 2 + 3);
    }

    ctx.textBaseline = "alphabetic";
    ctx.font = "600 46px " + SERIF;
    ctx.fillStyle = TEXT;
    ctx.fillText(data.siteName, 540, cardY + 202);

    fitFont(data.tagline, "500", 26, 18, SANS, contentW);
    ctx.fillStyle = MUTED;
    ctx.fillText(data.tagline, 540, cardY + 242);

    divider(cardY + 278);

    // 4. Lead, ideology title and badges
    fitFont(data.leadText, "500", 32, 20, SANS, contentW);
    ctx.fillStyle = MUTED;
    ctx.fillText(data.leadText, 540, cardY + 340);

    if (hi) fitFont(data.title, "700", 92, 52, SANS, contentW);
    else fitFont(data.title, "400", 128, 64, SERIF, contentW);
    ctx.fillStyle = INK;
    ctx.fillText(data.title, 540, cardY + 466);

    var badges = [{ text: data.overall, weight: "700" }];
    if (data.example) badges.push({ text: data.example, weight: "600" });
    var badgeSize = 28;
    var badgeH = 60;
    var badgeGap = 14;
    function measureBadges() {
      var rowW = (badges.length - 1) * badgeGap;
      badges.forEach(function (b) {
        ctx.font = b.weight + " " + badgeSize + "px " + SANS;
        b.w = ctx.measureText(b.text).width + 56;
        rowW += b.w;
      });
      return rowW;
    }
    var badgeRowW = measureBadges();
    while (badgeRowW > contentW && badgeSize > 18) {
      badgeSize -= 2;
      badgeRowW = measureBadges();
    }
    var badgeX = 540 - badgeRowW / 2;
    var badgeY = cardY + 500;
    ctx.textBaseline = "middle";
    badges.forEach(function (b) {
      drawRoundRect(badgeX, badgeY, b.w, badgeH, badgeH / 2, "#f8fafc", BORDER_STRONG, 2);
      ctx.font = b.weight + " " + badgeSize + "px " + SANS;
      ctx.fillStyle = INK;
      ctx.fillText(b.text, badgeX + b.w / 2, badgeY + badgeH / 2 + 1);
      badgeX += b.w + badgeGap;
    });

    // 5. Semi-circular gauge — same geometry as renderRadialGauge, scaled up
    var gs = gaugeScale;
    var gcx = 540;
    var gcy = cardY + gaugeCy;
    var rOut = 124 * gs;
    var rIn = 80 * gs;
    var rad = Math.PI / 180;
    var gaugeColors = ["#e57379", "#f09a9e", "#f4baa5", "#edebe5", "#b8cde8", "#8eb0db", "#557a95"];
    var segWidths = [20, 13.75, 11, 10.5, 11, 13.75, 20];
    var currentDeg = 180;
    for (var gi = 0; gi < segWidths.length; gi++) {
      var startDeg = currentDeg;
      var endDeg = currentDeg - segWidths[gi] * 1.8;
      currentDeg = endDeg;
      var isActive = gi === data.overallBand;
      ctx.save();
      ctx.beginPath();
      // Canvas angles run clockwise, so the SVG's angle θ is −θ here.
      ctx.arc(gcx, gcy, rOut, -(startDeg - 0.6) * rad, -(endDeg + 0.6) * rad, false);
      ctx.arc(gcx, gcy, rIn, -(endDeg + 0.6) * rad, -(startDeg - 0.6) * rad, true);
      ctx.closePath();
      ctx.globalAlpha = isActive ? 1 : 0.55;
      if (isActive) {
        ctx.shadowColor = "rgba(15, 23, 42, 0.16)";
        ctx.shadowBlur = 6 * gs;
        ctx.shadowOffsetY = 2 * gs;
      }
      ctx.fillStyle = gaugeColors[gi];
      ctx.fill();
      if (isActive) {
        ctx.shadowColor = "transparent";
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.5 * gs;
        ctx.stroke();
      }
      ctx.restore();
    }

    var needleRad = (180 - ((data.overallScore + 100) / 200) * 180) * rad;
    var tipX = gcx + 112 * gs * Math.cos(needleRad);
    var tipY = gcy - 112 * gs * Math.sin(needleRad);
    var tailX = gcx - 16 * gs * Math.cos(needleRad);
    var tailY = gcy + 16 * gs * Math.sin(needleRad);
    var perpRad = needleRad + Math.PI / 2;
    var halfW = 5.5 * gs;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 7 * gs;
    ctx.shadowOffsetY = 2.5 * gs;
    var needleGrad = ctx.createLinearGradient(tailX, tailY, tipX, tipY);
    needleGrad.addColorStop(0, "#4a709c");
    needleGrad.addColorStop(0.6, "#7bb7e8");
    needleGrad.addColorStop(1, "#eef6fc");
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(gcx + halfW * Math.cos(perpRad), gcy - halfW * Math.sin(perpRad));
    ctx.lineTo(tailX, tailY);
    ctx.lineTo(gcx - halfW * Math.cos(perpRad), gcy + halfW * Math.sin(perpRad));
    ctx.closePath();
    ctx.fillStyle = needleGrad;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(gcx, gcy);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.2 * gs;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 7 * gs;
    ctx.shadowOffsetY = 2.5 * gs;
    ctx.beginPath();
    ctx.arc(gcx, gcy, 13 * gs, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(gcx, gcy, 13 * gs, 0, Math.PI * 2);
    ctx.strokeStyle = BORDER_STRONG;
    ctx.lineWidth = 2 * gs;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(gcx, gcy, 5.5 * gs, 0, Math.PI * 2);
    ctx.fillStyle = INK;
    ctx.fill();

    // Gauge legend: FAR LEFT · 55% Right · FAR RIGHT
    var legendY = gcy + 104;
    var legendHalf = 160 * gs - 12 * gs;
    ctx.textBaseline = "middle";
    ctx.font = "700 25px " + SANS;
    ctx.fillStyle = MUTED;
    if (!hi && "letterSpacing" in ctx) ctx.letterSpacing = "2.5px";
    ctx.textAlign = "left";
    ctx.fillText(hi ? data.farLeft : data.farLeft.toUpperCase(), gcx - legendHalf, legendY);
    ctx.textAlign = "right";
    ctx.fillText(hi ? data.farRight : data.farRight.toUpperCase(), gcx + legendHalf, legendY);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    ctx.textAlign = "center";
    ctx.font = "700 58px " + SANS;
    ctx.fillStyle = INK;
    ctx.fillText(data.leanText, gcx, legendY);

    // 6. Description
    divider(cardY + descDivY);
    ctx.font = descFont;
    ctx.fillStyle = TEXT;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    descLines.forEach(function (line, i) {
      ctx.fillText(line, contentX, cardY + descTop + i * descLH);
    });

    // 7. Call to action: the website link, drawn as a button
    var ctaX = cardX + 40;
    var ctaW = cardW - 80;
    var ctaY = cardY + ctaTop;
    drawRoundRect(ctaX, ctaY, ctaW, ctaH, 30, "#f8fafc", BORDER_STRONG, 2);

    ctx.textAlign = "center";
    var ctaTitle = hi ? "आपकी विचारधारा क्या है? 2 मिनट का मुफ़्त क्विज़" : "Which ideology are you? Take the free quiz";
    if (hi) fitFont(ctaTitle, "700", 32, 22, SANS, ctaW - 60);
    else fitFont(ctaTitle, "400", 40, 26, SERIF, ctaW - 60);
    ctx.fillStyle = INK;
    ctx.fillText(ctaTitle, 540, ctaY + 62);

    var urlText = "👉 " + (CFG.DOMAIN || location.hostname);
    fitFont(urlText, "700", 40, 24, SANS, ctaW - 140);
    var urlBtnW = Math.max(520, ctx.measureText(urlText).width + 84);
    var urlBtnH = 88;
    var urlBtnY = ctaY + 92;
    ctx.save();
    ctx.shadowColor = "rgba(79, 70, 229, 0.28)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    drawRoundRect(540 - urlBtnW / 2, urlBtnY, urlBtnW, urlBtnH, urlBtnH / 2, "#4f46e5", null);
    ctx.restore();
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(urlText, 540, urlBtnY + urlBtnH / 2 + 2);

    var linkTip = hi ? "🔗 टेस्ट देने के लिए लिंक पर टैप करें" : "🔗 Tap the link to take the test";
    ctx.font = "600 22px " + SANS;
    ctx.fillStyle = "#15803d";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(linkTip, 540, urlBtnY + urlBtnH + 46);

    return canvas;
  }

  function buildCardData(answers, title, overall, ideo, s, name, source) {
    var textData = ideo[lang] || ideo.en;
    return {
      siteName: t("siteName"),
      tagline: t("brandTagline"),
      leadText: name ? t("resultLeadNamed", { name: name }) : t("resultLead"),
      title: title,
      overall: overall,
      overallBand: overallIndex(s.overall),
      overallScore: s.overall,
      example: textData.examplePerson ? exampleLabel(textData.examplePerson) : "",
      leanText: leanText(s.overall, t("left"), t("right")),
      farLeft: t("farLeft"),
      farRight: t("farRight"),
      desc: textData.desc,
      shareUrl: shareUrl(answers, source),
      lang: lang
    };
  }

  function shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, mode) {
    var source = mode === "instagram" ? "insta_story" : (mode === "download" ? "story_dl" : "share");
    var cardData = buildCardData(answers, title, overall, ideo, s, name, source);
    var link = cardData.shareUrl;
    var message = t("shareText", { result: title, overall: overall });

    // Always copy link to clipboard first so it's ready to paste into Instagram Link Sticker!
    copyLinkWithFeedback(link);

    loadStoryLogo(function () {
      var canvas = buildStoryCardCanvas(cardData);

      canvas.toBlob(function (blob) {
        if (!blob) return;
        var filename = "ideomap-" + ideo.key + "-story.png";
        var file = new File([blob], filename, { type: "image/png" });

        if (mode === "instagram" || mode === "native") {
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            // The link goes inside the caption text: with a file attached, apps such as WhatsApp
            // often drop a separate `url`, and the caption is what keeps the link tappable.
            navigator.share({
              files: [file],
              title: t("siteName"),
              text: message + " " + link
            }).then(function () {
              showQuickShareToast(t("storyCopiedHint"), "success");
            }).catch(function (err) {
              if (err.name !== "AbortError") {
                downloadBlob(blob, filename);
                showQuickShareToast(t("storySavedToast") + " " + t("storyCopiedHint"), "info");
              }
            });
            return;
          }
        }

        // Fallback or explicit download
        downloadBlob(blob, filename);
        if (mode === "instagram") {
          showQuickShareToast(t("storySavedToast") + " " + t("storyCopiedHint"), "info");
        } else {
          showQuickShareToast(t("storySavedToast"), "success");
        }
      }, "image/png");
    });
  }


  function setupShare(answers, title, overall, ideo, s, name) {
    var key = ideo ? ideo.key : "";
    var message = t("shareText", { result: title, overall: overall });
    var friendLink = shareUrl(answers, "whatsapp");
    loadStoryLogo();

    // 1. WhatsApp Button — show preview modal first
    var heroWa = document.getElementById("hero-share-wa");
    if (heroWa) {
      heroWa.removeAttribute("href");
      heroWa.setAttribute("role", "button");
      heroWa.addEventListener("click", function (e) {
        e.preventDefault();
        track("share", { method: "whatsapp_hero_preview", result: key });
        var waLink = "https://wa.me/?text=" + encodeURIComponent(message + " " + friendLink);
        var cardData = buildCardData(answers, title, overall, ideo, s, name, "whatsapp");
        openSharePreviewModal(
          "whatsapp",
          cardData,
          waLink,
          null,
          function () { shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, "download"); }
        );
      });
    }

    // 2. Instagram Story Button — show preview modal first
    var heroInsta = document.getElementById("hero-share-insta");
    if (heroInsta) {
      heroInsta.addEventListener("click", function () {
        track("share", { method: "instagram_story_preview", result: key });
        var cardData = buildCardData(answers, title, overall, ideo, s, name, "insta_story");
        // Copy link to clipboard immediately so it's ready when the user opens Instagram
        copyLinkWithFeedback(cardData.shareUrl);
        openSharePreviewModal(
          "instagram",
          cardData,
          null,
          function () { shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, "instagram"); },
          function () { shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, "download"); }
        );
      });
    }

    // 3. Save Story Image Button — show preview modal first
    var heroDownload = document.getElementById("hero-share-download");
    if (heroDownload) {
      heroDownload.addEventListener("click", function () {
        track("share", { method: "download_story_preview", result: key });
        var cardData = buildCardData(answers, title, overall, ideo, s, name, "story_dl");
        openSharePreviewModal(
          "download",
          cardData,
          null,
          null,
          function () { shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, "download"); }
        );
      });
    }

    // 4. Copy Quiz Link Button
    var heroCopy = document.getElementById("hero-share-copy");
    if (heroCopy) {
      heroCopy.addEventListener("click", function () {
        var link = shareUrl(answers, "copy");
        track("share", { method: "copy_hero", result: key });
        copyLinkWithFeedback(link, function () {
          showQuickShareToast("✓ " + t("copied"), "success");
        });
      });
    }

    // Synchronize bottom Challenge section share buttons:
    var wa = document.getElementById("share-whatsapp");
    if (wa) {
      wa.href = "https://wa.me/?text=" + encodeURIComponent(message + " " + shareUrl(answers, "whatsapp"));
      wa.addEventListener("click", function () { track("share", { method: "whatsapp", result: key }); });
    }

    var more = document.getElementById("share-native");
    if (more && navigator.share) {
      more.hidden = false;
      more.addEventListener("click", function () {
        track("share", { method: "native", result: key });
        shareOrDownloadStoryCard(answers, title, overall, ideo, s, name, "native");
      });
    }

    var copy = document.getElementById("share-copy");
    var status = document.getElementById("copy-status");
    if (copy) {
      copy.addEventListener("click", function () {
        var link = shareUrl(answers, "copy");
        track("share", { method: "copy", result: key });
        copyLinkWithFeedback(link, function () {
          if (status) {
            status.textContent = "✓ " + t("copied");
            setTimeout(function () { status.textContent = ""; }, 3200);
          }
        });
      });
    }
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
      '<svg class="compass" viewBox="0 0 200 210" role="img" aria-label="' + esc(t("compassHeading")) + '">' +
      '<defs>' +
      '  <clipPath id="compass-clip"><rect x="16" y="16" width="168" height="168" rx="14"/></clipPath>' +
      '  <filter id="compass-shadow" x="-30%" y="-30%" width="160%" height="160%">' +
      '    <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.22"/>' +
      '  </filter>' +
      '</defs>' +
      '<g clip-path="url(#compass-clip)">' +
      '  <rect x="16" y="16" width="84" height="84" fill="var(--q-auth-left)"/>' +
      '  <rect x="100" y="16" width="84" height="84" fill="var(--q-auth-right)"/>' +
      '  <rect x="16" y="100" width="84" height="84" fill="var(--q-lib-left)"/>' +
      '  <rect x="100" y="100" width="84" height="84" fill="var(--q-lib-right)"/>' +
      '  <g stroke="var(--surface)" stroke-width="0.75" opacity="0.95">' + grid + '</g>' +
      '</g>' +
      '<rect x="16" y="16" width="168" height="168" rx="14" fill="none" stroke="var(--border-strong)" stroke-width="1"/>' +
      '<line x1="100" y1="16" x2="100" y2="184" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>' +
      '<line x1="16" y1="100" x2="184" y2="100" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>' +
      '<path d="M' + x.toFixed(1) + ' 100V' + y.toFixed(1) + 'M100 ' + y.toFixed(1) + 'H' + x.toFixed(1) + '" fill="none" stroke="var(--accent)" stroke-width="0.85" stroke-dasharray="2.5 2.5" opacity="0.65"/>' +
      '<text x="100" y="11" text-anchor="middle" class="compass-label">' + esc(civil.right) + '</text>' +
      '<text x="100" y="198" text-anchor="middle" class="compass-label">' + esc(civil.left) + '</text>' +
      '<text x="9" y="100" text-anchor="middle" transform="rotate(-90 9 100)" class="compass-label">' + esc(t("left")) + '</text>' +
      '<text x="191" y="100" text-anchor="middle" transform="rotate(90 191 100)" class="compass-label">' + esc(t("right")) + '</text>' +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="14" fill="var(--accent)" opacity="0.18">' +
      '  <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite"/>' +
      '  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5.5" fill="var(--accent)" stroke="#ffffff" stroke-width="2" filter="url(#compass-shadow)"/>' +
      '</svg>';
    document.getElementById("compass").innerHTML = svg;
  }

  /* ---------- Community Stats Dashboard Page ---------- */

  // The dashboard itself is rendered by stats.js; this only sets the translated title.
  function statsPage() {
    document.title = t("statsTitle");
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Boot ---------- */

  applyI18n();
  initAnalytics();
  var pages = { home: homePage, start: startPage, quiz: quizPage, result: resultPage, stats: statsPage };
  var redirecting = pages[page] ? pages[page]() === false : false;
  if (!redirecting) renderAds(); // never request ads on a page that is about to redirect
})();
