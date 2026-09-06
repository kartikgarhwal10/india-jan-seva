"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../partner.module.css";

interface PartnerOrder {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

export default function PartnerDashboard() {
  const router = useRouter();
  
  // Partner Profile State
  const [partnerId, setPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerShop, setPartnerShop] = useState("");
  
  const [orders, setOrders] = useState<PartnerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Read local storage profile details
    const storedId = localStorage.getItem("ucc_partner_id");
    const storedName = localStorage.getItem("ucc_partner_name");
    const storedShop = localStorage.getItem("ucc_partner_shop");

    if (!storedId) {
      router.push("/partner/login");
      return;
    }

    setPartnerId(storedId);
    setPartnerName(storedName || "Agent");
    setPartnerShop(storedShop || "Reseller Shop");

    // Fetch orders placed by this partner agent
    const fetchPartnerOrders = async () => {
      try {
        const res = await fetch(`/api/partner/orders?partnerId=${storedId}`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          setError(data.error || "Failed to load orders.");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Could not query orders.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerOrders();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ucc_partner_id");
    localStorage.removeItem("ucc_partner_name");
    localStorage.removeItem("ucc_partner_shop");
    router.push("/partner/login");
  };

  if (!partnerId) {
    return <div style={{ textAlign: "center", padding: "5rem" }}>Verifying agent session...</div>;
  }

  // Dashboard Stats Calculations
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter((o) => o.orderStatus !== "Delivered" && o.orderStatus !== "CANCELLED" && o.paymentStatus === "PAID").length;
  const completedOrdersCount = orders.filter((o) => o.orderStatus === "Delivered").length;
  const totalSpend = orders.reduce((sum, o) => o.paymentStatus === "PAID" ? sum + o.amount : sum, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        <section className={styles.container}>
          
          <div className={styles.dashboardGrid}>
            {/* Main Center Panel */}
            <div className={styles.mainPanel}>
              
              {/* Reseller CTA banner */}
              <div className={styles.resellerCallout}>
                <div className={styles.resellerInfo}>
                  <h2>Place Card Order</h2>
                  <p>Agent Reseller discount of <strong>₹80 per card</strong> is active for your account.</p>
                </div>
                <Link href="/order" className={styles.placeOrderBtn}>
                  + New Order (₹80)
                </Link>
              </div>

              {/* Statistics Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "1rem",
                marginTop: "1rem"
              }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Total Placed</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.25rem" }}>{totalOrdersCount}</span>
                </div>
                
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Active Prints</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>{activeOrdersCount}</span>
                </div>

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Delivered</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--accent)", marginTop: "0.25rem" }}>{completedOrdersCount}</span>
                </div>

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Net Spend</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.25rem" }}>₹{totalSpend.toFixed(0)}</span>
                </div>
              </div>

              {/* Placed Orders List Table */}
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "1rem" }}>Agent Order Logs</h3>
                
                {error && <div className={styles.errorAlert} style={{ marginBottom: "1rem" }}>{error}</div>}

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ backgroundColor: "var(--surface-alt)", borderBottom: "2px solid var(--border)" }}>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Order ID</th>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Customer Name</th>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Product Type</th>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Amount Paid</th>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Payment</th>
                        <th style={{ padding: "1rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-light)" }}>
                            Querying reseller transactions...
                          </td>
                        </tr>
                      ) : orders.length > 0 ? (
                        orders.map((o) => (
                          <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "1rem", fontWeight: 700, color: "var(--primary)" }}>
                              <Link href={`/track-order?orderId=${o.id}`} style={{ textDecoration: "underline" }}>
                                {o.id}
                              </Link>
                            </td>
                            <td style={{ padding: "1rem" }}>{o.customerName}</td>
                            <td style={{ padding: "1rem" }}>{o.productName}</td>
                            <td style={{ padding: "1rem", fontWeight: 600 }}>₹{o.amount.toFixed(2)}</td>
                            <td style={{ padding: "1rem" }}>
                              <span style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: o.paymentStatus === "PAID" ? "var(--accent)" : "var(--warning)"
                              }}>
                                {o.paymentStatus}
                              </span>
                            </td>
                            <td style={{ padding: "1rem" }}>
                              <span style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: o.orderStatus === "Delivered" ? "var(--accent)" : "var(--primary)"
                              }}>
                                {o.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                            You have not placed any orders yet. Click &quot;New Order&quot; above to place your first reseller order!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Sidebar Profile details Card */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.partnerName}>{partnerShop}</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.95rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Agent Owner</span>
                  <p style={{ fontWeight: 600, color: "var(--text-main)" }}>{partnerName}</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Partner ID</span>
                  <p style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--text-muted)" }}>{partnerId}</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase" }}>Card Cost Rate</span>
                  <p style={{ fontWeight: 700, color: "var(--accent)" }}>₹80.00 / print (Flat)</p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                <button onClick={handleLogout} className={styles.logoutLink}>
                  Sign Out of Portal
                </button>
              </div>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
