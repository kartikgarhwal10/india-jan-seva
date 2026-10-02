import "dotenv/config";
import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

async function migrateData() {
  console.log("Starting data migration from backup to Supabase PostgreSQL...");

  const backupFilePath = path.join(process.cwd(), "sqlite_data_backup.json");
  const backupRaw = await fs.readFile(backupFilePath, "utf-8");
  const backup = JSON.parse(backupRaw);
  const data = backup.data;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // 1. Setting
    console.log(`Migrating ${data.Setting?.length || 0} Settings...`);
    for (const item of data.Setting || []) {
      await prisma.setting.upsert({
        where: { id: item.id },
        update: {
          key: item.key,
          value: item.value,
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          key: item.key,
          value: item.value,
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 2. Product
    console.log(`Migrating ${data.Product?.length || 0} Products...`);
    for (const item of data.Product || []) {
      await prisma.product.upsert({
        where: { id: item.id },
        update: {
          slug: item.slug,
          name: item.name,
          price: item.price,
          description: item.description,
          shortDescription: item.shortDescription || "",
          requirements: item.requirements,
          features: item.features,
          deliveryTime: item.deliveryTime,
          image: item.image,
          category: item.category,
          active: item.active,
          featured: item.featured,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          slug: item.slug,
          name: item.name,
          price: item.price,
          description: item.description,
          shortDescription: item.shortDescription || "",
          requirements: item.requirements,
          features: item.features,
          deliveryTime: item.deliveryTime,
          image: item.image,
          category: item.category,
          active: item.active,
          featured: item.featured,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 3. Service
    console.log(`Migrating ${data.Service?.length || 0} Services...`);
    for (const item of data.Service || []) {
      await prisma.service.upsert({
        where: { id: item.id },
        update: {
          slug: item.slug,
          name: item.name,
          category: item.category,
          icon: item.icon,
          description: item.description,
          requirements: item.requirements,
          processingTime: item.processingTime,
          officialLink: item.officialLink,
          active: item.active,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          icon: item.icon,
          description: item.description,
          requirements: item.requirements,
          processingTime: item.processingTime,
          officialLink: item.officialLink,
          active: item.active,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 4. Review
    console.log(`Migrating ${data.Review?.length || 0} Reviews...`);
    for (const item of data.Review || []) {
      await prisma.review.upsert({
        where: { id: item.id },
        update: {
          rating: item.rating,
          content: item.content,
          author: item.author,
          location: item.location,
          date: item.date,
          approved: item.approved,
          createdAt: new Date(item.createdAt),
        },
        create: {
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

    // 5. GalleryItem
    console.log(`Migrating ${data.GalleryItem?.length || 0} GalleryItems...`);
    for (const item of data.GalleryItem || []) {
      await prisma.galleryItem.upsert({
        where: { id: item.id },
        update: {
          title: item.title,
          category: item.category,
          image: item.image,
          alt: item.alt,
          createdAt: new Date(item.createdAt),
        },
        create: {
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          alt: item.alt,
          createdAt: new Date(item.createdAt),
        },
      });
    }

    // 6. BlogPost
    console.log(`Migrating ${data.BlogPost?.length || 0} BlogPosts...`);
    for (const item of data.BlogPost || []) {
      await prisma.blogPost.upsert({
        where: { id: item.id },
        update: {
          title: item.title,
          slug: item.slug,
          summary: item.summary,
          content: item.content,
          category: item.category,
          author: item.author,
          publishedDate: item.publishedDate,
          readTime: item.readTime,
          image: item.image,
          published: item.published,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          seoKeywords: item.seoKeywords,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          title: item.title,
          slug: item.slug,
          summary: item.summary,
          content: item.content,
          category: item.category,
          author: item.author,
          publishedDate: item.publishedDate,
          readTime: item.readTime,
          image: item.image,
          published: item.published,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          seoKeywords: item.seoKeywords,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 7. Partner
    console.log(`Migrating ${data.Partner?.length || 0} Partners...`);
    for (const item of data.Partner || []) {
      await prisma.partner.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          shopName: item.shopName,
          phone: item.phone,
          email: item.email,
          password: item.password,
          address: item.address,
          status: item.status,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          name: item.name,
          shopName: item.shopName,
          phone: item.phone,
          email: item.email,
          password: item.password,
          address: item.address,
          status: item.status,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 8. Order
    console.log(`Migrating ${data.Order?.length || 0} Orders...`);
    for (const item of data.Order || []) {
      await prisma.order.upsert({
        where: { id: item.id },
        update: {
          customerName: item.customerName,
          customerMobile: item.customerMobile,
          customerEmail: item.customerEmail,
          deliveryAddress: item.deliveryAddress,
          villageTown: item.villageTown,
          district: item.district,
          state: item.state,
          pinCode: item.pinCode,
          documentPath: item.documentPath,
          amount: item.amount,
          paymentStatus: item.paymentStatus,
          orderStatus: item.orderStatus,
          razorpayOrderId: item.razorpayOrderId,
          razorpayPaymentId: item.razorpayPaymentId,
          courierName: item.courierName,
          trackingNumber: item.trackingNumber,
          notes: item.notes,
          productId: item.productId,
          partnerId: item.partnerId,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          customerName: item.customerName,
          customerMobile: item.customerMobile,
          customerEmail: item.customerEmail,
          deliveryAddress: item.deliveryAddress,
          villageTown: item.villageTown,
          district: item.district,
          state: item.state,
          pinCode: item.pinCode,
          documentPath: item.documentPath,
          amount: item.amount,
          paymentStatus: item.paymentStatus,
          orderStatus: item.orderStatus,
          razorpayOrderId: item.razorpayOrderId,
          razorpayPaymentId: item.razorpayPaymentId,
          courierName: item.courierName,
          trackingNumber: item.trackingNumber,
          notes: item.notes,
          productId: item.productId,
          partnerId: item.partnerId,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    // 9. OrderStatusHistory
    console.log(`Migrating ${data.OrderStatusHistory?.length || 0} OrderStatusHistories...`);
    for (const item of data.OrderStatusHistory || []) {
      await prisma.orderStatusHistory.upsert({
        where: { id: item.id },
        update: {
          orderId: item.orderId,
          status: item.status,
          note: item.note,
          createdAt: new Date(item.createdAt),
        },
        create: {
          id: item.id,
          orderId: item.orderId,
          status: item.status,
          note: item.note,
          createdAt: new Date(item.createdAt),
        },
      });
    }

    // 10. PartnerCommission
    console.log(`Migrating ${data.PartnerCommission?.length || 0} PartnerCommissions...`);
    for (const item of data.PartnerCommission || []) {
      await prisma.partnerCommission.upsert({
        where: { id: item.id },
        update: {
          amount: item.amount,
          status: item.status,
          partnerId: item.partnerId,
          orderId: item.orderId,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
        create: {
          id: item.id,
          amount: item.amount,
          status: item.status,
          partnerId: item.partnerId,
          orderId: item.orderId,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        },
      });
    }

    console.log("🎉 Data migration to Supabase PostgreSQL completed successfully!");
  } catch (error) {
    console.error("❌ Data migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();
