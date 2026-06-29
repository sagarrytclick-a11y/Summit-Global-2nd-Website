'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { SITE_IDENTITY } from '@/site-identity'

interface AdminHeaderProps {
  title: string
  subtitle?: string
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call server-side logout API to clear HttpOnly cookies
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout API failed');
      }

      // Clear client-side storage (localStorage, sessionStorage)
      localStorage.clear();
      sessionStorage.clear();

      toast.success('Logged out successfully');

      // Redirect to login page
      router.push('/admin/login');
      router.refresh();

    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout properly');
      // Still redirect even if there was an error
      router.push('/admin/login');
    }
  }

  return (
    <header className="border-b border-white/10 bg-black py-4 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Page Title */}
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">Summit Global Admin</p>
            <h1 className="mt-1 text-2xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden rounded-full border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 md:block">
              {SITE_IDENTITY.name}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 bg-zinc-900 hover:bg-zinc-800">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Admin" />
                    <AvatarFallback className="bg-black text-white">SG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-white/10 bg-zinc-950 text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Super Admin</p>
                    <p className="text-xs leading-none text-zinc-400">
                      summitglobal admin
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
