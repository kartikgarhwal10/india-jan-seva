export const SITE_CONFIG = {
  // Global business parameters
  whatsAppNumber: "917084666326",
  phoneNumber: "+91 70846 66326",
  emailAddress: "support@uniquecscpoint.in",
  businessAddress: "Harchanda, Jarwal, Bahraich, Uttar Pradesh, 271904",
  fallbackBasePrice: 149,

  // Helper to generate a prefilled product WhatsApp link
  getWhatsAppProductLink: (productName: string) => {
    const text = `Hello Unique Computer Centre, mujhe ${productName} ke baare mein information chahiye.`;
    return `https://wa.me/917084666326?text=${encodeURIComponent(text)}`;
  },

  // Helper for generic help WhatsApp link
  getWhatsAppHelpLink: () => {
    const text = "Hello Unique Computer Centre, mujhe help chahiye.";
    return `https://wa.me/917084666326?text=${encodeURIComponent(text)}`;
  }
};
