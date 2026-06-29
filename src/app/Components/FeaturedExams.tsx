"use client"
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, Trophy, DollarSign, Calendar, ArrowUpRight,
  FileText, Building2, ArrowRight, GraduationCap,
  ChevronRight, Sparkles
} from 'lucide-react';
import type {
  HomeFeaturedCollegeData,
  HomeFeaturedExamData,
} from '@/lib/server/public-data';

// --- Interfaces (Kept as per your original structure) ---
interface FeaturedCollegeApiItem {
  name: string;
  slug: string;
  banner_url?: string;
  fees?: number;
  duration?: string;
  establishment_year?: string;
  about_content?: string;
  college_type?: string;
  country_ref?: {
    name?: string;
    city?: string;
    slug?: string;
  } | string | null;
  ranking?: {
    country_ranking?: string;
  } | string | null;
  fees_structure?: {
    courses?: Array<{
      annual_tuition_fee?: string;
      duration?: string;
    }>;
  };
}

interface FeaturedExamApiItem {
  name: string;
  slug: string;
  short_name?: string;
  exam_type?: string;
  conducting_body?: string;
  exam_mode?: string;
  frequency?: string;
  description?: string;
}

interface FeaturedCollegeCardProps {
  name: string; image: string; location: string; ranking?: string;
  fees?: number | string; duration?: string; establishment_year?: string;
  slug: string; country?: string; about?: string; college_type?: string;
}

interface ExamCardProps {
  name: string; short_name?: string; exam_type?: string;
  conducting_body?: string; exam_mode?: string;
  description?: string; slug: string;
}

// --- Component 1: Featured College Card ---

const FeaturedCollegeCard = ({ name, image, location, college_type, ranking, fees, duration, establishment_year, slug, country, about }: FeaturedCollegeCardProps) => (
  <Link href={`/colleges/${slug}`} className="group block h-full">
    <div className="premium-card-light relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={image || "/next.svg"} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-navy)]/70 via-[var(--surface-navy)]/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[var(--surface-navy)] shadow-lg">
          {country || "Global Campus"}
        </div>

        {ranking && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[var(--surface-navy)] shadow-lg">
            <Trophy size={13} className="text-amber-500" />
            <span>{ranking}</span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                <Building2 size={11} />
                Top College
              </span>
              {establishment_year && <span>Estd. {establishment_year}</span>}
            </div>
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-slate-950 transition-colors group-hover:text-amber-600">
              {name}
            </h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
            <GraduationCap size={22} />
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">
            <MapPin size={13} className="text-amber-500" />
            <span>{location || country || "Location not available"}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">
            <Building2 size={12} />
            <span>{college_type || "University"}</span>
          </div>
        </div>

        {about && (
          <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-500">
            {about}
          </p>
        )}

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-1 flex items-center gap-1 text-[9px] font-black uppercase text-slate-400">
              <DollarSign size={10} /> Annual Fee
            </p>
            <p className="text-sm font-bold text-slate-900">
              {typeof fees === 'string' ? fees : (fees ? `$${fees.toLocaleString()}` : 'N/A')}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-1 flex items-center gap-1 text-[9px] font-black uppercase text-slate-400">
              <Calendar size={10} /> Duration
            </p>
            <p className="text-sm font-bold text-slate-900">{duration ? `${duration} Years` : 'N/A'}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            View Profile
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--surface-navy)] transition-transform group-hover:translate-x-1">
            Explore
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Component 2: Modern Exam Card ---

const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, description, slug }: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="group block h-full">
    <div className="premium-card-light relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 transition-all duration-300 hover:border-amber-300">
      <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300 transition-all duration-500 group-hover:bg-amber-400 group-hover:text-[var(--surface-navy)]">
            <FileText size={24} />
          </div>
          <span className="rounded-lg bg-amber-300/15 px-2 py-1 text-[10px] font-black uppercase text-amber-600">Active</span>
        </div>

        <h3 className="mb-1 text-2xl font-black text-slate-900 transition-colors group-hover:text-amber-500">
          {short_name || name}
        </h3>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">{conducting_body || "Exam Route"}</p>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-slate-100">
            {exam_mode}
          </span>
          <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-slate-100">
            {exam_type}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4 transition-colors group-hover:bg-amber-50">
        <span className="text-[10px] font-black uppercase text-amber-600">View Exam Pattern</span>
        <ChevronRight size={16} className="text-amber-600 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

// --- Sections & Main Logic ---

interface FeaturedSectionProps {
  featuredColleges: HomeFeaturedCollegeData[]
  exams: HomeFeaturedExamData[]
}

export default function FeaturedSection({
  featuredColleges: featuredCollegeSource,
  exams: examSource,
}: FeaturedSectionProps) {
  const [collegeCount, setCollegeCount] = useState(6);
  const eCount = 8;
  const featuredColleges = useMemo(() => {
    if (!featuredCollegeSource) return [];
    return featuredCollegeSource.map((college: FeaturedCollegeApiItem) => ({
      name: college.name,
      image: college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`,
      location: typeof college.country_ref === 'object' ? (college.country_ref?.city || college.country_ref?.name || '') : '',
      ranking: typeof college.ranking === 'object' ? college.ranking?.country_ranking : (college.ranking || undefined),
      fees: college.fees_structure?.courses?.[0]?.annual_tuition_fee ?
        college.fees_structure.courses[0].annual_tuition_fee : college.fees,
      duration: college.fees_structure?.courses?.[0]?.duration || college.duration,
      establishment_year: college.establishment_year,
      slug: college.slug,
      country: typeof college.country_ref === 'object' ? college.country_ref?.name : undefined,
      about: college.about_content,
      college_type: college.college_type || 'University'
    }));
  }, [featuredCollegeSource]);

  const transformedExams = useMemo(() => {
    if (!examSource) return [];
    return examSource.map((exam: FeaturedExamApiItem) => ({
      name: exam.name,
      short_name: exam.short_name,
      exam_type: exam.exam_type,
      conducting_body: exam.conducting_body,
      exam_mode: exam.exam_mode,
      frequency: exam.frequency,
      description: exam.description,
      slug: exam.slug
    }));
  }, [examSource]);

  return (
    <div className="section-home overflow-hidden py-24 space-y-32">
      
      {/* Universities Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-600">
              <Sparkles size={18} className="animate-pulse" />
              <span>NMC Approved Institutions</span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-slate-950 md:text-6xl">
              TOP <span className="heading-gold">COLLEGES</span>
            </h2>
          </div>
          <Link href="/colleges" className="hidden items-center gap-2 font-bold text-slate-900 transition-colors hover:text-amber-600 md:flex">
            Explore All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredColleges.slice(0, collegeCount).map((college) => <FeaturedCollegeCard key={college.slug} {...college} />)}
        </div>

        {collegeCount < featuredColleges.length && (
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <button onClick={() => setCollegeCount(prev => prev + 3)} className="btn-primary rounded-full px-10 py-4 font-bold">
              Show More Colleges
            </button>
            <Link href="/colleges"  className="inline-flex items-center rounded-full border border-[var(--surface-navy)] px-10 py-4 font-bold text-[var(--surface-navy)] transition-all duration-200 hover:bg-slate-50">
              All colleges
            </Link>
          </div>
        )}
      </section>

      {/* Exams Section */}
      <section className="section-home py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
              CRACK THE <span className="heading-gold">EXAMS</span>
            </h2>
            <p className="text-lg font-medium text-slate-600">Your gateway to medical excellence starts here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformedExams.slice(0, eCount).map((exam: ExamCardProps) => <ExamCard key={exam.slug} {...exam} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
