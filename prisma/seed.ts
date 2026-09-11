import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const services = [
  {
    name: "New PAN Card & Correction",
    category: "digital",
    icon: "💳",
    description: "Apply for a new Permanent Account Number (PAN) or make corrections to your existing PAN card details (name, DOB, photo, signature).",
    requirements: JSON.stringify(["Aadhaar Card", "2 Passport Size Photos", "Active Mobile Number"]),
    processingTime: "7 - 10 working days",
    officialLink: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
  },
  {
    name: "Aadhaar Card Download & Print",
    category: "csc",
    icon: "🆔",
    description: "Get your official Aadhaar card downloaded and high-quality color prints on premium paper or smart cards.",
    requirements: JSON.stringify(["Aadhaar Number or Enrolment ID", "OTP sent to registered mobile"]),
    processingTime: "Instant (15 mins)",
    officialLink: "https://myaadhaar.uidai.gov.in/"
  },
  {
    name: "Ayushman Bharat Golden Card",
    category: "csc",
    icon: "🏥",
    description: "Apply for or download your Ayushman Bharat PM-JAY Golden Card to get free health insurance cover of up to ₹5 Lakhs per year.",
    requirements: JSON.stringify(["Ration Card (Patrata Parchi)", "Aadhaar Card", "Mobile Number linked to Aadhaar"]),
    processingTime: "2 - 3 working days",
    officialLink: "https://beneficiary.nha.gov.in/"
  },
  {
    name: "PM-Kisan Registration & eKYC",
    category: "csc",
    icon: "🌾",
    description: "New registration for PM-Kisan Samman Nidhi Yojana and completion of mandatory biometric or OTP eKYC.",
    requirements: JSON.stringify(["Land Khatauni / Land Details", "Aadhaar Card", "Bank Passbook", "Mobile Number"]),
    processingTime: "Instant KYC, Approval takes 15-30 days",
    officialLink: "https://pmkisan.gov.in/"
  },
  {
    name: "e-Shram Registration & Card",
    category: "csc",
    icon: "👷",
    description: "Registration for unorganized sector workers to secure government scheme benefits and financial aids.",
    requirements: JSON.stringify(["Aadhaar Card", "Bank Account Details", "Mobile Number linked to Aadhaar"]),
    processingTime: "Instant (15 mins)",
    officialLink: "https://eshram.gov.in/"
  },
  {
    name: "Voter ID Registration & Card Correction",
    category: "digital",
    icon: "🗳️",
    description: "Apply for a new Voter ID card, transfer vote, or correct details like name, address, and age.",
    requirements: JSON.stringify(["Aadhaar Card or Birth Certificate", "Address Proof", "1 Passport Size Photo"]),
    processingTime: "15 - 30 working days",
    officialLink: "https://voters.eci.gov.in/"
  },
  {
    name: "Income, Caste & Domicle Certificates",
    category: "digital",
    icon: "📄",
    description: "Apply for official Uttar Pradesh government certificates: Income (Aay Praman Patra), Caste (Jati Praman Patra), and Domicile (Nivas Praman Patra).",
    requirements: JSON.stringify(["Self-Declaration Form", "Aadhaar Card", "Ration Card or Voter ID", "Passport Size Photo"]),
    processingTime: "7 - 15 working days",
    officialLink: "https://edistrict.up.gov.in/"
  },
  {
    name: "AePS Cash Deposit & Withdrawal",
    category: "banking",
    icon: "🏦",
    description: "Aadhaar Enabled Payment System (AePS) allowing you to withdraw, deposit, or check balance of any bank account using biometrics.",
    requirements: JSON.stringify(["Aadhaar Card", "Linked Bank Account", "Biometric (Fingerprint) Verification"]),
    processingTime: "Instant",
  },
  {
    name: "Board & University Exam Forms",
    category: "education",
    icon: "📝",
    description: "Professional assistance with error-free filling of UP Board, CBSE, and local university examination and admission forms.",
    requirements: JSON.stringify(["Previous Year Marksheet", "Passport Photo", "Signature", "Admit Card / Roll Number"]),
    processingTime: "Instant (30 mins)",
  },
  {
    name: "UP Pre/Post Matric Scholarship",
    category: "education",
    icon: "🎓",
    description: "Apply online for government financial support for Class 9, 10, 11, 12 and university/diploma courses in Uttar Pradesh.",
    requirements: JSON.stringify(["Aadhaar Card", "Income, Caste & Domicile Certificates", "Fee Receipt & College ID", "Bank Passbook"]),
    processingTime: "15 - 25 days (Verification pending college)",
    officialLink: "https://scholarship.up.gov.in/"
  },
  {
    name: "Basic Computer Courses & Training",
    category: "education",
    icon: "💻",
    description: "Learn typing, MS Office, internet skills, and digital literacy under specialized guidance at our physical computer centre.",
    requirements: JSON.stringify(["Interest to Learn", "Photo ID Proof"]),
    processingTime: "1 Month to 3 Months courses",
  }
];

