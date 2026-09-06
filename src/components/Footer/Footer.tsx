import Link from "next/link";
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
              <div className={styles.logoIcon}>U</div>
              <div>
                <span className={styles.brandTitle}>Unique CSC Point</span>
                <span className={styles.brandSubtitle}>Computer Centre</span>
              </div>
            </Link>
            <p className={styles.description}>
              Providing convenient access to CSC, government assistance, digital documentation, education, and premium PVC smart card printing services since 2018.
            </p>
            <div className={styles.socials}>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.colLinks}>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.linksList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/pvc-cards">PVC Card Store</Link></li>
              <li><Link href="/services/education">Education Centre</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/blog">SEO Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/track-order">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className={styles.colContact}>
            <h3 className={styles.title}>Contact Info</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Harchanda, Jarwal, Bahraich, Uttar Pradesh, 271904</span>
              </li>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`}>{phoneNumber}</a>
              </li>
              <li className={styles.contactItem}>
                <svg viewBox="0 0 24 24" width="18" height="18" className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              </li>
            </ul>
          </div>

          {/* Timings & Help Column */}
          <div className={styles.colHours}>
            <h3 className={styles.title}>Centre Timings</h3>
            <ul className={styles.hoursList}>
              <li><span>Monday - Saturday:</span> <span>08:00 AM - 07:00 PM</span></li>
              <li><span>Sunday:</span> <span className={styles.closed}>Closed</span></li>
            </ul>
            <div className={styles.partnerCallout}>
              <h4>Become Our Partner</h4>
              <p>Register as an agent to order PVC cards at reseller pricing.</p>
              <Link href="/partner" className={styles.partnerBtn}>
                Partner Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Links and Copyright */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} Unique Computer Centre. All Rights Reserved.
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/refund-policy">Refund &amp; Cancellation</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/admin" className={styles.adminLink}>Operator Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
