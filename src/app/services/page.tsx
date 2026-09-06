"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { services } from "@/lib/mockData";
import styles from "./services.module.css";

export default function ServicesPage() {
  const [filter, setFilter] = useState<"all" | "csc" | "digital" | "education">("all");

  const filteredServices = filter === "all" ? services : services.filter((s) => s.category === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Our Services Catalog</h1>
          <p className={styles.heroSubtitle}>
            Browse digital facilitation options available at Unique Computer Centre and view standard documentation requirements.
          </p>
        </section>

        <section className={styles.container}>
          {/* Category Tabs */}
          <div className={styles.tabs}>
            <button
              onClick={() => setFilter("all")}
              className={`${styles.tab} ${filter === "all" ? styles.tabActive : ""}`}
            >
              All Services
            </button>
            <button
              onClick={() => setFilter("csc")}
              className={`${styles.tab} ${filter === "csc" ? styles.tabActive : ""}`}
            >
              CSC Services
            </button>
            <button
              onClick={() => setFilter("digital")}
              className={`${styles.tab} ${filter === "digital" ? styles.tabActive : ""}`}
            >
              Digital Services
            </button>
            <button
              onClick={() => setFilter("education")}
              className={`${styles.tab} ${filter === "education" ? styles.tabActive : ""}`}
            >
              Education &amp; Training
            </button>
          </div>

          {/* Grid Layout */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <div key={service.id} id={service.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                </div>
                <p className={styles.serviceDesc}>{service.description}</p>
                <div className={styles.requirements}>
                  <h5>Required Documents:</h5>
                  <ul>
                    {service.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.timeTag}>Processing: {service.processingTime}</span>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    {service.officialLink && (
                      <a
                        href={service.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.officialBtn}
                      >
                        Official Site
                      </a>
                    )}
                    <a
                      href={`https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mujhe%20${encodeURIComponent(service.name)}%20service%20ke%20liye%20apply%20karna%20hai.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.enquireBtn}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
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
