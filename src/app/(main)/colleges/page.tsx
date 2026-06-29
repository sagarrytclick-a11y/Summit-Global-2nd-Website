import CollegesPageClient from './CollegesPageClient'
import { getInitialColleges } from '@/lib/server/public-data'

export default async function CollegesPage() {
  const initialData = await getInitialColleges()

  return <CollegesPageClient initialData={initialData} />
}