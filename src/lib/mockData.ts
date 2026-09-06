export interface ServiceItem {
  id: string;
  name: string;
  category: "csc" | "digital" | "education" | "banking";
  icon: string;
  description: string;
  requirements: string[];
  processingTime: string;
  officialLink?: string;
}

export interface PVCProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  requirements: string[];
  features: string[];
  deliveryTime: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  rating: number;
  content: string;
  author: string;
  location: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "pvc" | "payment" | "support";
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    id: "pan-card",
    name: "New PAN Card & Correction",
    category: "digital",
    icon: "💳",
    description: "Apply for a new Permanent Account Number (PAN) or make corrections to your existing PAN card details (name, DOB, photo, signature).",
    requirements: ["Aadhaar Card", "2 Passport Size Photos", "Active Mobile Number"],
    processingTime: "7 - 10 working days",
    officialLink: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
  },
  {
    id: "aadhaar-print",
    name: "Aadhaar Card Download & Print",
    category: "csc",
    icon: "🆔",
    description: "Get your official Aadhaar card downloaded and high-quality color prints on premium paper or smart cards.",
    requirements: ["Aadhaar Number or Enrolment ID", "OTP sent to registered mobile"],
    processingTime: "Instant (15 mins)",
    officialLink: "https://myaadhaar.uidai.gov.in/"
  },
  {
    id: "ayushman-card",
    name: "Ayushman Bharat Golden Card",
    category: "csc",
    icon: "🏥",
    description: "Apply for or download your Ayushman Bharat PM-JAY Golden Card to get free health insurance cover of up to ₹5 Lakhs per year.",
    requirements: ["Ration Card (Patrata Parchi)", "Aadhaar Card", "Mobile Number linked to Aadhaar"],
    processingTime: "2 - 3 working days",
    officialLink: "https://beneficiary.nha.gov.in/"
  },
  {
    id: "pm-kisan",
    name: "PM-Kisan Registration & eKYC",
    category: "csc",
    icon: "🌾",
    description: "New registration for PM-Kisan Samman Nidhi Yojana and completion of mandatory biometric or OTP eKYC.",
    requirements: ["Land Khatauni / Land Details", "Aadhaar Card", "Bank Passbook", "Mobile Number"],
    processingTime: "Instant KYC, Approval takes 15-30 days",
    officialLink: "https://pmkisan.gov.in/"
  },
  {
    id: "e-shram",
    name: "e-Shram Registration & Card",
    category: "csc",
    icon: "👷",
    description: "Registration for unorganized sector workers to secure government scheme benefits and financial aids.",
    requirements: ["Aadhaar Card", "Bank Account Details", "Mobile Number linked to Aadhaar"],
    processingTime: "Instant (15 mins)",
    officialLink: "https://eshram.gov.in/"
  },
  {
    id: "voter-id",
    name: "Voter ID Registration & Card Correction",
    category: "digital",
    icon: "🗳️",
    description: "Apply for a new Voter ID card, transfer vote, or correct details like name, address, and age.",
    requirements: ["Aadhaar Card or Birth Certificate", "Address Proof", "1 Passport Size Photo"],
    processingTime: "15 - 30 working days",
    officialLink: "https://voters.eci.gov.in/"
  },
  {
    id: "certificates-up",
    name: "Income, Caste & Domicle Certificates",
    category: "digital",
    icon: "📄",
    description: "Apply for official Uttar Pradesh government certificates: Income (Aay Praman Patra), Caste (Jati Praman Patra), and Domicile (Nivas Praman Patra).",
    requirements: ["Self-Declaration Form", "Aadhaar Card", "Ration Card or Voter ID", "Passport Size Photo"],
    processingTime: "7 - 15 working days",
    officialLink: "https://edistrict.up.gov.in/"
  },
  {
    id: "banking-deposit-withdrawal",
    name: "AePS Cash Deposit & Withdrawal",
    category: "banking",
    icon: "🏦",
    description: "Aadhaar Enabled Payment System (AePS) allowing you to withdraw, deposit, or check balance of any bank account using biometrics.",
    requirements: ["Aadhaar Card", "Linked Bank Account", "Biometric (Fingerprint) Verification"],
    processingTime: "Instant",
  },
  {
    id: "board-form-fill",
    name: "Board & University Exam Forms",
    category: "education",
    icon: "📝",
    description: "Professional assistance with error-free filling of UP Board, CBSE, and local university examination and admission forms.",
    requirements: ["Previous Year Marksheet", "Passport Photo", "Signature", "Admit Card / Roll Number"],
    processingTime: "Instant (30 mins)",
  },
  {
    id: "scholarship-up",
    name: "UP Pre/Post Matric Scholarship",
    category: "education",
    icon: "🎓",
    description: "Apply online for government financial support for Class 9, 10, 11, 12 and university/diploma courses in Uttar Pradesh.",
    requirements: ["Aadhaar Card", "Income, Caste & Domicile Certificates", "Fee Receipt & College ID", "Bank Passbook"],
    processingTime: "15 - 25 days (Verification pending college)",
    officialLink: "https://scholarship.up.gov.in/"
  },
  {
    id: "computer-literacy",
    name: "Basic Computer Courses & Training",
    category: "education",
    icon: "💻",
    description: "Learn typing, MS Office, internet skills, and digital literacy under specialized guidance at our physical computer centre.",
    requirements: ["Interest to Learn", "Photo ID Proof"],
    processingTime: "1 Month to 3 Months courses",
  }
];

