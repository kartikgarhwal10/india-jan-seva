import type { Metadata } from 'next';
import { getOrders } from '@/lib/db';
import OrdersListClient from './OrdersListClient';

export const metadata: Metadata = {
  title: 'Order Management Queue - India Jan Seva Admin',
  robots: 'noindex, nofollow',
};

export default async function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Order Management Queue</h1>
        <p className="text-slate-400 text-xs mt-1">
          Inspect client identities, download document uploads, check payment logs, and update printing / dispatch stages.
        </p>
      </div>

      {/* Orders List Component */}
      <OrdersListClient initialOrders={orders} />
      
    </div>
  );
}
