import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CSCClientList from "./CSCClientList";
import styles from "../services.module.css";

export const metadata = {
  title: "CSC Services & SBI Banking | Unique Computer Centre - CSC Point",
  description: "Browse official Common Services Centre (CSC) & SBI CSP services including Aadhaar prints, PAN cards, e-District certificates, Pensions, SBI Banking & Driving Licence.",
};

export default function CscServices() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>CSC &amp; SBI Banking Services</h1>
          <p className={styles.heroSubtitle}>
            Official Government-to-Citizen (G2C), e-District, Pension, and SBI Banking services processed directly at Unique Computer Centre – CSC Point (Harchanda, Jarwal).
          </p>
        </section>

        <section className={styles.container}>
          <CSCClientList />
        </section>
      </main>

      <Footer />
    </div>
  );
}

