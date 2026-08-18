import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CreditCard, 
  UserCheck, 
  BookOpen, 
  Phone, 
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services Directory - India Jan Seva Portal Assistance',
  description: 'Detailed lists of services facilitated by India Jan Seva: Central and State government welfare enrollment support, kiosk banking assistance, utilities recharges, and PVC printing.',
};

export default function ServicesPage() {
  
  const sections = [
    {
      id: 'gov',
      title: 'Government & Citizen Services',
      icon: <ShieldCheck className="w-6 h-6 text-saffron" />,
      desc: 'We assist citizens with accessing and submitting forms on official administrative portals, simplifying the process of updating details and verifying credentials.',
      services: [
        'Aadhaar Portal Assistance (Address updates, download checks)',
        'PAN Card Applications & Correction forms filing support',
        'Voter ID EPIC Registration and duplicate print requests',
        'PM-Kisan Nidhi Registration & status verification help',
        'E-Shram National Worker Database online enrollment',
        'Pension Schemes Assistance (Old age, widow, disabled)'
      ]
    },
    {
      id: 'banking',
      title: 'Banking & Kiosk CSP Services',
      icon: <UserCheck className="w-6 h-6 text-green" />,
      desc: 'Assisting citizens and local store operators with digital banking portal setup, instant domestic money transfers, and cash withdrawal terminals configuration.',
      services: [
        'AePS (Aadhaar Enabled Payment System) withdrawal support',
        'Savings Account Opening assistance with partner banks',
        'Domestic Money Transfer (DMT) instant setup guidance',
        'Kiosk Banking / CSP (Customer Service Point) setup support',
        'Micro ATM configuration and cash withdrawal help',
        'Credit Card & Loan Application filing assistance'
      ]
    },
    {
      id: 'bills',
      title: 'Recharge & Bill Payments',
      icon: <CreditCard className="w-6 h-6 text-blue-500" />,
      desc: 'Secure payment facilitation for monthly utilities, recharges, and premium payouts. Receive instant digital transaction receipts on every payment.',
      services: [
        'Prepaid Mobile & DTH package recharges',
        'Electricity Bill Payments for all major state boards',
        'LPG Cooking Gas booking and online payment',
        'LIC (Life Insurance Corporation) premium payment help',
        'FASTag Recharge and account configuration',
        'Broadband, Landline, and Municipal Water bill payments'
      ]
    },
    {
      id: 'pvc',
      title: 'PVC Smart Card Printing',
      icon: <CreditCard className="w-6 h-6 text-amber-500" />,
      desc: 'Fast thermal smart card printing on heavy-duty PVC plastic. We format files to standard wallet sizes, producing crisp text and scannable barcode/QR details.',
      services: [
        'PAN PVC Card printing (ATM-size thermal overlay)',
        'Voter ID EPIC PVC Card printing',
        'Ayushman PM-JAY Health Cover Card printing',
        'Driving Licence (DL) smart card format printing',
        'Vehicle Registration Certificate (RC) card printing',
        'ABHA Health ID & E-Shram PVC cards printing'
      ],
      action: { label: 'Browse PVC Catalog', href: '/pvc-cards' }
    },
    {
      id: 'education',
      title: 'Student Education & Scholarships',
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      desc: 'Student admissions support, exam fee filing assistance, and scholarship registrations. We guide students to ensure zero mistakes on forms.',
      services: [
        'UP Scholarship portal filings and document formatting',
        'Online College & School Admission forms support',
        'Board & Competitive Exam registration forms help',
        'Student ID Card design & PVC card printing',
        'Online Results verification & printouts support',
        'Basic Digital Literacy and training support guidance'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">Portal Services</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Our Supported Digital Services
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Convenient assistance for government portals, banking CSP setups, recharges, and standard PVC smart card prints.
          </p>
        </div>

        {/* Dynamic sections */}
        <div className="space-y-12">
          {sections.map((sec) => (
            <div 
              key={sec.id} 
              id={sec.id}
              className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24"
            >
              {/* Info Block (Left) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                  {sec.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-none">{sec.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{sec.desc}</p>
                
                {sec.action ? (
                  <div className="pt-2">
                    <Link
                      href={sec.action.href}
                      className="inline-flex items-center bg-saffron hover:bg-saffron-dark text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-md"
                    >
                      <span>{sec.action.label}</span>
                    </Link>
                  </div>
                ) : (
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/919876543210?text=Hello%2520India%252520Jan%252520Seva%2C%25252520mujhe%25252520${encodeURIComponent(sec.title)}%252520ke%252520baare%252520mein%252520inquiry%252520karni%252520hai.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 font-bold px-6 py-2.5 rounded-lg text-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Bullet list block (Right) */}
              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported Portals & Support Actions</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {sec.services.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/80 border border-slate-200/50 p-3 rounded-lg text-[10px] text-slate-500 leading-normal">
                  📌 <strong>Disclosures:</strong> India Jan Seva facilitates access to public portals. Citizens must possess correct verification credentials (OTP or biometric cards) to log registrations officially. We charge service assistance fees.
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
