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
    var el = document.getElementById(elementId);
    var wrap = wrapId ? document.getElementById(wrapId) : null;
    if (!el) return;

    var db = getFirebaseDb();
    if (db) {
      try {
        var counterRef = db.ref("quiz_count");
        counterRef.on("value", function (snapshot) {
          var count = snapshot.val();
          if (typeof count === "number" && count >= 0) {
            el.textContent = t("liveCounter", { count: count.toLocaleString() });
            if (wrap) wrap.hidden = false;
          }
        });
        return;
      } catch (e) {
        console.warn("Live counter listener warning:", e);
      }
    }

    if (window.QUIZ_DB) {
      window.QUIZ_DB.getStats().then(function (stats) {
        if (stats && stats.total) {
          el.textContent = t("liveCounter", { count: stats.total.toLocaleString() });
          if (wrap) wrap.hidden = false;
        }
      });
    }
  }

  function incrementQuizCounter(answers) {
    if (params.get("s") === "1") return; // Never increment on friend shared preview links
    var countedKey = "pq_counted_" + (answers || "submitted");
    if (load(countedKey)) return; // Prevent incrementing on page refresh or revisit

    var db = getFirebaseDb();
    if (!db) return;

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
    } catch (e) {
      console.warn("Quiz counter transaction error:", e);
    }
  }

  /* ---------- Pages ---------- */

  function homePage() {
    bindLiveCounter("live-counter-text", "live-counter-wrap");

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
    document.getElementById("result-emoji").textContent = ideo.emoji;
    document.getElementById("result-lead").textContent = friend
      ? t("resultLeadFriend")
      : name ? t("resultLeadNamed", { name: name }) : t("resultLead");
    document.getElementById("result-title").textContent = text.title;
    document.getElementById("result-desc").textContent = text.desc;

    var badgeEl = document.getElementById("result-badge");
    if (badgeEl) badgeEl.textContent = overall;

    var overallBox = document.getElementById("overall");
    if (overallBox) {
      overallBox.innerHTML = "";
      overallBox.appendChild(renderRadialGauge(s.overall, t("left"), t("right"), overall, overallBand));
    }

    // Template 3 Bento: Ideological neighbours chips
    var chipsContainer = document.getElementById("neighbour-chips");
    if (chipsContainer) {
      chipsContainer.innerHTML = "";
      ranked.slice(1, 4).forEach(function (r) {
        var chip = el("div", "neighbour-chip");
        var em = el("span", "neighbour-chip__emoji", r.emoji);
        var title = el("span", "neighbour-chip__name", r[lang].title);
        chip.appendChild(em);
        chip.appendChild(title);
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
    setupShare(answers, text.title, overall, ideo.key);

    // Atomic live quiz counter increment and live badge
    incrementQuizCounter(answers);
    bindLiveCounter("live-counter-text", "live-counter-wrap");

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

  /* Community Comparison Widget (Below Compass) */
  function renderCommunityComparison(userScore, userIdeo, userBand) {
    var card = document.getElementById("community-card");
    if (!card || !window.QUIZ_DB) return;

    window.QUIZ_DB.getStats().then(function (stats) {
      // 1. Badge & Subtitle
      var badge = document.getElementById("community-badge");
      if (badge) {
        badge.textContent = stats.isLive ? t("statsLiveBadge") : (stats.total + " " + (t("statsParticipantsCount", { n: "" }) || "quiz takers")).trim();
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
          kpiTop.textContent = topIdeoObj.emoji + " " + topIdeoObj[lang].title.split(" (")[0] + " (" + topPct + "%)";
        }
      }

      // 3. User Comparison Callout
      var userIdeoStat = stats.ideologies[userIdeo.key] || { count: 0, pct: 0 };
      var diff = userScore - stats.averages.overall;
      var absDiff = Math.abs(diff);
      var userScoreFmt = (userScore > 0 ? "+" : "") + userScore;
      var avgFmt = (stats.averages.overall > 0 ? "+" : "") + stats.averages.overall;

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
          return {
            key: item.key,
            emoji: item.emoji,
            title: item[lang].title,
            count: iStat.count,
            pct: iStat.pct,
            isUser: (item.key === userIdeo.key)
          };
        }).sort(function (a, b) {
          return b.count - a.count;
        });

        var maxPct = Math.max(1, list[0].pct);
        var barsHtml = list.map(function (item) {
          var widthRatio = ((item.pct / maxPct) * 100).toFixed(1);
          return (
            '<div class="stats-bar-item' + (item.isUser ? ' is-user' : '') + '">' +
            '  <div class="stats-bar-head">' +
            '    <span class="stats-bar-title">' +
            '      <span class="stats-bar-emoji">' + item.emoji + '</span> ' +
            '      <span>' + esc(item.title) + '</span>' +
            (item.isUser ? ' <span class="badge stats-bar-user-badge">' + esc(t("youTag")) + '</span>' : '') +
            '    </span>' +
            '    <span class="stats-bar-meta"><strong>' + item.pct + '%</strong> <span class="muted">(' + item.count + ')</span></span>' +
            '  </div>' +
            '  <div class="stats-bar-track">' +
            '    <div class="stats-bar-fill' + (item.isUser ? ' is-user-fill' : '') + '" style="width: ' + widthRatio + '%;"></div>' +
            '  </div>' +
            '</div>'
          );
        }).join("");

        ideoBarsContainer.innerHTML = barsHtml;
      }
    });
  }

  function renderCommunityCompareBar(userScore, avgScore) {
    var userPct = Math.min(95, Math.max(5, (userScore + 100) / 2));
    var avgPct = Math.min(95, Math.max(5, (avgScore + 100) / 2));

    var avgFmt = (avgScore > 0 ? "+" : "") + avgScore;
    var userFmt = (userScore > 0 ? "+" : "") + userScore;

    return (
      '<div class="compare-bar">' +
      '  <div class="compare-bar__track">' +
      '    <div class="compare-bar__avg-line" style="left: ' + avgPct.toFixed(1) + '%;">' +
      '      <span class="compare-bar__avg-tag">' + esc(t("statsAvgSpectrum")) + ' (' + avgFmt + ')</span>' +
      '    </div>' +
      '    <div class="compare-bar__user-pin" style="left: ' + userPct.toFixed(1) + '%;">' +
      '      <span class="compare-bar__user-dot"></span>' +
      '      <span class="compare-bar__user-tag">' + esc(t("overall")) + ' (' + userFmt + ')</span>' +
      '    </div>' +
      '  </div>' +
      '  <div class="compare-bar__ends">' +
      '    <span>' + esc(t("left")) + ' (-100)</span>' +
      '    <span>' + esc(t("right")) + ' (+100)</span>' +
      '  </div>' +
      '</div>'
    );
  }

  /* Template 3: Semi-Circular Radial Gauge (Speedometer) */
  function renderRadialGauge(value, leftName, rightName, bandLabel, activeBand) {
    var leftPct = Math.round((100 - value) / 2);
    var rightPct = 100 - leftPct;

    var mainPctText = leftPct > rightPct
      ? leftPct + "% " + leftName
      : rightPct > leftPct
      ? rightPct + "% " + rightName
      : "50% " + leftName + " / " + rightName;

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
      var done = function () {
        status.textContent = "✓ " + t("copied");
        setTimeout(function () { status.textContent = ""; }, 3200);
      };
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

  function renderCommunityCompass(averages, container) {
    var civil = QUIZ.domains.civil[lang];
    var econVal = averages.econ || 0;
    var civilVal = averages.civil || 0;
    var x = 100 + (econVal / 100) * 84;
    var y = 100 - (civilVal / 100) * 84;

    var grid = "";
    for (var i = 16; i <= 184; i += 21) {
      grid += '<line x1="' + i + '" y1="16" x2="' + i + '" y2="184"/>' +
              '<line x1="16" y1="' + i + '" x2="184" y2="' + i + '"/>';
    }
    var svg =
      '<svg class="compass" viewBox="0 0 200 210" role="img" aria-label="' + esc(t("statsCompassHeading") || "Community Compass") + '">' +
      '<defs>' +
      '  <clipPath id="comm-compass-clip"><rect x="16" y="16" width="168" height="168" rx="14"/></clipPath>' +
      '  <filter id="comm-compass-shadow" x="-30%" y="-30%" width="160%" height="160%">' +
      '    <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.22"/>' +
      '  </filter>' +
      '</defs>' +
      '<g clip-path="url(#comm-compass-clip)">' +
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
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5.5" fill="var(--accent)" stroke="#ffffff" stroke-width="2" filter="url(#comm-compass-shadow)"/>' +
      '</svg>';
    container.innerHTML = svg;
  }

  /* ---------- Community Stats Dashboard Page ---------- */

  function statsPage() {
    document.title = t("statsTitle") || "Community Ideology Statistics";
    var refreshBtn = document.getElementById("stats-refresh");

    function loadAndRenderStats() {
      if (refreshBtn) refreshBtn.classList.add("is-spinning");
      if (!window.QUIZ_DB) return;

      window.QUIZ_DB.getStats().then(function (stats) {
        if (refreshBtn) refreshBtn.classList.remove("is-spinning");
        if (!stats) return;

        // Badge
        var badge = document.getElementById("stats-badge");
        if (badge) {
          badge.textContent = stats.isLive ? (t("statsLiveBadge") || "Live Database") : (stats.total + "+ " + (t("statsParticipantsCount", { n: "" }) || "Quiz Takers")).trim();
          badge.className = "badge " + (stats.isLive ? "badge--live" : "badge--sample");
        }

        // KPIs
        var kpiTotal = document.getElementById("kpi-total");
        if (kpiTotal) kpiTotal.textContent = stats.total.toLocaleString();

        var topIdeoKey = stats.topIdeology;
        var topIdeoObj = QUIZ_RESULTS.ideologies.find(function (i) { return i.key === topIdeoKey; });
        var kpiTop = document.getElementById("kpi-top");
        if (kpiTop && topIdeoObj) {
          kpiTop.textContent = (topIdeoObj.emoji || "") + " " + topIdeoObj[lang].title;
        }

        var kpiAvg = document.getElementById("kpi-avg");
        if (kpiAvg) {
          var avgOverall = stats.averages.overall;
          var sign = avgOverall > 0 ? "+" : "";
          kpiAvg.textContent = sign + avgOverall;
        }

        var kpiLang = document.getElementById("kpi-lang");
        if (kpiLang && stats.langCounts) {
          var enC = stats.langCounts.en || 0;
          var hiC = stats.langCounts.hi || 0;
          var totalL = enC + hiC || 1;
          kpiLang.textContent = Math.round((enC / totalL) * 100) + "% / " + Math.round((hiC / totalL) * 100) + "%";
        }

        // Ideology Bars
        var barsContainer = document.getElementById("stats-ideology-bars");
        if (barsContainer) {
          barsContainer.innerHTML = "";
          var sorted = Object.keys(stats.ideologies).map(function (k) {
            var item = stats.ideologies[k];
            var obj = QUIZ_RESULTS.ideologies.find(function (i) { return i.key === k; });
            return {
              key: k,
              title: obj ? obj[lang].title : k,
              emoji: obj ? obj.emoji : "🏛️",
              count: item.count,
              pct: item.pct
            };
          }).sort(function (a, b) { return b.count - a.count; });

          sorted.slice(0, 8).forEach(function (row) {
            var item = el("div", "stats-bar-item");
            item.innerHTML =
              '<div class="stats-bar-head">' +
              '  <span class="stats-bar-title"><span class="stats-bar-emoji">' + esc(row.emoji) + '</span> ' + esc(row.title) + '</span>' +
              '  <span class="stats-bar-meta">' + row.pct + '% (' + row.count + ')</span>' +
              '</div>' +
              '<div class="stats-bar-track">' +
              '  <div class="stats-bar-fill" style="width: ' + row.pct + '%;"></div>' +
              '</div>';
            barsContainer.appendChild(item);
          });
        }

        // Spectrum 7 Bands
        var spectrumContainer = document.getElementById("stats-spectrum-bars");
        if (spectrumContainer) {
          spectrumContainer.innerHTML = "";
          var bandNames = [
            t("bandL2"), t("bandL1"), t("bandLM"),
            t("bandMid"),
            t("bandRM"), t("bandR1"), t("bandR2")
          ];
          var bandColors = [
            "#f43f5e", "#fb7185", "#fda4af",
            "#cbd5e1",
            "#93c5fd", "#60a5fa", "#3b82f6"
          ];
          for (var b = 0; b < 7; b++) {
            var bData = stats.bands[b] || { count: 0, pct: 0 };
            var bRow = el("div", "spectrum-band-row");
            bRow.innerHTML =
              '<div class="spectrum-band-head">' +
              '  <span class="spectrum-band-dot" style="background: ' + bandColors[b] + ';"></span>' +
              '  <span class="spectrum-band-name">' + esc(bandNames[b] || "Band " + b) + '</span>' +
              '  <span class="spectrum-band-pct">' + bData.pct + '% (' + bData.count + ')</span>' +
              '</div>' +
              '<div class="spectrum-band-track">' +
              '  <div class="spectrum-band-fill" style="width: ' + bData.pct + '%; background: ' + bandColors[b] + ';"></div>' +
              '</div>';
            spectrumContainer.appendChild(bRow);
          }
        }

        // 4 Domains Grid
        var domainsGrid = document.getElementById("stats-domains-grid");
        if (domainsGrid) {
          domainsGrid.innerHTML = "";
          DOMAINS.forEach(function (d) {
            var dom = QUIZ.domains[d];
            var names = dom[lang];
            var avgVal = stats.averages[d] || 0;
            var band = QUIZ.bands[d][bandIndex(avgVal)][lang];
            var card = el("div", "stats-domain-card");
            var sign = avgVal > 0 ? "+" : "";

            card.innerHTML =
              '<div class="stats-domain-header">' +
              '  <span class="stats-domain-title">' + dom.icon + ' ' + esc(names.name) + '</span>' +
              '  <span class="badge badge--accent">' + esc(band.label) + ' (' + sign + avgVal + ')</span>' +
              '</div>';
            card.appendChild(meter(avgVal, names.left, names.right, band.label, DOMAIN_SEGS, bandIndex(avgVal)));
            domainsGrid.appendChild(card);
          });
        }

        // Community Compass
        var compassBox = document.getElementById("stats-compass");
        if (compassBox) {
          renderCommunityCompass(stats.averages, compassBox);
        }

        // Recent Feed
        var recentFeed = document.getElementById("stats-recent-feed");
        if (recentFeed && stats.recent) {
          recentFeed.innerHTML = "";
          stats.recent.forEach(function (rec) {
            var ideoObj = QUIZ_RESULTS.ideologies.find(function (i) { return i.key === rec.ideology; });
            var item = el("div", "recent-feed-item");
            var sign = rec.overall_score > 0 ? "+" : "";
            item.innerHTML =
              '<span class="recent-feed-icon">' + (ideoObj ? ideoObj.emoji : "🧭") + '</span>' +
              '<div class="recent-feed-body">' +
              '  <div class="recent-feed-title">' + (ideoObj ? esc(ideoObj[lang].title) : esc(rec.ideology)) + '</div>' +
              '  <div class="recent-feed-meta">Score: ' + sign + rec.overall_score + ' · ' + (rec.lang === "hi" ? "हिन्दी" : "English") + '</div>' +
              '</div>' +
              '<span class="recent-feed-time">' + esc(rec.timeAgo) + '</span>';
            recentFeed.appendChild(item);
          });
        }
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", loadAndRenderStats);
    }

    loadAndRenderStats();
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
