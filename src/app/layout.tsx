import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Unique Computer Centre - CSC Point | Digital Services & PVC Cards",
  description: "Get professional CSC, banking-support, digital documentation, education services, and premium PVC smart cards at Unique Computer Centre, Jarwal, Bahraich, UP.",
  keywords: ["CSC Center Jarwal", "CSC Bahraich", "PVC Card print online", "PAN card correction", "Aadhaar print UP", "digital services Harchanda", "Unique CSC Point"],
  openGraph: {
    title: "Unique Computer Centre - CSC Point | Digital Services & PVC Cards",
    description: "Your local Common Services Centre in Jarwal, Bahraich. We offer Aadhaar assistance, PAN cards, PVC smart cards, and online digital documentation services.",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Unique Computer Centre - CSC Point",
    "image": "https://uniquecscpoint.in/images/csc-workspace.jpg",
    "url": "https://uniquecscpoint.in",
    "telephone": "+91 70846 66326",
    "priceRange": "₹50 - ₹200",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Harchanda, Jarwal",
      "addressLocality": "Bahraich",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "271904",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    }
  };

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

