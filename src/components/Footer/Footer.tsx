import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./Footer.module.css";

interface FooterProps {
  whatsAppNumber?: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export default function Footer({
  whatsAppNumber = SITE_CONFIG.whatsAppNumber,
  phoneNumber = SITE_CONFIG.phoneNumber,
  emailAddress = SITE_CONFIG.emailAddress,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsAppLink = whatsAppNumber === SITE_CONFIG.whatsAppNumber
    ? SITE_CONFIG.getWhatsAppHelpLink()
    : `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent("Hello Unique Computer Centre, mujhe help chahiye.")}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.colBrand}>
            <Link href="/" className={styles.logo}>
              {SITE_CONFIG.logoAssetPath ? (
                <Image
                  src={SITE_CONFIG.logoAssetPath}
                  alt={SITE_CONFIG.brandName}
                  width={140}
                  height={42}
                  className={styles.logoImg}
                />
              ) : (
                <>
                  <div className={styles.logoIcon}>U</div>
                  <div>
                    <span className={styles.brandTitle}>{SITE_CONFIG.brandName}</span>
                    <span className={styles.brandSubtitle}>CSC Point</span>
                  </div>
                </>
              )}
            </Link>
            <p className={styles.description}>
              Providing convenient access to Common Services Centre (CSC), government assistance, digital documentation, education, and premium PVC smart card printing services since 2019.
            </p>
            <div className={styles.socials}>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.waSocial}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z" />
                </svg>
              </a>
              <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.igSocial}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.fbSocial}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.colLinks}>
            <h3 className={styles.title}>Quick Navigation</h3>
            <ul className={styles.linksList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services/csc">CSC Services</Link></li>
              <li><Link href="/pvc-cards">PVC Cards</Link></li>
              <li><Link href="/services/digital">Digital Products</Link></li>
              <li><Link href="/services/education">Education</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className={styles.colContact}>
            <h3 className={styles.title}>Contact Info</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SITE_CONFIG.businessAddress}</span>
              </li>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`}>{phoneNumber}</a>
              </li>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              </li>
            </ul>
          </div>

          {/* Timings & Help Column */}
          <div className={styles.colHours}>
            <h3 className={styles.title}>Centre Timings</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              {SITE_CONFIG.openingHours}
            </p>
            <div className={styles.partnerCallout}>
              <h4>Partner Portal</h4>
              <p>Reseller agency portal for CSC operators and agents.</p>
              <Link href="/partner" className={styles.partnerBtn}>
                Agent Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Links and Copyright */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} {SITE_CONFIG.brandName}. All Rights Reserved.
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/admin" className={styles.adminLink}>Operator Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

