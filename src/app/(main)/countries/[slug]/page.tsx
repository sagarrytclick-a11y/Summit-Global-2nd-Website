import CountryPageClient from './CountryPageClient'
import { getCountryBySlug } from '@/lib/server/public-data'

interface CountryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params
  const initialCountry = await getCountryBySlug(slug)

  return <CountryPageClient initialCountry={initialCountry} />
}
