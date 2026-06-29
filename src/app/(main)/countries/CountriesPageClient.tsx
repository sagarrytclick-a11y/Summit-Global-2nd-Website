'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Globe,
  MapPin,
  GraduationCap,
  ArrowRight,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useCountries } from '@/hooks/useCountries'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Country } from '@/lib/types'

interface CountriesPageClientProps {
  initialCountries: Country[]
}

export default function CountriesPageClient({ initialCountries }: CountriesPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const countriesPerPage = 6

  const {
    data: countries = [],
    isLoading,
    error,
    refetch,
  } = useCountries(initialCountries)

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries

    const searchLower = searchTerm.toLowerCase()
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchLower) ||
      (country.description && country.description.toLowerCase().includes(searchLower))
    )
  }, [countries, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / countriesPerPage))
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * countriesPerPage
    return filteredCountries.slice(startIndex, startIndex + countriesPerPage)
  }, [filteredCountries, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  if (isLoading && initialCountries.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Country Directory
                </div>
                <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
                <Skeleton className="mt-5 h-5 w-full max-w-2xl bg-slate-100" />
                <Skeleton className="mt-2 h-5 w-4/5 max-w-xl bg-slate-100" />
              </div>
              <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                    <Globe size={20} />
                  </div>
                  <div>
                    <Skeleton className="h-8 w-16 bg-slate-200" />
                    <Skeleton className="mt-2 h-3 w-24 bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
            <Skeleton className="h-12 w-full rounded-xl bg-slate-100" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Skeleton className="h-36 w-full flex-shrink-0 rounded-[1.5rem] bg-slate-100 md:w-52" />
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <Skeleton className="mb-2 h-7 w-40 bg-slate-100" />
                        <Skeleton className="h-4 w-28 bg-slate-100" />
                      </div>
                      <Skeleton className="h-7 w-20 rounded-full bg-slate-100" />
                    </div>
                    <div className="mb-4 space-y-2">
                      <Skeleton className="h-4 w-full bg-slate-100" />
                      <Skeleton className="h-4 w-10/12 bg-slate-100" />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <Skeleton className="h-4 w-24 bg-slate-100" />
                      <Skeleton className="h-4 w-28 bg-slate-100" />
                      <Skeleton className="h-4 w-24 bg-slate-100" />
                    </div>
                    <Skeleton className="h-5 w-28 bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Failed to Load Countries</h2>
          <p className="mb-6 text-sm text-slate-500">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-xl bg-[var(--surface-navy)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <RefreshCw className="mr-2 inline h-4 w-4" />
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
                Country Directory
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Explore destinations for
                <span className="text-amber-500"> MBBS Abroad & Study Abroad</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Compare study destinations, shortlist countries faster, and discover the right environment for admissions, lifestyle, and future opportunities.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-950">{filteredCountries.length}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Visible Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search study destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {paginatedCountries.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <Globe size={24} className="text-amber-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No countries found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {paginatedCountries.map((country) => (
              <div
                key={country._id}
                className="rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-36 w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-50 md:w-52">
                    <div className="text-5xl">{country.flag}</div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-1 text-2xl font-black tracking-tight text-slate-950">{country.name}</h3>
                        <div className="mb-2 flex items-center text-sm font-medium text-slate-500">
                          <MapPin size={14} className="mr-1" />
                          Study Destination
                        </div>
                      </div>
                      <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                        Open Intake
                      </span>
                    </div>

                    <p className="mb-4 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
                      {country.description || 'Discover educational opportunities in this amazing country'}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <GraduationCap size={14} />
                        <span>Top Universities</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <Globe size={14} />
                        <span>Global Recognition</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin size={14} />
                        <span>PR Opportunities</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href={`/countries/${country.slug}`}>
                        <button className="flex items-center gap-2 text-sm font-bold text-[var(--surface-navy)] transition-colors hover:text-amber-600">
                          Explore Country
                          <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCountries.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 sm:flex-row">
            <span className="text-sm text-slate-500">
              Showing {Math.min((currentPage - 1) * countriesPerPage + 1, filteredCountries.length)}-
              {Math.min(currentPage * countriesPerPage, filteredCountries.length)} of {filteredCountries.length} countries
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
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
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      className="h-8 w-8 p-0"
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
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
