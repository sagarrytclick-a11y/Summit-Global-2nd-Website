'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, BookOpen, Building, ChevronLeft, ChevronRight, Globe2, GraduationCap, MapPin, Search, X } from 'lucide-react'
import FAQ from '@/app/Components/FAQ'
import { useFormModal } from '@/context/FormModalContext'

interface College {
  _id: string
  name: string
  slug: string
  college_type?: string
  country_ref?: {
    _id?: string
    name?: string
    slug?: string
    flag?: string
  }
  establishment_year?: string
  banner_url?: string
  overview?: {
    title?: string
    description?: string
  }
  key_highlights?: {
    features?: string[]
  }
  ranking?: {
    country_ranking?: string
  } | string
}

const getImageSrc = (image?: string) => {
  if (!image) return null
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return image
  return `/uploads/colleges/${image}`
}

export default function StudyAbroadPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { openModal } = useFormModal()
  const collegesPerPage = 6

  useEffect(() => {
    const fetchStudyAbroadColleges = async () => {
      try {
        setLoading(true)
        let response = await fetch('/api/colleges?college_type=study_abroad')
        let result = await response.json()
        let studyAbroadColleges: College[] = []

        if (result.success && result.data?.colleges?.length > 0) {
          studyAbroadColleges = result.data.colleges
        } else {
          response = await fetch('/api/colleges')
          result = await response.json()

          if (result.success) {
            const allColleges = Array.isArray(result.data?.colleges) ? result.data.colleges : []
            const mbbsColleges = allColleges.filter((college: any) =>
              college?.slug?.toLowerCase().includes('mbbs') ||
              college?.name?.toLowerCase().includes('medical') ||
              college?.name?.toLowerCase().includes('mbbs') ||
              college?.college_type === 'mbbs_abroad'
            )
            studyAbroadColleges = allColleges.filter((college: any) => !mbbsColleges.includes(college))
          }
        }

        setColleges(studyAbroadColleges)
      } catch (error) {
        console.error('Error fetching study abroad colleges:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudyAbroadColleges()
  }, [])

  const countries = useMemo(
    () => [...new Set(colleges.map((college) => college.country_ref?.name).filter(Boolean))] as string[],
    [colleges]
  )

  const filteredColleges = useMemo(
    () =>
      colleges.filter((college) => {
        const description = college.overview?.description || ''
        const matchesSearch =
          !searchTerm ||
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCountry = selectedCountry === 'all' || college.country_ref?.name === selectedCountry
        return matchesSearch && matchesCountry
      }),
    [colleges, searchTerm, selectedCountry]
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCountry])

  const totalPages = Math.max(1, Math.ceil(filteredColleges.length / collegesPerPage))

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * collegesPerPage
    return filteredColleges.slice(startIndex, startIndex + collegesPerPage)
  }, [filteredColleges, currentPage])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-7 w-40 rounded-full bg-slate-100" />
            <div className="mt-6 h-16 max-w-3xl rounded-3xl bg-slate-100" />
            <div className="mt-4 h-6 max-w-2xl rounded-full bg-slate-100" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-36 rounded-[1.75rem] bg-slate-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <Globe2 className="h-3.5 w-3.5" />
                Study Abroad
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Discover global universities for your Study Abroad journey
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                Explore international universities, compare destinations, and shortlist programs with a cleaner student-first discovery experience.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Opportunity Snapshot</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">University Options</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{filteredColleges.length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Destinations</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{countries.length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white bg-white p-4 sm:col-span-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Best For</p>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-700">
                    Students planning broader Study Abroad routes across business, engineering, management, and other global programs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Program-first university discovery',
              'Country comparison with guided shortlisting',
              'Cleaner editorial layout matched to the website theme',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.3fr_0.9fr_0.7fr]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search universities, colleges or overview..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-amber-300 focus:bg-white"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-amber-300 focus:bg-white"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCountry('all')
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Global University Library</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Find your next Study Abroad destination</h2>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Matching Results</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{filteredColleges.length}</p>
          </div>
        </div>

        {filteredColleges.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
            <GraduationCap className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-6 text-xl font-black text-slate-900">No colleges found</h3>
            <p className="mt-3 text-sm text-slate-500">Try another keyword or change the selected destination.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedColleges.map((college) => {
              const imageUrl = getImageSrc(college.banner_url)
              const highlights = Array.isArray(college.key_highlights?.features) ? college.key_highlights?.features : []
              const rankText =
                typeof college.ranking === 'string'
                  ? college.ranking
                  : college.ranking?.country_ranking || 'Recognised'

              return (
                <div
                  key={college._id}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img src={imageUrl} alt={college.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100">
                        <GraduationCap className="h-16 w-16 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      Study Abroad
                    </div>
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-bold text-white">
                      <MapPin className="h-4 w-4 text-amber-300" />
                      <span>{college.country_ref?.name || 'Destination'} {college.country_ref?.flag ? `• ${college.country_ref.flag}` : ''}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black tracking-tight text-slate-950 transition-colors group-hover:text-[var(--surface-navy)]">
                      {college.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                      {college.overview?.description || 'Explore global academic options with a cleaner Study Abroad shortlisting experience.'}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Building className="h-4 w-4 text-amber-600" />
                          <span className="text-[11px] font-black uppercase tracking-[0.14em]">Established</span>
                        </div>
                        <p className="mt-2 text-sm font-bold text-slate-800">{college.establishment_year || 'N/A'}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Award className="h-4 w-4 text-amber-600" />
                          <span className="text-[11px] font-black uppercase tracking-[0.14em]">Ranking</span>
                        </div>
                        <p className="mt-2 text-sm font-bold text-slate-800">{rankText}</p>
                      </div>
                    </div>

                    {highlights.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {highlights.slice(0, 3).map((feature, index) => (
                          <span key={`${college._id}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--surface-navy)] px-4 py-3 text-sm font-black text-white transition-all hover:bg-slate-800"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={openModal}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filteredColleges.length > 0 && totalPages > 1 ? (
          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-slate-600">
                Showing {Math.min((currentPage - 1) * collegesPerPage + 1, filteredColleges.length)}-
                {Math.min(currentPage * collegesPerPage, filteredColleges.length)} of {filteredColleges.length} universities
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-200 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

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
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[var(--surface-navy)] text-white'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-200 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Plan Your Route</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Get a smarter Study Abroad shortlist based on your goals
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Connect with our team to compare destinations, understand university fit, and build a practical list of next-step options.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[var(--surface-navy)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-black">Destination planning with expert support</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    From country selection to university discovery, we help you build a clear Study Abroad roadmap.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition-all hover:bg-amber-400"
                >
                  Book Free Counselling
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
                >
                  Contact Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <FAQ />
      </section>
    </div>
  )
}
