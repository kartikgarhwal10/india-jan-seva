"use client";

import { useState } from "react";
import styles from "./admin.module.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Force full page reload to verify admin session on server side
        window.location.reload();
      } else {
        setErrorMsg(data.error || "Invalid operator credentials.");
      }
    } catch {
      setErrorMsg("Something went wrong. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div style={{ textAlign: "center", fontSize: "3rem" }}>🔒</div>
        <h2 className={styles.loginTitle}>Operator Portal</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-light)", textAlign: "center", marginTop: "-1rem" }}>
          Unique Computer Centre - CSC Point
        </p>

        {errorMsg && (
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "var(--danger)",
            padding: "0.75rem",
            borderRadius: "4px",
            fontSize: "0.85rem",
            fontWeight: 600,
            textAlign: "center"
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>Operator Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.statusSelect}
              placeholder="e.g. admin"
              required
              disabled={isLoading}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.statusSelect}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
