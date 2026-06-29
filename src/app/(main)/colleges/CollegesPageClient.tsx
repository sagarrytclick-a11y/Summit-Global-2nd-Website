'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  GraduationCap,
  Building,
  X,
  AlertCircle,
  RefreshCwIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useColleges, CollegesResponse } from '@/hooks/useColleges'
import { getCountryName } from "@/lib/normalize"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface CollegesPageClientProps {
  initialData: CollegesResponse
}

export default function CollegesPageClient({ initialData }: CollegesPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [selectedCollegeType, setSelectedCollegeType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useColleges(
    currentPage,
    debouncedSearchTerm,
    selectedCountry,
    selectedExam,
    selectedCollegeType,
    currentPage === 1 &&
      !debouncedSearchTerm &&
      selectedCountry === 'all' &&
      selectedExam === 'all' &&
      selectedCollegeType === 'all'
      ? initialData
      : undefined
  )

  const colleges = data?.colleges || []
  const totalCount = data?.total || 0
  const totalPages = data?.totalPages || 1

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedCountry, selectedExam, selectedCollegeType])

  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(
      colleges
        .map((college) => {
          const c = college.country_ref
          if (!c) return null
          if (typeof c === "string") return c
          if (typeof c === "object") return c.name ?? null
          return null
        })
        .filter(Boolean) as string[]
    )

    const examSet = new Set(
      colleges.flatMap((college) => (Array.isArray(college.exams) ? college.exams : []))
    )

    return {
      countries: Array.from(countrySet),
      exams: Array.from(examSet),
    }
  }, [colleges])

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Failed to Load Colleges</h2>
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
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                Colleges Directory
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Discover colleges for
                <span className="text-amber-500"> MBBS Abroad & Study Abroad</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Search universities by country, exam pathway, and program type to find options
                that match your academic goals and budget.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-950">{isLoading ? '...' : totalCount}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Available Colleges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search universities or colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>

            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Exams</option>
              {exams.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>

            <select
              value={selectedCollegeType}
              onChange={(e) => setSelectedCollegeType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Types</option>
              <option value="study_abroad">Study Abroad</option>
              <option value="mbbs_abroad">MBBS Abroad</option>
            </select>

            <button
              onClick={() => { setSearchTerm(''); setSelectedCountry('all'); setSelectedExam('all'); setSelectedCollegeType('all'); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-600"
            >
              <X size={14} />
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {isLoading || (isFetching && colleges.length === 0) ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Skeleton className="h-40 w-full flex-shrink-0 rounded-[1.5rem] bg-slate-100 md:w-56" />
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Skeleton className="mb-3 h-7 w-3/4 bg-slate-100" />
                        <Skeleton className="h-4 w-32 bg-slate-100" />
                      </div>
                      <Skeleton className="h-8 w-24 rounded-full bg-slate-100" />
                    </div>

                    <div className="mb-4 space-y-2">
                      <Skeleton className="h-4 w-full bg-slate-100" />
                      <Skeleton className="h-4 w-11/12 bg-slate-100" />
                      <Skeleton className="h-4 w-8/12 bg-slate-100" />
                    </div>

                    <div className="mb-4 flex flex-wrap gap-4">
                      <Skeleton className="h-5 w-28 bg-slate-100" />
                      <Skeleton className="h-5 w-24 bg-slate-100" />
                      <Skeleton className="h-5 w-20 bg-slate-100" />
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <Skeleton className="h-7 w-20 rounded-full bg-slate-100" />
                      <Skeleton className="h-7 w-24 rounded-full bg-slate-100" />
                      <Skeleton className="h-7 w-16 rounded-full bg-slate-100" />
                    </div>

                    <Skeleton className="h-5 w-28 bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <Search size={24} className="text-amber-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No colleges found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {colleges.map((college) => {
              const collegeExams = Array.isArray(college.exams) ? college.exams : []

              return (
                <div
                  key={college._id}
                  className="rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-slate-100 md:w-56">
                      <img
                        src={college.banner_url || `https://picsum.photos/seed/${college.slug}/300/200`}
                        alt={college.name}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="mb-1 text-2xl font-black tracking-tight text-slate-950">{college.name}</h3>
                          <div className="mb-2 flex items-center text-sm font-medium text-slate-500">
                            <MapPin size={14} className="mr-1" />
                            {getCountryName(college.country_ref)}
                          </div>
                        </div>
                        <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                          {selectedCollegeType === 'study_abroad' ? 'Study Abroad' : selectedCollegeType === 'mbbs_abroad' ? 'MBBS Abroad' : 'Open Intake'}
                        </span>
                      </div>

                      <p className="mb-4 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
                        {college.about_content || 'Explore program details, eligibility, tuition range, and study destination information for this college.'}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <DollarSign size={14} />
                          <span>
                            {college.fees_structure?.courses?.[0]?.annual_tuition_fee ?
                              college.fees_structure.courses[0].annual_tuition_fee :
                              'Fees not available'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Clock size={14} />
                          <span>
                            {college.fees_structure?.courses?.[0]?.duration ?
                              `${college.fees_structure.courses[0].duration} years` :
                              'Duration not available'
                            }
                          </span>
                        </div>
                        {college.establishment_year && (
                          <div className="flex items-center gap-1 font-medium text-slate-700">
                            <Building size={14} />
                            <span>Est. {college.establishment_year}</span>
                          </div>
                        )}
                      </div>

                      {collegeExams.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {collegeExams.slice(0, 3).map((exam) => (
                            <span key={exam} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                              {exam}
                            </span>
                          ))}
                          {collegeExams.length > 3 && (
                            <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                              +{collegeExams.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Link href={`/colleges/${college.slug}`}>
                          <button className="flex items-center gap-2 text-sm font-bold text-[var(--surface-navy)] transition-colors hover:text-amber-600">
                            View Details
                            <ArrowRight size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!isLoading && !isFetching && totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalCount)} of {totalCount} colleges
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
