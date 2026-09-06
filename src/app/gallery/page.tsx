"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./gallery.module.css";

interface GalleryItem {
  id: string;
  title: string;
  category: "centre" | "pvc" | "staff";
  image: string;
  alt: string;
}

export default function Gallery() {
  const [filter, setFilter] = useState<"all" | "centre" | "pvc" | "staff">("all");

  const items: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Main Computer Workspace Area",
      category: "centre",
      image: "/images/csc-workspace.jpg",
      alt: "Inside view of Unique Computer Centre desktop workstations and printers",
    },
    {
      id: "gal-2",
      title: "Glossy Aadhaar PVC Smart Cards",
      category: "pvc",
      image: "/images/pvc-aadhaar-mockup.jpg",
      alt: "Mockup print sample of Aadhaar PVC smart card with barcode details",
    },
    {
      id: "gal-3",
      title: "Mohd Irfak Ahmad at Center Desk",
      category: "staff",
      image: "/images/founder.jpg",
      alt: "Mohd Irfak Ahmad, founder of Unique Computer Centre smiling at his desk",
    },
    {
      id: "gal-4",
      title: "Glossy PAN PVC Smart Cards",
      category: "pvc",
      image: "/images/pvc-pan-mockup.jpg",
      alt: "Mockup print sample of Permanent Account Number PAN card on plastic smart card",
    },
    {
      id: "gal-5",
      title: "Customer Intake & Front Counter",
      category: "centre",
      image: "/images/csc-workspace.jpg",
      alt: "Front desk counter for receiving customer applications at Unique Computer Centre",
    },
  ];

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Our Centre Gallery</h1>
          <p className={styles.heroSubtitle}>
            Browse actual photographs of our computer work terminal setup, founder staff, and premium PVC smart card print runs.
          </p>
        </section>

        <section className={styles.container}>
          {/* Category Tabs */}
          <div className={styles.tabs}>
            <button
              onClick={() => setFilter("all")}
              className={`${styles.tab} ${filter === "all" ? styles.tabActive : ""}`}
            >
              All Photos
            </button>
            <button
              onClick={() => setFilter("centre")}
              className={`${styles.tab} ${filter === "centre" ? styles.tabActive : ""}`}
            >
              Centre Workspace
            </button>
            <button
              onClick={() => setFilter("pvc")}
              className={`${styles.tab} ${filter === "pvc" ? styles.tabActive : ""}`}
            >
              PVC Prints
            </button>
            <button
              onClick={() => setFilter("staff")}
              className={`${styles.tab} ${filter === "staff" ? styles.tabActive : ""}`}
            >
              Staff &amp; Founder
            </button>
          </div>

          {/* Grid Layout */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <div key={item.id} className={styles.galleryCard}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.info}>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
