import Link from 'next/link';
import { getOrders, getProducts } from '@/lib/db';
import { 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Truck, 
  Users,
  CreditCard
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const orders = getOrders();
  const products = getProducts();

  // Aggregate metrics
  const totalOrders = orders.length;
  const paidOrders = orders.filter(o => o.paymentStatus === 'Paid');
  const revenue = paidOrders
    .filter(o => o.orderStatus !== 'CANCELLED' && o.orderStatus !== 'REFUNDED')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCount = orders.filter(o => 
    o.orderStatus === 'ORDER_RECEIVED' || 
    o.orderStatus === 'PROCESSING' || 
    o.orderStatus === 'PRINTING' ||
    o.orderStatus === 'PACKED'
  ).length;

  const shippedCount = orders.filter(o => o.orderStatus === 'SHIPPED').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'DELIVERED').length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    { label: 'Total Revenue', val: `₹${revenue.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5 text-green" />, desc: 'Paid & Active Orders' },
    { label: 'Total Volume', val: totalOrders, icon: <ShoppingBag className="w-5 h-5 text-saffron" />, desc: 'All Logged Inquiries' },
    { label: 'Pending Queue', val: pendingCount, icon: <Clock className="w-5 h-5 text-amber-500" />, desc: 'Awaiting Print/Dispatch' },
    { label: 'Delivered', val: deliveredCount, icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, desc: 'Fulfilled Shipments' }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Overview Dashboard</h1>
        <p className="text-slate-400 text-xs mt-1">Real-time statistics for India Jan Seva Digital Services & PVC Portal.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
                {s.icon}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-white">{s.val}</p>
              <p className="text-[10px] text-slate-500 font-semibold">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Orders & Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent orders table */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="p-6 border-b border-slate-850 flex justify-between items-center">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">Recent PVC Orders</h3>
            <Link 
              href="/admin/orders" 
              className="text-xs text-saffron hover:text-saffron-dark font-bold transition-colors"
            >
              Manage All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 font-bold bg-slate-900/40">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Card Product</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-850 hover:bg-slate-900/20 text-slate-300">
                      <td className="p-4 font-mono font-bold text-saffron">{o.id}</td>
                      <td className="p-4 font-semibold text-white">{o.customerName}</td>
                      <td className="p-4">{o.productName}</td>
                      <td className="p-4 font-bold text-white">₹{o.amount}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-[4px] font-bold text-[9px] uppercase border ${
                          o.orderStatus === 'DELIVERED' 
                            ? 'bg-green/10 border-green/30 text-green'
                            : o.orderStatus === 'SHIPPED'
                              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                              : o.orderStatus === 'PROCESSING' || o.orderStatus === 'PRINTING'
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                          {o.orderStatus.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">No orders recorded in queue.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick controls pane */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Catalog Highlights
            </h3>
            
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Active Products count</span>
                <span className="font-bold text-white">{products.filter(p => p.status === 'Active').length} Cards</span>
              </div>
              <div className="flex justify-between">
                <span>Total Catalog Cards</span>
                <span className="font-bold text-white">{products.length} types</span>
              </div>
              <div className="flex justify-between">
                <span>Base Price</span>
                <span className="font-bold text-green">₹149</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <Link
                href="/admin/products"
                className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 rounded-lg text-center block text-xs border border-slate-800 transition-colors"
              >
                Configure Product Pricing
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
