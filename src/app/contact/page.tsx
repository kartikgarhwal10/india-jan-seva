import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - India Jan Seva Support Desk',
  description: 'Get in touch with India Jan Seva operators. Find support phone numbers, WhatsApp helplines, working hours, and physical branch directions.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-saffron tracking-widest uppercase">Support Desk</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Contact India Jan Seva
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Have questions regarding document printing, recharges, or portal support? Reach out to us.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-card space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                Branch Location & Helpline
              </h3>

              <div className="space-y-4 text-xs text-slate-650">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Center Address</h4>
                    <p className="text-slate-500 mt-1">102 Citizen Tower, Gomti Nagar, Lucknow, Uttar Pradesh - 226010 (Demo Branch)</p>
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
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Support Email</h4>
                    <p className="text-slate-500 mt-1">support@indiajanseva.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Center Hours</h4>
                    <p className="text-slate-500 mt-1">Monday – Saturday: 9:00 AM – 7:00 PM (Sunday Closed)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embed Map */}
            <div className="w-full h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.839818818816!2d81.53696515!3d27.17326885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999e23eb0000001%3A0xe54e60ea9b433cfb!2sJarwal%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="India Jan Seva Location Map"
              ></iframe>
            </div>
          </div>

          {/* Form (Right) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-card text-left space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Send enquiry message</h3>
              <p className="text-slate-500 text-xs">Fill out the fields below, and our operators will review your request.</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-saffron"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-saffron"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. GST Registration help"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-saffron"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Message details</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what welfare service or document you require help with..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-saffron"
                  required
                ></textarea>
              </div>

              <div className="bg-slate-50 p-3.5 border border-slate-200/50 rounded-xl text-[10px] text-slate-500 flex items-start space-x-2 leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy Note:</strong> All information submitted is transmitted securely and is only accessible by center operators. We do not sell or share citizen data with third parties.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Send Online Enquiry</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
