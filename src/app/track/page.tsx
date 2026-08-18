import type { Metadata } from 'next';
import Link from 'next/link';
import { getOrderById } from '@/lib/db';
import { 
  Search, 
  MapPin, 
  Clock, 
  Truck, 
  Check, 
  Phone, 
  FileText, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track Your PVC Card Order - India Jan Seva',
  description: 'Enter your India Jan Seva Order ID to track the real-time status of your PVC card printing and delivery dispatch.',
};

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

const statusMap: Record<string, number> = {
  'PENDING_PAYMENT': 0,
  'PAYMENT_CONFIRMED': 1,
  'ORDER_RECEIVED': 2,
  'PROCESSING': 3,
  'PRINTING': 4,
  'PACKED': 5,
  'SHIPPED': 6,
  'DELIVERED': 7,
  'CANCELLED': -1,
  'REFUNDED': -2
};

const timelineSteps = [
  { key: 'ORDER_RECEIVED', label: 'Order Received', desc: 'Your printing request has been logged in our queue.' },
  { key: 'PROCESSING', label: 'Processing & Quality Check', desc: 'Our operators are checking image resolution and text details.' },
  { key: 'PRINTING', label: 'Thermal PVC Printing', desc: 'Card is being printed on standard CR-80 thermal plastic.' },
  { key: 'PACKED', label: 'Packed & Dispatched', desc: 'Card is packaged in a secure water-resistant envelope.' },
  { key: 'SHIPPED', label: 'Shipped via Courier', desc: 'Dispatched to delivery carrier with tracking updates.' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Card has reached your shipping address.' }
];

export default async function TrackPage({ searchParams }: Props) {
  const { orderId } = await searchParams;
  const order = orderId ? getOrderById(orderId) : undefined;
  
  const currentStatusNum = order ? (statusMap[order.orderStatus] || 0) : 0;

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">Delivery Support</span>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">Track Your Order</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Enter your order tracking ID to view printing stages and dispatch details.
          </p>
        </div>

        {/* Search form */}
        <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 mb-8">
          <form method="GET" action="/track" className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                name="orderId"
                defaultValue={orderId || ''}
                placeholder="Enter Order ID (e.g. IJS-PVC-10258)"
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-saffron uppercase font-semibold tracking-wider bg-slate-50"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all text-sm shrink-0 flex items-center justify-center space-x-2"
            >
              <span>Track Order</span>
            </button>
          </form>
        </div>

        {orderId ? (
          order ? (
            <div className="space-y-6">
              {/* Order quick overview */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Order ID</span>
                  <span className="font-mono text-sm font-bold text-saffron tracking-wide">{order.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Customer</span>
                  <span className="text-sm font-bold text-slate-100">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Card Product</span>
                  <span className="text-sm font-bold text-slate-100">{order.productName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Payment</span>
                  <span className="text-[10px] font-bold bg-green/20 border border-green/30 text-green px-2 py-0.5 rounded inline-block uppercase">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Status specific notices */}
              {order.orderStatus === 'CANCELLED' && (
                <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-2xl text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold">Order Cancelled</p>
                    <p className="text-slate-500 mt-0.5">This order has been cancelled. Please contact customer support for further information.</p>
                  </div>
                </div>
              )}

              {order.orderStatus === 'REFUNDED' && (
                <div className="bg-amber-50 border border-amber-100 text-amber-900 p-4 rounded-2xl text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold">Payment Refunded</p>
                    <p className="text-slate-500 mt-0.5">The printing fee has been credited back to your original payment account.</p>
                  </div>
                </div>
              )}

              {/* Courier tracking box */}
              {order.trackingNumber && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-saffron" />
                    <span>Courier Shipping Details</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold">Tracking Number</span>
                      <span className="font-mono text-sm font-bold text-slate-800">{order.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Shipping Destination</span>
                      <span className="text-slate-700 font-semibold">{order.village}, {order.district}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical Timeline */}
              {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'REFUNDED' && (
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-card">
                  <h3 className="font-bold text-slate-900 text-sm mb-6 uppercase tracking-wider">Printing & Shipping Timeline</h3>
                  
                  <div className="relative border-l-2 border-slate-100 ml-3.5 space-y-8 pb-4">
                    {timelineSteps.map((step, idx) => {
                      const stepStatusNum = statusMap[step.key] || 0;
                      const isCompleted = currentStatusNum >= stepStatusNum;
                      const isActive = order.orderStatus === step.key;

                      return (
                        <div key={idx} className="relative pl-8 text-left">
                          {/* Indicator circle */}
                          <div className={`absolute -left-[15px] top-1 w-7 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-green border-green text-white shadow'
                              : 'bg-white border-slate-200 text-slate-400'
                          } ${isActive ? 'bg-saffron border-saffron animate-pulse text-white scale-115' : ''}`}>
                            {isCompleted ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <span className="text-[10px] font-bold">{idx + 1}</span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <h4 className={`text-sm font-extrabold ${isActive ? 'text-saffron-dark' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.label}
                            </h4>
                            <p className={`text-xs ${isActive ? 'text-slate-600' : isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Help & Support CTA */}
              <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl text-center space-y-4">
                <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">Have Questions Regarding Your Delivery?</p>
                  <p className="text-slate-500 text-xs">Reach our support desk directly on WhatsApp. Pre-filled with order reference.</p>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=Hello%20India%20Jan%20Seva,%20mujhe%20apne%20Order%20ID%20${order.id}%20ki%20details%20chahiye.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 font-bold px-6 py-2.5 rounded-lg text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-green" />
                  <span>Chat Regarding Order {order.id}</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-350 mx-auto" />
              <div>
                <p className="font-bold text-slate-900 text-sm">Order ID Not Found</p>
                <p className="text-slate-500 text-xs mt-1">We couldn't locate any records for the ID <strong>&ldquo;{orderId}&rdquo;</strong>. Please check characters or try another ID.</p>
              </div>
              <Link
                href="/track"
                className="inline-block bg-slate-900 text-white font-bold px-6 py-2 rounded-lg text-xs hover:bg-slate-800 transition-colors"
              >
                Clear Search
              </Link>
            </div>
          )
        ) : (
          <div className="bg-white border border-slate-150 rounded-2xl p-10 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-350 mx-auto" />
            <div>
              <p className="font-bold text-slate-900 text-sm">Ready to Track</p>
              <p className="text-slate-500 text-xs mt-1">Input your order number (for example, try <strong className="text-saffron select-all font-mono text-sm">IJS-PVC-10258</strong>) to inspect the processing details.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
