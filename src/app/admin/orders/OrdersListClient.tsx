'use client';

import { useState, useTransition } from 'react';
import { Search, FileText, Download, X, Edit3, Truck, CreditCard, ShieldAlert, Loader2 } from 'lucide-react';
import { Order } from '@/lib/db';
import { updateOrderAdminAction } from '../actions';

const statuses: Order['orderStatus'][] = [
  'PENDING_PAYMENT',
  'PAYMENT_CONFIRMED',
  'ORDER_RECEIVED',
  'PROCESSING',
  'PRINTING',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED'
];

export default function OrdersListClient({ initialOrders }: { initialOrders: Order[] }) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Selected order details modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Edit states inside modal
  const [editStatus, setEditStatus] = useState<Order['orderStatus']>('ORDER_RECEIVED');
  const [editTracking, setEditTracking] = useState('');
  const [editPayment, setEditPayment] = useState<Order['paymentStatus']>('Paid');
  const [updateMsg, setUpdateMsg] = useState({ type: '', text: '' });

  const filteredOrders = initialOrders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.productName.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = statusFilter === 'All' || o.orderStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus);
    setEditTracking(order.trackingNumber || '');
    setEditPayment(order.paymentStatus);
    setUpdateMsg({ type: '', text: '' });
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  const handleSaveUpdates = () => {
    if (!selectedOrder) return;
    setUpdateMsg({ type: '', text: '' });
    
    startTransition(async () => {
      const res = await updateOrderAdminAction(
        selectedOrder.id,
        editStatus,
        editTracking,
        editPayment
      );

      if (res.success) {
        setUpdateMsg({ type: 'success', text: 'Order details saved successfully!' });
        // Update local selected state
        setSelectedOrder(prev => prev ? {
          ...prev,
          orderStatus: editStatus,
          trackingNumber: editTracking,
          paymentStatus: editPayment
        } : null);
      } else {
        setUpdateMsg({ type: 'error', text: res.message || 'Failed to update order.' });
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by ID, name, card..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-slate-650 bg-slate-900 text-slate-100 placeholder-slate-500"
          />
        </div>

        {/* Filter by status dropdown */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-1.5 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-slate-650 bg-slate-900 text-slate-100"
          >
            <option value="All">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold bg-slate-900/30">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Card Type</th>
                <th className="p-4">Upload File</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Active Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-850 hover:bg-slate-900/10 text-slate-300">
                    <td className="p-4 font-mono font-bold text-saffron">{o.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-white leading-none">{o.customerName}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-none">{o.phone}</p>
                    </td>
                    <td className="p-4 font-medium">{o.productName}</td>
                    <td className="p-4">
                      <a
                        href={o.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 hover:text-white text-saffron transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="font-semibold text-[10px]">Open Scanned File</span>
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-[4px] font-bold text-[9px] uppercase border ${
                        o.paymentStatus === 'Paid'
                          ? 'bg-green/10 border-green/30 text-green'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}>
                        {o.paymentStatus}
                      </span>
                    </td>
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
                    <td className="p-4 text-center">
                      <button
                        onClick={() => openOrderModal(o)}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all"
                      >
                        Details / Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-500 font-semibold">No orders matching search filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL DRAWER OVERLAY */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-scale-up text-left">
            
            {/* Modal Header */}
            <div className="bg-slate-950 p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-saffron uppercase font-bold tracking-widest leading-none">Order Management</span>
                <h3 className="text-base font-black text-white mt-1 leading-none">Order ID: {selectedOrder.id}</h3>
              </div>
              <button
                onClick={closeOrderModal}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {/* Feedback messages */}
              {updateMsg.text && (
                <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
                  updateMsg.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  <span>{updateMsg.text}</span>
                </div>
              )}

              {/* Grid info */}
              <div className="grid grid-cols-2 gap-y-4 text-xs border-b border-slate-800 pb-4">
                <div>
                  <span className="text-slate-500 block font-bold uppercase text-[9px] mb-0.5">Customer Name</span>
                  <span className="font-extrabold text-white text-sm">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase text-[9px] mb-0.5">Phone Contact</span>
                  <span className="font-bold text-white text-sm">{selectedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase text-[9px] mb-0.5">Card Product</span>
                  <span className="font-bold text-saffron text-sm">{selectedOrder.productName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase text-[9px] mb-0.5">Uploaded Identity Document</span>
                  <a
                    href={selectedOrder.documentUrl}
                    download
                    className="inline-flex items-center space-x-1 hover:text-white text-saffron transition-colors mt-0.5 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </a>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-b border-slate-800 pb-4 text-xs">
                <span className="text-slate-500 block font-bold uppercase text-[9px] mb-0.5">Shipping Destination</span>
                <p className="font-medium text-slate-300">
                  {selectedOrder.address}, {selectedOrder.village}, District {selectedOrder.district}, {selectedOrder.state} - <strong>{selectedOrder.pinCode}</strong>
                </p>
              </div>

              {/* Edit Controls */}
              <div className="space-y-4 pt-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Order Status</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Process Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as Order['orderStatus'])}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-slate-650 bg-slate-950 text-white"
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Payment Status</label>
                    <select
                      value={editPayment}
                      onChange={(e) => setEditPayment(e.target.value as Order['paymentStatus'])}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-slate-650 bg-slate-950 text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Courier Tracking Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TRK123456789"
                    value={editTracking}
                    onChange={(e) => setEditTracking(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-slate-650 bg-slate-950 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-950 p-6 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={closeOrderModal}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all"
              >
                Close
              </button>
              
              <button
                onClick={handleSaveUpdates}
                disabled={isPending}
                className="bg-saffron hover:bg-saffron-dark text-white font-bold px-6 py-2 rounded-lg text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Updates</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
