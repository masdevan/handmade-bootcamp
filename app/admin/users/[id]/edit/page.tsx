import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { UserForm } from '../../components/userForm'
import { headers } from 'next/headers'

async function getUserById(id: string) {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const apiUrl = `${protocol}://${host}/api/users/${id}`

  const res = await fetch(apiUrl, {
    cache: 'no-store',
  })

  if (!res.ok) return null

  const { data } = await res.json()
  return data
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUserById(id)

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Users', href: '/admin/users' },
          { label: 'Edit' },
        ]}
      />

      <UserForm
        isEdit
        userId={user.id}
        defaultValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        }}
      />
    </>
  )
}
