"use client"
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { CountryCardSkeleton } from './CountryCardSkeleton';

interface Country {
  name: string;
  flag: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

const mappedCountrySlugs = [
  'russia',
  'bangladesh',
  'georgia',
  'kazakhstan',
  'philippines',
  'ukraine',
  'germany',
  'canada',
];

const countryImages: Record<string, string> = {
  russia: 'https://i.pinimg.com/736x/aa/c4/b8/aac4b826e8bb7a1bb9426b05f5cdab67.jpg',
  germany: 'https://i.pinimg.com/1200x/13/8b/18/138b188a7733e6c432924b851f60509e.jpg',
  philippines: 'https://i.pinimg.com/736x/a6/d0/dd/a6d0ddadb1b95a301b3730f754a17ec7.jpg',
  georgia: 'https://i.pinimg.com/1200x/72/74/d9/7274d95a5bd94f1d2a234211f2b6fe9e.jpg',
  canada: 'https://i.pinimg.com/1200x/a7/1a/7b/a71a7b5e7a8171a07c2b78b6235db43a.jpg',
  australia: 'https://i.pinimg.com/1200x/f7/57/52/f757529935694e281ac9847902eb1e09.jpg',
  kyrgyzstan: 'https://i.pinimg.com/1200x/f5/ff/f3/f5fff30f2c6a0b8a1d43c82622950c93.jpg',
  bangladesh: 'https://i.pinimg.com/736x/04/c4/c1/04c4c1c4573f00c1bf51a2fb622f32f7.jpg',
  kazakhstan: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  ukraine: 'https://i.pinimg.com/1200x/e9/d1/49/e9d14928b9ebbf9606adcc340c5a7667.jpg',
};

const CountryCard = ({ country }: { country: Country }) => (
  <Link href={`/countries/${country.slug}`} className="group block h-full">
    <div className="group relative overflow-hidden rounded-[1.25rem] border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1">
      <img
        src={countryImages[country.slug] || countryImages.canada}
        alt={country.name}
        loading="lazy"
        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-navy)]/90 via-[var(--surface-navy)]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-2 text-xl font-extrabold text-white">{country.name}</div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-amber-300">
          <span>{country.flag} 120+ Colleges</span>
          <span>From ₹2.5L/yr</span>
        </div>
      </div>
    </div>
  </Link>
);

const PopularCountries = () => {
  const fetchCountries = async (): Promise<Country[]> => {
    const response = await fetch('/api/countries', { headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Failed to fetch');
    return Array.isArray(result.data) ? result.data : [];
  };
  
  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['popular-countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  
  const fallbackCountries: Country[] = [
    { name: 'Russia', flag: '🇷🇺', slug: 'russia', description: 'Top destination for MBBS with NMC approved universities.', is_active: true },
    { name: 'Bangladesh', flag: '🇧🇩', slug: 'bangladesh', description: 'Close to India with similar curriculum.', is_active: true },
    { name: 'Georgia', flag: '🇬🇪', slug: 'georgia', description: 'European standard medical education.', is_active: true },
    { name: 'Kazakhstan', flag: '🇰🇿', slug: 'kazakhstan', description: 'Affordable MBBS programs.', is_active: true },
    { name: 'Philippines', flag: '🇵🇭', slug: 'philippines', description: 'English-medium medical education.', is_active: true },
    { name: 'Ukraine', flag: '🇺🇦', slug: 'ukraine', description: 'Quality medical education.', is_active: true },
    { name: 'Germany', flag: '🇩🇪', slug: 'germany', description: 'Global study destination with strong academic reputation.', is_active: true },
    { name: 'Canada', flag: '🇨🇦', slug: 'canada', description: 'High quality education with excellent student opportunities.', is_active: true }
  ];

  const displayCountries = mappedCountrySlugs
    .map((slug) => countries.find((country) => country.slug === slug) || fallbackCountries.find((country) => country.slug === slug))
    .filter(Boolean) as Country[];

  return (
    <section className="section-home relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="eyebrow">
            Study Destinations
          </div>
          <h2 className="mb-6 mt-6 text-4xl font-black leading-[0.9] tracking-tighter text-[var(--surface-navy)] sm:text-5xl md:text-6xl">
            Explore Top <span className="heading-gold">Countries</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-500">
            Choose from leading destinations offering world-class education, affordable living,
            and strong career opportunities.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <CountryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {displayCountries.map((country) => (
              <CountryCard country={country} key={country.slug} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/countries" className="btn-secondary inline-flex items-center gap-2 rounded-xl px-8 py-3 font-semibold">
            View All Countries
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCountries;
