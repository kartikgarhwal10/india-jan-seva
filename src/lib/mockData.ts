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

export interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price?: number;
  icon: string;
  image?: string;
  category: string;
}

export interface EducationCourse {
  id: string;
  name: string;
  description: string;
  duration: string;
  fee?: string;
  icon: string;
  features: string[];
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

export interface CscCategoryGroup {
  id: string;
  categoryNumber: number;
  titleHi: string;
  titleEn: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: string;
  items: ServiceItem[];
}

export const cscCategories: CscCategoryGroup[] = [
  {
    id: "govt-services",
    categoryNumber: 1,
    titleHi: "1. महत्वपूर्ण सरकारी सेवाएँ",
    titleEn: "Important Government Services",
    badgeBg: "#1e40af",
    badgeText: "#ffffff",
    badgeBorder: "#1d4ed8",
    icon: "🏛️",
    items: [
      {
        id: "aadhaar-seva",
        name: "आधार सेवा (अपडेट/प्रिंट)",
        category: "csc",
        icon: "🆔",
        description: "Official Aadhaar card download, e-KYC assistance, demographic details check, and high-quality color prints.",
        requirements: ["Aadhaar Number / Enrolment Slip", "OTP on registered mobile"],
        processingTime: "Instant (15 mins)",
        officialLink: "https://myaadhaar.uidai.gov.in/"
      },
      {
        id: "pan-card-seva",
        name: "पैन कार्ड सेवा (New PAN & Correction)",
        category: "csc",
        icon: "💳",
        description: "Apply for new Permanent Account Number (PAN) or correct existing PAN details (name, DOB, parent name, photo).",
        requirements: ["Aadhaar Card", "2 Passport Photos", "Active Mobile Number"],
        processingTime: "7 - 10 working days",
        officialLink: "https://www.onlineservices.nsdl.com/"
      },
      {
        id: "ayushman-bharat",
        name: "आयुष्मान भारत (PM-JAY Golden Card)",
        category: "csc",
        icon: "🏥",
        description: "Verification and generation of Ayushman Golden Card for free health insurance up to ₹5 Lakhs per year.",
        requirements: ["Patrata Parchi / Ration Card", "Aadhaar Card", "Mobile Number"],
        processingTime: "2 - 3 working days",
        officialLink: "https://beneficiary.nha.gov.in/"
      },
      {
        id: "pm-kisan-registration",
        name: "PM KISAN रजिस्ट्रेशन & eKYC",
        category: "csc",
        icon: "🌾",
        description: "Fresh farmer registration for PM-Kisan Samman Nidhi Yojana and biometric/OTP eKYC verification.",
        requirements: ["Land Khatauni Copy", "Aadhaar Card", "Bank Passbook", "Mobile Number"],
        processingTime: "Instant KYC, Approval 15-30 days",
        officialLink: "https://pmkisan.gov.in/"
      },
      {
        id: "e-shram-card",
        name: "ई-श्रम कार्ड (e-Shram Card)",
        category: "csc",
        icon: "👷",
        description: "National database registration for unorganized workers to obtain government social security benefits.",
        requirements: ["Aadhaar Card", "Bank Account Details", "Mobile Number"],
        processingTime: "Instant (15 mins)",
        officialLink: "https://eshram.gov.in/"
      },
      {
        id: "udid-card",
        name: "UDID Card (दिव्यांग कार्ड)",
        category: "csc",
        icon: "♿",
        description: "Unique Disability ID card application and government disability scheme certificate registration.",
        requirements: ["Medical Disability Certificate", "Aadhaar Card", "Photo", "Mobile Number"],
        processingTime: "15 - 30 working days",
        officialLink: "https://www.swavlambancard.gov.in/"
      },
      {
        id: "abha-health-id",
        name: "ABHA हेल्थ ID (Health Card)",
        category: "csc",
        icon: "🩺",
        description: "Ayushman Bharat Health Account (ABHA) digital health card creation for storing digital medical records.",
        requirements: ["Aadhaar Card", "Mobile Number for OTP"],
        processingTime: "Instant (10 mins)",
        officialLink: "https://abha.abdm.gov.in/"
      },
      {
        id: "uan-card",
        name: "UAN कार्ड (EPFO / PF Services)",
        category: "csc",
        icon: "⚙️",
        description: "Universal Account Number (UAN) generation, EPFO PF passbook download, and KYC update.",
        requirements: ["Aadhaar Card", "PAN Card", "Mobile linked with Aadhaar"],
        processingTime: "Instant (15 mins)",
        officialLink: "https://unifiedportal-mem.epfindia.gov.in/"
      },
      {
        id: "voter-id-seva",
        name: "वोटर ID सेवा (Voter Card)",
        category: "csc",
        icon: "🗳️",
        description: "New voter card application (Form 6), address change, polling station transfer, and digital EPIC card print.",
        requirements: ["Aadhaar / Age Proof", "Address Proof", "1 Passport Photo"],
        processingTime: "15 - 30 working days",
        officialLink: "https://voters.eci.gov.in/"
      }
    ]
  },
  {
    id: "edistrict-services",
    categoryNumber: 2,
    titleHi: "2. ई-डिस्ट्रिक्ट सेवाएँ",
    titleEn: "e-District UP State Services",
    badgeBg: "#15803d",
    badgeText: "#ffffff",
    badgeBorder: "#166534",
    icon: "📜",
    items: [
      {
        id: "income-certificate",
        name: "आय प्रमाण पत्र (Income Certificate)",
        category: "csc",
        icon: "📄",
        description: "Uttar Pradesh e-District online application for official annual family income verification certificate.",
        requirements: ["Self-Declaration Form", "Aadhaar Card", "Ration Card", "Passport Photo"],
        processingTime: "7 - 15 working days",
        officialLink: "https://edistrict.up.gov.in/"
      },
      {
        id: "domicile-certificate",
        name: "निवास प्रमाण पत्र (Domicile / Residence)",
        category: "csc",
        icon: "🏠",
        description: "Application for UP permanent residence certificate essential for scholarships and government jobs.",
        requirements: ["Electricity Bill / Voter ID / Ration Card", "Aadhaar Card", "Passport Photo"],
        processingTime: "7 - 15 working days",
        officialLink: "https://edistrict.up.gov.in/"
      },
      {
        id: "caste-certificate",
        name: "जाति प्रमाण पत्र (Caste Certificate)",
        category: "csc",
        icon: "📜",
        description: "Official UP state e-District application for SC/ST/OBC caste verification certificate.",
        requirements: ["Self-Declaration Form", "Father Caste Proof / Khatauni", "Aadhaar Card", "Photo"],
        processingTime: "7 - 15 working days",
        officialLink: "https://edistrict.up.gov.in/"
      },
      {
        id: "ration-card-service",
        name: "राशन कार्ड (आवेदन/सुधार)",
        category: "csc",
        icon: "🟩",
        description: "New ration card application, addition of family member names, or address correction under NFSA.",
        requirements: ["Family Head Photo", "Aadhaar of all family members", "Bank Passbook", "Income Certificate"],
        processingTime: "15 - 30 working days",
        officialLink: "https://fcs.up.gov.in/"
      },
      {
        id: "khatauni-copy",
        name: "खाता / खतौनी (भूमि की नकल)",
        category: "csc",
        icon: "🌾",
        description: "Instant Bhulekh UP land record search, certified Khatauni printout, and land ownership verification.",
        requirements: ["Khata Number / Gata Number / Farmer Name"],
        processingTime: "Instant (10 mins)",
        officialLink: "https://upbhulekh.gov.in/"
      },
      {
        id: "all-other-certificates",
        name: "अन्य सभी प्रकार के प्रमाण पत्र",
        category: "csc",
        icon: "📝",
        description: "Application for birth certificate, death certificate, character certificate, and official state affidavits.",
        requirements: ["Applicant Aadhaar Card", "Pradhan Recommendation Letter", "Photo"],
        processingTime: "7 - 20 working days",
        officialLink: "https://edistrict.up.gov.in/"
      }
    ]
  },
  {
    id: "pension-services",
    categoryNumber: 3,
    titleHi: "3. पेंशन संबंधित सेवाएँ",
    titleEn: "UP Government Pension Schemes",
    badgeBg: "#7e22ce",
    badgeText: "#ffffff",
    badgeBorder: "#6b21a8",
    icon: "👴",
    items: [
      {
        id: "old-age-pension",
        name: "वृद्धा पेंशन (Old Age Pension)",
        category: "csc",
        icon: "👴",
        description: "UP SSPY Old Age pension scheme registration for senior citizens aged 60 and above.",
        requirements: ["Aadhaar Card", "Bank Passbook", "Income Certificate", "Passport Photo"],
        processingTime: "15 - 30 working days",
        officialLink: "https://sspy-up.gov.in/"
      },
      {
        id: "widow-pension",
        name: "विधवा पेंशन (Widow Pension)",
        category: "csc",
        icon: "👩",
        description: "Financial support pension application for widowed women provided by UP Social Welfare Dept.",
        requirements: ["Husband Death Certificate", "Aadhaar Card", "Bank Passbook", "Income Certificate", "Photo"],
        processingTime: "15 - 30 working days",
        officialLink: "https://sspy-up.gov.in/"
      },
      {
        id: "disability-pension",
        name: "विकलांग पेंशन (Disability Pension)",
        category: "csc",
        icon: "♿",
        description: "Pension scheme application for physically challenged citizens with 40%+ disability certificate.",
        requirements: ["Disability Certificate (40%+)", "Aadhaar Card", "Bank Passbook", "Income Certificate", "Photo"],
        processingTime: "15 - 30 working days",
        officialLink: "https://sspy-up.gov.in/"
      },
      {
        id: "nfbs-scheme",
        name: "राष्ट्रीय पारिवारिक लाभ योजना (NFBS)",
        category: "csc",
        icon: "☔",
        description: "One-time financial assistance of ₹30,000 to poor families on the death of the primary earner.",
        requirements: ["Death Certificate of Primary Earner (Age 18-59)", "Income Certificate", "Aadhaar", "Bank Passbook", "Photo"],
        processingTime: "30 - 45 working days",
        officialLink: "https://nfbs.upsdc.gov.in/"
      }
    ]
  },
  {
    id: "sbi-csp-banking",
    categoryNumber: 4,
    titleHi: "4. बैंकिंग एवं वित्तीय सेवाएँ (SBI CSP)",
    titleEn: "SBI Customer Service Point & Financial Services",
    badgeBg: "#be185d",
    badgeText: "#ffffff",
    badgeBorder: "#9d174d",
    icon: "🏦",
    items: [
      {
        id: "account-opening",
        name: "खाता खोलना (Account Opening)",
        category: "banking",
        icon: "🏦",
        description: "Instant SBI savings bank account opening with zero balance / Jan Dhan account options.",
        requirements: ["Aadhaar Card", "PAN Card (or Form 60)", "Mobile Number", "2 Photos"],
        processingTime: "Instant (20 mins)"
      },
      {
        id: "aeps-cash-withdrawal",
        name: "AEPS / कैश निकालना (Cash Withdrawal)",
        category: "banking",
        icon: "📱",
        description: "Aadhaar Enabled Payment System for biometric cash withdrawal from any bank account in India.",
        requirements: ["Aadhaar Card Number", "Biometric Fingerprint"],
        processingTime: "Instant"
      },
      {
        id: "cash-deposit",
        name: "कैश जमा (Cash Deposit)",
        category: "banking",
        icon: "💵",
        description: "Direct cash deposit into SBI and major public bank accounts through CSP portal.",
        requirements: ["Bank Account Number", "Account Holder Name", "Cash Amount"],
        processingTime: "Instant"
      },
      {
        id: "balance-enquiry",
        name: "बैलेंस चेक (Balance Enquiry)",
        category: "banking",
        icon: "✅",
        description: "Free instant bank balance check for any Indian bank via biometric authentication.",
        requirements: ["Aadhaar Card & Bank Name"],
        processingTime: "Instant"
      },
      {
        id: "mini-statement",
        name: "मिनी स्टेटमेंट (Mini Statement)",
        category: "banking",
        icon: "📄",
        description: "Print last 5-10 transactions mini statement of your bank account.",
        requirements: ["Aadhaar Card & Bank Name"],
        processingTime: "Instant"
      },
      {
        id: "fund-transfer",
        name: "फंड ट्रांसफर (Fund Transfer / DMT)",
        category: "banking",
        icon: "🔄",
        description: "Instant Domestic Money Transfer (DMT) to any bank account in India.",
        requirements: ["Recipient Account Number", "IFSC Code", "Sender Mobile Number"],
        processingTime: "Instant"
      },
      {
        id: "sbi-kyc-update",
        name: "SBI KYC अपडेट (Re-KYC)",
        category: "banking",
        icon: "🆔",
        description: "Re-KYC update for dormant or restricted SBI bank accounts.",
        requirements: ["SBI Bank Account Number", "Aadhaar Card", "PAN Card", "Photo"],
        processingTime: "1 - 2 working days"
      },
      {
        id: "new-account-opening",
        name: "नया खाता खोलना (New Account Opening)",
        category: "banking",
        icon: "👤",
        description: "SBI savings, minor account, and PMJJBY / PMSBY insured bank account opening.",
        requirements: ["Aadhaar Card", "Mobile Number", "Passport Photos"],
        processingTime: "Instant"
      },
      {
        id: "atm-card-apply",
        name: "ATM कार्ड अप्लाई करें (ATM Card Apply)",
        category: "banking",
        icon: "💳",
        description: "Application & re-issuance request for SBI Debit / ATM Card.",
        requirements: ["SBI Bank Passbook", "Aadhaar Card", "Mobile Number"],
        processingTime: "Delivered to home in 7-10 days"
      }
    ]
  },
  {
    id: "education-services-csc",
    categoryNumber: 5,
    titleHi: "5. शिक्षा सेवाएँ",
    titleEn: "Education & Skill Development",
    badgeBg: "#0f766e",
    badgeText: "#ffffff",
    badgeBorder: "#115e59",
    icon: "🎓",
    items: [
      {
        id: "computer-typing-courses",
        name: "कंप्यूटर कोर्स एवं टाइपिंग",
        category: "education",
        icon: "💻",
        description: "Basic Computer Training (CCC, ADCA, Tally Prime) and Hindi/English typing speed development.",
        requirements: ["Student Photo", "Aadhaar Copy", "Qualification Proof"],
        processingTime: "Monthly Batch"
      },
      {
        id: "scholarship-form",
        name: "छात्रवृत्ति फॉर्म (UP Scholarship)",
        category: "education",
        icon: "🎓",
        description: "Fresh and Renewal online application for UP State Pre-Matric & Post-Matric Scholarships.",
        requirements: ["Marksheet", "Income Certificate", "Caste Certificate", "Domicile", "Bank Passbook", "Fee Receipt"],
        processingTime: "Annual Schedule"
      },
      {
        id: "board-exam-form",
        name: "बोर्ड परीक्षा फॉर्म (UP Board / Open)",
        category: "education",
        icon: "📚",
        description: "UP Board Class 10th & 12th private exam form filling, roll number check, and admit card download.",
        requirements: ["Previous Class Marksheet", "Aadhaar Card", "Photo", "Signature"],
        processingTime: "Examination Schedule"
      },
      {
        id: "competitive-exam-form",
        name: "प्रतियोगी परीक्षा फॉर्म (Job Exams)",
        category: "education",
        icon: "📝",
        description: "Online application for SSC, Railway, UP Police, UPSC, Lekhpal, and Teacher recruitment exams.",
        requirements: ["Educational Marksheets", "Category Certificate", "Photo & Signature Scan"],
        processingTime: "Instant (30 mins)"
      }
    ]
  },
  {
    id: "other-services-csc",
    categoryNumber: 6,
    titleHi: "6. अन्य सेवाएँ",
    titleEn: "Utility & Administrative Services",
    badgeBg: "#1d4ed8",
    badgeText: "#ffffff",
    badgeBorder: "#1e40af",
    icon: "⚙️",
    items: [
      {
        id: "driving-licence-service",
        name: "ड्राइविंग लाइसेंस सेवा (DL Service)",
        category: "csc",
        icon: "🪪",
        description: "Online application for Learner's Driving Licence (LL), Permanent DL, slot booking, and DL renewal.",
        requirements: ["Aadhaar Card (OTP linked)", "Age Proof", "Passport Photo", "Signature"],
        processingTime: "7 - 15 working days",
        officialLink: "https://parivahan.gov.in/"
      },
      {
        id: "vehicle-rc-service",
        name: "वाहन RC सेवा (Vehicle RC Service)",
        category: "csc",
        icon: "🚙",
        description: "Vehicle Registration Certificate (RC) print, ownership transfer application, and fitness status check.",
        requirements: ["Vehicle Number", "Chassis Number", "Owner Aadhaar"],
        processingTime: "3 - 7 working days",
        officialLink: "https://parivahan.gov.in/"
      },
      {
        id: "passport-service",
        name: "पासपोर्ट सेवा (Passport Service)",
        category: "csc",
        icon: "📘",
        description: "Fresh passport online application, appointment slot booking at Passport Seva Kendra (PSK), and document check.",
        requirements: ["Aadhaar Card", "PAN Card", "Bank Passbook / Birth Proof", "10th Marksheet"],
        processingTime: "Appointment in 3-5 days",
        officialLink: "https://passportindia.gov.in/"
      },
      {
        id: "railway-ticket-booking",
        name: "रेलवे टिकट बुकिंग (IRCTC Train Ticket)",
        category: "csc",
        icon: "✈️",
        description: "Official IRCTC authorized train ticket booking (Confirm/Tatkal), ticket cancellation, and PNR status check.",
        requirements: ["Passenger Names", "Age", "Travel Date", "Origin & Destination Stations"],
        processingTime: "Instant"
      },
      {
        id: "computer-printing-scanning",
        name: "कम्प्यूटर / प्रिंटिंग / स्कैनिंग",
        category: "csc",
        icon: "🖥️",
        description: "Color/Black & White document printing, document scanning to PDF/JPG, email sending, and document typing.",
        requirements: ["Document file or original hard copy"],
        processingTime: "Instant"
      },
      {
        id: "lamination-service",
        name: "लेमिनेशन (Lamination Service)",
        category: "csc",
        icon: "📄",
        description: "High-quality heat pouch lamination for marksheets, certificates, Aadhaar prints, and licenses.",
        requirements: ["Hard copy of certificate/card"],
        processingTime: "Instant (2 mins)"
      },
      {
        id: "photo-copy-xerox",
        name: "फोटो कॉपी (Photocopy Xerox)",
        category: "csc",
        icon: "👥",
        description: "High-speed crisp photocopy (single-sided / double-sided / ID card combine copy).",
        requirements: ["Original document"],
        processingTime: "Instant"
      },
      {
        id: "photo-design-other",
        name: "फोटो, डिज़ाइन एवं अन्य सेवाएँ",
        category: "csc",
        icon: "🎨",
        description: "Passport size photo creation (instant 8/16/32 prints), resume making, logo design, and custom form editing.",
        requirements: ["Soft/Hard Copy Photo", "Bio-data details"],
        processingTime: "Instant (10 mins)"
      }
    ]
  }
];

export const services: ServiceItem[] = cscCategories.flatMap((cat) => cat.items);

export const pvcProducts: PVCProduct[] = [
  {
    id: "pvc-aadhaar",
    slug: "aadhaar-pvc",
    name: "Aadhaar PVC Card",
    price: 149,
    description: "Durable, wallet-sized, waterproof Aadhaar smart card printed on premium glossy plastic with sharp QR code.",
    requirements: ["Official e-Aadhaar PDF File", "OR Aadhaar Number + Registered Mobile for OTP"],
    features: ["Standard ATM Card Dimensions", "Vibrant UV-resistant printing", "Waterproof & scratch proof", "Clear QR code readability"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/aadhaar-pvc.jpg"
  },
  {
    id: "pvc-pan",
    slug: "pan-pvc",
    name: "PAN PVC Card",
    price: 149,
    description: "Permanent Account Number printed on high-definition glossy plastic card. Excellent replacement for faded paper cards.",
    requirements: ["Official e-PAN Card PDF file", "OR PAN Number + Date of Birth"],
    features: ["Durable credit-card finish", "Glossy protective overlay", "Accurate color output", "Fits snugly in any wallet"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/pan-pvc.jpg"
  },
  {
    id: "pvc-ayushman",
    slug: "ayushman-pvc",
    name: "Ayushman PVC Card",
    price: 149,
    description: "Keep your PM-JAY Golden health card protected and ready for hospital admissions in card format.",
    requirements: ["Ayushman Golden Card PDF file", "OR Beneficiary Family ID / Aadhaar"],
    features: ["High durability for emergency usage", "Crisp text for hospital verification", "Waterproof laminate overlay"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/ayushman-pvc.jpg"
  },
  {
    id: "pvc-rc",
    slug: "rc-pvc",
    name: "Vehicle RC PVC Card",
    price: 149,
    description: "Order a plastic copy of your Vehicle Registration Certificate (RC) for dashboard convenience.",
    requirements: ["RC PDF file from Vahan / DigiLocker", "OR Vehicle Registration Number"],
    features: ["Heat resistant material", "Double-sided high contrast print", "Compact glove-box size"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/rc-pvc.jpg"
  },
  {
    id: "pvc-student",
    slug: "student-id-pvc",
    name: "Student ID PVC Card (APAAR)",
    price: 149,
    description: "Print your APAAR Academic ID or school/college student identity card on a glossy, durable plastic card.",
    requirements: ["APAAR Card PDF layout or high-res photo scan", "OR Student ID / Admission receipt"],
    features: ["Vivid color rendering", "Durable badge protection coating", "Double-sided custom print matching", "Free lanyard slot punch if requested"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/apaar-student-pvc.jpg"
  },
  {
    id: "pvc-abha",
    slug: "abha-pvc",
    name: "ABHA PVC Card",
    price: 149,
    description: "Ayushman Bharat Health Account (ABHA) ID card printed on smart plastic with clear QR code.",
    requirements: ["ABHA Card PDF download", "OR ABHA Number"],
    features: ["Scannable QR code", "ATM card size", "Waterproof"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/abha-pvc.jpg"
  },
  {
    id: "pvc-ration",
    slug: "ration-pvc",
    name: "Ration Card PVC",
    price: 149,
    description: "Get your digital ration card details printed onto a durable plastic PVC card for convenient usage at ration shops.",
    requirements: ["Ration Card PDF file or photo scan", "OR Ration Card Number + District"],
    features: ["ATM card size convenience", "Readable ration dealer barcodes", "Vibrant typography scaling", "Waterproof glossy finish"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/ration-pvc.jpg"
  },
  {
    id: "pvc-dl",
    slug: "driving-licence-pvc",
    name: "Vehicle DL PVC Card",
    price: 149,
    description: "Convert your temporary virtual driving licence PDF from DigiLocker into a sturdy plastic card.",
    requirements: ["Driving Licence PDF from Sarathi / DigiLocker", "OR Driving Licence Number"],
    features: ["Thick 800 micron plastic", "Official Sarathi design compliance", "Water & smudge resistant"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/dl-pvc.jpg"
  },
  {
    id: "pvc-eshram",
    slug: "eshram-pvc",
    name: "e-Shram PVC Card",
    price: 149,
    description: "Print your UWIN e-Shram unorganized worker card on durable plastic for long-term safety.",
    requirements: ["e-Shram PDF download", "OR UAN number"],
    features: ["Vibrant color print", "Pocket-friendly", "Long lasting"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/eshram-pvc.jpg"
  },
  {
    id: "pvc-farmer",
    slug: "farmer-id-pvc",
    name: "Farmer ID PVC Card (Kisan Card)",
    price: 149,
    description: "Print your PM-Kisan Farmer ID registry details onto a glossy, waterproof plastic smart card for cooperative markets.",
    requirements: ["PM-Kisan registry summary or Farmer Certificate PDF", "OR Farmer Registration ID"],
    features: ["Extremely long-lasting plastic", "Waterproof for agricultural environments", "Official crop scheme credentials layout", "ATM pocket-friendly shape"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/kisan-pvc.jpg"
  },
  {
    id: "pvc-voter",
    slug: "voter-pvc",
    name: "Voter ID PVC Smart Card",
    price: 149,
    description: "Upgrade your paper Voter ID card to a modern, robust PVC Smart Card with barcode clarity.",
    requirements: ["Voter ID PDF or EPIC Number", "OR Clear Voter card scan"],
    features: ["Standard ECI layout", "Enhanced card durability", "Double-sided full color printing"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/voter-pvc.jpg"
  },
  {
    id: "pvc-udid",
    slug: "udid-pvc",
    name: "Unique Disability ID (UDID) PVC Card",
    price: 149,
    description: "Convert your paper disability card into a wallet-sized, waterproof UDID smart card for convenient travel and medical usage.",
    requirements: ["UDID Card PDF or Certificate PDF", "OR UDID Number details"],
    features: ["Reinforced heavy plastic structure", "Vibrant high-contrast visibility", "Dual-sided official layouts", "Waterproof and tearproof"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/udid-pvc.jpg"
  },
  {
    id: "pvc-uan",
    slug: "uan-pvc",
    name: "EPFO UAN PVC Smart Card",
    price: 149,
    description: "Print your Universal Account Number (UAN) details on a glossy PVC smart card for EPF member verifications.",
    requirements: ["UAN Card PDF from Unified Member Portal", "OR UAN Number details"],
    features: ["ATM card dimensions template", "Glossy wear-resistant laminate", "Official EPFO green themes matching", "Clear Member details rendering"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-aadhaar-mockup.jpg"
  },
  {
    id: "pvc-student",
    slug: "student-id-pvc",
    name: "Student ID PVC Card",
    price: 149,
    description: "Convert your temporary paper student identity documents or school/college registry cards into a glossy, durable plastic card.",
    requirements: ["Student ID Card layout PDF or high-res photo scan", "OR Admission receipt with photo"],
    features: ["Vivid color rendering", "Durable badge protection coating", "Double-sided custom print matching", "Free lanyard slot punch if requested"],
    deliveryTime: "3 - 7 Days across India",
    image: "/images/pvc-pan-mockup.jpg"
  }
];

export const digitalProducts: DigitalProduct[] = [
  {
    id: "digi-cert-kit",
    name: "UP e-District Certificate Processing",
    description: "Complete online application service for Income, Caste, Domicile, and Family Register certificates with official tracking ID.",
    price: 99,
    icon: "📄",
    category: "Certificate Applications"
  },
  {
    id: "digi-khatauni",
    name: "Certified Land Records (Bhoolekh Khatauni)",
    description: "Official digital search, download, and high-clarity printout of UP land ownership Khatauni & Khasra records.",
    price: 49,
    icon: "🌾",
    category: "Land Records"
  },
  {
    id: "digi-form-fill",
    name: "Govt Job & Academic Form Assistance",
    description: "Error-free online form registration, photo/signature resizing, document scanning, and fee payment assistance.",
    price: 149,
    icon: "💻",
    category: "Form Filling"
  }
];

export const educationCourses: EducationCourse[] = [
  {
    id: "course-bcc",
    name: "Basic Computer Course (BCC)",
    description: "Comprehensive 1-month computer literacy course covering Computer Basics, MS Windows, MS Word, Excel, PowerPoint & Internet browsing.",
    duration: "1 Month (30 Hours)",
    fee: "₹999",
    icon: "💻",
    features: ["Hands-on Practical Classes", "MS Office Basics", "Internet & Email Usage", "Course Certificate"]
  },
  {
    id: "course-typing",
    name: "Hindi & English Computer Typing",
    description: "Master fast computer keyboard typing skills in English (QWERTY) and Hindi (Mangal Font / Kruti Dev) for government exam skill tests.",
    duration: "2 Months",
    fee: "₹1,499",
    icon: "⌨️",
    features: ["Speed Building Drills", "Mangal & Kruti Dev Fonts", "Accuracy Check Software", "Skill Test Preparation"]
  },
  {
    id: "course-tally",
    name: "Financial Accounting & Tally Prime",
    description: "Learn fundamental accounting concepts, GST invoicing, voucher entry, inventory management, and trial balance generation in Tally Prime.",
    duration: "3 Months",
    fee: "₹2,999",
    icon: "📊",
    features: ["Tally Prime Invoicing", "GST Tax Calculation", "Billing & Stock Entry", "Practical Business Case Studies"]
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
    answer: "आर्डर सबमिट करने के बाद आपको आर्डर ID मिल जाती है। पेमेंट स्टेटस सुरक्षित रूप से ट्रैक किया जा सकता है। हम ग्राहकों को बिना छिपे शुल्क के पारदर्शी सेवा प्रदान करते हैं।",
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

