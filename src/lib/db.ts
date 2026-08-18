import fs from 'fs';
import path from 'path';
import initialDb from '../../data/db.json';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  status: 'Active' | 'Inactive';
  requiredDocument: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  productId: string;
  productName: string;
  amount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 
    | 'PENDING_PAYMENT'
    | 'PAYMENT_CONFIRMED'
    | 'ORDER_RECEIVED'
    | 'PROCESSING'
    | 'PRINTING'
    | 'PACKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'REFUNDED';
  trackingNumber?: string;
  documentUrl: string;
  address: string;
  village: string;
  district: string;
  state: string;
  pinCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface DbSchema {
  products: Product[];
  orders: Order[];
  reviews: Review[];
}

// In-memory database cache fallback for environments without writable local disk (e.g. Cloudflare Workers)
let memoryDb: DbSchema = JSON.parse(JSON.stringify(initialDb));

// Test file system write availability
let isFileSystemAvailable = true;
try {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const testPath = path.join(dir, '.fs-test');
  fs.writeFileSync(testPath, 'test', 'utf-8');
  fs.unlinkSync(testPath);
} catch (e) {
  isFileSystemAvailable = false;
  console.warn('File system not writable. Falling back to in-memory database storage (Cloudflare Workers mode).');
}

// Ensure the db file exists and is populated
function ensureDbExists() {
  if (!isFileSystemAvailable) return;
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(memoryDb, null, 2), 'utf-8');
  }
}

// Read database
export function getDb(): DbSchema {
  if (!isFileSystemAvailable) {
    return memoryDb;
  }
  ensureDbExists();
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw) as DbSchema;
  } catch (error) {
    console.error('Error reading DB file, returning in-memory cache:', error);
    return memoryDb;
  }
}

// Write database
export function saveDb(data: DbSchema): boolean {
  memoryDb = data; // Sync in-memory cache
  if (!isFileSystemAvailable) {
    return true; // Return success for in-memory mode
  }
  ensureDbExists();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing DB file, saved to in-memory cache:', error);
    return true; // Still return true since in-memory is updated
  }
}

/* --- PRODUCT ACTIONS --- */
export function getProducts(): Product[] {
  return getDb().products;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find(p => p.slug === slug);
}

export function updateProduct(id: string, updates: Partial<Product>): boolean {
  const db = getDb();
  const idx = db.products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  
  db.products[idx] = { ...db.products[idx], ...updates };
  return saveDb(db);
}

export function createProduct(product: Product): boolean {
  const db = getDb();
  if (db.products.some(p => p.id === product.id)) return false;
  db.products.push(product);
  return saveDb(db);
}

export function deleteProduct(id: string): boolean {
  const db = getDb();
  const filtered = db.products.filter(p => p.id !== id);
  if (filtered.length === db.products.length) return false;
  db.products = filtered;
  return saveDb(db);
}

/* --- ORDER ACTIONS --- */
export function getOrders(): Order[] {
  return getDb().orders;
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find(o => o.id === id);
}

export function createOrder(order: Omit<Order, 'createdAt' | 'updatedAt'>): boolean {
  const db = getDb();
  const now = new Date().toISOString();
  const fullOrder: Order = {
    ...order,
    createdAt: now,
    updatedAt: now,
  };
  db.orders.push(fullOrder);
  return saveDb(db);
}

export function updateOrderStatus(
  id: string, 
  status: Order['orderStatus'], 
  trackingNumber?: string,
  paymentStatus?: Order['paymentStatus']
): boolean {
  const db = getDb();
  const idx = db.orders.findIndex(o => o.id === id);
  if (idx === -1) return false;
  
  db.orders[idx] = {
    ...db.orders[idx],
    orderStatus: status,
    trackingNumber: trackingNumber !== undefined ? trackingNumber : db.orders[idx].trackingNumber,
    paymentStatus: paymentStatus !== undefined ? paymentStatus : db.orders[idx].paymentStatus,
    updatedAt: new Date().toISOString(),
  };
  return saveDb(db);
}

/* --- REVIEW ACTIONS --- */
export function getReviews(): Review[] {
  return getDb().reviews;
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const db = getDb();
  const newReview: Review = {
    ...review,
    id: 'rev_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  db.reviews.unshift(newReview);
  saveDb(db);
  return newReview;
}
