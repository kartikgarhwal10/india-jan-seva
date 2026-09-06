import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    // 1. Verify Session
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, orderStatus, paymentStatus, courierName, trackingNumber, notes } = body;

    if (!orderId || !orderStatus || !paymentStatus) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    // 2. Update Order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus,
        paymentStatus,
        courierName: orderStatus === "SHIPPED" ? courierName : courierName || null,
        trackingNumber: orderStatus === "SHIPPED" ? trackingNumber : trackingNumber || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      orderId: updatedOrder.id,
    });
  } catch (error) {
    console.error("Order Update API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
