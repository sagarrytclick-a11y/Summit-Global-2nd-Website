import type { Metadata } from 'next'
import CountriesPageClient from './CountriesPageClient'
import { getInitialCountries } from '@/lib/server/public-data'

export const metadata: Metadata = {
  title: 'Study Destinations - MBBS & Study Abroad Countries',
  description: 'Explore top study destinations for MBBS abroad and study abroad programs. Compare countries for university admissions, living costs, and student life.',
  openGraph: {
    title: 'Study Destinations - MBBS & Study Abroad Countries | Summit Global',
    description: 'Explore top study destinations for MBBS abroad and study abroad programs.',
    url: 'https://summitglobal.com/countries',
  },
  twitter: {
    title: 'Study Destinations - MBBS & Study Abroad Countries | Summit Global',
    description: 'Explore top study destinations for MBBS abroad and study abroad programs.',
  },
  alternates: {
    canonical: 'https://summitglobal.com/countries',
  },
}

export default async function CountriesPage() {
  const initialCountries = await getInitialCountries()

  return <CountriesPageClient initialCountries={initialCountries as any} />
}
