import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    // File size limit: 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // File type validation
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Unsupported image format. Allowed: JPG, PNG, WebP, GIF." }, { status: 400 });
    }

    let ext = path.extname(file.name).toLowerCase();
    if (!ext) {
      if (file.type === "image/png") ext = ".png";
      else if (file.type === "image/webp") ext = ".webp";
      else if (file.type === "image/gif") ext = ".gif";
      else ext = ".jpg";
    }

    const fileBytes = await file.arrayBuffer();
    const buffer = Buffer.from(fileBytes);

    // Save to public/images/blog directory
    const uploadDir = path.join(process.cwd(), "public", "images", "blog");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch {
      // directory exists
    }

    const filename = `blog-${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/blog/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
    });
  } catch (error) {
    console.error("Blog Image Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
