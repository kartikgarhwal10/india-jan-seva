"use client";

import React, { useState, useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./SocialNotificationPopup.module.css";

interface NotificationItem {
  id: string;
  type: "youtube" | "whatsapp" | "instagram" | "csc";
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "youtube-sub",
    type: "youtube",
    badge: "🔴 YouTube",
    title: "5,000+ Subscribers",
    subtitle: "Subscribe for official CSC guides & Govt scheme video alerts.",
    ctaText: "Subscribe Now",
    ctaLink: SITE_CONFIG.socialLinks.youtube,
  },
  {
    id: "whatsapp-channel",
    type: "whatsapp",
    badge: "🟢 WhatsApp",
    title: "Govt Scheme Alerts",
    subtitle: "Join our WhatsApp channel for daily scheme & card updates.",
    ctaText: "Join Channel",
    ctaLink: SITE_CONFIG.socialLinks.whatsappChannel,
  },
  {
    id: "instagram-follow",
    type: "instagram",
    badge: "📸 Instagram",
    title: "@unique_csc_point",
    subtitle: "Follow us for daily CSC service reels & quick alerts.",
    ctaText: "Follow Us",
    ctaLink: SITE_CONFIG.socialLinks.instagram,
  },
  {
    id: "recent-order",
    type: "csc",
    badge: "⚡ Recent Order",
    title: "APAAR PVC Card",
    subtitle: "Rahul from Lucknow ordered an APAAR PVC Smart Card.",
    ctaText: "Order Card",
    ctaLink: "/pvc-cards/apaar-pvc",
  },
];

type DisplayState = "showing" | "hiding" | "hidden_break";

export default function SocialNotificationPopup() {
  const [dismissed, setDismissed] = useState(false);
  const [displayState, setDisplayState] = useState<DisplayState>("hidden_break");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isHoveredRef = useRef(false);

  // Constants
  const SHOW_DURATION = 5500; // Show for 5.5 seconds
  const BREAK_DURATION = 7500; // Hide/Break for 7.5 seconds before next one
  const ANIMATION_DURATION = 400; // 0.4s CSS slide out

  // Initial delay of 3 seconds on first mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem("social_popup_dismissed") === "true") {
        setDismissed(true);
        return;
      }
    } catch {
      // Ignore window error
    }

    const timer = setTimeout(() => {
      setDisplayState("showing");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Main lifecycle loop between Showing -> Hiding -> Break -> Next Showing
  useEffect(() => {
    if (dismissed) return;

    if (displayState === "showing") {
      let elapsed = 0;
      const step = 100;
      
      const timer = setInterval(() => {
        if (isHoveredRef.current) return;

        elapsed += step;
        setProgress((elapsed / SHOW_DURATION) * 100);

        if (elapsed >= SHOW_DURATION) {
          clearInterval(timer);
          setDisplayState("hiding");
        }
      }, step);

      return () => clearInterval(timer);
    }

    if (displayState === "hiding") {
      const timer = setTimeout(() => {
        setDisplayState("hidden_break");
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }

    if (displayState === "hidden_break") {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setProgress(0);
        setDisplayState("showing");
      }, BREAK_DURATION);
      return () => clearTimeout(timer);
    }
  }, [displayState, dismissed]);

  const handleClose = () => {
    setDisplayState("hiding");
    setDismissed(true);
    try {
      sessionStorage.setItem("social_popup_dismissed", "true");
    } catch {
      // ignore
    }
  };

  if (dismissed || displayState === "hidden_break") return null;

  const current = NOTIFICATIONS[currentIndex];

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "youtube":
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case "whatsapp":
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
          </svg>
        );
      case "instagram":
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        );
    }
  };

  const getBgStyle = (type: NotificationItem["type"]) => {
    switch (type) {
      case "youtube": return styles.youtubeBg;
      case "whatsapp": return styles.whatsappBg;
      case "instagram": return styles.instagramBg;
      default: return styles.cscBg;
    }
  };

  const getBadgeStyle = (type: NotificationItem["type"]) => {
    switch (type) {
      case "youtube": return styles.badgeYoutube;
      case "whatsapp": return styles.badgeWhatsapp;
      case "instagram": return styles.badgeInstagram;
      default: return styles.badgeCsc;
    }
  };

  const getCtaStyle = (type: NotificationItem["type"]) => {
    switch (type) {
      case "youtube": return styles.ctaYoutube;
      case "whatsapp": return styles.ctaWhatsapp;
      case "instagram": return styles.ctaInstagram;
      default: return styles.ctaCsc;
    }
  };

  const animationClass = displayState === "hiding" ? styles.slideOut : styles.slideIn;

  return (
    <div
      className={`${styles.popupContainer} ${animationClass}`}
      aria-live="polite"
      role="alert"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className={styles.popupCard}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close notification"
          title="Close notification"
        >
          ✕
        </button>

        <div className={styles.headerRow}>
          <div className={`${styles.iconWrapper} ${getBgStyle(current.type)}`}>
            {getIcon(current.type)}
          </div>
          <div className={styles.headerText}>
            <span className={`${styles.badge} ${getBadgeStyle(current.type)}`}>
              {current.badge}
            </span>
            <span className={styles.title}>{current.title}</span>
          </div>
        </div>

        <p className={styles.subtitle}>{current.subtitle}</p>

        <div className={styles.actionRow}>
          <a
            href={current.ctaLink}
            target={current.ctaLink.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${getCtaStyle(current.type)}`}
          >
            {current.ctaText}
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className={styles.indicators}>
          {NOTIFICATIONS.map((item, idx) => (
            <span
              key={item.id}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
                setDisplayState("showing");
              }}
              title={item.title}
            />
          ))}
        </div>

        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
