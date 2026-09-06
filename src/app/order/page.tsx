import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import OrderForm from "./OrderForm";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./order.module.css";

export const metadata = {
  title: "Order PVC Smart Cards Online | Unique Computer Centre - CSC Point",
  description: "Place your order for high-quality plastic PVC Aadhaar, PAN, Voter ID, and driving licence smart cards. Safe document uploads and secure payments.",
};

export default async function OrderPage() {
  // Query all active products from SQLite database
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { price: "asc" },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className={styles.wrapper}>
        <Suspense fallback={<div className={styles.container}><p style={{ textAlign: "center" }}>Loading checkout wizard...</p></div>}>
          <OrderForm products={products} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
