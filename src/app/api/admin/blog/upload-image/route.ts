import { NextResponse } from "next/server";
import path from "path";
import { verifyAdminSession } from "@/lib/adminAuth";
import { uploadBlogImageToSupabase } from "@/lib/supabaseServer";

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
    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: "Unsupported image format. Allowed: JPG, PNG, WebP, GIF." },
        { status: 400 }
      );
    }

    let ext = path.extname(file.name).toLowerCase();
    if (!ext) {
      if (mimeType === "image/png") ext = ".png";
      else if (mimeType === "image/webp") ext = ".webp";
      else if (mimeType === "image/gif") ext = ".gif";
      else ext = ".jpg";
    }

    const fileBytes = await file.arrayBuffer();
    const buffer = Buffer.from(fileBytes);

    // Upload to public Supabase Storage bucket `ucc-blog-images`
    const { publicUrl, error: uploadError } = await uploadBlogImageToSupabase({
      fileBuffer: buffer,
      fileExt: ext,
      mimeType,
    });

    if (uploadError || !publicUrl) {
      console.error("[BLOG IMAGE UPLOAD] Supabase upload failed:", uploadError);
      return NextResponse.json(
        { error: uploadError || "Failed to upload image to storage bucket." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload image.";
    console.error("Blog Image Upload Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
