"use client";

import { useState } from "react";
import Link from "next/link";
import { ServiceItem } from "@/lib/mockData";
import CscVisualCategorySection from "@/components/CSC/CscVisualCategorySection";
import ServiceFormModal from "@/components/CSC/ServiceFormModal";
import pageStyles from "@/app/page.module.css";

export default function HomepageCscSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section className={`${pageStyles.section} ${pageStyles.bgMuted}`} id="csc-services">
      <div className={pageStyles.container}>
        <div className={pageStyles.sectionHeader}>
          <span className={pageStyles.sectionBadge}>Official Digital Portal</span>
          <h2 className={pageStyles.sectionTitle}>CSC &amp; SBI Banking Services</h2>
          <p className={pageStyles.sectionSubtitle}>
            Government-to-Citizen (G2C), e-District, Pension, and SBI Banking services processed directly at Unique Computer Centre – CSC Point (Harchanda, Jarwal).
          </p>
        </div>

        {/* Visual Category Containers Layout */}
        <CscVisualCategorySection onSelectService={(service) => setSelectedService(service)} />

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/services/csc" className={pageStyles.btnSecondary} style={{ display: "inline-block" }}>
            View Full Service Catalog &rarr;
          </Link>
        </div>
      </div>

      {/* Service Enquiry & Application Modal */}
      <ServiceFormModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
