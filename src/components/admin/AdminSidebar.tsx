'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SITE_IDENTITY } from '@/site-identity'
import { 
  LayoutDashboard, 
  Globe, 
  GraduationCap, 
  FileText,
  FileCheck,
  MessageSquare,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Countries', href: '/admin/countries', icon: Globe },
  { name: 'Colleges', href: '/admin/colleges', icon: GraduationCap },
  { name: 'Exams', href: '/admin/exams', icon: FileCheck },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl border border-zinc-800 bg-black p-2 text-white shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-black text-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 p-6">
            <div className="rounded-2xl bg-zinc-900 p-2 ring-1 ring-white/10">
              <Image src={SITE_IDENTITY.assets.logo.main} alt={SITE_IDENTITY.name} width={44} height={44} className="h-10 w-auto object-contain" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">Admin</p>
              <p className="text-base font-bold text-white">Summit Global</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "border border-white/15 bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <div className="text-center text-xs text-zinc-500">
              © 2026 Summit Global
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
