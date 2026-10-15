const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const INSTA_DIR = path.join(ROOT, "insta_data");

// Load results.js
const sandbox = { window: { QUIZ: {} } };
vm.createContext(sandbox);
const resultsJs = fs.readFileSync(path.join(ROOT, "assets/js/results.js"), "utf8");
vm.runInContext(resultsJs, sandbox);
const ideologies = sandbox.window.QUIZ.ideologies;

// Additional metadata mapping from prompt
const promptDb = {
  "communism": {
    tagline: "Total State Ownership",
    compass: "Authoritarian Left [-95, +80]",
    culture: "Secular socialist solidarity (-30)",
    civil: "High state control & order (+80)",
    economy: "Total state-planned economy (-95)",
    world: "International worker solidarity (-30)",
    success: "Soviet Industrial Leap (USSR, 1920s–50s)",
    caution: "Great Leap Forward Famine (China, 1958–62)",
    nicheTags: [
      "#communism", "#marxism", "#leninism", "#marxismleninism", "#socialism", "#workersunite",
      "#proletariat", "#antiimperialism", "#plannedeconomy", "#leftist", "#farleft", "#classstruggle"
    ]
  },
  "libertarian-socialism": {
    tagline: "Worker-Owned Cooperatives",
    compass: "Libertarian Left [-85, -90]",
    culture: "Anti-hierarchy, radical equality (-75)",
    civil: "Maximum personal liberty (-90)",
    economy: "Worker cooperatives & shared profit (-85)",
    world: "Global voluntary cooperation (-70)",
    success: "Mondragon Cooperative Network (Spain, 1956+)",
    caution: "Yugoslav Hyperinflation Crisis (Yugoslavia, 1980s)",
    nicheTags: [
      "#libertariansocialism", "#anarchism", "#anarchosyndicalism", "#workercoops", "#cooperatives",
      "#noauthorities", "#anticapitalism", "#mutualaid", "#libleft", "#decentralization", "#directdemocracy"
    ]
  },
  "democratic-socialism": {
    tagline: "Democratic Public Welfare",
    compass: "Democratic / Libertarian Left [-75, -45]",
    culture: "Progressive secular reform (-60)",
    civil: "Strong multi-party democratic rights (-45)",
    economy: "Democratic public services & wealth redistribution (-75)",
    world: "Diplomatic peace & internationalism (-45)",
    success: "Post-War NHS & Welfare Creation (UK, 1945–51)",
    caution: "1970s Economic Stagflation (UK, 1970s)",
    nicheTags: [
      "#democraticsocialism", "#demsoc", "#publichealthcare", "#workersrights", "#unions",
      "#progressivepolitics", "#wealthredistribution", "#nhs", "#socialjustice", "#democraticleft"
    ]
  },
  "social-democracy": {
    tagline: "Welfare Capitalism",
    compass: "Centre-Left [-45, -30]",
    culture: "Inclusive & socially progressive (-40)",
    civil: "Constitutional rule of law (-30)",
    economy: "Regulated markets + high safety net (-45)",
    world: "Pro-trade with international labor standards (-35)",
    success: "The Nordic Social Model (Sweden & Denmark, 1960+)",
    caution: "French 1981 Capital Flight Stagnation (France, 1981–83)",
    nicheTags: [
      "#socialdemocracy", "#nordicmodel", "#welfarestate", "#centreleft", "#equalopportunity",
      "#universalhealthcare", "#publiceducation", "#progressive", "#socialequity", "#sustainablegrowth"
    ]
  },
  "progressive-liberalism": {
    tagline: "Modern Rights & Equality",
    compass: "Libertarian Left [-25, -55]",
    culture: "Strong cultural progressivism & social justice (-65)",
    civil: "Broad civil liberties & dissent protection (-55)",
    economy: "Mixed economy with anti-monopoly rules (-25)",
    world: "Global multilateral institutions (-50)",
    success: "FDR's New Deal & Civil Rights Acts (USA, 1930s–60s)",
    caution: "San Francisco Housing Scarcity (USA, 2010s)",
    nicheTags: [
      "#progressivism", "#progressiveliberalism", "#civilrights", "#humanrights", "#socialjustice",
      "#climateaction", "#lgbtqrights", "#individualrights", "#equalityforall", "#modernliberalism"
    ]
  },
  "gandhian-sarvodaya": {
    tagline: "Village Self-Rule & Ahimsa",
    compass: "Libertarian Left / Decentralist [-35, -60]",
    culture: "Moral & spiritual upliftment (+15)",
    civil: "Decentralized power, anti-authoritarian (-60)",
    economy: "Cottage industry & trusteeship (-35)",
    world: "Local autonomy with universal brotherhood (-5)",
    success: "Amul Dairy Cooperative & Khadi Movement (India, 1950s+)",
    caution: "Village Handloom Stagnation vs Modern Mills (India, 1960s)",
    nicheTags: [
      "#gandhiansarvodaya", "#sarvodaya", "#swaraj", "#gramswaraj", "#ahimsa", "#nonviolence",
      "#decentralization", "#villageeconomy", "#khadi", "#amul", "#trusteeship", "#moralpolitics"
    ]
  },
  "centrism": {
    tagline: "The Pragmatic Middle Path",
    compass: "Pure Center [0, 0]",
    culture: "Moderate, gradual reform (0)",
    civil: "Balance between privacy and public safety (0)",
    economy: "Mixed market with sensible regulations (0)",
    world: "Pragmatic bilateral trade (-5)",
    success: "1991 Indian Economic Liberalisation (India, 1991)",
    caution: "Pre-Crash Deregulation Overconfidence (Global, 1990s–2007)",
    nicheTags: [
      "#centrism", "#centrist", "#middleground", "#pragmatism", "#moderation", "#balance",
      "#nonpartisan", "#bipartisan", "#evidencebased", "#rationalpolitics", "#realpolitik"
    ]
  },
  "classical-liberalism": {
    tagline: "Free Enterprise & Small State",
    compass: "Libertarian Right [+55, -60]",
    culture: "Individual autonomy & secular choice (-25)",
    civil: "High personal liberty & strict rule of law (-60)",
    economy: "Free market capitalism & low taxes (+55)",
    world: "Open international commerce (+35)",
    success: "West German 'Economic Miracle' (Germany, 1948–60)",
    caution: "Gilded Age Monopolies & Unsafe Workplaces (USA, 1890s)",
    nicheTags: [
      "#classicalliberalism", "#classicalliberal", "#freemarket", "#capitalism", "#smallgovernment",
      "#individualism", "#propertyrights", "#adamsmith", "#johnlocke", "#freetrade", "#ruleoflaw"
    ]
  },
  "libertarianism": {
    tagline: "Maximum Personal Freedom",
    compass: "Libertarian Right [+80, -85]",
    culture: "Socially permissive & live-and-let-live (-40)",
    civil: "Maximum civil freedom & minimal state (-85)",
    economy: "Unregulated laissez-faire capitalism (+80)",
    world: "Non-interventionist open trade (-25)",
    success: "Swiss Direct Democracy & Low-Tax Cantons (Switzerland)",
    caution: "Free Town Project Public Service Collapse (Grafton USA, 2004–14)",
    nicheTags: [
      "#libertarianism", "#libertarian", "#donttreadonme", "#voluntaryism", "#minarchism",
      "#lowtaxes", "#personalresponsibility", "#deregulation", "#freespeech", "#nonaggressionprinciple"
    ]
  },
  "liberal-conservatism": {
    tagline: "Pro-Business with Traditions",
    compass: "Centre-Right [+45, +10]",
    culture: "Respect for heritage & family values (+30)",
    civil: "Orderly rule of law & institutional checks (+10)",
    economy: "Competitive low corporate taxes (+45)",
    world: "Strong sovereign state active in trade (+15)",
    success: "German Social Market 'Soziale Marktwirtschaft' (Germany, 1950s)",
    caution: "2010s Austerity Squeeze on Public Services (UK, 2010–19)",
    nicheTags: [
      "#liberalconservatism", "#centreright", "#probusiness", "#fiscalresponsibility", "#traditionalvalues",
      "#economicfreedom", "#familyvalues", "#ruleoflaw", "#moderateright", "#sozialemarktwirtschaft"
    ]
  },
  "communitarianism": {
    tagline: "Community & Duty First",
    compass: "Communitarian Centre-Left [-25, +25]",
    culture: "Shared moral values & family solidarity (+50)",
    civil: "Civic duties balance individual rights (+25)",
    economy: "Stakeholder economy serving the public good (-25)",
    world: "Local community prioritization (0)",
    success: "Post-War European Christian Democracy (Europe, 1950s–80s)",
    caution: "Moral Vigilantism & Stifling Social Conformity",
    nicheTags: [
      "#communitarianism", "#communityfirst", "#civicduty", "#socialsolidarity", "#commongood",
      "#neighborhoods", "#familyties", "#moralphilosophy", "#publicgood", "#stakeholdercompact"
    ]
  },
  "traditional-conservatism": {
    tagline: "Preserving Cultural Heritage",
    compass: "Authoritarian Right [+30, +45]",
    culture: "Preservation of religious & cultural customs (+70)",
    civil: "Firm public order and authority (+45)",
    economy: "Market economy protecting property (+30)",
    world: "Defense of native heritage (+40)",
    success: "Long-term Institutional Stability (UK/Europe)",
    caution: "Deep Opposition to Democratic Caste/Civil Reforms",
    nicheTags: [
      "#traditionalconservatism", "#edmundburke", "#tradition", "#culturalheritage", "#socialorder",
      "#conservatism", "#moralorder", "#continuity", "#customsandheritage", "#patriotism"
    ]
  },
  "left-wing-nationalism": {
    tagline: "Patriotic Worker Power",
    compass: "Authoritarian Left [-55, +40]",
    culture: "Patriotic domestic culture (+35)",
    civil: "Strong state power (+40)",
    economy: "Nationalized resources & domestic welfare (-55)",
    world: "Anti-imperialist border defense (+60)",
    success: "Post-Independence Public Sector Building (India, 1950s)",
    caution: "Venezuelan Oil Dependency Collapse (Venezuela, 2010s)",
    nicheTags: [
      "#leftwingnationalism", "#patrioticsocialism", "#antiimperialism", "#sovereignty", "#nationalization",
      "#publicsector", "#workerpower", "#domesticindustry", "#selfreliance", "#indigenousrights"
    ]
  },
  "national-conservatism": {
    tagline: "Nation First",
    compass: "Authoritarian Right [+25, +45]",
    culture: "National identity & traditional values (+60)",
    civil: "Firm law enforcement & border security (+45)",
    economy: "Strategic domestic manufacturing & tariffs (+25)",
    world: "Sovereign national independence (+70)",
    success: "Post-War Gaullist Sovereignty (France, 1958–69)",
    caution: "1930s Smoot-Hawley Tariff Trade War (USA, 1930)",
    nicheTags: [
      "#nationalconservatism", "#natcon", "#nationfirst", "#bordersandidentity", "#patriotism",
      "#sovereignty", "#nationalidentity", "#tradition", "#domesticindustry", "#culturefirst"
    ]
  },
  "authoritarian-capitalism": {
    tagline: "Strict Rule + Fast-Track Growth",
    compass: "Authoritarian Right [+55, +75]",
    culture: "Strict work ethic & social stability (+30)",
    civil: "Heavy state restrictions on dissent (+75)",
    economy: "Pro-business fast-track capitalism (+55)",
    world: "Strategic competitive trade (+45)",
    success: "Singapore's Economic Miracle (Singapore, 1965–90)",
    caution: "Pinochet's Violent Crackdowns (Chile, 1973–90)",
    nicheTags: [
      "#authoritariancapitalism", "#statecapitalism", "#lawandorder", "#economicgrowth", "#technocracy",
      "#fastgrowth", "#discipline", "#developmentalstate", "#efficiency", "#strongleadership"
    ]
  },
  "authoritarian-nationalism": {
    tagline: "Total State Supremacy",
    compass: "Authoritarian Far-Right [+15, +95]",
    culture: "Extreme national conformity (+85)",
    civil: "Total state supremacy over the individual (+95)",
    economy: "State-mobilized strategic production (+15)",
    world: "Aggressive border militarization (+95)",
    success: "Rapid Infrastructure & Defense Mobilization",
    caution: "Totalitarian Police States & Disaster of Fascism (1930s Europe)",
    nicheTags: [
      "#authoritariannationalism", "#statism", "#ultranationalism", "#collectivism", "#totalorder",
      "#statepower", "#nationalstrength", "#historylessons", "#politicaltheory", "#ideologydecoded"
    ]
  }
};

