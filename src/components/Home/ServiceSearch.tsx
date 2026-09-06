"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { services, ServiceItem } from "@/lib/mockData";
import styles from "./ServiceSearch.module.css";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ServiceItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery) ||
        service.category.toLowerCase().includes(lowerQuery) ||
        service.requirements.some((req) => req.toLowerCase().includes(lowerQuery))
    );
    setResults(filtered.slice(0, 5)); // Cap results at 5
  }, [query]);

  // Handle clicking outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "csc": return "CSC Service";
      case "digital": return "Digital Service";
      case "education": return "Education Service";
      case "banking": return "Banking Service";
      default: return "Service";
    }
  };

  return (
    <div className={styles.searchWrapper} ref={dropdownRef}>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for a service (e.g., PAN, Aadhaar, PM-Kisan, PVC Card)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className={styles.searchInput}
          aria-label="Search for a service"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className={styles.clearBtn}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {showDropdown && query && (
        <div className={styles.dropdown}>
          {results.length > 0 ? (
            <ul className={styles.resultsList}>
              {results.map((service) => (
                <li key={service.id} className={styles.resultItem}>
                  <Link href={`/services/${service.category}#${service.id}`} className={styles.resultLink}>
                    <span className={styles.resultIcon}>{service.icon}</span>
                    <div className={styles.resultInfo}>
                      <span className={styles.resultName}>{service.name}</span>
                      <span className={styles.resultDesc}>{service.description.substring(0, 70)}...</span>
                      <span className={`${styles.resultBadge} ${styles[service.category]}`}>
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <p className={styles.emptyText}>No services found matching &quot;{query}&quot;</p>
              <p className={styles.emptySubtext}>Try searching for PAN, Aadhaar, Scholarship, or Voter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
