import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function getContentType(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".jpeg":
    case ".jpg":
    default:
      return "image/jpeg";
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new NextResponse("Filename required", { status: 400 });
    }

    // Security: Prevent directory traversal
    const sanitizedFilename = path.basename(filename);
    const ext = path.extname(sanitizedFilename);

    // List of candidate locations where the file might be saved
    const candidatePaths = [
      path.join(process.cwd(), "public", "images", "blog", sanitizedFilename),
      path.join(process.cwd(), "blog_uploads", sanitizedFilename),
      path.join(process.cwd(), "public", "images", sanitizedFilename),
    ];

    for (const filePath of candidatePaths) {
      try {
        const buffer = await fs.readFile(/*turbopackIgnore: true*/ filePath);
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": getContentType(ext),
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      } catch {
        // Continue checking next candidate path
      }
    }

    // Fallback: If not found on disk, serve fallback default banner image
    const fallbackPath = path.join(process.cwd(), "public", "images", "pvc-banner.jpg");
    try {
      const fallbackBuffer = await fs.readFile(/*turbopackIgnore: true*/ fallbackPath);
      return new NextResponse(fallbackBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "no-cache",
        },
      });
    } catch {
      return new NextResponse("Image not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error serving blog image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
