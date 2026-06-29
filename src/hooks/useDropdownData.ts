import { useQuery } from '@tanstack/react-query'

export interface DropdownCollege {
  _id: string
  name: string
  slug: string
  college_type?: 'study_abroad' | 'mbbs_abroad'
  category?: string
  overview?: {
    description?: string
  }
}

export interface DropdownExam {
  _id: string
  name?: string
  short_name?: string
  slug: string
}

export interface DropdownCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

interface DropdownData {
  colleges: DropdownCollege[]
  exams: DropdownExam[]
  countries: DropdownCountry[]
  loading: boolean
  error: string | null
}

const fetchColleges = async (): Promise<DropdownCollege[]> => {
  const response = await fetch('/api/colleges?limit=80')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  return result.data.colleges || []
}

const fetchExams = async (): Promise<DropdownExam[]> => {
  const response = await fetch('/api/exams')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch exams')
  }
  return result.data
}

const fetchCountries = async (): Promise<DropdownCountry[]> => {
  const response = await fetch('/api/countries')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }
  return result.data
}

interface UseDropdownDataOptions {
  loadColleges?: boolean
  loadExams?: boolean
}

export function useDropdownData(options: UseDropdownDataOptions = {}): DropdownData {
  const { loadColleges = false, loadExams = false } = options

  const collegesQuery = useQuery({
    queryKey: ['dropdown-colleges'],
    queryFn: fetchColleges,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    enabled: loadColleges,
  })

  const examsQuery = useQuery({
    queryKey: ['dropdown-exams'],
    queryFn: fetchExams,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    enabled: loadExams,
  })

  const countriesQuery = useQuery({
    queryKey: ['dropdown-countries'],
    queryFn: fetchCountries,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 45 * 60 * 1000, // 45 minutes
    retry: 2,
  })

  const isLoading =
    countriesQuery.isLoading ||
    (loadColleges && collegesQuery.isLoading) ||
    (loadExams && examsQuery.isLoading)
  const error = collegesQuery.error || examsQuery.error || countriesQuery.error

  return {
    colleges: collegesQuery.data || [],
    exams: examsQuery.data || [],
    countries: countriesQuery.data || [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null
  }
}
