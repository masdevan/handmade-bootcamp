import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { UserForm } from '../components/userForm'

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Users', href: '/admin/users' },
          { label: 'Create' },
        ]}
      />

      <UserForm />
    </>
  )
}

