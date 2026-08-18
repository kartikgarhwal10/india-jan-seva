'use client';

import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '919876543210';
  const defaultText = 'Hello India Jan Seva, mujhe PVC Card ke baare mein information chahiye.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-22 md:bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping -z-10 group-hover:hidden"></span>
      
      <Phone className="w-6 h-6 fill-current" />
      
      {/* Hover tooltip label */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 whitespace-nowrap transition-all duration-300 ease-in-out text-sm font-semibold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
