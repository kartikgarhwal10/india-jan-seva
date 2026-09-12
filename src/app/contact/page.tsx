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
                <li className={styles.infoItem}>
                  <div className={styles.icon}>📸</div>
                  <div className={styles.infoDetails}>
                    <h4>Instagram Channel</h4>
                    <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer">
                      @unique_csc_point
                    </a>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Follow for latest updates &amp; notifications</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.icon}>🌐</div>
                  <div className={styles.infoDetails}>
                    <h4>Facebook Page</h4>
                    <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer">
                      Unique CSC Point
                    </a>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Join our community on Facebook</p>
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
