import { useQuery } from '@tanstack/react-query'

export interface CountryCollege {
  _id: string
  name: string
  slug: string
  category?: string
  overview?: {
    description?: string
  }
}

const fetchCollegesByCountry = async (countrySlug: string): Promise<CountryCollege[]> => {
  const response = await fetch(`/api/colleges?country=${countrySlug}&limit=24`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  return result.data.colleges || []
}

export function useCountryColleges(countrySlug: string | null) {
  return useQuery({
    queryKey: ['country-colleges', countrySlug],
    queryFn: () => countrySlug ? fetchCollegesByCountry(countrySlug) : [],
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  })
}
