import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneOrEmail, password } = body;

    if (!phoneOrEmail || !password) {
      return NextResponse.json({ error: "Mobile/Email and Password are required." }, { status: 400 });
    }

    // Find Partner
    const partner = await prisma.partner.findFirst({
      where: {
        OR: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
      },
    });

    if (!partner) {
      return NextResponse.json({ error: "Invalid mobile/email or password." }, { status: 401 });
    }

    // Hash input password and compare
    const inputHash = crypto.createHash("sha256").update(password).digest("hex");
    if (inputHash !== partner.password) {
      return NextResponse.json({ error: "Invalid mobile/email or password." }, { status: 401 });
    }

    // Check account status
    if (partner.status === "PENDING") {
      return NextResponse.json(
        { error: "Your partner registration is pending approval. Please contact administrator Mohd Irfak Ahmad." },
        { status: 403 }
      );
    }

    if (partner.status === "REJECTED") {
      return NextResponse.json(
        { error: "Your partner account application was rejected. Contact support for details." },
        { status: 403 }
      );
    }

    // Return profile
    return NextResponse.json({
      success: true,
      message: "Login successful.",
      partner: {
        id: partner.id,
        name: partner.name,
        shopName: partner.shopName,
        email: partner.email,
        phone: partner.phone,
        status: partner.status,
      },
    });
  } catch (error) {
    console.error("Partner Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
