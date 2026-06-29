'use client'

import React from 'react';
import { MessageSquare, FileText, Plane, Home, ShieldCheck, ArrowRight, Sparkles, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const JourneyCard = ({ icon: Icon, title, description, step }: {
  icon: LucideIcon, title: string, description: string, step: string
}) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[var(--surface-navy)] text-amber-300">
        <Icon size={22} />
      </div>
      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black tracking-[0.18em] text-amber-700">
        {step}
      </span>
    </div>
    <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-slate-600">
      {description}
    </p>
  </motion.div>
);

export default function ProcessJourney() {
  const steps = [
    { step: "01", icon: MessageSquare, title: "Strategic Discovery", description: "We begin with profile analysis, goals, budget, and destination fit so the next steps stay practical and personalized." },
    { step: "02", icon: FileText, title: "Academic Liaison", description: "Our team manages university applications, documentation flow, and tracking across every stage of the process." },
    { step: "03", icon: ShieldCheck, title: "Visa Compliance", description: "Students get clear support for documents, timelines, and compliance requirements to reduce delays and mistakes." },
    { step: "04", icon: Plane, title: "Global Logistics", description: "Pre-departure support covers travel planning, next-step guidance, and transition preparation before you leave India." },
    { step: "05", icon: Home, title: "Campus Integration", description: "After admission, we continue with arrival guidance, settlement help, and support for a smoother start abroad." }
  ];

  return (
    <section className="section-home relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[40%] w-[40%] rounded-full bg-amber-300/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow">
              <Sparkles className="w-3 h-3" />
              The Path to Excellence
            </div>

            <h2 className="mb-6 mt-8 text-4xl font-black leading-[1.05] tracking-tighter text-slate-950 sm:text-5xl lg:text-6xl">
              A clearer route to your
              <span className="heading-gold block">global medical career</span>
            </h2>

            <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              We’ve replaced the usual confusing admission journey with a structured 5-step
              support system that keeps students informed, prepared, and confident at every stage.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="text-3xl font-black text-amber-500">99.2%</div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Visa Success Rate
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="text-3xl font-black text-amber-500">24/7</div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  On-Ground Support
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="text-3xl font-black text-amber-500">10k+</div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Doctors Mentored
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button className="btn-primary inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest">
                Begin Your Assessment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {steps.map((step) => (
              <JourneyCard key={step.step} {...step} />
            ))}
            <div className="rounded-[1.75rem] border border-dashed border-amber-200 bg-amber-50/40 p-6 md:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700">
                    Student Promise
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    Every step is guided with clarity, transparency, and real support.
                  </h3>
                </div>
                <button className="btn-secondary rounded-2xl px-6 py-3 font-bold">
                  View Full Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
