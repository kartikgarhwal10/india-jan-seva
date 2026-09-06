"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./partner.module.css";

export default function PartnerLanding() {
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          shopName: "",
          phone: "",
          email: "",
          address: "",
          password: "",
        });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to submit partner application.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        <section className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Benefits Copy Column */}
            <div className={styles.introText}>
              <span className={styles.benefitIcon} style={{ color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "0.5rem" }}>
                Partner Network
              </span>
              <h1>Become Our Reseller Agent</h1>
              <p>
                Run a cyber cafe, computer centre, or local kiosk? Join the Unique Computer Centre network to offer premium PVC smart card printing to your customers.
              </p>

              <div className={styles.benefits}>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div className={styles.benefitText}>
                    <h3>Reseller Discount Pricing</h3>
                    <p>Order cards at a flat rate of just <strong>₹80</strong> (Standard rate: ₹149). Earn ₹69 profit per card!</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div className={styles.benefitText}>
                    <h3>Consolidated Partner Dashboard</h3>
                    <p>Place multiple customer orders and track their delivery status timeline from a single dashboard.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div className={styles.benefitText}>
                    <h3>Priority Printing &amp; Support</h3>
                    <p>Partner orders enter a priority printing queue with direct access to operator support.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <p style={{ fontSize: "0.95rem" }}>
                  Already have a partner account?{" "}
                  <Link href="/partner/login" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "underline" }}>
                    Log In Here
                  </Link>
                </p>
              </div>
            </div>

            {/* Registration Form Column */}
            <div className={styles.authCard}>
              <h2 className={styles.cardTitle}>Register Shop/Kiosk</h2>
              
              {status === "success" && (
                <div className={styles.successAlert}>
                  Registration submitted successfully! Our administrator (Mohd Irfak Ahmad) will verify your details and activate your account.
                </div>
              )}

              {status === "error" && (
                <div className={styles.errorAlert}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Owner Full Name <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter owner name"
                    required
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Shop / Kiosk Name <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. Rahul Digital Seva Kendra"
                    required
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Mobile Number <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter 10-digit phone number"
                    required
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. partner@example.com"
                    required
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Shop Location Address <span style={{ color: "var(--danger)" }}>*</span></label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Enter full shop address, village/town, district"
                    required
                    disabled={status === "loading" || status === "success"}
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Choose Password <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Create a strong password"
                    required
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" && <div className={styles.spinner}></div>}
                  {status === "loading" ? "Submitting Application..." : "Submit Reseller Application"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
