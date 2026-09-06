import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../DocLayout.module.css";

export const metadata = {
  title: "Disclaimer | Unique Computer Centre - CSC Point",
  description: "Read our official disclaimer regarding government affiliations, service limitations, and print duplication rules.",
};

export default function Disclaimer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Disclaimer</h1>
            <span className={styles.lastUpdated}>Last Updated: August 28, 2026</span>
          </div>
          <div className={styles.content}>
            <p>
              Please read this disclaimer carefully before using the website <strong>uniquecscpoint.in</strong> operated by <strong>Unique Computer Centre - CSC Point</strong>.
            </p>

            <h2>1. No Official Government Affiliation</h2>
            <p>
              <strong>Unique Computer Centre - CSC Point</strong> is a private business enterprise and operates as a local Common Services Centre (CSC) facilitator in Jarwal, Uttar Pradesh.
            </p>
            <ul>
              <li>
                <strong>We are NOT a government body, department, or official agency of the Government of India or the Government of Uttar Pradesh.</strong>
              </li>
              <li>
                We do not issue official documents such as Aadhaar, PAN, Voter cards, or Driving Licences. These documents are issued exclusively by their respective government departments (UIDAI, Income Tax Department, Election Commission, RTO).
              </li>
              <li>
                Our platform provides auxiliary printing, digital application assistance, and lamination services for documents already officially issued to the respective cardholders.
              </li>
            </ul>

            <h2>2. Information Accuracy</h2>
            <p>
              While we endeavor to keep the website information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, products, or services.
            </p>
            <ul>
              <li>
                Government rules, official portals, links, and card fees change frequently. We advise citizens to refer to official portals (e.g., UIDAI, NSDL, e-District UP) for official policy verification.
              </li>
              <li>
                Any reliance you place on information found on this website is strictly at your own risk.
              </li>
            </ul>

            <h2>3. Document Printing Policy</h2>
            <p>
              We only print documents that are uploaded directly by the customer.
            </p>
            <ul>
              <li>
                The customer is entirely responsible for ensuring they upload their official government document and that it represents accurate and legal details.
              </li>
              <li>
                We do not cross-examine, update, or edit any details inside the uploaded PDF document. We print the PDF exactly as it is.
              </li>
              <li>
                We do not manufacture or print fake, duplicate, or blank cards.
              </li>
            </ul>

            <h2>4. Third-Party Links</h2>
            <p>
              Our website and blog contain links to official government websites (like `myaadhaar.uidai.gov.in`, `pmkisan.gov.in`, etc.). We have no control over the nature, content, and availability of those external sites. The inclusion of any links does not imply a recommendation or endorsement of the views expressed within them.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
