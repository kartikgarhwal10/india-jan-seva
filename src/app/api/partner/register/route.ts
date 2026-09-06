import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, shopName, phone, email, address, password } = body;

    // Field Validations
    if (!name || !shopName || !phone || !email || !address || !password) {
      return NextResponse.json({ error: "All registration fields are required." }, { status: 400 });
    }

    // Check if phone or email already registered
    const existingPartner = await prisma.partner.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });

    if (existingPartner) {
      return NextResponse.json(
        { error: "A partner with this email or mobile number already exists." },
        { status: 400 }
      );
    }

    // Cryptographic hash password natively using SHA-256
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Create Partner in PENDING state
    const partner = await prisma.partner.create({
      data: {
        name,
        shopName,
        phone,
        email,
        password: hashedPassword,
        address,
        status: "PENDING", // Operator must approve this reseller
      },
    });

    return NextResponse.json({
      success: true,
      message: "Partner registration application submitted successfully.",
      partnerId: partner.id,
    });
  } catch (error) {
    console.error("Partner Register API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
