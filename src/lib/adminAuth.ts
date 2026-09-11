import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "ucc_admin_session";
// Default password if not specified in environmental file
const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "admin123";

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) return false;

  // Simple token format: "admin_token_hash"
  const expectedToken = Buffer.from(
    `${process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USER}_token_auth`
  ).toString("base64");

  return sessionToken === expectedToken;
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = Buffer.from(
    `${process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USER}_token_auth`
  ).toString("base64");

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USER,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASS,
  };
}

export const ALLOWED_ORDER_STATUSES = [
  "ORDER_RECEIVED",
  "Order Received",
  "PAYMENT_CONFIRMED",
  "PAID",
  "PENDING_PAYMENT",
  "PROCESSING",
  "PRINTING",
  "QUALITY_CHECK",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

export const ALLOWED_PAYMENT_STATUSES = [
  "PENDING",
  "PAID",
  "FAILED",
] as const;

export function isValidOrderStatus(status: string): boolean {
  return ALLOWED_ORDER_STATUSES.includes(status as typeof ALLOWED_ORDER_STATUSES[number]);
}

export function isValidPaymentStatus(status: string): boolean {
  return ALLOWED_PAYMENT_STATUSES.includes(status as typeof ALLOWED_PAYMENT_STATUSES[number]);
}

