import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../DocLayout.module.css";

export const metadata = {
  title: "Refund & Cancellation Policy | Unique Computer Centre - CSC Point",
  description: "Read our rules regarding transaction refunds, order cancellations, and duplicate payments for smart card print orders.",
};

export default function RefundPolicy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Refund &amp; Cancellation</h1>
            <span className={styles.lastUpdated}>Last Updated: August 28, 2026</span>
          </div>
          <div className={styles.content}>
            <p>
              At <strong>Unique Computer Centre - CSC Point</strong>, we strive to maintain high-quality prints and reliable delivery. Since our products are custom-printed PVC smart cards, we have specific rules regarding cancellations and refunds.
            </p>

            <h2>1. Order Cancellation</h2>
            <p>
              Cancellations are only possible before printing has begun.
            </p>
            <ul>
              <li>
                To request a cancellation, you must contact our support via WhatsApp or email within <strong>1 hour</strong> of placing your order.
              </li>
              <li>
                Once our operator updates the status of your order to &quot;Printing&quot; or &quot;Processing&quot;, we cannot cancel the order or issue a refund as the PVC material has already been custom printed with your private document.
              </li>
            </ul>

            <h2>2. Duplicate Payments</h2>
            <p>
              In case of transactional errors where money was deducted twice or an order was submitted twice by mistake:
            </p>
            <ul>
              <li>
                Please notify us immediately with your transaction references and order IDs.
              </li>
              <li>
                After verifying the bank statement, we will initiate a refund for the duplicate transaction within <strong>5-7 working days</strong>. The refund will be credited back to your original payment method (bank account or UPI wallet).
              </li>
            </ul>

            <h2>3. Damaged or Faulty Prints</h2>
            <p>
              If you receive a PVC card that has printing defects or was damaged during shipping:
            </p>
            <ul>
              <li>
                Please take a clear photo/video of the card and send it to our WhatsApp support within <strong>24 hours</strong> of delivery.
              </li>
              <li>
                Upon verification of the defect, we will print and ship a fresh replacement card at <strong>no extra cost</strong> to you.
              </li>
              <li>
                Please note that we do not issue refunds for spelling mistakes or low-quality photos that were already present in the official PDF document you uploaded.
              </li>
            </ul>

            <h2>4. Incorrect Addresses</h2>
            <p>
              We do not issue refunds if a package is returned to us or lost because the customer provided an incorrect or incomplete delivery address, mobile number, or PIN code. In such cases, the customer will need to pay standard re-shipping charges of <strong>₹50</strong> to have the card dispatched again to a corrected address.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
