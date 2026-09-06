"use client";

import { useState } from "react";
import styles from "./admin.module.css";

interface Order {
  id: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  deliveryAddress: string;
  villageTown: string;
  district: string;
  state: string;
  pinCode: string;
  documentPath: string;
  amount: number;
  paymentStatus: string;
  orderStatus: string;
  courierName: string | null;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  product: {
    name: string;
  };
}

interface DashboardManagerProps {
  orders: Order[];
  totalCount: number;
  pendingCount: number;
  paidCount: number;
  deliveredCount: number;
  totalRevenue: number;
}

export default function DashboardManager({
  orders: initialOrders,
  totalCount,
  pendingCount,
  paidCount,
  deliveredCount,
  totalRevenue,
}: DashboardManagerProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Edit Form Fields State
  const [editStatus, setEditStatus] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");
  const [editCourier, setEditCourier] = useState("");
  const [editTracking, setEditTracking] = useState("");
  const [editNotes, setEditNotes] = useState("");
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus);
    setEditPaymentStatus(order.paymentStatus);
    setEditCourier(order.courierName || "");
    setEditTracking(order.trackingNumber || "");
    setEditNotes(order.notes || "");
    setErrorMsg("");
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    setIsUpdating(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          orderStatus: editStatus,
          paymentStatus: editPaymentStatus,
          courierName: editStatus === "SHIPPED" || editCourier ? editCourier : null,
          trackingNumber: editStatus === "SHIPPED" || editTracking ? editTracking : null,
          notes: editNotes || null,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update local state
        setOrders((prev) =>
          prev.map((o) =>
            o.id === selectedOrder.id
              ? {
                  ...o,
                  orderStatus: editStatus,
                  paymentStatus: editPaymentStatus,
                  courierName: editCourier || null,
                  trackingNumber: editTracking || null,
                  notes: editNotes || null,
                }
              : o
          )
        );
        setSelectedOrder(null);
      } else {
        setErrorMsg(data.error || "Failed to update order details.");
      }
    } catch {
      setErrorMsg("Failed to update. Check server connections.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Unique Centre</h2>
          <p>Operator Panel</p>
        </div>

        <nav>
          <ul className={styles.sidebarMenu}>
            <li className={styles.menuActive}>
              <a href="#dashboard">📊 Dashboard</a>
            </li>
            <li>
              <a href="#orders">💳 Manage Orders</a>
            </li>
            <li>
              <a href="#products">📦 PVC Products</a>
            </li>
            <li>
              <a href="#services">📁 CSC Services</a>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                🚪 Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Dashboard Panel */}
      <main className={styles.contentPanel}>
        <div className={styles.panelHeader}>
          <h1 className={styles.panelTitle}>Operations Summary</h1>
        </div>

        {/* Dashboard Metric summary widgets */}
        <section className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total Orders</span>
            <span className={styles.metricVal}>{totalCount}</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Paid (Active)</span>
            <span className={styles.metricVal} style={{ color: "var(--primary)" }}>{paidCount}</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Unpaid Orders</span>
            <span className={styles.metricVal} style={{ color: "var(--warning)" }}>{pendingCount}</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Delivered</span>
            <span className={styles.metricVal} style={{ color: "var(--accent)" }}>{deliveredCount}</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Net Revenue</span>
            <span className={styles.metricVal}>₹{totalRevenue.toFixed(2)}</span>
          </div>
        </section>

        {/* Recent Orders Table */}
        <section>
          <h2 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text-main)", marginBottom: "1.5rem" }}>
            Recent Orders List
          </h2>

          <div className={styles.tableContainer}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Order Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <tr key={o.id}>
                      <td className={styles.rowLink} style={{ cursor: "pointer" }} onClick={() => openOrderModal(o)}>
                        {o.id}
                      </td>
                      <td>{o.customerName}</td>
                      <td>{o.product.name}</td>
                      <td>₹{o.amount.toFixed(2)}</td>
                      <td>
                        <span style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: o.paymentStatus === "PAID" ? "var(--accent)" : "var(--warning)"
                        }}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: o.orderStatus === "Delivered" ? "var(--accent)" : "var(--primary)"
                        }}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                      <td>
                        <button
                          onClick={() => openOrderModal(o)}
                          className={styles.backBtn}
                          style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "3rem" }}>
                      No PVC orders registered in the system database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Details & Status Editor Overlay Modal */}
      {selectedOrder && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Edit Order {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className={styles.modalCloseBtn}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {errorMsg && (
                <div className={styles.errorAlert} style={{ padding: "0.75rem" }}>{errorMsg}</div>
              )}

              {/* Secure Document Download Link */}
              <div>
                <span className={styles.metricLabel}>Sensitive Attachment:</span>
                <a
                  href={`/api/admin/documents/${selectedOrder.documentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.docLink}
                  style={{ marginTop: "0.5rem" }}
                >
                  📄 View Uploaded Document
                </a>
              </div>

              {/* Customer Details Block */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <span className={styles.metricLabel}>Customer Name</span>
                  <p style={{ fontWeight: 700, color: "var(--text-main)" }}>{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className={styles.metricLabel}>Contact Mobile</span>
                  <p style={{ fontWeight: 700, color: "var(--text-main)" }}>{selectedOrder.customerMobile}</p>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <span className={styles.metricLabel}>Delivery Location Address</span>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {selectedOrder.deliveryAddress}, {selectedOrder.villageTown}, {selectedOrder.district}, {selectedOrder.state} - {selectedOrder.pinCode}
                  </p>
                </div>
              </div>

              {/* Edit Status Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className={styles.metricLabel}>Payment Status</label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className={styles.metricLabel}>Order Delivery Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="PENDING_PAYMENT">Pending Payment</option>
                    <option value="Order Received">Order Received</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="PRINTING">Printing</option>
                    <option value="QUALITY_CHECK">Quality Check</option>
                    <option value="PACKED">Packed</option>
                    <option value="SHIPPED">Shipped (Dispatched)</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Shipped tracking options */}
              {editStatus === "SHIPPED" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", animation: "slideDown 0.2s" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <label className={styles.metricLabel}>Courier Partner</label>
                    <input
                      type="text"
                      value={editCourier}
                      onChange={(e) => setEditCourier(e.target.value)}
                      className={styles.statusSelect}
                      placeholder="e.g. India Post"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <label className={styles.metricLabel}>Tracking Number / Consignment ID</label>
                    <input
                      type="text"
                      value={editTracking}
                      onChange={(e) => setEditTracking(e.target.value)}
                      className={styles.statusSelect}
                      placeholder="e.g. RU123456789IN"
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label className={styles.metricLabel}>Internal Operator Notes</label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className={styles.statusSelect}
                  placeholder="e.g., printed on premium glossy, shipped via Speed Post"
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={() => setSelectedOrder(null)}
                className={styles.backBtn}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
                className={styles.loginBtn}
                style={{ width: "auto" }}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Status Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
