import { Metadata } from 'next'
import CollegeDetailRedesign from './CollegeDetailRedesign'
import { getCollegeBySlug, getRelatedColleges } from '@/lib/server/public-data'

interface CollegePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollegePageProps): Promise<Metadata> {
  const { slug } = await params
  const college = await getCollegeBySlug(slug)

  if (!college) {
    return {
      title: 'College Not Found',
    }
  }

  const name = college.name || slug.replace(/-/g, ' ')
  const description = college.overview?.description?.slice(0, 160) || college.about_content?.slice(0, 160) || `Explore ${name} for MBBS abroad and study abroad programs.`
  const countryName = college.country_ref?.name

  return {
    title: name,
    description: `${description}${countryName ? ` Located in ${countryName}.` : ''}`,
    keywords: [`${name}`, `${countryName || ''}`, 'MBBS abroad', 'study abroad', 'university admissions'].filter(Boolean).join(', '),
    openGraph: {
      title: `${name} | Summit Global`,
      description: `${description}${countryName ? ` Located in ${countryName}.` : ''}`,
      url: `https://summitglobal.com/colleges/${slug}`,
      images: college.banner_url ? [college.banner_url] : undefined,
    },
    twitter: {
      title: `${name} | Summit Global`,
      description: `${description}${countryName ? ` Located in ${countryName}.` : ''}`,
      images: college.banner_url ? [college.banner_url] : undefined,
    },
    alternates: {
      canonical: `https://summitglobal.com/colleges/${slug}`,
    },
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params
  const [initialCollege, initialRelatedColleges] = await Promise.all([
    getCollegeBySlug(slug),
    getRelatedColleges(slug),
  ])

  return (
    <CollegeDetailRedesign
      {...({
        slug,
        initialCollege,
        initialRelatedColleges,
      } as any)}
    />
  )
}
