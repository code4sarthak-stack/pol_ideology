#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "screenshots", "ideologies");
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

const QUIZ = sandbox.window.QUIZ;
const DOMAINS = ["econ", "social", "civil", "world"];

function maxScores(n) {
  var max = { econ: 0, social: 0, civil: 0, world: 0 };
  QUIZ.questions.slice(0, n).forEach(function (q) {
    max[q.domain] += Math.max.apply(null, q.scores.map(Math.abs));
  });
  return max;
}

function score(answers) {
  var max = maxScores(answers.length);
  var raw = { econ: 0, social: 0, civil: 0, world: 0 };
  for (var i = 0; i < answers.length; i++) {
    var q = QUIZ.questions[i];
    raw[q.domain] += q.scores[+answers.charAt(i)];
  }
  var s = {};
  DOMAINS.forEach(function (d) { s[d] = Math.round((raw[d] / max[d]) * 100); });
  var overall = 0.5 * s.econ + 0.5 * ((s.social + s.civil + s.world) / 3);
  s.overall = overall < 0 ? -Math.round(-overall) : Math.round(overall);
  return s;
}

function rankIdeologies(s) {
  return QUIZ.ideologies.map(function (ideo) {
    var d = 0;
    DOMAINS.forEach(function (k, i) { d += Math.pow(s[k] - ideo.pos[i], 2); });
    return { ideo: ideo, d: d };
  }).sort(function (a, b) { return a.d - b.d; }).map(function (r) { return r.ideo; });
}

function overallIndex(v) {
  var bands = QUIZ.overallBands;
  for (var i = 0; i < bands.length - 1; i++) {
    if (v <= bands[i].max) return i;
  }
  return bands.length - 1;
}

function leanText(value, leftName, rightName) {
  var split = QUIZ.leanSplit(value);
  var leftPct = split.left;
  var rightPct = split.right;
  return leftPct > rightPct
    ? leftPct + "% " + leftName
    : rightPct > leftPct
    ? rightPct + "% " + rightName
    : "50% " + leftName;
}

// Find answer sequence for each ideology
function findAnswersForIdeology(target) {
  // Special tailored match for social-democracy to give 66% Left
  if (target.slug === "social-democracy") {
    return "131430333414";
  }

  let bestAns = null;
  let bestDist = Infinity;
  for (let r = 0; r < 500; r++) {
    let cur = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5));
    for (let pass = 0; pass < 4; pass++) {
      for (let i = 0; i < 12; i++) {
        for (let opt = 0; opt < 5; opt++) {
          if (opt === cur[i]) continue;
          let old = cur[i];
          cur[i] = opt;
          let s = score(cur.join(""));
          let d = 0;
          DOMAINS.forEach((k, idx) => { d += Math.pow(s[k] - target.pos[idx], 2); });
          if (d < bestDist && rankIdeologies(s)[0].slug === target.slug) {
            bestDist = d;
            bestAns = cur.slice();
          } else {
            cur[i] = old;
          }
        }
      }
    }
    if (bestAns && bestDist < 100) break;
  }

  return bestAns ? bestAns.join("") : null;
}

// Simple static HTTP server
function startServer(port) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".png": "image/png"
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split("?")[0];
    if (reqPath === "/") reqPath = "/index.html";
    const filePath = path.join(ROOT, reqPath);
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const PORT = 8899;
  const DEBUG_PORT = 9333;

  console.log("Starting local web server on port", PORT);
  const server = await startServer(PORT);

  console.log("Launching headless Google Chrome on debug port", DEBUG_PORT);
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  try {
    const ideos = QUIZ.ideologies;
    console.log(`Generating screenshot cards for ${ideos.length} political ideologies...\n`);

    // Tab creation
    const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?http://127.0.0.1:${PORT}/result.html?a=000000000000`, { method: "PUT" });
    const tab = await tabRes.json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = {};
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks[data.id]) {
        callbacks[data.id](data.result);
        delete callbacks[data.id];
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks[msgId] = resolve;
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise((r) => (ws.onopen = r));
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 420,
      height: 1400,
      deviceScaleFactor: 2,
      mobile: true
    });

