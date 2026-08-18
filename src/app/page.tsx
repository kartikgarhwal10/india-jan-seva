import Link from 'next/link';
import Image from 'next/image';
import { getReviews, getProducts } from '@/lib/db';
import HeroSearch from '@/components/HeroSearch';
import CardMockup from '@/components/CardMockup';
import { 
  ShieldCheck, 
  CreditCard, 
  UserCheck, 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  HelpCircle,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  Users,
  Briefcase,
  Compass,
  ArrowRight
} from 'lucide-react';

export default async function HomePage() {
  const reviews = getReviews();
  const pvcProducts = getProducts().slice(0, 3); // top 3 PVC cards to feature

  // Quick Service categories for the bar
  const quickCategories = [
    { title: "Government Services", icon: <ShieldCheck className="w-5 h-5 text-saffron" />, hash: "#gov" },
    { title: "Banking Services", icon: <UserCheck className="w-5 h-5 text-green" />, hash: "#banking" },
    { title: "Recharge & Bills", icon: <CreditCard className="w-5 h-5 text-blue-500" />, hash: "#bills" },
    { title: "PVC Cards", icon: <FileText className="w-5 h-5 text-amber-500" />, hash: "#pvc" },
    { title: "Education", icon: <BookOpen className="w-5 h-5 text-indigo-500" />, hash: "#education" },
    { title: "Business Services", icon: <Briefcase className="w-5 h-5 text-teal-500" />, hash: "#business" }
  ];

  // Banking Services list
  const bankingServices = [
    { name: "AePS Aadhaar Pay", desc: "Cash withdrawal and bank balance check using customer Aadhaar biometric verification." },
    { name: "Account Opening Assistance", desc: "Online guidance to open digital savings or current accounts with banking partners." },
    { name: "Domestic Money Transfer (DMT)", desc: "Instant money transfers to any bank account across India 24/7." },
    { name: "Kiosk Banking / CSP Setup", desc: "Detailed support and guidance for setting up local customer service kiosk points." },
    { name: "Micro ATM Withdrawal", desc: "Immediate cash withdraw using local debit cards at local service terminals." },
    { name: "Credit Card Applications", desc: "Eligibility checks and online filing support for credit card applications." }
  ];

  // Recharge & Bill Payments list
  const rechargeServices = [
    { name: "Mobile & DTH Recharge", desc: "Prepaid mobile topups and DTH packages recharges for all Indian telecom networks." },
    { name: "Electricity Bill Pay", desc: "Online utility bill payments for state electricity boards with instant receipts." },
    { name: "LPG Cooking Gas Bill", desc: "Online booking and payments for cylinder refilling services (Indane, HP, Bharat)." },
    { name: "LIC Premium Payments", desc: "Secure online payment facilitation for Life Insurance Corporation of India policies." },
    { name: "FASTag Recharge", desc: "Instant tollway tag balances recharge using secure net banking channels." },
    { name: "Water & Broadband Bills", desc: "Online payment for Municipal water boards and home broadband networks bills." }
  ];

  // Government & Citizen Services list
  const govServices = [
    { name: "Aadhaar Card Assistance", desc: "Filing address change requests, downloading digital copies, and verifying biometrics." },
    { name: "PAN Card Registration", desc: "Filing new Permanent Account Number applications and name/photo corrections." },
    { name: "Voter ID Card EPIC support", desc: "Assisting with new voter lists registration, address updates, and card replacements." },
    { name: "Driving Licence Online Help", desc: "Assisting with learner licence bookings, DL renewals, and appointment updates." },
    { name: "Administrative Certificates", desc: "Filing applications for State Income, Caste, and Domicile (Nivas) certificates." },
    { name: "Ayushman PMJAY Health Card", desc: "Assisting with beneficiary registration under the National Health Scheme (₹5 Lakh cover)." }
  ];

  // Business & Tax Services list
  const businessServices = [
    { name: "GST Registration Assistance", desc: "Filing new Goods & Services Tax registration details and business profile updates." },
    { name: "GST Return filing support", desc: "Administrative assistance compiling local sales ledger inputs for GST returns." },
    { name: "ITR Filing guidance", desc: "Income Tax Return forms selection, filing help, and refund checking facilitation." },
    { name: "MSME / Udyam Certification", desc: "Applying for government micro-business registration certificates online." },
    { name: "FSSAI Food License help", desc: "Assisting local grocery stores, restaurants, and startups with FSSAI certifications." },
    { name: "Business Entity Setup", desc: "Filing support for partnership deeds, sole proprietorship declarations, and registrations." }
  ];

  // Travel Services list
  const travelServices = [
    { name: "Train Ticket Booking assistance", desc: "Portal booking help for railway reservation seats via authorized channels." },
    { name: "Bus Booking online", desc: "Assisting with private and state transport express bus seat selections." },
    { name: "Flight Booking support", desc: "Domestic and international flight seat queries and boarding pass prints." },
    { name: "Hotel Booking guidance", desc: "Assisting corporate clients and tourists with secure local room bookings." }
  ];

  // State presence list
  const statesList = [
    "Uttar Pradesh", "Bihar", "Rajasthan", "Madhya Pradesh", 
    "Maharashtra", "West Bengal", "Telangana", "Gujarat"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
           {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] w-full overflow-hidden bg-[#070f1e] flex items-center pt-32 pb-20">
        {/* Subtle color blob backdrops */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center space-y-8">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-amber-100 text-[#ea580c] border border-amber-200/50 animate-pulse shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
              INDIA JAN SEVA
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] leading-tight tracking-tight max-w-4xl mx-auto">
              Your Trusted Digital Service & Citizen Assistance Centre
            </h1>
            
            <p className="text-[#E5E7EB] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Access essential digital, government assistance, banking, documentation, education, travel and PVC smart card printing services from one convenient, secure platform.
            </p>
          </div>

          {/* Interactive Search Component */}
          <HeroSearch />

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#services"
              className="inline-flex items-center space-x-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </a>
            
            <Link
              href="/pvc-cards"
              className="inline-flex items-center space-x-2 bg-[#0F172A]/85 border border-white/25 hover:border-white/40 hover:bg-[#0F172A] text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md"
            >
              <CreditCard className="w-4.5 h-4.5 text-saffron shrink-0" />
              <span>Order PVC Card</span>
            </Link>

            <Link
              href="/track"
              className="inline-flex items-center space-x-2 bg-[#0F172A]/85 border border-white/25 hover:border-white/40 hover:bg-[#0F172A] text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md"
            >
              <span>Track Order Status</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. QUICK SERVICE CATEGORY BAR */}
      <section className="bg-[#070f1e] border-y border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickCategories.map((qc, idx) => (
              <a
                key={idx}
                href={qc.hash}
                className="bg-[#0F172A] border border-white/15 hover:border-saffron/40 hover:bg-[#1e293b] p-4 rounded-xl flex items-center justify-between text-left group transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="w-8.5 h-8.5 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-850 shadow-inner group-hover:scale-105 transition-transform">
                    {qc.icon}
                  </div>
                  <h3 className="text-xs font-black text-white leading-snug pr-1">{qc.title}</h3>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#CBD5E1] group-hover:text-saffron transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT INDIA JAN SEVA */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual block */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-gradient-to-tr from-navy to-indigo-900 flex flex-col justify-between p-8 text-white text-left">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-saffron">Citizen First</span>
                  <h4 className="text-2xl font-black">India Jan Seva Platform</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Designed to simplify complex registration portals and print services, delivering hard copies directly to citizens.
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs text-saffron font-bold">
                  <span>Transparency • Security</span>
                  <span className="bg-green/10 text-green border border-green/30 px-2 py-0.5 rounded text-[10px]">Verified Desk</span>
                </div>
              </div>
            </div>

            {/* Content block */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-black text-[#F97316] tracking-widest uppercase">About India Jan Seva</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Making Digital Services Simple & Accessible
              </h2>
              
              <div className="space-y-4 text-[#475569] leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>India Jan Seva</strong> is a digital service platform designed to make essential digital, documentation, government assistance, banking, education and citizen services more convenient and accessible. We bridge the technological gap for citizens, allowing everyone to securely apply for documents and recharges online.
                </p>
                <p>
                  We are committed to delivering <strong>Convenience, Accessibility, Transparency,</strong> and robust local customer support. Your security is paramount to us, which is why we handle all identity document uploads with industry-standard privacy protocols and clear retention schedules.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-x-8 gap-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Core Focus</span>
                  <span className="text-xs font-bold text-slate-800">Direct Citizen Assistance</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Card Printing</span>
                  <span className="text-xs font-bold text-slate-800">Dye-Sublimation PVC</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Support Availability</span>
                  <span className="text-xs font-bold text-green">WhatsApp Helpline</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXPANDED SERVICES CATALOG SECTION */}
      <section id="services" className="py-20 bg-slate-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Platform Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Services</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Essential banking, recharge, government, business, and travel assistance services in one secure place.
            </p>
          </div>

          {/* SERVICE GROUP A: GOVERNMENT & CITIZEN SERVICES */}
          <div id="gov" className="space-y-6 text-left scroll-mt-24">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <h3 className="text-xl font-bold text-slate-900">Government & Citizen Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {govServices.map((s, idx) => (
                <div key={idx} className="service-card p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href="/contact" className="text-[10px] font-bold text-saffron-dark hover:text-saffron inline-flex items-center space-x-1 uppercase tracking-wider">
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE GROUP B: BANKING SERVICES */}
          <div id="banking" className="space-y-6 text-left scroll-mt-24">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <UserCheck className="w-5 h-5 text-green" />
              <h3 className="text-xl font-bold text-slate-900">Banking & CSP Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bankingServices.map((s, idx) => (
                <div key={idx} className="service-card p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href="/contact" className="text-[10px] font-bold text-saffron-dark hover:text-saffron inline-flex items-center space-x-1 uppercase tracking-wider">
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE GROUP C: RECHARGE & BILL PAYMENTS */}
          <div id="bills" className="space-y-6 text-left scroll-mt-24">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-bold text-slate-900">Recharge & Bill Payments</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rechargeServices.map((s, idx) => (
                <div key={idx} className="service-card p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href="/contact" className="text-[10px] font-bold text-saffron-dark hover:text-saffron inline-flex items-center space-x-1 uppercase tracking-wider">
                    <span>Pay Bill Online</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE GROUP D: BUSINESS & TAX SERVICES */}
          <div id="business" className="space-y-6 text-left scroll-mt-24">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <Briefcase className="w-5 h-5 text-teal-500" />
              <h3 className="text-xl font-bold text-slate-900">Business & Tax Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessServices.map((s, idx) => (
                <div key={idx} className="service-card p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href="/contact" className="text-[10px] font-bold text-saffron-dark hover:text-saffron inline-flex items-center space-x-1 uppercase tracking-wider">
                    <span>Filing Support</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE GROUP E: TRAVEL SERVICES */}
          <div id="travel" className="space-y-6 text-left scroll-mt-24">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <Compass className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl font-bold text-slate-900">Travel Booking Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelServices.map((s, idx) => (
                <div key={idx} className="service-card p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href="/contact" className="text-[10px] font-bold text-saffron-dark hover:text-saffron inline-flex items-center space-x-1 uppercase tracking-wider">
                    <span>Book Seats</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. PVC SMART CARDS SECTIONS */}
      <section id="pvc" className="py-20 bg-white scroll-mt-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">E-Commerce Printing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Premium PVC Cards</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Durable • Professional • Convenient. Get your wallet plastic card printed with official colors starting at ₹149.
            </p>
          </div>

          {/* Visual featured cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pvcProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-slate-50 rounded-2xl border border-slate-200/50 shadow-card overflow-hidden flex flex-col justify-between text-left"
              >
                <div className="p-5 bg-white flex items-center justify-center h-48 border-b border-slate-200/30">
                  <CardMockup cardId={p.id} name="PREVIEW HOLDER" interactive={true} />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base">{p.name}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/30 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase leading-none">Starting Price</span>
                      <span className="text-lg font-black text-slate-900">₹{p.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold leading-none">Required Document</span>
                      <span className="font-bold text-slate-700">{p.requiredDocument}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a
                      href={`https://wa.me/919876543210?text=Hello%2520India%2520Jan%2520Seva%2C%2520mujhe%2520${encodeURIComponent(p.name)}%2520order%2520karna%2520hai.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-50 border border-green-200 text-green-700 font-bold py-2 rounded-lg text-xs hover:bg-green-100 transition-colors text-center"
                    >
                      WhatsApp
                    </a>
                    
                    <Link
                      href={`/order?cardId=${p.id}`}
                      className="bg-saffron hover:bg-saffron-dark text-white font-bold py-2 rounded-lg text-xs shadow-md text-center transform hover:-translate-y-0.5 transition-all"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/pvc-cards"
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-850 text-white font-bold px-8 py-3 rounded-lg text-xs shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>View All PVC Cards Catalog</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Operations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How It Works</h2>
            <p className="text-slate-400 text-xs sm:text-sm">We provide assistance through a simple 4-step digital workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { num: "01", title: "Choose a Service", desc: "Select government, banking, travel or PVC card option from catalog." },
              { num: "02", title: "Submit Details", desc: "Upload scanned copies or key-in requested registration parameters." },
              { num: "03", title: "Complete Payment / Enquiry", desc: "Pay printing fees securely online or submit an assistance enquiry request." },
              { num: "04", title: "Get Service Assistance", desc: "Our operators inspect, process files, print cards and dispatch/provide updates." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 relative group">
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] right-[-40%] h-[2px] bg-slate-800 z-0"></div>
                )}
                <div className="w-14 h-14 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-lg text-saffron group-hover:bg-saffron group-hover:text-white transition-all relative z-10">
                  {step.num}
                </div>
                <h3 className="font-extrabold text-sm text-white">{step.title}</h3>
                <p className="text-slate-450 text-[11px] leading-relaxed max-w-[170px]">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. STATE/INDIA PRESENCE */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Service Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Serving Citizens Across India</h2>
            <p className="text-slate-500 text-sm">
              We facilitate online digital citizen registrations and card printing deliveries nationally.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statesList.map((state, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 rounded-xl border border-slate-200/50 shadow-card text-center font-bold text-xs text-slate-700 hover:text-saffron-dark transition-colors"
              >
                {state}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400">
            *Note: India Jan Seva is a concept demo platform. Service availability, local guidelines and logistics shipping rates may vary by location.
          </p>

        </div>
      </section>

      {/* 8. REGISTRATION / PARTNER CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="bg-saffron text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Partner Network</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Start Your Digital Service Journey</h2>
          <p className="text-slate-350 max-w-xl mx-auto text-xs sm:text-sm">
            Interested in becoming a service partner? Expand digital services, utility bookings, and PVC prints to your local rural store customers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link
              href="/contact"
              className="bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3 rounded-lg text-xs shadow-md transition-colors"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold px-8 py-3 rounded-lg text-xs transition-colors"
            >
              Learn More
            </Link>
          </div>
          <p className="text-[9px] text-slate-500 italic">This is a concept demo onboarding feature for partner network simulation.</p>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Benefits</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Choose India Jan Seva?</h2>
            <p className="text-slate-500 text-sm">We provide secure assistance through citizen-first priorities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Convenient", desc: "Access essential digital and government portal assistance in one place." },
              { title: "Trusted Assistance", desc: "Experienced operators checking parameters to minimize certificate filing rejections." },
              { title: "Secure", desc: "Responsible, encrypted handling of client uploads with systematic deletion policies." },
              { title: "Easy Process", desc: "Simple order forms, clear upload buttons, and Razorpay payment checkout." },
              { title: "Local Support", desc: "Accessible WhatsApp support lines for orders verification status updates." },
              { title: "Digital First", desc: "Modern digital workflow built to support desktop and mobile browser screens." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 text-left space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-inner">
                  <CheckCircle className="w-4.5 h-4.5 text-saffron" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Customers Say</h2>
            <p className="text-slate-500 text-sm">All testimonials are generated for conceptual presentation checks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200/40 text-left flex flex-col justify-between shadow-card">
                <div>
                  <div className="flex text-amber-500 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs italic mb-6 leading-relaxed">&ldquo;{rev.review}&rdquo;</p>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-xs">{rev.customerName} <span className="text-[9px] text-slate-400 font-semibold">(Demo Review)</span></span>
                  <span className="text-[9px] font-bold text-slate-450 bg-slate-100 px-2 py-0.5 rounded">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto text-left space-y-4">
            {[
              {
                q: "What services does India Jan Seva provide?",
                a: "India Jan Seva provides administrative assistance, documentation, and filing support for central/state portals (PAN card, Voter ID, Aadhaar updates), kiosk banking assistance, utilities bill payments, and premium PVC smart card printing."
              },
              {
                q: "How can I order a PVC smart card?",
                a: "Simply browse our PVC Cards catalog, select the card type (PAN, DL, Voter, etc.), fill in your shipping details, upload a clean copy of the document file, and complete the simulated Razorpay check-out to get your Order ID."
              },
              {
                q: "How can I track my order status?",
                a: "Navigate to our Track Order page, input your generated Order ID (e.g. IJS-PVC-10258), and click Track Order. The vertical timeline will display processing and shipping status stages."
              },
              {
                q: "What documents are required for printing?",
                a: "We require clear, high-resolution PDF or image scans of the original identity file. Clear scans prevent barcodes or chips from printing blurry, ensuring complete verification success in physical wallet use."
              },
              {
                q: "Are all services available in every location?",
                a: "Yes, online support and PVC card printing orders are available for All India delivery. Specific local CSP kiosk banking or state-level certificates may vary depending on regional regulations."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-start space-x-2">
                  <HelpCircle className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. CONTACT & MAP SECTION */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron tracking-widest uppercase">Support Desk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Need Assistance?</h2>
            <p className="text-slate-500 text-sm">Submit an enquiry or consult our support operators.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            {/* Contacts details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200/50 space-y-5 text-xs text-slate-650">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Center Location</h4>
                    <p className="text-slate-500 mt-1">102 Citizen Tower, Gomti Nagar, Lucknow, Uttar Pradesh - 226010 (Demo Location)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">WhatsApp Helpline</h4>
                    <p className="text-slate-500 mt-1">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-slate-450 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                    <p className="text-slate-500 mt-1">support@indiajanseva.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                    <p className="text-slate-500 mt-1">Monday – Saturday: 9:00 AM – 7:00 PM (Sunday Closed)</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.839818818816!2d81.53696515!3d27.17326885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999e23eb0000001%3A0xe54e60ea9b433cfb!2sJarwal%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="India Jan Seva Center Location"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/50 shadow-card">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Send Administrative Enquiry</h3>
              <form className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-250 rounded-lg px-4 py-2.5" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-250 rounded-lg px-4 py-2.5" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-250 rounded-lg px-4 py-2.5" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Message Description</label>
                  <textarea rows={5} className="w-full bg-slate-50 border border-slate-250 rounded-lg px-4 py-2.5" required></textarea>
                </div>
                <button type="submit" className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry Form</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
