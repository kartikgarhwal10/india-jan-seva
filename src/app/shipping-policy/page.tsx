import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../DocLayout.module.css";

export const metadata = {
  title: "Shipping Policy | Unique Computer Centre - CSC Point",
  description: "Learn about our processing timelines, postal dispatch, estimated delivery periods, and standard re-shipping charges.",
};

export default function ShippingPolicy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Shipping Policy</h1>
            <span className={styles.lastUpdated}>Last Updated: August 28, 2026</span>
          </div>
          <div className={styles.content}>
            <p>
              At <strong>Unique Computer Centre - CSC Point</strong>, we aim to dispatch your premium PVC smart cards as quickly as possible. Please review our shipping practices, timelines, and guidelines below.
            </p>

            <h2>1. Order Processing &amp; Printing Time</h2>
            <p>
              Every smart card is printed to order.
            </p>
            <ul>
              <li>
                <strong>Verification:</strong> Once an order is paid, our operator verifies the uploaded document within <strong>12-24 hours</strong>.
              </li>
              <li>
                <strong>Printing &amp; Packing:</strong> Cards are printed, quality-checked, and safely packed in protective envelopes within <strong>24-48 hours</strong> of verification.
              </li>
              <li>
                Orders are not printed or shipped on Sundays and national public holidays.
              </li>
            </ul>

            <h2>2. Shipping Partner &amp; Timelines</h2>
            <p>
              We ship orders all across India:
            </p>
            <ul>
              <li>
                <strong>Primary Carrier:</strong> We primarily dispatch cards through <strong>India Post (Speed Post / Registered Post)</strong> to ensure reliable delivery to even the most remote villages. For town addresses, we may use private couriers (Delhivery, Shiprocket) when appropriate.
              </li>
              <li>
                <strong>Estimated Delivery:</strong>
                <ul>
                  <li>Within Uttar Pradesh: <strong>3 - 5 working days</strong>.</li>
                  <li>Rest of India: <strong>5 - 7 working days</strong>.</li>
                </ul>
              </li>
              <li>
                Please note that weather conditions, natural disasters, or postal strikes may occasionally cause minor delivery delays.
              </li>
            </ul>

            <h2>3. Shipment Tracking</h2>
            <p>
              Once your package is handed over to the courier, we will update your order with a tracking number and dispatch status.
            </p>
            <ul>
              <li>
                You can input your order ID on our <strong>Track Order</strong> page to check the local status (Pending, Printing, Shipped, Delivered).
              </li>
              <li>
                If shipped via India Post, a tracking link/ID (e.g., `RU123456789IN`) will be provided to let you track the live transit on the official India Post website.
              </li>
            </ul>

            <h2>4. Non-Delivery &amp; Re-Shipping</h2>
            <p>
              If a package is returned to us by the post office due to:
            </p>
            <ul>
              <li>Incomplete address, wrong village/town name, or incorrect PIN code.</li>
              <li>Customer not available or refusing the package.</li>
              <li>Invalid phone number that couriers cannot contact.</li>
            </ul>
            <p>
              We will contact you to update your details. The customer will be responsible for a re-shipping fee of <strong>₹50</strong> to cover the cost of postage for the second delivery attempt.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
