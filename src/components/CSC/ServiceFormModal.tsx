"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { ServiceItem } from "@/lib/mockData";
import styles from "./ServiceFormModal.module.css";

interface ServiceFormModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceFormModal({ service, onClose }: ServiceFormModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) return;

    // Send inquiry directly via WhatsApp
    const message = `Hello Unique Computer Centre, main ${service.name} service apply karna chahta hoon.\nName: ${name.trim()}\nMobile: ${mobile.trim()}${notes.trim() ? `\nDetails: ${notes.trim()}` : ""}`;
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      onClose();
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className={styles.header}>
          <span className={styles.icon}>{service.icon}</span>
          <h2 className={styles.title}>{service.name}</h2>
          <p className={styles.subtitle}>CSC Service Request Form</p>
        </div>

        {submitted ? (
          <div className={styles.successBox}>
            <span style={{ fontSize: "3rem" }}>✅</span>
            <h3>Request Initiated!</h3>
            <p>Opening WhatsApp to send your request details to our operator...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.reqBox}>
              <strong>Required Documents/Details:</strong>
              <ul>
                {service.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile Number *</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Additional Details / Application Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Aadhaar number / Enrolment ID / specific requirement"
                className={styles.textarea}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={onClose} className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit Request via WhatsApp &rarr;
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
