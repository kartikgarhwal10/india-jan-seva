import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";
import LoginForm from "./LoginForm";
import DashboardManager from "./DashboardManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Unique Computer Centre - CSC Point",
  description: "Administrative interface to manage PVC orders, update tracking consignment numbers, and manage service status.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  let isAuthenticated = false;
  try {
    isAuthenticated = await verifyAdminSession();
  } catch {
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <LoginForm />
      </div>
    );
  }

  let totalCount = 0;
  let newCount = 0;
  let pendingCount = 0;
  let paidCount = 0;
  let printingCount = 0;
  let packedCount = 0;
  let shippedCount = 0;
  let deliveredCount = 0;
  let totalBlogs = 0;
  let publishedBlogs = 0;
  let draftBlogs = 0;
  let totalRevenue = 0.0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentBlogs: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentOrders: any[] = [];

  try {
    totalCount = await prisma.order.count();
    
    newCount = await prisma.order.count({
      where: {
        orderStatus: { in: ["ORDER_RECEIVED", "Order Received", "PENDING_PAYMENT"] },
      },
    });

    pendingCount = await prisma.order.count({
      where: { paymentStatus: "PENDING" },
    });

    paidCount = await prisma.order.count({
      where: { paymentStatus: "PAID" },
    });

    printingCount = await prisma.order.count({
      where: { orderStatus: "PRINTING" },
    });

    packedCount = await prisma.order.count({
      where: { orderStatus: "PACKED" },
    });

    shippedCount = await prisma.order.count({
      where: { orderStatus: "SHIPPED" },
    });

    deliveredCount = await prisma.order.count({
      where: { orderStatus: "DELIVERED" },
    });

    totalBlogs = await prisma.blogPost.count();
    publishedBlogs = await prisma.blogPost.count({ where: { published: true } });
    draftBlogs = await prisma.blogPost.count({ where: { published: false } });

    const recentBlogsRaw = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    recentBlogs = recentBlogsRaw.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));

    const revenueResult = await prisma.order.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        paymentStatus: "PAID",
      },
    });

    totalRevenue = revenueResult._sum.amount || 0.0;

    const recentOrdersRaw = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    recentOrders = recentOrdersRaw.map((o) => ({
      ...o,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("Admin Dashboard DB Error:", err);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DashboardManager
        orders={recentOrders}
        totalCount={totalCount}
        newCount={newCount}
        pendingCount={pendingCount}
        paidCount={paidCount}
        printingCount={printingCount}
        packedCount={packedCount}
        shippedCount={shippedCount}
        deliveredCount={deliveredCount}
        totalRevenue={totalRevenue}
        initialBlogs={recentBlogs}
        totalBlogs={totalBlogs}
        publishedBlogs={publishedBlogs}
        draftBlogs={draftBlogs}
      />
    </div>
  );
}
