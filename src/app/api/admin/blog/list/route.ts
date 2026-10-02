import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const status = searchParams.get("status") || "ALL";

    const allPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.slug.toLowerCase().includes(search) ||
        post.category.toLowerCase().includes(search);

      let matchesStatus = true;
      if (status === "PUBLISHED") {
        matchesStatus = post.published === true;
      } else if (status === "DRAFT") {
        matchesStatus = post.published === false;
      }

      return matchesSearch && matchesStatus;
    });

    return NextResponse.json({
      success: true,
      posts: filtered,
      totalCount: allPosts.length,
      publishedCount: allPosts.filter((p) => p.published).length,
      draftCount: allPosts.filter((p) => !p.published).length,
    });
  } catch (error) {
    console.error("Admin Blog List API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
