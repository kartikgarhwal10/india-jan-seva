import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Foot grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-left">
          
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
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Your Trusted Digital Service & Citizen Assistance Centre. We make essential digital, documentation, government assistance, banking, education and citizen services more convenient and accessible.
            </p>

            <div className="flex items-center space-x-2.5 bg-slate-905 border border-slate-800 rounded-lg p-2.5 max-w-xs">
              <ShieldCheck className="w-6 h-6 text-saffron shrink-0" />
              <div className="text-[10px] leading-snug">
                <p className="font-bold text-white uppercase tracking-wider">Citizen Assistance</p>
                <p className="text-slate-400">Portal filing & print facilitation</p>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services#gov" className="hover:text-saffron transition-colors">
                  Government Services
                </Link>
              </li>
              <li>
                <Link href="/services#banking" className="hover:text-saffron transition-colors">
                  Banking & AEPS
                </Link>
              </li>
              <li>
                <Link href="/services#bills" className="hover:text-saffron transition-colors">
                  Utility Bill Payments
                </Link>
              </li>
              <li>
                <Link href="/pvc-cards" className="hover:text-saffron transition-colors">
                  PVC Smart Cards
                </Link>
              </li>
              <li>
                <Link href="/services#education" className="hover:text-saffron transition-colors">
                  Education Services
                </Link>
              </li>
              <li>
                <Link href="/services#business" className="hover:text-saffron transition-colors">
                  Business & Tax
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-saffron transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-saffron transition-colors">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="hover:text-saffron transition-colors">
                  Blogs & Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-saffron transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-saffron transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4">
              Support & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#faq" className="hover:text-saffron transition-colors">
                  FAQ Accordion
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-saffron transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-saffron transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="hover:text-saffron transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/shipping" className="hover:text-saffron transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-saffron transition-colors">
                  Detailed Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-900 my-8" />

        {/* Legal Disclaimer */}
        <div className="text-[10px] text-slate-500 mb-8 max-w-7xl leading-relaxed text-left space-y-4">
          <p>
            <strong>Legal Disclaimer:</strong> India Jan Seva is a demo service-platform concept. It should not be represented as a Government of India website or official government portal unless appropriate authorization exists. We facilitate access to public portals for printing and filing facilitation, but we do not issue legal documents or imply official government authorization beyond private print support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© {currentYear} India Jan Seva. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Demo Portal Concept 2026.</p>
        </div>
      </div>
    </footer>
  );
}
