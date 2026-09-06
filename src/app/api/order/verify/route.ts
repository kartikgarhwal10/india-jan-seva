import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, isMock } = body;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let paymentVerified = false;

    if (isMock && !keySecret) {
      // In development test environment, allow mock verification
      paymentVerified = true;
      console.log(`[MOCK PAYMENT] Order ${orderId} verified successfully.`);
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
    }

    if (paymentVerified) {
      // Update DB order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "PAID",
          orderStatus: "PROCESSING",
          razorpayPaymentId: razorpayPaymentId,
        },
      });

      // If partner placed this order, calculate commission
      if (order.partnerId) {
        // Simple partner commission rule: Partner gains credit directly, or we create a PartnerCommission record.
        // Reseller already bought at discount ₹80, so commission is typically 0 for self-orders,
        // or if they referred, we calculate it here. Let's create a pending commission record.
        await prisma.partnerCommission.create({
          data: {
            amount: 0.0, // Since they got the card at direct reseller pricing, commission is built-in
            status: "PAID",
            partnerId: order.partnerId,
            orderId: order.id,
          },
        });
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
