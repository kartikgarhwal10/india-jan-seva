import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId") || "";

    if (!orderId.trim()) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId.trim().toUpperCase() },
      include: {
        product: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Expose only safe fields (hide sensitive address details or document paths from guest tracking)
    return NextResponse.json({
      id: order.id,
      productName: order.product.name,
      productImage: order.product.image,
      customerName: order.customerName,
      amount: order.amount,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      courierName: order.courierName,
      trackingNumber: order.trackingNumber,
      updatedAt: order.updatedAt,
    });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
