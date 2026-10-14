/*
 * Long-form text for the ideology guide pages (ideology/<slug>.html and hi/ideology/<slug>.html).
 * build.js combines it with the short data already in assets/js/results.js (title, simple title,
 * core beliefs, position on the four scales).
 *
 * Writing rules for every ideology:
 * - Plain words a Class 8 reader understands. Short sentences.
 * - good: 3 examples, at least one from India and one from elsewhere.
 * - bad: 2 examples, never from India.
 * - Criticise governments and policies, never the people of a country.
 * - people: historical figures only, no living politicians, no current parties.
 */
const path = require("path");
const CONTENT_DIR = path.join(__dirname, "content");

const IDEOLOGY_KEYS = [
  "communism", "libsoc", "demsoc", "progressive", "gandhian", "centrist",
  "classical", "libertarian", "libcon", "communitarian", "conservative",
  "leftnat", "natcon", "authcap", "authnat"
];

const entries = {};
IDEOLOGY_KEYS.forEach((key) => {
  try {
    entries[key] = require(path.join(CONTENT_DIR, key + ".js"));
  } catch (e) {
    // not yet written — skip
  }
});

module.exports = Object.assign({}, entries, {
  socdem: {
    en: {
      metaTitle: "Social Democracy Explained Simply: Meaning, Examples, Pros & Cons",
      metaDescription: "What is social democracy? A simple explanation with real examples from India and the world, the times it went wrong, and what supporters and critics say.",
      lead: "Let businesses make money, then use fair taxes to give everyone good schools, healthcare and a safety net.",
      ctaQuestion: "Are you a social democrat?",
      simple: [
        "Imagine a town where anyone can open a shop, start a factory or build a company and become rich. That is the market part. Now imagine the same town collects taxes, a little more from people who earn more, and uses the money to run good free schools, cheap or free hospitals, pensions for the old and help for people who lose their jobs. That is the social part.",
        "Social democrats want both at the same time. They do not want the government to own every business, as communists do. But they do not fully trust a free market either, because it can leave the sick, the old and the poor behind. So they keep private business and free elections, and add strong rules: fair wages, safe workplaces, the right to join a union, and services that every citizen can use.",
        "Sweden, Norway and Denmark are the best-known examples. In India, laws like the right to food, the right to education and the rural job guarantee follow the same idea."
      ],
      good: [
        {
          name: "Britain's free National Health Service",
          when: "UK · 1948 onwards",
          text: "After the Second World War, Britain made doctors and hospitals free for everyone, paid for by taxes. Seeing a family doctor or getting emergency care still comes with no bill."
        },
        {
          name: "The Nordic welfare model",
          when: "Sweden, Norway, Denmark · 1930s onwards",
          text: "Private companies like IKEA, Volvo and LEGO grew into world brands, while taxes paid for free schools and universities, healthcare and long paid leave for new parents. These countries regularly rank near the top of world happiness reports."
        },
        {
          name: "India's rural job guarantee (MGNREGA)",
          when: "India · 2005 onwards",
          text: "Every village household got the legal right to up to 100 days of paid work a year, so a family still has some income in a bad farming season."
        }
      ],
      bad: [
        {
          name: "Greece's debt crisis",
          when: "Greece · 2009–2018",
          text: "Years of generous pensions and public jobs paid for with borrowed money ended in three international bailouts; the economy shrank by about a quarter and over half of young people were jobless."
        },
        {
          name: "Sweden's 102% tax",
          when: "Sweden · 1976",
          text: "Taxes climbed so high that Astrid Lindgren, author of the Pippi Longstocking books, worked out she owed more than 100% on part of her income. Her angry fairy tale about it started a national debate, and the Social Democrats lost power that year for the first time in 44 years."
        }
      ],
      supporters: [
        "Everyone gets a fair start: a poor child gets the same school and hospital as a rich one.",
        "It keeps the energy of business and free markets, so the economy keeps growing.",
        "A safety net makes people braver: they can change jobs or start a business without fearing ruin."
      ],
      critics: [
        "High taxes can push hard-working people and companies to move abroad or hide their income.",
        "Generous benefits cost a lot; when growth slows, governments borrow and debt piles up, as in Greece.",
        "A big government can become slow and wasteful, and some people may rely on benefits instead of working."
      ],
      people: [
        {
          name: "Manmohan Singh",
          when: "India · 1932–2024",
          text: "As Prime Minister (2004–2014) he kept India's markets open while bringing in the rural job guarantee, the right to education and the right to food."
        },
        {
          name: "Olof Palme",
          when: "Sweden · 1927–1986",
          text: "Swedish Prime Minister who expanded childcare, healthcare and workers' say in how companies are run."
        },
        {
          name: "Willy Brandt",
          when: "West Germany · 1913–1992",
          text: "West German Chancellor (1969–1974) who widened education and welfare, and won the 1971 Nobel Peace Prize."
        }
      ],
      faq: [
        {
          q: "Is social democracy the same as socialism?",
          a: "No. Socialists want the government or workers to own most businesses. Social democrats keep private ownership and markets, and use taxes and laws to share the benefits more fairly. Democratic socialism sits between the two."
        },
        {
          q: "Is India a social democracy?",
          a: "Not fully, but parts of India's system follow the idea: free government schools, cheap grain from ration shops, the rural job guarantee and labour laws. India's Constitution also asks the state, in its Directive Principles, to reduce inequality and to provide work, education and public help."
        },
        {
          q: "Which countries follow this model?",
          a: "The Nordic countries, Sweden, Norway, Denmark, Finland and Iceland, are the best-known examples, whichever party is in power. Germany, the Netherlands and Canada also combine free markets with a strong welfare state."
        }
      ]
    },
    hi: {
      metaTitle: "सामाजिक लोकतंत्र आसान भाषा में: मतलब, उदाहरण, फ़ायदे और कमियाँ",
      metaDescription: "सामाजिक लोकतंत्र (सोशल डेमोक्रेसी) क्या है? भारत और दुनिया के असली उदाहरणों के साथ आसान भाषा में समझिए, यह कहाँ नाकाम रहा और समर्थक व आलोचक क्या कहते हैं।",
      lead: "कारोबार को कमाने दो, फिर न्यायपूर्ण टैक्स से हर किसी को अच्छे स्कूल, इलाज और सुरक्षा घेरा दो।",
      ctaQuestion: "क्या आप सामाजिक लोकतंत्र के समर्थक हैं?",
      simple: [
        "एक ऐसे शहर की कल्पना कीजिए जहाँ कोई भी दुकान खोल सकता है, कारख़ाना लगा सकता है या कंपनी बनाकर अमीर बन सकता है। यह बाज़ार वाला हिस्सा है। अब सोचिए कि वही शहर टैक्स लेता है, जो ज़्यादा कमाता है उससे थोड़ा ज़्यादा, और उस पैसे से अच्छे मुफ़्त स्कूल, सस्ते या मुफ़्त अस्पताल, बुज़ुर्गों के लिए पेंशन और नौकरी छूटने पर मदद देता है। यह 'सामाजिक' हिस्सा है।",
        "सामाजिक लोकतंत्र के समर्थक ये दोनों चीज़ें एक साथ चाहते हैं। वे साम्यवादियों की तरह हर कारोबार सरकार के हाथ में नहीं देना चाहते। लेकिन वे पूरी तरह खुले बाज़ार पर भी भरोसा नहीं करते, क्योंकि उसमें बीमार, बुज़ुर्ग और ग़रीब पीछे छूट सकते हैं। इसलिए वे निजी कारोबार और आज़ाद चुनाव बनाए रखते हैं, और साथ में मज़बूत नियम जोड़ते हैं: सही मज़दूरी, सुरक्षित कामकाज, यूनियन बनाने का हक़, और ऐसी सेवाएँ जिनका हर नागरिक इस्तेमाल कर सके।",
        "स्वीडन, नॉर्वे और डेनमार्क इसके सबसे मशहूर उदाहरण हैं। भारत में भोजन का अधिकार, शिक्षा का अधिकार और ग्रामीण रोज़गार गारंटी जैसे क़ानून इसी सोच पर चलते हैं।"
      ],
      good: [
        {
          name: "ब्रिटेन की मुफ़्त सरकारी स्वास्थ्य सेवा (NHS)",
          when: "ब्रिटेन · 1948 से",
          text: "दूसरे विश्व युद्ध के बाद ब्रिटेन ने टैक्स के पैसे से डॉक्टर और अस्पताल सबके लिए मुफ़्त कर दिए। आज भी फ़ैमिली डॉक्टर को दिखाने या इमरजेंसी इलाज का कोई बिल नहीं आता।"
        },
        {
          name: "नॉर्डिक कल्याणकारी मॉडल",
          when: "स्वीडन, नॉर्वे, डेनमार्क · 1930 के दशक से",
          text: "IKEA, Volvo और LEGO जैसी निजी कंपनियाँ दुनिया भर में मशहूर हुईं, और टैक्स से मुफ़्त स्कूल-कॉलेज, इलाज और बच्चे के जन्म पर माता-पिता को लंबी सवेतन छुट्टी मिली। ये देश दुनिया की ख़ुशहाली रिपोर्टों में लगातार सबसे ऊपर के देशों में रहते हैं।"
        },
        {
          name: "भारत की ग्रामीण रोज़गार गारंटी (मनरेगा)",
          when: "भारत · 2005 से",
          text: "हर ग्रामीण परिवार को साल में 100 दिन तक मज़दूरी वाले काम का क़ानूनी हक़ मिला, ताकि ख़राब फ़सल वाले साल में भी घर में कुछ कमाई आती रहे।"
        }
      ],
      bad: [
        {
          name: "ग्रीस का क़र्ज़ संकट",
          when: "ग्रीस · 2009–2018",
          text: "बरसों तक उधार के पैसे से भारी पेंशन और सरकारी नौकरियाँ बाँटी गईं; नतीजा तीन अंतरराष्ट्रीय बेलआउट, अर्थव्यवस्था लगभग एक-चौथाई सिकुड़ गई और आधे से ज़्यादा युवा बेरोज़गार हो गए।"
        },
        {
          name: "स्वीडन का 102% टैक्स",
          when: "स्वीडन · 1976",
          text: "टैक्स इतने बढ़ गए कि 'पिप्पी लॉन्गस्टॉकिंग' की मशहूर लेखिका एस्ट्रिड लिंडग्रेन ने हिसाब लगाया कि उन्हें अपनी कमाई के एक हिस्से पर 100% से भी ज़्यादा टैक्स देना है। इस पर लिखी उनकी व्यंग्य-कथा से पूरे देश में बहस छिड़ी, और उसी साल सोशल डेमोक्रेट 44 साल में पहली बार सत्ता से बाहर हो गए।"
        }
      ],
      supporters: [
        "सबको बराबर शुरुआत मिलती है: ग़रीब बच्चे को भी वही स्कूल और अस्पताल मिलता है जो अमीर बच्चे को।",
        "कारोबार और खुले बाज़ार की ताक़त बनी रहती है, इसलिए अर्थव्यवस्था बढ़ती रहती है।",
        "सुरक्षा घेरा लोगों को हिम्मत देता है: वे बर्बादी के डर के बिना नौकरी बदल सकते हैं या अपना काम शुरू कर सकते हैं।"
      ],
      critics: [
        "ऊँचे टैक्स मेहनती लोगों और कंपनियों को विदेश जाने या कमाई छिपाने पर मजबूर कर सकते हैं।",
        "भारी सुविधाएँ बहुत महँगी पड़ती हैं; विकास धीमा होते ही सरकार उधार लेती है और क़र्ज़ बढ़ता जाता है, जैसा ग्रीस में हुआ।",
        "बड़ी सरकार धीमी और फ़िज़ूलख़र्च बन सकती है, और कुछ लोग काम करने के बजाय सरकारी मदद पर निर्भर हो सकते हैं।"
      ],
      people: [
        {
          name: "मनमोहन सिंह",
          when: "भारत · 1932–2024",
          text: "प्रधानमंत्री (2004–2014) के तौर पर उन्होंने बाज़ार खुले रखे और साथ में ग्रामीण रोज़गार गारंटी, शिक्षा का अधिकार और भोजन का अधिकार लागू किए।"
        },
        {
          name: "ओलोफ़ पाल्मे",
          when: "स्वीडन · 1927–1986",
          text: "स्वीडन के प्रधानमंत्री, जिन्होंने बच्चों की देखभाल, स्वास्थ्य सेवा और कंपनियों के फ़ैसलों में कामगारों की आवाज़ को बढ़ाया।"
        },
        {
          name: "विली ब्रांट",
          when: "पश्चिम जर्मनी · 1913–1992",
          text: "पश्चिम जर्मनी के चांसलर (1969–1974), जिन्होंने शिक्षा और कल्याण योजनाएँ बढ़ाईं और 1971 में नोबेल शांति पुरस्कार जीता।"
        }
      ],
      faq: [
        {
          q: "क्या सामाजिक लोकतंत्र और समाजवाद एक ही चीज़ हैं?",
          a: "नहीं। समाजवादी चाहते हैं कि ज़्यादातर कारोबार सरकार या मज़दूरों के हाथ में हों। सामाजिक लोकतंत्र निजी मालिकाना हक़ और बाज़ार बनाए रखता है, और टैक्स व क़ानूनों के ज़रिए फ़ायदे को ज़्यादा बराबरी से बाँटता है। लोकतांत्रिक समाजवाद इन दोनों के बीच में आता है।"
        },
        {
          q: "क्या भारत एक सामाजिक लोकतंत्र है?",
          a: "पूरी तरह नहीं, लेकिन भारत की व्यवस्था के कई हिस्से इसी सोच पर चलते हैं: मुफ़्त सरकारी स्कूल, राशन की दुकानों से सस्ता अनाज, ग्रामीण रोज़गार गारंटी और श्रम क़ानून। भारत का संविधान भी नीति-निर्देशक तत्वों में सरकार से असमानता घटाने और काम, शिक्षा व सरकारी मदद देने को कहता है।"
        },
        {
          q: "कौन-से देश यह मॉडल अपनाते हैं?",
          a: "नॉर्डिक देश, यानी स्वीडन, नॉर्वे, डेनमार्क, फ़िनलैंड और आइसलैंड, इसके सबसे जाने-माने उदाहरण हैं, चाहे वहाँ किसी भी पार्टी की सरकार हो। जर्मनी, नीदरलैंड और कनाडा भी खुले बाज़ार के साथ मज़बूत कल्याणकारी व्यवस्था चलाते हैं।"
        }
      ]
    }
  }
});
