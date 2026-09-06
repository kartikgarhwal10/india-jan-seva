"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import styles from "./order.module.css";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  requirements: string; // JSON string
  features: string; // JSON string
  deliveryTime: string;
  image: string;
}

interface OrderFormProps {
  products: Product[];
}

export default function OrderForm({ products }: OrderFormProps) {
  const searchParams = useSearchParams();
  const initialProductSlug = searchParams.get("product") || "";

  // Wizard Step State
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Successful order state for final confirmation screen
  const [createdOrder, setCreatedOrder] = useState<{
    orderId: string;
    productName: string;
    amount: number;
    status: string;
  } | null>(null);

  // Razorpay Checkout Payment States
  const [paymentState, setPaymentState] = useState<"default" | "loading" | "opened" | "success" | "failure">("default");
  const [paymentError, setPaymentError] = useState("");
  const [verifiedPaymentDetails, setVerifiedPaymentDetails] = useState<{ paymentId: string; amount: number } | null>(null);

  // Form Fields State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [villageTown, setVillageTown] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Uttar Pradesh");
  const [pinCode, setPinCode] = useState("");
  const [notes, setNotes] = useState("");

  // Pre-select product based on URL slug query
  useEffect(() => {
    if (initialProductSlug && products.length > 0) {
      const match = products.find((p) => p.slug === initialProductSlug);
      if (match) {
        Promise.resolve().then(() => {
          setSelectedProduct(match);
        });
      }
    } else if (products.length > 0 && !selectedProduct) {
      Promise.resolve().then(() => {
        setSelectedProduct(products[0]);
      });
    }
  }, [initialProductSlug, products, selectedProduct]);

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Max 5MB limit
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("File size exceeds 5MB limit. Please upload a compressed PDF or image.");
        return;
      }
      // Allowed MIME types
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMsg("Invalid file type. Only PDF, JPG, and PNG uploads are accepted.");
        return;
      }
      setFile(selectedFile);
      setErrorMsg("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("File size exceeds 5MB limit.");
        return;
      }
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type.toLowerCase())) {
        setErrorMsg("Invalid file type. Only PDF, JPG, and PNG are allowed.");
        return;
      }
      setFile(selectedFile);
      setErrorMsg("");
    }
  };

  const handleUploadKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("file-picker")?.click();
    }
  };

  const parseRequirements = (reqStr: string): string[] => {
    try {
      return JSON.parse(reqStr);
    } catch {
      return [reqStr];
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedProduct) {
      setErrorMsg("Please select a PVC card product to proceed.");
      return;
    }
    if (step === 2) {
      const trimmedName = customerName.trim();
      const mobileTrim = customerMobile.trim();
      if (!trimmedName || !mobileTrim || !file) {
        setErrorMsg("Name, Mobile number, and Document file upload are required.");
        return;
      }
      if (trimmedName.length < 3) {
        setErrorMsg("Full Name must be at least 3 characters.");
        return;
      }
      if (!/^[6-9]\d{9}$/.test(mobileTrim)) {
        setErrorMsg("Please enter a valid 10-digit Indian mobile number (e.g. 7084666326).");
        return;
      }
      if (customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
    }
    if (step === 3) {
      if (!deliveryAddress.trim() || !villageTown.trim() || !district.trim() || !state.trim() || !pinCode.trim()) {
        setErrorMsg("Please complete all shipping address fields.");
        return;
      }
      if (!/^\d{6}$/.test(pinCode.trim())) {
        setErrorMsg("Please enter a valid 6-digit PIN code.");
        return;
      }
    }

    setErrorMsg("");
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setStep((prev) => prev - 1);
  };

  // Launch Checkout & Payment verification
  const handleSubmitOrder = async () => {
    if (!selectedProduct || !file) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Step A: Submit Order to Backend API
      const formData = new FormData();
      formData.append("productId", selectedProduct.id);
      formData.append("customerName", customerName.trim());
      formData.append("customerMobile", customerMobile.trim());
      formData.append("customerEmail", customerEmail.trim());
      formData.append("deliveryAddress", deliveryAddress.trim());
      formData.append("villageTown", villageTown.trim());
      formData.append("district", district.trim());
      formData.append("state", state.trim());
      formData.append("pinCode", pinCode.trim());
      formData.append("file", file);
      formData.append("notes", notes.trim());

      // Check if partner dashboard credentials exist, pass it if present
      const partnerId = localStorage.getItem("ucc_partner_id");
      if (partnerId) {
        formData.append("partnerId", partnerId);
      }

      const res = await fetch("/api/order/create", {
        method: "POST",
        body: formData,
      });

      const orderData = await res.json();

      if (!res.ok || orderData.error) {
        throw new Error(orderData.error || "Failed to create order.");
      }

      const { orderId, productName, amount, status } = orderData;

      // Update state to render the Confirmation Screen directly
      setCreatedOrder({
        orderId,
        productName,
        amount,
        status,
      });
      setIsSubmitting(false);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setErrorMsg(message || "Checkout submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleTriggerPayment = async () => {
    if (!createdOrder) return;
    setPaymentState("loading");
    setPaymentError("");

    try {
      // 1. Create secure payment order on the server
      const payRes = await fetch("/api/order/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: createdOrder.orderId }),
      });

      const payData = await payRes.json();

      if (!payRes.ok || payData.error) {
        throw new Error(payData.error || "Failed to initialize payment gateway.");
      }

      const {
        isMock,
        keyId,
        razorpayOrderId,
        amount,
        productName,
        customerName,
        customerEmail,
        customerMobile,
      } = payData;

      // 2. Local Dev Mock Checkout Integration
      if (isMock) {
        console.log("[MOCK PAYMENT] Simulating sandbox checkout flow...");
        setPaymentState("opened");

        setTimeout(async () => {
          try {
            const verifyRes = await fetch("/api/order/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: createdOrder.orderId,
                razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
                razorpayOrderId,
                isMock: true,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setVerifiedPaymentDetails({
                paymentId: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
                amount,
              });
              setPaymentState("success");
            } else {
              throw new Error(verifyData.error || "Signature verification failed.");
            }
          } catch (verifyErr: unknown) {
            const msg = verifyErr instanceof Error ? verifyErr.message : "Failed to verify mock payment.";
            setPaymentError(msg);
            setPaymentState("failure");
          }
        }, 1500);

        return;
      }

      // 3. Live Razorpay Checkout Options
      setPaymentState("opened");
      const options = {
        key: keyId,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "Unique Computer Centre",
        description: `Smart PVC Card - ${productName}`,
        order_id: razorpayOrderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          setPaymentState("loading");
          try {
            const verifyRes = await fetch("/api/order/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: createdOrder.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setVerifiedPaymentDetails({
                paymentId: response.razorpay_payment_id,
                amount,
              });
              setPaymentState("success");
            } else {
              throw new Error(verifyData.error || "Payment signature verification failed.");
            }
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Payment verification failed.";
            setPaymentError(msg);
            setPaymentState("failure");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment checkout window dismissed.");
            setPaymentState("failure");
            setPaymentError("Payment process cancelled by customer.");
          },
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerMobile,
        },
        theme: {
          color: "#0056b3",
        },
      };

      interface RazorpayWindow {
        Razorpay: new (options: Record<string, unknown>) => { open: () => void };
      }
      const rzp = new (window as unknown as RazorpayWindow).Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Could not launch Razorpay Checkout.";
      setPaymentError(msg);
      setPaymentState("failure");
    }
  };

  if (createdOrder) {
    // CASE A: Payment Successful Screen
    if (paymentState === "success" && verifiedPaymentDetails) {
      return (
        <div className={styles.container}>
          <div className={styles.checkoutCard} style={{ maxWidth: "600px", margin: "2rem auto", padding: "2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ fontSize: "5rem", display: "block", marginBottom: "1rem", color: "#25d366" }}>✓</span>
              <h2 className={styles.checkoutTitle} style={{ color: "#25d366", fontSize: "2rem", fontWeight: 900 }}>
                Payment Successful
              </h2>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                Thank you! Your payment signature is verified successfully.
              </p>
            </div>
            
            <table className={styles.summaryTable} style={{ margin: "2rem 0" }}>
              <tbody>
                <tr>
                  <td className={styles.summaryLabel}>Order ID</td>
                  <td style={{ fontWeight: 800, color: "var(--primary)" }}>{createdOrder.orderId}</td>
                </tr>
                <tr>
                  <td className={styles.summaryLabel}>Payment ID</td>
                  <td style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{verifiedPaymentDetails.paymentId}</td>
                </tr>
                <tr>
                  <td className={styles.summaryLabel}>Order Status</td>
                  <td style={{ fontWeight: 800, color: "var(--accent)" }}>Processing</td>
                </tr>
                <tr>
                  <td className={styles.summaryLabel}>Amount Paid</td>
                  <td style={{ fontWeight: 800 }}>₹{verifiedPaymentDetails.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.controls} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Link 
                href={`/track-order?orderId=${createdOrder.orderId}`} 
                className={styles.nextBtn} 
                style={{ textAlign: "center", textDecoration: "none", display: "block" }}
              >
                Track Order
              </Link>
              <a
                href={`https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mera%20Order%20ID%20${createdOrder.orderId}%20ki%20payment%20successful%20ho%20gayi%20hai.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waOrderBtn}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none" }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    // CASE B: Payment Failure Screen
    if (paymentState === "failure") {
      return (
        <div className={styles.container}>
          <div className={styles.checkoutCard} style={{ maxWidth: "600px", margin: "2rem auto", padding: "2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ fontSize: "5rem", display: "block", marginBottom: "1rem", color: "var(--danger)" }}>⚠️</span>
              <h2 className={styles.checkoutTitle} style={{ color: "var(--danger)", fontSize: "1.8rem", fontWeight: 900 }}>
                Payment Failed
              </h2>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                {paymentError || "Payment could not be completed."}
              </p>
              <p style={{ color: "var(--text-main)", fontWeight: 700, marginTop: "1rem" }}>
                Your order details are still safe.
              </p>
            </div>
            
            <table className={styles.summaryTable} style={{ margin: "1.5rem 0" }}>
              <tbody>
                <tr>
                  <td className={styles.summaryLabel}>Order ID</td>
                  <td style={{ fontWeight: 800, color: "var(--primary)" }}>{createdOrder.orderId}</td>
                </tr>
                <tr>
                  <td className={styles.summaryLabel}>Card Product</td>
                  <td>{createdOrder.productName}</td>
                </tr>
                <tr>
                  <td className={styles.summaryLabel}>Amount Due</td>
                  <td style={{ fontWeight: 800 }}>₹{createdOrder.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.controls} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1rem" }}>
              <button 
                onClick={handleTriggerPayment}
                className={styles.payBtn}
                style={{ width: "100%", padding: "1rem" }}
              >
                Retry Payment
              </button>
            </div>

            <div className={styles.controls} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Link 
                href={`/track-order?orderId=${createdOrder.orderId}`} 
                className={styles.backBtn} 
                style={{ textAlign: "center", textDecoration: "none", display: "block" }}
              >
                Track Order
              </Link>
              <a
                href={`https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mera%20Order%20ID%20${createdOrder.orderId}%20ki%20payment%20fail%20ho%20gayi%20hai.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waOrderBtn}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none" }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    // CASE C: Order Registered - Unpaid Summary Screen
    const isPaymentTriggerDisabled = paymentState === "loading" || paymentState === "opened";

    return (
      <div className={styles.container}>
        <div className={styles.checkoutCard} style={{ maxWidth: "600px", margin: "2rem auto", padding: "2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: "4.5rem", display: "block", marginBottom: "1rem" }}>🎉</span>
            <h2 className={styles.checkoutTitle} style={{ color: "var(--accent)", fontSize: "2rem", fontWeight: 900 }}>
              Order Registered
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Your order has been created. Please complete the payment to start processing.
            </p>
          </div>
          
          <table className={styles.summaryTable} style={{ margin: "2rem 0" }}>
            <tbody>
              <tr>
                <td className={styles.summaryLabel}>Your Order ID</td>
                <td style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.2rem" }}>{createdOrder.orderId}</td>
              </tr>
              <tr>
                <td className={styles.summaryLabel}>Product</td>
                <td style={{ fontWeight: 700 }}>{createdOrder.productName}</td>
              </tr>
              <tr>
                <td className={styles.summaryLabel}>Amount</td>
                <td style={{ fontWeight: 800 }}>₹{createdOrder.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className={styles.summaryLabel}>Payment Status</td>
                <td>
                  <span style={{ 
                    background: "rgba(181, 137, 0, 0.1)", 
                    color: "#b58900", 
                    padding: "0.3rem 0.8rem", 
                    borderRadius: "999px", 
                    fontWeight: 800, 
                    fontSize: "0.8rem" 
                  }}>
                    PENDING
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {paymentError && (
            <div className={styles.errorAlert} style={{ marginBottom: "1.5rem" }}>
              {paymentError}
            </div>
          )}

          <div className={styles.controls} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1rem" }}>
            <button 
              onClick={handleTriggerPayment}
              className={styles.payBtn}
              style={{ width: "100%", padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              disabled={isPaymentTriggerDisabled}
            >
              {paymentState === "loading" && <div className={styles.spinner}></div>}
              {paymentState === "loading" ? "Initializing Payment..." : "Pay Now"}
            </button>
          </div>

          <div className={styles.controls} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Link 
              href={`/track-order?orderId=${createdOrder.orderId}`} 
              className={styles.backBtn} 
              style={{ textAlign: "center", textDecoration: "none", display: "block" }}
            >
              Track Order
            </Link>
            <a
              href={`https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mera%20Order%20ID%20${createdOrder.orderId}%20pending%20hai%20aur%20mujhe%20help%20chahiye.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waOrderBtn}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none" }}
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Step Indicators */}
      <div className={styles.stepsContainer}>
        <div className={`${styles.step} ${step === 1 ? styles.stepActive : ""} ${step > 1 ? styles.stepCompleted : ""}`}>
          <div className={styles.stepCircle}>1</div>
          <span className={styles.stepLabel}>Select Card</span>
        </div>
        <div className={`${styles.step} ${step === 2 ? styles.stepActive : ""} ${step > 2 ? styles.stepCompleted : ""}`}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>Document</span>
        </div>
        <div className={`${styles.step} ${step === 3 ? styles.stepActive : ""} ${step > 3 ? styles.stepCompleted : ""}`}>
          <div className={styles.stepCircle}>3</div>
          <span className={styles.stepLabel}>Shipping</span>
        </div>
        <div className={`${styles.step} ${step === 4 ? styles.stepActive : ""}`}>
          <div className={styles.stepCircle}>4</div>
          <span className={styles.stepLabel}>Checkout</span>
        </div>
      </div>

      {/* Error Alert Display */}
      {errorMsg && <div className={styles.errorAlert} style={{ marginBottom: "1.5rem" }}>{errorMsg}</div>}

      {/* Wizard Step Boxes */}
      <div className={styles.checkoutCard}>
        {/* STEP 1: SELECT PRODUCT */}
        {step === 1 && (
          <div>
            <h2 className={styles.checkoutTitle}>Step 1: Choose PVC Card Product</h2>
            <div className={styles.productGrid} style={{ marginTop: "1.5rem" }}>
              {products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`${styles.productCard} ${selectedProduct?.id === prod.id ? styles.productCardSelected : ""}`}
                >
                  <span className={styles.prodName}>{prod.name}</span>
                  <span className={styles.prodPrice}>₹{prod.price}</span>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{prod.deliveryTime}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMER INFO & UPLOAD DOCUMENT */}
        {step === 2 && selectedProduct && (
          <div>
            <h2 className={styles.checkoutTitle}>Step 2: Customer Info &amp; Document Upload</h2>
            <div className={styles.formGrid} style={{ marginTop: "1.5rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={styles.input}
                  placeholder="Enter name of cardholder"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mobile Number <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="tel"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  className={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter email address (optional)"
                />
              </div>

              {/* Upload Drop Zone */}
              <div className={styles.fullWidth} style={{ marginTop: "1rem" }}>
                <label className={styles.label} style={{ marginBottom: "0.5rem", display: "block" }}>
                  Upload Document PDF/Image <span style={{ color: "var(--danger)" }}>*</span>
                </label>
                
                {!file ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-picker")?.click()}
                    onKeyDown={handleUploadKeyDown}
                    className={styles.uploadZone}
                    tabIndex={0}
                    role="button"
                    aria-label={`Upload document for ${selectedProduct.name}. Required: ${parseRequirements(selectedProduct.requirements).join(", ")}`}
                  >
                    <span className={styles.uploadIcon}>📥</span>
                    <span className={styles.uploadTitle}>Drag &amp; drop PDF/Image here or click to browse</span>
                    <span className={styles.uploadText}>
                      Allowed formats: PDF, JPG, PNG. Max file size: 5MB.<br />
                      Requirements: {parseRequirements(selectedProduct.requirements).join(", ")}
                    </span>
                    <input
                      type="file"
                      id="file-picker"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={styles.fileInput}
                      tabIndex={-1}
                    />
                  </div>
                ) : (
                  <div className={styles.fileInfo}>
                    <span>📄</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ wordBreak: "break-all" }}>{file.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button onClick={() => setFile(null)} className={styles.fileDeleteBtn} title="Remove file">
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SHIPPING ADDRESS */}
        {step === 3 && (
          <div>
            <h2 className={styles.checkoutTitle}>Step 3: Delivery Address</h2>
            <div className={styles.formGrid} style={{ marginTop: "1.5rem" }}>
              <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                <label className={styles.label}>Full Address (House / Street / Shop Name) <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className={styles.input}
                  placeholder="Enter house/shop number, street name, landmarks"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Village / Town <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={villageTown}
                  onChange={(e) => setVillageTown(e.target.value)}
                  className={styles.input}
                  placeholder="Enter Village or Town name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>District <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Bahraich"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>State <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Uttar Pradesh"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>PIN Code <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className={styles.input}
                  placeholder="Enter 6-digit postal code"
                  required
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                <label className={styles.label}>Special Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={styles.input}
                  placeholder="e.g., Deliver near Gram Panchayat building"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SUMMARY & SUBMIT */}
        {step === 4 && selectedProduct && (
          <div>
            <h2 className={styles.checkoutTitle}>Step 4: Order Summary</h2>
            <div style={{ marginTop: "1.5rem" }}>
              <table className={styles.summaryTable}>
                <tbody>
                  <tr>
                    <td className={styles.summaryLabel}>Card Product</td>
                    <td>{selectedProduct.name}</td>
                  </tr>
                  <tr>
                    <td className={styles.summaryLabel}>Cardholder Name</td>
                    <td>{customerName}</td>
                  </tr>
                  <tr>
                    <td className={styles.summaryLabel}>Contact Mobile</td>
                    <td>{customerMobile}</td>
                  </tr>
                  <tr>
                    <td className={styles.summaryLabel}>Document File</td>
                    <td style={{ wordBreak: "break-all" }}>{file?.name}</td>
                  </tr>
                  <tr>
                    <td className={styles.summaryLabel}>Delivery Address</td>
                    <td>
                      {deliveryAddress}, {villageTown}, {district}, {state} - {pinCode}
                    </td>
                  </tr>
                  {notes && (
                    <tr>
                      <td className={styles.summaryLabel}>Special Notes</td>
                      <td>{notes}</td>
                    </tr>
                  )}
                  <tr>
                    <td className={styles.summaryLabel}>Base Price</td>
                    <td>₹{selectedProduct.price.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className={styles.summaryLabel}>Shipping &amp; Packing</td>
                    <td style={{ color: "var(--accent)", fontWeight: 700 }}>FREE</td>
                  </tr>
                  <tr className={styles.totalRow}>
                    <td>Total Amount</td>
                    <td className={styles.totalVal}>₹{selectedProduct.price.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className={styles.controls}>
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className={styles.backBtn}
              disabled={isSubmitting}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNextStep}
              className={styles.nextBtn}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmitOrder}
              className={styles.payBtn}
              disabled={isSubmitting}
            >
              {isSubmitting && <div className={styles.spinner}></div>}
              {isSubmitting ? "Creating Order..." : "Confirm & Place Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
