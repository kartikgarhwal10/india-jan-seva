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
      id,
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

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required." }, { status: 400 });
    }

    const existingPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Blog title is required." }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Blog content is required." }, { status: 400 });
    }

    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) finalSlug = existingPost.slug;

    // Verify slug uniqueness if changed
    if (finalSlug !== existingPost.slug) {
      const slugCheck = await prisma.blogPost.findUnique({ where: { slug: finalSlug } });
      if (slugCheck && slugCheck.id !== id) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }
    }

    const readTime = calculateReadTime(content);

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: finalSlug,
        summary: (summary || title).trim(),
        content: content.trim(),
        category: (category || "General").trim(),
        author: (author || "Unique CSC Point Admin").trim(),
        readTime,
        image: image || existingPost.image,
        published: Boolean(published),
        seoTitle: seoTitle ? seoTitle.trim() : null,
        seoDescription: seoDescription ? seoDescription.trim() : null,
        seoKeywords: seoKeywords ? seoKeywords.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Admin Blog Update API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
