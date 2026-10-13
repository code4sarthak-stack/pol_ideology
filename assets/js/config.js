/*
 * Site configuration — the only file you need to edit to turn on ads and analytics.
 *
 * 1. ADSENSE_CLIENT: your AdSense publisher ID (looks like "ca-pub-1234567890123456").
 *    While it is left as the placeholder, the site shows grey "Ad" boxes instead of real ads
 *    so you can preview the layout.
 * 2. AD_SLOTS: create three "Display ads" units in AdSense (Ads → By ad unit) and paste their
 *    data-ad-slot numbers here.
 * 3. GA_MEASUREMENT_ID: optional Google Analytics 4 ID ("G-XXXXXXX") to track the funnel.
 */
window.SITE_CONFIG = {
  ADSENSE_CLIENT: "ca-pub-XXXXXXXXXXXXXXXX",
  AD_SLOTS: {
    top: "1111111111",    // fixed 320x100 banner at the top of pages
    middle: "2222222222", // responsive unit in the middle of content
    bottom: "3333333333"  // responsive unit near the end of the page
  },
  GA_MEASUREMENT_ID: ""
};
