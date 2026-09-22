"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./contact.module.css";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.mobile || !formData.message) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields (Name, Mobile, Message).");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or contact us directly via phone.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Contact Support</h1>
          <p className={styles.heroSubtitle}>
            Have questions about a service application or PVC order? Reach out to our team in Jarwal, Bahraich.
          </p>
        </section>

        <section className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Details Column */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Get in Touch</h2>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div className={styles.icon}>📍</div>
                  <div className={styles.infoDetails}>
                    <h4>Physical Address</h4>
                    <p>{SITE_CONFIG.brandSubtitle}</p>
                    <p>{SITE_CONFIG.businessAddress}</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.icon}>📞</div>
                  <div className={styles.infoDetails}>
                    <h4>Call Support</h4>
                    <a href={`tel:${SITE_CONFIG.phoneNumber.replace(/\s+/g, "")}`}>{SITE_CONFIG.phoneNumber}</a>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{SITE_CONFIG.openingHours}</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.icon}>💬</div>
                  <div className={styles.infoDetails}>
                    <h4>WhatsApp Support</h4>
                    <a href={SITE_CONFIG.getWhatsAppHelpLink()} target="_blank" rel="noopener noreferrer">
                      {SITE_CONFIG.phoneNumber}
                    </a>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Instant service &amp; order assistance</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.icon}>✉️</div>
                  <div className={styles.infoDetails}>
                    <h4>Email Support</h4>
                    <a href={`mailto:${SITE_CONFIG.emailAddress}`}>{SITE_CONFIG.emailAddress}</a>
                  </div>
                </li>
              </ul>
            </div>


            {/* Contact Form Column */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              
              {status === "success" && (
                <div className={styles.successAlert}>
                  Thank you! Your message has been sent successfully. We will get back to you shortly.
                </div>
              )}

              {status === "error" && (
                <div className={styles.errorAlert}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your full name"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mobile" className={styles.label}>Mobile Number <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter 10-digit mobile number"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your email (optional)"
                    disabled={status === "loading"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="What is this enquiry about?"
                    disabled={status === "loading"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message / Details <span style={{ color: "var(--danger)" }}>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Describe your request in detail (e.g. details about certificates, pan update issues, etc.)"
                    required
                    disabled={status === "loading"}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "loading"}
                >
                  {status === "loading" && <div className={styles.spinner}></div>}
                  {status === "loading" ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div className={styles.socialSection}>
            <div className={styles.socialHeader}>
              <h2 className={styles.socialTitle}>Connect With Us</h2>
              <p className={styles.socialSubtitle}>
                Follow our official social media handles for service updates, announcements, and guides.
              </p>
            </div>

            <div className={styles.socialGrid}>
              {/* YouTube */}
              <div className={styles.socialCard}>
                <div>
                  <div className={styles.socialCardTop}>
                    <div className={`${styles.socialIconWrapper} ${styles.ytIcon}`}>
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <h3 className={styles.socialCardName}>YouTube</h3>
                  </div>
                  <p className={styles.socialCardDesc} style={{ marginTop: "0.75rem" }}>
                    Watch our latest updates and CSC service videos
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCardBtn}
                  aria-label="Visit Unique CSC Point on YouTube"
                >
                  Watch Channel &rarr;
                </a>
              </div>

              {/* Instagram */}
              <div className={styles.socialCard}>
                <div>
                  <div className={styles.socialCardTop}>
                    <div className={`${styles.socialIconWrapper} ${styles.igIcon}`}>
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <h3 className={styles.socialCardName}>Instagram</h3>
                  </div>
                  <p className={styles.socialCardDesc} style={{ marginTop: "0.75rem" }}>
                    Follow us for updates and announcements
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCardBtn}
                  aria-label="Follow Unique CSC Point on Instagram"
                >
                  Follow Instagram &rarr;
                </a>
              </div>

              {/* Facebook */}
              <div className={styles.socialCard}>
                <div>
                  <div className={styles.socialCardTop}>
                    <div className={`${styles.socialIconWrapper} ${styles.fbIcon}`}>
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <h3 className={styles.socialCardName}>Facebook</h3>
                  </div>
                  <p className={styles.socialCardDesc} style={{ marginTop: "0.75rem" }}>
                    Connect with Unique CSC Point
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCardBtn}
                  aria-label="Visit Unique CSC Point on Facebook"
                >
                  Visit Facebook &rarr;
                </a>
              </div>

              {/* WhatsApp Channel */}
              <div className={styles.socialCard}>
                <div>
                  <div className={styles.socialCardTop}>
                    <div className={`${styles.socialIconWrapper} ${styles.waChannelIcon}`}>
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z" />
                      </svg>
                    </div>
                    <h3 className={styles.socialCardName}>WhatsApp Channel</h3>
                  </div>
                  <p className={styles.socialCardDesc} style={{ marginTop: "0.75rem" }}>
                    Follow our WhatsApp Channel for updates
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.socialLinks.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCardBtn}
                  aria-label="Follow Unique CSC Point on WhatsApp Channel"
                >
                  Join Channel &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Maps Card */}
          <div className={styles.mapCard}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.052677134371!2d81.541285!3d27.155453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA5JzE5LjYiTiA4McKwMzInMjguNiJF!5e0!3m2!1sen!2sin!4v1693000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Unique Computer Centre Google Maps Location"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
