import type { Metadata } from 'next'
import CollegesPageClient from './CollegesPageClient'
import { getInitialColleges } from '@/lib/server/public-data'

export const metadata: Metadata = {
  title: 'Colleges - MBBS Abroad & Study Abroad Universities',
  description: 'Browse top colleges and universities for MBBS abroad and study abroad programs. Compare fees, rankings, locations, and admission requirements.',
  openGraph: {
    title: 'Colleges - MBBS Abroad & Study Abroad Universities | Summit Global',
    description: 'Browse top colleges and universities for MBBS abroad and study abroad programs.',
    url: 'https://summitglobal.com/colleges',
  },
  twitter: {
    title: 'Colleges - MBBS Abroad & Study Abroad Universities | Summit Global',
    description: 'Browse top colleges and universities for MBBS abroad and study abroad programs.',
  },
  alternates: {
    canonical: 'https://summitglobal.com/colleges',
  },
}

export default async function CollegesPage() {
  const initialData = await getInitialColleges()

  return <CollegesPageClient initialData={initialData} />
}