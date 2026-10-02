import "dotenv/config";
import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

async function syncExactBackup() {
  console.log("Synchronizing exact backup records to Supabase PostgreSQL...");

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const backupFilePath = path.join(process.cwd(), "sqlite_data_backup.json");
  const backupRaw = await fs.readFile(backupFilePath, "utf-8");
  const backup = JSON.parse(backupRaw);
  const data = backup.data;

  try {
    // Delete reviews and gallery items in Supabase to clean seed duplicates
    await prisma.review.deleteMany();
    await prisma.galleryItem.deleteMany();

    console.log(`Re-importing ${data.Review.length} Reviews...`);
    for (const item of data.Review || []) {
      await prisma.review.create({
        data: {
          id: item.id,
          rating: item.rating,
          content: item.content,
          author: item.author,
          location: item.location,
          date: item.date,
          approved: item.approved,
          createdAt: new Date(item.createdAt),
        },
      });
    }

    console.log(`Re-importing ${data.GalleryItem.length} GalleryItems...`);
    for (const item of data.GalleryItem || []) {
      await prisma.galleryItem.create({
        data: {
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          alt: item.alt,
          createdAt: new Date(item.createdAt),
        },
      });
    }

    console.log("✅ Sync exact backup completed successfully!");
  } catch (err) {
    console.error("❌ Sync failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

syncExactBackup();
