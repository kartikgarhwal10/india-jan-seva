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
                src="/images/mohd-irfak-ahmad.jpg"
                alt="Mohd Irfak Ahmad - Founder, Unique Computer Centre - CSC Point"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.introImage}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Founder's Message Card */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem 2rem",
            margin: "3rem 0",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span className={styles.sectionBadge}>Leadership Word</span>
              <h2 className={styles.title} style={{ margin: "0.25rem 0" }}>Founder&apos;s Message / संस्थापक का संदेश</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {/* Hindi Message */}
              <div style={{ background: "var(--surface-alt)", padding: "1.5rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--primary)" }}>
                <p style={{ fontStyle: "italic", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem", fontSize: "1.05rem" }}>
                  &quot;Technology और Digital Services को हर व्यक्ति तक सरल, सुविधाजनक और भरोसेमंद तरीके से पहुँचाना हमारा उद्देश्य है।&quot;
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  2019 से Unique Computer Centre – CSC Point लोगों को विभिन्न सरकारी एवं डिजिटल सेवाएं सरल, सुविधाजनक और भरोसेमंद तरीके से उपलब्ध कराने के उद्देश्य से निरंतर कार्य कर रहा है।
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  हमारा प्रयास है कि नागरिकों को आवश्यक सेवाओं के लिए <strong>सही जानकारी, उचित मार्गदर्शन और बेहतर सहायता</strong> उनके नजदीक ही मिल सके। हमारा मानना है कि डिजिटल सेवाएं तभी सार्थक हैं, जब वे आम नागरिक के लिए आसान और सुलभ हों।
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
                  आपके विश्वास और सहयोग के लिए हम हृदय से आभारी हैं। भविष्य में भी <strong>ईमानदारी, पारदर्शिता और बेहतर सेवा</strong> के साथ आपकी सेवा करते रहना हमारा संकल्प है।
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)" }}>
                  — Mohd Irfak Ahmad<br />
                  <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-light)" }}>Founder, Unique Computer Centre – CSC Point (Serving Since 2019)</span>
                </div>
              </div>

              {/* English Message */}
              <div style={{ background: "var(--surface-alt)", padding: "1.5rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid #10b981" }}>
                <p style={{ fontStyle: "italic", fontWeight: 600, color: "#059669", marginBottom: "1rem", fontSize: "1.05rem" }}>
                  &quot;Our mission is to make Technology and Digital Services simple, accessible, and reliable for everyone.&quot;
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  Since 2019, Unique Computer Centre – CSC Point has been continuously working to provide citizens with various government and digital services in a simple, convenient, and reliable manner.
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  Our aim is to ensure that citizens can access the <strong>right information, proper guidance, and better assistance</strong> for essential services, all at a convenient location near them. We believe that digital services are truly meaningful when they are simple and accessible to everyone.
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
                  We are sincerely grateful for your trust and support. We remain committed to serving you with <strong>honesty, transparency, and better service</strong> and to continuously improving our services in the future.
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)" }}>
                  — Mohd Irfak Ahmad<br />
                  <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-light)" }}>Founder, Unique Computer Centre – CSC Point (Serving Since 2019)</span>
                </div>
              </div>
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
