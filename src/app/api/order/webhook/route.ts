import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1. Check if webhook secret is configured
    if (!webhookSecret) {
      console.warn("Razorpay webhook secret is not configured on the server. Skipping signature validation.");
      // In local development, if secret is missing, we can log it. In production, we require validation.
      if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Webhook secret configuration missing." }, { status: 500 });
      }
    } else {
      // 2. Cryptographic signature check
      if (!signature) {
        return NextResponse.json({ error: "Webhook signature header missing." }, { status: 400 });
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("Invalid Webhook Signature matched. Expected:", expectedSignature, "Received:", signature);
        return NextResponse.json({ error: "Invalid signature verification." }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    console.log(`[RAZORPAY WEBHOOK] Received event: ${event.event}`);

    // 3. Process payment.captured or order.paid events
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const payload = event.payload;
      const razorpayOrderId = payload.order?.entity?.id || payload.payment?.entity?.order_id;
      const razorpayPaymentId = payload.payment?.entity?.id;

      if (!razorpayOrderId) {
        console.warn("[RAZORPAY WEBHOOK] Missing razorpayOrderId in webhook payload.");
        return NextResponse.json({ success: true, message: "No order ID found to process." });
      }

      // 4. Retrieve internal order from DB
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId },
      });

      if (!order) {
        console.warn(`[RAZORPAY WEBHOOK] Order not found for Razorpay Order ID: ${razorpayOrderId}`);
        return NextResponse.json({ success: true, message: "No matching internal order found." });
      }

      // 5. Idempotency Check (Check if already paid)
      if (order.paymentStatus === "PAID") {
        console.log(`[RAZORPAY WEBHOOK] Order ${order.id} is already marked as PAID. Skipping duplicate update.`);
        return NextResponse.json({ success: true, message: "Order already updated." });
      }

      // 6. Update database record
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          orderStatus: "PROCESSING",
          razorpayPaymentId,
        },
      });

      // 7. Update partner commissions if applicable
      if (order.partnerId) {
        const existingCommission = await prisma.partnerCommission.findFirst({
          where: { orderId: order.id },
        });

        if (!existingCommission) {
          await prisma.partnerCommission.create({
            data: {
              amount: 0.0,
              status: "PAID",
              partnerId: order.partnerId,
              orderId: order.id,
            },
          });
        }
      }

      console.log(`[RAZORPAY WEBHOOK] Order ${order.id} status successfully updated to PAID / PROCESSING.`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
