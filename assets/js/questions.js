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
 * mixed between questions so people answer on content, not position.
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
        text: "Who should pay for people's healthcare?",
        options: [
          "The state should run free hospitals for everyone and phase out private healthcare.",
          "Free public healthcare for all, paid by taxes, with private hospitals as an extra option.",
          "The government should cover the poor; everyone else buys their own insurance.",
          "Mostly private insurance, with tax breaks to make it affordable.",
          "Health is a personal responsibility; markets and charity should handle it."
        ],
        why: "Britain's NHS (1948) made care free for everyone at the point of use, Cuba runs a fully state-owned system, and the USA relies mostly on private insurance. India mixes public hospitals with insurance schemes like Ayushman Bharat. Each model trades off cost, quality and access."
      },
      hi: {
        text: "लोगों के इलाज का ख़र्च किसे उठाना चाहिए?",
        options: [
          "सरकार सबके लिए मुफ़्त अस्पताल चलाए और निजी स्वास्थ्य सेवा धीरे-धीरे ख़त्म हो।",
          "टैक्स से सबके लिए मुफ़्त सरकारी इलाज हो, और निजी अस्पताल एक अतिरिक्त विकल्प रहें।",
          "सरकार ग़रीबों का ख़र्च उठाए; बाक़ी लोग अपना बीमा ख़ुद लें।",
          "ज़्यादातर निजी बीमा हो, जिसे सस्ता बनाने के लिए टैक्स में छूट मिले।",
          "सेहत हर व्यक्ति की अपनी ज़िम्मेदारी है; इसे बाज़ार और दान-संस्थाएँ सँभालें।"
        ],
        why: "ब्रिटेन की NHS (1948) ने सबके लिए मुफ़्त इलाज शुरू किया, क्यूबा में पूरी व्यवस्था सरकारी है, और अमेरिका ज़्यादातर निजी बीमा पर चलता है। भारत में सरकारी अस्पतालों के साथ आयुष्मान भारत जैसी बीमा योजनाएँ हैं। हर मॉडल में ख़र्च, गुणवत्ता और पहुँच के बीच संतुलन बनाना पड़ता है।"
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
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Should international bodies like the UN and international courts be able to overrule national governments?",
        options: [
          "Yes. Humanity needs a strong world government to solve global problems.",
          "Yes, on human rights, climate and war crimes.",
          "Only where our country has freely signed the treaty.",
          "Rarely. National sovereignty matters more than global rules.",
          "Never. No foreign body should tell our nation what to do."
        ],
        why: "After two world wars, the United Nations (1945) and later the International Criminal Court (2002) tried to place rules above states. Realists like Hans Morgenthau argue that states always act in their own interest, while liberal thinkers from Immanuel Kant to Woodrow Wilson hoped law could bring 'perpetual peace'."
      },
      hi: {
        text: "क्या संयुक्त राष्ट्र और अंतरराष्ट्रीय अदालतों जैसी संस्थाओं को राष्ट्रीय सरकारों के फ़ैसले पलटने का अधिकार होना चाहिए?",
        options: [
          "हाँ। वैश्विक समस्याएँ सुलझाने के लिए मानवता को एक मज़बूत विश्व सरकार चाहिए।",
          "हाँ, मानवाधिकार, जलवायु और युद्ध अपराधों के मामलों में।",
          "सिर्फ़ उन मामलों में जिनकी संधि पर हमारे देश ने अपनी मर्ज़ी से हस्ताक्षर किए हों।",
          "शायद ही कभी। राष्ट्रीय संप्रभुता वैश्विक नियमों से ज़्यादा अहम है।",
          "कभी नहीं। कोई विदेशी संस्था हमारे देश को नहीं बता सकती कि क्या करना है।"
        ],
        why: "दो विश्व युद्धों के बाद संयुक्त राष्ट्र (1945) और बाद में अंतरराष्ट्रीय आपराधिक न्यायालय (2002) ने देशों के ऊपर नियम रखने की कोशिश की। हैंस मॉर्गेन्थाउ जैसे यथार्थवादी मानते हैं कि देश हमेशा अपने हित में काम करते हैं, जबकि इमैनुएल कांट से वुडरो विल्सन तक के उदारवादी विचारकों को उम्मीद थी कि क़ानून 'स्थायी शांति' ला सकता है।"
      }
    },

    /* 13 */ {
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

    /* 14 */ {
      domain: "social",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "What should the law say about same-sex couples?",
        options: [
          "Full equality: marriage, adoption, and inclusion in school education.",
          "They should be able to marry, just like anyone else.",
          "Civil unions with legal rights, but not 'marriage'.",
          "Tolerate them privately, but the law should not recognise such relationships.",
          "Such relationships go against our culture and should not be accepted."
        ],
        why: "India decriminalised same-sex relations in 2018 (Navtej Singh Johar case), but in 2023 the Supreme Court left the question of marriage to Parliament. More than 30 countries now allow same-sex marriage, while around 60 still criminalise same-sex relations."
      },
      hi: {
        text: "समलैंगिक जोड़ों के बारे में क़ानून क्या होना चाहिए?",
        options: [
          "पूरी बराबरी: शादी, बच्चा गोद लेने का अधिकार, और स्कूली शिक्षा में भी शामिल किया जाए।",
          "उन्हें भी बाक़ी सबकी तरह शादी करने का अधिकार हो।",
          "क़ानूनी अधिकारों के साथ 'सिविल यूनियन' हो, लेकिन 'शादी' नहीं।",
          "निजी तौर पर बर्दाश्त करें, लेकिन क़ानून ऐसे रिश्तों को मान्यता न दे।",
          "ऐसे रिश्ते हमारी संस्कृति के ख़िलाफ़ हैं और इन्हें स्वीकार नहीं करना चाहिए।"
        ],
        why: "भारत ने 2018 में (नवतेज सिंह जौहर मामले में) समलैंगिक संबंधों को अपराध की श्रेणी से हटाया, लेकिन 2023 में सुप्रीम कोर्ट ने शादी का सवाल संसद पर छोड़ दिया। आज 30 से ज़्यादा देशों में समलैंगिक विवाह की अनुमति है, जबकि लगभग 60 देश अब भी समलैंगिक संबंधों को अपराध मानते हैं।"
      }
    },

    /* 15 */ {
      domain: "civil",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "What is the best way to deal with crime?",
        options: [
          "Harsh punishments, fast trials and the death penalty for serious crimes.",
          "Tougher sentences and more powers for the police.",
          "Fair punishment plus rehabilitation, with the death penalty only in the 'rarest of rare' cases.",
          "Focus on rehabilitation, and abolish the death penalty.",
          "Tackle root causes like poverty; prisons should be a last resort."
        ],
        why: "Norway focuses on rehabilitation and has one of the world's lowest reoffending rates; Singapore relies on strict punishment and has very low crime. India keeps the death penalty for the 'rarest of rare' cases (Bachan Singh, 1980), while more than two-thirds of countries have abolished it in law or in practice."
      },
      hi: {
        text: "अपराध से निपटने का सबसे अच्छा तरीक़ा क्या है?",
        options: [
          "कड़ी सज़ा, तेज़ सुनवाई, और गंभीर अपराधों के लिए मृत्युदंड।",
          "ज़्यादा सख़्त सज़ाएँ और पुलिस को ज़्यादा अधिकार।",
          "उचित सज़ा के साथ सुधार भी, और मृत्युदंड सिर्फ़ 'दुर्लभतम में दुर्लभ' मामलों में।",
          "सुधार पर ज़ोर दें, और मृत्युदंड ख़त्म करें।",
          "ग़रीबी जैसी जड़ों को ख़त्म करें; जेल आख़िरी उपाय हो।"
        ],
        why: "नॉर्वे सुधार पर ध्यान देता है और वहाँ दोबारा अपराध करने की दर दुनिया में सबसे कम में से है; सिंगापुर सख़्त सज़ा पर भरोसा करता है और वहाँ अपराध बहुत कम है। भारत में मृत्युदंड 'दुर्लभतम में दुर्लभ' मामलों के लिए है (बचन सिंह मामला, 1980), जबकि दो-तिहाई से ज़्यादा देशों ने इसे क़ानून या व्यवहार में ख़त्म कर दिया है।"
      }
    },

    /* 16 */ {
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

    /* 17 */ {
      domain: "econ",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "A company wants to lay off 500 workers to stay profitable. What should happen?",
        options: [
          "It shouldn't be allowed. Workers should co-own and run their companies.",
          "Only with government permission, union agreement and generous compensation.",
          "Allowed, with fair severance pay and help to retrain for new jobs.",
          "Allowed. Businesses must adapt quickly, and workers will find new jobs.",
          "It's entirely the owner's decision; unions and labour laws only distort the market."
        ],
        why: "Germany gives workers seats on company boards ('co-determination'). In India, factories with 100 or more workers needed government permission to lay anyone off; the 2020 labour codes raised this to 300. The USA mostly follows 'at-will' employment. Protection brings security; critics say it discourages formal hiring."
      },
      hi: {
        text: "एक कंपनी मुनाफ़े में बने रहने के लिए 500 कर्मचारियों की छँटनी करना चाहती है। क्या होना चाहिए?",
        options: [
          "इसकी इजाज़त न हो। कंपनियों के मालिक और संचालक ख़ुद मज़दूर होने चाहिए।",
          "सिर्फ़ सरकार की अनुमति, यूनियन की सहमति और अच्छे मुआवज़े के साथ।",
          "इजाज़त हो, लेकिन उचित मुआवज़े और नई नौकरी के लिए ट्रेनिंग के साथ।",
          "इजाज़त हो। कंपनियों को जल्दी बदलना पड़ता है, और कर्मचारी नई नौकरियाँ ढूँढ लेंगे।",
          "यह पूरी तरह मालिक का फ़ैसला है; यूनियन और श्रम क़ानून बस बाज़ार को बिगाड़ते हैं।"
        ],
        why: "जर्मनी में कंपनी के बोर्ड में कर्मचारियों की भी सीटें होती हैं ('को-डिटरमिनेशन')। भारत में 100 या ज़्यादा कर्मचारियों वाली फ़ैक्ट्रियों को छँटनी के लिए सरकारी अनुमति चाहिए होती थी; 2020 के श्रम कोड ने यह सीमा 300 कर दी। अमेरिका में ज़्यादातर 'एट-विल' नौकरी चलती है। सुरक्षा से भरोसा मिलता है; आलोचकों के अनुसार इससे कंपनियाँ औपचारिक नौकरियाँ देने से कतराती हैं।"
      }
    },

    /* 18 */ {
      domain: "social",
      scores: [2, 1, 0, -1, -2],
      en: {
        text: "How should society treat its old customs and traditions?",
        options: [
          "They are sacred and must be protected from modern and foreign influences.",
          "They carry the wisdom of generations, so change them slowly and carefully.",
          "Keep the useful ones and change the harmful ones.",
          "Question and reform them whenever they clash with equality or individual rights.",
          "Most are chains from the past; replace them with reason and science."
        ],
        why: "This is the core debate between Enlightenment thinkers, who trusted reason, and Edmund Burke, who saw tradition as the inherited wisdom of the ages. Reformers like Raja Ram Mohan Roy (against sati) and Jyotirao Phule (against caste) challenged customs, while Gandhi drew moral strength from tradition."
      },
      hi: {
        text: "समाज को अपने पुराने रीति-रिवाज़ों और परंपराओं के साथ कैसा व्यवहार करना चाहिए?",
        options: [
          "ये पवित्र हैं, और इन्हें आधुनिक व विदेशी प्रभावों से बचाना चाहिए।",
          "इनमें पीढ़ियों की समझ है, इसलिए इन्हें धीरे-धीरे और सोच-समझकर बदलना चाहिए।",
          "जो उपयोगी हैं उन्हें रखें, जो नुक़सानदेह हैं उन्हें बदलें।",
          "जब भी ये बराबरी या व्यक्तिगत अधिकारों से टकराएँ, इन पर सवाल उठाकर सुधार करें।",
          "ज़्यादातर अतीत की बेड़ियाँ हैं; इनकी जगह तर्क और विज्ञान को अपनाना चाहिए।"
        ],
        why: "यह प्रबोधन (Enlightenment) के विचारकों, जो तर्क पर भरोसा करते थे, और एडमंड बर्क के बीच की मूल बहस है, जो परंपरा को सदियों से मिली समझ मानते थे। राजा राममोहन राय (सती के ख़िलाफ़) और ज्योतिराव फुले (जाति के ख़िलाफ़) जैसे सुधारकों ने रीति-रिवाज़ों को चुनौती दी, जबकि गांधी ने परंपरा से नैतिक शक्ति ली।"
      }
    },

    /* 19 */ {
      domain: "civil",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "Protesters have blocked a highway for several days against a new law. What should the government do?",
        options: [
          "Negotiate with them. Protest is democracy, and the inconvenience is the point.",
          "Let the protest continue, but keep routes open for ambulances and emergencies.",
          "Move them to a designated protest site, using force only as a last resort.",
          "Clear the highway quickly with police. Law and order comes first.",
          "Arrest the leaders and ban such protests. They harm the nation."
        ],
        why: "From Gandhi's Salt March (1930) to the US civil-rights marches, civil disobedience has changed history. Governments must balance the right to assemble peacefully (Article 19(1)(b) in India) with public order and the rights of other citizens."
      },
      hi: {
        text: "एक नए क़ानून के विरोध में प्रदर्शनकारियों ने कई दिनों से हाईवे जाम कर रखा है। सरकार को क्या करना चाहिए?",
        options: [
          "उनसे बातचीत करे। विरोध ही लोकतंत्र है, और असुविधा ही उसका मक़सद है।",
          "विरोध चलने दे, लेकिन एम्बुलेंस और आपात सेवाओं के लिए रास्ता खुला रखे।",
          "उन्हें तय प्रदर्शन-स्थल पर भेजे, और बल का इस्तेमाल सिर्फ़ आख़िरी उपाय के रूप में करे।",
          "पुलिस से हाईवे जल्दी ख़ाली कराए। क़ानून-व्यवस्था सबसे पहले।",
          "नेताओं को गिरफ़्तार करे और ऐसे प्रदर्शनों पर रोक लगाए। ये देश को नुक़सान पहुँचाते हैं।"
        ],
        why: "गांधी के नमक सत्याग्रह (1930) से लेकर अमेरिका के नागरिक अधिकार आंदोलन तक, सविनय अवज्ञा ने इतिहास बदला है। सरकारों को शांतिपूर्ण सभा के अधिकार (भारत में अनुच्छेद 19(1)(ख)) और सार्वजनिक व्यवस्था व दूसरे नागरिकों के अधिकारों के बीच संतुलन बनाना होता है।"
      }
    },

    /* 20 */ {
      domain: "world",
      scores: [-2, -1, 0, 1, 2],
      en: {
        text: "How should countries handle climate change?",
        options: [
          "All countries must cut emissions fast, together, even if it slows our growth.",
          "Through global deals like the Paris Agreement, with rich countries paying more.",
          "Cooperate, but only in ways that don't hold back our development.",
          "Our growth comes first. The rich countries caused it, so let them fix it.",
          "Global climate deals are a trap to keep countries like ours down."
        ],
        why: "The Paris Agreement (2015) aims to keep warming well below 2 °C. India argues for 'common but differentiated responsibilities', since rich nations emitted most of the carbon dioxide in history. The USA has withdrawn from the agreement twice. The ecologist Garrett Hardin called shared problems like this a 'tragedy of the commons'."
      },
      hi: {
        text: "देशों को जलवायु परिवर्तन से कैसे निपटना चाहिए?",
        options: [
          "सभी देश मिलकर तेज़ी से उत्सर्जन घटाएँ, भले ही इससे हमारी विकास दर धीमी हो।",
          "पेरिस समझौते जैसे वैश्विक समझौतों के ज़रिए, जिनमें अमीर देश ज़्यादा भुगतान करें।",
          "सहयोग करें, लेकिन सिर्फ़ उन्हीं तरीक़ों से जो हमारे विकास को न रोकें।",
          "हमारा विकास पहले। समस्या अमीर देशों ने पैदा की, वही इसे ठीक करें।",
          "वैश्विक जलवायु समझौते हमारे जैसे देशों को पीछे रखने का जाल हैं।"
        ],
        why: "पेरिस समझौते (2015) का लक्ष्य धरती के तापमान में बढ़ोतरी को 2 °C से काफ़ी नीचे रखना है। भारत 'साझा लेकिन अलग-अलग ज़िम्मेदारियों' की बात करता है, क्योंकि इतिहास में ज़्यादातर कार्बन डाइऑक्साइड अमीर देशों ने छोड़ी है। अमेरिका दो बार इस समझौते से बाहर निकल चुका है। पारिस्थितिकी विज्ञानी गैरेट हार्डिन ने ऐसी साझा समस्याओं को 'साझा संसाधनों की त्रासदी' (tragedy of the commons) कहा था।"
      }
    }
  ]
};