// Common viral & reach tags for political Instagram carousels
const generalReachTags = [
  "#politicalcompass", "#politicalmemes", "#politics101", "#politicalphilosophy",
  "#politicalscience", "#infographic", "#carouselpost", "#educationalcontent",
  "#civics", "#currentaffairs", "#learnsomethingnew", "#knowyourrights",
  "#criticalthinking", "#globalpolitics", "#socialstudies", "#democracy",
  "#ideomap", "#politicalquiz", "#quizapp", "#knowyourpolitics", "#personalityquiz"
];

for (const ideo of ideologies) {
  const slug = ideo.slug;
  const folder = path.join(INSTA_DIR, slug);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const meta = promptDb[slug] || {};
  const en = ideo.en || {};

  // 1. Copy Images
  const heroSrc = path.join(ROOT, "screenshots/ideologies", `${slug}.png`);
  const storySrc = path.join(ROOT, "screenshots/story-cards", `${slug}.png`);

  if (fs.existsSync(heroSrc)) {
    fs.copyFileSync(heroSrc, path.join(folder, "result-card.png"));
  }
  if (fs.existsSync(storySrc)) {
    fs.copyFileSync(storySrc, path.join(folder, "story-card.png"));
  }

  // 2. Generate explanation.txt
  const pillarsText = (en.pillars || []).map(p => `• ${p}`).join("\n");
  const explanationContent = `=======================================================
${ideo.emoji} ${en.title || slug.toUpperCase()}
Tagline: "${meta.tagline || en.simpleTitle || ""}"
Compass Position: ${meta.compass || "Coordinates: " + ideo.pos.join(", ")}
=======================================================

📖 WHAT IS IT IN SIMPLE TERMS?
-------------------------------------------------------
${en.layman || meta.layman || en.desc}

🏛️ CORE PILLARS
-------------------------------------------------------
${pillarsText || "• Fundamental balance of social, civil, and economic values."}

⚖️ CULTURE & CIVIL LIBERTIES
-------------------------------------------------------
• Society & Culture: ${meta.culture || "Balanced cultural viewpoint."}
• Civil Liberties:   ${meta.civil || "Balance of personal liberty and public safety."}

💰 ECONOMY & WORLD POLITICS
-------------------------------------------------------
• Economy:        ${meta.economy || "Balanced economic model."}
• World Politics: ${meta.world || "Pragmatic international relations."}

🌍 REAL-WORLD TRACK RECORD
-------------------------------------------------------
🟢 Success Case:
   ${meta.success || (en.good ? `${en.good.name} (${en.good.when}) — ${en.good.text}` : "N/A")}

🔴 Cautionary Case:
   ${meta.caution || (en.bad ? `${en.bad.name} (${en.bad.when}) — ${en.bad.text}` : "N/A")}

-------------------------------------------------------
📲 Take the full 12-question quiz at: https://ideomap.in
Discover where your values place you on the modern political compass!
`;

  fs.writeFileSync(path.join(folder, "explanation.txt"), explanationContent.trim() + "\n", "utf8");

  // 3. Generate hashtags.txt
  const combinedTags = Array.from(new Set([...(meta.nicheTags || []), ...generalReachTags]));
  const hashtagsContent = `### INSTAGRAM REACH HASHTAGS — ${en.title || slug.toUpperCase()}
Generated for maximum reach, discoverability, and algorithm boost on Instagram.

--- [READY-TO-PASTE BLOCK (30 TAGS)] ---
${combinedTags.slice(0, 30).join(" ")}

--- [ALL CATEGORIZED HASHTAGS] ---

# 1. Niche & Ideology Specifics:
${(meta.nicheTags || []).join(" ")}

# 2. Political Compass & Philosophy Community:
#politicalcompass #politicalmemes #politics101 #politicalphilosophy #politicalscience #socialstudies #globalpolitics #democracy

# 3. High-Engagement & Carousel Discovery:
#infographic #carouselpost #educationalcontent #civics #currentaffairs #learnsomethingnew #knowyourrights #criticalthinking

# 4. App & Quiz Discoverability:
#ideomap #politicalquiz #quizapp #knowyourpolitics #personalityquiz #testyourvalues

---
💡 PRO TIP FOR REACH:
1. Paste 5-7 niche tags directly in the post caption.
2. Paste the full 30-tag block as the very first comment right after posting.
`;

  fs.writeFileSync(path.join(folder, "hashtags.txt"), hashtagsContent.trim() + "\n", "utf8");
  console.log(`Populated: insta_data/${slug}/ -> images, explanation.txt, hashtags.txt`);
}

console.log("\nAll 16 ideology folders populated successfully!");
