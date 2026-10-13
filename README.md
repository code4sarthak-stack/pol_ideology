# Political Ideology Quiz (English + हिन्दी)

A mobile-first quiz website that earns money from ads. A visitor:

1. **Picks a language**: English or Hindi.
2. **Enters their name** and starts.
3. **Answers 12 questions**, one per page. Each question has its own five answer choices, plus a short note on the history and research behind it.
4. **Gets a result page** with:
   - their closest ideology (out of 16) and an overall Left ↔ Right meter
   - a meter for each of 4 areas: Economy, Society, Civil liberties and World politics
   - one good and one cautionary real-world example for their ideology and for each area
   - a political-compass chart and WhatsApp sharing

Every page shows ads. **See [AD_STRATEGY.md](AD_STRATEGY.md) for the full monetisation plan.**

It's plain HTML, CSS and JavaScript, with no framework and no build step. Upload the folder to any static host and it works.

## Files

```
index.html        Page 1: language choice (landing page)
start.html        Page 2: name + start
quiz.html         Pages 3–14: one question per page (?q=1…12)
result.html       Page 15: ideology, meters per area, examples, compass, share buttons
about.html, privacy.html, contact.html   Needed for AdSense approval
ads.txt           AdSense seller declaration (needs your pub ID)
robots.txt, sitemap.xml, site.webmanifest
assets/js/config.js     ← AdSense + Analytics IDs (the only code file you must edit)
assets/js/questions.js  ← the 4 areas and 12 questions, in both languages
assets/js/results.js    ← labels, descriptions and examples for every result, in both languages (result page only)
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

- **`domain`**: `econ` (Equality ↔ Markets), `social` (Progress ↔ Tradition), `civil` (Liberty ↔ Authority) or `world` (Global ↔ National).
- **`scores`**: one score per option, in the order the options appear, from `-2` (left pole) to `+2` (right pole). The direction is mixed on purpose, so the leftmost answer isn't always first.
- **Text in both languages**: the question, its options and a short "why this matters" note.

Keep 3 questions per area and 5 options per question. Answers are stored as one digit per question in share links, so reordering questions or options changes the results of links that were already shared.

## How results are calculated

- Each area's answers are added up and scaled from **−100** (fully left) to **+100** (fully right). The meters show this as a split, for example "70% Equality · 30% Markets".
- Each area falls into one of 5 bands: ≤ −60, −59 to −21, −20 to 20, 21 to 59, ≥ 60. Each band has its own label, such as *Social Democrat* or *Law & Order*, a description, and a good and a cautionary example. These are all in `assets/js/results.js`.
- **Overall Left ↔ Right** = 50% economy + 50% the average of society, civil liberties and world politics. This is the economic dimension plus the cultural "GAL–TAN" dimension used in comparative politics. It has 7 labels, from *Far Left* to *Far Right*.
- **Ideology**: each of the 16 ideologies in `results.js` has a typical position `pos: [econ, social, civil, world]`. The result is the ideology closest to the user's four scores. The next two closest are shown as "Also close to you".
- **Compass**: the classic chart, economy (x) against civil liberties (y).

## How it works (for developers)

- **State lives in the URL.** For example, `quiz.html?lang=hi&q=4&a=021` means Hindi, question 4, and options 0, 2 and 1 were chosen for questions 1–3. Every question is a real page load: one page view and fresh ads each time, and the Back button works.
- **The name is stored only in `localStorage`.** It is never put in a URL, because URLs are sent to ad and analytics servers.
- **Shared links** look like `result.html?a=…&s=1`. They open a "friend view" with a *Take the quiz* call to action.
