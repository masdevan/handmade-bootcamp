'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { TrashIcon, CheckIcon } from '@/assets/admin/icons'

export function SuspendUserButton({ 
  userId, 
  status 
}: { 
  userId: number
  status: 'aktif' | 'nonaktif'
}) {
  const [open, setOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const isActive = status === 'aktif'

  async function handleToggle() {
    setIsProcessing(true)
    try {
      const method = isActive ? 'DELETE' : 'PATCH'
      const response = await fetch(`/api/users?id=${userId}`, {
        method,
      })

      if (!response.ok) {
        const data = await response.json()
        alert(
          data.message ||
          `Failed to ${isActive ? 'suspend' : 'activate'} user`
        )
        return
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error(
        `Error ${isActive ? 'suspending' : 'activating'} user:`,
        error
      )
      alert(
        `An error occurred while ${isActive ? 'suspending' : 'activating'} the user`
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className={isActive ? 'hover:text-red-500' : 'hover:text-green-500'}>
          <span className="sr-only">
            {isActive ? 'Suspend User' : 'Activate User'}
          </span>
          {isActive ? <TrashIcon /> : <CheckIcon />}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? 'Suspend User?' : 'Activate User?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? 'Are you sure you want to suspend this user? The user will temporarily lose access to the system.'
              : 'Are you sure you want to activate this user? The user will regain access to the system.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            disabled={isProcessing}
            className={
              isActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }
          >
            {isProcessing
              ? isActive
                ? 'Suspending...'
                : 'Activating...'
              : isActive
                ? 'Suspend'
                : 'Activate'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
