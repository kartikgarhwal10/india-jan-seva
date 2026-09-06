import { NextResponse } from "next/server";
import { createAdminSession, getAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const credentials = getAdminCredentials();

    if (username === credentials.username && password === credentials.password) {
      await createAdminSession();
      return NextResponse.json({ success: true, message: "Login successful" });
    }

    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  } catch (error) {
    console.error("Admin Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
