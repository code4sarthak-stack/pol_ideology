/*
 * Result content: loaded on result.html only, so question pages stay light.
 *
 * Every domain score runs from -100 (left pole) to +100 (right pole).
 *
 * bands[domain] has 5 entries, picked by score:
 *   ≤ -60 · -59…-21 · -20…20 · 21…59 · ≥ 60
 * Each band has a label, a one-line description, and two real examples:
 *   good: that view at its best    bad: a cautionary case of it going wrong
 *
 * ideologies: the overall result is the ideology whose position [econ, social, civil, world]
 * is closest to the user's four scores.
 */
window.QUIZ.overallBands = [
  { max: -60, en: "Far Left", hi: "धुर वामपंथी" },
  { max: -33, en: "Left", hi: "वामपंथी" },
  { max: -11, en: "Centre-Left", hi: "मध्य-वामपंथी" },
  { max: 10, en: "Centre", hi: "मध्यमार्गी" },
  { max: 32, en: "Centre-Right", hi: "मध्य-दक्षिणपंथी" },
  { max: 59, en: "Right", hi: "दक्षिणपंथी" },
  { max: 100, en: "Far Right", hi: "धुर दक्षिणपंथी" }
];

window.QUIZ.bands = {
  econ: [
    {
      en: {
        label: "Socialist",
        desc: "You want the state or workers to own and plan most of the economy, and you see wealth inequality as the core injustice.",
        good: { name: "Kerala's land reforms", when: "India · 1957–1970s", text: "Ended landlordism by giving land to tenant farmers; together with public schools and clinics, they helped Kerala reach India's highest literacy and life expectancy." },
        bad: { name: "India's Licence Raj", when: "India · 1950s–1991", text: "Businesses needed state permits for almost everything. Growth stayed around 3.5% a year for decades, ending in the 1991 foreign-exchange crisis." }
      },
      hi: {
        label: "समाजवादी",
        desc: "आप चाहते हैं कि अर्थव्यवस्था का ज़्यादातर हिस्सा सरकार या मज़दूरों के स्वामित्व और योजना में हो, और आप संपत्ति की असमानता को सबसे बड़ा अन्याय मानते हैं।",
        good: { name: "केरल के भूमि सुधार", when: "भारत · 1957–1970 का दशक", text: "काश्तकार किसानों को ज़मीन देकर ज़मींदारी ख़त्म की; सरकारी स्कूलों और अस्पतालों के साथ मिलकर इन सुधारों ने केरल को भारत में सबसे ऊँची साक्षरता और औसत आयु तक पहुँचाया।" },
        bad: { name: "भारत का लाइसेंस राज", when: "भारत · 1950 का दशक–1991", text: "कारोबार को लगभग हर काम के लिए सरकारी परमिट चाहिए था। दशकों तक विकास दर लगभग 3.5% सालाना पर अटकी रही, और अंत में 1991 का विदेशी मुद्रा संकट आया।" }
      }
    },
    {
      en: {
        label: "Social Democrat",
        desc: "You accept markets but want strong unions, progressive taxes and a generous welfare state to keep them fair.",
        good: { name: "Franklin D. Roosevelt's New Deal", when: "USA · 1933–1939", text: "Social Security, jobs programmes and new bank rules helped pull America out of the Great Depression, and many of them still exist today." },
        bad: { name: "Britain's 'Winter of Discontent'", when: "UK · 1976–1979", text: "Rigid pay controls, loss-making nationalised industries and high inflation led to an IMF bailout in 1976 and waves of mass strikes in 1978–79." }
      },
      hi: {
        label: "सामाजिक लोकतंत्रवादी",
        desc: "आप बाज़ार को स्वीकार करते हैं, लेकिन उसे न्यायपूर्ण बनाए रखने के लिए मज़बूत यूनियन, प्रगतिशील टैक्स और उदार कल्याणकारी राज्य चाहते हैं।",
        good: { name: "फ़्रैंकलिन डी. रूज़वेल्ट की 'न्यू डील'", when: "अमेरिका · 1933–1939", text: "सामाजिक सुरक्षा, रोज़गार योजनाओं और बैंकों के नए नियमों ने अमेरिका को महामंदी से निकालने में मदद की, और इनमें से कई आज भी चल रहे हैं।" },
        bad: { name: "ब्रिटेन का 'विंटर ऑफ़ डिसकंटेंट'", when: "ब्रिटेन · 1976–1979", text: "वेतन पर सख़्त सरकारी नियंत्रण, घाटे में चलते सरकारी उद्योग और ऊँची महँगाई की वजह से 1976 में IMF से कर्ज़ लेना पड़ा, और 1978–79 में बड़े पैमाने पर हड़तालें हुईं।" }
      }
    },
    {
      en: {
        label: "Mixed Economy",
        desc: "You're a pragmatist: markets create wealth, the state fixes their failures, and you judge each policy by its results.",
        good: { name: "Deng Xiaoping's reforms", when: "China · 1978 onwards", text: "Combined markets with state planning ('socialism with Chinese characteristics'); about 800 million people escaped extreme poverty, by World Bank estimates." },
        bad: { name: "Nixon's wage and price controls", when: "USA · 1971–1974", text: "A quick fix that froze prices across the economy caused shortages, and inflation came roaring back once the controls ended." }
      },
      hi: {
        label: "मिश्रित अर्थव्यवस्था समर्थक",
        desc: "आप व्यावहारिक हैं: बाज़ार दौलत पैदा करता है, सरकार उसकी कमियाँ ठीक करती है, और आप हर नीति को उसके नतीजों से परखते हैं।",
        good: { name: "देंग शियाओपिंग के सुधार", when: "चीन · 1978 से", text: "बाज़ार और सरकारी योजना को मिलाया ('चीनी विशेषताओं वाला समाजवाद'); विश्व बैंक के अनुमान से लगभग 80 करोड़ लोग घोर ग़रीबी से बाहर निकले।" },
        bad: { name: "निक्सन का वेतन और मूल्य नियंत्रण", when: "अमेरिका · 1971–1974", text: "पूरी अर्थव्यवस्था में दाम जमा देने के इस शॉर्टकट से चीज़ों की किल्लत हुई, और नियंत्रण हटते ही महँगाई फिर तेज़ी से लौट आई।" }
      }
    },
    {
      en: {
        label: "Market Liberal",
        desc: "You trust competition, private enterprise and open markets to create prosperity, and want only a limited safety net.",
        good: { name: "India's 1991 liberalisation", when: "India · 1991 onwards", text: "P. V. Narasimha Rao and Manmohan Singh dismantled the Licence Raj; growth roughly doubled and India became a major exporter of software and services." },
        bad: { name: "The 2008 financial crisis", when: "USA & Europe · 2007–2009", text: "Years of light-touch financial regulation let banks take huge risks on housing loans. The crash cost millions of jobs and needed massive government bailouts." }
      },
      hi: {
        label: "बाज़ार-उदारवादी",
        desc: "आप समृद्धि के लिए प्रतिस्पर्धा, निजी उद्यम और खुले बाज़ार पर भरोसा करते हैं, और सामाजिक सुरक्षा को सीमित रखना चाहते हैं।",
        good: { name: "भारत का 1991 का उदारीकरण", when: "भारत · 1991 से", text: "पी. वी. नरसिम्हा राव और मनमोहन सिंह ने लाइसेंस राज ख़त्म किया; विकास दर लगभग दोगुनी हुई और भारत सॉफ़्टवेयर व सेवाओं का बड़ा निर्यातक बना।" },
        bad: { name: "2008 का वित्तीय संकट", when: "अमेरिका और यूरोप · 2007–2009", text: "सालों की ढीली वित्तीय निगरानी में बैंकों ने होम लोन पर भारी जोखिम लिए। संकट में लाखों नौकरियाँ गईं और सरकारों को बड़े बेलआउट देने पड़े।" }
      }
    },
    {
      en: {
        label: "Free-Market Capitalist",
        desc: "You want a minimal state in the economy: low taxes, free trade, private property and very little regulation.",
        good: { name: "Hong Kong's free-market era", when: "Hong Kong · 1960s–1990s", text: "Low, simple taxes and free trade turned a crowded port full of refugees into one of the richest places on Earth." },
        bad: { name: "America's Gilded Age", when: "USA · 1870s–1900", text: "Rapid growth and huge fortunes, but also monopolies, child labour, deadly factories and brutal crackdowns on workers." }
      },
      hi: {
        label: "मुक्त-बाज़ार पूँजीवादी",
        desc: "आप अर्थव्यवस्था में सरकार की न्यूनतम भूमिका चाहते हैं: कम टैक्स, मुक्त व्यापार, निजी संपत्ति और बहुत कम नियम।",
        good: { name: "हांगकांग का मुक्त-बाज़ार दौर", when: "हांगकांग · 1960–1990 का दशक", text: "कम और आसान टैक्स और मुक्त व्यापार ने शरणार्थियों से भरे एक बंदरगाह को दुनिया की सबसे अमीर जगहों में से एक बना दिया।" },
        bad: { name: "अमेरिका का 'गिल्डेड एज'", when: "अमेरिका · 1870–1900", text: "तेज़ विकास और अपार दौलत आई, लेकिन साथ में एकाधिकार, बाल मज़दूरी, जानलेवा फ़ैक्ट्रियाँ और मज़दूरों पर बर्बर दमन भी।" }
      }
    }
  ],

  social: [
    {
      en: {
        label: "Radical Progressive",
        desc: "You want to rebuild society from the ground up, ending inherited hierarchies of caste, class, gender and religion.",
        good: { name: "Dr B. R. Ambedkar", when: "India · 1891–1956", text: "Led the fight against untouchability, chaired the committee that drafted India's Constitution, and pushed the Hindu Code Bill for women's rights to property and divorce." },
        bad: { name: "China's Cultural Revolution", when: "China · 1966–1976", text: "A campaign to smash the 'Four Olds' (old customs, culture, habits and ideas) destroyed temples and heritage, persecuted millions and left hundreds of thousands dead." }
      },
      hi: {
        label: "क्रांतिकारी प्रगतिशील",
        desc: "आप समाज को जड़ से नया बनाना चाहते हैं, और जाति, वर्ग, लिंग और धर्म पर आधारित पुराने ऊँच-नीच को ख़त्म करना चाहते हैं।",
        good: { name: "डॉ. बी. आर. आंबेडकर", when: "भारत · 1891–1956", text: "छुआछूत के ख़िलाफ़ लड़ाई की अगुवाई की, भारत का संविधान लिखने वाली प्रारूप समिति के अध्यक्ष रहे, और महिलाओं के संपत्ति व तलाक़ के अधिकारों के लिए हिंदू कोड बिल आगे बढ़ाया।" },
        bad: { name: "चीन की सांस्कृतिक क्रांति", when: "चीन · 1966–1976", text: "'चार पुरानी चीज़ों' (पुराने रीति-रिवाज़, संस्कृति, आदतें और विचार) को मिटाने के अभियान में मंदिर और धरोहरें नष्ट हुईं, दसियों लाख लोग प्रताड़ित हुए और लाखों की जान गई।" }
      }
    },
    {
      en: {
        label: "Progressive",
        desc: "You welcome social change toward equality and personal freedom, and you question customs that hold people back.",
        good: { name: "Savitribai & Jyotirao Phule", when: "India · 1848 onwards", text: "Opened one of India's first schools for girls (Pune, 1848) and fought caste discrimination and the mistreatment of widows." },
        bad: { name: "The eugenics movement", when: "USA, Sweden & others · 1900s–1970s", text: "Many progressive reformers backed it as 'scientific' social improvement. It led to tens of thousands of forced sterilisations." }
      },
      hi: {
        label: "प्रगतिशील",
        desc: "आप बराबरी और व्यक्तिगत आज़ादी की ओर होने वाले सामाजिक बदलाव का स्वागत करते हैं, और उन रिवाज़ों पर सवाल उठाते हैं जो लोगों को पीछे रखते हैं।",
        good: { name: "सावित्रीबाई और ज्योतिराव फुले", when: "भारत · 1848 से", text: "भारत में लड़कियों के शुरुआती स्कूलों में से एक खोला (पुणे, 1848), और जातिगत भेदभाव व विधवाओं के साथ होने वाले अन्याय के ख़िलाफ़ लड़े।" },
        bad: { name: "यूजीनिक्स आंदोलन", when: "अमेरिका, स्वीडन आदि · 1900–1970 का दशक", text: "कई प्रगतिशील सुधारकों ने इसे 'वैज्ञानिक' सामाजिक सुधार मानकर समर्थन दिया। नतीजा दसियों हज़ार लोगों की जबरन नसबंदी के रूप में निकला।" }
      }
    },
    {
      en: {
        label: "Moderate",
        desc: "You value both continuity and change: keep what works, reform what hurts, and avoid extremes.",
        good: { name: "Emperor Ashoka's Dhamma", when: "Maurya Empire · c. 268–232 BCE", text: "After the Kalinga war he promoted tolerance, public welfare and respect for all sects (Rock Edict XII), without forcing one faith on his subjects." },
        bad: { name: "America's compromises over slavery", when: "USA · 1787–1860", text: "Splitting the difference on a moral question, through deals like the 'three-fifths' clause and the Compromise of 1850, delayed a civil war but could not prevent it." }
      },
      hi: {
        label: "संतुलित",
        desc: "आप निरंतरता और बदलाव, दोनों को महत्व देते हैं: जो ठीक है उसे रखें, जो चोट पहुँचाता है उसे सुधारें, और अतियों से बचें।",
        good: { name: "सम्राट अशोक का धम्म", when: "मौर्य साम्राज्य · लगभग 268–232 ईसा पूर्व", text: "कलिंग युद्ध के बाद उन्होंने सहिष्णुता, जन-कल्याण और सभी पंथों के सम्मान (शिलालेख XII) को बढ़ावा दिया, बिना किसी एक धर्म को प्रजा पर थोपे।" },
        bad: { name: "दास-प्रथा पर अमेरिका के समझौते", when: "अमेरिका · 1787–1860", text: "एक नैतिक सवाल पर 'तीन-पाँचवाँ' नियम और 1850 के समझौते जैसे बीच के रास्ते निकाले गए; इनसे गृहयुद्ध कुछ समय टला, लेकिन रुका नहीं।" }
      }
    },
    {
      en: {
        label: "Traditionalist",
        desc: "You see family, faith and inherited customs as the backbone of society, and prefer slow, careful change.",
        good: { name: "Swami Vivekananda", when: "India · 1863–1902", text: "Proudly carried India's spiritual heritage to the world stage (Chicago, 1893) while condemning caste discrimination and blind superstition." },
        bad: { name: "The prosecution of Alan Turing", when: "UK · 1952", text: "The codebreaker who helped win World War II was convicted under traditional morality laws for being gay and was chemically castrated. Britain apologised in 2009." }
      },
      hi: {
        label: "परंपरावादी",
        desc: "आप परिवार, आस्था और विरासत में मिले रीति-रिवाज़ों को समाज की रीढ़ मानते हैं, और धीमा, सोचा-समझा बदलाव पसंद करते हैं।",
        good: { name: "स्वामी विवेकानंद", when: "भारत · 1863–1902", text: "भारत की आध्यात्मिक विरासत को गर्व से दुनिया के मंच (शिकागो, 1893) तक ले गए, और साथ ही जातिगत भेदभाव और अंधविश्वास की निंदा की।" },
        bad: { name: "एलन ट्यूरिंग पर मुक़दमा", when: "ब्रिटेन · 1952", text: "दूसरे विश्व युद्ध में जीत दिलाने में मदद करने वाले इस कोड-ब्रेकर को पारंपरिक नैतिकता क़ानूनों के तहत समलैंगिक होने का दोषी ठहराया गया और उनका रासायनिक बधियाकरण किया गया। ब्रिटेन ने 2009 में माफ़ी माँगी।" }
      }
    },
    {
      en: {
        label: "Strict Traditionalist",
        desc: "You want society to hold firmly to its ancestral religion, customs and social order, and to resist outside influence.",
        good: { name: "Bhutan's culture-first path", when: "Bhutan · 1970s onwards", text: "Protects its traditional culture and environment by law, and measures progress by 'Gross National Happiness' rather than GDP alone." },
        bad: { name: "Taliban rule in Afghanistan", when: "Afghanistan · 1996–2001 & since 2021", text: "Enforces a strict reading of religious law: girls are barred from secondary school and women from most jobs and public life." }
      },
      hi: {
        label: "दृढ़ परंपरावादी",
        desc: "आप चाहते हैं कि समाज अपने पुरखों के धर्म, रीति-रिवाज़ और सामाजिक व्यवस्था को मज़बूती से थामे रहे और बाहरी प्रभावों का विरोध करे।",
        good: { name: "भूटान का संस्कृति-प्रथम रास्ता", when: "भूटान · 1970 के दशक से", text: "क़ानून के ज़रिए अपनी पारंपरिक संस्कृति और पर्यावरण की रक्षा करता है, और तरक्क़ी को सिर्फ़ GDP से नहीं, 'सकल राष्ट्रीय ख़ुशहाली' से मापता है।" },
        bad: { name: "अफ़ग़ानिस्तान में तालिबान का शासन", when: "अफ़ग़ानिस्तान · 1996–2001 और 2021 से", text: "धार्मिक क़ानून की कट्टर व्याख्या लागू करता है: लड़कियों के माध्यमिक स्कूल जाने पर रोक है, और महिलाओं को ज़्यादातर नौकरियों और सार्वजनिक जीवन से बाहर कर दिया गया है।" }
      }
    }
  ],

  civil: [
    {
      en: {
        label: "Anti-State Libertarian",
        desc: "You distrust concentrated power of any kind and believe individuals and communities should govern themselves.",
        good: { name: "Martin Luther King Jr.", when: "USA · 1955–1968", text: "Led mass civil disobedience against segregation laws, arguing that people have a moral duty to disobey unjust laws." },
        bad: { name: "Somalia's stateless years", when: "Somalia · 1991–2012", text: "After the central government collapsed, rival warlords and militias filled the vacuum, and famine and violence followed." }
      },
      hi: {
        label: "राज्य-विरोधी स्वतंत्रतावादी",
        desc: "आप किसी भी तरह की केंद्रित सत्ता पर भरोसा नहीं करते, और मानते हैं कि लोग और समुदाय ख़ुद अपना शासन चलाएँ।",
        good: { name: "मार्टिन लूथर किंग जूनियर", when: "अमेरिका · 1955–1968", text: "नस्लभेदी क़ानूनों के ख़िलाफ़ बड़े पैमाने पर सविनय अवज्ञा की अगुवाई की; उनका कहना था कि अन्यायपूर्ण क़ानून न मानना एक नैतिक ज़िम्मेदारी है।" },
        bad: { name: "सोमालिया के बिना-सरकार वाले साल", when: "सोमालिया · 1991–2012", text: "केंद्रीय सरकार गिरने के बाद प्रतिद्वंद्वी सरदारों और हथियारबंद गुटों ने ख़ाली जगह भर दी, और इसके बाद अकाल और हिंसा फैली।" }
      }
    },
    {
      en: {
        label: "Civil Libertarian",
        desc: "You put free speech, privacy, fair trials and the right to protest first, and want firm limits on state power.",
        good: { name: "Nelson Mandela", when: "South Africa · 1994–1999", text: "After 27 years in prison he chose reconciliation over revenge, and oversaw a 1996 Constitution with one of the world's strongest bills of rights." },
        bad: { name: "The Weimar Republic", when: "Germany · 1919–1933", text: "A very free democracy that could not defend itself: extremists used its liberties to win power, then abolished them." }
      },
      hi: {
        label: "नागरिक स्वतंत्रतावादी",
        desc: "आप अभिव्यक्ति की आज़ादी, निजता, निष्पक्ष सुनवाई और विरोध के अधिकार को सबसे ऊपर रखते हैं, और सरकार की ताक़त पर पक्की सीमाएँ चाहते हैं।",
        good: { name: "नेल्सन मंडेला", when: "दक्षिण अफ़्रीका · 1994–1999", text: "27 साल जेल में रहने के बाद उन्होंने बदले की जगह मेल-मिलाप चुना, और 1996 का ऐसा संविधान बनवाया जिसमें दुनिया के सबसे मज़बूत मौलिक अधिकारों में से कुछ हैं।" },
        bad: { name: "वाइमार गणराज्य", when: "जर्मनी · 1919–1933", text: "एक बहुत आज़ाद लोकतंत्र जो ख़ुद को नहीं बचा पाया: कट्टरपंथियों ने उसी की आज़ादियों का इस्तेमाल करके सत्ता पाई, और फिर उन्हें ख़त्म कर दिया।" }
      }
    },
    {
      en: {
        label: "Balanced",
        desc: "You want both freedom and security, and accept some limits on liberty when there are clear rules and independent checks.",
        good: { name: "Germany's Basic Law", when: "West Germany · 1949 onwards", text: "Learning from Weimar, it guarantees strong rights but lets courts ban parties that aim to destroy democracy, an idea called 'militant democracy'." },
        bad: { name: "The USA PATRIOT Act", when: "USA · 2001 onwards", text: "Rushed through after 9/11 to fight terrorism, it was later used to secretly collect the phone records of millions of ordinary Americans." }
      },
      hi: {
        label: "संतुलित",
        desc: "आप आज़ादी और सुरक्षा, दोनों चाहते हैं, और साफ़ नियमों व स्वतंत्र निगरानी के साथ आज़ादी पर कुछ सीमाएँ स्वीकार करते हैं।",
        good: { name: "जर्मनी का मूल क़ानून (Basic Law)", when: "पश्चिम जर्मनी · 1949 से", text: "वाइमार से सबक़ लेकर इसमें मज़बूत अधिकारों की गारंटी है, लेकिन अदालतें लोकतंत्र को नष्ट करना चाहने वाली पार्टियों पर रोक लगा सकती हैं। इसे 'जुझारू लोकतंत्र' (militant democracy) कहा जाता है।" },
        bad: { name: "अमेरिका का पैट्रियट एक्ट", when: "अमेरिका · 2001 से", text: "9/11 के बाद आतंकवाद से लड़ने के लिए जल्दबाज़ी में पास हुआ यह क़ानून बाद में लाखों आम अमेरिकियों के फ़ोन रिकॉर्ड चुपचाप जुटाने में इस्तेमाल हुआ।" }
      }
    },
    {
      en: {
        label: "Law & Order",
        desc: "You believe a strong state, firm policing and social discipline protect people better than unlimited freedoms.",
        good: { name: "Singapore", when: "Singapore · 1965 onwards", text: "Strict laws, tough anti-corruption agencies and efficient government made it one of the safest and least corrupt countries in the world, though the press and protests are tightly limited." },
        bad: { name: "McCarthyism", when: "USA · 1950–1954", text: "Fear of communism led to loyalty tests, blacklists and public witch-hunts that ruined thousands of careers with little or no evidence." }
      },
      hi: {
        label: "क़ानून-व्यवस्था समर्थक",
        desc: "आप मानते हैं कि मज़बूत सरकार, सख़्त पुलिस और सामाजिक अनुशासन लोगों की रक्षा असीमित आज़ादी से बेहतर करते हैं।",
        good: { name: "सिंगापुर", when: "सिंगापुर · 1965 से", text: "सख़्त क़ानूनों, कड़ी भ्रष्टाचार-विरोधी संस्थाओं और कुशल प्रशासन से यह दुनिया के सबसे सुरक्षित और सबसे कम भ्रष्ट देशों में से एक बना, हालाँकि प्रेस और विरोध-प्रदर्शनों पर कड़ी पाबंदियाँ हैं।" },
        bad: { name: "मैकार्थीवाद", when: "अमेरिका · 1950–1954", text: "कम्युनिज़्म के डर से वफ़ादारी की जाँच, ब्लैकलिस्ट और सार्वजनिक 'विच-हंट' हुए, जिनमें बिना ठोस सबूत के हज़ारों लोगों का करियर बर्बाद हुआ।" }
      }
    },
    {
      en: {
        label: "Authoritarian",
        desc: "You believe a powerful state or leader should have the final say, and that order and unity matter more than individual rights.",
        good: { name: "Augustus and the Pax Romana", when: "Roman Empire · 27 BCE onwards", text: "Took near-absolute power and ended a century of civil wars, beginning about 200 years of relative peace and prosperity across the empire." },
        bad: { name: "North Korea", when: "North Korea · 1948 onwards", text: "Total control of media, travel and speech, a personality cult spanning three generations of one family, and political prison camps." }
      },
      hi: {
        label: "सत्तावादी",
        desc: "आप मानते हैं कि आख़िरी फ़ैसला एक ताक़तवर सरकार या नेता का हो, और व्यवस्था व एकता व्यक्तिगत अधिकारों से ज़्यादा अहम हैं।",
        good: { name: "ऑगस्टस और 'पैक्स रोमाना'", when: "रोमन साम्राज्य · 27 ईसा पूर्व से", text: "लगभग पूर्ण सत्ता हाथ में लेकर उन्होंने एक सदी से चल रहे गृहयुद्ध ख़त्म किए, जिसके बाद साम्राज्य में लगभग 200 साल तक अपेक्षाकृत शांति और समृद्धि रही।" },
        bad: { name: "उत्तर कोरिया", when: "उत्तर कोरिया · 1948 से", text: "मीडिया, यात्रा और बोलने पर पूरा नियंत्रण, एक ही परिवार की तीन पीढ़ियों से चली आ रही व्यक्ति-पूजा, और राजनीतिक क़ैदियों के शिविर।" }
      }
    }
  ],

  world: [
    {
      en: {
        label: "Cosmopolitan",
        desc: "You see yourself as a citizen of the world and want borders, armies and national rivalries to matter far less.",
        good: { name: "The European Union", when: "Europe · 1951 onwards", text: "Former enemies who fought two world wars pooled their sovereignty. Members have never gone to war with each other since, and the EU won the 2012 Nobel Peace Prize." },
        bad: { name: "The League of Nations", when: "Geneva · 1920–1946", text: "A noble plan for world peace with no real power to enforce it. It could not stop Japan in Manchuria, Italy in Ethiopia or the slide into World War II." }
      },
      hi: {
        label: "विश्व-नागरिकतावादी",
        desc: "आप ख़ुद को विश्व का नागरिक मानते हैं, और चाहते हैं कि सीमाएँ, सेनाएँ और राष्ट्रीय होड़ बहुत कम मायने रखें।",
        good: { name: "यूरोपीय संघ", when: "यूरोप · 1951 से", text: "दो विश्व युद्ध लड़ चुके पुराने दुश्मनों ने अपनी संप्रभुता साझा की। तब से सदस्य देश आपस में कभी नहीं लड़े, और 2012 में EU को नोबेल शांति पुरस्कार मिला।" },
        bad: { name: "लीग ऑफ़ नेशंस", when: "जिनेवा · 1920–1946", text: "विश्व शांति की नेक योजना, लेकिन उसे लागू करने की कोई असली ताक़त नहीं थी। यह मंचूरिया में जापान, इथियोपिया में इटली और दूसरे विश्व युद्ध की ओर बढ़ती दुनिया को नहीं रोक सकी।" }
      }
    },
    {
      en: {
        label: "Internationalist",
        desc: "You favour cooperation through alliances, treaties and international bodies, and see global problems as shared problems.",
        good: { name: "The Marshall Plan", when: "USA & Western Europe · 1948–1952", text: "About $13 billion in US aid helped rebuild war-torn Europe, turning former enemies into lasting allies and trading partners." },
        bad: { name: "Appeasement at Munich", when: "Britain & France · 1938", text: "Trusting diplomacy alone, Neville Chamberlain let Hitler take part of Czechoslovakia for 'peace for our time'. War came within a year." }
      },
      hi: {
        label: "अंतरराष्ट्रीयतावादी",
        desc: "आप गठबंधनों, संधियों और अंतरराष्ट्रीय संस्थाओं के ज़रिए सहयोग पसंद करते हैं, और वैश्विक समस्याओं को साझा समस्या मानते हैं।",
        good: { name: "मार्शल प्लान", when: "अमेरिका और पश्चिमी यूरोप · 1948–1952", text: "लगभग 13 अरब डॉलर की अमेरिकी मदद से युद्ध में तबाह यूरोप फिर से खड़ा हुआ, और पुराने दुश्मन स्थायी सहयोगी और व्यापारिक साझेदार बन गए।" },
        bad: { name: "म्यूनिख में तुष्टिकरण", when: "ब्रिटेन और फ़्रांस · 1938", text: "सिर्फ़ कूटनीति पर भरोसा करके नेविल चेम्बरलेन ने 'हमारे समय की शांति' के नाम पर हिटलर को चेकोस्लोवाकिया का हिस्सा लेने दिया। एक साल के भीतर युद्ध छिड़ गया।" }
      }
    },
    {
      en: {
        label: "Pragmatic Realist",
        desc: "You judge foreign policy by national interest, case by case: cooperate where it helps, stand firm where it doesn't.",
        good: { name: "The Non-Aligned Movement", when: "Belgrade · 1961 onwards", text: "Led by Nehru, Tito, Nasser, Sukarno and Nkrumah, newly independent countries refused to join either Cold War bloc and kept their freedom to choose." },
        bad: { name: "Swiss neutrality in World War II", when: "Switzerland · 1939–1945", text: "Neutrality kept Switzerland out of the war, but its banks also handled gold looted by Nazi Germany, and it turned away many Jewish refugees." }
      },
      hi: {
        label: "व्यावहारिक यथार्थवादी",
        desc: "आप विदेश नीति को हर मामले में राष्ट्रीय हित से परखते हैं: जहाँ फ़ायदा हो वहाँ सहयोग, जहाँ न हो वहाँ दृढ़ता।",
        good: { name: "गुटनिरपेक्ष आंदोलन", when: "बेलग्रेड · 1961 से", text: "नेहरू, टीटो, नासिर, सुकर्णो और न्क्रूमा की अगुवाई में नए आज़ाद देशों ने शीत युद्ध के किसी भी गुट में शामिल होने से इनकार किया और अपने फ़ैसले की आज़ादी बनाए रखी।" },
        bad: { name: "दूसरे विश्व युद्ध में स्विट्ज़रलैंड की तटस्थता", when: "स्विट्ज़रलैंड · 1939–1945", text: "तटस्थ रहकर स्विट्ज़रलैंड युद्ध से बचा रहा, लेकिन उसके बैंकों ने नाज़ी जर्मनी का लूटा हुआ सोना भी सँभाला, और उसने कई यहूदी शरणार्थियों को लौटा दिया।" }
      }
    },
    {
      en: {
        label: "Patriot",
        desc: "You put your nation's interests, security and sovereignty first, while still dealing with the world when it pays.",
        good: { name: "Sardar Vallabhbhai Patel", when: "India · 1947–1950", text: "Persuaded, and where needed pressured, over 560 princely states to join India, uniting the country after independence." },
        bad: { name: "The Smoot–Hawley Tariff", when: "USA · 1930", text: "Raised tariffs on over 20,000 imported goods to protect American jobs. Other countries retaliated, world trade shrank sharply and the Great Depression deepened." }
      },
      hi: {
        label: "देशभक्त राष्ट्रवादी",
        desc: "आप अपने देश के हितों, सुरक्षा और संप्रभुता को सबसे पहले रखते हैं, फिर भी फ़ायदा हो तो दुनिया से जुड़ते हैं।",
        good: { name: "सरदार वल्लभभाई पटेल", when: "भारत · 1947–1950", text: "560 से ज़्यादा रियासतों को समझा-बुझाकर, और ज़रूरत पड़ने पर दबाव डालकर, भारत में शामिल कराया और आज़ादी के बाद देश को एक किया।" },
        bad: { name: "स्मूट–हॉली टैरिफ़", when: "अमेरिका · 1930", text: "अमेरिकी नौकरियाँ बचाने के लिए 20,000 से ज़्यादा आयातित चीज़ों पर टैक्स बढ़ाया गया। दूसरे देशों ने जवाबी टैक्स लगाए, विश्व व्यापार तेज़ी से घटा और महामंदी और गहरी हो गई।" }
      }
    },
    {
      en: {
        label: "Hardline Nationalist",
        desc: "You see the nation as your highest loyalty, favour strong borders and military power, and distrust foreign influence.",
        good: { name: "Netaji Subhas Chandra Bose", when: "India · 1897–1945", text: "Rejected compromise with colonial rule and raised the Indian National Army. The INA trials of 1945–46 stirred nationwide anger that hastened independence." },
        bad: { name: "Imperial Japan", when: "Japan · 1931–1945", text: "Ultranationalism and militarism drove invasions of China and Southeast Asia and atrocities like the Nanjing Massacre, and ended in national catastrophe in 1945." }
      },
      hi: {
        label: "उग्र राष्ट्रवादी",
        desc: "आप राष्ट्र को अपनी सबसे बड़ी निष्ठा मानते हैं, मज़बूत सीमाएँ और सैन्य ताक़त चाहते हैं, और विदेशी प्रभाव पर भरोसा नहीं करते।",
        good: { name: "नेताजी सुभाष चंद्र बोस", when: "भारत · 1897–1945", text: "औपनिवेशिक शासन से समझौते को ठुकराया और आज़ाद हिंद फ़ौज खड़ी की। 1945–46 में उस पर चले मुक़दमों से देशभर में ऐसा आक्रोश भड़का कि आज़ादी जल्दी आई।" },
        bad: { name: "शाही जापान", when: "जापान · 1931–1945", text: "उग्र राष्ट्रवाद और सैन्यवाद ने चीन और दक्षिण-पूर्व एशिया पर हमले और नानजिंग नरसंहार जैसे अत्याचार कराए, और 1945 में देश को तबाही तक पहुँचा दिया।" }
      }
    }
  ]
};

