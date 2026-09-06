import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/lib/adminAuth";

export async function POST() {
  try {
    await deleteAdminSession();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Admin Logout API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
