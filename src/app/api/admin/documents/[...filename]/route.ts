import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { verifyAdminSession } from "@/lib/adminAuth";
import { downloadDocumentFromSupabase } from "@/lib/supabaseServer";

interface RouteParams {
  params: Promise<{ filename: string[] | string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    // 1. Verify Operator Authentication Session
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const resolvedParams = await params;
    const rawFilename = resolvedParams.filename;

    // Resolve target storage path
    let storagePath: string;
    if (Array.isArray(rawFilename)) {
      storagePath = rawFilename.map((segment) => decodeURIComponent(segment)).join("/");
    } else {
      storagePath = decodeURIComponent(rawFilename || "");
    }

    // 2. Prevent Directory / Storage Path Traversal Attacks
    if (!storagePath || storagePath.includes("..") || storagePath.startsWith("/")) {
      return NextResponse.json({ error: "Invalid document path." }, { status: 400 });
    }

    // 3. Download Server-Side from Private Supabase Storage Bucket
    const { data: fileBuffer, contentType: rawContentType, error: storageError } =
      await downloadDocumentFromSupabase(storagePath);

    if (fileBuffer && !storageError) {
      const filenameOnly = path.basename(storagePath);
      const ext = path.extname(filenameOnly).toLowerCase();

      let contentType = rawContentType || "application/pdf";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".png") contentType = "image/png";
      if (ext === ".pdf") contentType = "application/pdf";

      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${filenameOnly}"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    }

    // Fallback: If not found in Supabase and looks like a legacy single filename, try local filesystem private_uploads
    const sanitizedLocalFilename = path.basename(storagePath);
    const localFilePath = path.join(process.cwd(), "private_uploads", sanitizedLocalFilename);

    try {
      const localBuffer = await fs.readFile(localFilePath);
      const ext = path.extname(sanitizedLocalFilename).toLowerCase();

      let contentType = "application/pdf";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".png") contentType = "image/png";

      return new Response(localBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${sanitizedLocalFilename}"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    } catch {
      // 4. Return 404 JSON error if file does not exist anywhere
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Secure Document Download API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
