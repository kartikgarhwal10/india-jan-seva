import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ComingSoon.module.css";

interface ComingSoonProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  bannerImage?: string;
}

export default function ComingSoon({
  badge = "Under Development",
  title,
  subtitle = "Coming Soon",
  description,
  icon = "🚀",
  bannerImage,
}: ComingSoonProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topAccent} />
        {bannerImage ? (
          <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            <Image
              src={bannerImage}
              alt={title}
              width={1000}
              height={400}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ) : (
          <div className={styles.iconWrapper}>{icon}</div>
        )}
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.statusText}>{subtitle}</div>
        <p className={styles.description}>{description}</p>
        <Link href="/" className={styles.btnHome}>
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
