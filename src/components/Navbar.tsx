'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, CreditCard, User, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'PVC Cards', href: '/pvc-cards' },
    { name: 'Banking', href: '/services#banking' },
    { name: 'Education', href: '/services#education' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. SLIM TOP UTILITY BAR */}
      <div className="bg-navy-dark text-slate-400 text-[11px] py-2 border-b border-slate-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <span className="font-semibold text-slate-300">Welcome to India Jan Seva</span>
            <span className="mx-2 text-slate-700">|</span>
            <span className="text-slate-400">Your Trusted Digital & Citizen Assistance Centre</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="tel:+919876543210" className="flex items-center space-x-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-saffron" />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-md py-3.5 shadow-md'
            : 'bg-slate-900/90 border-b border-slate-800/20 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Treatment */}
            <Link href="/" className="flex items-center space-x-3 text-left group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-saffron to-amber-500 flex items-center justify-center font-black text-white text-base shadow shadow-saffron/20 group-hover:scale-105 transition-transform duration-200">
                IJS
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-wide leading-none group-hover:text-saffron transition-colors">
                  INDIA JAN SEVA
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  Citizen Digital Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-saffron ${
                    isActive(link.href)
                      ? 'text-saffron border-b border-saffron pb-1'
                      : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Action CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Operator Login</span>
              </Link>
              <span className="text-slate-800 font-light">|</span>
              <Link
                href="/order"
                className="flex items-center space-x-1.5 bg-saffron hover:bg-saffron-dark text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Order PVC Card</span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-350 hover:text-white focus:outline-none p-1.5 hover:bg-slate-800/40 rounded-lg transition-colors"
                aria-label="Toggle navigation drawer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 pt-24 flex flex-col px-6">
            <nav className="flex flex-col space-y-5 text-center mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-bold uppercase tracking-wider ${
                    isActive(link.href) ? 'text-saffron' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto mb-16 flex flex-col space-y-4 items-center">
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 text-white w-full py-3 rounded-xl font-bold text-xs"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Operator Portal Login</span>
              </Link>

              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 bg-saffron hover:bg-saffron-dark text-white w-full py-3.5 rounded-xl font-extrabold text-xs shadow-lg"
              >
                <CreditCard className="w-4.5 h-4.5" />
                <span>Order PVC Card</span>
              </Link>
            </div>
          </div>
        )}

      </header>
    </div>
  );
}
