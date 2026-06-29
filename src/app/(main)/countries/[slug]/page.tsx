import type { Metadata } from 'next'
import CountryPageClient from './CountryPageClient'
import { getCountryBySlug } from '@/lib/server/public-data'

interface CountryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params
  const country = await getCountryBySlug(slug)

  if (!country) {
    return {
      title: 'Country Not Found',
    }
  }

  const title = country.meta_title || `Study in ${country.name} - MBBS & Study Abroad`
  const description = country.meta_description || country.description?.slice(0, 160) || `Explore study opportunities in ${country.name} for MBBS abroad and study abroad programs.`

  return {
    title,
    description,
    openGraph: {
      title: `${country.name} - Study Abroad Destination | Summit Global`,
      description,
      url: `https://summitglobal.com/countries/${slug}`,
    },
    twitter: {
      title: `${country.name} - Study Abroad Destination | Summit Global`,
      description,
    },
    alternates: {
      canonical: `https://summitglobal.com/countries/${slug}`,
    },
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params
  const initialCountry = await getCountryBySlug(slug)

  return <CountryPageClient initialCountry={initialCountry} />
}
