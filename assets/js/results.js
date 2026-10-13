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
  {
    "max": -60,
    "en": "Far Left",
    "hi": "धुर वामपंथी"
  },
  {
    "max": -33,
    "en": "Left",
    "hi": "वामपंथी"
  },
  {
    "max": -11,
    "en": "Centre-Left",
    "hi": "मध्य-वामपंथी"
  },
  {
    "max": 10,
    "en": "Centre",
    "hi": "मध्यमार्गी"
  },
  {
    "max": 32,
    "en": "Centre-Right",
    "hi": "मध्य-दक्षिणपंथी"
  },
  {
    "max": 59,
    "en": "Right",
    "hi": "दक्षिणपंथी"
  },
  {
    "max": 100,
    "en": "Far Right",
    "hi": "धुर दक्षिणपंथी"
  }
];

window.QUIZ.bands = {
  "econ": [
    {
      "en": {
        "label": "Socialist",
        "desc": "You want the state or workers to own and plan most of the economy, and you see wealth inequality as the core injustice.",
        "good": {
          "name": "Kerala's land reforms",
          "when": "India · 1957–1970s",
          "text": "Gave land directly to poor tenant farmers; public clinics and schools brought India's highest literacy rate."
        },
        "bad": {
          "name": "India's Licence Raj",
          "when": "India · 1950s–1991",
          "text": "To open a factory or make more products, you needed dozens of permits, which killed growth and bred bribes."
        }
      },
      "hi": {
        "label": "समाजवादी",
        "desc": "आप चाहते हैं कि अर्थव्यवस्था का ज़्यादातर हिस्सा सरकार या मज़दूरों के स्वामित्व और योजना में हो, और आप संपत्ति की असमानता को सबसे बड़ा अन्याय मानते हैं।",
        "good": {
          "name": "केरल के भूमि सुधार",
          "when": "भारत · 1957–1970 का दशक",
          "text": "काश्तकार किसानों को सीधे ज़मीन दी; सरकारी स्कूलों और अस्पतालों ने मिलकर केरल को भारत में सबसे ऊँची साक्षरता दर तक पहुँचाया।"
        },
        "bad": {
          "name": "भारत का लाइसेंस राज",
          "when": "भारत · 1950 का दशक–1991",
          "text": "कारख़ाना खोलने या उत्पादन बढ़ाने के लिए दर्जनों सरकारी परमिट चाहिए थे, जिससे विकास रुका और रिश्वतखोरी बढ़ी।"
        }
      }
    },
    {
      "en": {
        "label": "Social Democrat",
        "desc": "You accept markets but want strong unions, progressive taxes and a generous welfare state to keep them fair.",
        "good": {
          "name": "Franklin D. Roosevelt's New Deal",
          "when": "USA · 1933–1939",
          "text": "Government jobs, bank rules, and pensions pulled millions of families out of the Great Depression."
        },
        "bad": {
          "name": "Sri Lanka's 2022 bankruptcy",
          "when": "Sri Lanka · 2022",
          "text": "Handing out cheap fuel, free power, and tax cuts with empty coffers left the country unable to buy petrol or medicine."
        }
      },
      "hi": {
        "label": "सामाजिक लोकतंत्रवादी",
        "desc": "आप बाज़ार को स्वीकार करते हैं, लेकिन उसे न्यायपूर्ण बनाए रखने के लिए मज़बूत यूनियन, प्रगतिशील टैक्स और उदार कल्याणकारी राज्य चाहते हैं।",
        "good": {
          "name": "रूज़वेल्ट की 'न्यू डील'",
          "when": "अमेरिका · 1933–1939",
          "text": "सरकारी नौकरियों, बैंक नियमों और पेंशन ने लाखों परिवारों को महामंदी से बाहर निकाला।"
        },
        "bad": {
          "name": "श्रीलंका का दिवालियापन",
          "when": "श्रीलंका · 2022",
          "text": "ख़ाली ख़ज़ाने के बावजूद मुफ़्त बिजली, सस्ता ईंधन और भारी टैक्स छूट बाँटने से देश दिवालिया हुआ और पेट्रोल व दवाइयों के लाले पड़ गए।"
        }
      }
    },
    {
      "en": {
        "label": "Mixed Economy",
        "desc": "You're a pragmatist: markets create wealth, the state fixes their failures, and you judge each policy by its results.",
        "good": {
          "name": "Deng Xiaoping's reforms",
          "when": "China · 1978 onwards",
          "text": "Welcomed private business while the government guided major industries, lifting 800M people out of poverty."
        },
        "bad": {
          "name": "Pakistan's fuel subsidy crisis",
          "when": "Pakistan · 2022–2024",
          "text": "Selling petrol and electricity below real cost to win votes created massive unpaid debts and emergency loan begging."
        }
      },
      "hi": {
        "label": "मिश्रित अर्थव्यवस्था समर्थक",
        "desc": "आप व्यावहारिक हैं: बाज़ार दौलत पैदा करता है, सरकार उसकी कमियाँ ठीक करती है, और आप हर नीति को उसके नतीजों से परखते हैं।",
        "good": {
          "name": "देंग शियाओपिंग के सुधार",
          "when": "चीन · 1978 से",
          "text": "निजी कारोबार को बढ़ावा दिया और अहम उद्योगों पर सरकारी नियंत्रण रखा, जिससे 80 करोड़ लोग ग़रीबी से बाहर निकले।"
        },
        "bad": {
          "name": "पाकिस्तान का सब्सिडी संकट",
          "when": "पाकिस्तान · 2022–2024",
          "text": "वोट पाने के लिए पेट्रोल और बिजली को लागत से बहुत सस्ते में बेचने से भारी क़र्ज़ चढ़ा और विदेशी कर्ज़ों के लिए हाथ फैलाने पड़े।"
        }
      }
    },
    {
      "en": {
        "label": "Market Liberal",
        "desc": "You trust competition, private enterprise and open markets to create prosperity, and want only a limited safety net.",
        "good": {
          "name": "India's 1991 reforms",
          "when": "India · 1991 onwards",
          "text": "Ended government red tape, opened up competition, and turned India into a global software and business hub."
        },
        "bad": {
          "name": "The 2008 global financial crash",
          "when": "USA · 2007–2009",
          "text": "Unchecked private banks gave out risky home loans; when the bubble burst, millions of regular workers lost their jobs and homes."
        }
      },
      "hi": {
        "label": "बाज़ार-उदारवादी",
        "desc": "आप समृद्धि के लिए प्रतिस्पर्धा, निजी उद्यम और खुले बाज़ार पर भरोसा करते हैं, और सामाजिक सुरक्षा को सीमित रखना चाहते हैं।",
        "good": {
          "name": "भारत का 1991 का आर्थिक सुधार",
          "when": "भारत · 1991 से",
          "text": "सरकारी लालफ़ीताशाही ख़त्म की, खुली प्रतिस्पर्धा शुरू की और भारत को वैश्विक सॉफ़्टवेयर व व्यापार का बड़ा केंद्र बनाया।"
        },
        "bad": {
          "name": "2008 का वैश्विक वित्तीय संकट",
          "when": "अमेरिका और यूरोप · 2007–2009",
          "text": "निजी बैंकों ने बिना रोक-टोक ख़तरनाक लोन बाँटे; जब बुलबुला फूटा तो लाखों आम लोगों की नौकरियाँ और घर छिन गए।"
        }
      }
    },
    {
      "en": {
        "label": "Free-Market Capitalist",
        "desc": "You want a minimal state in the economy: low taxes, free trade, private property and very little regulation.",
        "good": {
          "name": "Hong Kong's trading miracle",
          "when": "Hong Kong · 1960s–1990s",
          "text": "Zero import duties, low taxes, and free trade turned a crowded refugee port into one of Earth's richest cities."
        },
        "bad": {
          "name": "The British East India Company",
          "when": "India · 1757–1858",
          "text": "A private profit-driven company with its own private army looted Bengal, forced farmers to grow cash crops, and caused massive famines."
        }
      },
      "hi": {
        "label": "मुक्त-बाज़ार पूँजीवादी",
        "desc": "आप अर्थव्यवस्था में सरकार की न्यूनतम भूमिका चाहते हैं: कम टैक्स, मुक्त व्यापार, निजी संपत्ति और बहुत कम नियम।",
        "good": {
          "name": "हांगकांग का व्यापारिक चमत्कार",
          "when": "हांगकांग · 1960–1990 का दशक",
          "text": "शून्य आयात शुल्क, कम टैक्स और मुक्त व्यापार ने शरणार्थियों से भरे एक बंदरगाह को दुनिया के सबसे अमीर शहरों में बदल दिया।"
        },
        "bad": {
          "name": "ईस्ट इंडिया कंपनी की लूट",
          "when": "भारत · 1757–1858",
          "text": "अपनी निजी फ़ौज वाली इस मुनाफ़ाख़ोर निजी कंपनी ने बंगाल को लूटा, किसानों से जबरन नील-अफ़ीम उगवाई और भीषण अकाल पैदा किए।"
        }
      }
    }
  ],
  "social": [
    {
      "en": {
        "label": "Radical Progressive",
        "desc": "You want to rebuild society from the ground up, ending inherited hierarchies of caste, class, gender and religion.",
        "good": {
          "name": "Dr B. R. Ambedkar",
          "when": "India · 1891–1956",
          "text": "Fought against untouchability, wrote the Constitution, and championed women's right to property and divorce."
        },
        "bad": {
          "name": "China's Cultural Revolution",
          "when": "China · 1966–1976",
          "text": "In a push to wipe out 'old habits', young mobs smashed ancient temples, beat teachers, and terrorised ordinary families."
        }
      },
      "hi": {
        "label": "क्रांतिकारी प्रगतिशील",
        "desc": "आप समाज को जड़ से नया बनाना चाहते हैं, और जाति, वर्ग, लिंग और धर्म पर आधारित पुराने ऊँच-नीच को ख़त्म करना चाहते हैं।",
        "good": {
          "name": "डॉ. बी. आर. आंबेडकर",
          "when": "भारत · 1891–1956",
          "text": "छुआछूत के ख़िलाफ़ लड़े, संविधान लिखा और महिलाओं के संपत्ति व तलाक़ के अधिकारों के लिए हिंदू कोड बिल आगे बढ़ाया।"
        },
        "bad": {
          "name": "चीन की सांस्कृतिक क्रांति",
          "when": "चीन · 1966–1976",
          "text": "'पुरानी परंपराओं' को मिटाने के नाम पर उग्र भीड़ ने प्राचीन मंदिर तोड़े, शिक्षकों को पीटा और आम परिवारों पर ज़ुल्म ढहाए।"
        }
      }
    },
    {
      "en": {
        "label": "Progressive",
        "desc": "You welcome social change toward equality and personal freedom, and you question customs that hold people back.",
        "good": {
          "name": "Savitribai & Jyotirao Phule",
          "when": "India · 1848 onwards",
          "text": "Opened India's first schools for girls in Pune and fought for the rights of lower castes and widows."
        },
        "bad": {
          "name": "Forced sterilisation in Emergency",
          "when": "India · 1975–1977",
          "text": "Blindly chasing population control targets, officials forced thousands of poor, helpless men into vasectomies without consent."
        }
      },
      "hi": {
        "label": "प्रगतिशील",
        "desc": "आप बराबरी और व्यक्तिगत आज़ादी की ओर होने वाले सामाजिक बदलाव का स्वागत करते हैं, और उन रिवाज़ों पर सवाल उठाते हैं जो लोगों को पीछे रखते हैं।",
        "good": {
          "name": "सावित्रीबाई और ज्योतिराव फुले",
          "when": "भारत · 1848 से",
          "text": "पुणे में लड़कियों के लिए शुरुआती स्कूल खोले और जातिगत भेदभाव व विधवाओं के साथ होने वाले अन्याय के ख़िलाफ़ लड़े।"
        },
        "bad": {
          "name": "आपातकाल में जबरन नसबंदी",
          "when": "भारत · 1975–1977",
          "text": "जनसंख्या नियंत्रण के अंधाधुंध लक्ष्यों के फेर में अधिकारियों ने हज़ारों ग़रीब और बेबस पुरुषों की जबरन नसबंदी कर दी।"
        }
      }
    },
    {
      "en": {
        "label": "Moderate",
        "desc": "You value both continuity and change: keep what works, reform what hurts, and avoid extremes.",
        "good": {
          "name": "Emperor Ashoka's Dhamma",
          "when": "Maurya Empire · c. 268–232 BCE",
          "text": "After the bloody Kalinga war, he promoted peace, kindness to all religions, and public hospitals without forcing one faith."
        },
        "bad": {
          "name": "Rushed Partition of India",
          "when": "British India · 1947",
          "text": "Leaders rushed a hurried boundary deal without proper police or military planning, leading to brutal riots and millions of refugees."
        }
      },
      "hi": {
        "label": "संतुलित",
        "desc": "आप निरंतरता और बदलाव, दोनों को महत्व देते हैं: जो ठीक है उसे रखें, जो चोट पहुँचाता है उसे सुधारें, और अतियों से बचें।",
        "good": {
          "name": "सम्राट अशोक का धम्म",
          "when": "मौर्य साम्राज्य · लगभग 268–232 ईसा पूर्व",
          "text": "कलिंग युद्ध के बाद उन्होंने सहिष्णुता, जन-कल्याण और सभी धर्मों के आदर को बढ़ावा दिया, बिना कोई धर्म थोपे।"
        },
        "bad": {
          "name": "विभाजन की हड़बड़ी और नरसंहार",
          "when": "भारत · 1947",
          "text": "सुरक्षा और पुलिस की ठोस तैयारी के बिना जल्दबाज़ी में सीमाएँ बाँटी गईं, जिससे भीषण दंगे भड़के और लाखों लोग शरणार्थी बने।"
        }
      }
    },
    {
      "en": {
        "label": "Traditionalist",
        "desc": "You see family, faith and inherited customs as the backbone of society, and prefer slow, careful change.",
        "good": {
          "name": "Swami Vivekananda",
          "when": "India · 1863–1902",
          "text": "Proudly shared India's spiritual heritage with the world while boldly condemning caste bigotry and blind superstition."
        },
        "bad": {
          "name": "Defending Sati & child marriage",
          "when": "India · 19th Century",
          "text": "Orthodox leaders fiercely opposed reformers like Raja Ram Mohan Roy, claiming that burning living widows was sacred tradition that must not stop."
        }
      },
      "hi": {
        "label": "परंपरावादी",
        "desc": "आप परिवार, आस्था और विरासत में मिले रीति-रिवाज़ों को समाज की रीढ़ मानते हैं, और धीमा, सोचा-समझा बदलाव पसंद करते हैं।",
        "good": {
          "name": "स्वामी विवेकानंद",
          "when": "भारत · 1863–1902",
          "text": "भारत की आध्यात्मिक विरासत को गर्व से दुनिया के मंच तक ले गए, और साथ ही जातिवाद व अंधविश्वास की कड़ी निंदा की।"
        },
        "bad": {
          "name": "सती प्रथा और बाल विवाह का बचाव",
          "when": "भारत · 19वीं सदी",
          "text": "रूढ़िवादियों ने राजा राममोहन राय जैसे सुधारकों का कड़ा विरोध किया और कहा कि ज़िंदा विधवाओं को जलाना एक पवित्र परंपरा है जिसे बंद नहीं किया जाना चाहिए।"
        }
      }
    },
    {
      "en": {
        "label": "Strict Traditionalist",
        "desc": "You want society to hold firmly to its ancestral religion, customs and social order, and to resist outside influence.",
        "good": {
          "name": "Bhutan's culture-first path",
          "when": "Bhutan · 1970s onwards",
          "text": "Protects its unique customs and nature by law, and measures national success by happiness rather than just money."
        },
        "bad": {
          "name": "Taliban rule in Afghanistan",
          "when": "Afghanistan · 1996–present",
          "text": "Strict religious decrees ban girls from schools after 6th class and forbid women from working in offices or visiting parks."
        }
      },
      "hi": {
        "label": "दृढ़ परंपरावादी",
        "desc": "आप चाहते हैं कि समाज अपने पुरखों के धर्म, रीति-रिवाज़ और सामाजिक व्यवस्था को मज़बूती से थामे रहे और बाहरी प्रभावों का विरोध करे।",
        "good": {
          "name": "भूटान का संस्कृति-प्रथम रास्ता",
          "when": "भूटान · 1970 के दशक से",
          "text": "क़ानून बनाकर अपनी अनूठी संस्कृति और प्रकृति की रक्षा की, और तरक्क़ी को सिर्फ़ पैसे से नहीं, 'ख़ुशहाली' से नापा।"
        },
        "bad": {
          "name": "अफ़ग़ानिस्तान में तालिबान राज",
          "when": "अफ़ग़ानिस्तान · 1996 से अब तक",
          "text": "सख़्त कट्टरपंथी नियमों के तहत लड़कियों के छठी के बाद स्कूल जाने पर रोक लगाई और महिलाओं को दफ़्तरों व पार्कों से बाहर कर दिया।"
        }
      }
    }
  ],
  "civil": [
    {
      "en": {
        "label": "Anti-State Libertarian",
        "desc": "You distrust concentrated power of any kind and believe individuals and communities should govern themselves.",
        "good": {
          "name": "Martin Luther King Jr.",
          "when": "USA · 1955–1968",
          "text": "Led peaceful boycotts against racist laws, proving that citizens have a moral duty to disobey unjust rules."
        },
        "bad": {
          "name": "Naxalite violence in tribal belts",
          "when": "India · 1990s–2010s",
          "text": "Rejecting the Indian state and police, rebels bombed rural schools, blew up ambulances, and killed villagers accused of being 'informers'."
        }
      },
      "hi": {
        "label": "राज्य-विरोधी स्वतंत्रतावादी",
        "desc": "आप किसी भी तरह की केंद्रित सत्ता पर भरोसा नहीं करते, और मानते हैं कि लोग और समुदाय ख़ुद अपना शासन चलाएँ।",
        "good": {
          "name": "मार्टिन लूथर किंग जूनियर",
          "when": "अमेरिका · 1955–1968",
          "text": "नस्लभेदी क़ानूनों के ख़िलाफ़ अहिंसक आंदोलन चलाया और सिखाया कि अन्यायपूर्ण क़ानूनों को न मानना एक नैतिक कर्तव्य है।"
        },
        "bad": {
          "name": "नक्सली हिंसा और बर्बादी",
          "when": "भारत · 1990–2010 का दशक",
          "text": "संविधान और पुलिस को नकारते हुए उग्रवादियों ने ग्रामीण स्कूलों और एम्बुलेंसों को बम से उड़ाया और निर्दोष ग्रामीणों की हत्या की।"
        }
      }
    },
    {
      "en": {
        "label": "Civil Libertarian",
        "desc": "You put free speech, privacy, fair trials and the right to protest first, and want firm limits on state power.",
        "good": {
          "name": "Nelson Mandela",
          "when": "South Africa · 1994–1999",
          "text": "United a divided country through forgiveness instead of revenge, giving South Africa one of the world's strongest bills of rights."
        },
        "bad": {
          "name": "Mob violence in Bangladesh",
          "when": "Bangladesh · 2024",
          "text": "When police and government vanished from the streets, unruly mobs attacked offices, temples, and homes without any law to stop them."
        }
      },
      "hi": {
        "label": "नागरिक स्वतंत्रतावादी",
        "desc": "आप अभिव्यक्ति की आज़ादी, निजता, निष्पक्ष सुनवाई और विरोध के अधिकार को सबसे ऊपर रखते हैं, और सरकार की ताक़त पर पक्की सीमाएँ चाहते हैं।",
        "good": {
          "name": "नेल्सन मंडेला",
          "when": "दक्षिण अफ़्रीका · 1994–1999",
          "text": "27 साल जेल के बाद बदले की जगह मेल-मिलाप चुना और दक्षिण अफ़्रीका को दुनिया के सबसे मज़बूत मौलिक अधिकार दिए।"
        },
        "bad": {
          "name": "बांग्लादेश में भीड़ का उत्पात",
          "when": "बांग्लादेश · 2024",
          "text": "सरकार और पुलिस के हटने पर अनियंत्रित भीड़ ने दफ़्तरों, मंदिरों और घरों पर हमले शुरू कर दिए और क़ानून-व्यवस्था चरमरा गई।"
        }
      }
    },
    {
      "en": {
        "label": "Balanced",
        "desc": "You want both freedom and security, and accept some limits on liberty when there are clear rules and independent checks.",
        "good": {
          "name": "Germany's Basic Law",
          "when": "Germany · 1949 onwards",
          "text": "Protects free speech and rights, but allows courts to ban extremist groups that openly plan to destroy democracy."
        },
        "bad": {
          "name": "The USA PATRIOT Act",
          "when": "USA · 2001 onwards",
          "text": "Passed after 9/11 to catch terrorists, but the government secretly used it to tap ordinary citizens' phone calls and read emails without court orders."
        }
      },
      "hi": {
        "label": "संतुलित",
        "desc": "आप आज़ादी और सुरक्षा, दोनों चाहते हैं, और साफ़ नियमों व स्वतंत्र निगरानी के साथ आज़ादी पर कुछ सीमाएँ स्वीकार करते हैं।",
        "good": {
          "name": "जर्मनी का संविधान",
          "when": "जर्मनी · 1949 से",
          "text": "नागरिकों को आज़ादी देता है, लेकिन अदालतों को उन कट्टरपंथी दलों पर पाबंदी लगाने का हक़ देता है जो लोकतंत्र को मिटाना चाहते हैं।"
        },
        "bad": {
          "name": "अमेरिका का पैट्रियट एक्ट",
          "when": "अमेरिका · 2001 से",
          "text": "आतंकवाद रोकने के नाम पर बने इस क़ानून से सरकार ने लाखों आम नागरिकों के फ़ोन और ईमेल चुपचाप ट्रेस करना शुरू कर दिया।"
        }
      }
    },
    {
      "en": {
        "label": "Law & Order",
        "desc": "You believe a strong state, firm policing and social discipline protect people better than unlimited freedoms.",
        "good": {
          "name": "Singapore's clean governance",
          "when": "Singapore · 1965 onwards",
          "text": "Zero tolerance for crime, tough anti-corruption rules, and clean streets made it one of the safest and richest countries on Earth."
        },
        "bad": {
          "name": "The Emergency in India",
          "when": "India · 1975–1977",
          "text": "Under the excuse of 'bringing discipline and punctuality', basic court rights were cancelled, journalists were silenced, and politicians were jailed."
        }
      },
      "hi": {
        "label": "क़ानून-व्यवस्था समर्थक",
        "desc": "आप मानते हैं कि मज़बूत सरकार, सख़्त पुलिस और सामाजिक अनुशासन लोगों की रक्षा असीमित आज़ादी से बेहतर करते हैं।",
        "good": {
          "name": "सिंगापुर का सख़्त शासन",
          "when": "सिंगापुर · 1965 से",
          "text": "अपराध पर ज़ीरो टॉलरेंस, भ्रष्टाचार पर कड़ी चोट और साफ़-सुथरी व्यवस्था ने इसे दुनिया के सबसे सुरक्षित और समृद्ध देशों में ला खड़ा किया।"
        },
        "bad": {
          "name": "भारत में आपातकाल (इमरजेंसी)",
          "when": "भारत · 1975–1977",
          "text": "'अनुशासन और व्यवस्था' के नाम पर नागरिकों के अदालती अधिकार छीने गए, प्रेस पर सेंसर लगा और विपक्षी नेताओं को जेल में ठूंस दिया गया।"
        }
      }
    },
    {
      "en": {
        "label": "Authoritarian",
        "desc": "You believe a powerful state or leader should have the final say, and that order and unity matter more than individual rights.",
        "good": {
          "name": "Augustus and the Pax Romana",
          "when": "Roman Empire · 27 BCE onwards",
          "text": "Took strong single-leader control to end 100 years of bloody civil war, bringing 200 years of safe trade and peace."
        },
        "bad": {
          "name": "North Korea's family rule",
          "when": "North Korea · 1948 onwards",
          "text": "Absolute family dictatorship: zero internet, total brainwashing on television, and entire families sent to prison camps for complaining."
        }
      },
      "hi": {
        "label": "सत्तावादी",
        "desc": "आप मानते हैं कि आख़िरी फ़ैसला एक ताक़तवर सरकार या नेता का हो, और व्यवस्था व एकता व्यक्तिगत अधिकारों से ज़्यादा अहम हैं।",
        "good": {
          "name": "ऑगस्टस और 'पैक्स रोमाना'",
          "when": "रोमन साम्राज्य · 27 ईसा पूर्व से",
          "text": "एकछत्र शासन से सौ साल के गृहयुद्ध ख़त्म किए, जिसके बाद साम्राज्य में लगभग 200 साल तक शांति और सुरक्षित व्यापार रहा।"
        },
        "bad": {
          "name": "उत्तर कोरिया की तानाशाही",
          "when": "उत्तर कोरिया · 1948 से",
          "text": "एक ही परिवार का ख़ौफ़नाक राज: न इंटरनेट की आज़ादी, न बोलने की छूट, और छोटी-सी शिकायत पर पूरे परिवार को जेल शिविरों में भेज दिया जाता है।"
        }
      }
    }
  ],
  "world": [
    {
      "en": {
        "label": "Cosmopolitan",
        "desc": "You see yourself as a citizen of the world and want borders, armies and national rivalries to matter far less.",
        "good": {
          "name": "The European Union",
          "when": "Europe · 1951 onwards",
          "text": "Countries that fought each other for centuries opened their borders and shared laws, completely eliminating war between them."
        },
        "bad": {
          "name": "UN inaction on cross-border terror",
          "when": "Global · 1990s–present",
          "text": "Despite loud promises of global peace, world bodies repeatedly failed to punish terror bases because big powers used their vetoes for selfish games."
        }
      },
      "hi": {
        "label": "विश्व-नागरिकतावादी",
        "desc": "आप ख़ुद को विश्व का नागरिक मानते हैं, और चाहते हैं कि सीमाएँ, सेनाएँ और राष्ट्रीय होड़ बहुत कम मायने रखें।",
        "good": {
          "name": "यूरोपीय संघ",
          "when": "यूरोप · 1951 से",
          "text": "सदियों तक आपस में लड़ते रहे देशों ने अपनी सीमाएँ खोलीं और साझे नियम बनाए, जिससे उनके बीच युद्ध हमेशा के लिए ख़त्म हो गया।"
        },
        "bad": {
          "name": "सीमा पार आतंकवाद पर UN की लाचारी",
          "when": "वैश्विक · 1990 से अब तक",
          "text": "विश्व शांति के बड़े-बड़े दावों के बावजूद, वैश्विक संस्थाएँ आतंकी ठिकानों पर सख़्त कार्रवाई नहीं कर पाईं क्योंकि ताक़तवर देश अपने स्वार्थ के लिए वीटो लगा देते हैं।"
        }
      }
    },
    {
      "en": {
        "label": "Internationalist",
        "desc": "You favour cooperation through alliances, treaties and international bodies, and see global problems as shared problems.",
        "good": {
          "name": "The Marshall Plan",
          "when": "USA & Western Europe · 1948–1952",
          "text": "US gave massive aid money to help rebuild ruined European countries, turning former enemies into close friends and trade partners."
        },
        "bad": {
          "name": "1962 China War betrayal",
          "when": "India & China · 1954–1962",
          "text": "India trusted the friendly slogan 'Hindi-Chini Bhai-Bhai' and ignored border military preparation, leaving the country unprepared when China attacked."
        }
      },
      "hi": {
        "label": "अंतरराष्ट्रीयतावादी",
        "desc": "आप गठबंधनों, संधियों और अंतरराष्ट्रीय संस्थाओं के ज़रिए सहयोग पसंद करते हैं, और वैश्विक समस्याओं को साझा समस्या मानते हैं।",
        "good": {
          "name": "मार्शल प्लान",
          "when": "अमेरिका और यूरोप · 1948–1952",
          "text": "अमेरिका ने युद्ध में बर्बाद यूरोप को फिर से खड़ा करने के लिए भारी आर्थिक मदद दी, जिससे पुराने दुश्मन पक्के दोस्त और व्यापारिक साझेदार बन गए।"
        },
        "bad": {
          "name": "1962 के युद्ध में चीन का धोखा",
          "when": "भारत और चीन · 1954–1962",
          "text": "भारत ने 'हिंदी-चीनी भाई-भाई' के नारे पर भरोसा किया और सीमा पर रक्षा तैयारी पर ध्यान नहीं दिया, जिसका फ़ायदा उठाकर चीन ने 1962 में अचानक हमला कर दिया।"
        }
      }
    },
    {
      "en": {
        "label": "Pragmatic Realist",
        "desc": "You judge foreign policy by national interest, case by case: cooperate where it helps, stand firm where it doesn't.",
        "good": {
          "name": "The Non-Aligned Movement",
          "when": "Belgrade · 1961 onwards",
          "text": "Led by Nehru, newly independent countries refused to become puppets of either America or Russia, keeping their freedom to decide their own path."
        },
        "bad": {
          "name": "Sri Lanka losing Hambantota Port",
          "when": "Sri Lanka · 2017",
          "text": "Thinking it was being clever by taking cheap foreign loans, Sri Lanka couldn't pay back Chinese debt and was forced to hand over its port to China for 99 years."
        }
      },
      "hi": {
        "label": "व्यावहारिक यथार्थवादी",
        "desc": "आप विदेश नीति को हर मामले में राष्ट्रीय हित से परखते हैं: जहाँ फ़ायदा हो वहाँ सहयोग, जहाँ न हो वहाँ दृढ़ता।",
        "good": {
          "name": "गुटनिरपेक्ष आंदोलन",
          "when": "बेलग्रेड · 1961 से",
          "text": "नेहरू के नेतृत्व में नए आज़ाद देशों ने अमेरिका या सोवियत रूस का मोहरा बनने से मना किया और अपनी विदेश नीति के फ़ैसले ख़ुद लेने की आज़ादी बचाई।"
        },
        "bad": {
          "name": "हंबनटोटा बंदरगाह गंवाना",
          "when": "श्रीलंका · 2017",
          "text": "आसान विदेशी क़र्ज़ों के चक्कर में फँसा श्रीलंका जब चीन का कर्ज़ नहीं चुका पाया, तो उसे अपना रणनीतिक बंदरगाह 99 साल के लिए चीन को सौंपना पड़ा।"
        }
      }
    },
    {
      "en": {
        "label": "Patriot",
        "desc": "You put your nation's interests, security and sovereignty first, while still dealing with the world when it pays.",
        "good": {
          "name": "Sardar Vallabhbhai Patel",
          "when": "India · 1947–1950",
          "text": "Convinced and pressured over 560 separate royal kingdoms to join together, creating the united nation of India."
        },
        "bad": {
          "name": "Pakistan banning trade with India",
          "when": "Pakistan · 2019 onwards",
          "text": "To make a political point, Pakistan stopped buying Indian vegetables, cotton, and sugar, causing food prices to shoot through the roof for its own poor citizens."
        }
      },
      "hi": {
        "label": "देशभक्त राष्ट्रवादी",
        "desc": "आप अपने देश के हितों, सुरक्षा और संप्रभुता को सबसे पहले रखते हैं, फिर भी फ़ायदा हो तो दुनिया से जुड़ते हैं।",
        "good": {
          "name": "सरदार वल्लभभाई पटेल",
          "when": "भारत · 1947–1950",
          "text": "560 से ज़्यादा रियासतों को सूझबूझ और दृढ़ता से एक धागे में पिरोकर एक अखंड और मज़बूत भारत का निर्माण किया।"
        },
        "bad": {
          "name": "भारत से व्यापार रोककर पाकिस्तान का नुक़सान",
          "when": "पाकिस्तान · 2019 से अब तक",
          "text": "सियासी ज़िद में पाकिस्तान ने भारत से सब्ज़ियाँ, चीनी और कपास ख़रीदना बंद कर दिया, जिससे उसके अपने आम नागरिकों के लिए खाने-पीने की चीज़ें बेतहाशा महँगी हो गईं।"
        }
      }
    },
    {
      "en": {
        "label": "Hardline Nationalist",
        "desc": "You see the nation as your highest loyalty, favour strong borders and military power, and distrust foreign influence.",
        "good": {
          "name": "Netaji Subhas Chandra Bose",
          "when": "India · 1897–1945",
          "text": "Built the Indian National Army; the public trials of his soldiers triggered huge nationwide anger that forced the British to leave sooner."
        },
        "bad": {
          "name": "Pakistan's 1971 army brutality",
          "when": "Pakistan · 1971",
          "text": "Ultranationalist generals launched a military assault on their own Bengali citizens, committing horrific atrocities until they lost the war and surrendered."
        }
      },
      "hi": {
        "label": "उग्र राष्ट्रवादी",
        "desc": "आप राष्ट्र को अपनी सबसे बड़ी निष्ठा मानते हैं, मज़बूत सीमाएँ और सैन्य ताक़त चाहते हैं, और विदेशी प्रभाव पर भरोसा नहीं करते।",
        "good": {
          "name": "नेताजी सुभाष चंद्र बोस",
          "when": "भारत · 1897–1945",
          "text": "आज़ाद हिंद फ़ौज खड़ी की; उसके सैनिकों पर चले मुक़दमों ने देशभर में ऐसी ज्वाला भड़काई कि अंग्रेजों को जल्दी भारत छोड़ना पड़ा।"
        },
        "bad": {
          "name": "1971 में पाकिस्तानी सेना का ज़ुल्म",
          "when": "पाकिस्तान · 1971",
          "text": "उग्र राष्ट्रवाद के घमंड में पाकिस्तानी जनरलों ने अपने ही बंगाली नागरिकों पर फ़ौजी कहर ढहाया, लाखों बेगुनाहों को मारा, और अंत में युद्ध हारकर आत्मसमर्पण करना पड़ा।"
        }
      }
    }
  ]
};

