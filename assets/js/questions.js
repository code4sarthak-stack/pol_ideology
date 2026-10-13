/*
 * Quiz content. To change the quiz, edit this file only.
 *
 * axis:  "econ"   → economic scale  (negative = Left,    positive = Right)
 *        "social" → social scale    (negative = Freedom, positive = Order)
 * dir:   +1 if AGREEING moves the score positive, -1 if agreeing moves it negative.
 *
 * Answers are scored: Strongly agree +2, Agree +1, Neutral 0, Disagree -1, Strongly disagree -2,
 * multiplied by dir. With 5 questions per axis each axis ranges from -10 to +10.
 *
 * Keep exactly 10 questions: answers are stored by position in share links.
 */
window.QUIZ = {
  questions: [
    {
      axis: "econ", dir: -1,
      en: {
        text: "The government should provide free healthcare and education to everyone, even if it means higher taxes.",
        why: "Supporters say universal public services reduce inequality; critics worry about the tax burden and the quality of government-run services."
      },
      hi: {
        text: "सरकार को सभी को मुफ़्त स्वास्थ्य सेवा और शिक्षा देनी चाहिए, भले ही इसके लिए टैक्स बढ़ाने पड़ें।",
        why: "समर्थकों का कहना है कि सबके लिए सार्वजनिक सेवाएँ असमानता घटाती हैं; आलोचकों को टैक्स के बोझ और सरकारी सेवाओं की गुणवत्ता की चिंता है।"
      }
    },
    {
      axis: "social", dir: 1,
      en: {
        text: "The government should be able to ban films, books or online content that it considers offensive.",
        why: "Censorship debates weigh freedom of expression against concerns about hurt sentiments, public order and misinformation."
      },
      hi: {
        text: "सरकार को उन फ़िल्मों, किताबों या ऑनलाइन सामग्री पर रोक लगाने का अधिकार होना चाहिए जिन्हें वह आपत्तिजनक मानती है।",
        why: "सेंसरशिप की बहस में अभिव्यक्ति की आज़ादी को भावनाएँ आहत होने, सार्वजनिक व्यवस्था और ग़लत सूचना की चिंताओं के सामने तौला जाता है।"
      }
    },
    {
      axis: "econ", dir: 1,
      en: {
        text: "Most industries, like airlines, banks and telecom, are better run by private companies than by the government.",
        why: "This is the privatisation debate: efficiency and competition on one side, public control and job security on the other."
      },
      hi: {
        text: "एयरलाइंस, बैंक और टेलीकॉम जैसे ज़्यादातर उद्योग सरकार की बजाय निजी कंपनियाँ बेहतर चलाती हैं।",
        why: "यह निजीकरण की बहस है: एक तरफ़ कार्यकुशलता और प्रतिस्पर्धा, दूसरी तरफ़ सार्वजनिक नियंत्रण और नौकरी की सुरक्षा।"
      }
    },
    {
      axis: "social", dir: -1,
      en: {
        text: "Adults should be free to marry anyone they choose, regardless of religion, caste or gender.",
        why: "This question touches on personal liberty, family authority and social customs — areas where opinions often differ across generations."
      },
      hi: {
        text: "वयस्कों को धर्म, जाति या लिंग की परवाह किए बिना अपनी पसंद से किसी से भी शादी करने की आज़ादी होनी चाहिए।",
        why: "यह सवाल व्यक्तिगत स्वतंत्रता, परिवार के अधिकार और सामाजिक रीति-रिवाज़ों से जुड़ा है — जिन पर अक्सर पीढ़ियों के बीच राय अलग होती है।"
      }
    },
    {
      axis: "econ", dir: -1,
      en: {
        text: "People with very high incomes should pay a much larger share of their income in taxes.",
        why: "Progressive taxation aims to fund public services fairly; opponents argue that high rates discourage investment and hard work."
      },
      hi: {
        text: "बहुत ज़्यादा कमाने वालों को अपनी आय का कहीं बड़ा हिस्सा टैक्स में देना चाहिए।",
        why: "प्रगतिशील कराधान का मक़सद सार्वजनिक सेवाओं के लिए न्यायपूर्ण तरीक़े से पैसा जुटाना है; विरोधियों का तर्क है कि ऊँची दरें निवेश और मेहनत को हतोत्साहित करती हैं।"
      }
    },
    {
      axis: "social", dir: 1,
      en: {
        text: "For national security, it is acceptable for the government to monitor people's phone and internet activity.",
        why: "Surveillance can help prevent crime and terrorism, but it raises questions about privacy and the potential for misuse."
      },
      hi: {
        text: "राष्ट्रीय सुरक्षा के लिए सरकार का लोगों के फ़ोन और इंटरनेट गतिविधियों पर निगरानी रखना ठीक है।",
        why: "निगरानी अपराध और आतंकवाद रोकने में मदद कर सकती है, लेकिन इससे निजता और दुरुपयोग की आशंका पर सवाल उठते हैं।"
      }
    },
    {
      axis: "econ", dir: 1,
      en: {
        text: "Subsidies on things like fuel, electricity and fertiliser do more harm than good in the long run.",
        why: "Subsidies can protect poorer households, but economists debate their cost to public budgets and their effect on markets."
      },
      hi: {
        text: "ईंधन, बिजली और खाद जैसी चीज़ों पर सब्सिडी लंबे समय में फ़ायदे से ज़्यादा नुक़सान करती है।",
        why: "सब्सिडी ग़रीब परिवारों को राहत दे सकती है, लेकिन सरकारी बजट पर उसके बोझ और बाज़ार पर असर को लेकर अर्थशास्त्रियों में बहस है।"
      }
    },
    {
      axis: "social", dir: 1,
      en: {
        text: "Laws should be guided by traditional values and culture, even if some people disagree with them.",
        why: "Traditionalists see shared values as the glue that holds society together; others believe laws should protect individual choices instead."
      },
      hi: {
        text: "क़ानून पारंपरिक मूल्यों और संस्कृति के आधार पर बनने चाहिए, भले ही कुछ लोग उनसे असहमत हों।",
        why: "परंपरावादी साझा मूल्यों को समाज को जोड़ने वाली ताक़त मानते हैं; दूसरों का मानना है कि क़ानूनों को व्यक्तिगत चुनावों की रक्षा करनी चाहिए।"
      }
    },
    {
      axis: "econ", dir: -1,
      en: {
        text: "Strong laws protecting workers matter more than making it easy for businesses to hire and fire.",
        why: "Labour laws can protect workers from exploitation; critics say rigid rules make companies hesitant to create formal jobs."
      },
      hi: {
        text: "मज़दूरों की सुरक्षा करने वाले मज़बूत क़ानून, कंपनियों के लिए भर्ती और छँटनी आसान बनाने से ज़्यादा ज़रूरी हैं।",
        why: "श्रम क़ानून मज़दूरों को शोषण से बचा सकते हैं; आलोचकों का कहना है कि सख़्त नियमों के कारण कंपनियाँ औपचारिक नौकरियाँ देने से हिचकती हैं।"
      }
    },
    {
      axis: "social", dir: -1,
      en: {
        text: "Peaceful protests and criticism of the government should always be allowed, even when they cause inconvenience.",
        why: "Democracies protect the right to dissent; the debate is over how to balance it with public order and the rights of others."
      },
      hi: {
        text: "शांतिपूर्ण विरोध-प्रदर्शन और सरकार की आलोचना की हमेशा अनुमति होनी चाहिए, भले ही इससे असुविधा हो।",
        why: "लोकतंत्र असहमति के अधिकार की रक्षा करते हैं; बहस इस पर होती है कि इसे सार्वजनिक व्यवस्था और दूसरों के अधिकारों के साथ कैसे संतुलित किया जाए।"
      }
    }
  ],

  // Possible results. app.js picks one from the two axis scores.
  results: {
    progressive: {
      emoji: "🌱",
      en: {
        title: "Progressive Liberal",
        desc: "You favour a strong safety net and a fairer distribution of wealth, while also valuing personal freedom and individual rights. You tend to support public services, equality and people's freedom to live as they choose."
      },
      hi: {
        title: "प्रगतिशील उदारवादी",
        desc: "आप एक मज़बूत सामाजिक सुरक्षा तंत्र और संपत्ति के न्यायपूर्ण बँटवारे के पक्ष में हैं, साथ ही व्यक्तिगत आज़ादी और अधिकारों को भी महत्व देते हैं। आप सार्वजनिक सेवाओं, समानता और लोगों को अपनी मर्ज़ी से जीने की आज़ादी का समर्थन करते हैं।"
      }
    },
    communitarian: {
      emoji: "🤝",
      en: {
        title: "Communitarian",
        desc: "You believe the state should play a big role in the economy to protect ordinary people, and that society works best with shared values, order and a strong sense of community."
      },
      hi: {
        title: "समुदायवादी",
        desc: "आप मानते हैं कि आम लोगों की सुरक्षा के लिए अर्थव्यवस्था में सरकार की बड़ी भूमिका होनी चाहिए, और यह भी कि समाज साझा मूल्यों, व्यवस्था और मज़बूत सामुदायिक भावना से सबसे अच्छा चलता है।"
      }
    },
    libertarian: {
      emoji: "🗽",
      en: {
        title: "Libertarian",
        desc: "You value freedom above all — in the market and in personal life. You prefer low taxes, private enterprise and minimal government interference in what people do and say."
      },
      hi: {
        title: "स्वतंत्रतावादी",
        desc: "आप हर चीज़ से ऊपर आज़ादी को महत्व देते हैं — बाज़ार में भी और निजी जीवन में भी। आप कम टैक्स, निजी उद्यम और लोगों के काम व अभिव्यक्ति में सरकार के न्यूनतम दख़ल को पसंद करते हैं।"
      }
    },
    conservative: {
      emoji: "🏛️",
      en: {
        title: "Conservative",
        desc: "You support free enterprise and economic growth, combined with respect for tradition, cultural values and a strong, orderly state. You see continuity and stability as the foundation of a good society."
      },
      hi: {
        title: "परंपरावादी",
        desc: "आप मुक्त उद्यम और आर्थिक विकास का समर्थन करते हैं, और साथ ही परंपरा, सांस्कृतिक मूल्यों और एक मज़बूत, व्यवस्थित राज्य का सम्मान करते हैं। आप निरंतरता और स्थिरता को अच्छे समाज की नींव मानते हैं।"
      }
    },
    centrist: {
      emoji: "⚖️",
      en: {
        title: "Centrist",
        desc: "You take a balanced, pragmatic view and judge each issue on its merits rather than following one ideology. You see good points on many sides and prefer moderate, practical solutions."
      },
      hi: {
        title: "मध्यमार्गी",
        desc: "आप संतुलित और व्यावहारिक नज़रिया रखते हैं और किसी एक विचारधारा के बजाय हर मुद्दे को उसकी अपनी ख़ूबियों पर परखते हैं। आपको कई पक्षों में अच्छी बातें दिखती हैं और आप संतुलित, व्यावहारिक समाधान पसंद करते हैं।"
      }
    }
  }
};
