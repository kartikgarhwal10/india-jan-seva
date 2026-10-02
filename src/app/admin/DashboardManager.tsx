"use client";

import { useState, useMemo } from "react";
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
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  courierName: string | null;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  product: {
    name: string;
    price?: number;
  };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  image: string;
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DashboardManagerProps {
  orders: Order[];
  totalCount: number;
  newCount: number;
  pendingCount: number;
  paidCount: number;
  printingCount: number;
  packedCount: number;
  shippedCount: number;
  deliveredCount: number;
  totalRevenue: number;
  initialBlogs?: BlogPost[];
  totalBlogs?: number;
  publishedBlogs?: number;
  draftBlogs?: number;
}

const ITEMS_PER_PAGE = 15;

export default function DashboardManager({
  orders: initialOrders,
  totalCount,
  newCount,
  pendingCount,
  paidCount,
  printingCount,
  packedCount,
  shippedCount,
  deliveredCount,
  totalRevenue,
  initialBlogs = [],
}: DashboardManagerProps) {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "blogs">("overview");

  // Orders State
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [orderPaymentFilter, setOrderPaymentFilter] = useState("ALL");
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);

  // Edit Order Fields State
  const [editStatus, setEditStatus] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");
  const [editCourier, setEditCourier] = useState("");
  const [editTracking, setEditTracking] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [orderErrorMsg, setOrderErrorMsg] = useState("");
  const [orderSuccessMsg, setOrderSuccessMsg] = useState("");

  // Blogs State
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogStatusFilter, setBlogStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [blogCurrentPage, setBlogCurrentPage] = useState(1);

  // Blog Editor Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("CSC Services");
  const [blogAuthor, setBlogAuthor] = useState("Unique CSC Point");
  const [blogImage, setBlogImage] = useState("/images/pvc-banner.jpg");
  const [blogSeoTitle, setBlogSeoTitle] = useState("");
  const [blogSeoDescription, setBlogSeoDescription] = useState("");
  const [blogSeoKeywords, setBlogSeoKeywords] = useState("");
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [blogErrorMsg, setBlogErrorMsg] = useState("");
  const [blogSuccessMsg, setBlogSuccessMsg] = useState("");

  // Blog Delete Confirmation Modal
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);
  const [isDeletingBlog, setIsDeletingBlog] = useState(false);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // -------------------------------------------------------------
  // ORDER ACTIONS & FILTERS
  // -------------------------------------------------------------
  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus);
    setEditPaymentStatus(order.paymentStatus);
    setEditCourier(order.courierName || "");
    setEditTracking(order.trackingNumber || "");
    setEditNotes(order.notes || "");
    setOrderErrorMsg("");
    setOrderSuccessMsg("");
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    setIsUpdatingOrder(true);
    setOrderErrorMsg("");
    setOrderSuccessMsg("");

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
        setOrderSuccessMsg("Order status updated successfully!");
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
                  updatedAt: data.updatedAt || new Date().toISOString(),
                }
              : o
          )
        );
        setSelectedOrder((prev) =>
          prev
            ? {
                ...prev,
                orderStatus: editStatus,
                paymentStatus: editPaymentStatus,
                courierName: editCourier || null,
                trackingNumber: editTracking || null,
                notes: editNotes || null,
                updatedAt: data.updatedAt || new Date().toISOString(),
              }
            : null
        );
      } else {
        setOrderErrorMsg(data.error || "Failed to update order status.");
      }
    } catch {
      setOrderErrorMsg("Failed to update order. Network error.");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const query = orderSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        o.id.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query) ||
        o.customerMobile.includes(query);

      let matchesStatus = true;
      if (orderStatusFilter !== "ALL") {
        const oStatus = (o.orderStatus || "").toUpperCase();
        if (orderStatusFilter === "ORDER_RECEIVED") {
          matchesStatus = oStatus === "ORDER_RECEIVED" || oStatus === "ORDER RECEIVED" || oStatus === "PENDING_PAYMENT";
        } else if (orderStatusFilter === "PAYMENT_CONFIRMED") {
          matchesStatus = oStatus === "PAYMENT_CONFIRMED" || (o.paymentStatus === "PAID" && oStatus !== "DELIVERED" && oStatus !== "SHIPPED");
        } else {
          matchesStatus = oStatus === orderStatusFilter.toUpperCase();
        }
      }

      let matchesPayment = true;
      if (orderPaymentFilter !== "ALL") {
        matchesPayment = (o.paymentStatus || "").toUpperCase() === orderPaymentFilter.toUpperCase();
      }

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, orderSearchQuery, orderStatusFilter, orderPaymentFilter]);

  const totalOrderPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (orderCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, orderCurrentPage]);

  // -------------------------------------------------------------
  // BLOG ACTIONS & FILTERS
  // -------------------------------------------------------------
  const openCreateBlogModal = () => {
    setEditingBlog(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("CSC Services");
    setBlogAuthor("Unique CSC Point");
    setBlogImage("/images/pvc-banner.jpg");
    setBlogSeoTitle("");
    setBlogSeoDescription("");
    setBlogSeoKeywords("");
    setEditorMode("edit");
    setBlogErrorMsg("");
    setBlogSuccessMsg("");
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setBlogSlug(blog.slug);
    setBlogSummary(blog.summary);
    setBlogContent(blog.content);
    setBlogCategory(blog.category);
    setBlogAuthor(blog.author);
    setBlogImage(blog.image || "/images/pvc-banner.jpg");
    setBlogSeoTitle(blog.seoTitle || "");
    setBlogSeoDescription(blog.seoDescription || "");
    setBlogSeoKeywords(blog.seoKeywords || "");
    setEditorMode("edit");
    setBlogErrorMsg("");
    setBlogSuccessMsg("");
    setIsBlogModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setBlogErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/blog/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setBlogImage(data.imageUrl);
      } else {
        setBlogErrorMsg(data.error || "Failed to upload image.");
      }
    } catch {
      setBlogErrorMsg("Image upload failed due to network error.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveBlog = async (shouldPublish: boolean) => {
    if (!blogTitle.trim()) {
      setBlogErrorMsg("Please enter a blog title.");
      return;
    }
    if (!blogContent.trim()) {
      setBlogErrorMsg("Please enter blog content.");
      return;
    }

    setIsSavingBlog(true);
    setBlogErrorMsg("");
    setBlogSuccessMsg("");

    const endpoint = editingBlog ? "/api/admin/blog/update" : "/api/admin/blog/create";
    const payload = {
      id: editingBlog?.id,
      title: blogTitle,
      slug: blogSlug,
      summary: blogSummary,
      content: blogContent,
      category: blogCategory,
      author: blogAuthor,
      image: blogImage,
      published: shouldPublish,
      seoTitle: blogSeoTitle,
      seoDescription: blogSeoDescription,
      seoKeywords: blogSeoKeywords,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success && data.post) {
        const savedPost: BlogPost = {
          ...data.post,
          createdAt: data.post.createdAt || new Date().toISOString(),
          updatedAt: data.post.updatedAt || new Date().toISOString(),
        };

        if (editingBlog) {
          setBlogs((prev) => prev.map((b) => (b.id === savedPost.id ? savedPost : b)));
        } else {
          setBlogs((prev) => [savedPost, ...prev]);
        }

        setBlogSuccessMsg(data.message || "Blog post saved successfully!");
        setTimeout(() => {
          setIsBlogModalOpen(false);
        }, 1200);
      } else {
        setBlogErrorMsg(data.error || "Failed to save blog post.");
      }
    } catch {
      setBlogErrorMsg("Failed to save blog post. Network error.");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const res = await fetch("/api/admin/blog/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          published: !blog.published,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.post) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, published: data.post.published } : b))
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeleteBlogConfirm = async () => {
    if (!deletingBlog) return;
    setIsDeletingBlog(true);

    try {
      const res = await fetch("/api/admin/blog/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deletingBlog.id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== deletingBlog.id));
        setDeletingBlog(null);
      } else {
        alert(data.error || "Failed to delete blog post.");
      }
    } catch {
      alert("Failed to delete blog post. Network error.");
    } finally {
      setIsDeletingBlog(false);
    }
  };

  const insertMarkdown = (syntax: string, placeholder = "text") => {
    const textarea = document.getElementById("blog-content-editor") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = blogContent.substring(start, end) || placeholder;

    let replacement = "";
    if (syntax === "h2") replacement = `\n## ${selectedText}\n`;
    else if (syntax === "h3") replacement = `\n### ${selectedText}\n`;
    else if (syntax === "bold") replacement = `**${selectedText}**`;
    else if (syntax === "italic") replacement = `*${selectedText}*`;
    else if (syntax === "bullet") replacement = `\n- ${selectedText}\n`;
    else if (syntax === "number") replacement = `\n1. ${selectedText}\n`;
    else if (syntax === "quote") replacement = `\n> ${selectedText}\n`;
    else if (syntax === "link") replacement = `[${selectedText}](https://example.com)`;
    else if (syntax === "table") replacement = `\n| Title | Description |\n| --- | --- |\n| Item 1 | Value 1 |\n`;

    const newContent = blogContent.substring(0, start) + replacement + blogContent.substring(end);
    setBlogContent(newContent);
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const query = blogSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        b.title.toLowerCase().includes(query) ||
        b.slug.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query);

      let matchesStatus = true;
      if (blogStatusFilter === "PUBLISHED") matchesStatus = b.published === true;
      if (blogStatusFilter === "DRAFT") matchesStatus = b.published === false;

      return matchesSearch && matchesStatus;
    });
  }, [blogs, blogSearchQuery, blogStatusFilter]);

  const totalBlogPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (blogCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, blogCurrentPage]);

  // Derived counts
  const publishedBlogsCount = useMemo(() => blogs.filter((b) => b.published).length, [blogs]);
  const draftBlogsCount = useMemo(() => blogs.filter((b) => !b.published).length, [blogs]);

  // Status badge styling helper
  const getStatusBadgeStyle = (status: string) => {
    const upper = (status || "").toUpperCase();
    if (upper === "DELIVERED") return { bg: "#dcfce7", color: "#166534" };
    if (upper === "SHIPPED") return { bg: "#e0f2fe", color: "#075985" };
    if (upper === "PACKED") return { bg: "#fef3c7", color: "#92400e" };
    if (upper === "PRINTING") return { bg: "#fae8ff", color: "#86198f" };
    if (upper === "PAYMENT_CONFIRMED" || upper === "PAID") return { bg: "#e0e7ff", color: "#3730a3" };
    return { bg: "#fee2e2", color: "#991b1b" };
  };

  const renderContentPreview = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("###")) return <h3 key={idx} style={{ marginTop: "1rem", color: "var(--text-main)" }}>{trimmed.replace("###", "").trim()}</h3>;
      if (trimmed.startsWith("##")) return <h2 key={idx} style={{ marginTop: "1.25rem", color: "var(--text-main)" }}>{trimmed.replace("##", "").trim()}</h2>;
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx} style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
            {items.map((item, subIdx) => (
              <li key={subIdx}>{item}</li>
            ))}
          </ul>
        );
      }
      return <p key={idx} style={{ margin: "0.5rem 0", lineHeight: "1.6" }}>{trimmed}</p>;
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>UNIQUE CSC POINT</h2>
          <p>Admin Dashboard</p>
        </div>

        <nav>
          <ul className={styles.sidebarMenu}>
            <li className={activeTab === "overview" ? styles.menuActive : styles.menuItem}>
              <button onClick={() => setActiveTab("overview")} className={styles.logoutBtn} style={{ color: activeTab === "overview" ? "#ffffff" : undefined }}>
                📊 Overview
              </button>
            </li>
            <li className={activeTab === "orders" ? styles.menuActive : styles.menuItem}>
              <button onClick={() => setActiveTab("orders")} className={styles.logoutBtn} style={{ color: activeTab === "orders" ? "#ffffff" : undefined }}>
                📦 PVC Orders ({totalCount})
              </button>
            </li>
            <li className={activeTab === "blogs" ? styles.menuActive : styles.menuItem}>
              <button onClick={() => setActiveTab("blogs")} className={styles.logoutBtn} style={{ color: activeTab === "blogs" ? "#ffffff" : undefined }}>
                📰 Blog CMS ({blogs.length})
              </button>
            </li>
            <li style={{ marginTop: "2rem" }}>
              <button onClick={handleLogout} className={styles.logoutBtn} style={{ color: "#ef4444" }}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Dashboard Panel */}
      <main className={styles.contentPanel}>
        <div className={styles.panelHeader}>
          <div>
            <h1 className={styles.panelTitle}>
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "orders" && "PVC Orders Management"}
              {activeTab === "blogs" && "Blog CMS Management"}
            </h1>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              {activeTab === "overview" && "Live view of PVC card production stats, revenue, and website content."}
              {activeTab === "orders" && "Monitor customer PVC card requests, update production status, and manage courier tracking."}
              {activeTab === "blogs" && "Create, edit, publish, or draft articles on Jan Seva & digital services."}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {activeTab === "blogs" && (
              <button onClick={openCreateBlogModal} className={styles.saveBtn}>
                + Create New Blog
              </button>
            )}
            <button onClick={handleLogout} className={styles.logoutTopBtn}>
              Logout
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-main)" }}>
              PVC Card Production Metrics
            </h2>
            <section className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Orders</span>
                <span className={styles.metricVal}>{totalCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>New Orders</span>
                <span className={styles.metricVal} style={{ color: "#e11d48" }}>{newCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Payment Pending</span>
                <span className={styles.metricVal} style={{ color: "#d97706" }}>{pendingCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Payment Confirmed</span>
                <span className={styles.metricVal} style={{ color: "#2563eb" }}>{paidCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Printing</span>
                <span className={styles.metricVal} style={{ color: "#9333ea" }}>{printingCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Packed</span>
                <span className={styles.metricVal} style={{ color: "#0284c7" }}>{packedCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Shipped</span>
                <span className={styles.metricVal} style={{ color: "#0d9488" }}>{shippedCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Delivered</span>
                <span className={styles.metricVal} style={{ color: "#16a34a" }}>{deliveredCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Net Revenue</span>
                <span className={styles.metricVal}>₹{totalRevenue.toFixed(2)}</span>
              </div>
            </section>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", marginTop: "2.5rem", color: "var(--text-main)" }}>
              Blog CMS Metrics
            </h2>
            <section className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Blogs</span>
                <span className={styles.metricVal}>{blogs.length}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Published Blogs</span>
                <span className={styles.metricVal} style={{ color: "#16a34a" }}>{publishedBlogsCount}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Draft Blogs</span>
                <span className={styles.metricVal} style={{ color: "#d97706" }}>{draftBlogsCount}</span>
              </div>
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              <div className={styles.infoSection}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 className={styles.sectionHeading}>Recent PVC Orders</h3>
                  <button onClick={() => setActiveTab("orders")} className={styles.viewBtn}>View All ({totalCount})</button>
                </div>
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <strong style={{ color: "var(--primary)" }}>{o.id}</strong> — {o.customerName}
                      <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{o.product?.name || "PVC Card"} • ₹{o.amount}</p>
                    </div>
                    <span className={styles.statusPill} style={getStatusBadgeStyle(o.orderStatus)}>{o.orderStatus}</span>
                  </div>
                ))}
              </div>

              <div className={styles.infoSection}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 className={styles.sectionHeading}>Recent Blog Posts</h3>
                  <button onClick={() => setActiveTab("blogs")} className={styles.viewBtn}>View All ({blogs.length})</button>
                </div>
                {blogs.slice(0, 5).map((b) => (
                  <div key={b.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <strong style={{ color: "var(--text-main)" }}>{b.title}</strong>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{b.category} • {b.publishedDate}</p>
                    </div>
                    <span className={styles.statusPill} style={{ backgroundColor: b.published ? "#dcfce7" : "#fef3c7", color: b.published ? "#166534" : "#92400e" }}>
                      {b.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div>
            <section className={styles.filterSection}>
              <div className={styles.filterGroup}>
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, Phone..."
                  value={orderSearchQuery}
                  onChange={(e) => {
                    setOrderSearchQuery(e.target.value);
                    setOrderCurrentPage(1);
                  }}
                  className={styles.searchInput}
                />

                <select
                  value={orderStatusFilter}
                  onChange={(e) => {
                    setOrderStatusFilter(e.target.value);
                    setOrderCurrentPage(1);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="ALL">All Order Statuses</option>
                  <option value="ORDER_RECEIVED">Order Received / New</option>
                  <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
                  <option value="PRINTING">Printing</option>
                  <option value="PACKED">Packed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>

                <select
                  value={orderPaymentFilter}
                  onChange={(e) => {
                    setOrderPaymentFilter(e.target.value);
                    setOrderCurrentPage(1);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="ALL">All Payment Statuses</option>
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>

                {(orderSearchQuery || orderStatusFilter !== "ALL" || orderPaymentFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setOrderSearchQuery("");
                      setOrderStatusFilter("ALL");
                      setOrderPaymentFilter("ALL");
                      setOrderCurrentPage(1);
                    }}
                    className={styles.clearFilterBtn}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </section>

            <section>
              <div className={styles.tableHeaderRow}>
                <h2 className={styles.tableTitle}>PVC Order Records</h2>
                <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
                  Showing {filteredOrders.length > 0 ? (orderCurrentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
                  {Math.min(orderCurrentPage * ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
                </span>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.adminTable}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>PVC Product</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Order Status</th>
                      <th>Order Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((o) => {
                        const badge = getStatusBadgeStyle(o.orderStatus);
                        const isNew =
                          (o.orderStatus || "").toUpperCase() === "ORDER_RECEIVED" ||
                          (o.orderStatus || "").toUpperCase() === "ORDER RECEIVED" ||
                          (o.orderStatus || "").toUpperCase() === "PENDING_PAYMENT";

                        return (
                          <tr key={o.id}>
                            <td className={styles.rowLink} onClick={() => openOrderModal(o)}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <span>{o.id}</span>
                                {isNew && <span className={styles.newBadge}>NEW</span>}
                              </div>
                            </td>
                            <td style={{ fontWeight: 600, color: "var(--text-main)" }}>{o.customerName}</td>
                            <td>{o.customerMobile}</td>
                            <td>{o.product?.name || "PVC Card"}</td>
                            <td style={{ fontWeight: 700 }}>₹{o.amount.toFixed(2)}</td>
                            <td>
                              <span
                                className={styles.statusPill}
                                style={{
                                  backgroundColor: o.paymentStatus === "PAID" ? "#dcfce7" : "#fef3c7",
                                  color: o.paymentStatus === "PAID" ? "#166534" : "#92400e",
                                }}
                              >
                                {o.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className={styles.statusPill} style={{ backgroundColor: badge.bg, color: badge.color }}>
                                {o.orderStatus}
                              </span>
                            </td>
                            <td>{new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                            <td>
                              <button onClick={() => openOrderModal(o)} className={styles.viewBtn}>
                                View / Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                          No PVC orders found matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalOrderPages > 1 && (
                <div className={styles.paginationContainer}>
                  <button
                    onClick={() => setOrderCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={orderCurrentPage === 1}
                    className={styles.pageBtn}
                  >
                    ← Previous
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setOrderCurrentPage(pageNum)}
                        className={`${styles.pageNumberBtn} ${pageNum === orderCurrentPage ? styles.pageActive : ""}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setOrderCurrentPage((p) => Math.min(totalOrderPages, p + 1))}
                    disabled={orderCurrentPage === totalOrderPages}
                    className={styles.pageBtn}
                  >
                    Next →
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: BLOG MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "blogs" && (
          <div>
            <section className={styles.filterSection}>
              <div className={styles.filterGroup}>
                <input
                  type="text"
                  placeholder="Search blogs by title, slug, or category..."
                  value={blogSearchQuery}
                  onChange={(e) => {
                    setBlogSearchQuery(e.target.value);
                    setBlogCurrentPage(1);
                  }}
                  className={styles.searchInput}
                />

                <select
                  value={blogStatusFilter}
                  onChange={(e) => {
                    setBlogStatusFilter(e.target.value as "ALL" | "PUBLISHED" | "DRAFT");
                    setBlogCurrentPage(1);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="ALL">All Blog Statuses</option>
                  <option value="PUBLISHED">Published Only</option>
                  <option value="DRAFT">Drafts Only</option>
                </select>

                {(blogSearchQuery || blogStatusFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setBlogSearchQuery("");
                      setBlogStatusFilter("ALL");
                      setBlogCurrentPage(1);
                    }}
                    className={styles.clearFilterBtn}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </section>

            <section>
              <div className={styles.tableHeaderRow}>
                <h2 className={styles.tableTitle}>Blog Articles ({filteredBlogs.length})</h2>
                <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
                  Showing {filteredBlogs.length > 0 ? (blogCurrentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
                  {Math.min(blogCurrentPage * ITEMS_PER_PAGE, filteredBlogs.length)} of {filteredBlogs.length} blogs
                </span>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.adminTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Published Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBlogs.length > 0 ? (
                      paginatedBlogs.map((blog) => (
                        <tr key={blog.id}>
                          <td>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <strong style={{ color: "var(--text-main)", fontSize: "0.95rem" }}>{blog.title}</strong>
                              <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>/{blog.slug}</span>
                            </div>
                          </td>
                          <td>{blog.category}</td>
                          <td>{blog.author}</td>
                          <td>{blog.publishedDate}</td>
                          <td>
                            <span
                              className={styles.statusPill}
                              style={{
                                backgroundColor: blog.published ? "#dcfce7" : "#fef3c7",
                                color: blog.published ? "#166534" : "#92400e",
                              }}
                            >
                              {blog.published ? "PUBLISHED" : "DRAFT"}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button onClick={() => openEditBlogModal(blog)} className={styles.viewBtn}>
                                Edit
                              </button>
                              <a
                                href={blog.published ? `/blog/${blog.slug}` : "#"}
                                target={blog.published ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  if (!blog.published) {
                                    e.preventDefault();
                                    openEditBlogModal(blog);
                                    setEditorMode("preview");
                                  }
                                }}
                                className={styles.viewBtn}
                                style={{ background: "rgba(56, 189, 248, 0.1)", color: "#0284c7" }}
                              >
                                Preview
                              </a>
                              <button
                                onClick={() => handleTogglePublish(blog)}
                                className={styles.viewBtn}
                                style={{
                                  background: blog.published ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                                  color: blog.published ? "#dc2626" : "#16a34a",
                                }}
                              >
                                {blog.published ? "Unpublish" : "Publish"}
                              </button>
                              <button
                                onClick={() => setDeletingBlog(blog)}
                                className={styles.viewBtn}
                                style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                          No blog posts found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalBlogPages > 1 && (
                <div className={styles.paginationContainer}>
                  <button
                    onClick={() => setBlogCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={blogCurrentPage === 1}
                    className={styles.pageBtn}
                  >
                    ← Previous
                  </button>
                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalBlogPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setBlogCurrentPage(pageNum)}
                        className={`${styles.pageNumberBtn} ${pageNum === blogCurrentPage ? styles.pageActive : ""}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setBlogCurrentPage((p) => Math.min(totalBlogPages, p + 1))}
                    disabled={blogCurrentPage === totalBlogPages}
                    className={styles.pageBtn}
                  >
                    Next →
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* ORDER DETAILS & STATUS UPDATE MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedOrder && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Order Details: {selectedOrder.id}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                  Created on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className={styles.modalCloseBtn}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {orderErrorMsg && <div className={styles.errorAlert}>{orderErrorMsg}</div>}
              {orderSuccessMsg && <div className={styles.successAlert}>{orderSuccessMsg}</div>}

              <div className={styles.infoSection}>
                <h4 className={styles.sectionHeading}>Customer & Delivery Information</h4>
                <div className={styles.detailsGrid}>
                  <div>
                    <span className={styles.detailLabel}>Customer Name</span>
                    <p className={styles.detailVal}>{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Mobile Phone</span>
                    <p className={styles.detailVal}>{selectedOrder.customerMobile}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Email Address</span>
                    <p className={styles.detailVal}>{selectedOrder.customerEmail || "N/A"}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>PVC Product</span>
                    <p className={styles.detailVal}>{selectedOrder.product?.name || "PVC Card"}</p>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span className={styles.detailLabel}>Full Delivery Address</span>
                    <p className={styles.detailVal}>
                      {selectedOrder.deliveryAddress}, {selectedOrder.villageTown}, {selectedOrder.district},{" "}
                      {selectedOrder.state} - <strong>{selectedOrder.pinCode}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h4 className={styles.sectionHeading}>Payment Details</h4>
                <div className={styles.detailsGrid}>
                  <div>
                    <span className={styles.detailLabel}>Total Amount</span>
                    <p className={styles.detailVal} style={{ color: "#2563eb", fontWeight: 800 }}>
                      ₹{selectedOrder.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Payment Status</span>
                    <p className={styles.detailVal}>{selectedOrder.paymentStatus}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.documentPath && (
                <div className={styles.infoSection}>
                  <h4 className={styles.sectionHeading}>Attached Customer File</h4>
                  <a
                    href={`/api/admin/documents/${selectedOrder.documentPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.docLink}
                  >
                    📄 Download / View Customer Document
                  </a>
                </div>
              )}

              <div className={styles.updateBox}>
                <h4 className={styles.sectionHeading} style={{ color: "var(--primary)" }}>
                  Update Order Status & Tracking
                </h4>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Order Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="ORDER_RECEIVED">1. ORDER_RECEIVED</option>
                      <option value="PAYMENT_CONFIRMED">2. PAYMENT_CONFIRMED</option>
                      <option value="PRINTING">3. PRINTING</option>
                      <option value="PACKED">4. PACKED</option>
                      <option value="SHIPPED">5. SHIPPED</option>
                      <option value="DELIVERED">6. DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="REFUNDED">REFUNDED</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Payment Status</label>
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

                  {(editStatus === "SHIPPED" || editCourier || editTracking) && (
                    <>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Courier Partner Name</label>
                        <input
                          type="text"
                          value={editCourier}
                          onChange={(e) => setEditCourier(e.target.value)}
                          className={styles.textInput}
                          placeholder="e.g. India Post / DTDC"
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Tracking Number</label>
                        <input
                          type="text"
                          value={editTracking}
                          onChange={(e) => setEditTracking(e.target.value)}
                          className={styles.textInput}
                          placeholder="e.g. RU123456789IN"
                        />
                      </div>
                    </>
                  )}

                  <div className={styles.fieldGroup} style={{ gridColumn: "1 / -1" }}>
                    <label className={styles.fieldLabel}>Operator Notes</label>
                    <input
                      type="text"
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className={styles.textInput}
                      placeholder="Internal status update notes"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => setSelectedOrder(null)} className={styles.cancelBtn} disabled={isUpdatingOrder}>
                Close
              </button>
              <button onClick={handleUpdateOrder} className={styles.saveBtn} disabled={isUpdatingOrder}>
                {isUpdatingOrder ? "Saving..." : "Save Status Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BLOG EDITOR MODAL */}
      {/* ------------------------------------------------------------- */}
      {isBlogModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsBlogModalOpen(false)}>
          <div className={styles.modal} style={{ maxWidth: "850px" }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                  {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                  Write formatted content, add SEO metadata, and set publish or draft status.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setEditorMode(editorMode === "edit" ? "preview" : "edit")}
                  className={styles.clearFilterBtn}
                  style={{ padding: "0.4rem 0.8rem" }}
                >
                  {editorMode === "edit" ? "👁️ Preview Article" : "✏️ Back to Editor"}
                </button>
                <button onClick={() => setIsBlogModalOpen(false)} className={styles.modalCloseBtn}>
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.modalBody}>
              {blogErrorMsg && <div className={styles.errorAlert}>{blogErrorMsg}</div>}
              {blogSuccessMsg && <div className={styles.successAlert}>{blogSuccessMsg}</div>}

              {editorMode === "edit" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Blog Title *</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className={styles.textInput}
                      placeholder="e.g. How to Apply for PAN Card Online in Uttar Pradesh"
                      required
                    />
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>URL Slug</label>
                      <input
                        type="text"
                        value={blogSlug}
                        onChange={(e) => setBlogSlug(e.target.value)}
                        className={styles.textInput}
                        placeholder="Auto-generated from title"
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Category</label>
                      <input
                        type="text"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className={styles.textInput}
                        placeholder="e.g. CSC Services, PVC Cards"
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Author</label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className={styles.textInput}
                        placeholder="e.g. Unique CSC Point Team"
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Featured Image URL / Upload</label>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="text"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          className={styles.textInput}
                          placeholder="/images/pvc-banner.jpg"
                        />
                        <label
                          className={styles.viewBtn}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            padding: "0 0.85rem",
                          }}
                        >
                          {isUploadingImage ? "Uploading..." : "Upload File"}
                          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Image Preview Box */}
                  {blogImage && (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--surface-alt)", padding: "0.75rem", borderRadius: "6px" }}>
                      <img src={blogImage} alt="Featured Preview" style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                      <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>Featured image preview</span>
                    </div>
                  )}

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Short Excerpt / Summary</label>
                    <textarea
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      className={styles.textInput}
                      style={{ height: "70px" }}
                      placeholder="Brief 1-2 sentence summary of the article..."
                    />
                  </div>

                  {/* Rich Text Editor Block */}
                  <div className={styles.fieldGroup}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label className={styles.fieldLabel}>Article Content *</label>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Use formatting toolbar below</span>
                    </div>

                    {/* Toolbar buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", padding: "0.5rem", background: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: "6px 6px 0 0" }}>
                      <button type="button" onClick={() => insertMarkdown("h2", "Heading 2")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>H2</button>
                      <button type="button" onClick={() => insertMarkdown("h3", "Heading 3")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>H3</button>
                      <button type="button" onClick={() => insertMarkdown("bold", "bold text")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem", fontWeight: "bold" }}>B</button>
                      <button type="button" onClick={() => insertMarkdown("italic", "italic text")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem", fontStyle: "italic" }}>I</button>
                      <button type="button" onClick={() => insertMarkdown("bullet", "List item")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>• Bullet List</button>
                      <button type="button" onClick={() => insertMarkdown("number", "Step item")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>1. Numbered</button>
                      <button type="button" onClick={() => insertMarkdown("quote", "Quote text")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>Quote</button>
                      <button type="button" onClick={() => insertMarkdown("link", "Link text")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>Link</button>
                      <button type="button" onClick={() => insertMarkdown("table")} className={styles.clearFilterBtn} style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}>Table</button>
                    </div>

                    <textarea
                      id="blog-content-editor"
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className={styles.textInput}
                      style={{ height: "260px", fontFamily: "monospace", fontSize: "0.9rem", borderRadius: "0 0 6px 6px" }}
                      placeholder="Write your blog article here..."
                      required
                    />
                  </div>

                  {/* SEO Metadata Accordion */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionHeading}>SEO Metadata (Optional)</h4>
                    <div className={styles.formGrid}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>SEO Meta Title</label>
                        <input
                          type="text"
                          value={blogSeoTitle}
                          onChange={(e) => setBlogSeoTitle(e.target.value)}
                          className={styles.textInput}
                          placeholder="Meta Title for search engines"
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>SEO Meta Keywords</label>
                        <input
                          type="text"
                          value={blogSeoKeywords}
                          onChange={(e) => setBlogSeoKeywords(e.target.value)}
                          className={styles.textInput}
                          placeholder="e.g. pan card, pvc card, csc portal"
                        />
                      </div>
                      <div className={styles.fieldGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.fieldLabel}>SEO Meta Description</label>
                        <textarea
                          value={blogSeoDescription}
                          onChange={(e) => setBlogSeoDescription(e.target.value)}
                          className={styles.textInput}
                          style={{ height: "60px" }}
                          placeholder="Search engine meta description..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* LIVE PREVIEW MODE */
                <div style={{ background: "var(--background)", padding: "1.5rem", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700 }}>{blogCategory}</span>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0.5rem 0" }}>{blogTitle || "Untitled Article"}</h1>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "1rem" }}>
                    By {blogAuthor} • {editingBlog?.publishedDate || "Today"}
                  </p>
                  {blogImage && <img src={blogImage} alt="Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "1.5rem" }} />}
                  <div style={{ color: "var(--text-main)", fontSize: "0.95rem" }}>
                    {renderContentPreview(blogContent || "No content written yet.")}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => setIsBlogModalOpen(false)} className={styles.cancelBtn} disabled={isSavingBlog}>
                Cancel
              </button>
              <button
                onClick={() => handleSaveBlog(false)}
                className={styles.clearFilterBtn}
                style={{ background: "#fef3c7", color: "#92400e", borderColor: "#fde68a" }}
                disabled={isSavingBlog}
              >
                {isSavingBlog ? "Saving..." : "Save Draft"}
              </button>
              <button onClick={() => handleSaveBlog(true)} className={styles.saveBtn} disabled={isSavingBlog}>
                {isSavingBlog ? "Publishing..." : "PUBLISH BLOG"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ------------------------------------------------------------- */}
      {deletingBlog && (
        <div className={styles.modalBackdrop} onClick={() => setDeletingBlog(null)}>
          <div className={styles.modal} style={{ maxWidth: "450px" }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader} style={{ background: "#fef2f2" }}>
              <h3 style={{ color: "#dc2626", fontWeight: 800 }}>Confirm Blog Deletion</h3>
              <button onClick={() => setDeletingBlog(null)} className={styles.modalCloseBtn}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ color: "var(--text-main)", fontSize: "0.95rem" }}>
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div style={{ background: "var(--surface-alt)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }}>
                <strong>{deletingBlog.title}</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)", margin: "0.25rem 0 0 0" }}>Slug: {deletingBlog.slug}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setDeletingBlog(null)} className={styles.cancelBtn} disabled={isDeletingBlog}>
                Cancel
              </button>
              <button
                onClick={handleDeleteBlogConfirm}
                className={styles.saveBtn}
                style={{ background: "#ef4444" }}
                disabled={isDeletingBlog}
              >
                {isDeletingBlog ? "Deleting..." : "YES, DELETE BLOG"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
