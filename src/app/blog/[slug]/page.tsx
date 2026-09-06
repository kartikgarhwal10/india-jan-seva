import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../blog.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Article Not Found | Unique Computer Centre",
    };
  }

  return {
    title: `${post.title} | Unique Computer Centre - CSC Point`,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // Simple, secure, and fast parser to convert paragraphs and headings
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("###")) {
        return <h3 key={idx}>{trimmed.replace("###", "").trim()}</h3>;
      }
      if (trimmed.startsWith("##")) {
        return <h2 key={idx}>{trimmed.replace("##", "").trim()}</h2>;
      }
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx}>
            {items.map((item, subIdx) => (
              <li key={subIdx}>{item}</li>
            ))}
          </ul>
        );
      }
      return <p key={idx}>{trimmed}</p>;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        <article className={styles.detailContainer}>
          
          <header className={styles.detailHeader}>
            <div className={styles.detailMeta}>
              <span>📁 {post.category}</span>
              <span>•</span>
              <span>📅 {post.publishedDate}</span>
              <span>•</span>
              <span>⏱️ {post.readTime}</span>
            </div>
            <h1 className={styles.detailTitle}>{post.title}</h1>
            <p style={{ fontStyle: "italic", marginTop: "1rem", color: "var(--text-light)" }}>
              By {post.author}
            </p>
          </header>

          <div className={styles.detailImgWrapper}>
            <img
              src={post.image}
              alt={post.title}
              className={styles.detailImage}
            />
          </div>

          <div className={styles.bodyContent}>
            {renderContent(post.content)}
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
