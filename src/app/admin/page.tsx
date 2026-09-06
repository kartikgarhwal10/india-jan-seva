import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";
import LoginForm from "./LoginForm";
import DashboardManager from "./DashboardManager";

export const metadata = {
  title: "Operator Dashboard | Unique Computer Centre - CSC Point",
  description: "Administrative interface to manage PVC orders, update tracking consignment numbers, adjust service listings, and check analytics.",
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

  // Query Dashboard Metrics
  const totalCount = await prisma.order.count();
  
  const pendingCount = await prisma.order.count({
    where: { paymentStatus: "PENDING" },
  });

  const paidCount = await prisma.order.count({
    where: { paymentStatus: "PAID" },
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

  // Query Recent Orders
  const recentOrdersRaw = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        select: {
          name: true,
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
        pendingCount={pendingCount}
        paidCount={paidCount}
        deliveredCount={deliveredCount}
        totalRevenue={totalRevenue}
      />
    </div>
  );
}
