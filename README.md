# Political Ideology Quiz (English + हिन्दी)

A mobile-first quiz website that earns money from ads. A visitor:

1. **Picks a language**: English or Hindi.
2. **Enters their name** and starts.
3. **Answers 10 questions**, one per page.
4. **Gets a result page**: their ideology, a political-compass chart, and WhatsApp sharing.

Every page shows ads. **See [AD_STRATEGY.md](AD_STRATEGY.md) for the full monetisation plan.**

It's plain HTML, CSS and JavaScript, with no framework and no build step. Upload the folder to any static host and it works.

## Files

```
index.html        Page 1: language choice (landing page)
start.html        Page 2: name + start
quiz.html         Pages 3–12: one question per page (?q=1…10)
result.html       Page 13: result, compass chart, share buttons
about.html, privacy.html, contact.html   Needed for AdSense approval
ads.txt           AdSense seller declaration (needs your pub ID)
robots.txt, sitemap.xml, site.webmanifest
assets/js/config.js     ← AdSense + Analytics IDs (the only code file you must edit)
assets/js/questions.js  ← the 10 questions and 5 results, in both languages
assets/js/strings.js    ← all button and label text, in both languages
assets/js/app.js        Page logic: scoring, navigation, ads, sharing
assets/css/style.css    Styles (light + dark mode)
assets/img/             Icon and the WhatsApp/Facebook preview image
```

## Preview on your computer

```bash
npx serve .          # or: python3 -m http.server 8080
```

Open the address it prints. To see it on your phone, open your computer's local IP address on the same Wi-Fi network.

Until you add your AdSense ID, grey dashed boxes show where the ads will appear.

## Before going live: replace the placeholders

Use find-and-replace across the whole project (for example in VS Code):

| Find | Replace with | Files |
|---|---|---|
| `ca-pub-XXXXXXXXXXXXXXXX` | your AdSense publisher ID | `assets/js/config.js`, `index.html` |
| `pub-XXXXXXXXXXXXXXXX` | the same ID **without** `ca-` | `ads.txt` |
| `https://YOUR-DOMAIN.com` | your site address | `index.html`, `result.html`, `robots.txt`, `sitemap.xml` |
| `YOUR-EMAIL@example.com` | your contact email | `privacy.html`, `contact.html` |

Then, in `assets/js/config.js`:

- Paste your three ad-unit slot numbers into `AD_SLOTS`.
- Optionally, add a Google Analytics 4 ID in `GA_MEASUREMENT_ID`.

Real ads switch on automatically once `ADSENSE_CLIENT` is a real ID.

## Deploy for free

**GitHub Pages**
1. In the repo, go to *Settings → Pages* and deploy from your branch, `/ (root)`.
2. Add your custom domain under *Settings → Pages → Custom domain*.

**Netlify / Cloudflare Pages**
1. Import the repo.
2. Leave the build command empty and set the output directory to `/`.
3. Add your domain.

AdSense approves sites on a domain you own, so buy a domain (`.com` / `.in`) and connect it. `ads.txt` must be reachable at `https://your-domain/ads.txt`.

## Change the questions

Edit `assets/js/questions.js`. Each question has:

- **`axis`**: `econ` (Left ↔ Right) or `social` (Freedom ↔ Order).
- **`dir`**: `1` if agreeing pushes the score towards Right/Order, `-1` if it pushes towards Left/Freedom.
- **Text in both languages**, plus a short "why this matters" note.

Keep 10 questions with 5 per axis. Answers are stored by position in share links, so reordering questions changes the results of links that were already shared.

Scoring:

- Each answer gives −2 to +2 points, so each axis runs from −10 to +10.
- Both axes within ±2 gives **Centrist**.
- Otherwise the quadrant decides the result:
  - Left + Freedom: **Progressive Liberal**
  - Left + Order: **Communitarian**
  - Right + Freedom: **Libertarian**
  - Right + Order: **Conservative**

## How it works (for developers)

- **State lives in the URL.** For example, `quiz.html?lang=hi&q=4&a=021` means Hindi, question 4, previous answers 0, 2, 1. Every question is a real page load: one page view and fresh ads each time, and the Back button works.
- **The name is stored only in `localStorage`.** It is never put in a URL, because URLs are sent to ad and analytics servers.
- **Shared links** look like `result.html?a=…&s=1`. They open a "friend view" with a *Take the quiz* call to action.
