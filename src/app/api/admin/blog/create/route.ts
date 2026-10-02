import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      summary,
      content,
      category,
      author,
      image,
      published,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Blog title is required." }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Blog content is required." }, { status: 400 });
    }

    // Auto generate or clean slug
    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    // Check slug collision
    let slugCandidate = finalSlug;
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.blogPost.findUnique({ where: { slug: slugCandidate } });
      if (!existing) break;
      attempts++;
      slugCandidate = `${finalSlug}-${attempts}`;
    }
    finalSlug = slugCandidate;

    const formattedDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const readTime = calculateReadTime(content);

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        summary: (summary || title).trim(),
        content: content.trim(),
        category: (category || "General").trim(),
        author: (author || "Unique CSC Point Admin").trim(),
        publishedDate: formattedDate,
        readTime,
        image: image || "/images/pvc-banner.jpg",
        published: Boolean(published),
        seoTitle: seoTitle ? seoTitle.trim() : null,
        seoDescription: seoDescription ? seoDescription.trim() : null,
        seoKeywords: seoKeywords ? seoKeywords.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: published ? "Blog post published successfully!" : "Blog post draft saved successfully!",
      post,
    });
  } catch (error) {
    console.error("Admin Blog Create API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
