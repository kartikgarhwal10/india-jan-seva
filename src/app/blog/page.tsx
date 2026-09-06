import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./blog.module.css";

export const metadata = {
  title: "Official Blog & Guides | Unique Computer Centre",
  description: "Learn how to apply for online certificates in Uttar Pradesh, download e-Aadhaar, correct Voter ID cards, and order PVC cards.",
};

export default async function BlogIndex() {
  // Query all published posts from database
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedDate: "desc" },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper} style={{ padding: 0 }}>
        {/* Banner Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Guides &amp; Updates Portal</h1>
          <p className={styles.heroSubtitle}>
            Read detailed explanations, official guidelines, and digital service news from Bahraich, Uttar Pradesh.
          </p>
        </section>

        {/* Listings Section */}
        <section className={styles.container} style={{ padding: "4rem 1.5rem" }}>
          <div className={styles.blogGrid}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.categoryTag}>{post.category}</span>
                    <h2 className={styles.postTitle}>
                      <Link href={`/blog/${post.slug}`} style={{ color: "inherit" }}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className={styles.postSummary}>{post.summary}</p>
                    <div className={styles.cardMeta}>
                      <span>{post.publishedDate}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ gridColumn: "span 3", textAlign: "center", padding: "4rem" }}>
                <p style={{ color: "var(--text-light)" }}>No blog articles posted yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
