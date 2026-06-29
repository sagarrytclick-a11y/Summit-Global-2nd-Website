'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function BlogListPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Insights Library
              </div>
              <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
              <Skeleton className="mt-5 h-5 w-full max-w-2xl bg-slate-100" />
              <Skeleton className="mt-2 h-5 w-4/5 max-w-xl bg-slate-100" />
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <Skeleton className="h-16 w-40 bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.3fr_0.9fr_0.7fr]">
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-24 rounded-full bg-slate-100" />
                <Skeleton className="h-8 w-20 rounded-full bg-slate-100" />
              </div>
              <Skeleton className="mt-5 h-8 w-4/5 bg-slate-100" />
              <Skeleton className="mt-3 h-4 w-3/5 bg-slate-100" />
              <div className="mt-5 space-y-2">
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-11/12 bg-slate-100" />
                <Skeleton className="h-4 w-4/5 bg-slate-100" />
              </div>
              <div className="mt-6 flex gap-3">
                <Skeleton className="h-10 w-24 rounded-full bg-slate-100" />
                <Skeleton className="h-10 w-24 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ExamListPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Exam Library
              </div>
              <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
              <Skeleton className="mt-5 h-5 w-full max-w-2xl bg-slate-100" />
              <Skeleton className="mt-2 h-5 w-4/5 max-w-xl bg-slate-100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <Skeleton className="h-16 w-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3">
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-100" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-2xl bg-slate-100" />
                <Skeleton className="h-8 w-8 rounded-xl bg-slate-100" />
              </div>
              <Skeleton className="mt-5 h-8 w-2/3 bg-slate-100" />
              <Skeleton className="mt-3 h-4 w-1/2 bg-slate-100" />
              <div className="mt-5 space-y-2">
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-5/6 bg-slate-100" />
                <Skeleton className="h-4 w-4/5 bg-slate-100" />
              </div>
              <div className="mt-5 flex gap-2">
                <Skeleton className="h-9 w-28 rounded-full bg-slate-100" />
                <Skeleton className="h-9 w-24 rounded-full bg-slate-100" />
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <Skeleton className="h-8 w-28 bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Skeleton className="h-5 w-36 bg-slate-100" />
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm lg:p-12">
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 rounded-full bg-slate-100" />
              <Skeleton className="h-8 w-20 rounded-full bg-slate-100" />
            </div>
            <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
            <Skeleton className="mt-3 h-14 w-4/5 bg-slate-100" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-5 w-24 bg-slate-100" />
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                  <Skeleton className="h-4 w-16 bg-slate-100" />
                  <Skeleton className="mt-4 h-10 w-full bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-[28rem] rounded-[2.5rem] bg-slate-100" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm lg:p-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className={`mb-4 h-4 bg-slate-100 ${index % 4 === 0 ? 'w-5/6' : 'w-full'}`} />
            ))}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-[2rem] bg-slate-100" />
            <Skeleton className="h-64 rounded-[2rem] bg-slate-100" />
          </div>
        </div>
      </article>
    </div>
  )
}

export function ExamDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pb-20 pt-10">
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <Skeleton className="h-5 w-32 bg-slate-100" />
            <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
            <Skeleton className="mt-3 h-14 w-4/5 bg-slate-100" />
            <Skeleton className="mt-5 h-5 w-full max-w-2xl bg-slate-100" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5">
                  <Skeleton className="h-4 w-20 bg-slate-100" />
                  <Skeleton className="mt-4 h-8 w-full bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-[28rem] rounded-[2.5rem] bg-slate-100" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <Skeleton className="h-[26rem] rounded-[2rem] bg-slate-100" />
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                <Skeleton className="h-8 w-64 bg-slate-100" />
                <div className="mt-6 space-y-3">
                  {Array.from({ length: 5 }).map((__, lineIndex) => (
                    <Skeleton key={lineIndex} className={`h-4 bg-slate-100 ${lineIndex === 4 ? 'w-4/5' : 'w-full'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function CollegeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-5 w-36 bg-slate-100" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex gap-3">
                <Skeleton className="h-8 w-24 rounded-full bg-slate-100" />
                <Skeleton className="h-8 w-28 rounded-full bg-slate-100" />
              </div>
              <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-slate-100" />
              <Skeleton className="mt-3 h-14 w-4/5 bg-slate-100" />
              <div className="mt-5 space-y-3">
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-11/12 bg-slate-100" />
                <Skeleton className="h-4 w-4/5 bg-slate-100" />
              </div>
            </div>
            <Skeleton className="h-[24rem] rounded-[2.5rem] bg-slate-100" />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5">
                <Skeleton className="h-4 w-20 bg-slate-100" />
                <Skeleton className="mt-4 h-8 w-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                <Skeleton className="h-8 w-52 bg-slate-100" />
                <div className="mt-6 space-y-3">
                  {Array.from({ length: 5 }).map((__, lineIndex) => (
                    <Skeleton key={lineIndex} className={`h-4 bg-slate-100 ${lineIndex === 4 ? 'w-4/5' : 'w-full'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 rounded-[2rem] bg-slate-100" />
            <Skeleton className="h-56 rounded-[2rem] bg-slate-100" />
          </div>
        </div>
      </section>
    </div>
  )
}

export function DropdownGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
          <Skeleton className="h-4 w-20 bg-slate-200" />
          <Skeleton className="mt-3 h-4 w-full bg-slate-200" />
          <Skeleton className="mt-2 h-4 w-4/5 bg-slate-200" />
        </div>
      ))}
    </div>
  )
}

export function DropdownListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-xl bg-slate-100" />
      ))}
    </div>
  )
}
