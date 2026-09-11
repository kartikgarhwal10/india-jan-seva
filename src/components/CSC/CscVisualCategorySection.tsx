"use client";

import React from "react";
import { cscCategories, ServiceItem } from "@/lib/mockData";
import styles from "./CscVisualCategorySection.module.css";

interface CscVisualCategorySectionProps {
  onSelectService?: (service: ServiceItem) => void;
  categories?: typeof cscCategories;
}

export default function CscVisualCategorySection({
  onSelectService,
  categories = cscCategories,
}: CscVisualCategorySectionProps) {
  const getCategoryColor = (catId: string | number) => {
    switch (catId) {
      case "govt-services":
      case 1:
        return "#0d47a1"; // Deep Blue
      case "edistrict-services":
      case 2:
        return "#15803d"; // Green
      case "pension-services":
      case 3:
        return "#7e22ce"; // Purple
      case "sbi-csp-banking":
      case 4:
        return "#be185d"; // Magenta / Deep Red
      case "other-services-csc":
      case 5:
      default:
        return "#1d4ed8"; // Royal Blue
    }
  };

  // Helper to separate Hindi name and English subtitle from service name
  const parseServiceName = (fullName: string) => {
    const match = fullName.match(/^(.*?)(?:\s*\((.*?)\))?$/);
    if (match) {
      return {
        hi: match[1]?.trim() || fullName,
        en: match[2]?.trim() ? `(${match[2].trim()})` : "",
      };
    }
    return { hi: fullName, en: "" };
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.categoryGrid}>
        {categories.map((cat) => {
          const catColor = cat.badgeBg || getCategoryColor(cat.id);
          const catNum = cat.categoryNumber;
          const isFullWidth = catNum === 5 || cat.id === "other-services-csc";

          // Determine layout style for items container
          let itemsLayoutClass = styles.grid3Col;
          if (catNum === 3 || cat.id === "pension-services") {
            itemsLayoutClass = styles.grid2Col;
          } else if (catNum === 4 || cat.id === "sbi-csp-banking") {
            itemsLayoutClass = styles.list2Col;
          } else if (catNum === 5 || cat.id === "other-services-csc") {
            itemsLayoutClass = styles.grid4Col;
          }

          const isListType = catNum === 4 || cat.id === "sbi-csp-banking";

          return (
            <div
              key={cat.id}
              className={`${styles.categoryCard} ${isFullWidth ? styles.fullWidthCategory : ""}`}
              style={{ "--cat-color": catColor } as React.CSSProperties}
            >
              {/* Category Ribbon Header */}
              <div className={styles.ribbonBanner}>
                <div className={styles.ribbonTitleHi}>{cat.titleHi}</div>
                {cat.titleEn && <div className={styles.ribbonTitleEn}>{cat.titleEn}</div>}
              </div>

              {/* Service Items Container */}
              <div className={itemsLayoutClass}>
                {cat.items.map((service) => {
                  const { hi, en } = parseServiceName(service.name);

                  if (isListType) {
                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={styles.listItemBtn}
                        onClick={() => onSelectService && onSelectService(service)}
                        aria-label={`Apply for ${service.name}`}
                      >
                        <div className={styles.listIconBox}>{service.icon || "📄"}</div>
                        <div className={styles.listTextGroup}>
                          <span className={styles.listTitleHi}>{hi}</span>
                          {en && <span className={styles.listTitleEn}>{en}</span>}
                        </div>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={service.id}
                      type="button"
                      className={styles.gridItemBtn}
                      onClick={() => onSelectService && onSelectService(service)}
                      aria-label={`Apply for ${service.name}`}
                    >
                      <div className={styles.iconBox}>{service.icon || "📄"}</div>
                      <span className={styles.itemTitleHi}>{hi}</span>
                      {en && <span className={styles.itemTitleEn}>{en}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
