'use client'

import dynamic from 'next/dynamic'
import { useFormModal } from '@/context/FormModalContext'

const LazyFormModal = dynamic(
  () => import('@/components/FormModal').then((module) => module.FormModal),
  { ssr: false }
)

export default function FormModalViewport() {
  const { isOpen } = useFormModal()

  if (!isOpen) {
    return null
  }

  return <LazyFormModal />
}
