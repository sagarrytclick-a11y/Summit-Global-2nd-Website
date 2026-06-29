"use client";

import type { ReactElement } from "react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight,
  ArrowUpRight, GraduationCap, Building2, Search,
  Sparkles
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import type { DropdownCollege, DropdownCountry, DropdownExam } from "@/hooks/useDropdownData";
import { useDropdownData } from "@/hooks/useDropdownData";
import type { CountryCollege } from "@/hooks/useCountryColleges";
import { useCountryColleges } from "@/hooks/useCountryColleges";
import { DropdownGridSkeleton, DropdownListSkeleton } from "@/app/Components/PublicPageSkeletons";

type ScopeDropdownItem = {
  key: string;
  title: string;
  href: string;
};

type CollegeCategoryDropdownItem = {
  key: 'study-abroad' | 'mbbs-abroad';
  title: string;
  slug: 'study-abroad' | 'mbbs-abroad';
  icon: ReactElement;
};

type ExamDropdownItem = {
  key: string;
  title: string;
  href: string;
};

type CountryDropdownItem = {
  key: string;
  title: string;
  href: string;
  flag: string;
  slug: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [shouldLoadCollegeDropdown, setShouldLoadCollegeDropdown] = useState(false);
  const [shouldLoadExamDropdown, setShouldLoadExamDropdown] = useState(false);
  const [shouldLoadCountryDropdown, setShouldLoadCountryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click based states for fetching
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCollegeType, setSelectedCollegeType] = useState<'study-abroad' | 'mbbs-abroad'>('study-abroad');

  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries, loading } = useDropdownData({
    loadColleges: shouldLoadCollegeDropdown,
    loadExams: shouldLoadExamDropdown,
    loadCountries: shouldLoadCountryDropdown,
  });

  const { data: countryColleges = [], isLoading: loadingColleges } = useCountryColleges(selectedCountry);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => setDebouncedSearch(value), 200);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (shouldLoadCountryDropdown && !selectedCountry && countries[0]?.slug) {
      setSelectedCountry(countries[0].slug);
    }
  }, [shouldLoadCountryDropdown, selectedCountry, countries]);

  const filteredColleges = useMemo(() => {
    let baseColleges: DropdownCollege[] = [];

    if (selectedCollegeType === 'mbbs-abroad') {
      let mbbsColleges = colleges.filter(c => c.college_type === 'mbbs_abroad');
      if (mbbsColleges.length === 0) {
        mbbsColleges = colleges.filter(c =>
          c.slug?.toLowerCase().includes('mbbs') ||
          c.name?.toLowerCase().includes('medical') ||
          c.name?.toLowerCase().includes('mbbs')
        );
      }
      baseColleges = mbbsColleges;
    } else {
      let studyAbroadColleges = colleges.filter(c => c.college_type === 'study_abroad');
      if (studyAbroadColleges.length === 0) {
        const mbbsNames = colleges.filter(c =>
          c.slug?.toLowerCase().includes('mbbs') ||
          c.name?.toLowerCase().includes('medical') ||
          c.name?.toLowerCase().includes('mbbs')
        );
        studyAbroadColleges = colleges.filter(c => !mbbsNames.includes(c));
      }
      baseColleges = studyAbroadColleges;
    }

    if (debouncedSearch.trim()) {
      const searchLower = debouncedSearch.toLowerCase();
      return baseColleges.filter(college =>
        college.name.toLowerCase().includes(searchLower) ||
        college.overview?.description?.toLowerCase().includes(searchLower) ||
        college.slug?.toLowerCase().includes(searchLower)
      );
    }

    return baseColleges;
  }, [colleges, selectedCollegeType, debouncedSearch]);

  // Filter country colleges based on search term
  const filteredCountryColleges = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return countryColleges;
    }

    const searchLower = debouncedSearch.toLowerCase();
    const filtered = countryColleges.filter((college: CountryCollege) =>
      college.name.toLowerCase().includes(searchLower) ||
      college.overview?.description?.toLowerCase().includes(searchLower) ||
      college.slug?.toLowerCase().includes(searchLower)
    );
    return filtered;
  }, [countryColleges, debouncedSearch]);

  const filteredExams = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return exams;
    }

    const searchLower = debouncedSearch.toLowerCase();
    return exams.filter((exam: DropdownExam) =>
      exam.name?.toLowerCase().includes(searchLower) ||
      exam.short_name?.toLowerCase().includes(searchLower) ||
      exam.slug?.toLowerCase().includes(searchLower)
    );
  }, [exams, debouncedSearch]);

  const navItems = [
    { name: "Scopes & Avenues", href: "/", hasDropdown: true },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Countries", href: "/countries", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/about" },
  ];

  const dropdownContent: {
    "Scopes & Avenues": ScopeDropdownItem[];
    Colleges: CollegeCategoryDropdownItem[];
    Exams: ExamDropdownItem[];
    Countries: CountryDropdownItem[];
  } = {
    "Scopes & Avenues": [
      { key: "study-abroad", title: "Study Abroad", href: "/study-abroad" },
      { key: "mbbs-abroad", title: "MBBS Abroad", href: "/mbbs-abroad" }
    ],
    Colleges: [
      { key: "study-abroad", title: "Study Abroad", slug: "study-abroad", icon: <GraduationCap size={18} /> },
      { key: "mbbs-abroad", title: "MBBS Abroad", slug: "mbbs-abroad", icon: <Building2 size={18} /> }
    ],
    Exams: exams
      .filter((e: DropdownExam) => Boolean(e?.slug))
      .map((e: DropdownExam) => ({
        key: e._id || e.slug,
        title: e.short_name || e.slug,
        href: `/exams/${e.slug}`
      })),
    Countries: countries.map((c: DropdownCountry) => ({
      key: c._id || c.slug || c.name,
      title: `Study in ${c.name}`,
      href: `/countries/${c.slug}`,
      flag: c.flag,
      slug: c.slug
    })),
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  const openDesktopDropdown = useCallback((itemName: string) => {
    setHoveredItem(itemName);
    setSearchTerm('');
    setDebouncedSearch('');

    if (itemName === "Colleges") {
      setShouldLoadCollegeDropdown(true);
    }

    if (itemName === "Exams") {
      setShouldLoadExamDropdown(true);
    }

    if (itemName === "Countries") {
      setShouldLoadCountryDropdown(true);
    }
  }, []);

  const closeDesktopDropdown = useCallback(() => {
    setHoveredItem(null);
    setSearchTerm('');
    setDebouncedSearch('');
  }, []);

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/98 backdrop-blur-lg shadow-xl shadow-slate-200/70" : "bg-white/92 backdrop-blur-sm shadow-sm shadow-slate-200/40"}`}>

      {/* TOP CONTACT BAR */}
      <div className="hidden bg-[var(--surface-navy)] text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[13px]">
          <div className="flex items-center gap-8">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2 text-slate-100 transition-colors hover:text-amber-300"><Phone size={14} /><span>{phones.primary}</span></a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2 text-slate-100 transition-colors hover:text-amber-300"><Mail size={14} /><span>{emails.info}</span></a>
          </div>
          <div className="flex items-center gap-2 text-slate-300"><MapPin size={14} /><span>{address.office}</span></div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-[5.5rem] items-center justify-between">
            <Link href="/" className="flex flex-shrink-0 items-center gap-3">
              <img src={SITE_IDENTITY.assets.logo.main} alt="Logo" className="h-20 w-auto" loading="lazy" />
              <div className="hidden min-w-0 sm:block">
                <p className="text-xl font-black tracking-tight text-[var(--surface-navy)]">
                  Summit Global
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  MBBS & Study Abroad
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/90 p-1.5 shadow-inner shadow-white lg:flex">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => openDesktopDropdown(item.name)}
                  onMouseLeave={closeDesktopDropdown}
                >
                  <Link href={item.href} className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-black tracking-[0.02em] transition-all duration-200 ${isActive(item.href) ? "bg-white text-[var(--surface-navy)] shadow-sm shadow-slate-200" : "text-slate-600 hover:bg-white hover:text-amber-600 hover:shadow-sm hover:shadow-slate-200/70"}`}>
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={14} className={`transition-transform ${hoveredItem === item.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {item.hasDropdown && hoveredItem === item.name && (
                    <div className={`absolute left-1/2 top-[calc(100%-0.2rem)] z-[60] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] ${(item.name === 'Countries' || item.name === 'Colleges') ? 'w-[54rem]' : item.name === 'Exams' ? 'w-[32rem]' : 'w-[28rem]'}`}>

                      {(item.name === 'Countries' || item.name === 'Colleges') ? (
                        <div className="grid h-[500px] grid-cols-[240px_1fr]">
                          <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--surface-navy)] p-6 text-white">
                            <div>
                              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Explore {item.name}</p>
                              <h3 className="mt-4 text-3xl font-black tracking-tight">
                                {item.name === 'Colleges' ? 'Find the right academic path' : 'Compare destinations at a glance'}
                              </h3>
                              <p className="mt-4 text-sm leading-7 text-slate-300">
                                {item.name === 'Colleges'
                                  ? 'Switch between pathways and scan universities with a cleaner, guidance-first dropdown.'
                                  : 'Select a country and review universities without opening another page first.'}
                              </p>
                            </div>

                            <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-1">
                              {item.name === 'Countries' ? (
                                (dropdownContent.Countries as CountryDropdownItem[]).map((dropdownItem, index: number) => {
                                  const isSelected = selectedCountry === dropdownItem.slug;
                                  return (
                                    <button
                                      key={dropdownItem.key || dropdownItem.slug || `${dropdownItem.title}-${index}`}
                                      onClick={() => setSelectedCountry(dropdownItem.slug)}
                                      className={`mb-2 flex w-full items-center justify-between rounded-[1.25rem] border px-4 py-3.5 text-left text-[13px] font-bold transition-all ${isSelected
                                        ? 'border-white/15 bg-white/10 text-white'
                                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/30 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                      <span className="flex items-center gap-3">
                                        {dropdownItem.flag && <span className="text-lg">{dropdownItem.flag}</span>}
                                        {dropdownItem.title}
                                      </span>
                                      <ChevronRight size={14} className={isSelected ? 'text-amber-300' : 'text-slate-400'} />
                                    </button>
                                  );
                                })
                              ) : (
                                (dropdownContent.Colleges as CollegeCategoryDropdownItem[]).map((dropdownItem, index: number) => {
                                  const isSelected = selectedCollegeType === dropdownItem.slug;
                                  return (
                                    <button
                                      key={dropdownItem.key || dropdownItem.slug || `${dropdownItem.title}-${index}`}
                                      onClick={() => setSelectedCollegeType(dropdownItem.slug)}
                                      className={`mb-2 flex w-full items-center justify-between rounded-[1.25rem] border px-4 py-3.5 text-left text-[13px] font-bold transition-all ${isSelected
                                        ? 'border-white/15 bg-white/10 text-white'
                                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/30 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                      <span className="flex items-center gap-3">
                                        {dropdownItem.icon && <span className="text-amber-300">{dropdownItem.icon}</span>}
                                        {dropdownItem.title}
                                      </span>
                                      <ChevronRight size={14} className={isSelected ? 'text-amber-300' : 'text-slate-400'} />
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          <div className="flex min-h-0 flex-col bg-white">
                            <div className="border-b border-slate-100 p-6">
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                    <Sparkles size={14} className="text-amber-500" />
                                    {item.name === 'Colleges' ? 'Suggested Universities' : 'Country Snapshot'}
                                  </p>
                                  <h4 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                                    {item.name === 'Colleges'
                                      ? (selectedCollegeType === 'mbbs-abroad' ? 'MBBS Abroad options' : 'Study Abroad options')
                                      : `${countries.find((country) => country.slug === selectedCountry)?.name || 'Destination'} universities`}
                                  </h4>
                                </div>
                                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">
                                  {item.name === 'Colleges' ? `${filteredColleges.length} results` : `${filteredCountryColleges.length} results`}
                                </span>
                              </div>

                              <div className="relative mt-5">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder={item.name === 'Colleges' ? 'Search universities or colleges...' : 'Search universities in this country...'}
                                  value={searchTerm}
                                  onChange={(e) => handleSearchChange(e.target.value)}
                                  className="w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-amber-300 focus:bg-white"
                                />
                              </div>
                            </div>

                            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
                              {item.name === 'Countries' && !selectedCountry ? (
                                <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                                    <MapPin size={24} />
                                  </div>
                                  <p className="mt-4 max-w-xs text-sm font-bold leading-7 text-slate-600">
                                    Select a destination on the left to browse universities in a cleaner shortlist view.
                                  </p>
                                </div>
                              ) : (loading || loadingColleges) ? (
                                <DropdownGridSkeleton />
                              ) : (
                                <div className="grid grid-cols-2 gap-3">
                                  {(item.name === 'Colleges' ? filteredColleges : filteredCountryColleges).map((college, index: number) => (
                                    <Link
                                      key={college._id || college.slug || `${college.name}-${index}`}
                                      href={`/colleges/${college.slug}`}
                                      className="group rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4 transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:bg-white hover:shadow-md"
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
                                            {item.name === 'Colleges' ? 'University' : countries.find((country) => country.slug === selectedCountry)?.name || 'Country'}
                                          </p>
                                          <p className="mt-2 text-sm font-black leading-6 text-slate-900 group-hover:text-[var(--surface-navy)]">
                                            {college.name}
                                          </p>
                                        </div>
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-slate-400 transition-all group-hover:bg-amber-50 group-hover:text-amber-600">
                                          <ArrowUpRight size={14} />
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                  {((item.name === 'Colleges' ? filteredColleges : filteredCountryColleges).length === 0) && !loadingColleges && (
                                    <div className="col-span-2 flex min-h-48 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                                      <p className="text-sm font-bold text-slate-600">No matching universities found right now.</p>
                                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Try another search or category</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="border-t border-slate-100 bg-slate-50/60 p-5">
                              <Link
                                href={item.name === 'Colleges' ? "/colleges" : selectedCountry ? `/countries/${selectedCountry}` : "/countries"}
                                className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-[var(--surface-navy)] py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800"
                              >
                                Explore Full Directory <ArrowUpRight size={14} className="text-amber-300" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : item.name === 'Exams' ? (
                        <div className="p-5">
                          <div className="rounded-[1.75rem] bg-[var(--surface-navy)] p-5 text-white">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Exam Navigator</p>
                            <h3 className="mt-3 text-2xl font-black tracking-tight">Browse exam routes without leaving the menu</h3>
                          </div>
                          <div className="mt-4 grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-1 custom-scrollbar">
                            {filteredExams.filter((exam: DropdownExam) => Boolean(exam?.slug)).map((dropdownItem: DropdownExam, index: number) => (
                              <Link
                                key={dropdownItem._id || dropdownItem.slug || `${dropdownItem.short_name || dropdownItem.slug}-${index}`}
                                href={`/exams/${dropdownItem.slug}`}
                                className="group rounded-[1.15rem] border border-slate-100 bg-slate-50/80 p-4 transition-all hover:border-amber-200 hover:bg-white hover:shadow-sm"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-black text-slate-800 group-hover:text-[var(--surface-navy)]">{dropdownItem.short_name || dropdownItem.slug}</span>
                                  <ArrowUpRight size={14} className="text-slate-400 transition-colors group-hover:text-amber-600" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-5">
                          <div className="rounded-[1.75rem] bg-slate-50 p-5">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">Explore Pathways</p>
                            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Choose the direction that fits your study plan</h3>
                          </div>
                          <div className="mt-4 space-y-2">
                            {(dropdownContent[item.name as keyof typeof dropdownContent] as ScopeDropdownItem[]).map((dropdownItem, index: number) => (
                              <Link
                                key={dropdownItem.key || dropdownItem.href || `${dropdownItem.title}-${index}`}
                                href={dropdownItem.href}
                                className="group flex items-center justify-between rounded-[1.25rem] border border-slate-100 bg-white px-4 py-4 text-sm font-black text-slate-700 transition-all hover:border-amber-200 hover:bg-amber-50/50 hover:text-[var(--surface-navy)]"
                              >
                                <span>{dropdownItem.title}</span>
                                <ArrowUpRight size={14} className="text-slate-400 transition-colors group-hover:text-amber-600" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={openModal} className="hidden lg:block rounded-full bg-amber-500 px-7 py-3 text-[13px] font-black uppercase tracking-wider text-[var(--surface-navy)] shadow-lg shadow-amber-100 transition-all hover:bg-amber-600">
                Get Free Guide
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden bg-white transition-all duration-300 ${isOpen ? "max-h-screen opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-slate-50 last:border-0">
              <button
                onClick={() => {
                  const nextItem = expandedMobileItem === item.name ? null : item.name;
                  setExpandedMobileItem(nextItem);
                  if (nextItem === "Colleges") {
                    setShouldLoadCollegeDropdown(true);
                  }
                  if (nextItem === "Exams") {
                    setShouldLoadExamDropdown(true);
                  }
                  if (nextItem === "Countries") {
                    setShouldLoadCountryDropdown(true);
                  }
                }}
                className="w-full py-4 flex items-center justify-between text-[16px] font-bold text-slate-800"
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown size={18} className={expandedMobileItem === item.name ? 'rotate-180' : ''} />}
              </button>
              {expandedMobileItem === item.name && item.hasDropdown && (
                <div className="mb-4 space-y-2 rounded-xl bg-slate-50 p-3">

                  {/* 🔥 COLLEGES */}
                  {item.name === "Colleges" ? (
                    <>
                      {/* Mobile Search Input */}
                      <div className="relative mb-3">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                           placeholder="Search colleges..."
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm focus:border-amber-400 focus:outline-none focus:bg-white"
                        />
                      </div>

                      {/* Toggle */}
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => setSelectedCollegeType("study-abroad")}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold ${selectedCollegeType === "study-abroad"
                              ? "bg-[var(--surface-navy)] text-white"
                              : "bg-white text-slate-700"
                            }`}
                        >
                          Study Abroad
                        </button>

                        <button
                          onClick={() => setSelectedCollegeType("mbbs-abroad")}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold ${selectedCollegeType === "mbbs-abroad"
                              ? "bg-[var(--surface-navy)] text-white"
                              : "bg-white text-slate-700"
                            }`}
                        >
                          MBBS Abroad
                        </button>
                      </div>

                      {/* Colleges List */}
                      <div className="max-h-64 overflow-y-auto space-y-1">
                        {filteredColleges.map((college, index: number) => (
                          <Link
                            key={college._id || college.slug || `${college.name}-${index}`}
                            href={`/colleges/${college.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setSearchTerm(''); // Clear search after clicking a college
                            }}
                            className="block rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:text-amber-600"
                          >
                            {college.name}
                          </Link>
                        ))}
                        {item.name === 'Colleges' && filteredColleges.length === 0 && searchTerm && (
                          <div className="py-8 text-center text-slate-400 text-xs font-bold uppercase">No colleges found for {searchTerm}</div>
                        )}
                        {item.name === 'Colleges' && filteredColleges.length === 0 && !searchTerm && (
                          <div className="py-8 text-center text-slate-400 text-xs font-bold uppercase">No Colleges Found</div>
                        )}
                      </div>
                    </>
                  ) : item.name === "Exams" ? (
                    <>
                      {/* Mobile Search Input for Exams */}
                      <div className="relative mb-3">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search exams..."
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm focus:border-amber-400 focus:outline-none focus:bg-white"
                        />  
                      </div>

                      {/* 📝 EXAMS LIST */}
                      <div className="space-y-1">
                        {filteredExams.map((exam: DropdownExam, index: number) => (
                          <Link
                            key={exam._id || exam.slug || `${exam.short_name || exam.name}-${index}`}
                            href={`/exams/${exam.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-amber-600"
                          >
                            {exam.short_name || exam.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : item.name === "Countries" ? (
                    <>
                      {/* 🌍 COUNTRIES LIST */}
                      {!selectedCountry && (
                        <div className="space-y-1">
                          {countries.map((country: DropdownCountry, index: number) => (
                            <button
                              key={country._id || country.slug || `${country.name}-${index}`}
                              onClick={() => setSelectedCountry(country.slug)}
                              className="w-full rounded-lg bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 hover:text-amber-600"
                            >
                              {country.flag} Study in {country.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* 🏫 COUNTRY COLLEGES */}
                      {selectedCountry && (
                        <>
                          <button
                            onClick={() => setSelectedCountry(null)}
                            className="mb-2 text-xs font-black uppercase text-amber-600"
                          >
                            ← Back to Countries
                          </button>

                          <div className="max-h-64 overflow-y-auto space-y-1">
                            {loadingColleges ? (
                              <DropdownListSkeleton count={4} />
                            ) : countryColleges.length > 0 ? (
                              countryColleges.map((college: CountryCollege, index: number) => (
                                <Link
                                  key={college._id || college.slug || `${college.name}-${index}`}
                                  href={`/colleges/${college.slug}`}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setSearchTerm(''); // Clear search after clicking a college
                                  }}
                                  className="block rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:text-amber-600"
                                >
                                  {college.name}
                                </Link>
                              ))
                            ) : (
                              <p className="text-center text-xs text-slate-400 py-6">
                                No Colleges Found
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    /* 🌐 OTHER DROPDOWNS */
                    (dropdownContent[item.name as keyof typeof dropdownContent] as ScopeDropdownItem[]).map((sub, index: number) => (
                      <Link
                        key={sub.key || sub.href || `${sub.title}-${index}`}
                        href={sub.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-amber-600"
                      >
                        {sub.title}
                      </Link>
                    ))
                  )}
                </div>
              )}


            </div>
          ))}
          <button onClick={() => { openModal(); setIsOpen(false); }} className="mt-6 w-full rounded-xl bg-amber-500 py-4 font-black uppercase tracking-widest text-[var(--surface-navy)] shadow-lg shadow-amber-100">
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
