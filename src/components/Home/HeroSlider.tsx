"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./HeroSlider.module.css";

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  bgImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  isExternal?: boolean;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      badge: "Unique CSC Point • Harchanda, Jarwal",
      title: "Unique Computer Centre – CSC Point",
      subtitle: "Official Common Services Centre & SBI Customer Service Point in Harchanda, Jarwal, Bahraich.",
      bgImage: "/images/hero-center-exterior.jpg",
      primaryCtaText: "Explore CSC Services",
      primaryCtaLink: "/services/csc",
      secondaryCtaText: "WhatsApp Us",
      secondaryCtaLink: SITE_CONFIG.getWhatsAppHelpLink(),
      isExternal: true,
    },
    {
      id: 2,
      badge: "Trusted Neighbourhood Kiosk",
      title: "Direct Citizen & Public Services Counter",
      subtitle: "Get All Government & Digital Services Under One Roof with Friendly Support.",
      bgImage: "/images/hero-center-crowd.jpg",
      primaryCtaText: "View CSC Services",
      primaryCtaLink: "/services/csc",
      secondaryCtaText: "Contact Us",
      secondaryCtaLink: "/contact",
    },
    {
      id: 3,
      badge: "Customer Service Point Counter",
      title: "Direct Government & Financial Assistance",
      subtitle: "Aadhaar Print, PAN Card Correction, Ayushman Card & Instant Cash Withdrawal at Our Counter.",
      bgImage: "/images/hero-center-counter.jpg",
      primaryCtaText: "View All Services",
      primaryCtaLink: "/services/csc",
      secondaryCtaText: "Contact Centre",
      secondaryCtaLink: "/contact",
    },
    {
      id: 4,
      badge: "CSC Digital Documentation Hub",
      title: "Fast Processing & Computer Services",
      subtitle: "PM-Kisan eKYC, EPFO, APAAR ID, Driving Licence, Income/Caste Certificates & PVC Card Printing.",
      bgImage: "/images/hero-center-workspace.jpg",
      primaryCtaText: "Order PVC Card",
      primaryCtaLink: "/order",
      secondaryCtaText: "Track Order",
      secondaryCtaLink: "/track-order",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section className={styles.heroSection} aria-label="Welcome banner slider">
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
          >
            {/* Background Image with Focal Position & Responsive Overlay */}
            <div className={styles.imageWrapper}>
              <Image
                src={slide.bgImage}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className={styles.heroImg}
              />
              <div className={styles.overlay} />
            </div>

            <div className={styles.contentContainer}>
              <div className={`${styles.slideContent} ${index === currentSlide ? styles.fadeInUp : ""}`}>
                <span className={styles.welcomeBadge}>{slide.badge}</span>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <div className={styles.ctaGroup}>
                  <Link href={slide.primaryCtaLink} className={styles.btnPrimary}>
                    {slide.primaryCtaText}
                  </Link>
                  {slide.isExternal ? (
                    <a
                      href={slide.secondaryCtaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnSecondary}
                    >
                      {slide.secondaryCtaText}
                    </a>
                  ) : (
                    <Link href={slide.secondaryCtaLink} className={styles.btnSecondary}>
                      {slide.secondaryCtaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>

      {/* Dot Indicators */}
      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
