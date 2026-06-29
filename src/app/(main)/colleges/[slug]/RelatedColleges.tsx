'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"

import { Button } from '@/components/ui/button'
import {
  DollarSign,
  Clock,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  
  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
}

interface RelatedCollegesProps {
  currentCollegeSlug: string
  initialColleges?: College[]
}

const fetchRelatedColleges = async (slug: string): Promise<College[]> => {
    const response = await fetch(`/api/colleges/${slug}/related`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch related colleges')
    }
    
    return result.data;
  };
  
  export default function RelatedColleges({ currentCollegeSlug, initialColleges = [] }: RelatedCollegesProps) {
  const { data: colleges = [], isLoading, isError, error } = useQuery({
    queryKey: ['related-colleges', currentCollegeSlug],
    queryFn: () => fetchRelatedColleges(currentCollegeSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    initialData: initialColleges,
  });

  if (isError) {
    return (
      <div className="rounded-[2rem] border border-slate-100 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <GraduationCap className="h-8 w-8 text-amber-500" />
        </div>
        <h3 className="mb-3 text-2xl font-black text-slate-900">Unable to Load Related Colleges</h3>
        <p className="mb-4 text-slate-500">{error?.message}</p>
        <p className="mx-auto mb-8 max-w-md text-slate-500">
          Explore the main colleges directory while we fetch related options again.
        </p>
        <Link href="/colleges">
          <Button className="group h-14 rounded-2xl bg-[var(--surface-navy)] px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-slate-800">
            Explore All Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group">
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2rem] overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              <div className="absolute top-4 left-4 w-24 h-6 bg-white/80 rounded-full animate-pulse" />
            </div>
            <div className="p-6 bg-white rounded-b-[2rem] shadow-sm">
              <div className="h-6 bg-slate-200 rounded-lg mb-3 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
              </div>
              <div className="h-12 bg-slate-900 rounded-2xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-100 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
          <GraduationCap className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="mb-3 text-2xl font-black text-slate-900">No Related Colleges Found</h3>
        <p className="mx-auto mb-8 max-w-md text-slate-500">
          Explore more universities from the main directory.
        </p>
        <Link href="/colleges">
          <Button className="group h-14 rounded-2xl bg-[var(--surface-navy)] px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-slate-800">
            Explore All Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {colleges.map((college) => {
        return (
          <div key={college._id} className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={college.banner_url || `https://picsum.photos/seed/${college.slug}/400/300`}
                  alt={college.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {college.ranking && (
                  <div className="absolute top-4 right-4">
                    {typeof college.ranking === 'object' ? (
                      <Badge className="rounded-full border-none bg-amber-500 px-3 py-1 text-xs font-black text-slate-950">
                        #{college.ranking.country_ranking || college.ranking.world_ranking}
                      </Badge>
                    ) : (
                      <Badge className="rounded-full border-none bg-amber-500 px-3 py-1 text-xs font-black text-slate-950">
                        #{college.ranking}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="absolute top-4 left-4">
                  <Badge className="rounded-full border-none bg-white/90 px-3 py-1 text-xs font-black text-slate-900 backdrop-blur-sm">
                    {getCountryName(college.country_ref)}
                  </Badge>
                </div>
              </div>

            <div className="p-6">
              <h3 className="mb-4 line-clamp-2 text-xl font-black leading-tight text-slate-900">
                {college.name}
              </h3>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yearly Fees</span>
                  <div className="flex items-center text-lg font-black text-amber-600">
                    <DollarSign size={16} />
                    <span>
                      {college.fees 
                        ? `$${college.fees.toLocaleString()}`
                        : college.fees_structure?.courses?.[0]?.annual_tuition_fee || 'N/A'
                      }
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</span>
                  <div className="flex items-center text-lg font-black text-slate-700">
                    <Clock size={16} className="mr-1 text-slate-400" />
                    <span>
                      {college.duration || college.fees_structure?.courses?.[0]?.duration || 'N/A'} years
                    </span>
                  </div>
                </div>
              </div>

              <Link href={`/colleges/${college.slug}`} className="block">
                <Button className="group/btn flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--surface-navy)] font-black text-white transition-all duration-300 hover:bg-amber-500 hover:text-slate-950">
                  View Program Details
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
