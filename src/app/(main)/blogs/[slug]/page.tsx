import type { Metadata } from 'next'
import BlogDetailPageClient from './BlogDetailPageClient'
import { getBlogBySlug } from '@/lib/server/public-data'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const title = blog.title || slug.replace(/-/g, ' ')
  const description = blog.content
    ? blog.content.replace(/<[^>]*>/g, '').slice(0, 160).trimEnd() + '...'
    : 'Read this detailed guide about MBBS abroad and study abroad admissions and planning.'
  const category = blog.category || 'Blog'

  return {
    title,
    description,
    keywords: [...(blog.tags || []), category, 'MBBS abroad', 'study abroad'].join(', '),
    openGraph: {
      title: `${title} | Summit Global`,
      description,
      url: `https://summitglobal.com/blogs/${slug}`,
      type: 'article',
      publishedTime: blog.createdAt,
      tags: blog.tags || [],
      images: blog.image ? [blog.image] : undefined,
    },
    twitter: {
      title: `${title} | Summit Global`,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
    alternates: {
      canonical: `https://summitglobal.com/blogs/${slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const initialBlog = await getBlogBySlug(slug)

  return <BlogDetailPageClient slug={slug} initialBlog={initialBlog} />
}
