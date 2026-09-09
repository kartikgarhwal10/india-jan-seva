"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./PVCProductCard.module.css";

export interface PVCProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription?: string;
  description: string;
  image: string;
  active?: boolean;
}

interface PVCProductCardProps {
  product?: PVCProductData;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function PVCProductCard({
  product,
  loading = false,
  error,
  disabled = false,
}: PVCProductCardProps) {
  const [imgError, setImgError] = useState(false);

  // 1. Loading / Skeleton State
  if (loading) {
    return (
      <div className={`${styles.card} ${styles.loading}`} aria-hidden="true">
        <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
        <div className={styles.content}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonTextShort}`}></div>
          <div className={styles.actionGroup}>
            <div className={`${styles.skeleton} ${styles.skeletonBtn}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonBtn}`}></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error || !product) {
    return (
      <div className={`${styles.card} ${styles.errorState}`}>
        <div className={styles.errorContent}>
          <span className={styles.errorIcon}>⚠️</span>
          <p className={styles.errorText}>{error || "Failed to load product details."}</p>
        </div>
      </div>
    );
  }

  const isCardDisabled = disabled || product.active === false;
  const whatsAppLink = SITE_CONFIG.getWhatsAppProductLink(product.name);

  return (
    <div
      className={`${styles.card} ${isCardDisabled ? styles.disabled : ""}`}
      tabIndex={0}
      aria-disabled={isCardDisabled}
      aria-label={`${product.name}, Price: ₹${product.price}`}
    >
      {/* Product Image Column with Fallback */}
      <div className={styles.imgWrapper}>
        {product.image && !imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="7" y1="8" x2="17" y2="8" />
              <line x1="7" y1="12" x2="13" y2="12" />
              <circle cx="17" cy="14" r="1.5" />
            </svg>
            <span>PVC Smart Card</span>
          </div>
        )}
        <span className={styles.priceBadge}>₹{product.price}</span>
      </div>

      {/* Card Body Contents */}
      <div className={styles.content}>
        <span className={styles.serviceTag}>PVC CARD SERVICE</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.featuresSubtitle}>
          Premium quality • Durable • Smart Look • Easy Ordering
        </p>

        {/* Action button triggers */}
        <div className={styles.actionGroup}>
          <Link
            href={isCardDisabled ? "#" : `/pvc-cards/${product.slug}`}
            className={styles.viewDetailsBtn}
            tabIndex={isCardDisabled ? -1 : 0}
          >
            VIEW DETAILS
          </Link>

          <a
            href={isCardDisabled ? "#" : whatsAppLink}
            target={isCardDisabled ? undefined : "_blank"}
            rel={isCardDisabled ? undefined : "noopener noreferrer"}
            className={styles.waOrderBtn}
            onClick={(e) => isCardDisabled && e.preventDefault()}
            tabIndex={isCardDisabled ? -1 : 0}
            aria-label={`Book ${product.name} via WhatsApp`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z" />
            </svg>
            BOOK VIA WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}

