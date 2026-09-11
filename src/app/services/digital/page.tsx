import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ComingSoon from "@/components/Common/ComingSoon";
import styles from "../services.module.css";

export const metadata = {
  title: "Digital Products - Coming Soon | Unique Computer Centre - CSC Point",
  description: "Digital Products service is coming soon at Unique Computer Centre – CSC Point.",
};

export default function DigitalProductsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Digital Products</h1>
          <p className={styles.heroSubtitle}>
            We are working on bringing useful digital products and tools to you.
          </p>
        </section>

        <ComingSoon
          badge="Digital Solutions"
          title="DIGITAL PRODUCTS"
          subtitle="Coming Soon"
          description="We're working on something useful for you. Our digital products will be available soon."
          icon="💻"
        />
      </main>

      <Footer />
    </div>
  );
}
