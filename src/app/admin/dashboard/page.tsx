"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Globe, GraduationCap, FileText, MoreHorizontal, ChevronRight, Activity, FileCheck, Loader2, Building2, Stethoscope, Mail, Users } from 'lucide-react'
import { useAdminDashboardStats } from '@/hooks/useAdminDashboard'
import { useAdminCountries, useAdminColleges } from '@/hooks/useAdminColleges'
import { useAdminBlogs } from '@/hooks/useAdminBlogs'
import { dummyCountries, dummyColleges, dummyBlogs } from '@/data/dummyData'
import { College, Blog } from '@/contexts/AdminContext'
import { AdminCountry } from '@/hooks/useAdminColleges'

// Types for the entities we use
type DashboardCountry = AdminCountry | { _id?: string; id?: string; name: string; flag?: string; is_active?: boolean }
type DashboardCollege = College | { 
  _id?: string; 
  id?: string; 
  name: string; 
  college_type?: 'study_abroad' | 'mbbs_abroad'; 
  country_ref?: { name: string } | string;
  country?: string;
  fees?: number; 
  is_active?: boolean;
  status?: 'active' | 'inactive'
}
type DashboardBlog = Blog | { _id?: string; id?: string; title: string; category: string; content?: string; createdAt?: string; created_at?: string }

