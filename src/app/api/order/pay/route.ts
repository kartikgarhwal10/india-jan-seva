import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId } = body;

    // 1. Validation check
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    // 2. Fetch order and include product details from DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // 3. Confirm payable status
    if (order.paymentStatus === "PAID") {
      return NextResponse.json({ error: "This order is already paid." }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 4. Handle missing environment variables gracefully (Local Dev check)
    if (!keyId || !keySecret) {
      console.error("Razorpay Credentials Missing. NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured.");
      
      // If we are explicitly running mock test mode
      if (process.env.NODE_ENV === "development") {
        // Create local mock Razorpay Order ID for sandbox dev checks
        const mockRpOrderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
        
        await prisma.order.update({
          where: { id: orderId },
          data: { razorpayOrderId: mockRpOrderId },
        });

        return NextResponse.json({
          success: true,
          isMock: true,
          keyId: "mock_key_id",
          razorpayOrderId: mockRpOrderId,
          amount: order.amount,
          productName: order.product?.name || "PVC Smart Card",
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerMobile: order.customerMobile,
        });
      }

      return NextResponse.json(
        { error: "Payment gateway credentials are not configured on the server. Please contact support." },
        { status: 503 }
      );
    }

    // 5. Create Razorpay Order
    let razorpayOrderId = order.razorpayOrderId;

    // Reuse existing razorpayOrderId if it exists and matches standard format (non-mock)
    const needsNewRazorpayOrder = !razorpayOrderId || razorpayOrderId.startsWith("order_mock_");

    if (needsNewRazorpayOrder) {
      try {
        const razorpayClient = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const amountInPaisa = Math.round(order.amount * 100); // smallest unit: Paisa

        const rpOrder = await razorpayClient.orders.create({
          amount: amountInPaisa,
          currency: "INR",
          receipt: order.id,
        });

        razorpayOrderId = rpOrder.id;

        // Update database with Razorpay Order ID
        await prisma.order.update({
          where: { id: orderId },
          data: { razorpayOrderId },
        });
      } catch (err) {
        console.error("Razorpay API Order creation failed:", err);
        return NextResponse.json({ error: "Failed to generate payment order. Please try again." }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      isMock: false,
      keyId,
      razorpayOrderId,
      amount: order.amount,
      productName: order.product?.name || "PVC Smart Card",
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerMobile: order.customerMobile,
    });
  } catch (error) {
    console.error("Order Pay API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
