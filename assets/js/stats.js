/*
 * ideoMap — Community Statistics Dashboard (stats.js)
 * Visualizes overall ideology distribution across all quiz participants.
 */
(function () {
  "use strict";

  var STR = window.STRINGS;
  var QUIZ = window.QUIZ;
  var DB = window.QUIZ_DB;

  var params = new URLSearchParams(location.search);
  var lang = params.get("lang");
  if (lang !== "hi" && lang !== "en") {
    try { lang = localStorage.getItem("pq_lang") || "en"; } catch (e) { lang = "en"; }
  }

  function t(key, vars) {
    var s = STR[lang][key];
    if (s === undefined) s = STR.en[key];
    if (vars && typeof s === "string") {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    }
    return s || "";
  }

  function esc(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function overallBandLabel(score) {
    var bands = QUIZ.overallBands;
    for (var i = 0; i < bands.length - 1; i++) {
      if (score <= bands[i].max) return bands[i][lang];
    }
    return bands[bands.length - 1][lang];
  }

  function findIdeology(key) {
    for (var i = 0; i < QUIZ.ideologies.length; i++) {
      if (QUIZ.ideologies[i].key === key) return QUIZ.ideologies[i];
    }
    return null;
  }

  /* Render all stats into the dashboard */
  function renderDashboard(data) {
    // 1. Status Badge
    var badge = document.getElementById("stats-status-badge");
    if (badge) {
      if (data.isLive) {
        badge.textContent = t("statsLiveBadge");
        badge.className = "badge badge--live";
      } else {
        badge.textContent = t("statsPreviewBadge");
        badge.className = "badge badge--sample";
      }
    }

    // 2. KPIs
    var kpiTotal = document.getElementById("kpi-total");
    var kpiCenter = document.getElementById("kpi-center");
    var kpiCenterBand = document.getElementById("kpi-center-band");
    var kpiTopIdeo = document.getElementById("kpi-top-ideo");
    var kpiTopPct = document.getElementById("kpi-top-pct");
    var kpiLang = document.getElementById("kpi-lang");

    if (kpiTotal) kpiTotal.textContent = data.total.toLocaleString();
    if (kpiCenter) {
      var avgOverall = data.averages.overall;
      kpiCenter.textContent = (avgOverall > 0 ? "+" : "") + avgOverall;
    }
    if (kpiCenterBand) {
      kpiCenterBand.textContent = overallBandLabel(data.averages.overall);
    }

    if (kpiTopIdeo && data.topIdeology) {
      var topIdeoObj = findIdeology(data.topIdeology);
      if (topIdeoObj) {
        kpiTopIdeo.textContent = topIdeoObj.emoji + " " + topIdeoObj[lang].title.split(" (")[0];
        if (kpiTopPct) {
          kpiTopPct.textContent = t("statsKpiTopSub", { pct: (data.ideologies[data.topIdeology] || {}).pct || 0 });
        }
      }
    }

    if (kpiLang && data.langCounts && data.total) {
      var enPct = Math.round(((data.langCounts.en || 0) / data.total) * 100);
      var hiPct = 100 - enPct;
      kpiLang.textContent = enPct + "% / " + hiPct + "%";
    }

    // 3. Ideology Distribution Bars (sorted by popularity)
    var barsContainer = document.getElementById("ideology-bars");
    if (barsContainer) {
      var list = QUIZ.ideologies.map(function (ideo) {
        var stat = data.ideologies[ideo.key] || { count: 0, pct: 0 };
        var textObj = ideo[lang] || ideo.en;
        return {
          key: ideo.key,
          emoji: ideo.emoji,
          title: textObj.title,
          examplePerson: textObj.examplePerson || "",
          count: stat.count,
          pct: stat.pct
        };
      }).sort(function (a, b) {
        return b.count - a.count;
      });

      var maxPct = Math.max(1, list[0].pct);
      var barsHtml = list.map(function (item) {
        var widthRatio = ((item.pct / maxPct) * 100).toFixed(1);
        var exHtml = item.examplePerson
          ? '<span class="stats-bar-sub">' + (lang === "hi" ? "उदा. " : "e.g. ") + esc(item.examplePerson) + '</span>'
          : '';
        return (
          '<div class="stats-bar-item" data-key="' + esc(item.key) + '">' +
          '  <div class="stats-bar-main">' +
          '    <div class="stats-bar-icon" aria-hidden="true">' + item.emoji + '</div>' +
          '    <div class="stats-bar-content">' +
          '      <div class="stats-bar-title-wrap">' +
          '        <span class="stats-bar-title">' + esc(item.title) + '</span>' +
          '      </div>' +
          exHtml +
          '    </div>' +
          '    <div class="stats-bar-metric">' +
          '      <span class="stats-bar-pct">' + item.pct + '%</span>' +
          '      <span class="stats-bar-count">(' + item.count + ')</span>' +
          '    </div>' +
          '  </div>' +
          '  <div class="stats-bar-track">' +
          '    <div class="stats-bar-fill" style="width: ' + widthRatio + '%;"></div>' +
          '  </div>' +
          '</div>'
        );
      }).join("");

      barsContainer.innerHTML = barsHtml;
    }

    // 4. Spectrum Bands (7 bands)
    var spectrumContainer = document.getElementById("spectrum-bars");
    if (spectrumContainer) {
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
        var stat = data.bands[i] || { count: 0, pct: 0 };
        return (
          '<div class="spectrum-band-row">' +
          '  <div class="spectrum-band-head">' +
          '    <span class="spectrum-band-dot" style="background: ' + bandColors[i] + ';"></span>' +
          '    <span class="spectrum-band-name">' + esc(band[lang]) + '</span>' +
          '    <span class="spectrum-band-pct">' + stat.pct + '% (' + stat.count + ')</span>' +
          '  </div>' +
          '  <div class="spectrum-band-track">' +
          '    <div class="spectrum-band-fill" style="width: ' + stat.pct + '%; background: ' + bandColors[i] + ';"></div>' +
          '  </div>' +
          '</div>'
        );
      }).join("");

      spectrumContainer.innerHTML = specHtml;
    }

    // 5. 4 Policy Domains Community Averages
    var domainsContainer = document.getElementById("stats-domains-grid");
    if (domainsContainer) {
      var domKeys = ["econ", "social", "civil", "world"];
      var domHtml = domKeys.map(function (d) {
        var dom = QUIZ.domains[d];
        var avg = data.averages[d] || 0;
        var split = QUIZ.leanSplit(avg);
        var leftPct = split.left;
        var rightPct = split.right;
        var markerPos = Math.min(96, Math.max(4, (avg + 100) / 2));

        return (
          '<div class="stats-domain-card">' +
          '  <div class="stats-domain-header">' +
          '    <span class="stats-domain-title">' + dom.icon + ' ' + esc(dom[lang].name) + '</span>' +
          '    <strong class="stats-domain-avg">' + (avg > 0 ? "+" : "") + avg + '</strong>' +
          '  </div>' +
          '  <div class="meter__track">' +
          '    <span class="meter__seg meter__seg--l1" style="flex-basis: 50%;"></span>' +
          '    <span class="meter__seg meter__seg--r1" style="flex-basis: 50%;"></span>' +
          '    <span class="meter__marker" style="left: ' + markerPos + '%;"></span>' +
          '  </div>' +
          '  <div class="meter__ends">' +
          '    <span><strong>' + leftPct + '%</strong> ' + esc(dom[lang].left) + '</span>' +
          '    <span>' + esc(dom[lang].right) + ' <strong>' + rightPct + '%</strong></span>' +
          '  </div>' +
          '</div>'
        );
      }).join("");

      domainsContainer.innerHTML = domHtml;
    }

    // 6. Community Political Compass
    renderStatsCompass(data.averages.econ, data.averages.civil);

    // 7. Recent Submissions Feed
    var feedContainer = document.getElementById("recent-feed");
    if (feedContainer) {
      if (!data.recent || data.recent.length === 0) {
        feedContainer.innerHTML = '<p class="muted">' + esc(t("statsNoRecent")) + '</p>';
      } else {
        var feedHtml = data.recent.slice(0, 8).map(function (r) {
          var ideoObj = findIdeology(r.ideology);
          var emoji = ideoObj ? ideoObj.emoji : "🧭";
          var title = ideoObj ? ideoObj[lang].title.split(" (")[0] : r.ideology;
          var bandText = overallBandLabel(r.overall_score);
          var scoreFmt = (r.overall_score > 0 ? "+" : "") + r.overall_score;

          return (
            '<div class="recent-feed-item">' +
            '  <span class="recent-feed-icon">' + emoji + '</span>' +
            '  <div class="recent-feed-body">' +
            '    <div class="recent-feed-title">' + esc(title) + '</div>' +
            '    <div class="recent-feed-meta">' + esc(bandText) + ' (' + scoreFmt + ') · ' + (r.lang === "hi" ? "हिन्दी" : "English") + '</div>' +
            '  </div>' +
            '  <span class="recent-feed-time">' + esc(r.timeAgo) + '</span>' +
            '</div>'
          );
        }).join("");

        feedContainer.innerHTML = feedHtml;
      }
    }
  }

  /* Render 2D Political Compass with Community Average */
  function renderStatsCompass(econAvg, civilAvg) {
    var compassEl = document.getElementById("stats-compass");
    if (!compassEl) return;

    var civil = QUIZ.domains.civil[lang];
    var x = 100 + (econAvg / 100) * 84;
    var y = 100 - (civilAvg / 100) * 84;

    var grid = "";
    for (var i = 16; i <= 184; i += 21) {
      grid += '<line x1="' + i + '" y1="16" x2="' + i + '" y2="184"/>' +
              '<line x1="16" y1="' + i + '" x2="184" y2="' + i + '"/>';
    }

    // Plot subtle ideology points for comparison
    var ideologyDots = QUIZ.ideologies.map(function (ideo) {
      var dotX = 100 + (ideo.pos[0] / 100) * 84;
      var dotY = 100 - (ideo.pos[2] / 100) * 84;
      return '<circle cx="' + dotX.toFixed(1) + '" cy="' + dotY.toFixed(1) + '" r="3" fill="var(--ink)" opacity="0.22"><title>' + esc(ideo[lang].title) + '</title></circle>';
    }).join("");

    var svg =
      '<svg class="compass" viewBox="0 0 200 210" role="img" aria-label="' + esc(t("statsCompassHeading")) + '">' +
      '<defs>' +
      '  <clipPath id="stats-compass-clip"><rect x="16" y="16" width="168" height="168" rx="14"/></clipPath>' +
      '  <filter id="stats-compass-shadow" x="-30%" y="-30%" width="160%" height="160%">' +
      '    <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.25"/>' +
      '  </filter>' +
      '</defs>' +
      '<g clip-path="url(#stats-compass-clip)">' +
      '  <rect x="16" y="16" width="84" height="84" fill="var(--q-auth-left)"/>' +
      '  <rect x="100" y="16" width="84" height="84" fill="var(--q-auth-right)"/>' +
      '  <rect x="16" y="100" width="84" height="84" fill="var(--q-lib-left)"/>' +
      '  <rect x="100" y="100" width="84" height="84" fill="var(--q-lib-right)"/>' +
      '  <g stroke="var(--surface)" stroke-width="0.75" opacity="0.95">' + grid + '</g>' +
      '  <g>' + ideologyDots + '</g>' +
      '</g>' +
      '<rect x="16" y="16" width="168" height="168" rx="14" fill="none" stroke="var(--border-strong)" stroke-width="1"/>' +
      '<line x1="100" y1="16" x2="100" y2="184" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>' +
      '<line x1="16" y1="100" x2="184" y2="100" stroke="var(--ink)" stroke-width="0.85" opacity="0.35"/>' +
      '<path d="M' + x.toFixed(1) + ' 100V' + y.toFixed(1) + 'M100 ' + y.toFixed(1) + 'H' + x.toFixed(1) + '" fill="none" stroke="var(--accent)" stroke-width="0.85" stroke-dasharray="2.5 2.5" opacity="0.65"/>' +
      '<text x="100" y="11" text-anchor="middle" class="compass-label">' + esc(civil.right) + '</text>' +
      '<text x="100" y="198" text-anchor="middle" class="compass-label">' + esc(civil.left) + '</text>' +
      '<text x="9" y="100" text-anchor="middle" transform="rotate(-90 9 100)" class="compass-label">' + esc(t("left")) + '</text>' +
      '<text x="191" y="100" text-anchor="middle" transform="rotate(90 191 100)" class="compass-label">' + esc(t("right")) + '</text>' +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="16" fill="var(--accent)" opacity="0.18"/>' +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="6" fill="var(--accent)" stroke="#ffffff" stroke-width="2" filter="url(#stats-compass-shadow)"/>' +
      '</svg>';

    compassEl.innerHTML = svg;
  }

  function loadAndRender() {
    if (!DB) return;
    DB.getStats().then(renderDashboard).catch(function () {});
  }

  // Refresh button action
  var refreshBtn = document.getElementById("btn-refresh");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      refreshBtn.classList.add("is-spinning");
      DB.getStats().then(function (data) {
        renderDashboard(data);
        setTimeout(function () {
          refreshBtn.classList.remove("is-spinning");
        }, 500);
      });
    });
  }

  // Back button handler
  function setupBackButtons() {
    function goBack(e) {
      if (e) e.preventDefault();
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "index.html" + (lang ? "?lang=" + lang : "");
      }
    }

    var topBtn = document.getElementById("btn-back-top");
    if (topBtn) topBtn.addEventListener("click", goBack);

    var btmBtn = document.getElementById("btn-back-bottom");
    if (btmBtn) btmBtn.addEventListener("click", goBack);
  }

  // Boot
  setupBackButtons();
  loadAndRender();
})();
