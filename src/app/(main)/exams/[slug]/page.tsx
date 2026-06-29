import type { Metadata } from 'next'
import ExamPageClient from './ExamPageClient'
import { getExamBySlug } from '@/lib/server/public-data'

interface ExamPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ExamPageProps): Promise<Metadata> {
  const { slug } = await params
  const exam = await getExamBySlug(slug)

  if (!exam) {
    return {
      title: 'Exam Not Found',
    }
  }

  const name = exam.short_name || exam.name || slug.replace(/-/g, ' ')
  const description = exam.description?.slice(0, 160) || `Learn about the ${name} exam for MBBS abroad and study abroad admissions.`

  return {
    title: `${name} Exam - Guide, Pattern & Preparation`,
    description,
    openGraph: {
      title: `${name} Exam Guide | Summit Global`,
      description,
      url: `https://summitglobal.com/exams/${slug}`,
    },
    twitter: {
      title: `${name} Exam Guide | Summit Global`,
      description,
    },
    alternates: {
      canonical: `https://summitglobal.com/exams/${slug}`,
    },
  }
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { slug } = await params
  const initialExam = await getExamBySlug(slug)

  return <ExamPageClient initialExam={initialExam} />
}
