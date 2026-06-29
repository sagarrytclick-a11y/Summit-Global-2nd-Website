import ExamPageClient from './ExamPageClient'
import { getExamBySlug } from '@/lib/server/public-data'

interface ExamPageProps {
  params: Promise<{ slug: string }>
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { slug } = await params
  const initialExam = await getExamBySlug(slug)

  return <ExamPageClient initialExam={initialExam} />
}
