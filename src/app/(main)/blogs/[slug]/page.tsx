'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  FileText,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Compass,
  BadgeCheck
} from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'
import { BlogDetailSkeleton } from '@/app/Components/PublicPageSkeletons'

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const { openModal } = useFormModal()
  
  const { 
    data: blog, 
    isLoading, 
    error, 
    refetch 
  } = useBlog(slug)

  const tags = blog?.tags ?? []
  const relatedExams = blog?.related_exams ?? []

  if (isLoading) {
    return <BlogDetailSkeleton />
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="max-w-md rounded-[2rem] border border-slate-100 bg-slate-50 p-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
            <FileText size={32} className="text-amber-500" />
          </div>
          <h2 className="mb-2 text-2xl font-black text-slate-900">Insight Unavailable</h2>
          <p className="mb-8 font-medium text-slate-500">The article you are looking for is unavailable right now.</p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => refetch()} className="h-12 rounded-2xl bg-[var(--surface-navy)] font-bold text-white transition-all hover:bg-slate-800">
              Retry Connection
            </Button>
            <Link href="/blogs">
              <Button variant="ghost" className="font-bold text-amber-600">Return to Insights</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/blogs" className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-amber-600">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Insights</span>
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border-none bg-amber-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 hover:bg-amber-50">
                {blog.category}
              </Badge>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {blog.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-500 md:text-lg">
              Practical insight for MBBS Abroad and Study Abroad planning, designed for students and parents who need clarity before taking the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-500" />
                {new Date(blog.published_at || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-500" />
                {blog.read_time || 5} min read
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-amber-500" />
                {blog.author || 'Summit Global Editorial Team'}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-amber-500">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Best For</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Students planning MBBS Abroad and Study Abroad applications</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-amber-500">
                  <Compass className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Focus</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Admissions, destinations, exams, scholarships, and next-step planning</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-amber-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Reading Time</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{blog.read_time || 5} minutes of practical guidance</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={openModal} className="h-14 rounded-2xl bg-amber-500 px-8 font-black text-slate-950 hover:bg-amber-400">
                Book Free Counselling
              </Button>
              <Link href="/blogs">
                <Button variant="outline" className="h-14 rounded-2xl border-slate-200 px-8 font-black text-[var(--surface-navy)] hover:bg-slate-50">
                  Browse More Insights
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-[var(--surface-navy)] p-8 text-white shadow-sm lg:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Reader Snapshot</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">A clear editorial guide for your next abroad decision</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Each article is structured to simplify research, compare options, and help you move from confusion to action.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em]">What You Get</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-white">Actionable guidance instead of generic study abroad advice.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em]">Ideal Use</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-white">Use this while shortlisting destinations, planning exams, or preparing applications.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <FileText className="h-4 w-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em]">Covered Topics</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-white">
                  {tags.slice(0, 5).join(', ') || 'Admissions, exams, scholarships, and destination planning'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Topics Covered</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-xl font-black text-white">
                    {blog.author?.[0] || 'A'}
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">Written By</p>
                    <h4 className="font-bold text-slate-900">{blog.author || 'Summit Global Editorial Team'}</h4>
                  </div>
                </div>
                
                <div className="space-y-4 border-t border-slate-200/60 pt-6">
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase"><Calendar size={14}/> Date</div>
                    <span className="text-xs font-medium">{new Date(blog.published_at || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase"><Clock size={14}/> Reading</div>
                    <span className="text-xs font-medium">{blog.read_time || 5} min read</span>
                  </div>
          
                </div>
              </div>

              {relatedExams.length > 0 && (
                <div className="space-y-4">
                  <h3 className="px-2 text-xs font-black uppercase tracking-widest text-slate-400">Related Exams</h3>
                  <div className="grid gap-2">
                    {relatedExams.map((exam) => (
                      <div key={exam} className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 transition-colors hover:border-amber-300">
                        <span className="text-sm font-bold text-slate-700">{exam}</span>
                        <ChevronRight size={16} className="text-slate-300 transition-colors group-hover:text-amber-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            {blog.image && (
              <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-[2.5rem] shadow-sm">
                <img
                  src={blog.image.startsWith('http') ? blog.image : `/images/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div 
                className="rounded-[2rem] border border-slate-100 bg-white p-8 text-lg leading-relaxed text-slate-700 shadow-sm md:p-10"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.replace(/\n/g, '<br />') 
                }}
              />
            </div>

            <div className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-[var(--surface-navy)] p-10 text-white">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="mb-4 text-2xl font-black">Need expert guidance after reading this?</h3>
                <p className="mb-8 max-w-xl text-slate-300">
                  Talk to our team for help with MBBS Abroad admissions, destination shortlisting, scholarships, and exam planning.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                   <Button onClick={openModal} className="h-14 rounded-2xl bg-amber-500 px-8 font-black text-slate-950 hover:bg-amber-400">Book Free Counselling</Button>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/blogs">
                <Button variant="outline" className="h-16 rounded-[2rem] border-2 border-[var(--surface-navy)] px-10 font-black text-[var(--surface-navy)] transition-all hover:bg-[var(--surface-navy)] hover:text-white">
                  Browse All Insights
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </div>
  )
}

export default BlogDetailPage
