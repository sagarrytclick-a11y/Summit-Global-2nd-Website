'use client'

import { useFormModal } from '@/context/FormModalContext'

interface OpenFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function OpenFormButton({ children, onClick, ...props }: OpenFormButtonProps) {
  const { openModal } = useFormModal()

  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          openModal()
        }
      }}
    >
      {children}
    </button>
  )
}
