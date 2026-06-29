import CountriesPageClient from './CountriesPageClient'
import { getInitialCountries } from '@/lib/server/public-data'

export default async function CountriesPage() {
  const initialCountries = await getInitialCountries()

  return <CountriesPageClient initialCountries={initialCountries as any} />
}
