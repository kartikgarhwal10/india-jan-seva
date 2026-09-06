import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId") || "";

    if (!partnerId.trim()) {
      return NextResponse.json({ error: "Partner ID is required" }, { status: 400 });
    }

    // Retrieve orders placed by this specific partner reseller
    const orders = await prisma.order.findMany({
      where: { partnerId: partnerId.trim() },
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    // Serialize dates
    const serializedOrders = orders.map((o) => ({
      id: o.id,
      customerName: o.customerName,
      productName: o.product.name,
      amount: o.amount,
      paymentStatus: o.paymentStatus,
      orderStatus: o.orderStatus,
      createdAt: o.createdAt.toISOString(),
    }));

    return NextResponse.json(serializedOrders);
  } catch (error) {
    console.error("Partner Orders API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
