import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: "Premium PVC Smart Cards Online Catalog - India Jan Seva",
  description: "Browse and order high-quality PVC smart card printing online. We print PAN cards, Voter IDs, Ayushman Health cards, Driving Licences, and vehicle RCs. Fast shipping across India.",
};

export default async function PvcCardsPage() {
  const products = getProducts();

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">PVC Smart Cards</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Premium PVC Card Catalog
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Choose from our supported card prints below. Upload your identity file PDF, complete our payment process, and receive a hard plastic wallet card.
          </p>
        </div>

        {/* Dynamic Catalog Section */}
        <CatalogClient initialProducts={products} />

      </div>
    </div>
  );
}
