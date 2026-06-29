"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";


const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  
  return (
    <section id="contact" className="section-home relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.04)_1px,transparent_0)] bg-[length:24px_24px] opacity-40" />
      <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-amber-300/16 blur-[60px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        <div className="eyebrow mb-4 sm:mb-6">
          Limited Time Offer
        </div>

        <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
          Ready to take the
          <span className="heading-gold ml-3">next step?</span>
        </h2>

        <p className="mx-auto mb-6 mt-4 max-w-3xl px-4 text-lg leading-relaxed text-slate-600 sm:mb-8 sm:mt-6 sm:text-xl">
          Join <strong className="text-amber-600">15,000+ successful students</strong> who've transformed their lives through our expert guidance.
          Book your <strong className="text-amber-600">FREE consultation</strong> today and discover your path to global success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
            <div className="mb-1 text-2xl font-bold text-amber-500 sm:mb-2 sm:text-3xl">FREE</div>
            <div className="mb-1 text-sm font-semibold text-slate-950 sm:text-base">Initial Consultation</div>
            <div className="text-xs text-slate-500 sm:text-sm">No obligation assessment</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-sm sm:rounded-2xl sm:p-6">
            <div className="mb-1 text-2xl font-bold text-amber-500 sm:mb-2 sm:text-3xl">24/7</div>
            <div className="mb-1 text-sm font-semibold text-slate-950 sm:text-base">Expert Support</div>
            <div className="text-xs text-slate-500 sm:text-sm">Always available guidance</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
            <div className="mb-1 text-2xl font-bold text-amber-500 sm:mb-2 sm:text-3xl">100%</div>
            <div className="mb-1 text-sm font-semibold text-slate-950 sm:text-base">Success Guarantee</div>
            <div className="text-xs text-slate-500 sm:text-sm">Your dream or money back</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row">
          <button
            onClick={openModal}
            className="btn-primary group flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold sm:gap-3 sm:px-8 sm:py-4 sm:text-lg lg:px-10"
          >
            Book FREE Consultation
            <span className="text-xl sm:text-2xl">⚡</span>
          </button>

          <Link href={'/colleges'} className="btn-secondary rounded-full px-6 py-3 text-base font-semibold sm:px-8 sm:py-4 sm:text-lg lg:px-10">
            Explore Universities
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 sm:mt-12 sm:gap-6 sm:text-base lg:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">✓</span>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500">✓</span>
            <span>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500">✓</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
