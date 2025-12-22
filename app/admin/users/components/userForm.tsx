'use client'

import InputGroup from '@/components/admin/FormElements/InputGroup'
import { Select } from '@/components/admin/FormElements/select'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'
import { CancelButton } from '@/components/admin/ui/cancelButton'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type UserFormProps = {
  isEdit?: boolean
  userId?: number
  defaultValues?: {
    name?: string
    email?: string
    phone?: string
    role?: string
  }
}

export function UserForm({ isEdit = false, userId, defaultValues }: UserFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      role: formData.get('role')?.toString() || '',
    }

    try {
      if (isEdit && userId) {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          setError(result.message || 'Failed to update user')
          setLoading(false)
          return
        }

        router.push('/admin/users')
        router.refresh()
      } else {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          setError(result.message || 'Failed to create user')
          setLoading(false)
          return
        }

        router.push('/admin/users')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <ShowcaseSection title={isEdit ? "Edit User" : "Create User"} className="p-6.5!">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <InputGroup
          name="name"
          label="Name"
          type="text"
          placeholder="Enter user name"
          required
          defaultValue={defaultValues?.name}
        />

        <InputGroup
          name="email"
          label="Email"
          type="email"
          placeholder="Enter email address"
          required
          defaultValue={defaultValues?.email}
        />

        <InputGroup
          name="phone"
          label="Phone"
          type="tel"
          placeholder="Enter phone number"
          required
          defaultValue={defaultValues?.phone}
        />

        <Select
          name="role"
          label="Role"
          defaultValue={defaultValues?.role || ''}
          placeholder="Select role"
          items={[
            { label: 'Admin', value: 'ADMIN' },
            { label: 'User', value: 'USER' },
          ]}
          required
        />

        <div className="flex justify-end gap-3 pt-4">
          <CancelButton to="/admin/users" />
          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 flex justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User')}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  )
}
