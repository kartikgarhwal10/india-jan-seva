import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { services, digitalProducts } from "@/lib/mockData";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../services.module.css";

export const metadata = {
  title: "Digital Products | Unique Computer Centre - CSC Point",
  description: "Browse digital offerings, online application kits, certified land records printouts, and digital documentation services.",
};

export default function DigitalProductsPage() {
  const digitalServicesList = services.filter((s) => s.category === "digital");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Digital Products &amp; Offerings</h1>
          <p className={styles.heroSubtitle}>
            Certified state certificate processing, digital land records, and online application support.
          </p>
        </section>

        <section className={styles.container}>
          {/* Digital Products Grid */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Featured Digital Offerings
          </h2>
          <div className={styles.servicesGrid} style={{ marginBottom: "3rem" }}>
            {digitalProducts.map((prod) => (
              <div key={prod.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{prod.icon}</span>
                  <h3 className={styles.serviceName}>{prod.name}</h3>
                </div>
                <p className={styles.serviceDesc}>{prod.description}</p>
                {prod.price && (
                  <div style={{ margin: "1rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)" }}>
                    Processing Fee: ₹{prod.price}
                  </div>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.timeTag}>{prod.category}</span>
                  <a
                    href={SITE_CONFIG.getWhatsAppServiceLink(prod.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.enquireBtn}
                  >
                    Enquire / Get Digital Copy &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Services & Certificate Applications */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Official Certificate Applications (UP e-District)
          </h2>
          <div className={styles.servicesGrid}>
            {digitalServicesList.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                </div>
                <p className={styles.serviceDesc}>{service.description}</p>
                <div className={styles.requirements}>
                  <h5>Required Documents:</h5>
                  <ul>
                    {service.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.timeTag}>Time: {service.processingTime}</span>
                  <a
                    href={SITE_CONFIG.getWhatsAppServiceLink(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.enquireBtn}
                  >
                    Apply Now &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

