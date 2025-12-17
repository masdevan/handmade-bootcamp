'use client'

import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
}

export function CancelButton({
  to,
  className,
  children = 'Cancel',
  ...props
}: CancelButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (to) {
      router.push(to)
    } else {
      router.back()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        // 'mt-6 flex justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90',
        'mt-6 flex justify-center rounded-lg border border-gray-300 p-[13px] font-medium hover:bg-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
