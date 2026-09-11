"use client";

import React from "react";
import Link from "next/link";
import styles from "./ComingSoon.module.css";

interface ComingSoonProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
}

export default function ComingSoon({
  badge = "Under Development",
  title,
  subtitle = "Coming Soon",
  description,
  icon = "🚀",
}: ComingSoonProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topAccent} />
        <div className={styles.iconWrapper}>{icon}</div>
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