window.QUIZ.ideologies = [
  {
    key: "communism", emoji: "🚩", pos: [-95, -30, 80, -30],
    en: {
      title: "Communism (Marxism–Leninism)",
      desc: "You believe capitalism must be replaced by collective ownership, run by a strong revolutionary state on behalf of workers. You put equality and solidarity above markets and individual freedoms.",
      good: { name: "The Soviet Union's modernisation", when: "USSR · 1920s–1960s", text: "Turned a mostly illiterate peasant country into an industrial superpower that bore the heaviest burden in defeating Nazi Germany and sent the first human into space." },
      bad: { name: "Mao's Great Leap Forward", when: "China · 1958–1962", text: "Forced collectivisation and impossible targets caused one of the deadliest famines in history, with tens of millions of deaths." }
    },
    hi: {
      title: "साम्यवाद (मार्क्सवाद–लेनिनवाद)",
      desc: "आप मानते हैं कि पूँजीवाद की जगह सामूहिक स्वामित्व होना चाहिए, जिसे मज़दूरों की ओर से एक मज़बूत क्रांतिकारी राज्य चलाए। आप बराबरी और एकजुटता को बाज़ार और व्यक्तिगत आज़ादी से ऊपर रखते हैं।",
      good: { name: "सोवियत संघ का आधुनिकीकरण", when: "सोवियत संघ · 1920–1960 का दशक", text: "ज़्यादातर अनपढ़ किसानों वाले देश को औद्योगिक महाशक्ति बनाया, जिसने नाज़ी जर्मनी को हराने का सबसे भारी बोझ उठाया और अंतरिक्ष में पहला इंसान भेजा।" },
      bad: { name: "माओ का 'ग्रेट लीप फ़ॉरवर्ड'", when: "चीन · 1958–1962", text: "जबरन सामूहिक खेती और असंभव लक्ष्यों से इतिहास के सबसे घातक अकालों में से एक पड़ा, जिसमें करोड़ों लोगों की जान गई।" }
    }
  },
  {
    key: "libsoc", emoji: "✊", pos: [-85, -75, -90, -70],
    en: {
      title: "Libertarian Socialism",
      desc: "You want a society without bosses or rulers, where workers and communities own and manage things together through voluntary cooperation. Anarchist thinkers like Kropotkin belong to this tradition.",
      good: { name: "The Mondragon cooperatives", when: "Spain · 1956 onwards", text: "A federation of worker-owned cooperatives in the Basque Country where employees elect managers and share profits. It now employs about 70,000 people." },
      bad: { name: "Revolutionary Catalonia", when: "Spain · 1936–1939", text: "Workers collectivised factories and farms during the Spanish Civil War, but the experiment saw violent reprisals against priests and opponents and collapsed within three years." }
    },
    hi: {
      title: "स्वतंत्रतावादी समाजवाद",
      desc: "आप बिना मालिकों या शासकों वाला समाज चाहते हैं, जिसमें मज़दूर और समुदाय स्वैच्छिक सहयोग से मिलकर चीज़ों के मालिक हों और उन्हें चलाएँ। क्रोपोटकिन जैसे अराजकतावादी विचारक इसी परंपरा के हैं।",
      good: { name: "मोंड्रागॉन सहकारी संस्थाएँ", when: "स्पेन · 1956 से", text: "बास्क क्षेत्र में मज़दूरों के स्वामित्व वाली सहकारी संस्थाओं का संघ, जहाँ कर्मचारी ख़ुद प्रबंधक चुनते हैं और मुनाफ़ा बाँटते हैं। आज इसमें लगभग 70,000 लोग काम करते हैं।" },
      bad: { name: "क्रांतिकारी कैटेलोनिया", when: "स्पेन · 1936–1939", text: "स्पेनिश गृहयुद्ध के दौरान मज़दूरों ने कारख़ानों और खेतों को सामूहिक बनाया, लेकिन इस प्रयोग में पादरियों और विरोधियों पर हिंसक बदले की कार्रवाइयाँ हुईं और यह तीन साल में ही ढह गया।" }
    }
  },
  {
    key: "demsoc", emoji: "🌹", pos: [-75, -60, -45, -45],
    en: {
      title: "Democratic Socialism",
      desc: "You want to move beyond capitalism through elections, not revolution: public ownership of key industries, strong unions and universal welfare, together with full democracy.",
      good: { name: "Clement Attlee's government", when: "UK · 1945–1951", text: "Created the National Health Service, free for everyone, and built a welfare state 'from cradle to grave' while rebuilding a bankrupt post-war Britain." },
      bad: { name: "Salvador Allende's Chile", when: "Chile · 1970–1973", text: "Rapid nationalisations and price controls led to severe shortages and triple-digit inflation, deepening a crisis that ended in a military coup." }
    },
    hi: {
      title: "लोकतांत्रिक समाजवाद",
      desc: "आप क्रांति से नहीं, चुनावों के ज़रिए पूँजीवाद से आगे बढ़ना चाहते हैं: अहम उद्योगों पर सार्वजनिक स्वामित्व, मज़बूत यूनियन और सबके लिए कल्याण, पूरे लोकतंत्र के साथ।",
      good: { name: "क्लेमेंट एटली की सरकार", when: "ब्रिटेन · 1945–1951", text: "सबके लिए मुफ़्त राष्ट्रीय स्वास्थ्य सेवा (NHS) बनाई, और युद्ध से कंगाल हुए ब्रिटेन को फिर खड़ा करते हुए 'पालने से क़ब्र तक' कल्याणकारी राज्य की नींव रखी।" },
      bad: { name: "सल्वाडोर अलेंदे का चिली", when: "चिली · 1970–1973", text: "तेज़ी से राष्ट्रीयकरण और दामों पर नियंत्रण से चीज़ों की भारी किल्लत और सैकड़ों प्रतिशत महँगाई हुई, और यह संकट सैन्य तख़्तापलट पर ख़त्म हुआ।" }
    }
  },
  {
    key: "socdem", emoji: "🤝", pos: [-45, -40, -30, -35],
    en: {
      title: "Social Democracy",
      desc: "You support a market economy, balanced by higher taxes on the wealthy, strong workers' rights and universal public services like healthcare and education.",
      good: { name: "Sweden's 'People's Home'", when: "Sweden · 1930s–1970s", text: "Combined competitive export industries with universal welfare, turning a poor country that people emigrated from into one of the world's richest and most equal societies." },
      bad: { name: "Sweden's tax overreach", when: "Sweden · 1970s–1990s", text: "Taxes grew so high that author Astrid Lindgren found her marginal rate was 102%. Slowing growth and a banking crisis in the early 1990s forced major reforms." }
    },
    hi: {
      title: "सामाजिक लोकतंत्र",
      desc: "आप बाज़ार अर्थव्यवस्था का समर्थन करते हैं, लेकिन ऐसी जिसमें अमीरों पर ऊँचे टैक्स, मज़दूरों के मज़बूत अधिकार, और स्वास्थ्य व शिक्षा जैसी सार्वजनिक सेवाएँ सबके लिए हों।",
      good: { name: "स्वीडन का 'जनता का घर'", when: "स्वीडन · 1930–1970 का दशक", text: "प्रतिस्पर्धी निर्यात उद्योगों को सबके लिए कल्याण के साथ जोड़ा, और लोगों के पलायन वाले एक ग़रीब देश को दुनिया के सबसे अमीर और सबसे बराबरी वाले समाजों में से एक बना दिया।" },
      bad: { name: "स्वीडन में टैक्स की अति", when: "स्वीडन · 1970–1990 का दशक", text: "टैक्स इतने बढ़ गए कि लेखिका एस्ट्रिड लिंडग्रेन की सीमांत टैक्स दर 102% निकली। धीमे विकास और 1990 के दशक की शुरुआत के बैंकिंग संकट के बाद बड़े सुधार करने पड़े।" }
    }
  },
  {
    key: "progressive", emoji: "🌱", pos: [-25, -65, -55, -50],
    en: {
      title: "Progressive Liberalism",
      desc: "You champion equal rights, personal freedom and social justice, with a regulated market and a solid safety net. You're open to change and to the wider world.",
      good: { name: "Eleanor Roosevelt", when: "USA & UN · 1946–1948", text: "Chaired the committee that drafted the Universal Declaration of Human Rights, the first global statement of the rights every person shares." },
      bad: { name: "Woodrow Wilson", when: "USA · 1913–1921", text: "A progressive reformer and champion of the League of Nations who also segregated the federal civil service and jailed critics of World War I." }
    },
    hi: {
      title: "प्रगतिशील उदारवाद",
      desc: "आप बराबर अधिकारों, व्यक्तिगत आज़ादी और सामाजिक न्याय के पक्षधर हैं, साथ में नियंत्रित बाज़ार और मज़बूत सामाजिक सुरक्षा चाहते हैं। आप बदलाव और बाक़ी दुनिया के लिए खुले हैं।",
      good: { name: "एलेनोर रूज़वेल्ट", when: "अमेरिका और संयुक्त राष्ट्र · 1946–1948", text: "उस समिति की अध्यक्षता की जिसने मानवाधिकारों की सार्वभौम घोषणा लिखी: हर इंसान के साझा अधिकारों का पहला वैश्विक दस्तावेज़।" },
      bad: { name: "वुडरो विल्सन", when: "अमेरिका · 1913–1921", text: "एक प्रगतिशील सुधारक और लीग ऑफ़ नेशंस के समर्थक, जिन्होंने संघीय सरकारी नौकरियों में नस्लीय अलगाव लागू किया और पहले विश्व युद्ध के आलोचकों को जेल भेजा।" }
    }
  },
  {
    key: "gandhian", emoji: "🕊️", pos: [-35, 15, -60, -5],
    en: {
      title: "Gandhian Sarvodaya",
      desc: "You believe in non-violence, self-reliant village communities, simple living and the welfare of all (sarvodaya). You want power decentralised, and the rich to act as trustees of their wealth.",
      good: { name: "Mahatma Gandhi's freedom struggle", when: "India · 1915–1947", text: "Built the largest non-violent mass movement in history, helped end British rule in India and inspired civil-rights movements around the world." },
      bad: { name: "The Bhoodan movement", when: "India · 1951–1970s", text: "Vinoba Bhave persuaded landowners to pledge over 4 million acres for the landless, but much of it was barren, disputed or never actually handed over." }
    },
    hi: {
      title: "गांधीवादी सर्वोदय",
      desc: "आप अहिंसा, आत्मनिर्भर ग्राम-समुदायों, सादे जीवन और सबके कल्याण (सर्वोदय) में विश्वास करते हैं। आप सत्ता का विकेंद्रीकरण चाहते हैं, और चाहते हैं कि अमीर अपनी दौलत के ट्रस्टी की तरह व्यवहार करें।",
      good: { name: "महात्मा गांधी का स्वतंत्रता संग्राम", when: "भारत · 1915–1947", text: "इतिहास का सबसे बड़ा अहिंसक जन-आंदोलन खड़ा किया, भारत में ब्रिटिश राज ख़त्म करने में मदद की और दुनिया भर के नागरिक अधिकार आंदोलनों को प्रेरित किया।" },
      bad: { name: "भूदान आंदोलन", when: "भारत · 1951–1970 का दशक", text: "विनोबा भावे ने ज़मींदारों से भूमिहीनों के लिए 40 लाख एकड़ से ज़्यादा ज़मीन का दान दिलवाया, लेकिन उसका बड़ा हिस्सा बंजर या विवादित था, या कभी बाँटा ही नहीं गया।" }
    }
  },
  {
    key: "centrist", emoji: "⚖️", pos: [0, 0, 0, -5],
    en: {
      title: "Centrism",
      desc: "You take a balanced, pragmatic view and judge each issue on its merits rather than by ideology. You prefer gradual reform, compromise and solutions that work.",
      good: { name: "Brazil's Plano Real", when: "Brazil · 1994", text: "Led by finance minister (later president) Fernando Henrique Cardoso, a pragmatic plan ended years of hyperinflation that had passed 2,000% a year, and was followed by wider social spending." },
      bad: { name: "Russia's Provisional Government", when: "Russia · 1917", text: "Moderate reformers tried to please everyone, kept fighting an unpopular war and delayed land reform, and were overthrown by the Bolsheviks within eight months." }
    },
    hi: {
      title: "मध्यमार्ग",
      desc: "आप संतुलित और व्यावहारिक नज़रिया रखते हैं, और हर मुद्दे को विचारधारा से नहीं, उसकी ख़ूबियों से परखते हैं। आप धीरे-धीरे सुधार, समझौते और काम करने वाले समाधान पसंद करते हैं।",
      good: { name: "ब्राज़ील का 'प्लानो रियल'", when: "ब्राज़ील · 1994", text: "वित्त मंत्री (बाद में राष्ट्रपति) फ़र्नांडो एनरिक कार्डोसो की व्यावहारिक योजना ने सालों की बेलगाम महँगाई ख़त्म की, जो 2,000% सालाना पार कर चुकी थी, और इसके बाद सामाजिक ख़र्च भी बढ़ा।" },
      bad: { name: "रूस की अस्थायी सरकार", when: "रूस · 1917", text: "उदारवादी सुधारकों ने सबको ख़ुश रखने की कोशिश की, एक अलोकप्रिय युद्ध जारी रखा और भूमि सुधार टालते रहे; आठ महीने के भीतर बोल्शेविकों ने उन्हें उखाड़ फेंका।" }
    }
  },
  {
    key: "classical", emoji: "📜", pos: [55, -25, -60, -35],
    en: {
      title: "Classical Liberalism",
      desc: "You believe in individual liberty, free markets, free trade and the rule of law, with a limited government that protects rights rather than running people's lives.",
      good: { name: "C. Rajagopalachari's Swatantra Party", when: "India · 1959–1974", text: "Rajaji warned early against the 'permit-licence raj' and argued for free enterprise and limited government, ideas India adopted decades later in 1991." },
      bad: { name: "The Great Irish Famine", when: "Ireland · 1845–1852", text: "British officials' faith in non-interference limited relief while food was still being exported. About a million people died and another million emigrated." }
    },
    hi: {
      title: "शास्त्रीय उदारवाद",
      desc: "आप व्यक्तिगत आज़ादी, मुक्त बाज़ार, मुक्त व्यापार और क़ानून के शासन में विश्वास करते हैं, और ऐसी सीमित सरकार चाहते हैं जो लोगों की ज़िंदगी चलाने की बजाय उनके अधिकारों की रक्षा करे।",
      good: { name: "सी. राजगोपालाचारी की स्वतंत्र पार्टी", when: "भारत · 1959–1974", text: "राजाजी ने बहुत पहले 'परमिट-लाइसेंस राज' के ख़िलाफ़ चेताया और मुक्त उद्यम व सीमित सरकार की वकालत की; ये विचार भारत ने दशकों बाद 1991 में अपनाए।" },
      bad: { name: "आयरलैंड का भीषण अकाल", when: "आयरलैंड · 1845–1852", text: "'दख़ल न देने' की नीति पर ब्रिटिश अधिकारियों के भरोसे ने राहत को सीमित रखा, जबकि अनाज का निर्यात जारी रहा। लगभग 10 लाख लोग मरे और 10 लाख और देश छोड़ गए।" }
    }
  },
  {
    key: "libertarian", emoji: "🗽", pos: [80, -40, -85, -25],
    en: {
      title: "Libertarianism",
      desc: "You value freedom above all, in the market and in personal life. You want low taxes, free enterprise and a government that stays out of both your wallet and your private life.",
      good: { name: "Estonia's reforms", when: "Estonia · 1992 onwards", text: "After Soviet rule it chose a flat tax, free trade and a lean digital government. It now ranks among the world's freest economies and gave the world tech firms like Skype and Wise." },
      bad: { name: "Russia's 'shock therapy'", when: "Russia · 1992–1998", text: "Prices and state firms were freed almost overnight without strong laws or institutions. A few oligarchs grabbed vast wealth while the economy shrank by about 40%." }
    },
    hi: {
      title: "स्वतंत्रतावाद (लिबर्टेरियनिज़्म)",
      desc: "आप हर चीज़ से ऊपर आज़ादी को महत्व देते हैं, बाज़ार में भी और निजी जीवन में भी। आप कम टैक्स, मुक्त उद्यम, और ऐसी सरकार चाहते हैं जो न आपकी जेब में दख़ल दे, न आपकी निजी ज़िंदगी में।",
      good: { name: "एस्टोनिया के सुधार", when: "एस्टोनिया · 1992 से", text: "सोवियत शासन के बाद इसने फ़्लैट टैक्स, मुक्त व्यापार और छोटी डिजिटल सरकार चुनी। आज यह दुनिया की सबसे आज़ाद अर्थव्यवस्थाओं में गिना जाता है और इसने स्काइप और वाइज़ जैसी टेक कंपनियाँ दी हैं।" },
      bad: { name: "रूस की 'शॉक थेरेपी'", when: "रूस · 1992–1998", text: "मज़बूत क़ानूनों और संस्थाओं के बिना दाम और सरकारी कंपनियाँ लगभग रातोंरात खोल दी गईं। कुछ धनकुबेरों (ऑलिगार्क) ने अपार दौलत हथिया ली, जबकि अर्थव्यवस्था लगभग 40% सिकुड़ गई।" }
    }
  },
  {
    key: "libcon", emoji: "🏛️", pos: [45, 30, 10, 15],
    en: {
      title: "Liberal Conservatism",
      desc: "You combine free-market economics with respect for tradition, family and established institutions. You favour stability, gradual change and a strong but limited state.",
      good: { name: "Konrad Adenauer", when: "West Germany · 1949–1963", text: "Rebuilt a shattered Germany as a stable democracy, backed the market-driven 'economic miracle' and anchored the country firmly in the West." },
      bad: { name: "Herbert Hoover's response to the Depression", when: "USA · 1929–1933", text: "Waited for the economy to recover with limited federal relief and a balanced budget, while unemployment soared to about 25%." }
    },
    hi: {
      title: "उदार रूढ़िवाद",
      desc: "आप मुक्त-बाज़ार अर्थशास्त्र को परंपरा, परिवार और स्थापित संस्थाओं के सम्मान के साथ जोड़ते हैं। आप स्थिरता, धीरे-धीरे बदलाव और मज़बूत लेकिन सीमित सरकार पसंद करते हैं।",
      good: { name: "कोनराड एडेनावर", when: "पश्चिम जर्मनी · 1949–1963", text: "तबाह जर्मनी को एक स्थिर लोकतंत्र के रूप में फिर खड़ा किया, बाज़ार-आधारित 'आर्थिक चमत्कार' का साथ दिया और देश को मज़बूती से पश्चिमी दुनिया से जोड़ा।" },
      bad: { name: "महामंदी पर हर्बर्ट हूवर की प्रतिक्रिया", when: "अमेरिका · 1929–1933", text: "सीमित सरकारी राहत और संतुलित बजट के भरोसे अर्थव्यवस्था के ख़ुद सँभलने का इंतज़ार किया, जबकि बेरोज़गारी लगभग 25% तक पहुँच गई।" }
    }
  },
  {
    key: "communitarian", emoji: "🏘️", pos: [-25, 50, 25, 0],
    en: {
      title: "Communitarianism",
      desc: "You believe strong families, communities and shared moral values matter as much as individual rights, and that markets should serve the common good through welfare and fair wages. Europe's Christian Democrats belong to this tradition.",
      good: { name: "Europe's post-war Christian Democrats", when: "Western Europe · 1945–1960s", text: "Leaders like Alcide De Gasperi and Robert Schuman blended welfare, family values and markets, rebuilt post-war Europe and founded European integration." },
      bad: { name: "Italy's Christian Democracy party", when: "Italy · 1946–1994", text: "Governed for almost five decades, but its long grip on power bred patronage and corruption, ending in the 'Tangentopoli' bribery scandal." }
    },
    hi: {
      title: "समुदायवाद",
      desc: "आप मानते हैं कि मज़बूत परिवार, समुदाय और साझा नैतिक मूल्य उतने ही अहम हैं जितने व्यक्तिगत अधिकार, और बाज़ार को कल्याण योजनाओं और उचित मज़दूरी के ज़रिए सबकी भलाई करनी चाहिए। यूरोप के ईसाई लोकतंत्रवादी इसी परंपरा के हैं।",
      good: { name: "युद्ध के बाद यूरोप के ईसाई लोकतंत्रवादी", when: "पश्चिमी यूरोप · 1945–1960 का दशक", text: "अल्चीडे दे गास्पेरी और रॉबर्ट शूमन जैसे नेताओं ने कल्याण, पारिवारिक मूल्यों और बाज़ार को मिलाया, युद्ध के बाद यूरोप को फिर खड़ा किया और यूरोपीय एकीकरण की नींव रखी।" },
      bad: { name: "इटली की क्रिश्चियन डेमोक्रेसी पार्टी", when: "इटली · 1946–1994", text: "लगभग पाँच दशक सत्ता में रही, लेकिन सत्ता पर लंबी पकड़ से भाई-भतीजावाद और भ्रष्टाचार पनपा, जिसका अंत 'टैंजेंटोपोली' रिश्वत कांड में हुआ।" }
    }
  },
  {
    key: "conservative", emoji: "🏰", pos: [30, 70, 45, 40],
    en: {
      title: "Traditional Conservatism",
      desc: "You believe in preserving religion, family, cultural heritage and social order. You distrust rapid change and see inherited institutions as the foundation of a good society.",
      good: { name: "Edmund Burke", when: "Britain · 1729–1797", text: "The father of modern conservatism warned that the French Revolution's attempt to tear everything down at once would end in terror, and it did." },
      bad: { name: "Metternich's Europe", when: "Austria & Europe · 1815–1848", text: "Censorship, secret police and the crushing of reform movements kept the old order in place for decades, until it exploded in the revolutions of 1848." }
    },
    hi: {
      title: "पारंपरिक रूढ़िवाद",
      desc: "आप धर्म, परिवार, सांस्कृतिक विरासत और सामाजिक व्यवस्था को बचाए रखने में विश्वास करते हैं। आप तेज़ बदलाव पर भरोसा नहीं करते और विरासत में मिली संस्थाओं को अच्छे समाज की नींव मानते हैं।",
      good: { name: "एडमंड बर्क", when: "ब्रिटेन · 1729–1797", text: "आधुनिक रूढ़िवाद के जनक, जिन्होंने चेताया था कि फ़्रांसीसी क्रांति का सब कुछ एक साथ ढहाने का प्रयास आतंक में ख़त्म होगा, और ऐसा ही हुआ।" },
      bad: { name: "मेटरनिख़ का यूरोप", when: "ऑस्ट्रिया और यूरोप · 1815–1848", text: "सेंसरशिप, ख़ुफ़िया पुलिस और सुधार आंदोलनों के दमन से पुरानी व्यवस्था दशकों तक टिकी रही, जब तक 1848 की क्रांतियों में फट नहीं पड़ी।" }
    }
  },
  {
    key: "leftnat", emoji: "📣", pos: [-55, 35, 40, 60],
    en: {
      title: "Left-Wing Nationalism",
      desc: "You want a strong state that protects ordinary people from big business and foreign powers, combining welfare and state-led growth with national pride and unity.",
      good: { name: "Gamal Abdel Nasser", when: "Egypt · 1954–1970", text: "Broke up big landed estates, nationalised the Suez Canal from foreign control and expanded free education, becoming a hero across the post-colonial world." },
      bad: { name: "Juan Perón's Argentina", when: "Argentina · 1946–1955", text: "Won workers real gains, but built a personality cult, muzzled the press and set off cycles of inflation and debt that have troubled Argentina ever since." }
    },
    hi: {
      title: "वामपंथी राष्ट्रवाद",
      desc: "आप एक मज़बूत सरकार चाहते हैं जो आम लोगों को बड़ी कंपनियों और विदेशी ताक़तों से बचाए, और कल्याण व सरकार के नेतृत्व वाले विकास को राष्ट्रीय गौरव और एकता के साथ जोड़े।",
      good: { name: "जमाल अब्दुल नासिर", when: "मिस्र · 1954–1970", text: "बड़ी जागीरें तोड़ीं, स्वेज़ नहर को विदेशी नियंत्रण से छुड़ाकर राष्ट्रीयकृत किया और मुफ़्त शिक्षा बढ़ाई; वे उपनिवेशवाद से आज़ाद हुई पूरी दुनिया के नायक बने।" },
      bad: { name: "ख़ुआन पेरोन का अर्जेंटीना", when: "अर्जेंटीना · 1946–1955", text: "मज़दूरों को असली फ़ायदे दिलाए, लेकिन व्यक्ति-पूजा खड़ी की, प्रेस का मुँह बंद किया और महँगाई व कर्ज़ के ऐसे चक्र शुरू किए जो आज तक अर्जेंटीना को परेशान करते हैं।" }
    }
  },
  {
    key: "natcon", emoji: "🦅", pos: [25, 60, 45, 70],
    en: {
      title: "National Conservatism",
      desc: "You put the nation first: strong borders, national sovereignty, traditional culture and firm government, with a market economy that serves the national interest.",
      good: { name: "Charles de Gaulle", when: "France · 1958–1969", text: "Ended a chaotic political era with the stable Fifth Republic, granted Algeria independence and kept France's foreign policy independent of both superpowers." },
      bad: { name: "Slobodan Milošević's Serbia", when: "Yugoslavia · 1989–2000", text: "Stirred up ethnic nationalism to hold power, fuelling the wars and ethnic cleansing of Yugoslavia's break-up. He died while on trial for war crimes." }
    },
    hi: {
      title: "राष्ट्रीय रूढ़िवाद",
      desc: "आप राष्ट्र को सबसे पहले रखते हैं: मज़बूत सीमाएँ, राष्ट्रीय संप्रभुता, पारंपरिक संस्कृति और सख़्त सरकार, और ऐसी बाज़ार अर्थव्यवस्था जो राष्ट्रीय हित में काम करे।",
      good: { name: "शार्ल द गॉल", when: "फ़्रांस · 1958–1969", text: "अस्थिर राजनीति के दौर को स्थिर पाँचवें गणराज्य से ख़त्म किया, अल्जीरिया को आज़ादी दी, और फ़्रांस की विदेश नीति को दोनों महाशक्तियों से स्वतंत्र रखा।" },
      bad: { name: "स्लोबोदान मिलोसेविच का सर्बिया", when: "यूगोस्लाविया · 1989–2000", text: "सत्ता में बने रहने के लिए जातीय राष्ट्रवाद भड़काया, जिससे यूगोस्लाविया के टूटने के दौरान युद्ध और जातीय सफ़ाया हुआ। युद्ध अपराधों के मुक़दमे के दौरान ही उनकी मौत हो गई।" }
    }
  },
  {
    key: "authcap", emoji: "🏗️", pos: [55, 30, 75, 45],
    en: {
      title: "Authoritarian Capitalism",
      desc: "You believe a strong, disciplined government should drive rapid economic growth through business and markets, even if that means limits on dissent and democracy.",
      good: { name: "South Korea under Park Chung-hee", when: "South Korea · 1961–1979", text: "State-guided exports turned one of the world's poorest countries into an industrial power (the 'Miracle on the Han River'), though under military-backed rule." },
      bad: { name: "Augusto Pinochet's Chile", when: "Chile · 1973–1990", text: "Free-market reforms came with a brutal dictatorship: over 3,000 people were killed or 'disappeared' and tens of thousands were tortured." }
    },
    hi: {
      title: "सत्तावादी पूँजीवाद",
      desc: "आप मानते हैं कि एक मज़बूत, अनुशासित सरकार को कारोबार और बाज़ार के ज़रिए तेज़ आर्थिक विकास कराना चाहिए, भले ही इसके लिए असहमति और लोकतंत्र पर कुछ पाबंदियाँ लगें।",
      good: { name: "पार्क चुंग-ही का दक्षिण कोरिया", when: "दक्षिण कोरिया · 1961–1979", text: "सरकार के निर्देशन में निर्यात ने दुनिया के सबसे ग़रीब देशों में से एक को औद्योगिक ताक़त ('हान नदी का चमत्कार') बना दिया, हालाँकि सेना-समर्थित शासन के तहत।" },
      bad: { name: "ऑगस्टो पिनोशे का चिली", when: "चिली · 1973–1990", text: "मुक्त-बाज़ार सुधारों के साथ एक क्रूर तानाशाही भी आई: 3,000 से ज़्यादा लोग मारे गए या 'ग़ायब' कर दिए गए, और दसियों हज़ार लोगों को यातनाएँ दी गईं।" }
    }
  },
  {
    key: "authnat", emoji: "⚔️", pos: [15, 85, 95, 95],
    en: {
      title: "Authoritarian Nationalism",
      desc: "You want a powerful state that puts national unity, order and tradition above individual rights and international cooperation. In its most extreme 20th-century form, this became fascism.",
      good: { name: "Otto von Bismarck", when: "Germany · 1862–1890", text: "Unified Germany through 'blood and iron' and created the world's first state pensions and health insurance, while crushing socialists and Catholic opposition." },
      bad: { name: "Fascist Italy and Nazi Germany", when: "Europe · 1922–1945", text: "Total state power, persecution of minorities and aggressive expansion led to the Holocaust and World War II, the deadliest conflict in history." }
    },
    hi: {
      title: "सत्तावादी राष्ट्रवाद",
      desc: "आप एक ताक़तवर राज्य चाहते हैं जो राष्ट्रीय एकता, व्यवस्था और परंपरा को व्यक्तिगत अधिकारों और अंतरराष्ट्रीय सहयोग से ऊपर रखे। 20वीं सदी में इसका सबसे उग्र रूप फ़ासीवाद बना।",
      good: { name: "ओटो फ़ॉन बिस्मार्क", when: "जर्मनी · 1862–1890", text: "'ख़ून और लोहे' से जर्मनी को एक किया और दुनिया की पहली सरकारी पेंशन और स्वास्थ्य बीमा व्यवस्था बनाई, लेकिन साथ ही समाजवादियों और कैथोलिक विरोध को कुचला।" },
      bad: { name: "फ़ासीवादी इटली और नाज़ी जर्मनी", when: "यूरोप · 1922–1945", text: "सरकार की असीमित ताक़त, अल्पसंख्यकों के उत्पीड़न और आक्रामक विस्तार का नतीजा होलोकॉस्ट और दूसरा विश्व युद्ध था, जो इतिहास का सबसे घातक युद्ध है।" }
    }
  }
];
