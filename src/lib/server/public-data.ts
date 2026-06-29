import connectDB from "@/lib/db"
import Blog from "@/models/Blog"
import College from "@/models/College"
import Country from "@/models/Country"
import { CollegesResponse } from "@/hooks/useColleges"

function toPlainData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export async function getInitialCountries() {
  await connectDB()

  const countries = await Country.find({ is_active: true })
    .select("name slug flag description is_active")
    .sort({ name: 1 })
    .lean()

  return toPlainData(countries)
}

export async function getInitialBlogs() {
  await connectDB()

  const query = { is_active: true }
  const page = 1
  const limit = 9

  const [total, blogs] = await Promise.all([
    Blog.countDocuments(query),
    Blog.find(query)
      .select("title slug excerpt category tags banner_url author createdAt updatedAt published_at read_time views content image")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
  ])

  return toPlainData({
    blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: blogs.length === limit,
  })
}

export async function getInitialColleges(): Promise<CollegesResponse> {
  await connectDB()

  const query = { is_active: true }
  const page = 1
  const limit = 12

  const [total, colleges] = await Promise.all([
    College.countDocuments(query),
    College.find(query)
      .select("name slug country_ref fees duration establishment_year ranking banner_url college_type overview fees_structure key_highlights exams about_content")
      .populate("country_ref", "name slug flag")
      .sort({ ranking: 1, name: 1 })
      .limit(limit)
      .lean(),
  ])

  return toPlainData({
    colleges,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: colleges.length === limit,
  })
}
