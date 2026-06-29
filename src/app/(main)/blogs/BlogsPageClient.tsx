'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Calendar,
  FileText,
  Clock,
  User,
  Eye,
  ArrowRight,
  X,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useBlogs, BlogsResponse } from '@/hooks/useBlogs'
import { Button } from '@/components/ui/button'
import { BlogListPageSkeleton } from '@/app/Components/PublicPageSkeletons'

interface BlogsPageClientProps {
  initialData: BlogsResponse
}

export default function BlogsPageClient({ initialData }: BlogsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useBlogs(currentPage, debouncedSearchTerm, selectedCategory, currentPage === 1 && !debouncedSearchTerm && selectedCategory === 'all' ? initialData : undefined)

  const blogs = data?.blogs || []
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
  }, [debouncedSearchTerm, selectedCategory])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(blogs.map((blog: any) => blog.category))]
    return uniqueCategories.filter(Boolean)
  }, [blogs])

  if (isLoading && blogs.length === 0) {
    return <BlogListPageSkeleton />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Failed to Load Insights</h2>
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
                MBBS Abroad Insights
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Guides, updates, and student-first advice for
                <span className="text-amber-500"> MBBS Abroad & Study Abroad</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Explore application timelines, visa advice, country comparisons, exam strategy,
                scholarship guidance, and practical planning for students and parents.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-950">{totalCount}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Published Insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search MBBS and study abroad blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-600"
            >
              <X size={14} />
              Clear Filters
            </button>

            <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
              <span>{blogs.length} results</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <FileText size={24} className="text-amber-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No insights found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your search or category filters</p>
          </div>
        ) : (
          <div className="space-y-5">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-slate-100 md:w-60">
                    <img
                      src={blog.image || `https://picsum.photos/seed/${blog.slug}/300/200`}
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-2 text-2xl font-black tracking-tight text-slate-950">{blog.title}</h3>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                            {blog.category}
                          </span>
                          <div className="flex items-center text-xs font-medium text-slate-500">
                            <Calendar size={12} className="mr-1" />
                            {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span className="inline-block rounded-full bg-[var(--surface-navy)] px-3 py-1 text-xs font-medium text-white">
                        Published
                      </span>
                    </div>

                    <p className="mb-4 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
                      {blog.content || 'Read this detailed guide to understand admissions, universities, scholarships, exams, and student planning for MBBS abroad and study abroad pathways.'}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <User size={14} />
                        <span>{blog.author || 'Summit Global Editorial Team'}</span>
                      </div>
                      {blog.read_time && (
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Clock size={14} />
                          <span>{blog.read_time} min read</span>
                        </div>
                      )}
                      {blog.views && (
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Eye size={14} />
                          <span>{blog.views} views</span>
                        </div>
                      )}
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span key={`${tag}-${index}`} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Link href={`/blogs/${blog.slug}`}>
                        <button className="flex items-center gap-2 text-sm font-bold text-[var(--surface-navy)] transition-colors hover:text-amber-600">
                          Read Full Guide
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

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, totalCount)} of {totalCount} articles
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

        {blogs.length > 0 && (
          <div className="mt-8 border-t border-slate-200 py-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Showing all {totalCount} articles
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
