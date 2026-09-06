"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./track.module.css";

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
  updatedAt: string;
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
        throw new Error(data.error || "Order not found.");
      }

      setOrder(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch order status. Please verify the ID.");
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
  // Timeline Stages: Order Received -> Processing -> Shipped -> Delivered
  const getTimelineStatus = (status: string) => {
    const stages = ["Order Received", "Processing", "Shipped", "Delivered"];
    const statusMap: Record<string, string> = {
      PENDING_PAYMENT: "None",
      "Failed Payment": "None",
      PENDING: "Order Received",
      PAID: "Order Received",
      ORDER_RECEIVED: "Order Received",
      "Order Received": "Order Received",
      PROCESSING: "Processing",
      PRINTING: "Processing",
      QUALITY_CHECK: "Processing",
      PACKED: "Processing",
      SHIPPED: "Shipped",
      DELIVERED: "Delivered",
      CANCELLED: "None",
      REFUNDED: "None",
    };

    const currentStage = statusMap[status] || "Order Received";
    
    return {
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
        if (currentStage === "None") return "0%";
        if (currentStage === "Order Received") return "0%";
        if (currentStage === "Processing") return "33.3%";
        if (currentStage === "Shipped") return "66.6%";
        if (currentStage === "Delivered") return "100%";
        return "0%";
      }
    };
  };

  const timeline = order ? getTimelineStatus(order.orderStatus) : null;

  return (
    <div className={styles.container}>
      {/* Success Checkout Alert Banner */}
      {isSuccess && urlOrderId && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>Order Placed Successfully!</h2>
          <p className={styles.successText}>
            Thank you for ordering with Unique Computer Centre. Your payment is verified, and we have received your documents securely.
          </p>
          <div className={styles.highlightId}>
            Order ID: {urlOrderId}
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.5rem" }}>
            Please write down or screenshot this ID to track your card delivery status.
          </p>
        </div>
      )}

      {/* Order Search Input Box */}
      <div className={styles.searchCard}>
        <h2 className={styles.searchTitle}>Track Your PVC Card</h2>
        <p className={styles.searchSubtitle}>Enter your unique Order ID to view printing and dispatch updates.</p>
        
        <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
          <input
            type="text"
            placeholder="e.g. UCCPVC10001"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className={styles.input}
            required
            disabled={isLoading}
          />
          <button type="submit" className={styles.searchBtn} disabled={isLoading}>
            {isLoading ? "Searching..." : "Track Status"}
          </button>
        </form>
      </div>

      {/* Search Error Alert */}
      {error && <div className={styles.errorAlert}>{error}</div>}

      {/* Order Status Display Section */}
      {order && timeline && (
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <div className={styles.orderMeta}>
              <h3>Order details for {order.id}</h3>
              <p>Product: <strong>{order.productName}</strong></p>
              <p>Amount Paid: <strong>₹{order.amount.toFixed(2)}</strong></p>
              <p>Last Update: {new Date(order.updatedAt).toLocaleString("en-IN")}</p>
            </div>
            <span className={`${styles.statusBadge} ${styles[order.orderStatus.toLowerCase().replace(" ", "_")] || styles.processing}`}>
              {order.orderStatus}
            </span>
          </div>

          {/* Core Timeline Progress Component */}
          {order.orderStatus !== "CANCELLED" && order.orderStatus !== "REFUNDED" && order.orderStatus !== "Failed Payment" ? (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Delivery Timeline</h4>
              
              <div className={styles.timeline}>
                {/* Horizontal line representation */}
                <div 
                  className={styles.timelineProgress} 
                  style={{ width: timeline.progressWidth() }}
                ></div>

                {/* Steps */}
                <div className={`${styles.timelineStep} ${timeline.isDone("Order Received") ? styles.stepDone : ""} ${timeline.isActive("Order Received") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Order Received</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Processing") ? styles.stepDone : ""} ${timeline.isActive("Processing") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Printing &amp; Packing</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Shipped") ? styles.stepDone : ""} ${timeline.isActive("Shipped") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Dispatched</span>
                </div>

                <div className={`${styles.timelineStep} ${timeline.isDone("Delivered") ? styles.stepDone : ""} ${timeline.isActive("Delivered") ? styles.stepActive : ""}`}>
                  <div className={styles.timelineCircle}></div>
                  <span className={styles.timelineLabel}>Delivered</span>
                </div>
              </div>
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
