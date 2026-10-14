# ideoMap (English + हिन्दी)

A mobile-first quiz website that earns money from ads. A visitor:

1. **Picks a language**: English or Hindi.
2. **Enters their name** and picks a length: **Quick** (12 questions, about 2 minutes) or **In-depth** (24 questions, about 5 minutes).
3. **Answers the questions**, one per page. Each question has its own five answer choices, plus a short note on the history and research behind it.
   - Quick-quiz takers reach a **checkpoint** after question 12: *See results now* or *Continue to 24 questions*. Their 12 answers are kept either way.
   - A Quick result page also offers *Continue to 24 questions* (not shown in a friend's shared view).
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
quiz.html         One question per page (?q=1…24&total=12|24), plus the checkpoint after question 12 of the Quick quiz
result.html       Last page: ideology, meters per area, comparison with all users, compass
stats.html        Community Dashboard: overall ideology distribution, spectrum breakdown & averages
ideology/*.html   Ideology guide pages in English (generated, see below)
hi/ideology/*.html  The same guides in Hindi (generated)
about.html, privacy.html, contact.html   Needed for AdSense approval
ads.txt           AdSense seller declaration (needs your pub ID)
robots.txt, sitemap.xml, site.webmanifest
assets/js/config.js     ← AdSense + Analytics + Firebase settings
assets/js/db.js         ← Firebase Realtime DB tracking client + sample data fallback
assets/js/stats.js      ← Statistics dashboard controller & charts
assets/js/questions.js  ← the 4 areas and 24 questions (1–12 Quick set, 13–24 In-depth set), in both languages
assets/js/results.js    ← labels, descriptions and examples for every result, in both languages (result page only)
assets/js/strings.js    ← all button and label text, in both languages
assets/js/app.js        Page logic: scoring, navigation, ads, sharing
assets/css/style.css    Styles (light theme)
assets/fonts/           Self-hosted web fonts (Instrument Sans/Serif, Tiro Devanagari Hindi) + licence
assets/img/             Icon and the WhatsApp/Facebook preview image
tools/ideology-pages/   content.js (guide page text) and build.js (writes the guide pages + sitemap.xml)
```

## Ideology guide pages

Each ideology can have a plain-HTML guide page that search engines and AdSense reviewers can read without JavaScript: a simple explanation, core beliefs, its place on the four scales, 3 examples of it working, 2 of it going wrong, supporters' and critics' views, famous figures and FAQs.

The text lives in `tools/ideology-pages/content.js`; the title, core beliefs and scores come from `assets/js/results.js`. After editing either, rebuild and commit the output:

```bash
node tools/ideology-pages/build.js
```

This rewrites `ideology/`, `hi/ideology/` and `sitemap.xml`. Only ideologies with an entry in `content.js` get a page.

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
| `https://YOUR-DOMAIN.com` | your site address (done: `https://ideomap.in`) | `index.html`, `result.html`, `robots.txt`, `sitemap.xml` |
| `YOUR-EMAIL@example.com` | your contact email (done: `code4sarthak@gmail.com`) | `privacy.html`, `contact.html`, `terms.html` |

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

The list has two halves. Questions 1–12 are the Quick quiz and questions 13–24 are the In-depth set; **each half must keep 3 questions per area**, so a 12-answer result is a complete, balanced sample on its own. Keep 5 options per question, and within each area run half the questions left → right and half right → left. Answers are stored as one digit per question in share links, so reordering questions or options changes the results of links that were already shared.

## How results are calculated

- Each area's answers are added up and scaled from **−100** (fully left) to **+100** (fully right). The scale is computed from the questions actually answered (3 per area in the Quick quiz, 6 in the In-depth quiz), so both lengths use the same −100 … +100 range and the same bands. The meters show this as a split, for example "70% Equality · 30% Markets".
- Each area falls into one of 5 bands: ≤ −60, −59 to −21, −20 to 20, 21 to 59, ≥ 60. Each band has its own label, such as *Social Democrat* or *Law & Order*, a description, and a good and a cautionary example. These are all in `assets/js/results.js`.
- **Overall Left ↔ Right** = 50% economy + 50% the average of society, civil liberties and world politics. This is the economic dimension plus the cultural "GAL–TAN" dimension used in comparative politics. It has 7 labels, from *Far Left* to *Far Right*.
- **Ideology**: each of the 16 ideologies in `results.js` has a typical position `pos: [econ, social, civil, world]`. The result is the ideology closest to the user's four scores. The next two closest are shown as "Also close to you".
- **Compass**: the classic chart, economy (x) against civil liberties (y).

## Tracking Overall Ideology of All Users

The project tracks overall ideological trends across all participants:

1. **Anonymous Result Submission**:
   - When a user finishes the quiz, `assets/js/db.js` logs an anonymous record (ideology, overall band, Left-Right score, and 4 domain scores).
   - Friend shared views (`?s=1`) and page reloads are automatically deduplicated.
   - **One entry per quiz.** A Quick (12-answer) result and the In-depth (24-answer) result that continues it share their first 12 answers, so they count as one quiz. When someone finishes all 24 after seeing their Quick result, the 24-answer result *replaces* the 12-answer one: the "quizzes taken" counter does not go up again, the summary swaps the old scores for the new ones, and the old entry is removed from the recent list. The browser remembers what it saved per quiz in `localStorage` (`pq_entry_…`, `pq_counted_…`: anonymous scores only, never the name). A different browser or cleared site data counts as a new quiz.
2. **Community Statistics Dashboard (`stats.html`)**:
   - Total number of participants who took the quiz.
   - Percentage breakdown of all 16 ideologies sorted by popularity.
   - Distribution across the 7 political spectrum bands.
   - Community averages across Economy, Society, Civil Liberties, and World Politics.
   - 2D Community Political Compass with density clusters.
   - Live stream of recent anonymous completions.
3. **"How You Compare" Widget on `result.html`**:
   - Displays what percentage of all participants share the user's worldview.
   - Compares the user's score directly against the community average with a dual-marker spectrum bar.
4. **Cloud Database Backend**:
   - **Firebase Realtime Database**: Natively supported via the existing `SITE_CONFIG.FIREBASE` credentials in `assets/js/config.js`.
   - **Sample Preview Mode**: If offline or no database is connected yet, the system provides a realistic dataset of 100 diverse participants so all UI and charts work immediately in preview.

## How it works (for developers)

- **State lives in the URL.** For example, `quiz.html?lang=hi&q=4&a=021&total=12` means Hindi, Quick quiz, question 4, and options 0, 2 and 1 were chosen for questions 1–3. Every question is a real page load: one page view and fresh ads each time, and the Back button works.
- **Quiz length** is `total=12` or `total=24`. After question 12 of the Quick quiz the next page is `quiz.html?step=checkpoint&a=…&total=12`; its two buttons are real links to `result.html?a=…` and `quiz.html?q=13&a=…&total=24`. Old links without `total` are treated as Quick, and any URL with more than 12 answers as In-depth. A result is valid with exactly 12 or 24 answers.
- **GA4 events**: `quiz_start` and `answer` carry `total`; `checkpoint_choice` (`results` / `continue`) is sent at the checkpoint; `quiz_complete` is sent on the last answer of the In-depth quiz or on *See results now*; `precision_continue` is sent from the result page.
- **The name is stored only in `localStorage`.** It is never put in a URL, because URLs are sent to ad and analytics servers.
- **Shared links** look like `result.html?a=…&s=1`. They open a "friend view" with a *Take the quiz* call to action.
