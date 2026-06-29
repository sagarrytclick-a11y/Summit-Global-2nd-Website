'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FAQ from '@/app/Components/FAQ'
import CollegeSlider from '@/components/CollegeSlider'
import { useFormModal } from '@/context/FormModalContext'
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title?: string
  meta_description?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface CountryPageClientProps {
  initialCountry: Country | null
}

const CountryPageClient = ({ initialCountry }: CountryPageClientProps) => {
  const { openModal } = useFormModal()

  if (!initialCountry) return null

  const country = initialCountry
  const stats = [
    { label: 'Study Focus', value: `MBBS Abroad in ${country.name}`, icon: GraduationCap },
    { label: 'Admission Support', value: 'Shortlisting to final admission', icon: FileCheck },
    { label: 'Travel Readiness', value: 'Visa, SOP and pre-departure guidance', icon: Plane },
    { label: 'Student Guidance', value: 'Country comparison and planning support', icon: Compass },
  ]

  const highlights = [
    {
      title: `Why students explore ${country.name}`,
      description: `Students consider ${country.name} for internationally aligned education pathways, guided admissions, and destination-specific planning support.`,
      icon: Sparkles,
    },
    {
      title: 'Guided documentation process',
      description: 'We help you prepare academic records, essential forms, and application documents in a more structured way.',
      icon: FileText,
    },
    {
      title: 'Country-first shortlisting',
      description: `The shortlist focuses on universities, fee expectations, and student suitability for ${country.name}.`,
      icon: Globe,
    },
    {
      title: 'Clear next-step planning',
      description: 'From counselling to departure, the process stays simple, predictable, and easier to follow.',
      icon: ShieldCheck,
    },
  ]

  const roadmap = [
    { step: '01', title: 'Profile Review', desc: 'We assess your academic background, goals, and preferred destination strategy.' },
    { step: '02', title: 'University Shortlist', desc: `We build a focused shortlist for ${country.name} based on fit, budget, and preferences.` },
    { step: '03', title: 'Application Support', desc: 'Forms, documentation, and follow-ups are handled with guided support.' },
    { step: '04', title: 'Visa and Departure', desc: 'We prepare you for visa filing, travel planning, and pre-departure readiness.' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-600 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back To Destinations
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <span className="text-xl leading-none">{country.flag}</span>
                Country Guide
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Study in {country.name}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {country.description || `Explore MBBS Abroad and Study Abroad opportunities in ${country.name} with a cleaner admission journey, destination-specific counselling, and shortlisting support.`}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Student Snapshot</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white bg-white p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            <div className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Destination Overview</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">A clearer path to planning your move to {country.name}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                We position {country.name} as a study destination through practical counselling, realistic shortlisting, and step-by-step guidance for students planning MBBS Abroad or broader Study Abroad routes.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--surface-navy)] shadow-sm">
                      <item.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Admission Roadmap</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">How we plan your {country.name} journey</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {roadmap.map((item) => (
                  <div key={item.step} className="relative rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-5">
                    <span className="absolute right-5 top-4 text-4xl font-black tracking-tight text-slate-200">{item.step}</span>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">Step {item.step}</p>
                    <h3 className="mt-3 text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[2.25rem] bg-[var(--surface-navy)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Need Guidance?</p>
              <h3 className="mt-4 text-3xl font-black tracking-tight">Build your {country.name} shortlist with expert support</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Get help with university selection, documentation planning, application flow, and next-step clarity for this destination.
              </p>
              <div className="mt-8 space-y-3">
                <Button
                  onClick={openModal}
                  className="h-14 w-full rounded-2xl bg-amber-500 px-6 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition-all hover:bg-amber-400"
                >
                  Book Free Counselling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={openModal}
                  variant="outline"
                  className="h-14 w-full rounded-2xl border-white/15 bg-white/5 px-6 text-sm font-bold text-white hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4 w-4 text-amber-300" />
                  Get Destination Guidance
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Planning Checklist</p>
              <div className="mt-5 space-y-4">
                {[
                  `Review admission routes for ${country.name}`,
                  'Prepare academic and identity documents',
                  'Shortlist universities by budget and goals',
                  'Plan visa and pre-departure timeline',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-medium leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <CollegeSlider countrySlug={country.slug} countryName={country.name} />
      </section>

      <section className="py-20">
        <FAQ />
      </section>
    </div>
  )
}

export default CountryPageClient
