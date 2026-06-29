import type { Metadata } from 'next'
import BlogsPageClient from './BlogsPageClient'
import { getInitialBlogs } from '@/lib/server/public-data'

export const metadata: Metadata = {
  title: 'Blogs - MBBS Abroad & Study Abroad Guides',
  description: 'Read expert blogs on MBBS abroad, study abroad, university admissions, exams, scholarships, and student life at international universities.',
  openGraph: {
    title: 'Blogs - MBBS Abroad & Study Abroad Guides | Summit Global',
    description: 'Read expert blogs on MBBS abroad, study abroad, university admissions, exams, scholarships, and student life at international universities.',
    url: 'https://summitglobal.com/blogs',
  },
  twitter: {
    title: 'Blogs - MBBS Abroad & Study Abroad Guides | Summit Global',
    description: 'Read expert blogs on MBBS abroad, study abroad, university admissions, exams, scholarships, and student life at international universities.',
  },
  alternates: {
    canonical: 'https://summitglobal.com/blogs',
  },
}

export default async function BlogsPage() {
  const initialData = await getInitialBlogs()

  return <BlogsPageClient initialData={initialData as any} />
}
