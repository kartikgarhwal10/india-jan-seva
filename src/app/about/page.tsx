import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./about.module.css";

export const metadata = {
  title: "About Us | Unique Computer Centre - CSC Point",
  description: "Learn about the history of Unique Computer Centre in Jarwal Road, our mission, vision, and core values under Mohd Irfak Ahmad.",
};

export default function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>About Our Centre</h1>
          <p className={styles.heroSubtitle}>
            Unique Computer Centre - CSC Point: Empowering local residents with digital accessibility, smart prints, and secure government assistance.
          </p>
        </section>

        {/* History Intro */}
        <section className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <span className={styles.sectionBadge}>Our Beginnings</span>
              <h2 className={styles.title}>Serving Bahraich Since 2018</h2>
              <p className={styles.text}>
                Founded by <strong>Mohd Irfak Ahmad</strong> in 2018, Unique Computer Centre was established in Harchanda, Jarwal, to address a critical gap: local citizens had to travel long distances to Bahraich town or Gonda just to download an Aadhaar print, correct a PAN card, or apply for student scholarships.
              </p>
              <p className={styles.text}>
                Starting with a single desktop computer and printer, we have grown into Jarwal&apos;s leading digital facilitation hub. Today, we assist over 2,500 citizens monthly in accessing crucial government-to-citizen (G2C) services and offer advanced PVC smart card printing shipped nationwide.
              </p>
            </div>
            <div className={styles.introImageWrapper}>
              <Image
                src="/images/csc-workspace.jpg"
                alt="Unique CSC Centre workspace inside view"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.introImage}
              />
            </div>
          </div>

          {/* Mission & Vision cards */}
          <div className={styles.visionSection}>
            <div className={styles.visionGrid}>
              <div className={styles.visionCard}>
                <span className={styles.cardIcon}>🎯</span>
                <h3 className={styles.cardTitle}>Our Mission</h3>
                <p className={styles.cardText}>
                  To provide rural and town citizens with direct, transparent, and error-free access to government welfare programs, digital document services, and high-fidelity smart cards, eliminating delays and intermediary corruption.
                </p>
              </div>

              <div className={styles.visionCard}>
                <span className={styles.cardIcon}>👁️</span>
                <h3 className={styles.cardTitle}>Our Vision</h3>
                <p className={styles.cardText}>
                  To become a trusted, multi-service digital franchise network across Uttar Pradesh, where any citizen can get immediate, verified documentation support, financial services, and technical literacy under one roof.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className={styles.timelineSection}>
            <div className={styles.timelineHeader}>
              <span className={styles.sectionBadge}>Our Milestones</span>
              <h2 className={styles.title} style={{ textAlign: "center" }}>Historical Journey</h2>
            </div>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span className={styles.timelineYear}>2018</span>
                <h3 className={styles.timelineTitle}>Establishment</h3>
                <p className={styles.timelineText}>
                  Unique Computer Centre opened doors in Harchanda, Jarwal with basic printing, typing, and internet services.
                </p>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span className={styles.timelineYear}>2020</span>
                <h3 className={styles.timelineTitle}>Official CSC Point Status</h3>
                <p className={styles.timelineText}>
                  Authorized as a government Common Services Centre (CSC), enabling us to process official Aadhaar downloads, Ayushman cards, and PM-Kisan registrations directly.
                </p>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span className={styles.timelineYear}>2023</span>
                <h3 className={styles.timelineTitle}>PVC Printing &amp; Banking Support</h3>
                <p className={styles.timelineText}>
                  Introduced high-definition PVC smart card printing setups and launched Aadhaar Enabled Payment System (AePS) terminal services for direct bank withdrawals at our centre.
                </p>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span className={styles.timelineYear}>2026</span>
                <h3 className={styles.timelineTitle}>Digital Platform Launch</h3>
                <p className={styles.timelineText}>
                  Launched `uniquecscpoint.in` enabling online document submissions, payment gateway checkouts, and tracking portals for PVC card orders all across India.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
