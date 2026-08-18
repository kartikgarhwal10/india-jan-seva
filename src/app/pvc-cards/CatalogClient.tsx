'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CreditCard, ExternalLink, HelpCircle } from 'lucide-react';
import CardMockup from '@/components/CardMockup';
import { Product } from '@/lib/db';

export default function CatalogClient({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Identity', 'Health', 'Transport', 'Government'];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    const isActive = product.status === 'Active';
    return matchesSearch && matchesCategory && isActive;
  });

  const getWhatsAppLink = (productName: string) => {
    const text = `Hello India Jan Seva, mujhe ${productName} PVC Card order karna hai.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-card border border-slate-100">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search PVC cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron bg-slate-50"
          />
        </div>

        {/* Category list */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col justify-between group transition-all"
            >
              
              {/* Product preview mockup container */}
              <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-center h-52">
                <CardMockup cardId={product.id} name="PREVIEW HOLDER" interactive={true} />
              </div>

              {/* Product details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-saffron bg-saffron-light px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">All India Delivery</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-saffron-dark transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price block */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold leading-none">Starting Price</span>
                    <span className="text-xl font-black text-slate-900">₹{product.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold leading-none">Req. Document</span>
                    <span className="text-xs font-semibold text-slate-700">{product.requiredDocument}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Order on WhatsApp */}
                  <a
                    href={getWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 font-bold py-2.5 rounded-lg text-xs transition-colors"
                  >
                    <span>WhatsApp Order</span>
                  </a>
                  
                  {/* Order Now (Form Flow) */}
                  <Link
                    href={`/order?cardId=${product.id}`}
                    className="flex items-center justify-center space-x-1 bg-saffron hover:bg-saffron-dark text-white font-bold py-2.5 rounded-lg text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Order Now</span>
                  </Link>
                </div>

                {/* Details view link */}
                <div className="text-center pt-1 border-t border-slate-50">
                  <Link
                    href={`/pvc-cards/${product.slug}`}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 inline-flex items-center space-x-1"
                  >
                    <span>View Product Details & Guidelines</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No PVC cards matching your filters.</p>
        </div>
      )}
    </div>
  );
}
