'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CreditCard, ChevronRight, MessageSquare } from 'lucide-react';

const slides = [
  {
    title: "Welcome to India Jan Seva",
    subtitle: "Trusted CSC & Digital Services Point",
    description: "Your local hub for government document applications, digital assistance, certificates, and online forms. Serving Harchanda, Jarwal, and Bahraich.",
    primaryCta: "Explore Services",
    primaryHref: "/services",
    secondaryCta: "Order PVC Card",
    secondaryHref: "/pvc-cards",
    gradient: "from-slate-950 via-slate-900 to-slate-950",
    pattern: "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_45%)]"
  },
  {
    title: "Premium PVC Smart Card Printing",
    subtitle: "High-Durability Wallet-Sized Cards",
    description: "Get your PAN, Voter ID, Aadhaar, Driving Licence, or RC printed on high-quality, long-lasting PVC plastic. Fast processing and All India shipping.",
    primaryCta: "Order Smart Card",
    primaryHref: "/pvc-cards",
    secondaryCta: "Track Existing Order",
    secondaryHref: "/track",
    gradient: "from-slate-950 via-indigo-950 to-slate-950",
    pattern: "bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.15),transparent_45%)]"
  },
  {
    title: "Expert Assistance & Quick Processing",
    subtitle: "Say Goodbye to Long Queues",
    description: "Our trained operators assist you with PAN corrections, PM-Kisan verification, Pension applications, and scholarship filings with complete trust and accuracy.",
    primaryCta: "View CSC Services",
    primaryHref: "/services#csc",
    secondaryCta: "WhatsApp Inquiry",
    secondaryHref: "https://wa.me/919876543210?text=Hello%20Unique%20Computer%20Centre,%20mujhe%20digital%20service%20ke%20baare%20mein%20inquiry%20karni%20hai.",
    gradient: "from-slate-950 via-slate-900 to-slate-950",
    pattern: "bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1),transparent_50%)]"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[650px] md:h-[680px] w-full overflow-hidden bg-slate-950 flex items-center pt-16">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      {/* Slides wrapper */}
      <div className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`min-w-full h-full relative flex items-center bg-gradient-to-r ${slide.gradient}`}
          >
            {/* Slide pattern overlay */}
            <div className={`absolute inset-0 ${slide.pattern} opacity-80 pointer-events-none`} />
            
            {/* Grid layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Slide text details */}
              <div className="lg:col-span-7 text-left space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-light text-saffron-dark animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron-dark"></span>
                  {slide.subtitle}
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                  {slide.title}
                </h1>
                
                <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                  {slide.description}
                </p>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-3">
                  <Link
                    href={slide.primaryHref}
                    className="inline-flex items-center space-x-2 bg-saffron hover:bg-saffron-dark text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
                  >
                    <span>{slide.primaryCta}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  
                  {slide.secondaryHref.startsWith('http') ? (
                    <a
                      href={slide.secondaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                    >
                      <MessageSquare className="w-4 h-4 text-green" />
                      <span>{slide.secondaryCta}</span>
                    </a>
                  ) : (
                    <Link
                      href={slide.secondaryHref}
                      className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                    >
                      <CreditCard className="w-4 h-4 text-saffron" />
                      <span>{slide.secondaryCta}</span>
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Dynamic SVG Mockup Graphics (Right side) */}
              <div className="lg:col-span-5 hidden lg:flex justify-center relative">
                {index === 0 && (
                  <div className="w-80 h-96 relative flex items-center justify-center">
                    {/* Glowing outer aura */}
                    <div className="absolute inset-0 bg-saffron/20 rounded-2xl filter blur-xl animate-pulse"></div>
                    <div className="w-72 h-80 bg-slate-900/80 border border-slate-700/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="w-8 h-8 rounded bg-saffron flex items-center justify-center font-bold text-xs">CSC</div>
                        <span className="text-xs font-semibold text-slate-400">Digital Portal</span>
                      </div>
                      <div className="space-y-3.5 my-4">
                        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                        <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                        <div className="h-3 bg-slate-800/50 rounded w-full"></div>
                      </div>
                      <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs text-saffron font-bold">
                        <span>Aadhaar • PAN • Ayushman</span>
                        <span className="text-[10px] text-green border border-green/30 px-1.5 py-0.5 rounded bg-green/10">Active</span>
                      </div>
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="w-80 h-96 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl filter blur-xl animate-pulse"></div>
                    {/* Beautiful SVG PAN card mockup */}
                    <div className="w-80 h-48 bg-gradient-to-tr from-sky-800 via-sky-600 to-indigo-900 border border-sky-400/30 rounded-xl shadow-2xl p-4 flex flex-col justify-between text-white relative overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500">
                      {/* Indian emblem accent watermarked */}
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold tracking-wider text-sky-200">INCOME TAX DEPARTMENT</p>
                          <p className="text-[8px] text-sky-300">GOVT. OF INDIA</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-bold text-[8px] text-orange-200">PAN</div>
                      </div>
                      
                      <div className="flex gap-3 my-2 items-center">
                        <div className="w-10 h-10 bg-slate-300/40 border border-white/20 rounded-md"></div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold leading-tight tracking-wide">RAHUL KUMAR</p>
                          <p className="text-[10px] text-slate-300 font-mono tracking-wider">ABCDE1234F</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-[7px] text-sky-200 font-bold border-t border-sky-500/40 pt-1.5">
                        <span>PVC SMART CARD</span>
                        <span className="font-mono">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="w-80 h-96 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-500/20 rounded-2xl filter blur-xl"></div>
                    <div className="w-72 h-80 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-green"></span>
                        <span className="text-[10px] text-slate-400 font-bold tracking-wider">SUPPORT METRICS</span>
                      </div>
                      <div className="text-center my-6 space-y-1">
                        <p className="text-4xl font-extrabold text-white">99.8%</p>
                        <p className="text-xs text-slate-400">Customer Satisfaction</p>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-400">
                          <span>Processing Time</span>
                          <span className="text-green font-semibold">Fastest</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-400">
                          <span>Local Helpline</span>
                          <span className="text-white font-semibold">WhatsApp 24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-white p-2.5 rounded-full backdrop-blur-sm z-30 transition-all hover:scale-105"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-white p-2.5 rounded-full backdrop-blur-sm z-30 transition-all hover:scale-105"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              current === i ? 'bg-saffron w-8' : 'bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
