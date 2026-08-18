import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import OrderWizard from './OrderWizard';

export const metadata: Metadata = {
  title: 'Order PVC Smart Card Online - India Jan Seva',
  description: 'Order your PVC smart card online. Fill details, upload scanned files, pay securely and track printing and delivery updates.',
};

interface Props {
  searchParams: Promise<{ cardId?: string }>;
}

export default async function OrderPage({ searchParams }: Props) {
  const { cardId } = await searchParams;
  const products = getProducts();

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">Order PVC Card</span>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">
            PVC Card Ordering Desk
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Follow the instructions, submit details, and we will print your heavy-duty plastic card with official guidelines and ship to your doorstep.
          </p>
        </div>

        {/* Wizard Form */}
        <OrderWizard products={products} initialCardId={cardId} />

      </div>
    </div>
  );
}
