import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PVCProductCard from "@/components/PVCProductCard/PVCProductCard";
import styles from "./pvcCards.module.css";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Order PVC Smart Cards Online | Unique Computer Centre - CSC Point",
  description: "Get wallet-sized, waterproof PVC smart cards printed online for Aadhaar, PAN, Voter ID, Driving Licence, and RC starting at ₹149.",
};

import { pvcProducts } from "@/lib/mockData";

export interface PVCProductItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription?: string;
  description: string;
  image: string;
  active?: boolean;
}

export default async function PvcCardsPage({ searchParams }: PageProps) {
  const { category = "all" } = await searchParams;

  let products: PVCProductItem[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        active: true,
        ...(category !== "all" ? { category } : {}),
      },
      orderBy: {
        price: "asc",
      },
    });

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
    }
  } catch (e) {
    console.warn("Prisma DB fetch warning on Vercel, using fallback mock data:", e);
  }

  // Fallback to static mock products if DB query returned 0 items or failed
  if (products.length === 0) {
    products = pvcProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      shortDescription: "Premium quality • Durable • Smart Look • Easy Ordering",
      description: p.description,
      image: p.image,
      active: true,
    }));
  }

  const categories = [
    { key: "all", label: "All Cards" },
    { key: "identity", label: "Identity Cards" },
    { key: "utility", label: "Utility Cards" },
    { key: "academic_others", label: "Academic & Others" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>Premium PVC Smart Cards</h1>
          <p className={styles.heroSubtitle}>
            Order high-quality, durable, waterproof plastic smart prints of your essential documents. Starting at just ₹149 with all India home delivery.
          </p>
        </section>

        <section className={styles.container}>
          {/* Category Tabs (Links for SSR/SEO advantages) */}
          <div className={styles.tabs} role="tablist" aria-label="Product categories">
            {categories.map((cat) => {
              const isActive = category === cat.key;
              const href = cat.key === "all" ? "/pvc-cards" : `/pvc-cards?category=${cat.key}`;
              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="pvc-grid"
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Intro Section */}
          <div className={styles.introSection}>
            <p className={styles.introText}>
              We print your official government-issued identity documents exactly as provided onto high-grade PVC plastic cards. Select your document below to configure your order.
            </p>
          </div>

          {/* Product Grid */}
          <div id="pvc-grid" className={styles.pvcGrid} role="region" aria-live="polite">
            {products.length > 0 ? (
              products.map((product) => (
                <PVCProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    shortDescription: product.shortDescription,
                    description: product.description,
                    image: product.image,
                    active: product.active,
                  }}
                />
              ))
            ) : (
              <div style={{ gridColumn: "span 3", textAlign: "center", padding: "4rem" }}>
                <p style={{ color: "var(--text-light)" }}>No PVC cards available under this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
