"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./track.module.css";

interface StatusHistoryItem {
  status: string;
  note: string | null;
  createdAt: string;
}

interface OrderDetails {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  amount: number;
  paymentStatus: string;
  orderStatus: string;
  courierName: string | null;
  trackingNumber: string | null;
  createdAt?: string;
  updatedAt: string;
  statusHistory?: StatusHistoryItem[];
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlOrderId = searchParams.get("orderId") || "";
  const isSuccess = searchParams.get("success") === "true";

  const [orderIdInput, setOrderIdInput] = useState(urlOrderId);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrderStatus = useCallback(async (id: string) => {
    if (!id.trim()) return;
    setIsLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/order/track?orderId=${id.trim()}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Order not found. Please check your Order ID and try again.");
      }

      setOrder(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Order not found. Please check your Order ID and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (urlOrderId) {
      Promise.resolve().then(() => {
        fetchOrderStatus(urlOrderId);
      });
    }
  }, [urlOrderId, fetchOrderStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    
    // Update the URL query params without reloading page
    router.replace(`/track-order?orderId=${orderIdInput.trim()}`);
    fetchOrderStatus(orderIdInput);
  };

  // Convert DB statuses to timeline steps
  // Timeline Stages: Order Received -> Payment Confirmed -> Printing -> Packed -> Shipped -> Delivered
  const getTimelineStatus = (status: string, paymentStatus: string) => {
    const stages = [
      "Order Received",
      "Payment Confirmed",
      "Printing",
      "Packed",
      "Shipped",
      "Delivered",
    ];

    let currentStage = "Order Received";
    const upperStatus = (status || "").toUpperCase();
    const upperPay = (paymentStatus || "").toUpperCase();

    if (upperStatus === "DELIVERED") {
      currentStage = "Delivered";
    } else if (upperStatus === "SHIPPED") {
      currentStage = "Shipped";
    } else if (upperStatus === "PACKED") {
      currentStage = "Packed";
    } else if (upperStatus === "PRINTING" || upperStatus === "QUALITY_CHECK" || upperStatus === "PROCESSING") {
      currentStage = "Printing";
    } else if (upperPay === "PAID" || upperStatus === "PAID" || upperStatus === "PAYMENT_CONFIRMED") {
      currentStage = "Payment Confirmed";
    } else {
      currentStage = "Order Received";
    }

    return {
      currentStage,
      isDone: (stage: string) => {
        const currentIdx = stages.indexOf(currentStage);
        const stageIdx = stages.indexOf(stage);
        if (currentStage === "None") return false;
        return stageIdx <= currentIdx;
      },
      isActive: (stage: string) => {
        return currentStage === stage;
      },
      progressWidth: () => {
        if (currentStage === "Order Received") return "0%";
        if (currentStage === "Payment Confirmed") return "20%";
        if (currentStage === "Printing") return "40%";
        if (currentStage === "Packed") return "60%";
        if (currentStage === "Shipped") return "80%";
        if (currentStage === "Delivered") return "100%";
        return "0%";
      },
    };
  };

  const timeline = order ? getTimelineStatus(order.orderStatus, order.paymentStatus) : null;

  return (
    <div className={styles.container}>
      {/* Success Checkout Alert Banner */}
      {isSuccess && urlOrderId && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>Your PVC Order has been received.</h2>
          <p className={styles.successText}>
            Thank you for ordering with Unique Computer Centre. Your PVC order is being processed.
          </p>
          <div className={styles.highlightId}>
            Order / Tracking ID: {urlOrderId}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-light)", marginTop: "0.5rem", fontWeight: 600 }}>
            Please write down or save this Order ID to check your card status anytime.
          </p>
        </div>
      )}

      {/* Order Search Input Box */}
      <div className={styles.searchCard}>
        <h2 className={styles.searchTitle}>Track Your PVC Card</h2>
        <p className={styles.searchSubtitle}>Enter your Order ID to check your latest order status.</p>
        
        <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
          <input
            type="text"
            placeholder="UCCPVC10001"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className={styles.input}
            required
            disabled={isLoading}
          />
          <button type="submit" className={styles.searchBtn} disabled={isLoading}>
            {isLoading ? "Searching..." : "Track Order"}
          </button>
        </form>
      </div>

