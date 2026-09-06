import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../pvcCards.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to safely parse JSON strings to arrays
function parseJsonArray(jsonStr: string): string[] {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [jsonStr];
  }
}

// Dynamic SEO metadata generation from DB
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
  });
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Order PVC Cards Online`,
    description: `Order your premium, wallet-sized, waterproof ${product.name} online at just ₹${product.price}. High-fidelity smart print with fast home delivery.`,
    openGraph: {
      title: `${product.name} | Unique Computer Centre - CSC Point`,
      description: product.description,
      type: "website",
      images: [{ url: product.image }],
    }
  };
}

export default async function ProductDetails({ params }: PageProps) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
  });

  if (!product) {
    notFound();
  }

  const whatsAppLink = SITE_CONFIG.getWhatsAppProductLink(product.name);
  const requirements = parseJsonArray(product.requirements);
  const features = parseJsonArray(product.features);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        <section className={styles.container}>
          <div className={styles.detailGrid}>
            {/* Product Image Column */}
            <div className={styles.detailImgWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.detailImage}
                priority
              />
            </div>

            {/* Product Info Column */}
            <div className={styles.detailInfo}>
              <span className={styles.detailBadge}>PVC Smart Print</span>
              <h1 className={styles.detailName}>{product.name}</h1>
              
              <div className={styles.detailPriceSection}>
                <span className={styles.detailCurrency}>₹</span>
                <span className={styles.detailPrice}>{product.price}</span>
                <span className={styles.detailPeriod}>/ print</span>
                <span style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 700, marginLeft: "1rem" }}>
                  Free Shipping Included
                </span>
              </div>

              <p className={styles.detailDesc}>{product.description}</p>

              {/* Requirements & Features Lists */}
              <div className={styles.listsSection}>
                <div className={styles.listBlock}>
                  <h4>Required Documents:</h4>
                  <ul>
                    {requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.listBlock}>
                  <h4>Premium Features:</h4>
                  <ul className={styles.featureList}>
                    {features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                <strong>Estimated Delivery:</strong> {product.deliveryTime}
              </div>

              {/* Actions */}
              <div className={styles.detailActions}>
                <Link href={`/order?product=${product.slug}`} className={styles.detailBtnPrimary}>
                  Order This Card
                </Link>
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className={styles.detailBtnSecondary}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z" />
                  </svg>
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
