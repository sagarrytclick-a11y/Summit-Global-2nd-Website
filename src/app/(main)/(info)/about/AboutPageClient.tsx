"use client"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';
import Image from 'next/image';

const milestones = [
  {
    year: "2005",
    title: "Trusted Student Guidance Begins",
    description: "Started with a focused mission to help Indian students access better international education pathways with honest support."
  },
  {
    year: "2012",
    title: "MBBS Abroad Specialization",
    description: "Expanded into medical admissions with stronger university partnerships, clearer process support, and country-wise counselling."
  },
  {
    year: "2020",
    title: "End-to-End Process Model",
    description: "Structured counselling, applications, visa support, documentation, and pre-departure help into one guided system."
  },
  {
    year: "Today",
    title: "Student-First Global Platform",
    description: "Supporting MBBS Abroad and Study Abroad journeys with practical advice, transparent process management, and long-term trust."
  }
];

const values = [
  {
    title: "Transparent Counselling",
    description: "Students and parents get realistic guidance on budgets, destinations, timelines, and expected outcomes before any decision is made."
  },
  {
    title: "MBBS & Study Abroad Focus",
    description: "Our approach is built specifically around medical admissions, global universities, eligibility planning, and complete admission pathways."
  },
  {
    title: "Application to Arrival Support",
    description: "From shortlisting and documentation to visa and pre-departure readiness, the journey stays structured and supported."
  },
  {
    title: "Better Decision Making",
    description: "We help families compare countries, universities, exams, fee structures, and student life with far more clarity."
  }
];

export default function AboutPage() {
  const { openModal } = useFormModal();

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
              <Sparkles className="h-3.5 w-3.5" />
              About Summit Global
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Helping students build confident paths to
              <span className="text-amber-500"> MBBS Abroad & Study Abroad</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
              We work with students and parents who need clarity, structure, and real support
              through admissions, university shortlisting, scholarships, documentation, visa
              planning, and transition guidance.
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { value: "12K+", label: "Students Guided" },
                { value: "30+", label: "Countries" },
                { value: "500+", label: "Partner Institutions" },
                { value: "98%", label: "Visa Success Focus" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-5">
                  <p className="text-3xl font-black text-slate-950">{item.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-base font-black text-slate-950 transition-all hover:bg-amber-400"
              >
                Book Free Counselling
                <ArrowRight size={18} />
              </button>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-black text-[var(--surface-navy)] transition-all hover:bg-slate-50"
              >
                Explore Your Options
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 shadow-sm">
              <img
                src="https://i.pinimg.com/736x/63/84/b8/6384b8077a4a56208bcd07a600b16181.jpg"
                alt="Students planning education abroad"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 rounded-[1.5rem] border border-white/70 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-sm">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Trusted Since</p>
              <p className="mt-1 text-2xl font-black text-slate-950">2005</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="h-6 w-6" />,
              title: "Transparent Process",
              text: "Clear guidance on fees, timelines, applications, and documentation without confusion."
            },
            {
              icon: <GraduationCap className="h-6 w-6" />,
              title: "Medical & Global Pathways",
              text: "Focused support for MBBS Abroad, university admissions, and international education routes."
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Country-Wise Planning",
              text: "Practical destination comparison for tuition, recognition, lifestyle, and long-term fit."
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Student-Parent Support",
              text: "The process stays easier when counselling is built for both students and their families."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Our Journey</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Built around long-term trust, not just admissions
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
              Our growth has come from helping students take better decisions with less stress,
              stronger information, and more reliable support through each stage of the process.
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((item) => (
              <div key={item.year} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">{item.year}</span>
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">What Guides Us</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              A more structured and student-first way to approach global education
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={value.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-black text-[var(--surface-navy)]">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-black text-slate-950">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{value.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                  Built for MBBS Abroad and Study Abroad decisions
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="rounded-[2.5rem] bg-[var(--surface-navy)] p-10 text-white lg:p-14">
          <h2 className="max-w-3xl text-4xl font-black tracking-tight">
            Ready to plan your next step with more clarity?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Speak with our team to discuss MBBS Abroad options, global university pathways,
            scholarships, exams, or country shortlisting.
          </p>
          <button
            onClick={openModal}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-base font-black text-slate-950 transition-all hover:bg-amber-400"
          >
            Get Free Consultation
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
