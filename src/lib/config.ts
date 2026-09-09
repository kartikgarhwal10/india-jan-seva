export const SITE_CONFIG = {
  // Global business identity
  brandName: "UNIQUE CSC POINT",
  brandSubtitle: "Unique Computer Centre – CSC Point",
  shortBrand: "Unique CSC Point",

  // Business contact parameters (Centralized - update here when new client values are provided)
  whatsAppNumber: "918299315137",
  phoneNumber: "+91 82993 15137",
  emailAddress: "Uniquecscpoint1020@gmail.com",
  businessAddress: "Aryavart bank ke bagal, Harchanda, Jarwal, Bahraich (UP) 271904",
  openingHours: "Monday - Saturday: 08:00 AM - 07:00 PM (Sunday Closed)",
  fallbackBasePrice: 149,

  // Logo asset status
  logoAssetPath: null, // Set to "/images/logo.png" once logo asset is provided by client

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

