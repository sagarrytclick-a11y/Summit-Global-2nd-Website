"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MapPin, GraduationCap, DollarSign, Star, ArrowRight, Loader2, Bell, X } from 'lucide-react';
import { CollegeGridSkeleton } from './CollegeCardSkeleton';

interface College {
  _id: string;
  name: string;
  slug: string;
  college_type: string;
  country_ref: {
    _id: string;
    name: string;
    slug: string;
    flag: string;
  };
  establishment_year: string;
  banner_url: string;
  overview: {
    title: string;
    description: string;
  };
  key_highlights: {
    features: string[];
  };
  ranking: {
    country_ranking: string;
    world_ranking: string;
  };
  fees_structure?: {
    courses: [{
      course_name: string;
      duration: string;
      annual_tuition_fee: string;
    }];
  };
  fees?: number;
  duration?: string;
  legacy_ranking?: string;
}

const MbbsAbroad: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [displayedColleges, setDisplayedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(`/api/colleges?college_type=mbbs_abroad&page=${page}&limit=6`);
      const result = await response.json();

      const newColleges = Array.isArray(result?.data?.colleges) ? result.data.colleges : [];

      if (result.success && newColleges.length > 0) {
        
        if (append) {
          setColleges(prev => [...prev, ...newColleges]);
          setDisplayedColleges(prev => [...prev, ...newColleges]);
        } else {
          setColleges(newColleges);
          setDisplayedColleges(newColleges);
        }

        setHasMore(Boolean(result?.data?.hasNext));
        setCurrentPage(page);
      } else {
        if (!append) {
          await fetchMBBSFallback();
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching MBBS colleges:', error);
      if (!append) {
        await fetchMBBSFallback();
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const fetchMBBSFallback = useCallback(async () => {
    try {
      const response = await fetch('/api/colleges');
      const result = await response.json();

      if (result.success) {
        const allColleges = Array.isArray(result?.data?.colleges) ? result.data.colleges : [];
        const mbbsColleges = allColleges.filter((college: College) =>
          college.slug?.toLowerCase().includes('mbbs') ||
          college.name?.toLowerCase().includes('medical') ||
          college.name?.toLowerCase().includes('mbbs') ||
          college.college_type === 'mbbs_abroad'
        );

        setColleges(mbbsColleges);
        setDisplayedColleges(mbbsColleges.slice(0, 6));
        setHasMore(mbbsColleges.length > 6);
      }
    } catch (error) {
      console.error('Error in fallback fetch:', error);
    }
  }, []);

  const loadMore = async () => {
    if (hasMore && !loadingMore) {
      const nextPage = currentPage + 1;
      await fetchColleges(nextPage, true);
    }
  };

  const getCollegeFees = (college: College): string => {
    if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
      const course = college.fees_structure.courses[0];
      return course.annual_tuition_fee || `$${college.fees || 'N/A'}/year`;
    }
    return college.fees ? `$${college.fees}/year` : 'Contact for fees';
  };

  const getCollegeDuration = (college: College): string => {
    if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
      const course = college.fees_structure.courses[0];
      return course.duration || college.duration || '5-6 Years';
    }
    return college.duration || '5-6 Years';
  };

  const getCollegeRanking = (college: College): string => {
    return college.ranking?.country_ranking || college.legacy_ranking || 'Ranked';
  };

  const isNMCApproved = (college: College): boolean => {
    return college.college_type === 'mbbs_abroad';
  };

  const availableCountries = [
    'all',
    ...Array.from(new Set(colleges.map((college) => college.country_ref?.name).filter(Boolean))),
  ];

  const visibleColleges =
    selectedCountry === 'all'
      ? displayedColleges
      : displayedColleges.filter((college) => college.country_ref?.name === selectedCountry);

  // Sticky UI Components (WhatsApp & Notifications)
  const StickyActions = () => (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col gap-3">
      <a
        href="https://wa.me/919958565973"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center rounded-full border border-[#1FA855] bg-[#25D366] p-4 text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-105 hover:bg-[#1EBE5D]"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <button
        onClick={() => setShowPopup(true)}
        className="relative flex items-center justify-center rounded-full bg-amber-500 p-4 text-slate-900 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-amber-600"
      >
        <Bell className="w-6 h-6" />
        {showPopup && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>
    </div>
  );

  // Popup Component
  const AdPopup = () => (
    showPopup && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
        <div className="relative w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-xl animate-scale-in">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>
          <img
            src="/mbbsbanner.png"
            alt="MBBS Abroad"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <>
        <section className="section-home px-4 py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="mx-auto mb-4 h-10 w-96 animate-pulse rounded-lg bg-slate-100" />
              <div className="mx-auto h-6 w-[500px] animate-pulse rounded bg-slate-100" />
            </div>
            <CollegeGridSkeleton count={6} />
          </div>
        </section>
        <StickyActions />
        <AdPopup />
      </>
    );
  }

  return (
    <>
      <StickyActions />
      
      <section className="section-home relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-300/10 blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-7xl">
          <div className="relative mb-12 text-center">
            <div className="eyebrow">
              Top MBBS Destinations
            </div>
            <h2 className="mt-6 text-4xl font-black text-slate-950 md:text-5xl">
              Featured Medical
              <span className="heading-gold ml-3">Universities</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
              Explore NMC recognised medical universities with world-class infrastructure,
              transparent fees, and country-wise filtering for faster exploration.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {availableCountries.slice(0, 7).map((country) => {
              const isActive = selectedCountry === country;
              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${isActive ? 'border-[var(--surface-navy)] bg-[var(--surface-navy)] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-600'}`}
                >
                  {country === 'all' ? 'All Countries' : country}
                </button>
              );
            })}
          </div>

          <div className="relative mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleColleges.map((college) => (
              <div
                key={college._id}
                className="premium-card group overflow-hidden rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/30"
              >
                <div className="relative h-56 overflow-hidden">
                  {college.banner_url ? (
                    <img
                      src={college.banner_url}
                      alt={college.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f5efe5] to-[#fffdf8]">
                      <GraduationCap className="h-16 w-16 text-amber-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-navy)]/80 via-transparent to-transparent" />
                  {isNMCApproved(college) && (
                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--surface-navy)] shadow-sm">
                      NMC Approved
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-2 shadow-lg">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{college.country_ref?.flag || 'MBBS'} {college.country_ref?.name}</p>
                    <p className="text-sm font-extrabold text-[var(--surface-navy)]">{getCollegeDuration(college)}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-slate-950">{college.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-amber-500" />
                        <span>{college.country_ref?.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">4.8</span>
                      </div>
                      <p className="text-xs text-slate-500">{getCollegeRanking(college)}</p>
                    </div>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                    {college.overview?.description || 'Quality medical education with international standards.'}
                  </p>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                      <DollarSign size={16} className="text-amber-500" />
                      <span className="text-sm font-medium text-slate-700">{getCollegeFees(college)}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                      <GraduationCap size={16} className="text-amber-500" />
                      <span className="text-sm font-medium text-slate-700">{getCollegeRanking(college)}</span>
                    </div>
                  </div>

                  <Link href={`/colleges/${college.slug}`}>
                    <button className="btn-secondary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold hover:text-amber-600">
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mb-8 text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="mx-auto flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:border-amber-300/40 hover:bg-amber-50 disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Colleges
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/mbbs-abroad"
              className="btn-primary inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-bold"
            >
              Explore All MBBS Colleges
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <AdPopup />
    </>
  );
};

export default MbbsAbroad;