const STORY_DIR = path.join(ROOT, "screenshots", "story-cards");
if (!fs.existsSync(STORY_DIR)) {
  fs.mkdirSync(STORY_DIR, { recursive: true });
}

    for (let i = 0; i < ideos.length; i++) {
      const ideo = ideos[i];
      const ans = findAnswersForIdeology(ideo);
      if (!ans) {
        console.error(`Failed to find answer for ${ideo.slug}`);
        continue;
      }

      const s = score(ans);
      const band = QUIZ.overallBands[overallIndex(s.overall)].en;
      const lean = leanText(s.overall, "Left", "Right");

      // Navigate to result page
      await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/result.html?a=${ans}` });
      await new Promise((r) => setTimeout(r, 600));

      // Keep authentic brand header with app logo, ideoMap, and tagline intact!
      await send("Runtime.evaluate", {
        expression: `(() => {
          // Remove top ad banner and site header so the result card is nicely positioned at top
          document.querySelectorAll(".ad, .site-header").forEach(el => el.remove());
          const lead = document.getElementById("result-lead");
          if (lead) lead.textContent = "sarthak, your political ideology is";
          const guide = document.getElementById("result-guide-link");
          if (guide) guide.hidden = true;
        })()`
      });

      await new Promise((r) => setTimeout(r, 200));

      // 1. Capture the on-page result hero card (with app logo, ideoMap, tagline)
      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector(".result-hero");
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        })()`,
        returnByValue: true
      });

      const box = evalRes.result.value;
      const shotRes = await send("Page.captureScreenshot", {
        format: "png",
        clip: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          scale: 1
        }
      });

      const outPath = path.join(OUT_DIR, `${ideo.slug}.png`);
      fs.writeFileSync(outPath, Buffer.from(shotRes.data, "base64"));

      // Also copy to artifact directory
      const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/52d5aae2-b61f-45a0-bf88-6b4ce3294531/ideology-screenshots";
      if (!fs.existsSync(ARTIFACT_DIR)) {
        fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
      }
      fs.writeFileSync(path.join(ARTIFACT_DIR, `${ideo.slug}.png`), Buffer.from(shotRes.data, "base64"));

      // 2. Generate and capture full 1080x1920 Story Card (matching WhatsApp status card)
      await send("Runtime.evaluate", {
        expression: `(() => {
          const btn = document.getElementById("hero-share-wa");
          if (btn) btn.click();
        })()`
      });

      await new Promise((r) => setTimeout(r, 600));

      const canvasRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const canvas = document.querySelector("#share-preview-img-wrap canvas");
          return canvas ? canvas.toDataURL("image/png") : null;
        })()`,
        returnByValue: true
      });

      if (canvasRes.result.value) {
        const storyBase64 = canvasRes.result.value.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(path.join(STORY_DIR, `${ideo.slug}.png`), Buffer.from(storyBase64, "base64"));
        const ARTIFACT_STORY_DIR = "/Users/sarthak/.gemini/antigravity/brain/52d5aae2-b61f-45a0-bf88-6b4ce3294531/story-cards";
        if (!fs.existsSync(ARTIFACT_STORY_DIR)) {
          fs.mkdirSync(ARTIFACT_STORY_DIR, { recursive: true });
        }
        fs.writeFileSync(path.join(ARTIFACT_STORY_DIR, `${ideo.slug}.png`), Buffer.from(storyBase64, "base64"));
      }

      console.log(`[${i + 1}/${ideos.length}] ${ideo.emoji} ${ideo.en.title} -> ${band} (${lean}) -> saved: screenshots/ideologies/${ideo.slug}.png & story-cards/${ideo.slug}.png`);
    }

    // Generate extreme 100% Left and 100% Right cases
    console.log("\nGenerating extreme edge cases (100% Left & 100% Right)...");
    const extremeCases = [
      { name: "100-percent-left", ans: "004040044404" },
      { name: "100-percent-right", ans: "440404400040" }
    ];

    for (const c of extremeCases) {
      await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/result.html?a=${c.ans}` });
      await new Promise((r) => setTimeout(r, 600));

      await send("Runtime.evaluate", {
        expression: `(() => {
          document.querySelectorAll(".ad, .site-header").forEach(el => el.remove());
          const lead = document.getElementById("result-lead");
          if (lead) lead.textContent = "sarthak, your political ideology is";
          const guide = document.getElementById("result-guide-link");
          if (guide) guide.hidden = true;
        })()`
      });

      await new Promise((r) => setTimeout(r, 200));

      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector(".result-hero");
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        })()`,
        returnByValue: true
      });

      const box = evalRes.result.value;
      const shotRes = await send("Page.captureScreenshot", {
        format: "png",
        clip: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          scale: 1
        }
      });

      fs.writeFileSync(path.join(OUT_DIR, `${c.name}.png`), Buffer.from(shotRes.data, "base64"));
      const ARTIFACT_DIR = "/Users/sarthak/.gemini/antigravity/brain/52d5aae2-b61f-45a0-bf88-6b4ce3294531/ideology-screenshots";
      if (fs.existsSync(ARTIFACT_DIR)) {
        fs.writeFileSync(path.join(ARTIFACT_DIR, `${c.name}.png`), Buffer.from(shotRes.data, "base64"));
      }

      // Story Card for extreme cases
      await send("Runtime.evaluate", {
        expression: `(() => {
          const btn = document.getElementById("hero-share-wa");
          if (btn) btn.click();
        })()`
      });

      await new Promise((r) => setTimeout(r, 600));

      const canvasRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const canvas = document.querySelector("#share-preview-img-wrap canvas");
          return canvas ? canvas.toDataURL("image/png") : null;
        })()`,
        returnByValue: true
      });

      if (canvasRes.result.value) {
        const storyBase64 = canvasRes.result.value.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(path.join(STORY_DIR, `${c.name}.png`), Buffer.from(storyBase64, "base64"));
        const ARTIFACT_STORY_DIR = "/Users/sarthak/.gemini/antigravity/brain/52d5aae2-b61f-45a0-bf88-6b4ce3294531/story-cards";
        if (fs.existsSync(ARTIFACT_STORY_DIR)) {
          fs.writeFileSync(path.join(ARTIFACT_STORY_DIR, `${c.name}.png`), Buffer.from(storyBase64, "base64"));
        }
      }

      console.log(`Saved extreme case: screenshots/ideologies/${c.name}.png & story-cards/${c.name}.png`);
    }

    ws.close();
    console.log(`\nSuccessfully generated screenshots for all ${ideos.length} ideologies!`);
  } catch (err) {
    console.error("Error during generation:", err);
  } finally {
    chrome.kill();
    server.close();
  }
}

main().catch(console.error);
