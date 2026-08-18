'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Accordion state for mobile screens
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    services: false,
    quickLinks: false,
    support: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-slate-950 text-[#E5E7EB] border-t border-slate-900 pt-16 pb-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Foot grids */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-saffron to-orange-600 flex items-center justify-center font-black text-white text-sm">
                IJS
              </div>
              <span className="text-lg font-black text-white tracking-wide">
                INDIA JAN SEVA
              </span>
            </Link>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
              Your Trusted Digital Service & Citizen Assistance Centre. We make essential digital, documentation, government assistance, banking, education and citizen services more convenient and accessible.
            </p>

            <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-800 rounded-lg p-2.5 max-w-xs">
              <ShieldCheck className="w-6 h-6 text-saffron shrink-0" />
              <div className="text-[10px] leading-snug">
                <p className="font-bold text-white uppercase tracking-wider">Citizen Assistance</p>
                <p className="text-slate-350">Portal filing & print facilitation</p>
              </div>
            </div>
          </div>

          {/* Column 2: Services (Collapsible on Mobile) */}
          <div className="border-b border-slate-900 lg:border-none pb-4 lg:pb-0">
            <button 
              onClick={() => toggleSection('services')}
              className="w-full flex justify-between items-center lg:block text-left text-xs font-black text-white tracking-widest uppercase mb-2 lg:mb-4 py-2 lg:py-0 focus:outline-none"
            >
              <span>Services Catalog</span>
              <span className="lg:hidden">
                {openSections.services ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </span>
            </button>
            
            <ul className={`space-y-2.5 text-xs lg:block ${openSections.services ? 'block' : 'hidden'}`}>
              <li>
                <Link href="/services#gov" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Government Services
                </Link>
              </li>
              <li>
                <Link href="/services#banking" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Banking & AEPS
                </Link>
              </li>
              <li>
                <Link href="/services#bills" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Utility Bill Payments
                </Link>
              </li>
              <li>
                <Link href="/pvc-cards" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  PVC Smart Cards
                </Link>
              </li>
              <li>
                <Link href="/services#education" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Education Services
                </Link>
              </li>
              <li>
                <Link href="/services#business" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Business & Tax
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (Collapsible on Mobile) */}
          <div className="border-b border-slate-900 lg:border-none pb-4 lg:pb-0">
            <button 
              onClick={() => toggleSection('quickLinks')}
              className="w-full flex justify-between items-center lg:block text-left text-xs font-black text-white tracking-widest uppercase mb-2 lg:mb-4 py-2 lg:py-0 focus:outline-none"
            >
              <span>Quick Links</span>
              <span className="lg:hidden">
                {openSections.quickLinks ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </span>
            </button>
            
            <ul className={`space-y-2.5 text-xs lg:block ${openSections.quickLinks ? 'block' : 'hidden'}`}>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Blogs & Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal (Collapsible on Mobile) */}
          <div className="border-b border-slate-900 lg:border-none pb-4 lg:pb-0">
            <button 
              onClick={() => toggleSection('support')}
              className="w-full flex justify-between items-center lg:block text-left text-xs font-black text-white tracking-widest uppercase mb-2 lg:mb-4 py-2 lg:py-0 focus:outline-none"
            >
              <span>Support & Legal</span>
              <span className="lg:hidden">
                {openSections.support ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </span>
            </button>
            
            <ul className={`space-y-2.5 text-xs lg:block ${openSections.support ? 'block' : 'hidden'}`}>
              <li>
                <Link href="/#faq" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  FAQ Accordion
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/shipping" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="text-slate-300 hover:text-saffron transition-colors font-semibold">
                  Detailed Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-900 my-8" />

        {/* Legal Disclaimer (High Contrast Slate-400) */}
        <div className="text-[10px] text-slate-400 mb-8 max-w-7xl leading-relaxed text-left space-y-4">
          <p>
            <strong>Legal Disclaimer:</strong> India Jan Seva is a demo service-platform concept. It should not be represented as a Government of India website or official government portal unless appropriate authorization exists. We facilitate access to public portals for printing and filing facilitation, but we do not issue legal documents or imply official government authorization beyond private print support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-semibold">
          <p>© {currentYear} India Jan Seva. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Demo Portal Concept 2026.</p>
        </div>
      </div>
    </footer>
  );
}
