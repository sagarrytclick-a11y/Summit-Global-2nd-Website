import connectDB from "@/lib/db"
import Blog from "@/models/Blog"
import College from "@/models/College"
import Country from "@/models/Country"
import Exam from "@/models/Exam"
import { CollegesResponse } from "@/hooks/useColleges"

function toPlainData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function getPreviewContent(content?: string, maxLength = 220) {
  if (!content) {
    return "Read this detailed guide to understand admissions, universities, scholarships, exams, and student planning for MBBS abroad and study abroad pathways."
  }

  const cleanContent = content.replace(/\s+/g, " ").trim()
  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  return `${cleanContent.slice(0, maxLength).trimEnd()}...`
}

export interface HomeBlogCardData {
  title: string
  slug: string
  category: string
  content: string
  tags?: string[]
  createdAt: string
  image?: string
}

export interface HomeCountryData {
  name: string
  slug: string
  flag: string
  description?: string
  is_active: boolean
}

export interface HomeFeaturedCollegeData {
  name: string
  slug: string
  banner_url?: string
  fees?: number
  duration?: string
  establishment_year?: string
  about_content?: string
  college_type?: string
  country_ref?: {
    name?: string
    slug?: string
    flag?: string
  } | null
  ranking?: {
    country_ranking?: string
    world_ranking?: string
  } | string | null
  fees_structure?: {
    courses?: Array<{
      annual_tuition_fee?: string
      duration?: string
    }>
  }
}

export interface HomeFeaturedExamData {
  name: string
  slug: string
  short_name?: string
  exam_type?: string
  conducting_body?: string
  exam_mode?: string
  frequency?: string
  description?: string
}

export interface HomeMbbsCollegeData {
  _id: string
  name: string
  slug: string
  college_type: string
  country_ref: {
    _id: string
    name: string
    slug: string
    flag: string
  }
  establishment_year?: string
  banner_url?: string
  overview?: {
    title?: string
    description?: string
  }
  key_highlights?: {
    features?: string[]
  }
  ranking?: {
    country_ranking?: string
    world_ranking?: string
  }
  fees_structure?: {
    courses?: Array<{
      course_name?: string
      duration?: string
      annual_tuition_fee?: string
    }>
  }
  fees?: number
  duration?: string
  legacy_ranking?: string
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
      .select("title slug category tags author createdAt published_at read_time views content image")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
  ])

  return toPlainData({
    blogs: blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      tags: blog.tags,
      author: blog.author,
      createdAt: blog.createdAt,
      published_at: blog.published_at,
      read_time: blog.read_time,
      views: blog.views,
      image: blog.image,
      content: getPreviewContent(blog.content),
    })),
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
      .select("name slug country_ref exams fees duration establishment_year ranking banner_url college_type about_content fees_structure")
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

export async function getHomepageData() {
  await connectDB()

  const [countries, latestBlogsRaw, featuredColleges, featuredExams, mbbsColleges] =
    await Promise.all([
      Country.find({ is_active: true })
        .select("name slug flag description is_active")
        .sort({ name: 1 })
        .lean(),
      Blog.find({ is_active: true })
        .select("title slug category tags createdAt image content")
        .sort({ createdAt: -1 })
        .limit(12)
        .lean(),
      College.find({ is_active: true })
        .select(
          "name slug country_ref fees duration establishment_year ranking banner_url college_type about_content fees_structure"
        )
        .populate("country_ref", "name slug flag")
        .sort({ ranking: 1, name: 1 })
        .limit(9)
        .lean(),
      Exam.find({ is_active: true })
        .select("name slug short_name exam_type conducting_body exam_mode frequency description")
        .sort({ display_order: 1, createdAt: -1 })
        .limit(8)
        .lean(),
      College.find({ is_active: true, college_type: "mbbs_abroad" })
        .select(
          "name slug college_type country_ref establishment_year banner_url overview key_highlights ranking fees_structure fees duration legacy_ranking"
        )
        .populate("country_ref", "name slug flag")
        .sort({ ranking: 1, name: 1 })
        .limit(24)
        .lean(),
    ])

  const latestBlogs: HomeBlogCardData[] = latestBlogsRaw.map((blog) => ({
    title: blog.title,
    slug: blog.slug,
    category: blog.category || "Blog",
    content: blog.content || "Read more about this blog post",
    tags: blog.tags || [],
    createdAt: blog.createdAt,
    image: blog.image,
  }))

  return toPlainData({
    countries: countries as HomeCountryData[],
    latestBlogs,
    featuredColleges: featuredColleges as HomeFeaturedCollegeData[],
    featuredExams: featuredExams as HomeFeaturedExamData[],
    mbbsColleges: mbbsColleges as HomeMbbsCollegeData[],
  })
}

export async function getBlogBySlug(slug: string) {
  await connectDB()

  const blog = await Blog.findOne({ slug, is_active: true }).lean()
  return toPlainData(blog)
}

export async function getCountryBySlug(slug: string) {
  await connectDB()

  const country = await Country.findOne({ slug, is_active: true }).lean()
  return toPlainData(country)
}

export async function getExamBySlug(slug: string) {
  await connectDB()

  const exam = await Exam.findOne({ slug, is_active: true }).lean()
  return toPlainData(exam)
}

export async function getCollegeBySlug(slug: string) {
  await connectDB()

  const college = await College.findOne({ slug, is_active: true })
    .populate("country_ref", "name slug flag")
    .lean()

  return toPlainData(college)
}

export async function getRelatedColleges(slug: string) {
  await connectDB()

  const currentCollege = await College.findOne({ slug, is_active: true })
    .select("country_ref _id")
    .populate("country_ref")
    .lean()

  if (!currentCollege || !currentCollege.country_ref) {
    return []
  }

  let relatedColleges = await College.find({
    _id: { $ne: currentCollege._id },
    country_ref: currentCollege.country_ref._id,
    is_active: true,
  })
    .select("name slug country_ref banner_url overview fees duration ranking college_type fees_structure")
    .populate("country_ref", "name slug flag")
    .limit(6)
    .sort({ createdAt: -1 })
    .lean()

  if (relatedColleges.length < 3) {
    const additionalColleges = await College.find({
      _id: { $ne: currentCollege._id },
      country_ref: { $ne: currentCollege.country_ref._id },
      is_active: true,
    })
      .select("name slug country_ref banner_url overview fees duration ranking college_type fees_structure")
      .populate("country_ref", "name slug flag")
      .limit(6 - relatedColleges.length)
      .sort({ createdAt: -1 })
      .lean()

    relatedColleges = [...relatedColleges, ...additionalColleges]
  }

  return toPlainData(relatedColleges)
}
