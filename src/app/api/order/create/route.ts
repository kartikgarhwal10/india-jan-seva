import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extracted Fields
    const productId = formData.get("productId") as string;
    const customerName = formData.get("customerName") as string;
    const customerMobile = formData.get("customerMobile") as string;
    const customerEmail = (formData.get("customerEmail") as string) || "";
    const deliveryAddress = formData.get("deliveryAddress") as string;
    const villageTown = formData.get("villageTown") as string;
    const district = formData.get("district") as string;
    const state = formData.get("state") as string;
    const pinCode = formData.get("pinCode") as string;
    const partnerId = formData.get("partnerId") as string || null;
    const notes = formData.get("notes") as string || "";
    
    const file = formData.get("file") as File | null;

    // 1. Initial Field Presence Validation
    if (
      !productId ||
      !customerName ||
      !customerMobile ||
      !deliveryAddress ||
      !villageTown ||
      !district ||
      !state ||
      !pinCode ||
      !file
    ) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    // 2. Customer Name Validation
    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 3) {
      return NextResponse.json({ error: "Full Name must be at least 3 characters." }, { status: 400 });
    }

    // 3. Indian Mobile Number Validation
    const mobileTrim = customerMobile.trim();
    if (!/^[6-9]\d{9}$/.test(mobileTrim)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    // 4. Email Formatting Validation (if provided)
    const emailTrim = customerEmail.trim();
    if (emailTrim && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // 5. PIN Code Validation
    const pinTrim = pinCode.trim();
    if (!/^\d{6}$/.test(pinTrim)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit PIN code." }, { status: 400 });
    }

    // 6. Secure File Upload Validations
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Uploaded file size exceeds the 5MB limit." }, { status: 400 });
    }

    const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Unsupported file format. Only PDF, JPG, and PNG are allowed." }, { status: 400 });
    }

    let fileExt = path.extname(file.name).toLowerCase();
    if (!fileExt) {
      if (file.type === "application/pdf") fileExt = ".pdf";
      else if (file.type === "image/png") fileExt = ".png";
      else if (file.type === "image/jpeg" || file.type === "image/jpg") fileExt = ".jpg";
    }

    const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json({ error: "Unsupported file extension. Only PDF, JPG, and PNG are allowed." }, { status: 400 });
    }

    // 7. Product Lookup & Availability
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Selected PVC product was not found." }, { status: 404 });
    }

    if (!product.active) {
      return NextResponse.json({ error: "Selected PVC product is currently unavailable." }, { status: 400 });
    }

    // Check if partner order, adjust price if partner is approved
    let finalAmount = product.price;
    if (partnerId) {
      const partner = await prisma.partner.findUnique({
        where: { id: partnerId },
      });
      if (partner && partner.status === "APPROVED") {
        const partnerPriceSetting = await prisma.setting.findUnique({
          where: { key: "pvc_partner_price" },
        });
        finalAmount = partnerPriceSetting ? parseFloat(partnerPriceSetting.value) : 80.0;
      }
    }

    // 8. Idempotency / Double Submission Check (1 Minute Interval)
    const oneMinuteAgo = new Date(Date.now() - 60000);
    const duplicateOrder = await prisma.order.findFirst({
      where: {
        customerMobile: mobileTrim,
        productId: product.id,
        amount: finalAmount,
        createdAt: {
          gte: oneMinuteAgo,
        },
      },
    });

    if (duplicateOrder) {
      return NextResponse.json(
        { error: "A matching order was submitted recently. Please wait a minute before trying again." },
        { status: 409 }
      );
    }

    // 9. Document File Write Operations (Private Directory)
    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const uploadDir = path.join(process.cwd(), "private_uploads");
    
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch {
      // directory already exists
    }

    const uniqueFilename = `${crypto.randomUUID()}${fileExt}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    
    await fs.writeFile(filePath, fileBuffer);

    // 10. Generate custom unique Order ID
    const count = await prisma.order.count();
    const nextNum = 10001 + count;
    const customOrderId = `UCCPVC${nextNum}`;

    // 11. Save Order to Database
    const order = await prisma.order.create({
      data: {
        id: customOrderId,
        productId: product.id,
        customerName: trimmedName,
        customerMobile: mobileTrim,
        customerEmail: emailTrim,
        deliveryAddress: deliveryAddress.trim(),
        villageTown: villageTown.trim(),
        district: district.trim(),
        state: state.trim(),
        pinCode: pinTrim,
        documentPath: uniqueFilename, // Stored safely inside /private_uploads
        // Retention Policy: Uploaded documents are kept privately in private_uploads. For audit and printing verification needs, they are retained for up to 90 days after delivery, after which they are permanently deleted by a scheduled cleanup task.
        amount: finalAmount,
        paymentStatus: "PENDING", // Initial payment state
        orderStatus: "ORDER_RECEIVED", // Initial workflow state
        razorpayOrderId: null, // Disarmed for this phase
        partnerId,
        notes: notes.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      productName: product.name,
      amount: order.amount,
      status: "Order Received",
    });
  } catch (error) {
    console.error("Order Create API Error:", error);
    return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
  }
}
