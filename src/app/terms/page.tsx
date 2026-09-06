import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../DocLayout.module.css";

export const metadata = {
  title: "Terms & Conditions | Unique Computer Centre - CSC Point",
  description: "Review the terms, legal conditions, customer responsibilities, and use limitations of the UniqueCSCPoint website.",
};

export default function TermsAndConditions() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Terms &amp; Conditions</h1>
            <span className={styles.lastUpdated}>Last Updated: August 28, 2026</span>
          </div>
          <div className={styles.content}>
            <p>
              Welcome to <strong>Unique Computer Centre - CSC Point</strong>. These terms and conditions outline the rules and regulations for the use of UniqueCSCPoint&apos;s Website, located at <strong>uniquecscpoint.in</strong>.
            </p>
            <p>
              By accessing this website and ordering PVC smart cards, we assume you accept these terms and conditions. Do not continue to use UniqueCSCPoint if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2>1. User Responsibilities &amp; Document Accuracy</h2>
            <p>
              When ordering a PVC card, you are responsible for uploading the correct and genuine government-issued PDF file.
            </p>
            <ul>
              <li>
                You represent that you are the legal owner of the document or have explicit authorization from the owner to print it.
              </li>
              <li>
                We do not edit, modify, or verify the information (name, address, photo, numbers) on the uploaded document. It will be printed exactly as provided in the PDF file.
              </li>
              <li>
                Uploading forged, altered, or unauthorized documents is strictly prohibited and may result in order cancellation and reporting to local law enforcement.
              </li>
            </ul>

            <h2>2. Pricing &amp; Payments</h2>
            <p>
              Prices for all PVC cards are displayed on our product catalog and are subject to change.
            </p>
            <ul>
              <li>
                Payments must be completed online via UPI, debit card, or net banking using our Razorpay payment gateway.
              </li>
              <li>
                Your order will only enter the printing queue once payment verification is successfully completed on our servers.
              </li>
              <li>
                We reserve the right to cancel orders showing failed payment status or duplicate reference errors.
              </li>
            </ul>

            <h2>3. Reseller and Partner Accounts</h2>
            <p>
              If you register for our Partner/Agent Program:
            </p>
            <ul>
              <li>
                You must provide accurate shop details and contact numbers.
              </li>
              <li>
                Reseller pricing and commission thresholds are set by the administrator panel and can be updated at any time.
              </li>
              <li>
                We reserve the right to terminate partner accounts engaged in spamming, card duplication fraud, or non-compliant customer pricing.
              </li>
            </ul>

            <h2>4. Limitation of Liability</h2>
            <p>
              Unique Computer Centre acts as an auxiliary assistance service. We are not a government agency and do not issue official documents. We are only printing documents already officially issued to you. We shall not be held liable for any loss, fine, or legal action arising from the misuse of PVC printed copies by the customer.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Uttar Pradesh, India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bahraich district.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
