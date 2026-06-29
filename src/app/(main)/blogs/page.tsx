import BlogsPageClient from './BlogsPageClient'
import { getInitialBlogs } from '@/lib/server/public-data'

export default async function BlogsPage() {
  const initialData = await getInitialBlogs()

  return <BlogsPageClient initialData={initialData as any} />
}
