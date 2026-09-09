"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./Header.module.css";

interface HeaderProps {
  whatsAppNumber?: string;
}

export default function Header({ whatsAppNumber = SITE_CONFIG.whatsAppNumber }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "CSC Services", path: "/services/csc" },
    { name: "PVC Cards", path: "/pvc-cards" },
    { name: "Digital Products", path: "/services/digital" },
    { name: "Education", path: "/services/education" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const whatsAppLink = whatsAppNumber === SITE_CONFIG.whatsAppNumber 
    ? SITE_CONFIG.getWhatsAppHelpLink() 
    : `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent("Hello Unique Computer Centre, mujhe help chahiye.")}`;

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoArea} aria-label="Unique CSC Point Homepage">
          {SITE_CONFIG.logoAssetPath ? (
            <Image
              src={SITE_CONFIG.logoAssetPath}
              alt={SITE_CONFIG.brandName}
              width={140}
              height={42}
              className={styles.logoImg}
              priority
            />
          ) : (
            <>
              <div className={styles.logoIcon}>
                <span>U</span>
              </div>
              <div className={styles.logoText}>
                <span className={styles.brandTitle}>{SITE_CONFIG.brandName}</span>
                <span className={styles.brandSubtitle}>CSC Point</span>
              </div>
            </>
          )}
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Navigation */}
        <nav className={`${styles.nav} ${isOpen ? styles.active : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.ctaGroup}>
            <Link href="/track-order" className={styles.btnSecondary}>
              Track PVC Order
            </Link>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className={styles.btnWhatsApp}>
              <svg viewBox="0 0 24 24" width="18" height="18" className={styles.waIcon}>
                <path fill="currentColor" d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