      {/* Search Error Alert */}
      {error && <div className={styles.errorAlert}>{error}</div>}

      {/* Order Status Display Section */}
      {order && timeline && (
        <div className={styles.detailsCard}>
          {/* Latest Status Banner */}
          <div style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1))",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}>
            <div>
              <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, color: "var(--primary)" }}>Current Status</span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0.25rem 0 0 0", color: "var(--text-main)" }}>
                Your latest status is: <span style={{ color: "var(--primary)" }}>{timeline.currentStage}</span>
              </h3>
            </div>
            <span className={`${styles.statusBadge} ${styles[order.orderStatus.toLowerCase().replace(" ", "_")] || styles.processing}`}>
              {order.orderStatus}
            </span>
          </div>

          <div className={styles.detailsHeader}>
            <div className={styles.orderMeta}>
              <h3>Order details for {order.id}</h3>
              <p>Product: <strong>{order.productName}</strong></p>
              <p>Customer Name: <strong>{order.customerName}</strong></p>
              <p>Amount: <strong>₹{order.amount.toFixed(2)}</strong> ({order.paymentStatus})</p>
              <p>Last Updated: {new Date(order.updatedAt).toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Core Timeline Progress Component */}
          {order.orderStatus !== "CANCELLED" && order.orderStatus !== "REFUNDED" && order.orderStatus !== "Failed Payment" ? (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Live Order Status Timeline</h4>
              
              <div className={styles.timeline}>
                {/* Horizontal line representation */}
                <div 
                  className={styles.timelineProgress} 
                  style={{ width: timeline.progressWidth() }}
                ></div>

                {/* 6 Steps */}
                <div className={`${styles.timelineStep} ${timeline.isDone("Order Received") ? styles.stepDone : ""} ${timeline.isActive("Order Received") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Order Received</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Payment Confirmed") ? styles.stepDone : ""} ${timeline.isActive("Payment Confirmed") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Payment Confirmed</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Printing") ? styles.stepDone : ""} ${timeline.isActive("Printing") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Printing</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Packed") ? styles.stepDone : ""} ${timeline.isActive("Packed") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Packed</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Shipped") ? styles.stepDone : ""} ${timeline.isActive("Shipped") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Shipped</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Delivered") ? styles.stepDone : ""} ${timeline.isActive("Delivered") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Delivered</span>
                </div>
              </div>

              {/* Status Update History Log */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                  <h4 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "1rem", color: "var(--text-main)" }}>
                    Status History Log
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {order.statusHistory.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        background: "var(--card-bg-subtle, rgba(255,255,255,0.03))",
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        fontSize: "0.9rem"
                      }}>
                        <div>
                          <strong style={{ color: "var(--text-main)", display: "block" }}>{item.status.replace("_", " ")}</strong>
                          {item.note && <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{item.note}</span>}
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-light)", whiteSpace: "nowrap" }}>
                          {new Date(item.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.errorAlert} style={{ background: "rgba(239, 68, 68, 0.05)", color: "var(--danger)", border: "none" }}>
              This order has been cancelled, failed payment, or was refunded. Please contact customer support.
            </div>
          )}

          {/* Dispatch Shipping Tracking Number details */}
          {order.courierName && order.trackingNumber && (
            <div className={styles.dispatchBox}>
              <h4>Shipping Details</h4>
              <div className={styles.dispatchInfo}>
                <div>
                  <span className={styles.dispatchLabel}>Courier Partner:</span>
                  <p className={styles.dispatchValue}>{order.courierName}</p>
                </div>
                <div>
                  <span className={styles.dispatchLabel}>Tracking Number:</span>
                  <p className={styles.dispatchValue}>{order.trackingNumber}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                You can track your package transit history on the{" "}
                {order.courierName.toLowerCase().includes("post") ? (
                  <a
                    href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trackLink}
                  >
                    India Post Tracking Portal
                  </a>
                ) : (
                  <strong>courier partner portal</strong>
                )}
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrder() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className={styles.wrapper}>
        <Suspense fallback={<div className={styles.container}><p style={{ textAlign: "center" }}>Loading tracking dashboard...</p></div>}>
          <TrackingContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