const pvcProducts = [
  {
    slug: "aadhaar-pvc",
    name: "Aadhaar PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Order a durable, wallet-sized, waterproof Aadhaar smart card printed on premium plastic (PVC) with UV protection.",
    requirements: JSON.stringify([
      "Official Aadhaar PDF File (Downloaded from myAadhaar portal)",
      "OR Aadhaar Number + OTP for download assistance"
    ]),
    features: JSON.stringify([
      "Wallet-sized (standard ATM size)",
      "Vibrant high-definition colors",
      "Scratch & water-resistant",
      "Guaranteed barcode/QR code scan readability"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/aadhaar-pvc.jpg",
    category: "identity",
    featured: true
  },
  {
    slug: "pan-pvc",
    name: "PAN PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Get your Permanent Account Number printed on a premium glossy plastic PVC card. Convenient replacement for paper/faded cards.",
    requirements: JSON.stringify([
      "Official e-PAN Card PDF file",
      "OR PAN Number + Date of Birth"
    ]),
    features: JSON.stringify([
      "Durable credit-card style layout",
      "Glossy premium finish",
      "Perfect color representation",
      "Fits securely in wallets"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/pan-pvc.jpg",
    category: "identity",
    featured: true
  },
  {
    slug: "ayushman-pvc",
    name: "Ayushman PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Make your PM-JAY Golden health card easy to carry in your wallet. Crucial for emergency hospital admissions.",
    requirements: JSON.stringify([
      "Ayushman Golden Card PDF file",
      "OR Beneficiary Family ID / Aadhaar"
    ]),
    features: JSON.stringify([
      "High durability for medical usage",
      "Clear font rendering of Scheme details",
      "Pocket-sized for immediate access",
      "Glossy protection overlay"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/ayushman-pvc.jpg",
    category: "utility",
    featured: true
  },
  {
    slug: "rc-pvc",
    name: "Vehicle RC PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Order a durable plastic duplicate of your Vehicle Registration Certificate (RC) for dashboard convenience.",
    requirements: JSON.stringify([
      "Registration Certificate PDF from Vahan / DigiLocker",
      "OR Vehicle Registration Number"
    ]),
    features: JSON.stringify([
      "Double-sided high-contrast printing",
      "Extremely long-lasting plastic",
      "Durable in humid/hot glove boxes",
      "Accurate official format"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/rc-pvc.jpg",
    category: "identity",
    featured: true
  },
  {
    slug: "student-id-pvc",
    name: "Student ID PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Print your school/college student identity card on a glossy, durable plastic PVC smart card with custom lanyards.",
    requirements: JSON.stringify([
      "Student ID Card layout PDF or high-res photo scan",
      "OR Admission form receipt with student photo"
    ]),
    features: JSON.stringify([
      "Vivid color rendering",
      "Durable badge protection coating",
      "Double-sided custom print matching",
      "Free lanyard slot punch if requested"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/student-id-pvc.jpg",
    category: "academic_others",
    featured: true
  },
  {
    slug: "abha-pvc",
    name: "ABHA PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Print your Ayushman Bharat Health Account (ABHA) card on premium plastic. Convenient, wallet-sized, and long-lasting for easy hospital scans.",
    requirements: JSON.stringify([
      "ABHA Health Card PDF downloaded from ABHA portal",
      "OR Health ID Number"
    ]),
    features: JSON.stringify([
      "Pocket-sized for medical emergencies",
      "Accurate QR barcode reproduction",
      "Waterproof glossy structure",
      "Official alignment layouts"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/abha-pvc.jpg",
    category: "utility",
    featured: true
  },
  {
    slug: "ration-pvc",
    name: "Ration Card PVC",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Get your digital ration card details printed onto a durable, easy-to-carry PVC plastic card for convenient usage at government ration shops.",
    requirements: JSON.stringify([
      "Ration Card PDF file or photo scan",
      "OR Ration Card Number + District"
    ]),
    features: JSON.stringify([
      "ATM card size convenience",
      "Readable ration dealer barcodes",
      "Vibrant typography scaling",
      "Waterproof glossy finish"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/ration-pvc.jpg",
    category: "utility",
    featured: true
  },
  {
    slug: "driving-licence-pvc",
    name: "Vehicle DL PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Convert your temporary virtual driving licence PDF into a robust, high-quality plastic card to show to authorities.",
    requirements: JSON.stringify([
      "Driving Licence PDF downloaded from Sarathi / DigiLocker",
      "OR Driving Licence Number"
    ]),
    features: JSON.stringify([
      "Premium thick PVC material",
      "High resolution typography",
      "Official design alignment",
      "Waterproof finish"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/dl-pvc.jpg",
    category: "identity",
    featured: false
  },
  {
    slug: "e-shram-pvc",
    name: "e-Shram PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Get your e-Shram worker identification card printed on a durable, waterproof PVC smart card to easily carry to work sites and secure government benefits.",
    requirements: JSON.stringify([
      "e-Shram Card PDF downloaded from official portal",
      "OR e-Shram registered phone number"
    ]),
    features: JSON.stringify([
      "High-contrast color print",
      "Standard credit card size",
      "Laminated moisture barrier",
      "Heavy duty plastic build"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/eshram-pvc.jpg",
    category: "utility",
    featured: false
  },
  {
    slug: "farmer-id-pvc",
    name: "Farmer ID PVC Card (Kisan Card)",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Print your PM-Kisan Farmer ID registry details onto a glossy, waterproof plastic smart card for easy presentation at local cooperative markets and seeds counters.",
    requirements: JSON.stringify([
      "PM-Kisan registry summary or Farmer Certificate PDF",
      "OR Farmer Registration ID"
    ]),
    features: JSON.stringify([
      "Extremely long-lasting plastic",
      "Waterproof for agricultural environments",
      "Official crop scheme credentials layout",
      "ATM pocket-friendly shape"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/kisan-pvc.jpg",
    category: "academic_others",
    featured: false
  },
  {
    slug: "voter-pvc",
    name: "Voter ID PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Upgrade your old paper Voter Card to a modern, security-enabled PVC Smart Voter ID.",
    requirements: JSON.stringify([
      "Voter ID PDF or EPIC Number",
      "OR Voter card photo scan"
    ]),
    features: JSON.stringify([
      "Official standard dimensions",
      "Enhanced durability",
      "Readable election barcode",
      "Dual-sided color printing"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/voter-pvc.jpg",
    category: "identity",
    featured: false
  },
  {
    slug: "udid-pvc",
    name: "Unique Disability ID (UDID) PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Convert your paper disability card into a wallet-sized, waterproof UDID smart card. Highly durable and convenient for obtaining travel and medical concessions.",
    requirements: JSON.stringify([
      "UDID Card PDF or Certificate PDF",
      "OR UDID Number details"
    ]),
    features: JSON.stringify([
      "Reinforced heavy plastic structure",
      "Vibrant high-contrast visibility",
      "Dual-sided official layouts",
      "Waterproof and tearproof design"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/udid-pvc.jpg",
    category: "utility",
    featured: false
  },
  {
    slug: "uan-pvc",
    name: "EPFO UAN PVC Card",
    price: 100,
    shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
    description: "Get your Universal Account Number (UAN) details printed on a glossy PVC smart card. Highly convenient for EPFO member verifications at bank branches and new offices.",
    requirements: JSON.stringify([
      "UAN Card PDF from Unified Member Portal",
      "OR UAN Number details"
    ]),
    features: JSON.stringify([
      "ATM card dimensions template",
      "Glossy wear-resistant laminate",
      "Official EPFO green themes matching",
      "Clear Member details rendering"
    ]),
    deliveryTime: "3 - 7 Days across India",
    image: "/images/cards/uan-pvc.jpg",
    category: "utility",
    featured: false
  }
];

const reviews = [
  {
    rating: 5,
    content: "मैंने यहाँ से अपना आधार और पैन कार्ड PVC में प्रिंट करवाया। बहुत ही बढ़िया क्वालिटी है, बिल्कुल असली ATM कार्ड जैसा दिखता है।",
    author: "Rahul Verma",
    location: "Jarwal Road, Bahraich",
    date: "12 Aug 2026"
  },
  {
    rating: 5,
    content: "Unique Computer Centre has excellent service! I filled my university scholarship form here. Irfak ji was very patient and made sure all details were correct.",
    author: "Amit Kumar Yadav",
    location: "Harchanda, Jarwal",
    date: "05 Aug 2026"
  },
  {
    rating: 5,
    content: "मैंने पीएम किसान ई-केवाईसी करवाई थी। दुकान पर भीड़ होने के बावजूद उन्होंने 5 मिनट में मेरा काम कर दिया। बहुत बढ़िया व्यव्हार है।",
    author: "Ramesh Prasad",
    location: "Bahraich",
    date: "28 Jul 2026"
  }
];

const galleryItems = [
  {
    title: "Main Computer Workspace Area",
    category: "centre",
    image: "/images/csc-workspace.jpg",
    alt: "Inside view of Unique Computer Centre desktop workstations and printers"
  },
  {
    title: "Glossy Aadhaar PVC Smart Cards",
    category: "pvc",
    image: "/images/pvc-aadhaar-mockup.jpg",
    alt: "Mockup print sample of Aadhaar PVC smart card with barcode details"
  },
  {
    title: "Mohd Irfak Ahmad at Center Desk",
    category: "staff",
    image: "/images/founder.jpg",
    alt: "Mohd Irfak Ahmad, founder of Unique Computer Centre smiling at his desk"
  },
  {
    title: "Glossy PAN PVC Smart Cards",
    category: "pvc",
    image: "/images/pvc-pan-mockup.jpg",
    alt: "Mockup print sample of Permanent Account Number PAN card on plastic smart card"
  }
];

const blogs = [
  {
    title: "How to Download and Print Your Smart PVC Aadhaar Card Online",
    slug: "download-print-smart-pvc-aadhaar",
    summary: "A step-by-step guide explaining how to securely download your e-Aadhaar PDF card from the UIDAI portal and print it on a wallet-sized durable plastic PVC card.",
    content: `## Introduction
The Aadhaar card is the most crucial identity document in India. Carrying the paper printout in your pocket can lead to tearing, wetting, or wear. A premium PVC smart Aadhaar card is the perfect alternative. Here is a step-by-step guide on how to print your Aadhaar on PVC.

## Step 1: Download your e-Aadhaar PDF
To print your Aadhaar, you need the official e-Aadhaar PDF file. You can download it directly from the UIDAI portal (myaadhaar.uidai.gov.in) using your Aadhaar number or Enrolment ID.

## Step 2: Ensure OTP verification
During download, UIDAI will send a one-time password (OTP) to your registered mobile number. Complete this verification to download the password-protected PDF file.

## Step 3: Order on UniqueCSCPoint
Go to our orders page, select 'Aadhaar PVC Smart Card', enter your name and phone, upload the downloaded PDF file, specify your village/district address, and complete the ₹149 payment. We print it on a high-definition PVC card and ship it with free delivery!`,
    category: "UIDAI Guides",
    author: "Mohd Irfak Ahmad",
    publishedDate: "24 Aug 2026",
    readTime: "4 mins read",
    image: "/images/pvc-aadhaar-mockup.jpg"
  },
  {
    title: "Applying for Income, Caste, and Domicile Certificates in UP",
    slug: "apply-income-caste-domicile-up",
    summary: "A complete guide for citizens of Bahraich and wider Uttar Pradesh on the documents required and steps to apply for official e-District certificates.",
    content: `## Overview
Income (Aay), Caste (Jati), and Domicile (Nivas) certificates are vital documents for students applying for scholarships and citizens seeking government benefits in Uttar Pradesh. Here is how you can apply for these online.

## Documents Required
To apply, you need the following scanned copies:
- Clear passport size photo
- Aadhaar card as identity proof
- Self-Declaration Form (Swaghosna Patra)
- Ration card copy or Voter ID

## Processing Timeline
Once submitted, the files are verified by your local Lekhpal (revenue officer) and Tehsildar. The process typically takes 7 to 15 working days. You can check updates on the UP e-District site or visit our physical counter in Harchanda, Jarwal for swift execution.`,
    category: "e-District",
    author: "Mohd Irfak Ahmad",
    publishedDate: "18 Aug 2026",
    readTime: "5 mins read",
    image: "/images/csc-workspace.jpg"
  }
];

async function main() {
  console.log("Seeding database + blogs via TSX...");

  // Seed Services
  for (const s of services) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.service.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: s.name,
        category: s.category,
        icon: s.icon,
        description: s.description,
        requirements: s.requirements,
        processingTime: s.processingTime,
        officialLink: s.officialLink || null,
        active: true,
      },
    });
  }

  // Seed Products
  for (const p of pvcProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        price: p.price,
        description: p.description,
        shortDescription: p.shortDescription,
        requirements: p.requirements,
        features: p.features,
        deliveryTime: p.deliveryTime,
        image: p.image,
        category: p.category,
        featured: p.featured,
      },
      create: {
        slug: p.slug,
        name: p.name,
        price: p.price,
        description: p.description,
        shortDescription: p.shortDescription,
        requirements: p.requirements,
        features: p.features,
        deliveryTime: p.deliveryTime,
        image: p.image,
        category: p.category,
        featured: p.featured,
        active: true,
      },
    });
  }

  // Seed Reviews
  for (const r of reviews) {
    await prisma.review.create({
      data: {
        rating: r.rating,
        content: r.content,
        author: r.author,
        location: r.location,
        date: r.date,
        approved: true,
      },
    });
  }

  // Seed Blogs
  for (const b of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        title: b.title,
        slug: b.slug,
        summary: b.summary,
        content: b.content,
        category: b.category,
        author: b.author,
        publishedDate: b.publishedDate,
        readTime: b.readTime,
        image: b.image,
        published: true,
      },
    });
  }

  // Seed Gallery Items
  for (const g of galleryItems) {
    await prisma.galleryItem.create({
      data: {
        title: g.title,
        category: g.category,
        image: g.image,
        alt: g.alt,
      },
    });
  }

  // Seed default settings
  const defaultSettings = [
    { key: "whatsapp_number", value: "918299315137" },
    { key: "business_phone", value: "+91 82993 15137" },
    { key: "business_email", value: "Uniquecscpoint1020@gmail.com" },
    { key: "business_address", value: "Aryavart bank ke bagal, Harchanda, Jarwal, Bahraich (UP) 271904" },
    { key: "pvc_base_price", value: "100" },
  ];

  for (const set of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: set.key },
      update: {},
      create: {
        key: set.key,
        value: set.value,
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  });
