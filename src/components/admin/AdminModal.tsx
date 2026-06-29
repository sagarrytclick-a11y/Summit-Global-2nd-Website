'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface AdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AdminModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  showFooter = true,
  confirmText = 'Save',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  size = 'md'
}: AdminModalProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleConfirm = () => {
    onConfirm?.()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
      <div className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-[1.5rem] border border-white/10 bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.4)]`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-zinc-400">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 w-8 rounded-full border border-white/10 p-0 hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="bg-zinc-950 p-6">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end space-x-3 border-t border-white/10 bg-zinc-950 p-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-black text-white hover:bg-zinc-800"
              >
                {loading ? 'Saving...' : confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
