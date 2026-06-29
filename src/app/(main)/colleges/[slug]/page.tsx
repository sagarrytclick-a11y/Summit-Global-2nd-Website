import { Metadata } from 'next'
import CollegeDetailRedesign from './CollegeDetailRedesign'

interface CollegePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollegePageProps): Promise<Metadata> {
  const { slug } = await params
  
  return {
    title: `${slug} - Summit Global`,
    description: 'Explore this college for MBBS abroad and study abroad planning',
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params
  
  return <CollegeDetailRedesign slug={slug} />
}
