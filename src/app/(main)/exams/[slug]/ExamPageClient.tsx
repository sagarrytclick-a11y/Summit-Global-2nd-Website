'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import {
  Calendar,
  FileText,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Timer,
  TrendingUp,
  CalendarDays,
  ShieldCheck,
  Info,
  Clock
} from 'lucide-react'
import { motion } from 'motion/react'
import { ExamDetailSkeleton } from '@/app/Components/PublicPageSkeletons'
import './styles.css'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section: {
    title: string
    subtitle?: string
    image?: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    image?: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
  applicable_countries: Country[]
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string
}

const ExamPageClient = ({ initialExam }: { initialExam: Exam | null }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useFormModal()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'registration', 'pattern', 'dates', 'results', 'faq']
      const current = sections.find((section) => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveTab(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!initialExam) return <ExamDetailSkeleton />

  const exam = initialExam
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'registration', label: 'Registration', icon: FileText },
    { id: 'pattern', label: 'Exam Pattern', icon: Timer },
    { id: 'dates', label: 'Important Dates', icon: CalendarDays },
    { id: 'results', label: 'Statistics', icon: Award },
    { id: 'faq', label: 'FAQs', icon: Info },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
  }

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pb-20 pt-10">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-slate-100 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/exams" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-amber-600">
              <ArrowLeft className="h-4 w-4" />
              Back to Exams
            </Link>
            <div className="flex gap-2 mb-6">
              <Badge className="border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700">
                {exam.exam_type}
              </Badge>
              <Badge className="border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {exam.exam_mode}
              </Badge>
            </div>
            <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight leading-tight text-slate-950">
              Master the <span className="text-amber-500">{exam.short_name}</span> exam
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-500">
              {exam.hero_section?.subtitle || exam.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button onClick={openModal} className="h-14 rounded-2xl bg-amber-500 px-8 font-bold text-slate-950 shadow-none hover:bg-amber-400">
                Get Free Guidance <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button onClick={() => scrollTo('registration')} variant="outline" className="h-14 rounded-2xl border-slate-200 bg-white px-8 font-bold text-[var(--surface-navy)]">
                View Registration
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-5 py-5">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Conducted By</p>
                <p className="mt-2 text-base font-black text-slate-950">{exam.conducting_body}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-5 py-5">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Frequency</p>
                <p className="mt-2 text-base font-black text-slate-950">{exam.frequency}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-5 py-5">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Applicable Countries</p>
                <p className="mt-2 text-base font-black text-slate-950">{exam.applicable_countries?.length || 0}+</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="aspect-video overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-sm">
              <img src={exam.hero_section?.image || "/api/placeholder/800/600"} alt={exam.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:block">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600"><Users size={24} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Reach</p>
                  <p className="text-xl font-black text-slate-900">{exam.applicable_countries?.length || 0}+ Countries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-2 rounded-[2rem] border border-slate-100 bg-white p-4 shadow-sm">
              <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigation</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                    activeTab === item.id
                      ? 'bg-[var(--surface-navy)] text-white shadow-none'
                      : 'text-slate-500 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 space-y-20">
            <section id="overview" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-sm"><BookOpen size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Overview</h2>
              </div>
              <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-10">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10">
                    {exam.overview.content}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {exam.overview.key_highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle className="text-amber-500" size={20} />
                        <span className="font-bold text-slate-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="registration" className="scroll-mt-32">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><FileText size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">{exam.registration.title || 'Registration'}</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm">
                  <CardContent className="p-10">
                    <p className="text-lg font-medium leading-8 text-slate-600">
                      {exam.registration.description}
                    </p>
                    {exam.registration.bullet_points?.length ? (
                      <div className="mt-8 grid gap-4">
                        {exam.registration.bullet_points.map((point, index) => (
                          <div key={`${point}-${index}`} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                            <p className="text-sm font-semibold leading-7 text-slate-700">{point}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
                    <img
                      src={exam.registration.image || exam.hero_section?.image || "/api/placeholder/800/600"}
                      alt={exam.name}
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="rounded-[2rem] border border-slate-100 bg-[var(--surface-navy)] p-6 text-white shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-300">Need Help?</p>
                    <h3 className="mt-3 text-2xl font-black">Get exam guidance with counselling support</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      We help students understand timelines, registration flow, exam readiness, and next admission steps.
                    </p>
                    <Button onClick={openModal} className="mt-6 h-12 rounded-2xl bg-amber-500 px-6 font-black text-slate-950 hover:bg-amber-400">
                      Talk to an Expert
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section id="pattern" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Timer size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Exam Pattern</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <Clock className="mb-4 text-amber-500" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Duration</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{exam.exam_pattern.total_duration_mins} <span className="text-lg text-slate-400">min</span></p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <TrendingUp className="mb-4 text-[var(--surface-navy)]" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Score Range</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{exam.exam_pattern.score_range}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <ShieldCheck className="mb-4 text-amber-500" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Difficulty</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">Moderate</p>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-6">Section Name</th>
                      <th className="px-8 py-6 text-center">Questions</th>
                      <th className="px-8 py-6 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exam.exam_pattern.table_data.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-800">{row.section}</td>
                        <td className="px-8 py-6 text-center text-slate-500 font-bold">{row.questions}</td>
                        <td className="px-8 py-6 text-right font-black text-amber-600">{row.duration_mins}m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="dates" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><CalendarDays size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">{exam.exam_dates.title}</h2>
              </div>

              <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-8">
                {exam.exam_dates.important_dates.map((item: any, i: number) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    key={i}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-amber-500 shadow-sm" />
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Upcoming Event</p>
                          <h4 className="text-xl font-bold text-slate-900">{item.event}</h4>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 font-bold text-amber-700">
                          <Calendar size={16} />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {exam.result_statistics && (
              <section id="results" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Award size={20} /></div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">Success Metrics</h2>
                </div>
                <div className="relative overflow-hidden rounded-[3rem] bg-[var(--surface-navy)] p-12 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_35%)]" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4">{exam.result_statistics.title}</h3>
                      <p className="text-slate-400 mb-8 leading-relaxed font-medium">{exam.result_statistics.description}</p>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                            <span>Passing Benchmark</span>
                            <span className="text-amber-400">{exam.result_statistics.passing_marks} / {exam.result_statistics.total_marks}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(exam.result_statistics.passing_marks / exam.result_statistics.total_marks) * 100}%` }}
                              transition={{ duration: 1 }}
                              className="h-full bg-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-white/10 bg-white/5">
                      <div className="text-center">
                        <p className="text-4xl font-black text-amber-400">{Math.round((exam.result_statistics.passing_marks / exam.result_statistics.total_marks) * 100)}%</p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">Pass Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {exam.applicable_countries?.length ? (
              <section className="scroll-mt-32">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Users size={20} /></div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">Applicable Destinations</h2>
                </div>
                <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                  <div className="flex flex-wrap gap-3">
                    {exam.applicable_countries.map((country) => (
                      <span
                        key={country._id}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            <section id="faq" className="scroll-mt-32">
              <FAQ />
            </section>

            <section className="overflow-hidden rounded-[2.5rem] bg-[var(--surface-navy)] p-10 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Next Step</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Want a complete exam and admission strategy?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Our counsellors help with exam shortlisting, registration planning, country alignment, and post-exam admission guidance for MBBS Abroad and Study Abroad.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button onClick={openModal} className="h-14 rounded-2xl bg-amber-500 px-8 font-black text-slate-950 hover:bg-amber-400">
                  Book Free Guidance
                </Button>
                <Button onClick={() => scrollTo('dates')} variant="outline" className="h-14 rounded-2xl border-white/15 bg-white/5 px-8 font-black text-white hover:bg-white/10">
                  Review Exam Dates
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamPageClient
