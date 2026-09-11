import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";
import LoginForm from "./LoginForm";
import DashboardManager from "./DashboardManager";

export const metadata = {
  title: "Admin Dashboard | Unique Computer Centre - CSC Point",
  description: "Administrative interface to manage PVC orders, update tracking consignment numbers, and manage service status.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <LoginForm />
      </div>
    );
  }

  // Query Dashboard Metrics from actual DB
  const totalCount = await prisma.order.count();
  
  const newCount = await prisma.order.count({
    where: {
      orderStatus: { in: ["ORDER_RECEIVED", "Order Received", "PENDING_PAYMENT"] },
    },
  });

  const pendingCount = await prisma.order.count({
    where: { paymentStatus: "PENDING" },
  });

  const paidCount = await prisma.order.count({
    where: { paymentStatus: "PAID" },
  });

  const printingCount = await prisma.order.count({
    where: { orderStatus: "PRINTING" },
  });

  const packedCount = await prisma.order.count({
    where: { orderStatus: "PACKED" },
  });

  const shippedCount = await prisma.order.count({
    where: { orderStatus: "SHIPPED" },
  });

  const deliveredCount = await prisma.order.count({
    where: { orderStatus: "DELIVERED" },
  });

  // Calculate Net Revenue
  const revenueResult = await prisma.order.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      paymentStatus: "PAID",
    },
  });

  const totalRevenue = revenueResult._sum.amount || 0.0;

  // Query Orders ordered by newest first
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

  // Serialize dates for Client Component safety
  const recentOrders = recentOrdersRaw.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }));

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
      />
    </div>
  );
}

