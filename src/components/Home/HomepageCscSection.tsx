"use client";

import React from "react";
import Link from "next/link";
import styles from "./HomepageCscSection.module.css";

const homepageCategories = [
  {
    id: "govt-services",
    number: "1",
    titleHi: "1. महत्वपूर्ण सरकारी सेवाएँ",
    titleEn: "Important Govt Services",
    icon: "🏛️",
    accentColor: "#1e40af",
    lightBg: "#eff6ff",
    countText: "9 Services",
    href: "/services/csc?category=govt-services#govt-services",
  },
  {
    id: "edistrict-services",
    number: "2",
    titleHi: "2. ई-डिस्ट्रिक्ट सेवाएँ",
    titleEn: "e-District State Services",
    icon: "📜",
    accentColor: "#15803d",
    lightBg: "#f0fdf4",
    countText: "6 Services",
    href: "/services/csc?category=edistrict-services#edistrict-services",
  },
  {
    id: "pension-services",
    number: "3",
    titleHi: "3. पेंशन संबंधित सेवाएँ",
    titleEn: "UP Pension Schemes",
    icon: "👴",
    accentColor: "#7e22ce",
    lightBg: "#faf5ff",
    countText: "4 Services",
    href: "/services/csc?category=pension-services#pension-services",
  },
  {
    id: "sbi-csp-banking",
    number: "4",
    titleHi: "4. बैंकिंग एवं वित्तीय सेवाएँ",
    titleEn: "SBI CSP & Financial",
    icon: "🏦",
    accentColor: "#be185d",
    lightBg: "#fdf2f8",
    countText: "9 Services",
    href: "/services/csc?category=sbi-csp-banking#sbi-csp-banking",
  },
  {
    id: "other-services-csc",
    number: "5",
    titleHi: "5. अन्य सेवाएँ",
    titleEn: "Other Digital Services",
    icon: "⚙️",
    accentColor: "#0284c7",
    lightBg: "#f0f9ff",
    countText: "10+ Services",
    href: "/services/csc?category=other-services-csc#other-services-csc",
  },
];

export default function HomepageCscSection() {
  return (
    <section className={styles.section} id="csc-services">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Official Digital Portal</span>
          <h2 className={styles.sectionTitle}>CSC &amp; SBI Banking Services</h2>
          <p className={styles.sectionSubtitle}>
            Explore our major service categories processed directly at Unique Computer Centre – CSC Point (Harchanda, Jarwal).
          </p>
        </div>

        {/* Compact 5-Category Desktop Grid (5 in 1 row) */}
        <div className={styles.compactGrid}>
          {homepageCategories.map((cat) => (
            <Link key={cat.id} href={cat.href} className={styles.cardLink}>
              <div
                className={styles.categoryCard}
                style={
                  {
                    "--card-accent": cat.accentColor,
                    "--card-light-bg": cat.lightBg,
                  } as React.CSSProperties
                }
              >
                <div className={styles.topAccentBar}>
                  <span>Category</span>
                  <span className={styles.badgeNumber}>#{cat.number}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.iconWrapper}>{cat.icon}</div>
                  <h3 className={styles.titleHi}>{cat.titleHi}</h3>
                  <p className={styles.titleEn}>{cat.titleEn}</p>
                  <span className={styles.countBadge}>{cat.countText}</span>
                </div>

                <div className={styles.cardFooter}>
                  <span>View Services</span>
                  <span className={styles.ctaArrow}>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/services/csc" className={styles.btnViewAll}>
            View Full Service Catalog &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
