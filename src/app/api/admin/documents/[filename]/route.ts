import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyAdminSession } from "@/lib/adminAuth";

interface RouteParams {
  params: Promise<{ filename: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    // 1. Verify Operator Authentication Session
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { filename } = await params;
    
    // Prevent directory traversal attacks
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "private_uploads", sanitizedFilename);

    try {
      const fileBuffer = await fs.readFile(filePath);
      const ext = path.extname(sanitizedFilename).toLowerCase();
      
      let contentType = "application/pdf";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".png") contentType = "image/png";

      return new Response(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${sanitizedFilename}"`,
        },
      });
    } catch {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Secure Document Download API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
