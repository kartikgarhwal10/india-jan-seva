import { PrismaClient } from "@/generated/prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import type { D1Database } from "@cloudflare/workers-types";

const globalForPrisma = globalThis as unknown as {
  prismaNode: PrismaClient | undefined;
  prismaEdge: PrismaClient | undefined;
};

/**
 * Retrieves the Cloudflare D1 database binding from the OpenNext / Cloudflare execution context.
 */
function getCloudflareD1(): D1Database | null {
  try {
    // OpenNext Cloudflare helper for accessing environment bindings
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    if (ctx?.env?.DB) {
      return ctx.env.DB as D1Database;
    }
  } catch {
    // Ignore error when running outside Cloudflare Worker environment (e.g. local Node.js next dev/build)
  }

  const globalDB = (globalThis as unknown as { DB?: D1Database }).DB;
  if (globalDB) {
    return globalDB;
  }

  return null;
}

/**
 * Returns an appropriate PrismaClient instance depending on the execution runtime.
 * - In Cloudflare Workers: Instantiates PrismaClient with @prisma/adapter-d1 bound to D1 database.
 * - In Node.js (local dev): Instantiates PrismaClient with @prisma/adapter-better-sqlite3 bound to dev.db.
 */
export function getPrisma(): PrismaClient {
  const d1 = getCloudflareD1();
  if (d1) {
    if (!globalForPrisma.prismaEdge) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient: PrismaClientEdge } = require("@/generated/prisma/edge");
      const adapter = new PrismaD1(d1);
      globalForPrisma.prismaEdge = new PrismaClientEdge({ adapter });
    }
    return globalForPrisma.prismaEdge!;
  }

  if (!globalForPrisma.prismaNode) {
    // Dynamically load better-sqlite3 adapter only in local Node.js environment
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || "file:./dev.db",
    });
    globalForPrisma.prismaNode = new PrismaClient({ adapter });
  }

  return globalForPrisma.prismaNode;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