window.QUIZ.ideologies = [
  {
    "key": "communism",
    "emoji": "🚩",
    "pos": [
      -95,
      -30,
      80,
      -30
    ],
    "en": {
      "title": "Communism (Marxism–Leninism)",
      "desc": "You believe capitalism must be replaced by collective ownership, run by a strong revolutionary state on behalf of workers. You put equality and solidarity above markets and individual freedoms.",
      "good": {
        "name": "Soviet Union's rapid growth",
        "when": "USSR · 1920s–1960s",
        "text": "Turned a poor, uneducated farming nation into a global powerhouse that sent the first human to space."
      },
      "bad": {
        "name": "Mao's Great Leap Forward",
        "when": "China · 1958–1962",
        "text": "Government took over all farms and set impossible targets, causing a horrific famine that starved tens of millions."
      },
      "layman": "A society where factories, land, and major industries are owned collectively through the government rather than by private billionaires or companies. The goal is to eliminate class divides and provide free healthcare, housing, and guaranteed work to everyone, without chasing private profit. In practice, this has historically meant a strict, all-powerful central government.",
      "pillars": [
        "🚫 No private billionaires: Big industries, banks, and land belong to the public state.",
        "🤝 Basic needs for all: Healthcare, housing, and jobs are guaranteed to every citizen.",
        "🏛️ State-planned economy: The government sets production, wages, and prices."
      ],
      "examplePerson": "Jyoti Basu",
      "simpleTitle": "Total State Ownership"
    },
    "hi": {
      "title": "साम्यवाद (मार्क्सवाद–लेनिनवाद)",
      "desc": "आप मानते हैं कि पूँजीवाद की जगह सामूहिक स्वामित्व होना चाहिए, जिसे मज़दूरों की ओर से एक मज़बूत क्रांतिकारी राज्य चलाए। आप बराबरी और एकजुटता को बाज़ार और व्यक्तिगत आज़ादी से ऊपर रखते हैं।",
      "good": {
        "name": "सोवियत संघ का तीव्र विकास",
        "when": "सोवियत संघ · 1920–1960 का दशक",
        "text": "एक ग़रीब, अनपढ़ किसान देश को ऐसी महाशक्ति बना दिया जिसने अंतरिक्ष में पहला इंसान भेजा।"
      },
      "bad": {
        "name": "माओ का 'ग्रेट लीप फ़ॉरवर्ड'",
        "when": "चीन · 1958–1962",
        "text": "खेती पर सरकारी कब्ज़े और असंभव लक्ष्यों की सनक ने इतिहास का सबसे भीषण अकाल पैदा किया, जिसमें करोड़ों लोग भूखे मर गए।"
      },
      "layman": "ऐसी व्यवस्था जहाँ कारख़ाने, ज़मीन और बड़े उद्योग निजी पूँजीपतियों के हाथ में होने के बजाय सरकार और समाज के साझे स्वामित्व में हों। इसका मक़सद अमीर-ग़रीब का फ़र्क़ मिटाना और सबको मुफ़्त इलाज, पक्का मकान और रोज़गार देना है। इतिहास में इसे लागू करने के लिए एक बेहद सख़्त और शक्तिशाली केंद्रीय सरकार की ज़रूरत पड़ी।",
      "pillars": [
        "🚫 सार्वजनिक संपत्ति: बड़े उद्योग, बैंक और ज़मीन सरकारी स्वामित्व में होते हैं।",
        "🤝 सबकी बुनियादी ज़रूरतें: हर नागरिक को इलाज, शिक्षा और आवास की गारंटी।",
        "🏛️ सरकारी योजना: उत्पादन, नौकरियाँ और दाम सरकार तय करती है।"
      ],
      "examplePerson": "ज्योति बसु",
      "simpleTitle": "सब कुछ सरकार का"
    }
  },
  {
    "key": "libsoc",
    "emoji": "✊",
    "pos": [
      -85,
      -75,
      -90,
      -70
    ],
    "en": {
      "title": "Libertarian Socialism",
      "desc": "You want a society without bosses or rulers, where workers and communities own and manage things together through voluntary cooperation. Anarchist thinkers like Kropotkin belong to this tradition.",
      "good": {
        "name": "The Mondragon cooperatives",
        "when": "Spain · 1956 onwards",
        "text": "Huge companies owned directly by their workers, where employees vote for their bosses and share the profits (~70,000 workers)."
      },
      "bad": {
        "name": "Naxalite violence & disruption",
        "when": "India · 1970s–2000s",
        "text": "Armed groups claiming to fight for poor villagers ended up blowing up local schools, trains, and running violent kangaroo courts."
      },
      "layman": "A vision of equality without corporate bosses or authoritarian politicians. Workers run their own workplaces collectively as cooperatives, and local communities manage their own affairs through direct democratic meetings. It rejects corporate monopolies while fiercely guarding personal freedoms from government control.",
      "pillars": [
        "✊ Worker-run cooperatives: Employees make workplace decisions together and share profits.",
        "🕊️ No top-down rulers: Power stays with local community meetings, not distant politicians.",
        "🤝 Mutual aid: People help each other voluntarily rather than through government force."
      ],
      "examplePerson": "Dr. Verghese Kurien",
      "simpleTitle": "Worker-Owned Cooperatives"
    },
    "hi": {
      "title": "स्वतंत्रतावादी समाजवाद",
      "desc": "आप बिना मालिकों या शासकों वाला समाज चाहते हैं, जिसमें मज़दूर और समुदाय स्वैच्छिक सहयोग से मिलकर चीज़ों के मालिक हों और उन्हें चलाएँ। क्रोपोटकिन जैसे अराजकतावादी विचारक इसी परंपरा के हैं।",
      "good": {
        "name": "मोंड्रागॉन सहकारी संस्थाएँ",
        "when": "स्पेन · 1956 से",
        "text": "मज़दूरों के मालिकाना हक़ वाली बड़ी कंपनियाँ जहाँ कर्मचारी ख़ुद अपने मैनेजर चुनते हैं और मुनाफ़ा आपस में बाँटते हैं (70,000+ कर्मचारी)।"
      },
      "bad": {
        "name": "नक्सली हिंसा और बर्बादी",
        "when": "भारत · 1970–2000 का दशक",
        "text": "ग़रीबों की भलाई के नाम पर हथियार उठाने वाले गुटों ने ग्रामीण स्कूलों, रेल पटरियों को बम से उड़ाया और क्रूर कंगारू अदालतें चलाईं।"
      },
      "layman": "बिना किसी बड़े मालिक या तानाशाही नेता के सामाजिक बराबरी की सोच। इसमें कामगार मिलकर अपनी कंपनियाँ और फ़ैक्ट्रियाँ चलाते हैं (सहकारी समितियाँ) और स्थानीय लोग सीधे मोहल्ले की बैठकों में फ़ैसले लेते हैं। यह निजी कंपनियों के लालच और सख़्त सरकारी हुक्म दोनों के ख़िलाफ़ है।",
      "pillars": [
        "✊ कामगारों का नियंत्रण: कर्मचारी मिलकर फ़ैसले लेते हैं और मुनाफ़ा आपस में बाँटते हैं।",
        "🕊️ ऊपर से कोई हुक्म नहीं: सत्ता ऊपर से थोपने के बजाय जनता की स्थानीय सभाओं में होती है।",
        "🤝 स्वैच्छिक भाईचारा: समाज पुलिसिया डर के बजाय आपसी सहयोग और मदद से चलता है।"
      ],
      "examplePerson": "डॉ. वर्गीज कुरियन",
      "simpleTitle": "सहकारी भाईचारा"
    }
  },
  {
    "key": "demsoc",
    "emoji": "🌹",
    "pos": [
      -75,
      -60,
      -45,
      -45
    ],
    "en": {
      "title": "Democratic Socialism",
      "desc": "You want to move beyond capitalism through elections, not revolution: public ownership of key industries, strong unions and universal welfare, together with full democracy.",
      "good": {
        "name": "Clement Attlee's UK government",
        "when": "UK · 1945–1951",
        "text": "Created the free National Health Service (NHS) and built pensions and support for poor families."
      },
      "bad": {
        "name": "Venezuela's economic breakdown",
        "when": "Venezuela · 1999 onwards",
        "text": "Government took over private businesses and printed endless cash, leaving shops empty and millions fleeing poverty."
      },
      "layman": "Believes in moving beyond free-market capitalism through fair democratic elections, not violent revolutions. Crucial essentials—like healthcare, education, clean water, and transport—should be publicly owned and run for the common good, while completely protecting free speech and voting rights.",
      "pillars": [
        "🗳️ Democracy first: All social changes happen through democratic votes and elections.",
        "🏥 Public essentials: Crucial services like healthcare are run for people, not profit.",
        "⚖️ Tax the ultra-wealthy: High taxes on large fortunes to fund public schools and hospitals."
      ],
      "examplePerson": "Jawaharlal Nehru",
      "simpleTitle": "Democratic Public Welfare"
    },
    "hi": {
      "title": "लोकतांत्रिक समाजवाद",
      "desc": "आप क्रांति से नहीं, चुनावों के ज़रिए पूँजीवाद से आगे बढ़ना चाहते हैं: अहम उद्योगों पर सार्वजनिक स्वामित्व, मज़बूत यूनियन और सबके लिए कल्याण, पूरे लोकतंत्र के साथ।",
      "good": {
        "name": "क्लेमेंट एटली की सरकार",
        "when": "ब्रिटेन · 1945–1951",
        "text": "सबके लिए मुफ़्त राष्ट्रीय स्वास्थ्य सेवा (NHS) शुरू की और ग़रीब परिवारों के लिए मुफ़्त शिक्षा व पेंशन की व्यवस्था बनाई।"
      },
      "bad": {
        "name": "वेनेज़ुएला की आर्थिक तबाही",
        "when": "वेनेज़ुएला · 1999 से अब तक",
        "text": "निजी कारोबार छीनने और अंधाधुंध नोट छापने से बाज़ार में सामान ख़त्म हो गया और लाखों लोगों को देश छोड़कर भागना पड़ा।"
      },
      "layman": "लोकतांत्रिक चुनावों के ज़रिए समाज में बराबरी लाने की सोच। इसका मानना है कि अस्पताल, स्कूल, बिजली, पानी और परिवहन जैसी बुनियादी सुविधाएँ मुनाफ़ा कमाने के लिए नहीं, बल्कि आम जनता की सेवा के लिए सरकार चलाए, जबकि हर नागरिक की लोकतांत्रिक आज़ादी पूरी तरह सुरक्षित रहे।",
      "pillars": [
        "🗳️ लोकतंत्र सर्वोपरि: सारे बदलाव निष्पक्ष चुनावों और संविधान के दायरे में होते हैं।",
        "🏥 बुनियादी सुविधाएँ मुफ़्त: स्वास्थ्य और शिक्षा मुनाफ़ा कमाने का साधन नहीं होनी चाहिए।",
        "⚖️ अमीरों पर टैक्स: बड़ी दौलत पर टैक्स लगाकर आम जनता के लिए बेहतरीन सेवाएँ तैयार करना।"
      ],
      "examplePerson": "जवाहरलाल नेहरू",
      "simpleTitle": "वोट से बराबरी"
    }
  },
  {
    "key": "socdem",
    "emoji": "🤝",
    "pos": [
      -45,
      -40,
      -30,
      -35
    ],
    "en": {
      "title": "Social Democracy",
      "desc": "You support a market economy, balanced by higher taxes on the wealthy, strong workers' rights and universal public services like healthcare and education.",
      "good": {
        "name": "Sweden's welfare model",
        "when": "Sweden · 1930s–1970s",
        "text": "Allowed private business to thrive while taxes funded top-quality free schools, colleges, and healthcare for all."
      },
      "bad": {
        "name": "Sri Lanka's freebie bankruptcy",
        "when": "Sri Lanka · 2019–2022",
        "text": "Promised endless freebies, tax cuts, and cheap goods without money to pay for them, leading to no petrol, power cuts, and bankruptcy."
      },
      "layman": "The popular Nordic model (like Sweden, Norway, and Denmark). It encourages private businesses and entrepreneurs to build wealth, but uses taxes and strong laws to provide free healthcare, world-class schools, paid leave, and strong pensions so that no one falls into extreme poverty.",
      "pillars": [
        "🏪 Pro-business: Private enterprise and market competition create wealth and innovation.",
        "🛡️ Ironclad safety net: Universal free healthcare, free schooling, and generous pensions.",
        "🤝 Strong worker rights: Fair labor laws and unions protect employees from exploitation."
      ],
      "examplePerson": "Arvind Kejriwal",
      "simpleTitle": "Welfare Capitalism"
    },
    "hi": {
      "title": "सामाजिक लोकतंत्र",
      "desc": "आप बाज़ार अर्थव्यवस्था का समर्थन करते हैं, लेकिन ऐसी जिसमें अमीरों पर ऊँचे टैक्स, मज़दूरों के मज़बूत अधिकार, और स्वास्थ्य व शिक्षा जैसी सार्वजनिक सेवाएँ सबके लिए हों।",
      "good": {
        "name": "स्वीडन का कल्याणकारी मॉडल",
        "when": "स्वीडन · 1930–1970 का दशक",
        "text": "निजी उद्यम को फलने-फूलने दिया और टैक्स की कमाई से हर नागरिक को मुफ़्त व बेहतरीन स्कूल, कॉलेज और इलाज उपलब्ध कराया।"
      },
      "bad": {
        "name": "श्रीलंका का दिवालियापन",
        "when": "श्रीलंका · 2019–2022",
        "text": "ख़ज़ाने में पैसा न होने पर भी मुफ़्त बिजली, सस्ता राशन और भारी छूट बाँटते रहे; नतीजा यह हुआ कि देश दिवालिया हो गया और पेट्रोल तक ख़त्म हो गया।"
      },
      "layman": "यह नॉर्डिक देशों (जैसे स्वीडन, नॉर्वे और डेनमार्क) का मॉडल है। यहाँ निजी कारोबार और कंपनियों को पूरी छूट होती है ताकि देश दौलतमंद बने, लेकिन अमीरों पर टैक्स लगाकर सबको मुफ़्त इलाज, बेहतरीन स्कूल, पेंशन और सुरक्षा घेरा दिया जाता है ताकि कोई लाचार न रहे।",
      "pillars": [
        "🏪 व्यापार को बढ़ावा: निजी उद्यम और बाज़ार तरक़्क़ी और रोज़गार पैदा करते हैं।",
        "🛡️ अटूट सुरक्षा घेरा: मुफ़्त इलाज, मुफ़्त शिक्षा और बुढ़ापे में पेंशन की गारंटी।",
        "🤝 कामगारों के अधिकार: मज़बूत यूनियनें और कड़े नियम कामगारों के हितों की रक्षा करते हैं।"
      ],
      "examplePerson": "अरविंद केजरीवाल",
      "simpleTitle": "कमाई प्राइवेट, सुविधाएँ मुफ़्त"
    }
  },
  {
    "key": "progressive",
    "emoji": "🌱",
    "pos": [
      -25,
      -65,
      -55,
      -50
    ],
    "en": {
      "title": "Progressive Liberalism",
      "desc": "You champion equal rights, personal freedom and social justice, with a regulated market and a solid safety net. You're open to change and to the wider world.",
      "good": {
        "name": "Eleanor Roosevelt",
        "when": "USA & UN · 1946–1948",
        "text": "Helped write the world's first global agreement stating that every human being is born free and equal."
      },
      "bad": {
        "name": "Extreme 'cancel culture' & intolerance",
        "when": "USA · 2015 onwards",
        "text": "Good intentions went too far, with students shouting down speakers, getting people fired for differing views, and creating toxic division."
      },
      "layman": "A forward-looking philosophy focused on expanding human rights, modernizing social norms, and protecting the climate. Believes that society should move beyond outdated prejudices, protect minority rights, and regulate big corporations so they do not abuse workers or pollute the planet.",
      "pillars": [
        "🌈 Equal rights: Social justice, equal opportunity, and inclusion for every community.",
        "🌿 Green future: Tackling climate change through clean energy and environmental protection.",
        "🛡️ Regulated capitalism: Keeping markets competitive while protecting consumers and workers."
      ],
      "examplePerson": "Dr. B.R. Ambedkar",
      "simpleTitle": "Modern Rights & Equality"
    },
    "hi": {
      "title": "प्रगतिशील उदारवाद",
      "desc": "आप बराबर अधिकारों, व्यक्तिगत आज़ादी और सामाजिक न्याय के पक्षधर हैं, साथ में नियंत्रित बाज़ार और मज़बूत सामाजिक सुरक्षा चाहते हैं। आप बदलाव और बाक़ी दुनिया के लिए खुले हैं।",
      "good": {
        "name": "एलेनोर रूज़वेल्ट",
        "when": "अमेरिका और संयुक्त राष्ट्र · 1946–1948",
        "text": "उस ऐतिहासिक दस्तावेज़ को तैयार कराया जिसने पहली बार दुनिया को बताया कि हर इंसान बराबर और आज़ाद पैदा हुआ है।"
      },
      "bad": {
        "name": "कट्टर 'कैंसिल कल्चर' और असहिष्णुता",
        "when": "अमेरिका · 2015 से",
        "text": "सामाजिक सुधार की अच्छी नीयत इतनी कट्टर हो गई कि अलग विचार रखने वालों की बोलती बंद की जाने लगी और समाज में नफ़रत बढ़ गई।"
      },
      "layman": "समान अधिकारों, आधुनिक सामाजिक सोच और पर्यावरण संरक्षण पर ज़ोर। यह पुरानी रूढ़ियों को तोड़कर हर व्यक्ति की आज़ादी, अल्पसंख्यकों और महिलाओं के समान अधिकार और पर्यावरण की रक्षा चाहता है। इसका मानना है कि कंपनियों की मनमानी रोकने के लिए निष्पक्ष नियम ज़रूरी हैं।",
      "pillars": [
        "🌈 सामाजिक न्याय: हर वर्ग, धर्म और महिला-पुरुष के लिए एक समान अधिकार और सम्मान।",
        "🌿 पर्यावरण की रक्षा: साफ़ ऊर्जा और प्रदूषण रोकने के लिए सख़्त नियम।",
        "🛡️ निष्पक्ष बाज़ार: कंपनियों की मनमानी रोकना और आम उपभोक्ताओं के हितों की हिफ़ाज़त।"
      ],
      "examplePerson": "डॉ. बी.आर. अम्बेडकर",
      "simpleTitle": "नई सोच और बराबरी"
    }
  },
  {
    "key": "gandhian",
    "emoji": "🕊️",
    "pos": [
      -35,
      15,
      -60,
      -5
    ],
    "en": {
      "title": "Gandhian Sarvodaya",
      "desc": "You believe in non-violence, self-reliant village communities, simple living and the welfare of all (sarvodaya). You want power decentralised, and the rich to act as trustees of their wealth.",
      "good": {
        "name": "Mahatma Gandhi's freedom struggle",
        "when": "India · 1915–1947",
        "text": "United millions through non-violent protest to win independence, inspiring equality movements worldwide."
      },
      "bad": {
        "name": "The Bhoodan movement's flaws",
        "when": "India · 1951–1970s",
        "text": "Vinoba Bhave asked landlords to gift land to the poor, but much of what was donated was rocky, barren, tied up in court, or never handed over."
      },
      "layman": "Mahatma Gandhi’s philosophy of Sarvodaya (universal well-being and upliftment of all). It envisions self-reliant local villages, eco-friendly handicrafts, decentralised local governance (Gram Swaraj), non-violence (Ahimsa), and the moral idea that the rich should act as caretakers (trustees) of their wealth for the poor.",
      "pillars": [
        "🕊️ Non-violence (Ahimsa): Resolving conflicts through dialogue, truth, and peace.",
        "🏡 Gram Swaraj: Empowering local village panchayats rather than distant capitals.",
        "🌾 Simple living & trusteeship: Ethical limits on greed; the rich use wealth to help society."
      ],
      "examplePerson": "Mahatma Gandhi",
      "simpleTitle": "Village Self-Rule & Ahimsa"
    },
    "hi": {
      "title": "गांधीवादी सर्वोदय",
      "desc": "आप अहिंसा, आत्मनिर्भर ग्राम-समुदायों, सादे जीवन और सबके कल्याण (सर्वोदय) में विश्वास करते हैं। आप सत्ता का विकेंद्रीकरण चाहते हैं, और चाहते हैं कि अमीर अपनी दौलत के ट्रस्टी की तरह व्यवहार करें।",
      "good": {
        "name": "महात्मा गांधी का स्वतंत्रता संग्राम",
        "when": "भारत · 1915–1947",
        "text": "अहिंसा के दम पर करोड़ों लोगों को एकजुट कर आज़ादी दिलाई और दुनिया भर में नागरिक अधिकारों की लड़ाई को प्रेरित किया।"
      },
      "bad": {
        "name": "भूदान आंदोलन की विफलता",
        "when": "भारत · 1951–1970 का दशक",
        "text": "विनोबा भावे ने ज़मींदारों से ग़रीबों के लिए ज़मीन दान माँगी, लेकिन बड़ा हिस्सा बंजर या विवादित निकला और असल में ग़रीबों को बहुत कम मिला।"
      },
      "layman": "महात्मा गांधी का सर्वोदय दर्शन, जिसका अर्थ है सबका कल्याण और सबका उत्थान। यह आत्मनिर्भर गाँवों, खादी और कुटीर उद्योग, ग्राम स्वराज (स्थानीय स्वशासन), अहिंसा और इस सोच पर आधारित है कि अमीर लोग अपनी संपत्ति को जनता की अमानत (ट्रस्टीशिप) समझें।",
      "pillars": [
        "🕊️ सत्य और अहिंसा: हर विवाद का हल शांति, संवाद और नैतिक आचरण से निकालना।",
        "🏡 ग्राम स्वराज: सत्ता दिल्ली में केंद्रित न हो, बल्कि गाँव और मोहल्ले के हाथ में हो।",
        "🌾 सादा जीवन और ट्रस्टीशिप: सादगी से जीना और अतिरिक्त दौलत को कमज़ोरों की मदद में लगाना।"
      ],
      "examplePerson": "महात्मा गांधी",
      "simpleTitle": "अहिंसा और ग्राम स्वराज"
    }
  },
  {
    "key": "centrist",
    "emoji": "⚖️",
    "pos": [
      0,
      0,
      0,
      -5
    ],
    "en": {
      "title": "Centrism",
      "desc": "You take a balanced, pragmatic view and judge each issue on its merits rather than by ideology. You prefer gradual reform, compromise and solutions that work.",
      "good": {
        "name": "Brazil's Plano Real",
        "when": "Brazil · 1994",
        "text": "Pragmatic leaders put politics aside to end runaway inflation that had passed 2,000% a year, bringing price stability to poor families."
      },
      "bad": {
        "name": "India's coalition 'policy paralysis'",
        "when": "India · 2011–2014",
        "text": "Trying to please too many coalition partners meant nobody took tough decisions, stalling roads and projects, and frustrating the public."
      },
      "layman": "The pragmatic common-sense middle ground. Centrists do not blindly follow rigid left-wing or right-wing doctrines. Instead, they ask: What practical policy actually works best in real life? They prefer sensible compromises, steady reform, and balancing economic growth with social safety.",
      "pillars": [
        "⚖️ Practical solutions: Choosing ideas that work, whether they come from the left or right.",
        "🔄 Gradual progress: Fixing problems step-by-step rather than risking chaotic disruptions.",
        "🤝 Balanced approach: Supporting business growth while keeping essential public services working."
      ],
      "examplePerson": "P.V. Narasimha Rao",
      "simpleTitle": "The Pragmatic Middle Path"
    },
    "hi": {
      "title": "मध्यमार्ग",
      "desc": "आप संतुलित और व्यावहारिक नज़रिया रखते हैं, और हर मुद्दे को विचारधारा से नहीं, उसकी ख़ूबियों से परखते हैं। आप धीरे-धीरे सुधार, समझौते और काम करने वाले समाधान पसंद करते हैं।",
      "good": {
        "name": "ब्राज़ील का 'प्लानो रियल'",
        "when": "ब्राज़ील · 1994",
        "text": "राजनीति छोड़कर व्यावहारिक नीतियों पर ध्यान दिया और 2,000% सालाना वाली भयंकर महँगाई को ख़त्म कर ग़रीबों को राहत दी।"
      },
      "bad": {
        "name": "गठबंधन की नीतिगत पंगुता (पॉलिसी पैरालिसिस)",
        "when": "भारत · 2011–2014",
        "text": "गठबंधन के सभी दलों को ख़ुश रखने के चक्कर में बड़े फ़ैसले टलते रहे, विकास परियोजनाएँ अटक गईं और शासन ठप पड़ गया।"
      },
      "layman": "व्यावहारिक और संतुलित बीच का रास्ता। मध्यमार्गी किसी भी कट्टर विचारधारा के पीछे नहीं भागते। वे ज़मीनी हक़ीक़त देखकर पूछते हैं: असल ज़िंदगी में कौन सा उपाय सबसे बेहतर काम करेगा? वे हंगामे और उथल-पुथल के बजाय समझदारी, समझौते और स्थिर सुधारों पर भरोसा करते हैं।",
      "pillars": [
        "⚖️ व्यावहारिक सोच: विचारधारा की हठधर्मिता छोड़कर ज़मीनी समाधान चुनना।",
        "🔄 सँभलकर सुधार: समाज को बिना नुक़सान पहुँचाए समझदारी से आगे बढ़ाना।",
        "🤝 संतुलन: व्यापारिक तरक़्क़ी और जनता की भलाई दोनों के बीच तालमेल।"
      ],
      "examplePerson": "पी.वी. नरसिम्हा राव",
      "simpleTitle": "बीच का रास्ता"
    }
  },
  {
    "key": "classical",
    "emoji": "📜",
    "pos": [
      55,
      -25,
      -60,
      -35
    ],
    "en": {
      "title": "Classical Liberalism",
      "desc": "You believe in individual liberty, free markets, free trade and the rule of law, with a limited government that protects rights rather than running people's lives.",
      "good": {
        "name": "C. Rajagopalachari's Swatantra Party",
        "when": "India · 1959–1974",
        "text": "Rajaji warned early that excessive government permits and red tape would choke business, demanding open enterprise decades before the 1991 reforms."
      },
      "bad": {
        "name": "The Bengal Famine of 1943",
        "when": "British India · 1943",
        "text": "British rulers refused to stop food hoarding or regulate grain markets during wartime, leading to nearly 3 million Indians starving to death."
      },
      "layman": "The traditional philosophy of personal liberty that inspired modern democracies. It holds that the government exists only to protect your life, property, and freedom from violence or theft. Beyond that, individuals should be completely free to trade, innovate, and live their lives without state interference.",
      "pillars": [
        "📜 Rule of law: Clear, equal laws that protect individual freedom and contracts.",
        "🏪 Free enterprise: Low taxes, free trade, open markets, and minimal bureaucracy.",
        "🛑 Limited government: The state defends rights and borders, but does not run private lives."
      ],
      "examplePerson": "C. Rajagopalachari",
      "simpleTitle": "Free Enterprise & Small State"
    },
    "hi": {
      "title": "शास्त्रीय उदारवाद",
      "desc": "आप व्यक्तिगत आज़ादी, मुक्त बाज़ार, मुक्त व्यापार और क़ानून के शासन में विश्वास करते हैं, और ऐसी सीमित सरकार चाहते हैं जो लोगों की ज़िंदगी चलाने की बजाय उनके अधिकारों की रक्षा करे।",
      "good": {
        "name": "राजाजी की स्वतंत्र पार्टी",
        "when": "भारत · 1959–1974",
        "text": "राजाजी ने दशकों पहले चेताया था कि परमिट-लाइसेंस राज से धंधे चौपट होंगे; उन्होंने खुली अर्थव्यवस्था की वकालत की जो भारत ने 1991 में अपनाई।"
      },
      "bad": {
        "name": "1943 का बंगाल अकाल",
        "when": "ब्रिटिश भारत · 1943",
        "text": "अंग्रेजी हुकूमत ने बाज़ार में जमाख़ोरी रोकने या अनाज बाँटने से इनकार कर दिया, जिसके चलते लगभग 30 लाख निर्दोष भारतीय भूख से तड़पकर मर गए।"
      },
      "layman": "व्यक्तिगत स्वतंत्रता का मूल दर्शन जिसने आधुनिक लोकतंत्रों की नींव रखी। इसका मानना है कि सरकार का काम केवल नागरिकों की जान-माल और आज़ादी की रक्षा करना है। इसके अलावा लोगों को अपनी मर्ज़ी से कमाने, व्यापार करने और बिना सरकारी अड़चनों के जीने की पूरी छूट होनी चाहिए।",
      "pillars": [
        "📜 क़ानून का राज: निष्पक्ष न्याय व्यवस्था और हर व्यक्ति के अधिकारों की हिफ़ाज़त।",
        "🏪 मुक्त व्यापार: कम टैक्स, खुली प्रतियोगिता और कारोबार में सरकारी दख़ल न होना।",
        "🛑 सीमित सरकार: सरकार क़ानून और सुरक्षा देखे, लोगों की ज़िंदगी चलाना उसका काम नहीं।"
      ],
      "examplePerson": "सी. राजगोपालाचारी",
      "simpleTitle": "खुला व्यापार, कम सरकार"
    }
  },
  {
    "key": "libertarian",
    "emoji": "🗽",
    "pos": [
      80,
      -40,
      -85,
      -25
    ],
    "en": {
      "title": "Libertarianism",
      "desc": "You value freedom above all, in the market and in personal life. You want low taxes, free enterprise and a government that stays out of both your wallet and your private life.",
      "good": {
        "name": "Estonia's digital reforms",
        "when": "Estonia · 1992 onwards",
        "text": "Zero red tape, simple taxes, and quick online government created a booming tech scene that gave the world Skype."
      },
      "bad": {
        "name": "US private healthcare & opioid crisis",
        "when": "USA · 1990s–2020s",
        "text": "Lack of government rules allowed private pharma firms to push addictive painkillers for profit, while medical bills bankrupt regular families."
      },
      "layman": "Maximum personal and economic freedom, with minimal government control. Libertarians believe you own your own body, time, and money. As long as you are not physically harming others or stealing, the government has no right to tell you how to live or take your hard-earned income.",
      "pillars": [
        "🗽 Maximum liberty: Complete freedom in personal choices, lifestyle, and speech.",
        "💸 Drastically low taxes: Slashing government bureaucracy, spending, and regulations.",
        "🤝 Voluntary agreements: Society runs entirely on free-market transactions and mutual consent."
      ],
      "examplePerson": "Sharad Joshi",
      "simpleTitle": "Maximum Personal Freedom"
    },
    "hi": {
      "title": "स्वतंत्रतावाद (लिबर्टेरियनिज़्म)",
      "desc": "आप हर चीज़ से ऊपर आज़ादी को महत्व देते हैं, बाज़ार में भी और निजी जीवन में भी। आप कम टैक्स, मुक्त उद्यम, और ऐसी सरकार चाहते हैं जो न आपकी जेब में दख़ल दे, न आपकी निजी ज़िंदगी में।",
      "good": {
        "name": "एस्टोनिया के डिजिटल सुधार",
        "when": "एस्टोनिया · 1992 से",
        "text": "कम टैक्स, बिना किसी अड़चन के सरकारी काम और पूरी तरह डिजिटल व्यवस्था से ऐसी टेक कंपनियाँ निकलीं जिन्होंने स्काइप जैसा उत्पाद बनाया।"
      },
      "bad": {
        "name": "अमेरिका का महँगा इलाज और दवा संकट",
        "when": "अमेरिका · 1990–2020 का दशक",
        "text": "सरकारी निगरानी न होने से फ़ार्मा कंपनियों ने मुनाफ़े के लिए नशे वाली दर्दनिवारक दवाएँ बेचीं, और अस्पताल के बिल आम परिवारों को कंगाल करते रहे।"
      },
      "layman": "पूरी व्यक्तिगत आज़ादी और नाममात्र की सरकार। स्वतंत्रतावादी मानते हैं कि आपकी कमाई, आपका शरीर और आपकी ज़िंदगी सिर्फ़ आपकी है। जब तक आप किसी दूसरे को नुक़सान नहीं पहुँचाते, सरकार को न आपके पैसे पर ज़्यादा टैक्स लगाने का हक़ है, न आपकी निजी ज़िंदगी में दख़ल देने का।",
      "pillars": [
        "🗽 व्यक्तिगत स्वतंत्रता: बोलने, जीने और अपनी संपत्ति के उपयोग की पूरी छूट।",
        "💸 बेहद कम टैक्स: सरकारी अफ़सरशाही और फ़िज़ूलख़र्ची को लगभग ख़त्म करना।",
        "🤝 स्वैच्छिक सहमति: समाज आपसी समझ और व्यापार से चले, सरकारी डंडे से नहीं।"
      ],
      "examplePerson": "शरद जोशी",
      "simpleTitle": "पूरी आज़ादी, कम टैक्स"
    }
  },
  {
    "key": "libcon",
    "emoji": "🏛️",
    "pos": [
      45,
      30,
      10,
      15
    ],
    "en": {
      "title": "Liberal Conservatism",
      "desc": "You combine free-market economics with respect for tradition, family and established institutions. You favour stability, gradual change and a strong but limited state.",
      "good": {
        "name": "Konrad Adenauer",
        "when": "West Germany · 1949–1963",
        "text": "Helped rebuild war-torn Germany with free enterprise and stable, traditional family values, turning it into a peaceful democracy."
      },
      "bad": {
        "name": "Pakistan's feudal elite rule",
        "when": "Pakistan · 1950s onwards",
        "text": "Rich landed families protected their status without building basic village schools or helping poor farmers escape poverty."
      },
      "layman": "A mix of pro-business economics and cultural stability. It strongly supports free enterprise, lower taxes, and private wealth creation, while placing deep value on family traditions, constitutional order, and the rule of law to keep society stable and peaceful.",
      "pillars": [
        "💼 Pro-market economy: Free markets, lower taxes, private investment, and rewarded hard work.",
        "🏛️ Cultural stability: Valuing family roots, civic duty, and tested institutions.",
        "🛡️ Cautious change: Improving society through tested, gradual reforms rather than abrupt upheavals."
      ],
      "examplePerson": "Atal Bihari Vajpayee",
      "simpleTitle": "Pro-Business with Traditions"
    },
    "hi": {
      "title": "उदार रूढ़िवाद",
      "desc": "आप मुक्त-बाज़ार अर्थशास्त्र को परंपरा, परिवार और स्थापित संस्थाओं के सम्मान के साथ जोड़ते हैं। आप स्थिरता, धीरे-धीरे बदलाव और मज़बूत लेकिन सीमित सरकार पसंद करते हैं।",
      "good": {
        "name": "कोनराड एडेनावर",
        "when": "पश्चिम जर्मनी · 1949–1963",
        "text": "युद्ध से तबाह जर्मनी को निजी बाज़ार और पारिवारिक मूल्यों के दम पर एक स्थिर, समृद्ध और शांत लोकतंत्र बनाया।"
      },
      "bad": {
        "name": "पाकिस्तान के ज़मींदार परिवारों का राज",
        "when": "पाकिस्तान · 1950 से अब तक",
        "text": "ताक़तवर ज़मींदार घरानों ने सत्ता पर कब्ज़ा रखा लेकिन न गाँव में स्कूल खोले और न किसानों को ग़रीबी के जाल से निकलने दिया।"
      },
      "layman": "कारोबारी आज़ादी और सांस्कृतिक स्थिरता का मेल। यह मानता है कि खुला बाज़ार और कम टैक्स देश में दौलत और रोज़गार लाते हैं, लेकिन समाज को सुरक्षित और अनुशासित रखने के लिए पारिवारिक संस्कार, सामाजिक मर्यादाएँ और क़ानून का राज बेहद ज़रूरी है।",
      "pillars": [
        "💼 कारोबार समर्थक: खुला बाज़ार, कम टैक्स और निजी उद्यम को पूरी आज़ादी।",
        "🏛️ सामाजिक स्थिरता: पारिवारिक मूल्य, सांस्कृतिक विरासत और संविधान का सम्मान।",
        "🛡️ सँभलकर सुधार: समाज को बिना हिलाए सोच-समझकर और धीरे-धीरे बदलाव लाना।"
      ],
      "examplePerson": "अटल बिहारी वाजपेयी",
      "simpleTitle": "कारोबार की छूट + संस्कार"
    }
  },
  {
    "key": "communitarian",
    "emoji": "🏘️",
    "pos": [
      -25,
      50,
      25,
      0
    ],
    "en": {
      "title": "Communitarianism",
      "desc": "You believe strong families, communities and shared moral values matter as much as individual rights, and that markets should serve the common good through welfare and fair wages. Europe's Christian Democrats belong to this tradition.",
      "good": {
        "name": "Europe's post-war Christian Democrats",
        "when": "Western Europe · 1945–1960s",
        "text": "Rebuilt broken societies by putting family values, community care, and worker safety ahead of pure profit."
      },
      "bad": {
        "name": "Khap Panchayats & honour killings",
        "when": "India · 1980s onwards",
        "text": "Village caste councils put 'community honour' above individual freedom, punishing inter-caste marriages and even ordering murders."
      },
      "layman": "Believes people are social beings whose well-being depends on strong families, supportive neighborhoods, and shared ethical values—not just isolated individuals chasing money. It emphasizes that with every civil right comes a personal duty to help your local community, and that businesses must serve the common good.",
      "pillars": [
        "🏘️ Community first: Strengthening family bonds, local charities, and civic responsibility.",
        "⚖️ Rights paired with duties: Citizens have an obligation to care for neighbours and society.",
        "🤝 Ethical economy: Fair living wages and businesses that respect local communities."
      ],
      "examplePerson": "Nanaji Deshmukh",
      "simpleTitle": "Community & Duty First"
    },
    "hi": {
      "title": "समुदायवाद",
      "desc": "आप मानते हैं कि मज़बूत परिवार, समुदाय और साझा नैतिक मूल्य उतने ही अहम हैं जितने व्यक्तिगत अधिकार, और बाज़ार को कल्याण योजनाओं और उचित मज़दूरी के ज़रिए सबकी भलाई करनी चाहिए। यूरोप के ईसाई लोकतंत्रवादी इसी परंपरा के हैं।",
      "good": {
        "name": "युद्ध के बाद यूरोप के ईसाई लोकतंत्रवादी",
        "when": "पश्चिमी यूरोप · 1945–1960 का दशक",
        "text": "सिर्फ़ मुनाफ़े की जगह परिवार, सामाजिक भाईचारे और मज़दूरों की भलाई को आगे रखकर युद्ध में टूटे यूरोप को फिर से जोड़ा।"
      },
      "bad": {
        "name": "खाप पंचायतें और ऑनर किलिंग",
        "when": "भारत · 1980 के दशक से",
        "text": "जाति पंचायतों ने 'समाज की इज़्ज़त' के नाम पर युवाओं की आज़ादी छीनी, अपनी पसंद से शादी करने वालों का हुक़्क़ा-पानी बंद किया और हत्याएँ कराईं।"
      },
      "layman": "यह सोच मानती है कि इंसान केवल अकेला व्यक्ति नहीं है; उसकी ख़ुशी मज़बूत परिवार, पड़ोस और नैतिक मूल्यों पर टिकी है। केवल अपने हक़ माँगने के बजाय समाज और पड़ोसियों के प्रति अपनी ज़िम्मेदारी निभाना भी उतना ही ज़रूरी है, और व्यापार को भी सबकी भलाई के लिए काम करना चाहिए।",
      "pillars": [
        "🏘️ परिवार और समाज पहले: आपसी रिश्तों, पड़ोस और भाईचारे को मज़बूत करना।",
        "⚖️ हक़ और ज़िम्मेदारी: अधिकारों के साथ-साथ समाज की सेवा का कर्तव्य।",
        "🤝 नैतिक बाज़ार: उचित मज़दूरी और ऐसी कंपनियाँ जो समाज का सम्मान करें।"
      ],
      "examplePerson": "नानाजी देशमुख",
      "simpleTitle": "परिवार और समाज पहले"
    }
  },
  {
    "key": "conservative",
    "emoji": "🏰",
    "pos": [
      30,
      70,
      45,
      40
    ],
    "en": {
      "title": "Traditional Conservatism",
      "desc": "You believe in preserving religion, family, cultural heritage and social order. You distrust rapid change and see inherited institutions as the foundation of a good society.",
      "good": {
        "name": "Edmund Burke",
        "when": "Britain · 1729–1797",
        "text": "Warned that tearing down ancient culture, religion, and laws overnight brings chaos and mob rule rather than real freedom."
      },
      "bad": {
        "name": "Zia-ul-Haq's religious hardline rule",
        "when": "Pakistan · 1977–1988",
        "text": "Used strict religious laws to stay in power, stripping rights from women and minorities and spreading radical extremism across society."
      },
      "layman": "Values time-tested traditions, moral principles, religious heritage, and cultural roots over trendy new experiments. It believes human civilization takes centuries to build, so hastily tearing down long-standing customs, families, or institutions leads to social disorder and decay.",
      "pillars": [
        "🏰 Preserving cultural heritage: Protecting ancestral traditions, religion, and social customs.",
        "🛡️ Law, order, and stability: Respect for established authority, family structures, and moral order.",
        "⏳ Skeptical of rapid change: Changes should be slow and cautious to prevent unintended damage."
      ],
      "examplePerson": "Yogi Adityanath",
      "simpleTitle": "Preserving Religious Heritage"
    },
    "hi": {
      "title": "पारंपरिक रूढ़िवाद",
      "desc": "आप धर्म, परिवार, सांस्कृतिक विरासत और सामाजिक व्यवस्था को बचाए रखने में विश्वास करते हैं। आप तेज़ बदलाव पर भरोसा नहीं करते और विरासत में मिली संस्थाओं को अच्छे समाज की नींव मानते हैं।",
      "good": {
        "name": "एडमंड बर्क",
        "when": "ब्रिटेन · 1729–1797",
        "text": "चेतावनी दी थी कि पुरानी संस्कृति, धर्म और व्यवस्था को रातोंरात नष्ट करने से आज़ादी नहीं, बल्कि अराजकता और ख़ूनी दौर आता है।"
      },
      "bad": {
        "name": "ज़िया-उल-हक़ की कट्टरपंथी हुकूमत",
        "when": "पाकिस्तान · 1977–1988",
        "text": "सख्त धार्मिक क़ानून थोपकर औरतों व अल्पसंख्यकों के हक़ छीने और समाज में ऐसी नफ़रत व कट्टरता फैलाई जो आज तक नहीं मिटी।"
      },
      "layman": "सदियों पुरानी परंपराओं, धर्म, पारिवारिक मूल्यों और सांस्कृतिक जड़ों को नए प्रयोगों से ज़्यादा अहमियत देना। इसका मानना है कि सभ्यता को बनने में सदियों लगते हैं; अगर हम जल्दबाज़ी में अपनी परंपराओं और मर्यादाओं को तोड़ देंगे, तो समाज बिखर जाएगा।",
      "pillars": [
        "🏰 सांस्कृतिक धरोहर: धर्म, परंपराओं और पुरखों की विरासत को बचाए रखना।",
        "🛡️ अनुशासन और व्यवस्था: क़ानून का सख़्त पालन और सामाजिक मर्यादाएँ।",
        "⏳ जल्दबाज़ी से परहेज़: अचानक लाए जाने वाले क्रांतिकारी बदलावों पर गहरा अविश्वास।"
      ],
      "examplePerson": "योगी आदित्यनाथ",
      "simpleTitle": "धर्म और संस्कृति की रक्षा"
    }
  },
  {
    "key": "leftnat",
    "emoji": "📣",
    "pos": [
      -55,
      35,
      40,
      60
    ],
    "en": {
      "title": "Left-Wing Nationalism",
      "desc": "You want a strong state that protects ordinary people from big business and foreign powers, combining welfare and state-led growth with national pride and unity.",
      "good": {
        "name": "Gamal Abdel Nasser",
        "when": "Egypt · 1954–1970",
        "text": "Took back the Suez Canal from foreign control, broke up big landlord estates, and gave free education to poor kids."
      },
      "bad": {
        "name": "The Emergency in India",
        "when": "India · 1975–1977",
        "text": "In the name of the nation and poor, the government locked up opposition leaders, silenced the media, and forced men into mass sterilisation camps."
      },
      "layman": "A patriotic movement that fights for working-class citizens against global monopolies and foreign economic dominance. It combines national sovereignty and pride with state-run infrastructure, domestic manufacturing, and generous public welfare so the nation’s wealth stays with its own people.",
      "pillars": [
        "📣 Domestic self-reliance: Protecting local jobs and natural resources from foreign exploitation.",
        "🏭 Pro-worker state: Government invests heavily in national industries and workers wages.",
        "🛡️ Universal public services: State-funded free healthcare, education, and pensions for all citizens."
      ],
      "examplePerson": "Bhagat Singh",
      "simpleTitle": "Patriotic Worker Power"
    },
    "hi": {
      "title": "वामपंथी राष्ट्रवाद",
      "desc": "आप एक मज़बूत सरकार चाहते हैं जो आम लोगों को बड़ी कंपनियों और विदेशी ताक़तों से बचाए, और कल्याण व सरकार के नेतृत्व वाले विकास को राष्ट्रीय गौरव और एकता के साथ जोड़े।",
      "good": {
        "name": "जमाल अब्दुल नासिर",
        "when": "मिस्र · 1954–1970",
        "text": "स्वेज़ नहर को विदेशी कब्ज़े से आज़ाद कराया, बड़ी जागीरें ग़रीबों में बाँटीं और हर बच्चे के लिए मुफ़्त शिक्षा शुरू की।"
      },
      "bad": {
        "name": "भारत में 1975 का आपातकाल",
        "when": "भारत · 1975–1977",
        "text": "देश और ग़रीबों के नाम पर विपक्ष को जेलों में ठूँसा गया, अख़बारों की आवाज़ दबाई गई और ग़रीबों की जबरन नसबंदी कराई गई।"
      },
      "layman": "एक देशभक्त सोच जो आम कामगारों और देश के संसाधनों को विदेशी कंपनियों और बड़े पूंजीपतियों के शोषण से बचाती है। यह राष्ट्रीय स्वावलंबन (आत्मनिर्भरता), सरकारी नौकरियों और मुफ़्त जन-कल्याण को अपने देश के स्वाभिमान के साथ जोड़ती है।",
      "pillars": [
        "📣 राष्ट्रीय आत्मनिर्भरता: देश के संसाधनों और नौकरियों को विदेशी दबाव से बचाना।",
        "🏭 कामगारों का समर्थन: घरेलू उद्योगों को सरकारी बढ़ावा और उचित वेतन।",
        "🛡️ मुफ़्त सार्वजनिक सेवाएँ: हर नागरिक के लिए स्वास्थ्य, शिक्षा और सामाजिक सुरक्षा।"
      ],
      "examplePerson": "भगत सिंह",
      "simpleTitle": "देशभक्त मज़दूर राज"
    }
  },
  {
    "key": "natcon",
    "emoji": "🦅",
    "pos": [
      25,
      60,
      45,
      70
    ],
    "en": {
      "title": "National Conservatism",
      "desc": "You put the nation first: strong borders, national sovereignty, traditional culture and firm government, with a market economy that serves the national interest.",
      "good": {
        "name": "Charles de Gaulle",
        "when": "France · 1958–1969",
        "text": "Ended years of weak, messy politics, brought stability, and ensured France remained proud, independent, and globally respected."
      },
      "bad": {
        "name": "Pakistan's 1971 oppression in East Pakistan",
        "when": "Pakistan · 1971",
        "text": "Military rulers tried to crush Bengali culture, language, and election wins, sparking a bloody war and splitting their country in two."
      },
      "layman": "Puts the nation-state, its cultural heritage, and its borders first. Highly skeptical of global organizations or foreign treaties that weaken local democracy. Believes in a proud, sovereign country with secure borders, strong defense, and a market economy that prioritizes domestic workers.",
      "pillars": [
        "🦅 Strong borders & sovereignty: Securing borders and making national decisions without foreign interference.",
        "🏛️ Pride in national identity: Cherishing national history, language, and traditional culture.",
        "💼 Economy for the nation: Protecting domestic factories and prioritizing local jobs over outsourcing."
      ],
      "examplePerson": "Narendra Modi",
      "simpleTitle": "Nation First"
    },
    "hi": {
      "title": "राष्ट्रीय रूढ़िवाद",
      "desc": "आप राष्ट्र को सबसे पहले रखते हैं: मज़बूत सीमाएँ, राष्ट्रीय संप्रभुता, पारंपरिक संस्कृति और सख़्त सरकार, और ऐसी बाज़ार अर्थव्यवस्था जो राष्ट्रीय हित में काम करे।",
      "good": {
        "name": "शार्ल द गॉल",
        "when": "फ़्रांस · 1958–1969",
        "text": "कमज़ोर सरकारों के दौर को ख़त्म कर मज़बूत संविधान बनाया और फ़्रांस को दुनिया में एक स्वाभिमानी व स्वतंत्र शक्ति बनाए रखा।"
      },
      "bad": {
        "name": "1971 में पूर्वी पाकिस्तान पर ज़ुल्म",
        "when": "पाकिस्तान · 1971",
        "text": "बंगाली भाषा, संस्कृति और चुनावी जनादेश को कुचलने के लिए सेना ने बर्बरता की, जिससे जंग छिड़ी और देश टूटकर दो टुकड़े हो गया।"
      },
      "layman": "राष्ट्र, उसकी सीमाओं और सांस्कृतिक पहचान को सबसे ऊपर रखना। यह अंतरराष्ट्रीय संस्थाओं के दख़ल और अनियंत्रित आव्रजन (घुसपैठ) के सख़्त ख़िलाफ़ रहता है। यह चाहता है कि सरकार अपनी सीमाओं, सुरक्षा और घरेलू कामगारों को हमेशा पहली प्राथमिकता दे।",
      "pillars": [
        "🦅 मज़बूत सीमाएँ व संप्रभुता: देश की सुरक्षा और सीमाओं पर पूरा नियंत्रण।",
        "🏛️ राष्ट्रीय अस्मिता: देश के इतिहास, संस्कृति और भाषा को गर्व से संजोना।",
        "💼 देशहित में अर्थव्यवस्था: घरेलू उद्योगों और स्थानीय कामगारों को प्राथमिकता।"
      ],
      "examplePerson": "नरेंद्र मोदी",
      "simpleTitle": "राष्ट्र प्रथम, मज़बूत सीमाएँ"
    }
  },
  {
    "key": "authcap",
    "emoji": "🏗️",
    "pos": [
      55,
      30,
      75,
      45
    ],
    "en": {
      "title": "Authoritarian Capitalism",
      "desc": "You believe a strong, disciplined government should drive rapid economic growth through business and markets, even if that means limits on dissent and democracy.",
      "good": {
        "name": "South Korea under Park Chung-hee",
        "when": "South Korea · 1961–1979",
        "text": "A strict leader pushed businesses into electronics and cars, pulling a poor country into first-world wealth in a single generation."
      },
      "bad": {
        "name": "China's digital police state",
        "when": "China · 2012 onwards",
        "text": "While big businesses make billions, the government uses cameras and apps to track citizens, locks down cities, and silences outspoken billionaires."
      },
      "layman": "A system where a strong, strict, and disciplined government teams up with private businesses to drive fast-track economic modernization. It offers rapid infrastructure growth, order, and business profits, but enforces tight limits on strikes, protests, and political opposition to avoid delays.",
      "pillars": [
        "🏗️ Fast-track economic growth: Huge infrastructure projects, rapid industrialization, and investor incentives.",
        "👮 Strict public discipline: Low tolerance for protests, political disorder, or labor disruption.",
        "💼 State-guided markets: Leaders set national economic goals while private companies build them."
      ],
      "examplePerson": "N. Chandrababu Naidu",
      "simpleTitle": "Strict Rule + Fast-Track Growth"
    },
    "hi": {
      "title": "सत्तावादी पूँजीवाद",
      "desc": "आप मानते हैं कि एक मज़बूत, अनुशासित सरकार को कारोबार और बाज़ार के ज़रिए तेज़ आर्थिक विकास कराना चाहिए, भले ही इसके लिए असहमति और लोकतंत्र पर कुछ पाबंदियाँ लगें।",
      "good": {
        "name": "दक्षिण कोरिया का आर्थिक चमत्कार",
        "when": "दक्षिण कोरिया · 1961–1979",
        "text": "सख्त अनुशासन से निजी कंपनियों को आगे बढ़ाया और एक ही पीढ़ी में एक बेहद ग़रीब देश को अमीर औद्योगिक ताक़त बना दिया।"
      },
      "bad": {
        "name": "चीन का डिजिटल निगरानी राज",
        "when": "चीन · 2012 से अब तक",
        "text": "कंपनियाँ तो खूब कमाती हैं, लेकिन सरकार कैमरों और फ़ोन से हर नागरिक पर नज़र रखती है और आवाज़ उठाने वाले उद्योगपतियों को ग़ायब कर देती है।"
      },
      "layman": "एक बेहद सख़्त और अनुशासनप्रिय सरकार जो निजी कारोबारियों और उद्योगों के साथ मिलकर देश को तेज़ी से आधुनिक और अमीर बनाती है। यहाँ सड़कें, बंदरगाह और कंपनियाँ तेज़ी से विकसित होती हैं, लेकिन क़ानून-व्यवस्था बनाए रखने के लिए विरोध-प्रदर्शनों और राजनीतिक विरोध पर कड़ा पहरा रहता है।",
      "pillars": [
        "🏗️ तीव्र औद्योगीकरण: बड़े प्रोजेक्ट्स और कारोबारियों को तेज़ी से आगे बढ़ने की छूट।",
        "👮 सख़्त क़ानून-व्यवस्था: अशांति, हड़तालों या अपराध के ख़िलाफ़ कठोर कार्रवाई।",
        "💼 निर्देशित पूँजीवाद: सरकार योजना बनाती है और निजी कंपनियाँ उसे धरातल पर उतारती हैं।"
      ],
      "examplePerson": "एन. चंद्रबाबू नायडू",
      "simpleTitle": "तेज़ विकास, सख़्त शासन"
    }
  },
  {
    "key": "authnat",
    "emoji": "⚔️",
    "pos": [
      15,
      85,
      95,
      95
    ],
    "en": {
      "title": "Authoritarian Nationalism",
      "desc": "You want a powerful state that puts national unity, order and tradition above individual rights and international cooperation. In its most extreme 20th-century form, this became fascism.",
      "good": {
        "name": "Otto von Bismarck",
        "when": "Germany · 1862–1890",
        "text": "Unified German states and created the world's very first government pensions and health insurance for workers."
      },
      "bad": {
        "name": "Hitler's Nazi Germany",
        "when": "Europe · 1933–1945",
        "text": "Extreme hatred of minorities, blind worship of a dictator, and senseless wars caused the murder of millions and destroyed the nation."
      },
      "layman": "Believes the supreme survival, honor, and unity of the nation matter far more than any individual rights. Demands unyielding loyalty to the state, building overwhelming military strength, and imposing strict social discipline to protect the nation against any internal or external adversaries.",
      "pillars": [
        "⚔️ Supreme state power: The government commands total authority for the glory of the nation.",
        "🚩 Fierce loyalty & discipline: Individual freedoms are subordinate to national unity and order.",
        "🛡️ Formidable military: Maximum defense spending and readiness against all perceived threats."
      ],
      "examplePerson": "Indira Gandhi (1975)",
      "simpleTitle": "Total State Supremacy"
    },
    "hi": {
      "title": "सत्तावादी राष्ट्रवाद",
      "desc": "आप एक ताक़तवर राज्य चाहते हैं जो राष्ट्रीय एकता, व्यवस्था और परंपरा को व्यक्तिगत अधिकारों और अंतरराष्ट्रीय सहयोग से ऊपर रखे। 20वीं सदी में इसका सबसे उग्र रूप फ़ासीवाद बना।",
      "good": {
        "name": "ओटो फ़ॉन बिस्मार्क",
        "when": "जर्मनी · 1862–1890",
        "text": "जर्मनी को एक राष्ट्र बनाया और दुनिया में सबसे पहले मज़दूरों के लिए सरकारी पेंशन व इलाज की व्यवस्था शुरू की।"
      },
      "bad": {
        "name": "हिटलर का नाज़ी शासन",
        "when": "यूरोप · 1933–1945",
        "text": "अल्पसंख्यकों से बेपनाह नफ़रत, तानाशाह की अंधी पूजा और युद्ध के पागलपन ने करोड़ों इंसानों की जान ली और देश को बर्बाद कर दिया।"
      },
      "layman": "राष्ट्र की ताक़त, एकता और गौरव को किसी भी व्यक्तिगत अधिकार से ऊपर मानना। इसमें देश के प्रति अटूट निष्ठा, विशाल सैन्य शक्ति और कड़े सामाजिक अनुशासन की माँग की जाती है ताकि देश को हर आंतरिक और बाहरी ख़तरे से सुरक्षित रखा जा सके।",
      "pillars": [
        "⚔️ राज्य की सर्वोच्च शक्ति: राष्ट्र के गौरव के आगे व्यक्तिगत हितों का समर्पण।",
        "🚩 अटूट निष्ठा और अनुशासन: एकता बनाए रखने के लिए कड़े नियम और अनुशासन।",
        "🛡️ प्रचंड सैन्य बल: देश की अखंडता और सीमाओं की रक्षा के लिए असीम ताक़त।"
      ],
      "examplePerson": "इंदिरा गांधी (1975)",
      "simpleTitle": "एक देश, एक अनुशासन"
    }
  }
];
