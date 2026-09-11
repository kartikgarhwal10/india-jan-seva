import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ComingSoon from "@/components/Common/ComingSoon";
import styles from "../services.module.css";

export const metadata = {
  title: "Education & Courses - Coming Soon | Unique Computer Centre - CSC Point",
  description: "Educational services and computer courses are coming soon at Unique Computer Centre – CSC Point.",
};

export default function EducationPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Education Services</h1>
          <p className={styles.heroSubtitle}>
            Our training programs and educational courses are being prepared.
          </p>
        </section>

        <ComingSoon
          badge="Skill Development"
          title="EDUCATION"
          subtitle="Coming Soon"
          description="Our courses and educational services are currently being prepared. They will be available soon."
          icon="🎓"
        />
      </main>

      <Footer />
    </div>
  );
}
