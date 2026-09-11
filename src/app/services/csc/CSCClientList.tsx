"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceItem, cscCategories } from "@/lib/mockData";
import ServiceFormModal from "@/components/CSC/ServiceFormModal";
import CscVisualCategorySection from "@/components/CSC/CscVisualCategorySection";
import styles from "../services.module.css";

export default function CSCClientList() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setActiveCategoryFilter(catParam);
      setTimeout(() => {
        const el = document.getElementById(catParam);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

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
      <div style={{ marginBottom: "3rem" }}>
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

      {/* Render Categorized Visual Containers */}
      {filteredCategories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
          <h3>No services found matching &quot;{searchQuery}&quot;</h3>
          <p style={{ marginTop: "0.5rem" }}>
            Try searching for other terms like Aadhaar, PAN, Ration, Pension, Driving Licence, or SBI Account.
          </p>
        </div>
      ) : (
        <CscVisualCategorySection
          categories={filteredCategories}
          onSelectService={(service) => setSelectedService(service)}
        />
      )}

      {/* Interactive Service Application Modal */}
      <ServiceFormModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
