'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, CreditCard, User, HelpCircle, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        // Only trigger if click is not on the hamburger button itself
        const toggleButton = document.getElementById('mobile-menu-toggle');
        if (toggleButton && !toggleButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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

  // Mobile menu links include "Track Order" as well
  const mobileLinks = [
    ...navLinks,
    { name: 'Track Order', href: '/track' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. SLIM TOP UTILITY BAR (High Contrast E5E7EB) */}
      <div className="bg-[#070f1e] text-[#E5E7EB] text-[11px] py-2.5 border-b border-slate-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <span className="font-bold text-white">Welcome to India Jan Seva</span>
            <span className="mx-2 text-slate-650">|</span>
            <span className="text-[#E5E7EB]">Your Trusted Digital & Citizen Assistance Centre</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="tel:+919876543210" className="flex items-center space-x-1.5 hover:text-saffron transition-colors font-bold text-white">
              <Phone className="w-3.5 h-3.5 text-saffron shrink-0" />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <span className="text-slate-650">|</span>
            <Link href="/track" className="hover:text-white transition-colors font-bold text-[#E5E7EB]">Track Order</Link>
            <span className="text-slate-650">|</span>
            <Link href="/contact" className="hover:text-white transition-colors font-bold text-[#E5E7EB]">Contact Support</Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 border-b border-slate-800 backdrop-blur-md py-3.5 shadow-lg'
            : 'bg-slate-950/90 border-b border-slate-900 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-sans">
            
            {/* Logo Treatment (Clearly Visible White & Light Grey) */}
            <Link href="/" className="flex items-center space-x-3 text-left group">
              <div className="w-9.5 h-9.5 rounded-lg bg-gradient-to-tr from-saffron to-amber-500 flex items-center justify-center font-black text-white text-base shadow shadow-saffron/20 group-hover:scale-105 transition-transform duration-200">
                IJS
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-wide leading-none group-hover:text-saffron transition-colors">
                  INDIA JAN SEVA
                </span>
                <span className="text-[9px] font-extrabold text-slate-350 tracking-wider uppercase mt-1 leading-tight">
                  Digital Services • Government Assistance • Banking • PVC Cards
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (High Contrast #E5E7EB, Orange Active, White Hover) */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-black uppercase tracking-wider transition-colors hover:text-white ${
                    isActive(link.href)
                      ? 'text-saffron border-b-2 border-saffron pb-1'
                      : 'text-[#E5E7EB]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Action CTAs (High Contrast White Text) */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-1.5 text-xs font-black text-slate-200 hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-saffron shrink-0" />
                <span>Operator Login</span>
              </Link>
              <span className="text-slate-800 font-light">|</span>
              <Link
                href="/order"
                className="flex items-center space-x-1.5 bg-saffron hover:bg-saffron-dark text-white text-xs font-black px-4.5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Order PVC Card</span>
              </Link>
            </div>

            {/* Mobile menu hamburger toggle button */}
            <div className="lg:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-saffron focus:outline-none p-2 hover:bg-slate-900 rounded-lg transition-colors border border-slate-800"
                aria-label="Toggle navigation drawer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer (Full Screen Drawer, high contrast) */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/98 pt-24 flex flex-col px-6 border-l border-slate-900 animate-fade-in">
            <div ref={drawerRef} className="flex flex-col h-full">
              
              {/* Mobile Drawer Close Helper bar */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation Portal</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-saffron font-bold flex items-center space-x-1"
                >
                  <X className="w-4.5 h-4.5" />
                  <span>Close</span>
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col space-y-4.5 text-left mt-6 overflow-y-auto max-h-[50vh] pr-2">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-black uppercase tracking-wide flex items-center justify-between py-2 border-b border-slate-900/50 ${
                      isActive(link.href) ? 'text-saffron' : 'text-[#E5E7EB]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Link>
                ))}
              </nav>
              
              {/* CTAs at Bottom */}
              <div className="mt-auto mb-16 flex flex-col space-y-4">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 text-white w-full py-3.5 rounded-xl font-bold text-xs"
                >
                  <User className="w-4 h-4 text-saffron" />
                  <span>Operator Portal Login</span>
                </Link>

                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-saffron hover:bg-saffron-dark text-white w-full py-4 rounded-xl font-black text-xs shadow-lg"
                >
                  <CreditCard className="w-4.5 h-4.5" />
                  <span>Order PVC Card</span>
                </Link>
              </div>

            </div>
          </div>
        )}

      </header>
    </div>
  );
}
