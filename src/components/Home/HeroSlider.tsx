"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./HeroSlider.module.css";

interface Slide {
  id: number;
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
      title: "Welcome to Unique Computer Centre",
      subtitle: "CSC Services | Digital Services | Online Applications | Banking Support",
      bgImage: "/images/csc-workspace.jpg",
      primaryCtaText: "Our Services",
      primaryCtaLink: "/services",
      secondaryCtaText: "Contact Us",
      secondaryCtaLink: "/contact",
    },
    {
      id: 2,
      title: "Premium PVC Smart Cards",
      subtitle: "Aadhaar, PAN, Voter, Ayushman, Driving Licence, RC printed on premium plastic starting at just ₹149",
      bgImage: "/images/pvc-aadhaar-mockup.jpg",
      primaryCtaText: "Order PVC Card",
      primaryCtaLink: "/order",
      secondaryCtaText: "Order on WhatsApp",
      secondaryCtaLink: "https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mujhe%20PVC%20Card%20order%20karna%20hai.",
      isExternal: true,
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
            style={{
              backgroundImage: `linear-gradient(to right, rgba(9, 21, 41, 0.85) 30%, rgba(9, 21, 41, 0.4) 100%), url(${slide.bgImage})`,
            }}
          >
            <div className={styles.contentContainer}>
              <div className={`${styles.slideContent} ${index === currentSlide ? styles.fadeInUp : ""}`}>
                <span className={styles.welcomeBadge}>Digital Seva Kendra</span>
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
