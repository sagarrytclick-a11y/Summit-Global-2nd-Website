'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, FileText, X, LayoutGrid, AlertCircle, RefreshCw, Award, Building2, ArrowUpRight, Sparkles, RefreshCwIcon } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'
import { useFormModal } from '@/context/FormModalContext'
import { ExamListPageSkeleton } from '@/app/Components/PublicPageSkeletons'

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
  is_active: boolean
  display_order: number
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')
  const { openModal } = useFormModal()

  const { 
    data: exams = [], 
    isLoading, 
    error,
    refetch 
  } = useExams()

  const filteredExams = useMemo(() => {
    let filtered = exams

    if (selectedType !== 'all') {
      filtered = filtered.filter(exam => exam.exam_type === selectedType)
    }

    if (selectedMode !== 'all') {
      filtered = filtered.filter(exam => exam.exam_mode === selectedMode)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchLower) ||
        exam.short_name.toLowerCase().includes(searchLower) ||
        exam.conducting_body.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [exams, searchTerm, selectedType, selectedMode])

  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type))], [exams])
  const examModes = useMemo(() => [...new Set(exams.map(exam => exam.exam_mode))], [exams])

  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedMode('all')
  }, [])

  // ExamCard Component
  interface ExamCardProps {
    name: string;
    short_name?: string;
    exam_type?: string;
    conducting_body?: string;
    exam_mode?: string;
    frequency?: string;
    description?: string;
    slug: string;
  }
  
  const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, frequency, description, slug }: ExamCardProps) => (
    <Link href={`/exams/${slug}`} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300 transition-transform duration-300 group-hover:scale-105">
              <FileText size={24} />
            </div>
          </div>
          
          <div className="rounded-xl bg-amber-50 p-1.5 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
            <Award size={16} />
          </div>
        </div>

        <div className="mt-5 flex-grow">
          <h3 className="mb-2 text-2xl font-black leading-tight text-slate-900 transition-colors group-hover:text-amber-600">
            {short_name || name}
          </h3>
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{exam_type}</span>
          </div>
          
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Building2 size={12} className="text-amber-500" />
            <span className="uppercase">{conducting_body}</span>
          </div>

          <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-500">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Calendar size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase text-slate-600">{exam_mode}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Clock size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase text-slate-600">{frequency}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 transition-colors group-hover:text-amber-600">
            Exam Guide
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-navy)] text-white transition-colors group-hover:bg-amber-500">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )

  if (isLoading) {
    return <ExamListPageSkeleton />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Failed to Load Exams</h2>
          <p className="mb-6 text-sm text-slate-500">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => refetch()}
            className="rounded-xl bg-[var(--surface-navy)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <RefreshCwIcon className="mr-2 inline h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                Exam Library
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Entrance exams that shape your
                <span className="text-amber-500"> MBBS Abroad & Study Abroad</span> journey
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Explore medical entrance pathways, language tests, aptitude exams, and international admission requirements in one structured place.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-950">{filteredExams.length}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Visible Exams</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-100 bg-[var(--surface-navy)] p-5 text-white shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Need Direction?</p>
                <p className="mt-3 text-lg font-black leading-snug">Talk to our team to choose the right exam path.</p>
                <button
                  onClick={openModal}
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-black text-slate-950 transition-colors hover:bg-amber-400"
                >
                  Get Free Guidance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Built For</p>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Students preparing for MBBS Abroad, study abroad, and related admission pathways.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Includes</p>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Exam modes, frequency, conducting bodies, and quick summaries for faster comparison.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Use It For</p>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Shortlisting requirements before applications, counselling, and country selection.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search exams for admission pathways..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Types</option>
              {examTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Modes</option>
              {examModes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-600"
            >
              <X size={14} />
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {filteredExams.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <LayoutGrid size={24} className="text-amber-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No exams found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam._id}
                name={exam.name}
                short_name={exam.short_name}
                exam_type={exam.exam_type}
                conducting_body={exam.conducting_body}
                exam_mode={exam.exam_mode}
                frequency={exam.frequency}
                description={exam.description}
                slug={exam.slug}
              />
            ))}
          </div>
        )}

        {/* End of results */}
        {filteredExams.length > 0 && (
          <div className="mt-8 border-t border-slate-200 py-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Showing all {filteredExams.length} exams
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-[var(--surface-navy)] p-8 text-white shadow-sm md:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Counselling Support</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight">Need help selecting the right exam for your admission route?</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            We help students understand required exams, sequence their preparation, and match test plans with country and college choices.
          </p>
          <button
            onClick={openModal}
            className="mt-8 inline-flex h-14 items-center justify-center rounded-2xl bg-amber-500 px-8 font-black text-slate-950 transition-colors hover:bg-amber-400"
          >
            Book Free Counselling
          </button>
        </div>
      </section>
      
      <FAQ />
    </div>
  )
}
