import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, subject, message } = body;

    // Validation
    if (!name || !mobile || !message) {
      return NextResponse.json(
        { error: "Name, Mobile, and Message are required." },
        { status: 400 }
      );
    }

    // Standard phone number validation
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Log the message (would send email/SMS in later phases)
    console.log("--- CONTACT ENQUIRY RECEIVED ---");
    console.log(`Name: ${name}`);
    console.log(`Mobile: ${mobile}`);
    console.log(`Email: ${email || "N/A"}`);
    console.log(`Subject: ${subject || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("--------------------------------");

    return NextResponse.json({ success: true, message: "Enquiry received successfully" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
