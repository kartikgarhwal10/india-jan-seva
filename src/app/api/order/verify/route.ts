import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, isMock } = body;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId) {
      return NextResponse.json({ error: "Required payment fields are missing." }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Idempotency: If order is already marked as PAID, return success
    if (order.paymentStatus === "PAID") {
      return NextResponse.json({ success: true, message: "Order is already paid and confirmed." });
    }

    // Verify matching Razorpay Order ID to prevent cross-order payment replay
    if (order.razorpayOrderId && order.razorpayOrderId !== razorpayOrderId) {
      return NextResponse.json({ error: "Razorpay Order ID does not match order record." }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let paymentVerified = false;

    if (isMock && process.env.NODE_ENV === "development" && !keySecret) {
      // In local development test environment ONLY, allow mock verification
      paymentVerified = true;
      console.log(`[MOCK PAYMENT] Order ${orderId} verified successfully in local dev.`);
    } else if (keySecret) {
      // Cryptographic signature check
      if (!razorpaySignature) {
        return NextResponse.json({ error: "Signature verification missing." }, { status: 400 });
      }
      
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      paymentVerified = generatedSignature === razorpaySignature;
    } else {
      return NextResponse.json(
        { error: "Payment gateway credentials are not configured on the server." },
        { status: 503 }
      );
    }

    if (paymentVerified) {
      // Update DB order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "PAID",
          orderStatus: "PROCESSING",
          razorpayPaymentId: razorpayPaymentId,
          razorpayOrderId: razorpayOrderId,
        },
      });

      // If partner placed this order, record partner commission
      if (order.partnerId) {
        const existingCommission = await prisma.partnerCommission.findFirst({
          where: { orderId: order.id },
        });

        if (!existingCommission) {
          await prisma.partnerCommission.create({
            data: {
              amount: 0.0, // Reseller pricing is built-in
              status: "PAID",
              partnerId: order.partnerId,
              orderId: order.id,
            },
          });
        }
      }

      return NextResponse.json({ success: true, message: "Payment verified and order confirmed." });
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "FAILED",
          orderStatus: "Failed Payment",
        },
      });
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }
  } catch (error) {
    console.error("Order Verify API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

