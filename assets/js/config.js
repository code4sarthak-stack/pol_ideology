/*
 * Site configuration — the only file you need to edit to turn on ads and analytics.
 *
 * 1. ADSENSE_CLIENT: your AdSense publisher ID (looks like "ca-pub-1234567890123456").
 *    While it is left as the placeholder, the site shows grey "Ad" boxes instead of real ads
 *    so you can preview the layout.
 * 2. AD_SLOTS: create three "Display ads" units in AdSense (Ads → By ad unit) and paste their
 *    data-ad-slot numbers here.
 * 3. GA_MEASUREMENT_ID: optional Google Analytics 4 ID ("G-XXXXXXX") to track the funnel.
 * 4. FIREBASE: Firebase Realtime Database for the live "quizzes taken" counter and the anonymous
 *    community statistics. Without it, the stats pages show built-in sample statistics.
 * 5. DOMAIN: the site address printed on the shareable story image.
 */
window.SITE_CONFIG = {
  DOMAIN: "ideomap.in",

  ADSENSE_CLIENT: "ca-pub-3906080146441425",
  AD_SLOTS: {
    top: "1111111111",    // fixed 320x100 banner at the top of pages (replace once ad unit is created in AdSense)
    middle: "2222222222", // responsive unit in the middle of content
    bottom: "3333333333"  // responsive unit near the end of the page
  },
  GA_MEASUREMENT_ID: "G-JN6Q0JYG29",

  // Custom direct ads & sponsor banners (displayed while waiting for AdSense approval or as direct campaigns)
  // Impression share: 60% ExamLytix, 20% Fast Calculation Tricks, 20% Physics & Chemistry Calculations
  CUSTOM_ADS: {
    enabled: true,
    campaigns: [
      // 1. ExamLytix (60% weight)
      {
        id: "examlytix",
        weight: 60,
        title: "ExamLytix — Preparing for UPSC? Prepare smartly.",
        url: "https://www.examlytix.com/",
        creatives: {
          top: "assets/img/ads/examlytix-top-320x100.png",
          middle: [
            "assets/img/ads/examlytix-card-560x280.png",
            "assets/img/ads/examlytix-rect-300x250.png"
          ],
          bottom: [
            "assets/img/ads/examlytix-upsc-hero-1024x682.jpg",
            "assets/img/ads/examlytix-study-companion-1024x853.jpg"
          ]
        }
      },
      // 2. Fast Calculation Tricks (20% weight)
      {
        id: "fast_calculation",
        weight: 20,
        title: "Fast Calculation Tricks — Physics & Chemistry (Watch on YouTube)",
        url: "https://www.youtube.com/watch?v=En7ffcPPqlU",
        creatives: {
          top: "assets/img/ads/yt-fast-calc-wide.png",
          middle: [
            "assets/img/ads/yt-fast-calc-thumb.jpg",
            "assets/img/ads/yt-fast-calc-wide.png"
          ],
          bottom: [
            "assets/img/ads/yt-fast-calc-thumb.jpg"
          ]
        }
      },
      // 3. Physics & Chemistry Calculations (20% weight)
      {
        id: "physics_chemistry",
        weight: 20,
        title: "Physics & Chemistry Calculations — Shortcuts & Tricks (Watch on YouTube)",
        url: "https://www.youtube.com/watch?v=6UlYYpibM4M",
        creatives: {
          top: "assets/img/ads/yt-upsc-youtube-banner.png",
          middle: [
            "assets/img/ads/yt-physics-chem-card.jpg",
            "assets/img/ads/yt-physics-chem-thumb.jpg"
          ],
          bottom: [
            "assets/img/ads/yt-physics-chem-card.jpg"
          ]
        }
      }
    ]
  },

  // Firebase Realtime Database for live concurrent quiz counter
  FIREBASE: {
    apiKey: "AIzaSyAWCYWqF-ePAzdgi4WvDgPXWSLUTrK9DVc",
    authDomain: "ideomap-8c59f.firebaseapp.com",
    databaseURL: "https://ideomap-8c59f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ideomap-8c59f",
    storageBucket: "ideomap-8c59f.firebasestorage.app",
    messagingSenderId: "753749456601",
    appId: "1:753749456601:web:018594a3ce3485344df0c8",
    measurementId: "G-JN6Q0JYG29"
  }
};
