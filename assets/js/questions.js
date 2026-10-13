/*
 * Quiz content. To change the questions, edit this file only.
 *
 * Four domains, each a Left ↔ Right scale:
 *   econ   → Economy          (Equality ↔ Markets)
 *   social → Society          (Progress ↔ Tradition)
 *   civil  → Civil liberties  (Liberty ↔ Authority)
 *   world  → World politics   (Global ↔ National)
 *
 * Every question belongs to one domain and has its own answer options.
 * scores[i] is the score of option i: negative = left pole, positive = right pole (-2 … +2).
 * Options are listed in the order they appear on screen; the direction is deliberately
 * mixed between questions so people answer on content, not position. Within each domain,
 * half the questions run left → right and half right → left.
 *
 * Two quiz lengths share this list:
 *   Questions 1–12  → the Quick quiz, 3 per domain. Taken on its own, it is a complete,
 *                     balanced sample of all four domains.
 *   Questions 13–24 → the In-depth set, 3 more per domain, asked only by people who choose
 *                     the 24-question quiz (or continue after question 12).
 * Keep both halves balanced (3 per domain each), so a 12-answer result is never skewed.
 *
 * Answers are stored by question position and option index in share links, so reordering
 * questions or options changes the results of links that were already shared.
 */
window.QUIZ = {
  domains: {
    econ: {
      icon: "💰",
      en: { name: "Economy", left: "Equality", right: "Markets" },
      hi: { name: "अर्थव्यवस्था", left: "समानता", right: "बाज़ार" }
    },
    social: {
      icon: "👪",
      en: { name: "Society", left: "Progress", right: "Tradition" },
      hi: { name: "समाज", left: "प्रगति", right: "परंपरा" }
    },
    civil: {
      icon: "🛡️",
      en: { name: "Civil liberties", left: "Liberty", right: "Authority" },
      hi: { name: "नागरिक आज़ादी", left: "स्वतंत्रता", right: "सत्ता" }
    },
    world: {
      icon: "🌍",
      en: { name: "World politics", left: "Global", right: "National" },
      hi: { name: "विश्व राजनीति", left: "वैश्विक", right: "राष्ट्रीय" }
    }
  },

  questions: [
    /* 1 */ {
      domain: "econ",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "A billionaire and a factory worker live in the same country. What should the tax system do?",
        options: [
          "Tax great fortunes very heavily. No one needs to be a billionaire while others are poor.",
          "The rich should pay much higher rates to fund welfare and public services.",
          "Taxes should rise with income, but rates must stay competitive to keep investment.",
          "One low, simple flat tax rate for everyone is fairest.",
          "Keep taxes minimal. People earned their money and should keep it."
        ],
        why: "In the 1970s India's top income-tax rate reached 97.75%, and the USA's was 91% in the 1950s. Today economists like Thomas Piketty argue for wealth taxes, while countries like Estonia use a flat income tax. The debate is fairness versus the incentive to work and invest."
      },
      hi: {
        text: "एक ही देश में एक अरबपति और एक फ़ैक्ट्री मज़दूर रहते हैं। टैक्स व्यवस्था को क्या करना चाहिए?",
        options: [
          "बड़ी दौलत पर बहुत भारी टैक्स लगे। जब दूसरे ग़रीब हों, तब किसी को अरबपति होने की ज़रूरत नहीं।",
          "अमीर कहीं ऊँची दर से टैक्स दें, ताकि कल्याण योजनाओं और सार्वजनिक सेवाओं का ख़र्च चले।",
          "आय के साथ टैक्स बढ़े, लेकिन दरें इतनी ही हों कि निवेश बना रहे।",
          "सबके लिए एक ही कम और आसान दर (फ़्लैट टैक्स) सबसे न्यायपूर्ण है।",
          "टैक्स न्यूनतम हो। लोगों ने अपना पैसा कमाया है, वह उन्हीं के पास रहे।"
        ],
        why: "1970 के दशक में भारत में आयकर की सबसे ऊँची दर 97.75% तक पहुँच गई थी, और 1950 के दशक में अमेरिका में 91% थी। आज थॉमस पिकेटी जैसे अर्थशास्त्री संपत्ति कर की वकालत करते हैं, जबकि एस्टोनिया जैसे देश फ़्लैट इनकम टैक्स अपनाते हैं। बहस न्याय बनाम काम और निवेश के प्रोत्साहन की है।"
      }
    },

    /* 2 */ {
      domain: "social",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "An adult in your family wants to marry someone from a different religion or caste. What do you think?",
        options: [
          "It's their right, and society should actively encourage such marriages to break caste and religious walls.",
          "It's their choice, and the family should accept it.",
          "It's their choice, but they should try hard to win the family's blessing.",
          "The family should have a big say: marriage joins two families, not just two people.",
          "Marriage should stay within one's own community to protect its traditions."
        ],
        why: "Dr B. R. Ambedkar called inter-caste marriage the 'real remedy' for caste. India's Special Marriage Act (1954) allows marriage across religions, yet surveys find only about 5% of Indian marriages are inter-caste. Sociologists see marriage rules as one of the main ways communities preserve their identity."
      },
      hi: {
        text: "आपके परिवार का कोई वयस्क सदस्य किसी दूसरे धर्म या जाति के व्यक्ति से शादी करना चाहता है। आप क्या सोचते हैं?",
        options: [
          "यह उनका अधिकार है, और समाज को जाति-धर्म की दीवारें तोड़ने के लिए ऐसी शादियों को बढ़ावा देना चाहिए।",
          "यह उनकी पसंद है, और परिवार को इसे स्वीकार करना चाहिए।",
          "यह उनकी पसंद है, लेकिन उन्हें परिवार का आशीर्वाद पाने की पूरी कोशिश करनी चाहिए।",
          "परिवार की बड़ी भूमिका होनी चाहिए: शादी दो लोगों का नहीं, दो परिवारों का मेल है।",
          "शादी अपने ही समुदाय में होनी चाहिए, ताकि उसकी परंपराएँ बची रहें।"
        ],
        why: "डॉ. बी. आर. आंबेडकर ने अंतरजातीय विवाह को जाति का 'असली इलाज' कहा था। भारत का विशेष विवाह अधिनियम (1954) अलग-अलग धर्मों के लोगों को शादी की अनुमति देता है, फिर भी सर्वे बताते हैं कि भारत में केवल लगभग 5% शादियाँ अंतरजातीय होती हैं। समाजशास्त्री मानते हैं कि विवाह के नियम समुदायों के लिए अपनी पहचान बचाए रखने का एक मुख्य तरीक़ा हैं।"
      }
    },

    /* 3 */ {
      domain: "civil",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "To fight terrorism and crime, the government wants face-recognition cameras everywhere and access to private messages. Your view?",
        options: [
          "The state should monitor whatever it needs to keep the nation safe.",
          "Fine. If you have nothing to hide, you have nothing to fear.",
          "Acceptable only with strict oversight by an independent body.",
          "Only targeted surveillance of suspects, with a judge's warrant.",
          "Never. Mass surveillance is a bigger danger than crime itself."
        ],
        why: "Edward Snowden's 2013 leaks revealed mass collection of phone records by the US government. China runs one of the world's largest camera networks. In 2017 India's Supreme Court declared privacy a fundamental right (Puttaswamy case). George Orwell's '1984' remains the classic warning about the all-seeing state."
      },
      hi: {
        text: "आतंकवाद और अपराध से लड़ने के लिए सरकार हर जगह चेहरा पहचानने वाले कैमरे लगाना और लोगों के निजी संदेश पढ़ना चाहती है। आपकी राय?",
        options: [
          "देश की सुरक्षा के लिए सरकार जो ज़रूरी समझे, उस पर नज़र रखे।",
          "ठीक है। अगर आपके पास छिपाने को कुछ नहीं, तो डरने की भी कोई बात नहीं।",
          "सिर्फ़ किसी स्वतंत्र संस्था की सख़्त निगरानी में ही स्वीकार्य है।",
          "सिर्फ़ संदिग्धों पर, और वह भी जज के वारंट के साथ।",
          "कभी नहीं। बड़े पैमाने पर निगरानी ख़ुद अपराध से बड़ा ख़तरा है।"
        ],
        why: "2013 में एडवर्ड स्नोडेन के ख़ुलासों से पता चला कि अमेरिकी सरकार बड़े पैमाने पर लोगों के फ़ोन रिकॉर्ड जुटा रही थी। चीन में दुनिया के सबसे बड़े कैमरा नेटवर्क में से एक है। 2017 में भारत के सुप्रीम कोर्ट ने निजता को मौलिक अधिकार घोषित किया (पुट्टस्वामी मामला)। जॉर्ज ऑरवेल का उपन्यास '1984' आज भी सब कुछ देखने वाली सरकार के बारे में सबसे मशहूर चेतावनी है।"
      }
    },

    /* 4 */ {
      domain: "world",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Should your country accept more immigrants and refugees?",
        options: [
          "Yes. Borders are artificial lines; people should be free to live anywhere.",
          "Yes, welcome more, especially refugees fleeing war and persecution.",
          "Some, chosen by skills and the country's needs, with proper checks.",
          "Very few. Jobs and resources should go to our own citizens first.",
          "None. Close the borders to protect our culture and security."
        ],
        why: "More than 120 million people worldwide were forcibly displaced in 2024, according to the UN refugee agency. Canada and Australia choose skilled migrants through points systems, while Japan long kept immigration very low. The debate mixes economics, security and national identity."
      },
      hi: {
        text: "क्या आपके देश को ज़्यादा प्रवासियों और शरणार्थियों को अपनाना चाहिए?",
        options: [
          "हाँ। सीमाएँ बनावटी रेखाएँ हैं; लोगों को कहीं भी रहने की आज़ादी होनी चाहिए।",
          "हाँ, ज़्यादा लोगों का स्वागत हो, ख़ासकर युद्ध और उत्पीड़न से भागे शरणार्थियों का।",
          "कुछ लोगों को, हुनर और देश की ज़रूरत के आधार पर, पूरी जाँच के साथ।",
          "बहुत कम। नौकरियाँ और संसाधन पहले अपने नागरिकों को मिलें।",
          "बिल्कुल नहीं। अपनी संस्कृति और सुरक्षा के लिए सीमाएँ बंद कर दें।"
        ],
        why: "संयुक्त राष्ट्र की शरणार्थी एजेंसी के अनुसार 2024 में दुनिया भर में 12 करोड़ से ज़्यादा लोग जबरन विस्थापित थे। कनाडा और ऑस्ट्रेलिया पॉइंट सिस्टम से हुनरमंद प्रवासियों को चुनते हैं, जबकि जापान ने लंबे समय तक प्रवासन बहुत कम रखा। इस बहस में अर्थव्यवस्था, सुरक्षा और राष्ट्रीय पहचान, तीनों शामिल हैं।"
      }
    },

    /* 5 */ {
      domain: "econ",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Who should own big industries like railways, steel, banks and telecom?",
        options: [
          "Private companies, all of them. The government has no business being in business.",
          "Mostly private, with the government acting only as a referee (regulator).",
          "Decide case by case: keep what works in public hands, sell what keeps failing.",
          "Strategic sectors like railways, energy and defence should stay public; the rest can be private.",
          "The state, all of them. Profits should serve the people, not shareholders."
        ],
        why: "After independence India put the 'commanding heights' of the economy under state control, drawing on Soviet planning and British Fabian socialism. Thatcher's Britain in the 1980s and India after 1991 privatised many firms. China today mixes powerful state companies with private giants."
      },
      hi: {
        text: "रेलवे, स्टील, बैंक और टेलीकॉम जैसे बड़े उद्योगों का मालिक कौन होना चाहिए?",
        options: [
          "सब निजी कंपनियों के हाथ में हों। कारोबार चलाना सरकार का काम नहीं है।",
          "ज़्यादातर निजी हों, और सरकार सिर्फ़ रेफ़री (नियामक) की भूमिका निभाए।",
          "हर मामले को अलग से देखें: जो ठीक चल रहा है वह सरकारी रहे, जो बार-बार डूबता है उसे बेच दें।",
          "रेलवे, ऊर्जा और रक्षा जैसे अहम क्षेत्र सरकारी रहें; बाक़ी निजी हो सकते हैं।",
          "सब सरकार के हाथ में हों। मुनाफ़ा शेयरधारकों के लिए नहीं, जनता के लिए होना चाहिए।"
        ],
        why: "आज़ादी के बाद भारत ने सोवियत योजना और ब्रिटिश फ़ेबियन समाजवाद से प्रेरित होकर अर्थव्यवस्था के 'मुख्य शिखरों' (commanding heights) को सरकारी नियंत्रण में रखा। 1980 के दशक में थैचर के ब्रिटेन ने और 1991 के बाद भारत ने कई कंपनियों का निजीकरण किया। आज का चीन ताक़तवर सरकारी कंपनियों और बड़ी निजी कंपनियों का मिश्रण है।"
      }
    },

    /* 6 */ {
      domain: "social",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "What role should religion play in making a country's laws?",
        options: [
          "None. Religion should be kept completely out of public life and politics.",
          "Laws should be fully secular, while everyone stays free to practise their faith.",
          "The state should treat all religions with equal respect and support.",
          "Laws should reflect the religious and moral values of the majority.",
          "Religious law and religious leaders should guide the state."
        ],
        why: "France follows strict 'laïcité', keeping religion out of public institutions. India's model of secularism means equal respect for all religions (sarva dharma sama bhava). Iran and the Vatican are theocracies. Historians link the separation of church and state to Europe's religious wars and thinkers like John Locke."
      },
      hi: {
        text: "देश के क़ानून बनाने में धर्म की क्या भूमिका होनी चाहिए?",
        options: [
          "कोई नहीं। धर्म को सार्वजनिक जीवन और राजनीति से पूरी तरह दूर रखना चाहिए।",
          "क़ानून पूरी तरह धर्मनिरपेक्ष हों, और हर किसी को अपना धर्म मानने की आज़ादी रहे।",
          "सरकार सभी धर्मों को बराबर सम्मान और सहयोग दे।",
          "क़ानूनों में बहुसंख्यक समाज के धार्मिक और नैतिक मूल्य झलकने चाहिए।",
          "धार्मिक क़ानून और धर्मगुरु राज्य का मार्गदर्शन करें।"
        ],
        why: "फ़्रांस सख़्त 'लाइसिते' (laïcité) मानता है, जिसमें धर्म को सरकारी संस्थाओं से दूर रखा जाता है। भारत में धर्मनिरपेक्षता का अर्थ सभी धर्मों के प्रति समान सम्मान (सर्व धर्म समभाव) है। ईरान और वैटिकन धर्मतंत्र (थियोक्रेसी) हैं। इतिहासकार चर्च और राज्य के अलगाव को यूरोप के धार्मिक युद्धों और जॉन लॉक जैसे विचारकों से जोड़ते हैं।"
      }
    },

    /* 7 */ {
      domain: "civil",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "A film or book deeply offends many people's religious feelings. What should happen?",
        options: [
          "Nothing. Free speech must include the right to offend.",
          "Allow it; those offended can criticise it, protest peacefully or boycott it.",
          "Allow it with an age rating or warning, and ban only direct calls to violence.",
          "The government should be able to ban it to keep the peace.",
          "Ban it and punish its creators. Respect for faith comes first."
        ],
        why: "India was the first country to ban Salman Rushdie's 'The Satanic Verses' (1988). The US First Amendment protects even deeply offensive speech, while India's Article 19(2) allows 'reasonable restrictions' for public order. John Stuart Mill argued that only harm to others justifies limiting speech."
      },
      hi: {
        text: "कोई फ़िल्म या किताब बहुत से लोगों की धार्मिक भावनाओं को गहरी ठेस पहुँचाती है। क्या होना चाहिए?",
        options: [
          "कुछ नहीं। अभिव्यक्ति की आज़ादी में ठेस पहुँचाने का अधिकार भी शामिल है।",
          "इजाज़त हो; जिन्हें बुरा लगा वे आलोचना, शांतिपूर्ण विरोध या बहिष्कार कर सकते हैं।",
          "उम्र-सीमा या चेतावनी के साथ इजाज़त हो, रोक सिर्फ़ हिंसा के सीधे उकसावे पर लगे।",
          "शांति बनाए रखने के लिए सरकार को इस पर रोक लगाने का अधिकार होना चाहिए।",
          "इस पर रोक लगे और इसे बनाने वालों को सज़ा मिले। आस्था का सम्मान सबसे ऊपर है।"
        ],
        why: "भारत सलमान रुश्दी की 'द सैटेनिक वर्सेज़' (1988) पर रोक लगाने वाला पहला देश था। अमेरिका का पहला संशोधन (First Amendment) बेहद आपत्तिजनक बातों को भी सुरक्षा देता है, जबकि भारत का अनुच्छेद 19(2) सार्वजनिक व्यवस्था के लिए 'उचित प्रतिबंधों' की अनुमति देता है। जॉन स्टुअर्ट मिल का तर्क था कि अभिव्यक्ति पर रोक सिर्फ़ दूसरों को नुक़सान से बचाने के लिए ही जायज़ है।"
      }
    },

    /* 8 */ {
      domain: "world",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Should your country buy cheaper goods from abroad or protect its own industries?",
        options: [
          "Become self-sufficient. Depending on foreign countries is dangerous.",
          "Put high tariffs on imports so our own industries can grow.",
          "Trade openly, but protect strategic sectors like defence, chips and food.",
          "Mostly free trade, through global agreements like the WTO.",
          "Free trade everywhere. Tariffs only make everyone poorer."
        ],
        why: "Free-trade theory goes back to Adam Smith and David Ricardo. India's Swadeshi movement and Gandhi's khadi campaign boycotted British cloth to build Indian industry, while East Asia's 'tiger' economies grew rich by exporting. Today the USA, China and India all use tariffs and 'self-reliance' policies in key sectors."
      },
      hi: {
        text: "क्या आपके देश को विदेश से सस्ता सामान ख़रीदना चाहिए या अपने उद्योगों को बचाना चाहिए?",
        options: [
          "आत्मनिर्भर बनें। दूसरे देशों पर निर्भर रहना ख़तरनाक है।",
          "आयात पर ऊँचे टैक्स (टैरिफ़) लगें, ताकि हमारे अपने उद्योग बढ़ें।",
          "खुलकर व्यापार करें, लेकिन रक्षा, चिप और अनाज जैसे अहम क्षेत्रों को बचाकर रखें।",
          "ज़्यादातर मुक्त व्यापार हो, WTO जैसे वैश्विक समझौतों के ज़रिए।",
          "हर जगह मुक्त व्यापार। टैरिफ़ से सब ग़रीब ही होते हैं।"
        ],
        why: "मुक्त व्यापार का सिद्धांत एडम स्मिथ और डेविड रिकार्डो से शुरू होता है। भारत के स्वदेशी आंदोलन और गांधी के खादी अभियान ने भारतीय उद्योग खड़ा करने के लिए ब्रिटिश कपड़े का बहिष्कार किया, जबकि पूर्वी एशिया की 'टाइगर' अर्थव्यवस्थाएँ निर्यात से अमीर बनीं। आज अमेरिका, चीन और भारत, तीनों अहम क्षेत्रों में टैरिफ़ और 'आत्मनिर्भरता' की नीतियाँ अपनाते हैं।"
      }
    },

    /* 9 */ {
      domain: "econ",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Why are some people poor while others are rich?",
        options: [
          "People mostly get what they earn; generous welfare discourages hard work.",
          "Mostly personal choices. Hard work and good decisions usually pay off.",
          "A mix of circumstances and personal choices.",
          "Mostly unequal starting points: caste, class, bad schools and where you are born.",
          "The system itself. Capitalism lets a few profit from the work of many."
        ],
        why: "Sociologists call this the 'attribution of poverty'. People who blame social structures tend to support redistribution; those who stress individual effort favour lower taxes and less welfare. Karl Marx blamed class exploitation, while the Victorian writer Samuel Smiles preached 'self-help'."
      },
      hi: {
        text: "कुछ लोग ग़रीब और कुछ अमीर क्यों होते हैं?",
        options: [
          "लोगों को ज़्यादातर वही मिलता है जो वे कमाते हैं; ज़्यादा सरकारी मदद मेहनत की आदत छुड़ा देती है।",
          "ज़्यादातर अपने फ़ैसलों से। मेहनत और समझदारी का फल आमतौर पर मिलता है।",
          "हालात और अपने फ़ैसलों, दोनों का मिला-जुला असर।",
          "ज़्यादातर असमान शुरुआत से: जाति, वर्ग, ख़राब स्कूल और जन्म की जगह।",
          "ख़ुद व्यवस्था की वजह से। पूँजीवाद में कुछ लोग बहुतों की मेहनत से मुनाफ़ा कमाते हैं।"
        ],
        why: "समाजशास्त्री इसे 'ग़रीबी का कारण-निर्धारण' (attribution of poverty) कहते हैं। जो लोग सामाजिक ढाँचे को ज़िम्मेदार मानते हैं, वे अक्सर संपत्ति के पुनर्वितरण का समर्थन करते हैं; जो व्यक्तिगत मेहनत पर ज़ोर देते हैं, वे कम टैक्स और कम कल्याण योजनाएँ पसंद करते हैं। कार्ल मार्क्स ने वर्ग-शोषण को दोष दिया, जबकि विक्टोरियन लेखक सैमुअल स्माइल्स ने 'सेल्फ़-हेल्प' (आत्म-सहायता) का उपदेश दिया।"
      }
    },

    /* 10 */ {
      domain: "social",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "In a family, how should work at home and outside be divided?",
        options: [
          "The traditional way: the man earns and leads, the woman runs the home.",
          "Men are naturally suited to providing and women to homemaking, though both may work.",
          "Each couple should decide for themselves.",
          "Men and women should share paid work, housework and childcare equally.",
          "Gender roles are made by society, and schools, laws and media should actively dismantle them."
        ],
        why: "In Nordic countries most women work outside the home, while India's share of women in paid work has long been among the world's lowest, though it has risen recently. Sociologists debate how much gender roles come from biology, culture or economics, a debate going back to thinkers like Simone de Beauvoir."
      },
      hi: {
        text: "परिवार में घर और बाहर के काम का बँटवारा कैसे होना चाहिए?",
        options: [
          "पारंपरिक तरीक़े से: पुरुष कमाए और परिवार का मुखिया हो, महिला घर सँभाले।",
          "पुरुष स्वभाव से कमाने के लिए और महिलाएँ घर सँभालने के लिए बेहतर हैं, हालाँकि दोनों काम कर सकते हैं।",
          "हर जोड़ा अपने लिए ख़ुद तय करे।",
          "पुरुष और महिलाएँ नौकरी, घर के काम और बच्चों की देखभाल बराबर बाँटें।",
          "लैंगिक भूमिकाएँ समाज की बनाई हुई हैं, और स्कूल, क़ानून व मीडिया को इन्हें सक्रिय रूप से तोड़ना चाहिए।"
        ],
        why: "नॉर्डिक देशों में ज़्यादातर महिलाएँ घर से बाहर काम करती हैं, जबकि भारत में कामकाजी महिलाओं की भागीदारी लंबे समय तक दुनिया में सबसे कम में से रही है, हालाँकि हाल में यह बढ़ी है। समाजशास्त्रियों में बहस है कि लैंगिक भूमिकाएँ कितनी जीव-विज्ञान से, कितनी संस्कृति से और कितनी अर्थव्यवस्था से आती हैं। यह बहस सिमोन द बोउवार जैसे विचारकों के समय से चल रही है।"
      }
    },

    /* 11 */ {
      domain: "civil",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Which way of running a country is closest to your view?",
        options: [
          "Power should be spread out to local communities; no one should rule over others.",
          "A democracy with strong courts, a free press and firm limits on those in power.",
          "Democracy, but the government needs enough power to act decisively.",
          "A strong leader who doesn't have to worry about courts and opposition would get more done.",
          "One-party rule or a single strong leader is best for unity and development."
        ],
        why: "Political scientists contrast liberal democracy, which limits power, with authoritarian 'developmental states' that promise fast growth. India's Emergency (1975–77) postponed elections and suspended civil liberties. In 1949 Dr Ambedkar warned that hero-worship in politics is 'a sure road to degradation and to eventual dictatorship'."
      },
      hi: {
        text: "देश चलाने का कौन-सा तरीक़ा आपकी सोच के सबसे क़रीब है?",
        options: [
          "सत्ता स्थानीय समुदायों में बँटी हो; किसी को दूसरों पर राज नहीं करना चाहिए।",
          "ऐसा लोकतंत्र जिसमें मज़बूत अदालतें, आज़ाद प्रेस और सत्ता पर पक्की लगाम हो।",
          "लोकतंत्र, लेकिन सरकार के पास तेज़ी से फ़ैसले लेने की पर्याप्त ताक़त हो।",
          "एक मज़बूत नेता, जिसे अदालतों और विपक्ष की चिंता न करनी पड़े, ज़्यादा काम कर पाएगा।",
          "एक-दलीय शासन या एक ताक़तवर नेता ही एकता और विकास के लिए सबसे अच्छा है।"
        ],
        why: "राजनीति विज्ञानी उदार लोकतंत्र, जो सत्ता को सीमित करता है, की तुलना उन सत्तावादी 'विकासवादी राज्यों' से करते हैं जो तेज़ विकास का वादा करते हैं। भारत में आपातकाल (1975–77) के दौरान चुनाव टाले गए और नागरिक अधिकार निलंबित रहे। 1949 में डॉ. आंबेडकर ने चेताया था कि राजनीति में भक्ति या व्यक्ति-पूजा 'पतन और अंततः तानाशाही का पक्का रास्ता' है।"
      }
    },

    /* 12 */ {
      domain: "world",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "A neighbouring country attacks your border posts. How should your country respond?",
        options: [
          "A full military response, and use the moment to settle every border dispute by force.",
          "Strike back hard to show strength and deter future attacks.",
          "A measured, proportionate military response, along with talks.",
          "Diplomacy and sanctions first; force only as a last resort.",
          "Go to the UN and international mediation. War is never the answer."
        ],
        why: "From Kautilya's Arthashastra and Sun Tzu to modern realists, strategists have debated force versus diplomacy. The Cuban Missile Crisis (1962) was defused by negotiation, while the July Crisis of 1914 spiralled into World War I. Deterrence theory says credible strength prevents war."
      },
      hi: {
        text: "एक पड़ोसी देश आपकी सीमा चौकियों पर हमला करता है। आपके देश को क्या जवाब देना चाहिए?",
        options: [
          "पूरी सैन्य ताक़त से जवाब, और इसी मौक़े पर हर सीमा-विवाद बल से सुलझा लें।",
          "कड़ा पलटवार करें, ताकि ताक़त दिखे और आगे हमले न हों।",
          "संतुलित और नपा-तुला सैन्य जवाब, साथ में बातचीत भी।",
          "पहले कूटनीति और प्रतिबंध; बल सिर्फ़ आख़िरी उपाय।",
          "संयुक्त राष्ट्र और अंतरराष्ट्रीय मध्यस्थता का सहारा लें। युद्ध कभी हल नहीं है।"
        ],
        why: "कौटिल्य के अर्थशास्त्र और सुन त्ज़ू से लेकर आधुनिक यथार्थवादियों तक, रणनीतिकार बल बनाम कूटनीति पर बहस करते रहे हैं। क्यूबा मिसाइल संकट (1962) बातचीत से टला, जबकि 1914 का जुलाई संकट बढ़कर पहले विश्व युद्ध में बदल गया। प्रतिरोध (deterrence) का सिद्धांत कहता है कि भरोसेमंद ताक़त युद्ध को रोकती है।"
      }
    },

    /* ---------- In-depth set: questions 13–24 ---------- */

    /* 13 */ {
      domain: "econ",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Workers at a large factory want to form a union and are threatening to strike over wages. What should the law say?",
        options: [
          "Companies should be free to hire and fire as they choose. Strikes that halt production should be restricted.",
          "Make hiring and firing easier, and require a secret ballot and long notice before any strike.",
          "Protect the right to unionise and strike, but require mediation first and keep essential services running.",
          "Strengthen unions and collective bargaining. Workers need as much bargaining power as their employers.",
          "Workers should share in running and owning their workplaces, and the right to strike must never be curbed."
        ],
        why: "In 1982 about 2.5 lakh workers joined the Great Bombay Textile Strike led by Datta Samant; it dragged on for more than a year and many mills never reopened. India's four Labour Codes (2019–20) merged 29 older laws: factories with fewer than 300 workers can now lay off staff without government permission (the limit used to be 100), and workers must give 60 days' notice before a strike. Germany, by contrast, gives workers up to half the seats on the supervisory boards of large companies."
      },
      hi: {
        text: "एक बड़ी फ़ैक्ट्री के मज़दूर यूनियन बनाना चाहते हैं और वेतन को लेकर हड़ताल की चेतावनी दे रहे हैं। क़ानून क्या कहे?",
        options: [
          "कंपनियों को भर्ती और छँटनी की पूरी आज़ादी हो। उत्पादन ठप करने वाली हड़तालों पर रोक लगे।",
          "भर्ती-छँटनी आसान हो, और किसी भी हड़ताल से पहले गुप्त मतदान और लंबा नोटिस ज़रूरी हो।",
          "यूनियन बनाने और हड़ताल का अधिकार रहे, लेकिन पहले मध्यस्थता हो और ज़रूरी सेवाएँ चलती रहें।",
          "यूनियनों और सामूहिक सौदेबाज़ी को मज़बूत करें। मज़दूरों के पास मालिकों जितनी मोल-भाव की ताक़त होनी चाहिए।",
          "मज़दूरों की अपने कारख़ाने को चलाने और उसके मालिकाना हक़ में हिस्सेदारी हो, और हड़ताल का अधिकार कभी न छीना जाए।"
        ],
        why: "1982 में दत्ता सामंत के नेतृत्व में हुई बंबई की ऐतिहासिक कपड़ा मिल हड़ताल में लगभग ढाई लाख मज़दूर शामिल हुए; यह एक साल से ज़्यादा चली और कई मिलें फिर कभी नहीं खुलीं। भारत की चार श्रम संहिताओं (लेबर कोड, 2019–20) ने 29 पुराने क़ानूनों को मिलाया: अब 300 से कम कर्मचारियों वाली फ़ैक्ट्रियाँ सरकारी अनुमति के बिना छँटनी कर सकती हैं (पहले यह सीमा 100 थी), और हड़ताल से 60 दिन पहले नोटिस देना ज़रूरी है। इसके उलट, जर्मनी में बड़ी कंपनियों के सुपरवाइज़री बोर्ड की आधी तक सीटें कर्मचारियों के प्रतिनिधियों को मिलती हैं।"
      }
    },

    /* 14 */ {
      domain: "social",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Should seats in colleges and government jobs be reserved for historically disadvantaged groups?",
        options: [
          "Yes, and expand them: extend reservations to private-sector jobs and lift the 50% cap until every group is fairly represented.",
          "Yes, keep caste-based reservations. Centuries of discrimination still shape who gets ahead.",
          "Keep them, but exclude the better-off families in each group (the 'creamy layer') so help reaches those who need it most.",
          "Shift gradually to reservations based only on family income, not caste or community.",
          "Phase them out. Admissions and jobs should go purely on merit."
        ],
        why: "India's Constitution has reserved seats for Scheduled Castes and Scheduled Tribes since 1950, a policy Dr B. R. Ambedkar championed. In 1990 the government adopted the Mandal Commission's 27% quota for Other Backward Classes, sparking protests across the country; in 1992 the Supreme Court capped reservations at 50% and excluded the OBC 'creamy layer' (Indra Sawhney case). A 10% quota for economically weaker sections followed in 2019. In 2023 the US Supreme Court ended race-conscious college admissions."
      },
      hi: {
        text: "क्या कॉलेजों और सरकारी नौकरियों में ऐतिहासिक रूप से वंचित समूहों के लिए सीटें आरक्षित होनी चाहिए?",
        options: [
          "हाँ, और इन्हें बढ़ाया जाए: निजी क्षेत्र की नौकरियों में भी आरक्षण हो और 50% की सीमा हटे, जब तक हर समूह को उचित प्रतिनिधित्व न मिल जाए।",
          "हाँ, जाति-आधारित आरक्षण बना रहे। सदियों का भेदभाव आज भी तय करता है कि कौन आगे बढ़ता है।",
          "बना रहे, लेकिन हर समूह के संपन्न परिवारों ('क्रीमी लेयर') को बाहर रखा जाए, ताकि मदद सबसे ज़रूरतमंदों तक पहुँचे।",
          "धीरे-धीरे ऐसा आरक्षण हो जो सिर्फ़ परिवार की आय पर आधारित हो, जाति या समुदाय पर नहीं।",
          "इसे चरणबद्ध तरीक़े से ख़त्म किया जाए। दाख़िले और नौकरियाँ सिर्फ़ योग्यता के आधार पर मिलें।"
        ],
        why: "भारत के संविधान में 1950 से ही अनुसूचित जातियों और जनजातियों के लिए आरक्षण है, जिसकी डॉ. बी. आर. आंबेडकर ने पुरज़ोर वकालत की थी। 1990 में सरकार ने मंडल आयोग की सिफ़ारिश पर अन्य पिछड़े वर्गों (OBC) को 27% आरक्षण दिया, जिसके ख़िलाफ़ देश भर में प्रदर्शन हुए; 1992 में सुप्रीम कोर्ट ने आरक्षण की सीमा 50% तय की और OBC की 'क्रीमी लेयर' को बाहर रखा (इंदिरा साहनी मामला)। 2019 में आर्थिक रूप से कमज़ोर वर्गों (EWS) के लिए 10% आरक्षण जोड़ा गया। 2023 में अमेरिका के सुप्रीम कोर्ट ने कॉलेज दाख़िलों में नस्ल को ध्यान में रखने पर रोक लगा दी।"
      }
    },

    /* 15 */ {
      domain: "civil",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Thousands of protesters have blocked a major highway for weeks against a new law. What should the government do?",
        options: [
          "Clear the road by force if needed, and ban protests that disrupt daily life.",
          "Allow protests only at designated sites, and remove blockades quickly.",
          "Talk to the protesters first; if that fails, let the courts order the road cleared.",
          "Let them stay. Some disruption is the price of democracy; just keep emergency routes open.",
          "Peaceful protest is sacred. The state should never break up a non-violent protest, however disruptive."
        ],
        why: "India's Constitution guarantees the right 'to assemble peaceably and without arms' (Article 19), subject to reasonable limits for public order. Gandhi's Salt March (1930) and the US civil rights movement showed how non-violent but disruptive protest can change laws. In 2020 the Supreme Court ruled in the Shaheen Bagh case that public roads cannot be occupied indefinitely, yet the farmers' camps on Delhi's borders lasted more than a year and ended only after Parliament repealed the three farm laws in 2021."
      },
      hi: {
        text: "हज़ारों प्रदर्शनकारी एक नए क़ानून के विरोध में हफ़्तों से एक बड़ा हाईवे जाम किए हुए हैं। सरकार को क्या करना चाहिए?",
        options: [
          "ज़रूरत हो तो बल से रास्ता खाली कराए, और रोज़मर्रा की ज़िंदगी में रुकावट डालने वाले प्रदर्शनों पर रोक लगाए।",
          "प्रदर्शन सिर्फ़ तय जगहों पर हों, और रास्ता रोकने वालों को जल्दी हटाया जाए।",
          "पहले प्रदर्शनकारियों से बात करे; बात न बने तो अदालत के आदेश से रास्ता खुलवाए।",
          "उन्हें रहने दें। थोड़ी असुविधा लोकतंत्र की क़ीमत है; बस आपातकालीन रास्ते खुले रहें।",
          "शांतिपूर्ण विरोध पवित्र है। सरकार किसी अहिंसक प्रदर्शन को कभी न हटाए, चाहे उससे कितनी भी रुकावट हो।"
        ],
        why: "भारत का संविधान 'शांतिपूर्वक और बिना हथियारों के इकट्ठा होने' का अधिकार देता है (अनुच्छेद 19), लेकिन सार्वजनिक व्यवस्था के लिए उचित पाबंदियों के साथ। गांधीजी के नमक सत्याग्रह (1930) और अमेरिका के नागरिक अधिकार आंदोलन ने दिखाया कि अहिंसक लेकिन व्यवस्था को झकझोरने वाला विरोध क़ानून बदल सकता है। 2020 में शाहीन बाग़ मामले में सुप्रीम कोर्ट ने कहा कि सार्वजनिक सड़कों पर अनिश्चित काल तक क़ब्ज़ा नहीं किया जा सकता, फिर भी दिल्ली की सीमाओं पर किसानों का धरना एक साल से ज़्यादा चला और 2021 में संसद के तीनों कृषि क़ानून वापस लेने के बाद ही ख़त्म हुआ।"
      }
    },

    /* 16 */ {
      domain: "world",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Stopping climate change needs every country to cut emissions, but cutting fast could slow a developing economy. What should your country do?",
        options: [
          "Accept strict, binding global limits checked by an international body, even if growth slows.",
          "Make ambitious pledges under treaties like the Paris Agreement, with money and technology from rich countries.",
          "Cut emissions step by step, on a timeline that protects jobs and growth.",
          "Rich countries polluted first, so they must cut first and pay. We should move at our own pace.",
          "Our development comes first. No foreign treaty should limit how we grow."
        ],
        why: "The 1992 UN climate convention recognised 'common but differentiated responsibilities': countries that industrialised first should do more. The Kyoto Protocol (1997) set binding cuts only for rich countries; under the Paris Agreement (2015) every country sets its own targets, and India has pledged net-zero emissions by 2070. The USA has released about a quarter of all the carbon dioxide emitted since 1750, while India's emissions per person are less than half the world average."
      },
      hi: {
        text: "जलवायु परिवर्तन रोकने के लिए हर देश को उत्सर्जन घटाना होगा, लेकिन तेज़ी से घटाने पर किसी विकासशील अर्थव्यवस्था की रफ़्तार धीमी पड़ सकती है। आपके देश को क्या करना चाहिए?",
        options: [
          "किसी अंतरराष्ट्रीय संस्था की निगरानी में सख़्त और बाध्यकारी वैश्विक सीमाएँ माने, चाहे विकास धीमा हो जाए।",
          "पेरिस समझौते जैसी संधियों के तहत बड़े लक्ष्य तय करे, और अमीर देश इसके लिए पैसा और तकनीक दें।",
          "उत्सर्जन क़दम-दर-क़दम घटाए, ऐसी समय-सीमा में जिससे नौकरियाँ और विकास बचे रहें।",
          "प्रदूषण पहले अमीर देशों ने किया, इसलिए पहले वे घटाएँ और ख़र्च उठाएँ। हम अपनी रफ़्तार से चलें।",
          "हमारा विकास सबसे पहले है। कोई विदेशी संधि यह तय न करे कि हम कैसे आगे बढ़ें।"
        ],
        why: "1992 के संयुक्त राष्ट्र जलवायु समझौते ने 'साझा लेकिन अलग-अलग ज़िम्मेदारियों' का सिद्धांत माना: जिन देशों का औद्योगीकरण पहले हुआ, वे ज़्यादा करें। क्योटो प्रोटोकॉल (1997) ने बाध्यकारी कटौती सिर्फ़ अमीर देशों पर लागू की; पेरिस समझौते (2015) में हर देश अपने लक्ष्य ख़ुद तय करता है, और भारत ने 2070 तक नेट-ज़ीरो उत्सर्जन का वादा किया है। 1750 से अब तक दुनिया में छोड़ी गई कुल कार्बन डाइऑक्साइड का लगभग एक-चौथाई अकेले अमेरिका से आया है, जबकि भारत का प्रति व्यक्ति उत्सर्जन विश्व औसत के आधे से भी कम है।"
      }
    },

    /* 17 */ {
      domain: "econ",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Should the government give every citizen a regular cash payment, whether or not they work?",
        options: [
          "Yes. A basic income for everyone, paid for by taxing great wealth, so no one ever has to fear poverty.",
          "Not for everyone, but a strong safety net: food, healthcare and pensions for all who need them.",
          "Targeted help for the poorest, linked to work or training where possible.",
          "Keep welfare small. Handouts breed dependency; jobs and growth are what lift people out of poverty.",
          "Welfare isn't the state's job. Families, communities and charity should care for those in need."
        ],
        why: "Thomas Paine proposed a payment to every citizen as early as 1797, and Milton Friedman later suggested a 'negative income tax' to replace complex welfare schemes. India's Economic Survey 2016–17 discussed a universal basic income, while MGNREGA (2005) guarantees rural households 100 days of paid work a year. Finland paid 2,000 unemployed people €560 a month with no conditions in 2017–18: they reported better wellbeing, but employment rose only slightly."
      },
      hi: {
        text: "क्या सरकार को हर नागरिक को नियमित रूप से नक़द रक़म देनी चाहिए, चाहे वह काम करे या न करे?",
        options: [
          "हाँ। सबके लिए एक बुनियादी आय (बेसिक इनकम), जिसका ख़र्च बड़ी दौलत पर टैक्स से निकले, ताकि किसी को ग़रीबी का डर न रहे।",
          "सबको नहीं, पर एक मज़बूत सुरक्षा कवच हो: हर ज़रूरतमंद के लिए भोजन, इलाज और पेंशन।",
          "सबसे ग़रीब लोगों को लक्षित मदद, जहाँ हो सके काम या प्रशिक्षण से जोड़कर।",
          "कल्याण योजनाएँ सीमित रहें। मुफ़्त की मदद निर्भरता बढ़ाती है; नौकरियाँ और विकास ही लोगों को ग़रीबी से निकालते हैं।",
          "यह सरकार का काम नहीं। ज़रूरतमंदों की देखभाल परिवार, समुदाय और दान-पुण्य करें।"
        ],
        why: "थॉमस पेन ने 1797 में ही हर नागरिक को एक तय रक़म देने का प्रस्ताव रखा था, और बाद में मिल्टन फ़्रीडमैन ने उलझी कल्याण योजनाओं की जगह 'नेगेटिव इनकम टैक्स' का सुझाव दिया। भारत के आर्थिक सर्वेक्षण 2016–17 में यूनिवर्सल बेसिक इनकम पर चर्चा हुई, जबकि मनरेगा (2005) ग्रामीण परिवारों को साल में 100 दिन के मेहनताने वाले काम की गारंटी देता है। फ़िनलैंड ने 2017–18 में 2,000 बेरोज़गारों को बिना किसी शर्त के हर महीने €560 दिए: उनकी ख़ुशहाली बेहतर हुई, लेकिन रोज़गार सिर्फ़ थोड़ा बढ़ा।"
      }
    },

    /* 18 */ {
      domain: "social",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Should marriage, divorce and inheritance follow each religion's personal law, or one civil law for every citizen?",
        options: [
          "Each community should follow its own religious law, as its faith teaches.",
          "Keep religious personal laws, but let each community reform them from within, at its own pace.",
          "Keep personal laws, but courts should strike down any rule that denies equal rights, especially to women.",
          "Bring in a common civil code for everyone, drafted after wide consultation with every community.",
          "One secular, gender-equal family law for all. Religion should play no part in civil law."
        ],
        why: "Article 44 of India's Constitution asks the state to 'endeavour to secure' a Uniform Civil Code, but as a Directive Principle it cannot be enforced in court. Dr Ambedkar backed the idea, while several minority members of the Constituent Assembly saw it as a threat to religious freedom. The Hindu Code Bills (1955–56) reformed Hindu family law, and in 2017 the Supreme Court struck down instant triple talaq. Goa has had a common civil code since Portuguese rule, and Uttarakhand adopted one in 2024."
      },
      hi: {
        text: "शादी, तलाक़ और विरासत के मामले हर धर्म के अपने पर्सनल लॉ से तय हों, या सभी नागरिकों के लिए एक ही सिविल क़ानून हो?",
        options: [
          "हर समुदाय अपने धार्मिक क़ानून का पालन करे, जैसा उसका धर्म सिखाता है।",
          "धार्मिक पर्सनल लॉ बने रहें, लेकिन हर समुदाय अपनी रफ़्तार से भीतर से उनमें सुधार करे।",
          "पर्सनल लॉ रहें, लेकिन बराबरी के अधिकार छीनने वाले किसी भी नियम को, ख़ासकर महिलाओं के मामले में, अदालतें रद्द करें।",
          "सबके लिए एक समान नागरिक संहिता लाई जाए, हर समुदाय से व्यापक सलाह-मशविरे के बाद।",
          "सबके लिए एक धर्मनिरपेक्ष, स्त्री-पुरुष बराबरी वाला पारिवारिक क़ानून। सिविल क़ानून में धर्म की कोई भूमिका न हो।"
        ],
        why: "भारत के संविधान का अनुच्छेद 44 राज्य से कहता है कि वह समान नागरिक संहिता लाने का 'प्रयास' करे, लेकिन नीति-निदेशक तत्व होने के कारण इसे अदालत के ज़रिए लागू नहीं कराया जा सकता। डॉ. आंबेडकर ने इसका समर्थन किया था, जबकि संविधान सभा के कई अल्पसंख्यक सदस्यों ने इसे धार्मिक आज़ादी के लिए ख़तरा माना। हिंदू कोड बिलों (1955–56) ने हिंदू पारिवारिक क़ानून में सुधार किए, और 2017 में सुप्रीम कोर्ट ने तुरंत तीन तलाक़ को रद्द कर दिया। गोवा में पुर्तगाली शासन के समय से एक समान नागरिक संहिता लागू है, और उत्तराखंड ने 2024 में इसे अपनाया।"
      }
    },

    /* 19 */ {
      domain: "civil",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Police say criminals hide behind encrypted chat apps. Should companies be forced to let investigators read or trace messages?",
        options: [
          "Never. Strong encryption protects everyone, and any backdoor will be abused by governments and hackers alike.",
          "No backdoors, but companies should hand over the data they do hold, like account details, when a court orders it.",
          "Only for the gravest crimes, like terrorism or child abuse, with a judge's approval each time.",
          "Yes. Apps must be able to tell the authorities who first sent a message whenever they ask.",
          "Yes. Any app the government cannot read should be banned."
        ],
        why: "In the 1990s 'Crypto Wars' the US government pushed a 'Clipper chip' that would have given it a key to encrypted phones; the plan collapsed after researchers found flaws and the public objected. In 2016 Apple refused a court order to help the FBI unlock a terrorist's iPhone, arguing that a backdoor would endanger every user. India's IT Rules (2021) require large messaging apps to identify the 'first originator' of a message on a court or government order; WhatsApp has challenged this in court, saying it would break end-to-end encryption."
      },
      hi: {
        text: "पुलिस का कहना है कि अपराधी एन्क्रिप्टेड चैट ऐप्स की आड़ में छिप जाते हैं। क्या कंपनियों को मजबूर किया जाए कि जाँच एजेंसियाँ संदेश पढ़ सकें या उनका स्रोत पता कर सकें?",
        options: [
          "कभी नहीं। मज़बूत एन्क्रिप्शन सबकी रक्षा करता है, और कोई भी 'बैकडोर' सरकारों और हैकरों, दोनों के हाथों दुरुपयोग होगा।",
          "बैकडोर नहीं, लेकिन कंपनी के पास जो डेटा है, जैसे खाते की जानकारी, वह अदालत के आदेश पर दे।",
          "सिर्फ़ आतंकवाद या बच्चों के यौन शोषण जैसे सबसे गंभीर अपराधों में, और हर बार जज की मंज़ूरी से।",
          "हाँ। अधिकारी जब भी माँगें, ऐप्स को बताना होगा कि कोई संदेश सबसे पहले किसने भेजा।",
          "हाँ। जो ऐप सरकार न पढ़ सके, उस पर प्रतिबंध लगे।"
        ],
        why: "1990 के दशक के 'क्रिप्टो युद्धों' में अमेरिकी सरकार ने 'क्लिपर चिप' लाने की कोशिश की, जिससे एन्क्रिप्टेड फ़ोनों की एक चाबी उसके पास रहती; शोधकर्ताओं को इसमें ख़ामियाँ मिलीं और जनता के विरोध के बाद योजना छोड़ दी गई। 2016 में ऐपल ने एक आतंकवादी का आईफ़ोन खोलने में FBI की मदद करने के अदालती आदेश को ठुकरा दिया, यह कहकर कि बैकडोर हर उपयोगकर्ता को ख़तरे में डालेगा। भारत के आईटी नियम (2021) बड़े मैसेजिंग ऐप्स से कहते हैं कि अदालत या सरकार के आदेश पर किसी संदेश के 'पहले भेजने वाले' की पहचान बताएँ; व्हाट्सऐप ने इसे अदालत में चुनौती दी है, यह कहते हुए कि इससे एंड-टू-एंड एन्क्रिप्शन टूट जाएगा।"
      }
    },

    /* 20 */ {
      domain: "world",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Great powers are competing for influence around the world. How should your country handle military alliances?",
        options: [
          "Stand alone. Build our own military strength and never depend on another country for defence.",
          "Stay out of every bloc and deal with each power purely on our own interests.",
          "Keep our independence, but build close security partnerships with like-minded countries.",
          "Join formal alliances with friendly countries, accepting shared defence commitments.",
          "Security should be collective: act through the UN and binding alliances, even if it limits our freedom of action."
        ],
        why: "After independence, Jawaharlal Nehru helped found the Non-Aligned Movement (Belgrade, 1961) to keep newly free nations out of the Cold War blocs, though India signed a friendship treaty with the Soviet Union in 1971. NATO's Article 5 treats an attack on one member as an attack on all; it has been invoked only once, after the 9/11 attacks. Switzerland has stayed neutral for over 200 years, while Finland and Sweden gave up long traditions of neutrality to join NATO in 2023–24 after Russia invaded Ukraine."
      },
      hi: {
        text: "दुनिया भर में बड़ी ताक़तें प्रभाव के लिए होड़ कर रही हैं। आपके देश को सैन्य गठबंधनों के बारे में क्या करना चाहिए?",
        options: [
          "अकेले खड़े रहें। अपनी सैन्य ताक़त ख़ुद बनाएँ और रक्षा के लिए कभी किसी दूसरे देश पर निर्भर न रहें।",
          "हर गुट से दूर रहें, और हर ताक़त से सिर्फ़ अपना हित देखकर रिश्ता रखें।",
          "अपनी स्वतंत्रता बनाए रखें, लेकिन समान सोच वाले देशों के साथ क़रीबी सुरक्षा साझेदारी बनाएँ।",
          "मित्र देशों के साथ औपचारिक गठबंधन करें और साझा रक्षा की ज़िम्मेदारियाँ स्वीकार करें।",
          "सुरक्षा सामूहिक होनी चाहिए: संयुक्त राष्ट्र और बाध्यकारी गठबंधनों के ज़रिए क़दम उठाएँ, भले ही इससे हमारी अपनी मर्ज़ी सीमित हो।"
        ],
        why: "आज़ादी के बाद जवाहरलाल नेहरू ने गुटनिरपेक्ष आंदोलन (बेलग्रेड, 1961) की स्थापना में अहम भूमिका निभाई, ताकि नए आज़ाद देश शीत युद्ध के गुटों से दूर रहें, हालाँकि 1971 में भारत ने सोवियत संघ के साथ मैत्री संधि की। नाटो का अनुच्छेद 5 किसी एक सदस्य पर हमले को सभी पर हमला मानता है; इसे अब तक सिर्फ़ एक बार, 9/11 हमलों के बाद, लागू किया गया है। स्विट्ज़रलैंड 200 से ज़्यादा वर्षों से तटस्थ है, जबकि रूस के यूक्रेन पर हमले के बाद फ़िनलैंड और स्वीडन ने अपनी लंबी तटस्थता छोड़कर 2023–24 में नाटो की सदस्यता ली।"
      }
    },

    /* 21 */ {
      domain: "econ",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "A new steel plant will create 20,000 jobs, but it will pollute a nearby river and the air. What should happen?",
        options: [
          "Reject it. Clean air and water come before profit, and polluting industry must be tightly controlled, even at the cost of jobs.",
          "Allow it only with strict pollution limits, independent monitoring and compensation for local people.",
          "Allow it with reasonable limits, and give the company time to clean up.",
          "Approve it quickly. Jobs and growth come first; a richer country can clean up later.",
          "Remove most rules. Competition and new technology will make industry cleaner faster than regulators can."
        ],
        why: "The Bhopal gas leak (1984) killed thousands of people and remains the world's worst industrial disaster. London's Great Smog of 1952 killed an estimated 4,000 people in a few days and led to Britain's Clean Air Act of 1956. Economists debate the 'environmental Kuznets curve', the idea that pollution rises as a country industrialises and falls once it grows richer. In 1996 India's Supreme Court adopted the 'polluter pays' principle, making firms bear the cost of the damage they cause."
      },
      hi: {
        text: "एक नए स्टील प्लांट से 20,000 नौकरियाँ बनेंगी, लेकिन उससे पास की नदी और हवा प्रदूषित होगी। क्या होना चाहिए?",
        options: [
          "इसे मंज़ूरी न दें। साफ़ हवा और पानी मुनाफ़े से पहले हैं, और प्रदूषण फैलाने वाले उद्योगों पर कड़ा नियंत्रण हो, चाहे नौकरियाँ कम हों।",
          "सिर्फ़ सख़्त प्रदूषण सीमाओं, स्वतंत्र निगरानी और स्थानीय लोगों को मुआवज़े की शर्त पर मंज़ूरी दें।",
          "उचित सीमाओं के साथ मंज़ूरी दें, और कंपनी को प्रदूषण घटाने का समय दें।",
          "जल्दी मंज़ूरी दें। नौकरियाँ और विकास पहले; देश अमीर होगा तो सफ़ाई बाद में हो जाएगी।",
          "ज़्यादातर नियम हटा दें। प्रतिस्पर्धा और नई तकनीक उद्योग को नियामकों से कहीं तेज़ी से साफ़ बना देंगी।"
        ],
        why: "भोपाल गैस त्रासदी (1984) में हज़ारों लोग मारे गए और यह आज भी दुनिया की सबसे भीषण औद्योगिक दुर्घटना है। 1952 में लंदन के 'ग्रेट स्मॉग' ने कुछ ही दिनों में अनुमानित 4,000 लोगों की जान ले ली, जिसके बाद ब्रिटेन में 1956 का क्लीन एयर एक्ट बना। अर्थशास्त्री 'पर्यावरणीय कुज़नेट्स कर्व' पर बहस करते हैं, यानी यह विचार कि औद्योगीकरण के साथ प्रदूषण बढ़ता है और देश के अमीर होने पर घटता है। 1996 में भारत के सुप्रीम कोर्ट ने 'प्रदूषक भुगतान करे' (polluter pays) का सिद्धांत अपनाया, यानी नुक़सान की क़ीमत प्रदूषण करने वाली कंपनी चुकाए।"
      }
    },

    /* 22 */ {
      domain: "social",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "A new metro line that would serve millions must pass through a centuries-old heritage site. What should be done?",
        options: [
          "Protect the site completely. History cannot be rebuilt; reroute the line or cancel it.",
          "Reroute the line, even at a much higher cost. Heritage comes first.",
          "Find a middle path: tunnel deep beneath the site with expert safeguards, even if it costs more.",
          "Build it, but record the site carefully and move what can be saved to a museum.",
          "Build it as planned. Cities are for the living; millions of people today matter more than old buildings."
        ],
        why: "In the 1960s Egypt's Abu Simbel temples were cut into blocks and moved uphill to save them from the lake behind the Aswan High Dam, in a UNESCO campaign backed by dozens of countries. In the 1850s and 60s Baron Haussmann tore down much of medieval Paris to build its wide boulevards, admired today but bitterly opposed at the time. Since 2010 India's ancient monuments law has banned new construction within 100 metres of protected monuments, and Delhi Metro's Heritage Line (2017) runs underground past the Red Fort and Jama Masjid."
      },
      hi: {
        text: "लाखों लोगों के काम आने वाली एक नई मेट्रो लाइन को सदियों पुराने एक धरोहर स्थल से होकर गुज़रना है। क्या किया जाए?",
        options: [
          "धरोहर को पूरी तरह बचाएँ। इतिहास दोबारा नहीं बनाया जा सकता; लाइन का रास्ता बदलें या उसे रद्द करें।",
          "लाइन का रास्ता बदलें, चाहे लागत कहीं ज़्यादा हो। धरोहर पहले है।",
          "बीच का रास्ता निकालें: विशेषज्ञों की निगरानी में धरोहर के नीचे गहरी सुरंग बनाएँ, भले ही ख़र्च बढ़े।",
          "लाइन बनाएँ, लेकिन धरोहर का पूरा दस्तावेज़ीकरण करें और जो बचाया जा सके उसे संग्रहालय में रखें।",
          "योजना के मुताबिक़ बनाएँ। शहर जीवित लोगों के लिए हैं; आज के लाखों लोग पुरानी इमारतों से ज़्यादा अहम हैं।"
        ],
        why: "1960 के दशक में मिस्र के अबू सिम्बल मंदिरों को टुकड़ों में काटकर ऊँचाई पर ले जाया गया, ताकि वे असवान बाँध की झील में न डूबें; यूनेस्को के इस अभियान को दर्जनों देशों का साथ मिला। 1850 और 60 के दशकों में बैरन हॉसमान ने चौड़े बुलेवार्ड बनाने के लिए मध्ययुगीन पेरिस का बड़ा हिस्सा गिरवा दिया; आज उनकी तारीफ़ होती है, पर उस समय इसका कड़ा विरोध हुआ था। 2010 से भारत का प्राचीन स्मारक क़ानून संरक्षित स्मारकों के 100 मीटर के भीतर नए निर्माण पर रोक लगाता है, और दिल्ली मेट्रो की हेरिटेज लाइन (2017) लाल क़िले और जामा मस्जिद के पास ज़मीन के नीचे से गुज़रती है।"
      }
    },

    /* 23 */ {
      domain: "civil",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "Should the death penalty be used for the most horrific crimes, such as terrorism or the rape and murder of a child?",
        options: [
          "Yes, and more often, with fast trials and quick executions to deter others.",
          "Yes, for the very worst crimes like terrorism and the murder of children.",
          "Only in the 'rarest of rare' cases, after every legal safeguard and appeal.",
          "No. Life in prison is enough, and courts make mistakes that can never be undone.",
          "Never. No state should have the power to kill; it should be abolished everywhere."
        ],
        why: "In 1764 the Italian thinker Cesare Beccaria wrote one of the first major arguments against capital punishment; today more than two-thirds of the world's countries have abolished it in law or in practice. India's Supreme Court limited it to the 'rarest of rare' cases in Bachan Singh v. State of Punjab (1980), and the four men convicted of the 2012 Delhi gang rape and murder were hanged in 2020. In the USA about 200 people sentenced to death have later been exonerated, and research has not shown that executions deter crime better than long prison terms."
      },
      hi: {
        text: "क्या आतंकवाद या किसी बच्चे के बलात्कार और हत्या जैसे सबसे भयानक अपराधों के लिए मौत की सज़ा दी जानी चाहिए?",
        options: [
          "हाँ, और ज़्यादा मामलों में, तेज़ सुनवाई और जल्द फाँसी के साथ, ताकि दूसरों को सबक़ मिले।",
          "हाँ, आतंकवाद और बच्चों की हत्या जैसे सबसे जघन्य अपराधों के लिए।",
          "सिर्फ़ 'दुर्लभ से दुर्लभतम' मामलों में, हर क़ानूनी सुरक्षा और अपील के बाद।",
          "नहीं। उम्रक़ैद काफ़ी है, और अदालतें ऐसी ग़लतियाँ कर सकती हैं जिन्हें कभी सुधारा न जा सके।",
          "कभी नहीं। किसी भी सरकार को जान लेने का अधिकार नहीं होना चाहिए; इसे हर जगह ख़त्म किया जाए।"
        ],
        why: "1764 में इतालवी विचारक चेज़ारे बेकारिया ने मौत की सज़ा के ख़िलाफ़ सबसे शुरुआती बड़े तर्कों में से एक लिखा; आज दुनिया के दो-तिहाई से ज़्यादा देशों ने इसे क़ानून में या व्यवहार में ख़त्म कर दिया है। भारत के सुप्रीम कोर्ट ने बचन सिंह बनाम पंजाब राज्य (1980) में इसे 'दुर्लभ से दुर्लभतम' मामलों तक सीमित किया, और 2012 के दिल्ली सामूहिक बलात्कार और हत्या के चार दोषियों को 2020 में फाँसी दी गई। अमेरिका में मौत की सज़ा पाए लगभग 200 लोग बाद में निर्दोष साबित हुए हैं, और शोध यह नहीं दिखा पाया है कि फाँसी लंबी जेल से ज़्यादा अपराध रोकती है।"
      }
    },

    /* 24 */ {
      domain: "world",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "A distant country is torn by civil war and famine, and civilians are being massacred. What should your country do?",
        options: [
          "Send large-scale aid and join a UN force to stop the killing, even if it puts our soldiers at risk.",
          "Send generous aid and back UN action, but keep our own troops out.",
          "Send emergency aid through international agencies, within a modest budget.",
          "Only token help. Our money should go to poverty at home first.",
          "Stay out completely. Other countries' troubles are not our responsibility."
        ],
        why: "About 800,000 people were killed in 100 days during the Rwandan genocide of 1994, while the UN cut back its peacekeeping force there. That failure led every UN member to endorse the 'Responsibility to Protect' in 2005: if a state fails to protect its people from mass atrocities, others should act. But the NATO-led intervention in Libya (2011) was followed by years of civil war. Since 1970 the UN target for rich countries has been to give 0.7% of national income as aid; only a handful, such as Norway and Sweden, meet it."
      },
      hi: {
        text: "दूर का एक देश गृहयुद्ध और अकाल से जूझ रहा है, और वहाँ आम नागरिकों का क़त्लेआम हो रहा है। आपके देश को क्या करना चाहिए?",
        options: [
          "बड़े पैमाने पर मदद भेजे और हत्याएँ रोकने के लिए संयुक्त राष्ट्र की सेना में शामिल हो, भले ही हमारे सैनिकों की जान जोखिम में पड़े।",
          "भरपूर मदद भेजे और संयुक्त राष्ट्र की कार्रवाई का समर्थन करे, लेकिन अपने सैनिक न भेजे।",
          "अंतरराष्ट्रीय एजेंसियों के ज़रिए आपात मदद भेजे, सीमित बजट के भीतर।",
          "बस नाम-मात्र की मदद। हमारा पैसा पहले अपने देश की ग़रीबी पर ख़र्च हो।",
          "पूरी तरह दूर रहे। दूसरे देशों की मुसीबतें हमारी ज़िम्मेदारी नहीं।"
        ],
        why: "1994 में रवांडा के नरसंहार में 100 दिनों में लगभग 8 लाख लोग मारे गए, जबकि संयुक्त राष्ट्र ने वहाँ अपनी शांति सेना घटा दी थी। इस नाकामी के बाद 2005 में संयुक्त राष्ट्र के सभी सदस्यों ने 'सुरक्षा की ज़िम्मेदारी' (Responsibility to Protect) का सिद्धांत माना: अगर कोई सरकार अपने लोगों को सामूहिक अत्याचारों से नहीं बचाती, तो दूसरे देश क़दम उठाएँ। लेकिन लीबिया में नाटो के नेतृत्व वाले हस्तक्षेप (2011) के बाद वहाँ सालों तक गृहयुद्ध चला। 1970 से संयुक्त राष्ट्र का लक्ष्य है कि अमीर देश अपनी राष्ट्रीय आय का 0.7% विदेशी सहायता में दें; नॉर्वे और स्वीडन जैसे गिने-चुने देश ही इसे पूरा करते हैं।"
      }
    }
  ]
};
