# Ad revenue strategy

How this site makes money, what is already built in to earn more per visitor, and what you need to do yourself.

---

## 1. The formula

```
Monthly revenue  =  Page views  ×  Page RPM ÷ 1,000
Page views       =  Visitors    ×  Pages per visit
```

*Page RPM* is what AdSense pays you per 1,000 page views. AdSense shows it in your reports after a couple of weeks.

That gives you three levers:

| Lever | What moves it | Where it's covered |
|---|---|---|
| **Pages per visit** | Site structure | §2, already built |
| **Visitors** | Sharing, social media, search | §5, your job |
| **RPM** | Ad formats, placement, audience, season | §3, §4, §6 |

### Why the structure matters (example)

Every question is its own page, so one person who finishes the quiz produces **23 page views**: language, name, 20 questions and the result. A typical single-page quiz app produces 2 or 3.

> *Illustration only. Your real RPM will be different, so measure it.*
> Say 1,000 people a day take the quiz, they average 16 pages after drop-off, and your page RPM is ₹40.
> 16,000 views × ₹40 ÷ 1,000 = **₹640/day ≈ ₹19,000/month**.
> The same 1,000 people on a 3-page quiz earn ₹120/day.

---

## 2. Revenue features already built into the code

| Feature | Why it earns more |
|---|---|
| One question per page (`quiz.html?q=3&a=12`) | Each question is a real page load: one page view and fresh ads every time. This is allowed by policy. Auto-refreshing ads is **not** allowed |
| Answers are real `<a>` links | AdSense **vignette** (full-screen) ads only fire on link clicks between your pages. A quiz has 22 of these per visit |
| Ad slots reserve their height | The page doesn't jump when an ad loads. That stops users tapping an ad by accident (which counts as invalid clicks and can get your account banned) and helps Core Web Vitals |
| 320×50 top banner on short phones | All five answers stay above the fold, so more people finish the quiz |
| Very light pages: no framework, no web fonts | Fast on 4G/3G, so fewer people leave between questions |
| WhatsApp share button with your result | Free traffic: every share brings new visitors |
| A "friend view" for shared links | Someone who opens a shared result sees your friend's result plus a "Take the quiz" button. That's one extra ad page, and it starts a new 23-page visit |
| Separate share-preview image (`og-image.jpg`, < 300 KB) | WhatsApp shows a large preview card, so more people tap the link |
| "Why this matters" text on every question, and a long result page (4 areas, history examples, method) | Gives each page real content. AdSense rejects or limits sites that have "more ads than content" |
| Name kept in the browser, never in URLs | Google policy forbids sending personal data (like names) to ad servers in page URLs |
| About, Privacy Policy, Contact pages and `ads.txt` | Needed to get AdSense approval |
| GA4 events (`select_language`, `quiz_start`, `answer`, `quiz_complete`, `share`, `view_result`) | Show where people drop off, so you know what to fix |

---

## 3. Ad placement map

Ad counts below are per page. In addition, Auto ads add a **sticky anchor** at the bottom of every page and **vignettes** between pages.

| Page | Top (320×100) | Middle (responsive) | Bottom (responsive) | Notes |
|---|:-:|:-:|:-:|---|
| Language (`index.html`) | – | ✅ | ✅ | No top ad: this is the landing page, so getting people to start matters most. Losing a visitor here loses all 23 page views |
| Name (`start.html`) | ✅ | ✅ | – | The middle ad sits below "How it works", away from the Start button |
| Question 1–20 (`quiz.html`) | ✅ | ✅ | – | Top ad is the most visible spot. Middle ad sits below the "Why this matters" text |
| Result (`result.html`) | ✅ | ✅ | ✅ | Longest page with the most engaged visitor. The middle ad sits between the 2nd and 3rd area cards, away from the share buttons |
| About / Privacy / Contact | – | – | – | No ads, by policy and for trust |

**Rules followed everywhere** (they protect your account):

- Every ad is labelled "Advertisement" / "विज्ञापन".
- No ad sits right next to an answer, Start or Share button.
- Ads never look like quiz answers.

---

## 4. AdSense setup, step by step

