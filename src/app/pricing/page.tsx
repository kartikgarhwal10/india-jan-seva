import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./pricing.module.css";

export const metadata = {
  title: "Service Charges & Pricing | Unique Computer Centre - CSC Point",
  description: "Check pricing for PVC smart cards print orders and assistance fees for official government documentation applications.",
};

export default function Pricing() {
  const serviceFees = [
    { name: "New PAN Card Application", price: "₹200", details: "Includes official processing fee & physical card delivery" },
    { name: "PAN Card Detail Correction", price: "₹200", details: "Name, DOB, or signature update assistance" },
    { name: "UP e-District Certificates (Income/Caste/Domicile)", price: "₹100", details: "Government fees & application processing" },
    { name: "Aadhaar Card Download & Smart Print", price: "₹100", details: "Instant service at centre with biometric/OTP download" },
    { name: "UP Board / College Exam Form Filling", price: "₹50 - ₹100", details: "Depending on board criteria, excludes form fee" },
    { name: "UP Scholarship Application Submission", price: "₹120", details: "Detailed documentation review & receipt copy" },
    { name: "Biometric eKYC Verification (PM-Kisan/e-Shram)", price: "₹50", details: "Fingerprint scanner verification at center" },
    { name: "Basic Computer & Typing Course (1 Month)", price: "₹1,000", details: "Daily 1-hour session with practice terminals" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Pricing &amp; Service Charges</h1>
          <p className={styles.heroSubtitle}>
            Transparent pricing for all PVC smart card orders and assistance processing services. No hidden costs.
          </p>
        </section>

        <section className={styles.container}>
          {/* PVC Cards Plans */}
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Standard PVC Print</h3>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Perfect for individual orders</p>
                <div className={styles.priceWrapper}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>149</span>
                  <span className={styles.period}>/ card</span>
                </div>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Premium ATM-sized plastic card</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Waterproof &amp; scratch-resistant</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Includes all India delivery (Speed Post)</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Online order tracking</span>
                </li>
              </ul>
              <Link href="/order" className={`${styles.pricingBtn} ${styles.secondaryBtn}`}>
                Order Card
              </Link>
            </div>

            <div className={`${styles.pricingCard} ${styles.featuredCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Partner / Reseller Plan</h3>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Designed for cyber cafes &amp; operators</p>
                <div className={styles.priceWrapper}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>80</span>
                  <span className={styles.period}>/ card</span>
                </div>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span><strong>Reseller bulk pricing</strong> (Save ₹69 per card)</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Consolidated partner dashboard</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Fast tracking &amp; priority printing</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Monthly billing settlements</span>
                </li>
              </ul>
              <Link href="/partner" className={`${styles.pricingBtn} ${styles.primaryBtn}`}>
                Become Partner
              </Link>
            </div>
          </div>

          {/* Service Charges Table */}
          <div className={styles.tableSection}>
            <h2 className={styles.tableTitle}>Centre Assistance Fees</h2>
            <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "2rem" }}>
              These fees represent the service charges at our physical center in Jarwal Road for form submissions and applications.
            </p>
            
            <div className={styles.tableContainer}>
              <table className={styles.pricingTable}>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Service Details</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceFees.map((fee, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600, color: "var(--text-main)" }}>{fee.name}</td>
                      <td className={styles.tablePrice}>{fee.price}</td>
                      <td>{fee.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
