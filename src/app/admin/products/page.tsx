import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'PVC Card Product Pricing Configuration - India Jan Seva Admin',
  robots: 'noindex, nofollow',
};

export default async function AdminProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Products Price Configuration</h1>
        <p className="text-slate-400 text-xs mt-1">
          Adjust the assistance fees, toggle card catalog display status, and configure requirements guidelines.
        </p>
      </div>

      {/* Product List Component */}
      <ProductsClient initialProducts={products} />
      
    </div>
  );
}
