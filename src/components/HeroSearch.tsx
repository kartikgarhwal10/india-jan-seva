'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const allServices = [
  // Government
  { name: 'Aadhaar Card Address Update Assistance', category: 'gov', hash: '#gov' },
  { name: 'PAN Card Registration & Corrections', category: 'gov', hash: '#gov' },
  { name: 'Voter ID Card Registration', category: 'gov', hash: '#gov' },
  { name: 'Driving Licence Online Appointment', category: 'gov', hash: '#gov' },
  { name: 'Income Certificate Application', category: 'gov', hash: '#gov' },
  { name: 'Domicile Domiciliary Certificate', category: 'gov', hash: '#gov' },
  { name: 'Caste Certificate Category Filing', category: 'gov', hash: '#gov' },
  { name: 'Ayushman Bharat Card PMJAY Health', category: 'gov', hash: '#gov' },
  { name: 'Passport Appointment Booking Support', category: 'gov', hash: '#gov' },
  
  // Banking
  { name: 'AePS Aadhaar Enabled Payment System', category: 'banking', hash: '#banking' },
  { name: 'Kiosk Banking CSP Registration Support', category: 'banking', hash: '#banking' },
  { name: 'Aadhaar Pay merchant setup', category: 'banking', hash: '#banking' },
  { name: 'Instant Money Transfer DMT services', category: 'banking', hash: '#banking' },
  { name: 'Savings Account Opening Assistance', category: 'banking', hash: '#banking' },
  { name: 'Micro ATM Cash Withdrawal services', category: 'banking', hash: '#banking' },
  
  // Recharges & bills
  { name: 'Electricity Power Bill Payment online', category: 'bills', hash: '#bills' },
  { name: 'LPG Cooking Gas Refill Booking', category: 'bills', hash: '#bills' },
  { name: 'LIC Life Insurance Premium payment', category: 'bills', hash: '#bills' },
  { name: 'FASTag recharge services', category: 'bills', hash: '#bills' },
  { name: 'Water bill payment online', category: 'bills', hash: '#bills' },
  
  // Business
  { name: 'GST Registration Application filing', category: 'business', hash: '#business' },
  { name: 'ITR Income Tax Return filing assistance', category: 'business', hash: '#business' },
  { name: 'MSME Udyam Registration online certificate', category: 'business', hash: '#business' },
  { name: 'FSSAI Food Licence application help', category: 'business', hash: '#business' }
];

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ name: string; category: string; hash: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (val.trim().length > 1) {
      const filtered = allServices.filter(s => 
        s.name.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleResultClick = (hash: string) => {
    setIsOpen(false);
    setQuery('');
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerScrollTo = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto z-40">
      
      {/* Search Input Bar */}
      <div className="relative shadow-lg rounded-2xl bg-white border border-slate-200">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search for a service... (e.g. PAN Card, AePS, Electricity Bill)"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 bg-white"
        />
      </div>

      {/* Auto suggestions overlay */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-left z-50">
          <ul className="divide-y divide-slate-100">
            {results.map((res, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleResultClick(res.hash)}
                  className="w-full px-5 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
                >
                  <div className="flex flex-col">
                    <span>{res.name}</span>
                    <span className="text-[9px] text-saffron uppercase font-bold tracking-wider mt-0.5">{res.category} assistance</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-450 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick click suggestions */}
      <div className="flex flex-wrap gap-2 justify-center mt-3 text-[11px] font-bold text-slate-400">
        <span>Popular:</span>
        <button onClick={() => triggerScrollTo('#gov')} className="text-saffron hover:underline">PAN Card</button>
        <span>•</span>
        <button onClick={() => triggerScrollTo('#banking')} className="text-saffron hover:underline">AePS Banking</button>
        <span>•</span>
        <button onClick={() => triggerScrollTo('#bills')} className="text-saffron hover:underline">Electricity Bill</button>
        <span>•</span>
        <button onClick={() => triggerScrollTo('#pvc')} className="text-saffron hover:underline">PVC Cards</button>
      </div>

    </div>
  );
}
