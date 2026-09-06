import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { faqs } from "@/lib/mockData";
import styles from "./faq.module.css";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Unique Computer Centre - CSC Point",
  description: "Get answers to your questions about online PVC card orders, processing times, document security, and payments.",
};

export default function FaqPage() {
  // Group FAQs by category
  const generalFaqs = faqs.filter((faq) => faq.category === "general");
  const pvcFaqs = faqs.filter((faq) => faq.category === "pvc");
  const paymentFaqs = faqs.filter((faq) => faq.category === "payment");
  const supportFaqs = faqs.filter((faq) => faq.category === "support");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Help &amp; FAQ Centre</h1>
          <p className={styles.heroSubtitle}>
            Find detailed responses regarding our PVC smart card printing process, document protection schemas, and centre rules.
          </p>
        </section>

        <section className={styles.container}>
          {/* PVC Cards FAQ Group */}
          <div className={styles.faqGroup}>
            <h2 className={styles.groupTitle}>
              <span className={styles.groupIcon}>💳</span> PVC Smart Cards FAQ
            </h2>
            <div className={styles.faqList}>
              {pvcFaqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Payments FAQ Group */}
          <div className={styles.faqGroup}>
            <h2 className={styles.groupTitle}>
              <span className={styles.groupIcon}>💰</span> Payments &amp; Refunds
            </h2>
            <div className={styles.faqList}>
              {paymentFaqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* General FAQ Group */}
          <div className={styles.faqGroup}>
            <h2 className={styles.groupTitle}>
              <span className={styles.groupIcon}>ℹ️</span> General Information
            </h2>
            <div className={styles.faqList}>
              {generalFaqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Support FAQ Group */}
          <div className={styles.faqGroup}>
            <h2 className={styles.groupTitle}>
              <span className={styles.groupIcon}>🛡️</span> Security &amp; Customer Support
            </h2>
            <div className={styles.faqList}>
              {supportFaqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Callout help */}
          <div className={styles.helpCallout}>
            <h3>Still Have Questions?</h3>
            <p>
              If you couldn&apos;t find an answer here, you can chat with Irfak Ahmad directly on WhatsApp or send a message via our contact form.
            </p>
            <Link href="/contact" className={styles.helpBtn}>
              Contact Us &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
