import "dotenv/config";
import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

async function verifyMigration() {
  console.log("Starting model-by-model verification between SQLite backup and Supabase PostgreSQL...");

  const backupFilePath = path.join(process.cwd(), "sqlite_data_backup.json");
  const backupRaw = await fs.readFile(backupFilePath, "utf-8");
  const backup = JSON.parse(backupRaw);
  const sqliteCounts: Record<string, number> = backup.counts;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const supabaseCounts: Record<string, number> = {};

  try {
    supabaseCounts.Product = await prisma.product.count();
    supabaseCounts.Service = await prisma.service.count();
    supabaseCounts.Order = await prisma.order.count();
    supabaseCounts.OrderStatusHistory = await prisma.orderStatusHistory.count();
    supabaseCounts.BlogPost = await prisma.blogPost.count();
    supabaseCounts.Review = await prisma.review.count();
    supabaseCounts.GalleryItem = await prisma.galleryItem.count();
    supabaseCounts.Partner = await prisma.partner.count();
    supabaseCounts.PartnerCommission = await prisma.partnerCommission.count();
    supabaseCounts.Setting = await prisma.setting.count();

    console.log("\n=======================================================");
    console.log("MODEL COUNT VERIFICATION TABLE");
    console.log("=======================================================");
    console.table(
      Object.keys(sqliteCounts).map((model) => {
        const sqCount = sqliteCounts[model];
        const suCount = supabaseCounts[model] ?? 0;
        const match = sqCount === suCount;
        return {
          Model: model,
          "SQLite Count": sqCount,
          "Supabase Count": suCount,
          Match: match ? "✅ MATCH" : "❌ MISMATCH",
        };
      })
    );

    const allMatched = Object.keys(sqliteCounts).every(
      (model) => sqliteCounts[model] === supabaseCounts[model]
    );

    if (allMatched) {
      console.log("\n🎉 ALL MODEL COUNTS MATCH 100% PERFECTLY!");
    } else {
      console.error("\n❌ COUNT MISMATCH DETECTED! STOPPING VERIFICATION.");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyMigration();
