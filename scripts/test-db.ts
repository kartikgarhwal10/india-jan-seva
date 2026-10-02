import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

async function testConnection() {
  const dbUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;

  if (!dbUrl) {
    console.error("❌ DATABASE_URL is missing from environment variables.");
    process.exit(1);
  }

  if (!directUrl) {
    console.error("❌ DIRECT_URL is missing from environment variables.");
    process.exit(1);
  }

  console.log("✅ DATABASE_URL & DIRECT_URL environment variables exist.");

  const connectionString = directUrl || dbUrl;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("✅ PostgreSQL connection test: SUCCESSFUL");
    await prisma.$disconnect();
  } catch (err: unknown) {
    console.error("❌ PostgreSQL connection test failed:", err instanceof Error ? err.message : err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
