import { MetadataRoute } from "next"
import connectDB from "@/lib/db"
import Blog from "@/models/Blog"
import College from "@/models/College"
import Country from "@/models/Country"
import Exam from "@/models/Exam"

const BASE_URL = "https://summitglobal.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/colleges`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/countries`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/exams`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mbbs-abroad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/study-abroad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/term`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  try {
    await connectDB()

    const [blogs, colleges, countries, exams] = await Promise.all([
      Blog.find({ is_active: true }).select("slug updatedAt createdAt").lean(),
      College.find({ is_active: true }).select("slug updatedAt createdAt").lean(),
      Country.find({ is_active: true }).select("slug updatedAt createdAt").lean(),
      Exam.find({ is_active: true }).select("slug updatedAt createdAt").lean(),
    ])

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    const collegeRoutes: MetadataRoute.Sitemap = colleges.map((college) => ({
      url: `${BASE_URL}/colleges/${college.slug}`,
      lastModified: college.updatedAt || college.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
      url: `${BASE_URL}/countries/${country.slug}`,
      lastModified: country.updatedAt || country.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    const examRoutes: MetadataRoute.Sitemap = exams.map((exam) => ({
      url: `${BASE_URL}/exams/${exam.slug}`,
      lastModified: exam.updatedAt || exam.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...blogRoutes, ...collegeRoutes, ...countryRoutes, ...examRoutes]
  } catch {
    return staticRoutes
  }
}
