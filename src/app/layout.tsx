import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Unique CSC Point | Unique Computer Centre - CSC Point",
  description: "Official Common Services Centre (CSC) offering Aadhaar assistance, PAN cards, PVC smart cards, Ayushman cards, Digital Products, and Education Courses in Jarwal, Bahraich, UP.",
  keywords: ["Unique CSC Point", "CSC Center Jarwal", "CSC Bahraich", "PVC Card print online", "PAN card correction", "Aadhaar print UP", "Digital Products Harchanda"],
  openGraph: {
    title: "Unique CSC Point | Unique Computer Centre",
    description: "Your trusted Common Services Centre in Jarwal, Bahraich. Aadhaar assistance, PAN cards, PVC smart cards, Digital Products, and Education Courses.",
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
    "name": SITE_CONFIG.brandSubtitle,
    "image": "https://uniquecscpoint.in/images/csc-workspace.jpg",
    "url": "https://uniquecscpoint.in",
    "telephone": SITE_CONFIG.phoneNumber,
    "email": SITE_CONFIG.emailAddress,
    "priceRange": "₹50 - ₹200",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Aryavart bank ke bagal, Harchanda, Jarwal",
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


