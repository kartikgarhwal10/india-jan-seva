"use client";

import { useState } from "react";
import { ServiceItem, cscCategories } from "@/lib/mockData";
import ServiceFormModal from "@/components/CSC/ServiceFormModal";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../services.module.css";

export default function CSCClientList() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Filter category groups based on search & category filter
  const filteredCategories = cscCategories
    .map((group) => {
      const isCategoryMatch = activeCategoryFilter === "all" || group.id === activeCategoryFilter;
      if (!isCategoryMatch) return { ...group, items: [] };

      if (!searchQuery.trim()) return group;

      const query = searchQuery.toLowerCase();
      const matchingItems = group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.requirements.some((req) => req.toLowerCase().includes(query))
      );

      return { ...group, items: matchingItems };
    })
    .filter((group) => group.items.length > 0);

  return (
    <>
      {/* Category Tabs & Search Bar */}
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
          <input
            type="text"
            placeholder="🔍 Search any service (e.g., Aadhaar, PAN, Ration Card, SBI Account, Pension)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1.25rem",
              borderRadius: "999px",
              border: "2px solid var(--border)",
              fontSize: "0.95rem",
              outline: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeCategoryFilter === "all" ? styles.tabActive : ""}`}
            onClick={() => setActiveCategoryFilter("all")}
          >
            All Services ({cscCategories.reduce((acc, c) => acc + c.items.length, 0)})
          </button>
          {cscCategories.map((group) => (
            <button
              key={group.id}
              className={`${styles.tab} ${activeCategoryFilter === group.id ? styles.tabActive : ""}`}
              onClick={() => setActiveCategoryFilter(group.id)}
            >
              {group.icon} {group.titleHi.split("(")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Render Categorized Service Groups */}
      {filteredCategories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
          <h3>No services found matching &quot;{searchQuery}&quot;</h3>
          <p style={{ marginTop: "0.5rem" }}>
            Try searching for other terms like Aadhaar, PAN, Ration, Pension, Driving Licence, or SBI Account.
          </p>
        </div>
      ) : (
        filteredCategories.map((group) => (
          <div key={group.id} className={styles.categoryGroupBlock} id={group.id}>
            {/* Category Ribbon Header */}
            <div
              className={styles.categoryRibbonHeader}
              style={{
                backgroundColor: group.badgeBg,
                borderColor: group.badgeBorder,
              }}
            >
              <div className={styles.ribbonTitleGroup}>
                <span className={styles.ribbonIcon}>{group.icon}</span>
                <div>
                  <div className={styles.ribbonTitleHi}>{group.titleHi}</div>
                  <div className={styles.ribbonTitleEn}>{group.titleEn}</div>
                </div>
              </div>
              <span style={{ background: "rgba(255,255,255,0.22)", padding: "0.35rem 0.9rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 700 }}>
                {group.items.length} Services Available
              </span>
            </div>

            {/* Services Grid */}
            <div className={styles.servicesGrid}>
              {group.items.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
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
                    <span className={styles.timeTag}>⏱️ {service.processingTime}</span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <a
                        href={SITE_CONFIG.getWhatsAppServiceLink(service.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.waBtn}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                        </svg>
                        WhatsApp
                      </a>
                      <button
                        onClick={() => setSelectedService(service)}
                        className={styles.enquireBtn}
                        style={{ background: "var(--primary)", border: "none", cursor: "pointer" }}
                      >
                        Apply Online &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <ServiceFormModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