export default function DashboardPage() {
  // TanStack Query hooks - use correct parameters for paginated hooks
  const { data: dbStats = { countries: 0, colleges: 0, blogs: 0, exams: 0, study_abroad: 0, mbbs_abroad: 0, pending_enquiries: 0 }, isLoading: statsLoading, error: statsError } = useAdminDashboardStats()
  const { data: countriesData = { countries: [], total: 0, page: 1, totalPages: 1, hasMore: false }, isLoading: countriesLoading } = useAdminCountries(1, '', 'all', 25)
  const { data: collegesData = { colleges: [], total: 0, page: 1, totalPages: 1, hasMore: false }, isLoading: collegesLoading } = useAdminColleges(1, '', '', '')
  const { data: blogsData = { blogs: [], total: 0, page: 1, totalPages: 1, hasMore: false }, isLoading: blogsLoading } = useAdminBlogs(1, '', '', '')
  
  // Extract arrays from paginated data
  const countries = countriesData.countries || []
  const colleges = collegesData.colleges || []
  const blogs = blogsData.blogs || []
  
  // Overall loading state
  const loading = statsLoading || countriesLoading || collegesLoading || blogsLoading
  
  // Fallback to dummy data if there are errors
  const displayCountries: DashboardCountry[] = countries.length > 0 ? countries : dummyCountries
  const displayColleges: DashboardCollege[] = colleges.length > 0 ? colleges : dummyColleges
  const displayBlogs: DashboardBlog[] = blogs.length > 0 ? blogs : dummyBlogs
  
  // Use API stats for study abroad and MBBS abroad counts, fallback to client calculation
  const studyAbroadCount = dbStats.study_abroad > 0 ? dbStats.study_abroad : displayColleges.filter((college) => college.college_type === 'study_abroad').length
  const mbbsAbroadCount = dbStats.mbbs_abroad > 0 ? dbStats.mbbs_abroad : displayColleges.filter((college) => college.college_type === 'mbbs_abroad').length
  
  const displayStats = dbStats.countries > 0 || dbStats.colleges > 0 || dbStats.blogs > 0 || dbStats.exams > 0 
    ? dbStats 
    : {
        countries: dummyCountries.length,
        colleges: dummyColleges.length,
        blogs: dummyBlogs.length,
        exams: 12,
        study_abroad: dummyColleges.filter((c) => c.college_type === 'study_abroad').length,
        mbbs_abroad: dummyColleges.filter((c) => c.college_type === 'mbbs_abroad').length,
        pending_enquiries: 8, // Dummy pending enquiries count
      }

  const stats = [
    {
      title: 'Study Abroad',
      value: studyAbroadCount,
      description: 'Study programs',
      icon: Building2,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    },
    {
      title: 'MBBS Abroad',
      value: mbbsAbroadCount,
      description: 'Medical programs',
      icon: Stethoscope,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    },
    {
      title: 'Pending Enquiries',
      value: dbStats.pending_enquiries,
      description: 'Need attention',
      icon: Mail,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    },
    {
      title: 'Total Colleges',
      value: dbStats.colleges,
      description: 'All institutions',
      icon: GraduationCap,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    },
    {
      title: 'Total Countries',
      value: displayStats.countries,
      description: 'Active destinations',
      icon: Globe,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    },
    {
      title: 'Total Exams',
      value: displayStats.exams,
      description: 'Standardized tests',
      icon: FileCheck,
      color: 'text-black',
      bgColor: 'bg-zinc-100'
    }
  ]

  // Mocking recent activity (This would also ideally come from DB)
  const recentActivity = [
    { type: 'country', action: 'Added new country', target: 'Australia', time: '2 hours ago', icon: Globe },
    { type: 'exam', action: 'Updated exam', target: 'TOEFL', time: '5 hours ago', icon: FileCheck },
    { type: 'blog', action: 'Published blog', target: 'Top 10 Universities', time: '1 day ago', icon: FileText },
    { type: 'college', action: 'Added new college', target: 'University of Melbourne', time: '2 days ago', icon: GraduationCap }
  ]

  const quickActions = [
    { title: 'Add Country', description: 'Add a new study destination', icon: Globe, href: '/admin/countries', color: 'bg-black hover:bg-zinc-800' },
    { title: 'Add College', description: 'Add a new educational institution', icon: GraduationCap, href: '/admin/colleges', color: 'bg-black hover:bg-zinc-800' },
    { title: 'Add Exam', description: 'Add a new standardized test', icon: FileCheck, href: '/admin/exams', color: 'bg-black hover:bg-zinc-800' },
    { title: 'Create Blog', description: 'Write a new blog post', icon: FileText, href: '/admin/blogs', color: 'bg-black hover:bg-zinc-800' }
  ]

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-white/10 bg-zinc-950 text-white shadow-sm transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-xl p-2 ${stat.bgColor} shadow-sm`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <p className="mt-1 text-xs text-zinc-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <Card className="xl:col-span-2 border border-white/10 bg-zinc-950 text-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                        <Activity className="h-5 w-5 text-zinc-400" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 sm:h-80">
                <div className="space-y-3 pr-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 rounded-lg p-3 transition-colors hover:bg-white/5">
                      <div className="flex-shrink-0 rounded-lg bg-zinc-900 p-2">
                        <activity.icon className="h-4 w-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-white">{activity.action}</span>
                          <span className="truncate text-sm text-zinc-400">"{activity.target}"</span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-white/10 bg-zinc-950 text-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <a key={index} href={action.href} className="group block rounded-xl border border-white/10 bg-zinc-950 p-3 transition-all hover:border-white/20 hover:shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 text-sm">
                        <div className="font-medium text-white">{action.title}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-500" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview Section (Countries, Blogs, Colleges Dialogs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Example: Active Countries Card */}
          <Card className="border border-white/10 bg-zinc-950 text-white shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Active Countries</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="border-white/10 bg-zinc-950 text-white">
                  <DialogHeader><DialogTitle>Active Countries List</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayCountries.map((c) => (
                      <div key={c._id || c.id || `country-${c.name}`} className="flex justify-between border-b border-white/10 p-2">
                        <span className="text-sm">{c.name}</span>
                        <Badge className="border border-white/10 bg-zinc-900 text-zinc-200">{c.is_active !== false ? 'Active' : 'Inactive'}</Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                  {displayCountries.slice(0, 5).map((country) => (
                    <div key={country._id || country.id || `country-${country.name}`} className="flex items-center justify-between text-sm">
                      <span>{country.flag || ''} {country.name}</span>
                      <Badge variant="outline" className="text-[10px]">{country.is_active !== false ? 'Active' : 'Inactive'}</Badge>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>

          {/* Recent Blogs Card */}
          <Card className="border border-white/10 bg-zinc-950 text-white shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Blogs</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-white/10 bg-zinc-950 text-white">
                  <DialogHeader><DialogTitle>All Blog Posts</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayBlogs.map((blog) => (
                      <div key={blog._id || blog.id || `blog-${blog.title}`} className="border-b border-white/10 p-3">
                        <h3 className="font-medium text-sm">{blog.title}</h3>
                        <p className="mt-1 text-xs text-zinc-400">{blog.content?.substring(0, 100)}...</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="border border-white/10 bg-zinc-900 text-xs text-zinc-200">{blog.category}</Badge>
                          <span className="text-xs text-zinc-500">{new Date(blog.createdAt || blog.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {displayBlogs.slice(0, 4).map((blog) => (
                  <div key={blog._id || blog.id || `blog-${blog.title}`} className="space-y-1 rounded-lg p-2 transition-colors hover:bg-white/5">
                    <div className="text-sm font-medium line-clamp-1">{blog.title}</div>
                    <div className="text-xs text-zinc-500">{blog.category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Colleges Card */}
          <Card className="border border-white/10 bg-zinc-950 text-white shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Top Colleges</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-white/10 bg-zinc-950 text-white">
                  <DialogHeader><DialogTitle>All Active Colleges</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayColleges.map((college) => (
                      <div key={college._id || college.id || `college-${college.name}`} className="border-b border-white/10 p-3">
                        <h3 className="font-medium text-sm">{college.name}</h3>
                        <p className="text-xs text-zinc-400">
                          {typeof college.country_ref === 'object' && college.country_ref?.name 
                            ? college.country_ref.name 
                            : typeof college.country_ref === 'string' 
                              ? college.country_ref 
                              : ''}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-zinc-300">
                            {college.fees ? `$${college.fees.toLocaleString()}/year` : ''}
                          </span>
                          <Badge className="border border-white/10 bg-zinc-900 text-xs text-zinc-200">
                            {college.is_active !== false ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {displayColleges.slice(0, 4).map((college) => (
                  <div key={college._id || college.id || `college-${college.name}`} className="space-y-1 rounded-lg p-2 transition-colors hover:bg-white/5">
                    <div className="text-sm font-medium truncate">{college.name}</div>
                    <div className="text-xs text-zinc-500">
                      {college.fees ? `$${college.fees.toLocaleString()}/year` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
