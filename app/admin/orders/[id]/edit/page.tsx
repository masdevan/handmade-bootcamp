import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OrderStatusForm from './statusForm'
import OrderItems from './orderItems'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const orderId = Number(id)

  if (!Number.isInteger(orderId)) notFound()

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              images: {
                orderBy: [{ isPrimary: 'desc' }],
              },
            },
          },
        },
      },
    },
  })

  if (!order) notFound()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Orders', href: '/admin/orders' },
          { label: 'Edit ' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <OrderStatusForm order={order} />

        {/* RIGHT */}
        <OrderItems items={order.items} />
      </div>
    </>
  )
}
