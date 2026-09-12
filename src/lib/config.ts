export const SITE_CONFIG = {
  // Global business identity
  brandName: "UNIQUE COMPUTER CENTRE",
  brandSubtitle: "Unique Computer Centre – CSC Point",
  shortBrand: "Unique CSC Point",

  // Business contact parameters (Centralized - update here when new client values are provided)
  whatsAppNumber: "918299315137",
  phoneNumber: "+91 82993 15137",
  emailAddress: "Uniquecscpoint1020@gmail.com",
  businessAddress: "Aryavart bank ke bagal, Harchanda, Jarwal, Bahraich (UP) 271904",
  openingHours: "Monday - Saturday: 08:00 AM - 07:00 PM (Sunday Closed)",
  fallbackBasePrice: 100,

  // Social media links
  instagramUrl: "https://www.instagram.com/unique_csc_point/",
  facebookUrl: "https://www.facebook.com/unique.csc.point?rdid=zAWEt1oVlpo3w8KL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BBF3odqbY%2F#",

  // Logo asset status
  logoAssetPath: "/images/logo.jpg",

  // Helpers
  getWhatsAppProductLink: (productName: string) => {
    const text = `Hello Unique Computer Centre, mujhe ${productName} ke baare mein information chahiye.`;
    return `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodeURIComponent(text)}`;
  },

  getWhatsAppHelpLink: () => {
    const text = "Hello Unique Computer Centre, mujhe help chahiye.";
    return `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodeURIComponent(text)}`;
  },

  getWhatsAppServiceLink: (serviceName: string) => {
    const text = `Hello Unique Computer Centre, mujhe ${serviceName} service ke baare mein enquiry karni hai.`;
    return `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodeURIComponent(text)}`;
  }
};

