'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Link from 'next/link';
import { Home, Grid, CreditCard, Search, MessageSquare } from 'lucide-react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-0 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />

      {/* Mobile Sticky Bottom Navigation (lg:hidden block) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/98 border-t border-slate-900 shadow-2xl px-2 py-2.5 flex justify-around items-center lg:hidden font-sans">
        <Link 
          href="/" 
          className={`flex flex-col items-center space-y-0.5 text-[9px] uppercase tracking-wide font-black ${
            pathname === '/' ? 'text-saffron' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        
        <Link 
          href="/services" 
          className={`flex flex-col items-center space-y-0.5 text-[9px] uppercase tracking-wide font-black ${
            pathname.startsWith('/services') ? 'text-saffron' : 'text-slate-400'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Services</span>
        </Link>

        <Link 
          href="/pvc-cards" 
          className={`flex flex-col items-center space-y-0.5 text-[9px] uppercase tracking-wide font-black ${
            pathname.startsWith('/pvc-cards') ? 'text-saffron' : 'text-slate-400'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>PVC Cards</span>
        </Link>

        <Link 
          href="/track" 
          className={`flex flex-col items-center space-y-0.5 text-[9px] uppercase tracking-wide font-black ${
            pathname.startsWith('/track') ? 'text-saffron' : 'text-slate-400'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Track</span>
        </Link>

        <a 
          href="https://wa.me/919876543210?text=Hello%20India%20Jan%20Seva,%20mujhe%20PVC%20Card%20ya%20service%20ke%20baare%20mein%20information%20chahiye."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center space-y-0.5 text-[9px] uppercase tracking-wide font-black text-slate-400 hover:text-green-500"
        >
          <MessageSquare className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
