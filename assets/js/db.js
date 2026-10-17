/*
 * Community Ideology Tracking & Database Client (db.js)
 *
 * Supports:
 * 1. Firebase Realtime Database (using existing SITE_CONFIG.FIREBASE credentials)
 * 2. High-fidelity sample dataset of 100 users (fallback for testing and preview)
 */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  // Built-in sample dataset representing 100 diverse quiz participants
  var SAMPLE_SUBMISSIONS = [
    { ideology: "socdem", overall_band: 2, overall_score: -28, econ: -45, social: -35, civil: -20, world: -30, lang: "en", age_min: 2 },
    { ideology: "demsoc", overall_band: 1, overall_score: -52, econ: -70, social: -50, civil: -40, world: -45, lang: "hi", age_min: 8 },
    { ideology: "socdem", overall_band: 2, overall_score: -22, econ: -40, social: -25, civil: -15, world: -20, lang: "en", age_min: 14 },
    { ideology: "socdem", overall_band: 2, overall_score: -18, econ: -35, social: -20, civil: -10, world: -15, lang: "en", age_min: 23 },
    { ideology: "demsoc", overall_band: 1, overall_score: -48, econ: -65, social: -45, civil: -35, world: -40, lang: "hi", age_min: 31 },
    { ideology: "socdem", overall_band: 2, overall_score: -30, econ: -50, social: -30, civil: -25, world: -25, lang: "en", age_min: 45 },
    { ideology: "socdem", overall_band: 2, overall_score: -24, econ: -42, social: -28, civil: -18, world: -22, lang: "hi", age_min: 58 },
    { ideology: "demsoc", overall_band: 1, overall_score: -55, econ: -75, social: -55, civil: -42, world: -48, lang: "en", age_min: 75 },
    { ideology: "socdem", overall_band: 2, overall_score: -20, econ: -38, social: -22, civil: -12, world: -18, lang: "en", age_min: 90 },
    { ideology: "socdem", overall_band: 2, overall_score: -26, econ: -44, social: -30, civil: -20, world: -24, lang: "hi", age_min: 105 },
    { ideology: "socdem", overall_band: 2, overall_score: -16, econ: -32, social: -18, civil: -8, world: -14, lang: "en", age_min: 120 },
    { ideology: "demsoc", overall_band: 1, overall_score: -46, econ: -62, social: -42, civil: -32, world: -38, lang: "en", age_min: 135 },
    { ideology: "socdem", overall_band: 2, overall_score: -25, econ: -45, social: -30, civil: -20, world: -25, lang: "en", age_min: 150 },
    { ideology: "socdem", overall_band: 2, overall_score: -21, econ: -39, social: -24, civil: -14, world: -20, lang: "hi", age_min: 165 },
    { ideology: "centrist", overall_band: 3, overall_score: 2, econ: 0, social: 5, civil: -5, world: 5, lang: "en", age_min: 180 },
    { ideology: "progressive", overall_band: 2, overall_score: -25, econ: -20, social: -60, civil: -50, world: -45, lang: "en", age_min: 195 },
    { ideology: "centrist", overall_band: 3, overall_score: -4, econ: -5, social: -5, civil: 0, world: -5, lang: "hi", age_min: 210 },
    { ideology: "progressive", overall_band: 2, overall_score: -30, econ: -25, social: -65, civil: -55, world: -50, lang: "en", age_min: 225 },
    { ideology: "centrist", overall_band: 3, overall_score: 5, econ: 8, social: 2, civil: -2, world: 5, lang: "en", age_min: 240 },
    { ideology: "progressive", overall_band: 2, overall_score: -22, econ: -18, social: -55, civil: -45, world: -40, lang: "hi", age_min: 260 },
    { ideology: "centrist", overall_band: 3, overall_score: 0, econ: 2, social: -2, civil: 0, world: 0, lang: "en", age_min: 280 },
    { ideology: "progressive", overall_band: 2, overall_score: -28, econ: -22, social: -62, civil: -52, world: -48, lang: "en", age_min: 300 },
    { ideology: "centrist", overall_band: 3, overall_score: -2, econ: -4, social: 0, civil: 2, world: -5, lang: "hi", age_min: 320 },
    { ideology: "centrist", overall_band: 3, overall_score: 8, econ: 12, social: 5, civil: 0, world: 5, lang: "en", age_min: 340 },
    { ideology: "progressive", overall_band: 2, overall_score: -20, econ: -15, social: -50, civil: -40, world: -35, lang: "en", age_min: 360 },
    { ideology: "classical", overall_band: 4, overall_score: 18, econ: 50, social: -20, civil: -55, world: -30, lang: "en", age_min: 380 },
    { ideology: "libertarian", overall_band: 4, overall_score: 30, econ: 75, social: -35, civil: -80, world: -20, lang: "en", age_min: 400 },
    { ideology: "classical", overall_band: 4, overall_score: 15, econ: 45, social: -15, civil: -50, world: -25, lang: "hi", age_min: 420 },
    { ideology: "classical", overall_band: 4, overall_score: 22, econ: 55, social: -25, civil: -60, world: -35, lang: "en", age_min: 440 },
    { ideology: "libertarian", overall_band: 5, overall_score: 38, econ: 82, social: -40, civil: -85, world: -25, lang: "en", age_min: 460 },
    { ideology: "classical", overall_band: 4, overall_score: 12, econ: 40, social: -10, civil: -45, world: -20, lang: "en", age_min: 480 },
    { ideology: "classical", overall_band: 4, overall_score: 25, econ: 58, social: -28, civil: -62, world: -38, lang: "hi", age_min: 510 },
    { ideology: "libertarian", overall_band: 4, overall_score: 28, econ: 70, social: -30, civil: -75, world: -15, lang: "en", age_min: 540 },
    { ideology: "classical", overall_band: 4, overall_score: 16, econ: 48, social: -18, civil: -52, world: -28, lang: "en", age_min: 570 },
    { ideology: "libcon", overall_band: 4, overall_score: 24, econ: 40, social: 25, civil: 10, world: 12, lang: "hi", age_min: 600 },
    { ideology: "conservative", overall_band: 5, overall_score: 42, econ: 28, social: 65, civil: 40, world: 35, lang: "en", age_min: 630 },
    { ideology: "libcon", overall_band: 4, overall_score: 20, econ: 35, social: 20, civil: 8, world: 10, lang: "en", age_min: 660 },
    { ideology: "conservative", overall_band: 5, overall_score: 48, econ: 32, social: 72, civil: 48, world: 42, lang: "hi", age_min: 690 },
    { ideology: "libcon", overall_band: 4, overall_score: 26, econ: 42, social: 28, civil: 12, world: 15, lang: "en", age_min: 720 },
    { ideology: "conservative", overall_band: 5, overall_score: 38, econ: 25, social: 60, civil: 38, world: 32, lang: "en", age_min: 750 },
    { ideology: "libcon", overall_band: 4, overall_score: 18, econ: 30, social: 18, civil: 5, world: 8, lang: "hi", age_min: 780 },
    { ideology: "conservative", overall_band: 5, overall_score: 45, econ: 30, social: 68, civil: 45, world: 38, lang: "en", age_min: 810 },
    { ideology: "libcon", overall_band: 4, overall_score: 22, econ: 38, social: 22, civil: 10, world: 12, lang: "en", age_min: 840 },
    { ideology: "conservative", overall_band: 5, overall_score: 50, econ: 35, social: 75, civil: 50, world: 45, lang: "hi", age_min: 870 },
    { ideology: "natcon", overall_band: 5, overall_score: 45, econ: 22, social: 58, civil: 42, world: 68, lang: "hi", age_min: 900 },
    { ideology: "leftnat", overall_band: 2, overall_score: -15, econ: -50, social: 30, civil: 35, world: 55, lang: "en", age_min: 930 },
    { ideology: "natcon", overall_band: 5, overall_score: 52, econ: 28, social: 62, civil: 48, world: 72, lang: "hi", age_min: 960 },
    { ideology: "natcon", overall_band: 5, overall_score: 40, econ: 20, social: 52, civil: 38, world: 65, lang: "en", age_min: 990 },
    { ideology: "leftnat", overall_band: 2, overall_score: -20, econ: -55, social: 35, civil: 40, world: 60, lang: "hi", age_min: 1020 },
    { ideology: "natcon", overall_band: 5, overall_score: 48, econ: 25, social: 60, civil: 45, world: 70, lang: "en", age_min: 1050 },
    { ideology: "natcon", overall_band: 5, overall_score: 38, econ: 18, social: 50, civil: 35, world: 62, lang: "hi", age_min: 1080 },
    { ideology: "gandhian", overall_band: 2, overall_score: -22, econ: -32, social: 12, civil: -55, world: -5, lang: "hi", age_min: 1110 },
    { ideology: "communitarian", overall_band: 3, overall_score: 8, econ: -22, social: 45, civil: 20, world: 2, lang: "en", age_min: 1140 },
    { ideology: "gandhian", overall_band: 2, overall_score: -25, econ: -35, social: 15, civil: -60, world: -8, lang: "hi", age_min: 1170 },
    { ideology: "communitarian", overall_band: 3, overall_score: 5, econ: -25, social: 48, civil: 22, world: 0, lang: "en", age_min: 1200 },
    { ideology: "gandhian", overall_band: 2, overall_score: -20, econ: -30, social: 10, civil: -50, world: -2, lang: "hi", age_min: 1230 },
    { ideology: "gandhian", overall_band: 2, overall_score: -28, econ: -38, social: 18, civil: -62, world: -10, lang: "en", age_min: 1260 },
    { ideology: "libsoc", overall_band: 1, overall_score: -78, econ: -82, social: -72, civil: -88, world: -68, lang: "en", age_min: 1290 },
    { ideology: "communism", overall_band: 0, overall_score: -85, econ: -92, social: -28, civil: 75, world: -28, lang: "en", age_min: 1320 },
    { ideology: "libsoc", overall_band: 1, overall_score: -72, econ: -78, social: -68, civil: -82, world: -62, lang: "hi", age_min: 1350 },
    { ideology: "communism", overall_band: 0, overall_score: -90, econ: -95, social: -32, civil: 82, world: -32, lang: "en", age_min: 1380 },
    { ideology: "libsoc", overall_band: 1, overall_score: -75, econ: -80, social: -70, civil: -85, world: -65, lang: "en", age_min: 1410 },
    { ideology: "authcap", overall_band: 5, overall_score: 48, econ: 52, social: 28, civil: 72, world: 42, lang: "en", age_min: 1440 },
    { ideology: "authnat", overall_band: 6, overall_score: 68, econ: 12, social: 82, civil: 92, world: 92, lang: "hi", age_min: 1500 },
    { ideology: "authcap", overall_band: 5, overall_score: 42, econ: 48, social: 25, civil: 68, world: 38, lang: "en", age_min: 1560 },
    { ideology: "authnat", overall_band: 6, overall_score: 72, econ: 18, social: 88, civil: 96, world: 95, lang: "en", age_min: 1620 },
    { ideology: "socdem", overall_band: 2, overall_score: -26, econ: -42, social: -28, civil: -18, world: -24, lang: "en", age_min: 1680 },
    { ideology: "classical", overall_band: 4, overall_score: 18, econ: 52, social: -22, civil: -58, world: -32, lang: "hi", age_min: 1740 },
    { ideology: "centrist", overall_band: 3, overall_score: 2, econ: 0, social: 4, civil: -2, world: 2, lang: "en", age_min: 1800 },
    { ideology: "conservative", overall_band: 5, overall_score: 42, econ: 28, social: 65, civil: 42, world: 36, lang: "en", age_min: 1860 },
    { ideology: "progressive", overall_band: 2, overall_score: -24, econ: -20, social: -58, civil: -48, world: -42, lang: "hi", age_min: 1920 },
    { ideology: "demsoc", overall_band: 1, overall_score: -50, econ: -68, social: -48, civil: -38, world: -42, lang: "en", age_min: 1980 },
    { ideology: "natcon", overall_band: 5, overall_score: 46, econ: 24, social: 58, civil: 44, world: 68, lang: "hi", age_min: 2040 },
    { ideology: "libcon", overall_band: 4, overall_score: 24, econ: 38, social: 26, civil: 12, world: 14, lang: "en", age_min: 2100 },
    { ideology: "socdem", overall_band: 2, overall_score: -22, econ: -38, social: -24, civil: -14, world: -20, lang: "hi", age_min: 2160 },
    { ideology: "libertarian", overall_band: 4, overall_score: 32, econ: 78, social: -38, civil: -82, world: -22, lang: "en", age_min: 2220 },
    { ideology: "centrist", overall_band: 3, overall_score: -1, econ: 2, social: -3, civil: 0, world: -2, lang: "en", age_min: 2280 },
    { ideology: "gandhian", overall_band: 2, overall_score: -24, econ: -34, social: 14, civil: -58, world: -6, lang: "hi", age_min: 2340 },
    { ideology: "leftnat", overall_band: 2, overall_score: -18, econ: -52, social: 32, civil: 38, world: 58, lang: "en", age_min: 2400 },
    { ideology: "classical", overall_band: 4, overall_score: 20, econ: 54, social: -24, civil: -60, world: -34, lang: "hi", age_min: 2460 },
    { ideology: "socdem", overall_band: 2, overall_score: -28, econ: -46, social: -32, civil: -22, world: -26, lang: "en", age_min: 2520 },
    { ideology: "progressive", overall_band: 2, overall_score: -26, econ: -22, social: -62, civil: -52, world: -46, lang: "en", age_min: 2580 },
    { ideology: "conservative", overall_band: 5, overall_score: 44, econ: 30, social: 68, civil: 44, world: 38, lang: "hi", age_min: 2640 },
    { ideology: "libcon", overall_band: 4, overall_score: 20, econ: 34, social: 22, civil: 8, world: 10, lang: "en", age_min: 2700 },
    { ideology: "demsoc", overall_band: 1, overall_score: -48, econ: -66, social: -46, civil: -36, world: -40, lang: "hi", age_min: 2760 },
    { ideology: "centrist", overall_band: 3, overall_score: 4, econ: 6, social: 2, civil: -1, world: 3, lang: "en", age_min: 2820 },
    { ideology: "socdem", overall_band: 2, overall_score: -24, econ: -40, social: -26, civil: -16, world: -22, lang: "en", age_min: 2880 },
    { ideology: "natcon", overall_band: 5, overall_score: 42, econ: 22, social: 54, civil: 40, world: 66, lang: "hi", age_min: 2940 },
    { ideology: "classical", overall_band: 4, overall_score: 16, econ: 48, social: -18, civil: -52, world: -28, lang: "en", age_min: 3000 },
    { ideology: "progressive", overall_band: 2, overall_score: -22, econ: -18, social: -56, civil: -46, world: -40, lang: "en", age_min: 3060 },
    { ideology: "libertarian", overall_band: 4, overall_score: 28, econ: 72, social: -32, civil: -78, world: -18, lang: "hi", age_min: 3120 },
    { ideology: "communitarian", overall_band: 3, overall_score: 6, econ: -24, social: 46, civil: 20, world: 2, lang: "en", age_min: 3180 },
    { ideology: "gandhian", overall_band: 2, overall_score: -26, econ: -36, social: 16, civil: -60, world: -8, lang: "hi", age_min: 3240 },
    { ideology: "conservative", overall_band: 5, overall_score: 46, econ: 32, social: 70, civil: 46, world: 40, lang: "en", age_min: 3300 },
    { ideology: "socdem", overall_band: 2, overall_score: -20, econ: -36, social: -22, civil: -12, world: -18, lang: "en", age_min: 3360 },
    { ideology: "libcon", overall_band: 4, overall_score: 22, econ: 36, social: 24, civil: 10, world: 12, lang: "hi", age_min: 3420 },
    { ideology: "demsoc", overall_band: 1, overall_score: -52, econ: -70, social: -50, civil: -40, world: -44, lang: "en", age_min: 3480 },
    { ideology: "centrist", overall_band: 3, overall_score: 0, econ: 0, social: 0, civil: 0, world: 0, lang: "hi", age_min: 3540 },
    { ideology: "progressive", overall_band: 2, overall_score: -28, econ: -24, social: -64, civil: -54, world: -48, lang: "en", age_min: 3600 },
    { ideology: "classical", overall_band: 4, overall_score: 22, econ: 56, social: -26, civil: -62, world: -36, lang: "en", age_min: 3660 },
    { ideology: "natcon", overall_band: 5, overall_score: 44, econ: 24, social: 56, civil: 42, world: 68, lang: "hi", age_min: 3720 }
  ];

  // App Check proves database requests come from this website, not from a script.
  // Runs once, right after the Firebase app is created (here or in app.js).
  function activateAppCheck() {
    if (!CFG.APP_CHECK_SITE_KEY || !window.firebase.appCheck) return;
    try {
      window.firebase.appCheck().activate(CFG.APP_CHECK_SITE_KEY, true);
    } catch (e) {
      console.warn("App Check activation error:", e);
    }
  }
  window.activateFirebaseAppCheck = activateAppCheck;

  // Database values are public and could be anything, so every number shown on a page goes
  // through this before it reaches the DOM.
  function num(v) {
    var n = Number(v);
    return isFinite(n) ? n : 0;
  }

  /* Helper: Check Firebase */
  var fbInstance = null;
  function getFirebaseDb() {
    if (fbInstance) return fbInstance;
    if (!window.firebase || !CFG.FIREBASE || !CFG.FIREBASE.databaseURL) return null;
    try {
      if (!window.firebase.apps || !window.firebase.apps.length) {
        window.firebase.initializeApp(CFG.FIREBASE);
        activateAppCheck();
      }
      fbInstance = window.firebase.database();
      return fbInstance;
    } catch (e) {
      return null;
    }
  }

  /* ---------- One community entry per quiz ---------- */

  // A Quick (12-answer) result and the In-depth (24-answer) result that continues it share
  // their first 12 answers, so they are one quiz and share one community entry: the later
  // result replaces the earlier one instead of counting the same person twice. The browser
  // remembers what it last saved for each quiz (anonymous scores only, no name).
  var QUICK_LENGTH = 12;

  function entryKey(answers) {
    return "pq_entry_" + answers.slice(0, QUICK_LENGTH);
  }
  function readEntry(answers) {
    try { return JSON.parse(localStorage.getItem(entryKey(answers)) || "null"); } catch (e) { return null; }
  }
  function writeEntry(entry) {
    try { localStorage.setItem(entryKey(entry.answers), JSON.stringify(entry)); } catch (e) { /* ignore */ }
  }

  // Add (sign = 1) or remove (sign = -1) one result's contribution to the Firebase summary.
  function applyToSummary(cur, r, sign) {
    cur.ideologies = cur.ideologies || {};
    cur.bands = cur.bands || {};
    cur.sums = cur.sums || {};
    cur.langs = cur.langs || {};
    var ideo = Math.max(0, (cur.ideologies[r.ideology] || 0) + sign);
    if (ideo) cur.ideologies[r.ideology] = ideo; else delete cur.ideologies[r.ideology];
    cur.bands[r.overall_band] = Math.max(0, (cur.bands[r.overall_band] || 0) + sign);
    ["econ", "social", "civil", "world", "overall"].forEach(function (d) {
      cur.sums[d] = (cur.sums[d] || 0) + sign * (r[d + "_score"] || 0);
    });
    var l = r.lang === "hi" ? "hi" : "en";
    cur.langs[l] = Math.max(0, (cur.langs[l] || 0) + sign);
  }

  /* Helper: Relative time string */
  function formatTimeAgo(dateStrOrMin) {
    var mins = 0;
    if (typeof dateStrOrMin === "number") {
      mins = dateStrOrMin < 100000 ? dateStrOrMin : Math.max(1, Math.round((Date.now() - dateStrOrMin) / 60000));
    } else {
      var d = new Date(dateStrOrMin);
      mins = Math.max(1, Math.round((Date.now() - d.getTime()) / 60000));
    }
    if (!isFinite(mins)) return "";
    if (mins < 60) return mins + "m ago";
    var hours = Math.floor(mins / 60);
    if (hours < 24) return hours + "h ago";
    var days = Math.floor(hours / 24);
    return days + "d ago";
  }

  /* Process flat rows into standard statistics */
  function processRows(rows, isLive) {
    var total = rows.length;
    var ideologyCounts = {};
    var bandCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    var sums = { econ: 0, social: 0, civil: 0, world: 0, overall: 0 };
    var langCounts = { en: 0, hi: 0 };

    rows.forEach(function (r) {
      var k = r.ideology;
      ideologyCounts[k] = (ideologyCounts[k] || 0) + 1;

      var b = typeof r.overall_band === "number" ? r.overall_band : 3;
      if (bandCounts[b] !== undefined) bandCounts[b]++;

      sums.econ += Number(r.econ_score !== undefined ? r.econ_score : r.econ) || 0;
      sums.social += Number(r.social_score !== undefined ? r.social_score : r.social) || 0;
      sums.civil += Number(r.civil_score !== undefined ? r.civil_score : r.civil) || 0;
      sums.world += Number(r.world_score !== undefined ? r.world_score : r.world) || 0;
      sums.overall += Number(r.overall_score !== undefined ? r.overall_score : r.overall) || 0;

      var l = r.lang === "hi" ? "hi" : "en";
      langCounts[l] = (langCounts[l] || 0) + 1;
    });

    var ideologyStats = {};
    var topIdeology = null;
    var maxCount = -1;

    Object.keys(ideologyCounts).forEach(function (k) {
      var c = ideologyCounts[k];
      var pct = Math.round((c / total) * 100);
      ideologyStats[k] = { count: c, pct: pct };
      if (c > maxCount) {
        maxCount = c;
        topIdeology = k;
      }
    });

    var bandStats = {};
    Object.keys(bandCounts).forEach(function (b) {
      var c = bandCounts[b];
      bandStats[b] = { count: c, pct: Math.round((c / total) * 100) };
    });

    var averages = {
      econ: Math.round(sums.econ / total),
      social: Math.round(sums.social / total),
      civil: Math.round(sums.civil / total),
      world: Math.round(sums.world / total),
      overall: Math.round(sums.overall / total)
    };

    var recent = rows.slice(0, 15).map(function (r) {
      return {
        ideology: r.ideology,
        overall_band: r.overall_band,
        overall_score: r.overall_score !== undefined ? r.overall_score : r.overall,
        lang: r.lang,
        timeAgo: formatTimeAgo(r.created_at || r.ts || r.age_min)
      };
    });

    return {
      isLive: isLive,
      total: total,
      ideologies: ideologyStats,
      bands: bandStats,
      averages: averages,
      topIdeology: topIdeology,
      langCounts: langCounts,
      recent: recent
    };
  }

  /* ---------- Public API ---------- */

  var DB = {
    // data: { ideology, overall_band, overall_score, econ_score … world_score, lang, answers }
    saveSubmission: function (data) {
      if (!data || !data.ideology || !data.answers) return Promise.resolve(false);

      // Already saved this exact result (a reload or revisit), or this quiz already has a
      // more precise result saved (e.g. Back from the 24-answer result to the 12-answer one).
      var prev = readEntry(data.answers);
      if (prev && (prev.answers === data.answers || prev.answers.length > data.answers.length)) {
        return Promise.resolve(false);
      }

      // Keep local backup
      try {
        var local = JSON.parse(localStorage.getItem("pq_local_history") || "[]");
        local.unshift({
          ideology: data.ideology,
          overall_score: data.overall_score,
          overall_band: data.overall_band,
          created_at: new Date().toISOString()
        });
        localStorage.setItem("pq_local_history", JSON.stringify(local.slice(0, 30)));
      } catch (e) {}

      // 1. Save to Firebase Realtime Database
      return new Promise(function (resolve) {
        var fb = getFirebaseDb();
        if (fb) {
          try {
            var root = fb.ref("ideology_tracker");
            root.child("summary").transaction(function (cur) {
              var fresh = !cur;
              cur = cur || { total: 0 };
              // Replacing this quiz's earlier result: swap its contribution, keep the total.
              if (prev && !fresh) applyToSummary(cur, prev, -1);
              else cur.total = (cur.total || 0) + 1;
              applyToSummary(cur, data, 1);
              return cur;
            }, function (err, committed) {
              if (!err && committed) {
                var entry = {
                  answers: data.answers,
                  ideology: data.ideology,
                  overall_band: data.overall_band,
                  overall_score: data.overall_score,
                  econ_score: data.econ_score,
                  social_score: data.social_score,
                  civil_score: data.civil_score,
                  world_score: data.world_score,
                  lang: data.lang === "hi" ? "hi" : "en"
                };
                try {
                  var item = root.child("recent").push();
                  item.set({
                    ideology: data.ideology,
                    overall_band: data.overall_band,
                    overall_score: data.overall_score,
                    lang: entry.lang,
                    ts: window.firebase.database.ServerValue.TIMESTAMP
                  });
                  entry.recentKey = item.key;
                  if (prev && prev.recentKey) {
                    root.child("recent").child(prev.recentKey).remove().catch(function () {});
                  }
                } catch (e) {}
                writeEntry(entry);
                resolve(true);
              } else {
                resolve(false);
              }
            });
            return;
          } catch (e) {
            console.warn("Firebase save error:", e);
          }
        }

        resolve(false);
      });
    },

    getStats: function () {
      // 1. Try Firebase Realtime Database
      var fb = getFirebaseDb();
      if (fb) {
        var root = fb.ref("ideology_tracker");
        // Only the summary and the newest 15 recent entries are downloaded, never the whole
        // (ever-growing) recent list. The database rules allow nothing larger.
        return Promise.all([
          root.child("summary").once("value"),
          root.child("recent").orderByKey().limitToLast(15).once("value")
        ]).then(function (snaps) {
          var sum = snaps[0].val();
          var total = sum ? num(sum.total) : 0;
          if (total <= 0) return processRows(SAMPLE_SUBMISSIONS, false);

          var ideologyStats = {};
          var topIdeology = null;
          var maxCount = -1;

          Object.keys(sum.ideologies || {}).forEach(function (k) {
            var c = num(sum.ideologies[k]);
            ideologyStats[k] = { count: c, pct: Math.round((c / total) * 100) };
            if (c > maxCount) {
              maxCount = c;
              topIdeology = k;
            }
          });

          var bandStats = {};
          for (var b = 0; b <= 6; b++) {
            var c = num(sum.bands && sum.bands[b]);
            bandStats[b] = { count: c, pct: Math.round((c / total) * 100) };
          }

          var sums = sum.sums || {};
          var averages = {
            econ: Math.round(num(sums.econ) / total),
            social: Math.round(num(sums.social) / total),
            civil: Math.round(num(sums.civil) / total),
            world: Math.round(num(sums.world) / total),
            overall: Math.round(num(sums.overall) / total)
          };

          var recentList = [];
          snaps[1].forEach(function (child) {
            var r = child.val() || {};
            recentList.unshift({
              ideology: String(r.ideology || ""),
              overall_band: num(r.overall_band),
              overall_score: num(r.overall_score),
              lang: r.lang === "hi" ? "hi" : "en",
              timeAgo: formatTimeAgo(num(r.ts))
            });
          });

          var langs = sum.langs || {};
          return {
            isLive: true,
            total: total,
            ideologies: ideologyStats,
            bands: bandStats,
            averages: averages,
            topIdeology: topIdeology,
            langCounts: sum.langs ? { en: num(langs.en), hi: num(langs.hi) } : { en: total, hi: 0 },
            recent: recentList
          };
        }).catch(function () {
          return processRows(SAMPLE_SUBMISSIONS, false);
        });
      }

      // No cloud database -> sample dataset
      return Promise.resolve(processRows(SAMPLE_SUBMISSIONS, false));
    },

    compareUser: function (userOverall, userIdeologyKey) {
      return DB.getStats().then(function (stats) {
        var ideoData = stats.ideologies[userIdeologyKey] || { count: 0, pct: 0 };
        var avgOverall = stats.averages.overall;
        var diff = userOverall - avgOverall;

        return {
          totalUsers: stats.total,
          isLive: stats.isLive,
          ideologyPct: ideoData.pct,
          ideologyCount: ideoData.count,
          communityAvg: avgOverall,
          diff: diff,
          isMoreLeft: diff < -4,
          isMoreRight: diff > 4,
          isNearCenter: Math.abs(diff) <= 4,
          bandStats: stats.bands
        };
      });
    }
  };

  window.QUIZ_DB = DB;
})();
