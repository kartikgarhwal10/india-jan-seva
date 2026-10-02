import { promises as fs } from "fs";
import path from "path";
import { prisma } from "../src/lib/prisma";

async function exportBackup() {
  console.log("Starting SQLite pre-migration data export...");

  const products = await prisma.product.findMany();
  const services = await prisma.service.findMany();
  const orders = await prisma.order.findMany();
  const orderStatusHistories = await prisma.orderStatusHistory.findMany();
  const blogPosts = await prisma.blogPost.findMany();
  const reviews = await prisma.review.findMany();
  const galleryItems = await prisma.galleryItem.findMany();
  const partners = await prisma.partner.findMany();
  const partnerCommissions = await prisma.partnerCommission.findMany();
  const settings = await prisma.setting.findMany();

  const backupData = {
    exportedAt: new Date().toISOString(),
    counts: {
      Product: products.length,
      Service: services.length,
      Order: orders.length,
      OrderStatusHistory: orderStatusHistories.length,
      BlogPost: blogPosts.length,
      Review: reviews.length,
      GalleryItem: galleryItems.length,
      Partner: partners.length,
      PartnerCommission: partnerCommissions.length,
      Setting: settings.length,
    },
    data: {
      Product: products,
      Service: services,
      Order: orders,
      OrderStatusHistory: orderStatusHistories,
      BlogPost: blogPosts,
      Review: reviews,
      GalleryItem: galleryItems,
      Partner: partners,
      PartnerCommission: partnerCommissions,
      Setting: settings,
    },
  };

  const backupPath = path.join(process.cwd(), "sqlite_data_backup.json");
  await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2), "utf-8");

  console.log("✅ Backup export complete! Saved to:", backupPath);
  console.log("Model record counts:", JSON.stringify(backupData.counts, null, 2));
}

exportBackup()
  .catch((err) => {
    console.error("❌ Backup export failed:", err);
    process.exit(1);
  });
