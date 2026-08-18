import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/db';
import CardMockup from '@/components/CardMockup';
import { 
  ArrowLeft, 
  CreditCard, 
  Phone, 
  CheckCircle, 
  FileText, 
  ShieldAlert, 
  TrendingUp, 
  Truck 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} Printing Service Online - India Jan Seva`,
    description: `Order a premium PVC smart card print of your ${product.name}. Upload document PDF, pay securely, and get it delivered in ${product.price === 199 ? '1-2 days' : '3-5 days'}.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const getWhatsAppLink = () => {
    const text = `Hello India Jan Seva, mujhe ${product.name} PVC Card order karna hai. Details link: indiajanseva.in/pvc-cards/${product.slug}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/pvc-cards"
          className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 font-semibold text-xs mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to PVC Catalog</span>
        </Link>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Mockup & Verification */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center justify-center h-64">
              <CardMockup cardId={product.id} name="YOUR DETAILS HERE" interactive={false} />
            </div>

            {/* Quick specifications */}
            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-white text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
                Card Specifications
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Material Type</span>
                  <span className="font-semibold text-white">Polyvinyl Chloride (PVC)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimensions</span>
                  <span className="font-semibold text-white">85.6mm x 54mm (ISO CR-80)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thickness</span>
                  <span className="font-semibold text-white">760 Micron (Standard ATM Card)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Print Quality</span>
                  <span className="font-semibold text-white">300 DPI Dye-Sublimation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Finish Layer</span>
                  <span className="font-semibold text-white">Dual-sided Gloss Overlay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Requirements, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-card">
            
            {/* Heading block */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-saffron tracking-widest uppercase bg-saffron-light px-2.5 py-0.5 rounded-full inline-block">
                {product.category} Category
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.name} Printing
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price block */}
            <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-none uppercase">Assistance & Printing Fee</span>
                <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
              </div>
              <div className="h-8 border-r border-slate-200"></div>
              <div className="flex items-center text-slate-500 text-xs gap-1.5">
                <Truck className="w-4 h-4 text-saffron shrink-0" />
                <span>Standard Delivery (All India)</span>
              </div>
            </div>

            {/* Document requirement warning */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-saffron" />
                <span>Required Document</span>
              </h3>
              <p className="text-slate-600 text-xs">
                To fulfill this order, we require you to upload your official <strong>{product.requiredDocument}</strong>. Please ensure the file is high resolution, as low-resolution files result in blurry text.
              </p>
              
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-800 flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Legal Notice:</strong> We do NOT issue official cards. We are a private center assisting citizens with printing cards they are already legally entitled to. You must possess the original file.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-6">
              {/* Checkout Form Button */}
              <Link
                href={`/order?cardId=${product.id}`}
                className="flex items-center justify-center space-x-2 bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm sm:flex-1"
              >
                <CreditCard className="w-4 h-4" />
                <span>Order Online Now</span>
              </Link>

              {/* Order on WhatsApp */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 font-bold px-8 py-3.5 rounded-lg text-sm sm:flex-1 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Delivery & Security lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50 text-xs text-slate-500">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <span><strong>Secure Identity Handling:</strong> Files are deleted after print completion.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <span><strong>Fast Dispatch:</strong> Dispatched in 24 hours with courier tracking.</span>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}
