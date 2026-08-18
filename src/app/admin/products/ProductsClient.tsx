'use client';

import { useState, useTransition } from 'react';
import { Edit3, Check, Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { Product } from '@/lib/db';
import { updateProductAdminAction } from '../actions';

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [isPending, startTransition] = useTransition();
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  
  // Track inputs per product (by id)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(149);
  const [tempStatus, setTempStatus] = useState<Product['status']>('Active');
  
  const [msg, setMsg] = useState({ type: '', text: '' });

  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setTempPrice(p.price);
    setTempStatus(p.status);
    setMsg({ type: '', text: '' });
  };

  const handleSave = (id: string) => {
    setMsg({ type: '', text: '' });
    
    startTransition(async () => {
      const res = await updateProductAdminAction(id, {
        price: Number(tempPrice),
        status: tempStatus
      });

      if (res.success) {
        setMsg({ type: 'success', text: 'Product configuration saved!' });
        // Update local state list
        setProductsList(prev => prev.map(p => 
          p.id === id ? { ...p, price: Number(tempPrice), status: tempStatus } : p
        ));
        setEditingId(null);
      } else {
        setMsg({ type: 'error', text: res.message || 'Failed to update product.' });
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Alert message banner */}
      {msg.text && (
        <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
          msg.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green' : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <span>{msg.text}</span>
        </div>
      )}

      {/* Grid of Products config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productsList.map((p) => {
          const isEditing = editingId === p.id;

          return (
            <div 
              key={p.id}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-5 shadow-lg"
            >
              
              {/* Product Info */}
              <div className="flex justify-between items-start text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-base font-extrabold text-white">{p.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{p.description}</p>
                </div>
                
                {/* Active / Inactive Status pill */}
                <span className={`px-2 py-0.5 rounded-[4px] font-bold text-[9px] uppercase border ${
                  p.status === 'Active'
                    ? 'bg-green/10 border-green/30 text-green'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}>
                  {p.status}
                </span>
              </div>

              {/* Editing form fields vs static display */}
              <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-center justify-between text-xs">
                
                {isEditing ? (
                  <div className="flex flex-wrap gap-4 items-end flex-grow text-left">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Edit Price (₹)</label>
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-20 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white text-xs focus:outline-none focus:border-saffron"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Listing State</label>
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value as Product['status'])}
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white text-xs focus:outline-none focus:border-saffron"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 flex-grow text-left">
                    <div>
                      <span className="text-slate-500 block font-bold uppercase text-[9px] leading-none mb-1">Fee Amount</span>
                      <span className="text-lg font-black text-white leading-none">₹{p.price}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-bold uppercase text-[9px] leading-none mb-1">Required Document</span>
                      <span className="text-xs font-semibold text-slate-300 leading-none">{p.requiredDocument}</span>
                    </div>
                  </div>
                )}

                {/* Edit Action Button toggler */}
                <div className="shrink-0 pl-4">
                  {isEditing ? (
                    <button
                      onClick={() => handleSave(p.id)}
                      disabled={isPending}
                      className="bg-green hover:bg-green-dark text-white font-bold p-2 rounded-lg shadow-md transition-all flex items-center justify-center"
                      title="Save updates"
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(p)}
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold p-2 rounded-lg transition-all"
                      title="Edit configurations"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