export const pvcProducts: PVCProduct[] = [
  {
    id: "pvc-aadhaar",
    slug: "aadhaar-pvc",
    name: "Aadhaar PVC Smart Card",
    price: 149,
    description: "Order a durable, wallet-sized, waterproof Aadhaar smart card printed on premium plastic (PVC) with UV protection.",
    requirements: [
      "Official Aadhaar PDF File (Downloaded from myAadhaar portal)",
      "OR Aadhaar Number + OTP for download assistance"
    ],
    features: [
      "Wallet-sized (standard ATM size)",
      "Vibrant high-definition colors",
      "Scratch & water-resistant",
      "Guaranteed barcode/QR code scan readability"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-aadhaar-mockup.jpg"
  },
  {
    id: "pvc-pan",
    slug: "pan-pvc",
    name: "PAN PVC Smart Card",
    price: 149,
    description: "Get your Permanent Account Number printed on a premium glossy plastic PVC card. Convenient replacement for paper/faded cards.",
    requirements: [
      "Official e-PAN Card PDF file",
      "OR PAN Number + Date of Birth"
    ],
    features: [
      "Durable credit-card style layout",
      "Glossy premium finish",
      "Perfect color representation",
      "Fits securely in wallets"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-pan-mockup.jpg"
  },
  {
    id: "pvc-ayushman",
    slug: "ayushman-pvc",
    name: "Ayushman Bharat PVC Card",
    price: 149,
    description: "Make your PM-JAY Golden health card easy to carry in your wallet. Crucial for emergency hospital admissions.",
    requirements: [
      "Ayushman Golden Card PDF file",
      "OR Beneficiary Family ID / Aadhaar"
    ],
    features: [
      "High durability for medical usage",
      "Clear font rendering of Scheme details",
      "Pocket-sized for immediate access",
      "Glossy protection overlay"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-aadhaar-mockup.jpg"
  },
  {
    id: "pvc-voter",
    slug: "voter-pvc",
    name: "Voter ID PVC Smart Card",
    price: 149,
    description: "Upgrade your old paper Voter Card to a modern, security-enabled PVC Smart Voter ID.",
    requirements: [
      "Voter ID PDF or EPIC Number",
      "OR Voter card photo scan"
    ],
    features: [
      "Official standard dimensions",
      "Enhanced durability",
      "Readable election barcode",
      "Dual-sided color printing"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-pan-mockup.jpg"
  },
  {
    id: "pvc-dl",
    slug: "driving-licence-pvc",
    name: "Driving Licence PVC Card",
    price: 149,
    description: "Convert your temporary virtual driving licence PDF into a robust, high-quality plastic card to show to authorities.",
    requirements: [
      "Driving Licence PDF downloaded from Sarathi / DigiLocker",
      "OR Driving Licence Number"
    ],
    features: [
      "Premium thick PVC material",
      "High resolution typography",
      "Official design alignment",
      "Waterproof finish"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-pan-mockup.jpg"
  },
  {
    id: "pvc-rc",
    slug: "rc-pvc",
    name: "Vehicle RC PVC Smart Card",
    price: 149,
    description: "Order a durable plastic duplicate of your Vehicle Registration Certificate (RC) for dashboard convenience.",
    requirements: [
      "Registration Certificate PDF from Vahan / DigiLocker",
      "OR Vehicle Registration Number"
    ],
    features: [
      "Double-sided high-contrast printing",
      "Extremely long-lasting plastic",
      "Durable in humid/hot glove boxes",
      "Accurate official format"
    ],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-aadhaar-mockup.jpg"
  }
];

export const reviews: ReviewItem[] = [
  {
    id: "rev-1",
    rating: 5,
    content: "मैंने यहाँ से अपना आधार और पैन कार्ड PVC में प्रिंट करवाया। बहुत ही बढ़िया क्वालिटी है, बिल्कुल असली ATM कार्ड जैसा दिखता है।",
    author: "Rahul Verma",
    location: "Jarwal Road, Bahraich",
    date: "12 Aug 2026"
  },
  {
    id: "rev-2",
    rating: 5,
    content: "Unique Computer Centre has excellent service! I filled my university scholarship form here. Irfak ji was very patient and made sure all details were correct.",
    author: "Amit Kumar Yadav",
    location: "Harchanda, Jarwal",
    date: "05 Aug 2026"
  },
  {
    id: "rev-3",
    rating: 5,
    content: "मैंने पीएम किसान ई-केवाईसी करवाई थी। दुकान पर भीड़ होने के बावजूद उन्होंने 5 मिनट में मेरा काम कर दिया। बहुत बढ़िया व्यव्हार है।",
    author: "Ramesh Prasad",
    location: "Bahraich",
    date: "28 Jul 2026"
  },
  {
    id: "rev-4",
    rating: 5,
    content: "Extremely fast PVC card delivery. I ordered online from Bahraich town and received it via post in just 3 days! The price is very reasonable too.",
    author: "Sameer Ahmad",
    location: "Bahraich",
    date: "15 Jul 2026"
  },
  {
    id: "rev-5",
    rating: 5,
    content: "I recommend their basic computer typing course. My brother studied there and learnt typing in Hindi and English. Very professional space.",
    author: "Priya Singh",
    location: "Jarwal Town",
    date: "02 Jul 2026"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "PVC Card की कीमत क्या है और डिलीवरी कैसे होती है?",
    answer: "हमारे सभी PVC स्मार्ट कार्ड की शुरुआती कीमत मात्र ₹149 है। इसमें डिलीवरी चार्ज भी शामिल हैं। हम इसे भारतीय डाक (India Post) या अन्य कूरियर से आपके घर तक 3 से 7 दिनों में सुरक्षित पहुंचाते हैं।",
    category: "pvc"
  },
  {
    id: "faq-2",
    question: "PVC Card बनवाने के लिए क्या दस्तावेज देने पड़ते हैं?",
    answer: "आपको उस कार्ड का आधिकारिक PDF डाक्यूमेंट्स (जैसे- e-Aadhaar PDF, e-PAN, DL PDF, RC PDF) आर्डर फॉर्म में अपलोड करना होता है। हम सिर्फ वही प्रिंट करेंगे जो सरकारी पोर्टल से डाउनलोड किया गया है।",
    category: "pvc"
  },
  {
    id: "faq-3",
    question: "क्या हम अपना आर्डर ट्रैक कर सकते हैं?",
    answer: "हाँ! जैसे ही आप आर्डर सबमिट करते हैं, आपको एक यूनिक आर्डर ID (जैसे- UCCPVC1002) मिलती है। आप हमारी वेबसाइट के 'Track Order' पेज पर जाकर अपने आर्डर का करंट स्टेटस (Printing, Shipped, Delivered) लाइव देख सकते हैं।",
    category: "general"
  },
  {
    id: "faq-4",
    question: "दस्तावेजों (Aadhaar/PAN) की सुरक्षा की क्या गारंटी है?",
    answer: "हम ग्राहकों के दस्तावेजों की सुरक्षा को लेकर बहुत सतर्क हैं। आपके डाक्यूमेंट्स हमारी प्राइवेट सर्वर डायरेक्टरी में स्टोर होते हैं, जिसे कोई पब्लिक यूजर एक्सेस नहीं कर सकता। आर्डर डिलीवर होने के बाद तय समय सीमा में इसे सिस्टम से डिलीट कर दिया जाता है।",
    category: "support"
  },
  {
    id: "faq-5",
    question: "पेमेंट कैसे कर सकते हैं? क्या यह सुरक्षित है?",
    answer: "आप Razorpay के माध्यम से सुरक्षित पेमेंट कर सकते हैं। यह भारत का सबसे भरोसेमंद पेमेंट गेटवे है। यहाँ आप UPI (PhonePe, Paytm, Google Pay), डेबिट/क्रेडिट कार्ड, और नेट बैंकिंग से भुगतान कर सकते हैं।",
    category: "payment"
  },
  {
    id: "faq-6",
    question: "क्या मैं व्हाट्सएप (WhatsApp) के माध्यम से भी आर्डर दे सकता हूँ?",
    answer: "हाँ! यदि आपको वेबसाइट पर आर्डर करने में कोई समस्या आ रही है, तो आप हर PVC प्रोडक्ट पेज पर 'Order on WhatsApp' बटन पर क्लिक करके सीधे हमारे प्रतिनिधि को विवरण भेजकर व्हाट्सएप पर आर्डर बुक कर सकते हैं।",
    category: "support"
  }
];

export const blogs: BlogPostItem[] = [
  {
    id: "post-1",
    title: "Aadhaar PVC Card घर बैठे ऑनलाइन कैसे आर्डर करें? (पूर्ण जानकारी)",
    slug: "aadhaar-pvc-card-kaise-banwaye",
    summary: "जानिए कैसे आप अपने साधारण कागज के आधार कार्ड को एक टिकाऊ और वाटरप्रूफ प्लास्टिक आधार कार्ड में ऑनलाइन बदलवा सकते हैं।",
    content: "आधार कार्ड (Aadhaar Card) आज के समय में हमारे लिए सबसे जरूरी सरकारी पहचान पत्र है। लेकिन अक्सर कागज़ या लैमिनेटेड आधार कार्ड पानी में भीगने या मुड़ने से ख़राब हो जाते हैं। इसका सबसे बढ़िया हल है - **Aadhaar PVC Smart Card**।\n\n### आधार PVC कार्ड क्या है?\nयह एक प्लास्टिक का कार्ड होता है जो बिल्कुल हमारे ATM या क्रेडिट कार्ड की तरह दीखता है। यह काफी मजबूत, वाटरप्रूफ और आसानी से वॉलेट में आने वाला होता है। इस पर कई सुरक्षा फीचर्स जैसे QR कोड, घोस्ट इमेज और माइक्रोटेक्स्ट भी प्रिंटेड होते हैं।\n\n### वेबसाइट से आर्डर करने की प्रक्रिया:\n1. हमारी वेबसाइट के **PVC Cards** सेक्शन में जाएं।\n2. **Aadhaar PVC Card** चुनें।\n3. अपना e-Aadhaar PDF अपलोड करें और डिलीवरी का पता भरें।\n4. पेमेंट करें और आपको एक ट्रैक आर्डर ID मिल जाएगी।\n5. 3-7 दिनों में यह आपके घर पर डिलीवर हो जाएगा।",
    category: "Aadhaar",
    author: "Mohd Irfak Ahmad",
    publishedDate: "20 Aug 2026",
    readTime: "4 mins read",
    image: "/images/blog-aadhaar.webp"
  },
  {
    id: "post-2",
    title: "PAN Card Correction: नाम, फोटो या जन्मतिथि में बदलाव कैसे करें?",
    slug: "pan-card-correction",
    summary: "पैन कार्ड में गलतियों के कारण कई वित्तीय काम रुक जाते हैं। जानिए आवश्यक दस्तावेज और सुधार करने की आसान ऑनलाइन प्रक्रिया।",
    content: "पैन कार्ड (PAN Card) पर गलत नाम, जन्मतिथि या माता-पिता का नाम होने से बैंक खाता खोलने, लोन लेने या आईटीआर फाइल करने में परेशानी हो सकती है। इसे सुधारना बेहद आसान है और आप इसे **Unique Computer Centre** पर आकर करवा सकते हैं।\n\n### कौन से डॉक्यूमेंट चाहिए होंगे?\n1. **पहचान का प्रमाण:** आधार कार्ड, वोटर आईडी, या पासपोर्ट।\n2. **जन्मतिथि का प्रमाण:** हाईस्कूल की मार्कशीट, जन्म प्रमाण पत्र, या आधार कार्ड।\n3. **पते का प्रमाण:** आधार कार्ड, बिजली बिल, या बैंक स्टेटमेंट।\n\n### सुधार में कितना समय लगता है?\nआमतौर पर सुधार के बाद नया पैन नंबर अपडेट होने में 7 से 10 दिन का समय लगता है, और नया प्लास्टिक पैन कार्ड आपके घर पर 15 दिनों के भीतर आ जाता है। यदि आपको तुरंत प्रिंटेड प्लास्टिक कार्ड चाहिए, तो आप अपना अपडेटेड e-PAN पोर्टल पर प्राप्त कर हमारे 'PAN PVC Card' सर्विस से आर्डर कर सकते हैं।",
    category: "PAN Card",
    author: "Mohd Irfak Ahmad",
    publishedDate: "15 Aug 2026",
    readTime: "5 mins read",
    image: "/images/blog-pan.webp"
  },
  {
    id: "post-3",
    title: "PM Kisan Mandatary eKYC: घर बैठे या CSC से कैसे पूरी करें प्रक्रिया?",
    slug: "pm-kisan-status-check",
    summary: "पीएम किसान सम्मान निधि की अगली क़िस्त के लिए eKYC होना अनिवार्य है। जाने फ़िंगरप्रिंट या OTP के ज़रिये KYC पूरा करने का तरीक़ा।",
    content: "प्रधानमंत्री किसान सम्मान निधि योजना (PM-Kisan) के तहत सालाना ₹6,000 की राशि किसानों को दी जाती है। लेकिन बहुत से किसानों की किस्तें केवल इसलिए रुकी हुई हैं क्योंकि उन्होंने अपनी **eKYC** पूरी नहीं की है।\n\n### eKYC करने के दो तरीके हैं:\n1. **OTP के माध्यम से (स्वयं करें):** इसके लिए आपका मोबाइल नंबर आपके आधार कार्ड से लिंक होना चाहिए। आप पीएम किसान के पोर्टल पर जाकर आधार नंबर डालकर OTP के ज़रिये KYC कर सकते हैं।\n2. **बायोमेट्रिक के माध्यम से (CSC Centre पर):** यदि आपका आधार मोबाइल से लिंक नहीं है, तो आप हमारे केंद्र **Unique Computer Centre - CSC Point (Harchanda, Jarwal)** पर आकर केवल अंगूठा लगाकर अपनी eKYC मात्र 2 मिनट में पूरी करवा सकते हैं।\n\nजल्द से जल्द अपनी KYC पूरी करवाएं ताकि आपकी किस्तें बिना किसी रुकावट के समय पर आती रहें।",
    category: "PM Kisan",
    author: "Mohd Irfak Ahmad",
    publishedDate: "10 Aug 2026",
    readTime: "3 mins read",
    image: "/images/blog-pmkisan.webp"
  }
];
