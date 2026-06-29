"use client";

import { useEffect, useRef, useState } from "react";

const countries = [
  "India",
  "Russia", 
  "China",
  "Philippines",
  "Ukraine",
  "Bangladesh",
  "Kazakhstan",
  "Nepal",
  "Georgia",
  "Armenia",
  "Kyrgyzstan",
  "Belarus"
];

export default function MbbsMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-400/50 bg-[var(--surface-navy)] text-white shadow-2xl shadow-slate-950/20">
      <div className="overflow-hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(245,158,11,0.06),transparent)] py-3">
        <div 
          ref={marqueeRef}
          className={`flex whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First set of items */}
          {countries.map((country, index) => (
            <div
              key={`first-${index}`}
              className="mx-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:bg-white/10"
            >
              <div className="text-sm font-black uppercase tracking-[0.14em] text-amber-300">
                MBBS in {country}
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless infinite scroll */}
          {countries.map((country, index) => (
            <div
              key={`second-${index}`}
              className="mx-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:bg-white/10"
            >
              <div className="text-sm font-black uppercase tracking-[0.14em] text-amber-300">
                MBBS in {country}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
