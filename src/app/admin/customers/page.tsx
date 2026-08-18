import type { Metadata } from 'next';
import { getOrders } from '@/lib/db';
import { MapPin, Phone, Mail, ShoppingBag, TrendingUp, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Directory database - India Jan Seva Admin',
  robots: 'noindex, nofollow',
};

interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default async function AdminCustomersPage() {
  const orders = getOrders();

  // Group orders by phone to create customer profiles
  const customerMap: Record<string, CustomerProfile> = {};

  orders.forEach((o) => {
    const key = o.phone;
    const paidAmount = o.paymentStatus === 'Paid' ? o.amount : 0;
    
    if (customerMap[key]) {
      customerMap[key].orderCount += 1;
      customerMap[key].totalSpent += paidAmount;
      if (new Date(o.createdAt).getTime() > new Date(customerMap[key].lastOrderDate).getTime()) {
        customerMap[key].lastOrderDate = o.createdAt;
      }
    } else {
      customerMap[key] = {
        name: o.customerName,
        phone: o.phone,
        email: o.email || 'N/A',
        orderCount: 1,
        totalSpent: paidAmount,
        lastOrderDate: o.createdAt
      };
    }
  });

  const customersList = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Customer Database</h1>
        <p className="text-slate-400 text-xs mt-1">
          Detailed catalog of users who ordered PVC cards or submitted online assistance registrations.
        </p>
      </div>

      {/* Customer Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold bg-slate-900/30">
                <th className="p-4">Customer Details</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Email ID</th>
                <th className="p-4 text-center">Orders Count</th>
                <th className="p-4">Aggregate Spent</th>
                <th className="p-4">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customersList.length > 0 ? (
                customersList.map((c, idx) => (
                  <tr key={idx} className="border-b border-slate-850 hover:bg-slate-900/10 text-slate-300">
                    <td className="p-4 font-bold text-white flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-saffron-light text-saffron-dark font-black text-[10px] flex items-center justify-center">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{c.name}</span>
                    </td>
                    <td className="p-4 font-semibold font-mono text-slate-350">{c.phone}</td>
                    <td className="p-4 text-slate-400">{c.email}</td>
                    <td className="p-4 text-center font-bold text-slate-100">{c.orderCount}</td>
                    <td className="p-4 font-extrabold text-green">₹{c.totalSpent}</td>
                    <td className="p-4 text-slate-400 font-medium">
                      {new Date(c.lastOrderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500 font-semibold">No customers registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
