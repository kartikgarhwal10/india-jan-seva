import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../DocLayout.module.css";

export const metadata = {
  title: "Privacy Policy | Unique Computer Centre - CSC Point",
  description: "Read about how we collect, store, secure, and delete customer documents and personal information for PVC smart card orders.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <span className={styles.lastUpdated}>Last Updated: August 28, 2026</span>
          </div>
          <div className={styles.content}>
            <p>
              At <strong>Unique Computer Centre - CSC Point</strong>, accessible from <strong>uniquecscpoint.in</strong>, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy document contains types of information that is collected and recorded by our platform and how we use it, particularly concerning sensitive documents like Aadhaar cards, PAN cards, and vehicle registration papers.
            </p>

            <h2>1. Document Upload & Security Policy</h2>
            <p>
              Because we print government-issued cards onto plastic PVC smart cards, you are required to upload PDF copies of your documents. We treat these files with the highest standard of security:
            </p>
            <ul>
              <li>
                <strong>Access Control:</strong> Uploaded documents are saved in a private directory on our server, which is completely isolated from public access. Only our authenticated operators can retrieve files for printing purposes.
              </li>
              <li>
                <strong>Automatic Retention:</strong> We do not store your private documents indefinitely. Documents are automatically and permanently deleted from our servers 30 days after the order status has been updated to &quot;Delivered&quot;.
              </li>
              <li>
                <strong>No Sharing:</strong> We do not sell, rent, lease, or share your documents with any third-party marketing companies, agencies, or external developers.
              </li>
            </ul>

            <h2>2. Personal Information We Collect</h2>
            <p>
              When you place an order or contact us, we may collect basic details including:
            </p>
            <ul>
              <li>Full Name</li>
              <li>Mobile Number (for order confirmations and tracking links)</li>
              <li>Email Address (for receipts and invoices)</li>
              <li>Full Delivery Address (Village/Town, District, State, PIN Code)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul>
              <li>Process and print your PVC smart card orders.</li>
              <li>Ship orders through Indian Post or local courier services to your address.</li>
              <li>Send notifications regarding order confirmations, payments, and tracking codes.</li>
              <li>Respond to support questions, complaints, or inquiries via email or WhatsApp.</li>
              <li>Prevent fraudulent orders or transaction failures.</li>
            </ul>

            <h2>4. Cookies</h2>
            <p>
              We use cookies to maintain your shopping cart state, session authentication for operators and partners, and basic anonymous tracking. You can choose to disable cookies through your individual browser options.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>{SITE_CONFIG.emailAddress}</strong> or visit our office at {SITE_CONFIG.businessAddress}.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
