import type { Metadata } from 'next';
import { ShieldCheck, Target, Users, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About India Jan Seva - Digital Citizen Assistance',
  description: 'Learn about the mission, values, and community reach of India Jan Seva. Providing transparent and convenient digital, government, and banking services support.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Years Facilitating Portals', val: '8+' },
    { label: 'PVC Smart Cards Printed', val: '5,000+' },
    { label: 'Demo Support Locations', val: '8 States' },
    { label: 'Customer Satisfaction', val: '99.8%' }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-saffron" />,
      title: "Data Confidentiality",
      desc: "We enforce strict security. Citizen uploads are encrypted during transmission and permanently deleted from our servers upon print order completion."
    },
    {
      icon: <Target className="w-6 h-6 text-green" />,
      title: "Integrity & Transparency",
      desc: "No hidden charges or premium fees. We display service price points clearly, helping citizens apply for recharges and documents securely."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Dedicated Local Helplines",
      desc: "We support our clients through every step of their registration, providing instant transaction receipts and tracking status updates on WhatsApp."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">Our Platform</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            About India Jan Seva
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Making essential documentation, banking, education, and printing services simple, transparent, and accessible.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 text-white p-8 rounded-3xl shadow-lg">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-saffron">{s.val}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Community Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Mission & Community Vision</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>India Jan Seva</strong> is a digital service platform designed to make essential digital, documentation, government assistance, banking, education and citizen services more convenient and accessible. We bridge the technological gap for citizens, allowing everyone to securely apply for documents and recharges online.
              </p>
              <p>
                By building this web ordering desk, we aim to extend our services to citizens across India, offering the same level of trust, speed, and privacy that our local partners have enjoyed. We support a wide network of local entrepreneurs who run Jan Seva Kiosk terminals to assist clients physically in rural and semi-urban districts.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-100/80 flex items-center justify-center shrink-0">
                <Landmark className="w-6 h-6 text-saffron" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Citizen Assistance Portal</h4>
                <p className="text-xs text-slate-500">Helping citizens navigate administrative portals.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-100/80 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Thermal Smart Card Printers</h4>
                <p className="text-xs text-slate-500">ATM-standard CR-80 plastic smart cards.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="space-y-8 border-t border-slate-200/50 pt-16 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Core Pillars</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Providing access to essential services transparently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card text-left space-y-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                  {v.icon}
                </div>
                <h3 className="font-bold text-base text-slate-900">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