1. **Buy a domain** (a `.com` or `.in`, usually ₹500–1,200 a year). AdSense approves sites on a domain you own.
2. **Host the site for free** on GitHub Pages, Netlify or Cloudflare Pages, and connect your domain. See README.
3. **Replace the placeholders** listed in the README: your domain, email and publisher ID.
4. **Apply at [adsense.google.com](https://adsense.google.com)** and add your site. Approval usually needs:
   - original content
   - the privacy, about and contact pages (already included)
   - a working site, and preferably some real visitors first

   Approval can take from a few days to a few weeks.
5. **`ads.txt`**: put your `pub-…` ID in it. AdSense shows a warning until this file is correct.
6. **Create 3 ad units** under *Ads → By ad unit → Display ads*:
   - "Top": fixed size, 320×100
   - "Middle": responsive
   - "Bottom": responsive

   Paste their slot numbers into `assets/js/config.js`.
7. **Turn on Auto ads** under *Ads → By site → Edit*:
   - ✅ **Anchor ads** (bottom). Always visible, so it's a strong earner on mobile.
   - ✅ **Vignette ads**. They show between pages, which is ideal for this one-question-per-page design.
   - ✅ **Side rail ads**. These only appear on wide desktop screens.
   - ⚠️ **In-page ads**: start with these **off** or at the lowest ad load. You already have manual units, and too many ads lowers completion. Test turning them on later (§7).
8. **Privacy & messaging**: create the **European regulations (GDPR) message**. Google requires a certified consent message to show personalised ads to visitors from the EEA, UK and Switzerland. This needs no code; the AdSense script shows it.
9. **Never click your own ads**, even to test. Use the grey placeholder mode (see README) to check the layout.

---

## 5. Getting traffic (your biggest lever)

Ads only earn when people visit. Focus here first.

**Viral loop (WhatsApp-first, built in)**
- Share your own result in family, college and office WhatsApp groups and on your Status. Political quizzes spark debate ("you're a Conservative?!"), and debate gets shares.
- Watch the `share` event in GA4. If fewer than 10–15% of finishers share, try:
  - moving the share card above the compass
  - a stronger hook such as "Challenge your friends — who's the most Left/Right in your group?"

**Short videos**
- Instagram Reels, YouTube Shorts and Moj/Josh: screen-record yourself taking the quiz, react to the result, then say "link in bio".
- Hindi content faces less competition there.

**Communities**
- Telegram channels, Facebook groups, ShareChat and Quora answers (for example, "What is my political ideology?"). Post genuinely; don't spam.

**Search (SEO, slow but free and lasting)**
- Hindi searches face much less competition than English ones. Target phrases like:
  - "राजनीतिक विचारधारा टेस्ट"
  - "political ideology test in Hindi"
  - "political compass test India"
- Submit `sitemap.xml` in Google Search Console.

**Timing**
- Interest in politics spikes around elections, budgets and big news. Push the quiz on social media at those times.

**Don't** buy cheap traffic, use "traffic exchanges" or use click/bot services. AdSense detects them, and it is the most common reason accounts get banned.

---

## 6. Raising RPM (earnings per 1,000 views)

- **Audience location matters a lot.** Visitors from the US, UK, Canada and Australia earn many times more per view than visitors from India. The English version can reach them if you promote it on Reddit or in global communities. A "global edition" question set without India-specific examples would help.
- **Keep it brand-safe.** Advertisers avoid hateful or inflammatory pages, and AdSense can limit or remove ads on them. Neutral, respectful political content (like the current questions) keeps more advertisers bidding.
- **Seasonality.** Ad rates are highest in October–December (festive and holiday shopping) and lowest in January. Push hardest for traffic in Q4.
- **Viewability.** Advertisers pay more for ads people actually see. The top and anchor slots are visible by design. If AdSense reports low "Active View" for the bottom units, try removing them; fewer, better ads can earn the same or more.

---

## 7. Experiments to run (one at a time, about 2 weeks each)

Compare **total earnings per visitor** (AdSense revenue ÷ GA4 users), not CTR alone.

1. In-page Auto ads on at low ad load vs. off.
2. Share card above vs. below the compass on the result page.
3. A top ad on the language page vs. none. Watch the start rate.
4. Quiz length. The quiz now has 20 questions, which means more page views per finisher but also more drop-off along the way. In GA4, compare `quiz_start` with `quiz_complete` and look at the `answer` event by question. If many people leave around the middle, test a shorter version.
5. More quizzes. **This is the biggest one.** Add a second and third quiz (for example a personality quiz, a GK quiz or "Which Indian city suits you?") and link to them from the result page ("Take another quiz →"). Each extra quiz finished is more page views from a visitor you already paid nothing to get.

---

## 8. Growing later

- **Ad Manager / header bidding.** Once traffic is steady, look at Google Ad Manager or a header-bidding partner such as Ezoic or AdPushup (check their current traffic requirements). Several ad networks then compete for each slot, which usually raises RPM noticeably.
- **Rewarded / offerwall ads.** AdSense can ask users to watch an ad to unlock content (for example a "detailed breakdown"). This earns more per user but adds friction, so test it carefully.
- **Installable app.** The site already has a web manifest, so Android users can "Add to Home screen". That brings returning visitors.

---

## 9. Things that get AdSense accounts banned

- Clicking your own ads, or asking friends or family to click them.
- Text like "click the ads to support us" or arrows pointing at ads.
- Placing ads where people tap by accident (next to answer buttons, or in layouts that shift).
- Auto-refreshing ads, or reloading pages on a timer.
- Paid bot traffic, traffic exchanges or incentivised visits.
- Ads on pages with no real content (empty pages, error pages, "thank you" pages).
- Sending personal information (names, emails, phone numbers) to Google in URLs.
- Copied content.

The code already avoids the technical ones. The rest is up to you.

---

## 10. Launch checklist

- [ ] Domain bought and site live over HTTPS
- [ ] Placeholders replaced: domain, email, `ca-pub` / `pub` ID
- [ ] `https://your-domain/ads.txt` loads and shows your pub ID
- [ ] AdSense approved, 3 ad units created, slot IDs in `config.js`
- [ ] Auto ads: Anchor ✅ Vignette ✅ Side rails ✅ In-page off/low
- [ ] GDPR consent message published in AdSense *Privacy & messaging*
- [ ] GA4 property created and `GA_MEASUREMENT_ID` set
- [ ] Sitemap submitted in Google Search Console
- [ ] WhatsApp preview checked (send the link to yourself and confirm the image card appears)
- [ ] First 50 shares done in your own groups 🙂
