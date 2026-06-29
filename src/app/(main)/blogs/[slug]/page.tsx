import BlogDetailPageClient from './BlogDetailPageClient'
import { getBlogBySlug } from '@/lib/server/public-data'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const initialBlog = await getBlogBySlug(slug)

  return <BlogDetailPageClient slug={slug} initialBlog={initialBlog} />
}
