"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../partner.module.css";

export default function PartnerLogin() {
  const router = useRouter();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail || !password) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/partner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save partner session profile details in Local Storage
        localStorage.setItem("ucc_partner_id", data.partner.id);
        localStorage.setItem("ucc_partner_name", data.partner.name);
        localStorage.setItem("ucc_partner_shop", data.partner.shopName);
        
        router.push("/partner/dashboard");
      } else {
        setErrorMsg(data.error || "Invalid mobile/email or password.");
      }
    } catch {
      setErrorMsg("Something went wrong. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        <section className={styles.container} style={{ maxWidth: "450px" }}>
          <div className={styles.authCard}>
            <div style={{ textAlign: "center", fontSize: "3.5rem" }}>🏪</div>
            <h2 className={styles.cardTitle}>Reseller Agent Login</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-light)", textAlign: "center", marginTop: "-1rem" }}>
              Unique Computer Centre - Partner Portal
            </p>

            {errorMsg && (
              <div className={styles.errorAlert} style={{ padding: "0.75rem", fontSize: "0.85rem", textAlign: "center" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Mobile Number or Email</label>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter registered mobile / email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter account password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Login to Portal"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
              <p>
                Don&apos;t have an agent account?{" "}
                <Link href="/partner" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "underline" }}>
                  Register Shop Here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
