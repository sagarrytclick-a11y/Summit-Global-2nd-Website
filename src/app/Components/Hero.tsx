"use client";

import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleCheckBig,
  Globe2,
  PhoneCall,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-6  px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-slate-100/80 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 py-0 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-0">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">
            <Sparkles size={14} />
            India&apos;s #1 Abroad Admissions Consultancy
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm ring-1 ring-slate-100">
              <BadgeCheck size={14} className="text-[#f59e0b]" />
              Transparent Guidance. Better Outcomes.
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#0F172A] sm:text-6xl xl:text-7xl">
              Your Trusted Path
              <span className="mt-2 block text-[#f59e0b]">MBBS &amp; Study Abroad</span>
              Starts Right Here
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Summit Global helps students and parents with university shortlisting, scholarships,
              admissions, documentation, visa support, and pre-departure guidance through one
              clear and structured process.
            </p>
          </div>

          <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              'Personalized admission roadmap',
              'Scholarship and visa support',
              'Trusted university partnerships',
              'Student-first counselling',
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)]"
              >
                <CircleCheckBig size={18} className="shrink-0 text-[#f59e0b]" />
                <span className="text-sm font-semibold text-slate-700">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#f59e0b] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#d97706] hover:shadow-lg hover:shadow-amber-500/15"
            >
              <CalendarDays size={18} />
              Book Free Counselling
            </Link>
            <Link
              href="/study-abroad"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-[#0F172A] transition-all duration-200 hover:bg-slate-50"
            >
              <PhoneCall size={18} />
              Explore Programs
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-5 pt-2">
            <div className="flex flex-wrap gap-3">
              {['Russia', 'Georgia', 'Kazakhstan', 'Uzbekistan', 'Philippines', 'Bangladesh'].map((country) => (
                <span
                  key={country}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {country}
                </span>
              ))}
            </div>

            <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: '12K+', label: 'Students Placed' },
                { value: '30+', label: 'Countries' },
                { value: '500+', label: 'Partner Universities' },
                { value: '98%', label: 'Visa Success' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                  <p className="text-3xl font-black text-[#0F172A]">{item.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[560px] lg:min-h-[640px]">
          <div className="absolute right-0 top-10 h-[78%] w-[82%] rounded-[2rem] bg-[var(--surface-navy)]" />
          <div className="absolute left-0 top-0 h-[62%] w-[66%] overflow-hidden rounded-[2rem] border-8 border-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <img
              src="https://i.pinimg.com/736x/db/3b/1a/db3b1a2d9ed8b906a294ec242cbf214d.jpg"
              alt="Students planning MBBS abroad"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 right-6 h-[46%] w-[56%] overflow-hidden rounded-[2rem] border-8 border-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <img
              src="https://i.pinimg.com/736x/43/05/d0/4305d05a291c79a9ef27ca65429308b7.jpg"
              alt="Students exploring global education options"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-4 top-12 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-50 p-2 text-[#0F172A]">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Admission Rate</p>
                <p className="text-base font-extrabold text-[#0F172A]">98% Success</p>
              </div>
            </div>
          </div>

          <div className="absolute left-6 top-[52%] rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-2 text-[#f59e0b]">
                <Users size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Students Guided</p>
                <p className="text-base font-extrabold text-[#0F172A]">12,000+</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-8 right-16 rounded-[1.5rem] border border-white/60 bg-white/95 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Top Program</p>
                <p className="mt-1 text-lg font-black text-[#0F172A]">MBBS Russia 2026</p>
                <p className="mt-1 text-sm text-slate-500">
                  High-value destinations, strong counselling, and complete admission support.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="rounded-2xl bg-amber-50 p-3 text-[#f59e0b]">
                  <Sparkles size={20} />
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 text-[var(--surface-navy)]">
                  <Globe2 size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
