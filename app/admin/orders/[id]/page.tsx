import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'
import Image from 'next/image'
import Link from 'next/link'
import OrderStatusTimeline from '../components/OrderStatusTimeline'

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
      user: true,
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
      payments: true,
    },
  })

  if (!order) notFound()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Orders', href: '/admin/orders' },
          { label: `${order.id}` },
        ]}
      />

      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Order Detail #{order.id}
          </h1>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium
              ${order.status === 'PAID' && 'bg-green-100 text-green-700'}
              ${order.status === 'PROGRESS' && 'bg-yellow-100 text-yellow-700'}
              ${order.status === 'CANCELLED' && 'bg-red-100 text-red-700'}
            `}
          >
            {/* {order.status} */}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ORDER INFO */}
          <ShowcaseSection title="Order Information" className="!p-6.5 lg:col-span-1">
            <div className="space-y-3 text-sm">
              <p><b>Customer:</b> {order.user.name}</p>
              <p><b>Email:</b> {order.user.email}</p>
              <p><b>Shipping Method:</b> {order.shippingMethod}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Payment Status:</b> {order.paymentStatus}</p>
              <p><b>Total:</b> ${order.totalPrice.toLocaleString()}</p>
              <p className="text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </ShowcaseSection>

          {/* ITEMS */}
          <ShowcaseSection
            title={`Ordered Items (${order.items.length})`}
            className="!p-6.5 lg:col-span-2"
          >
            <div className="space-y-6">
              {order.items.map((item) => {
                const primaryImage =
                  item.product.images.find(img => img.isPrimary) ||
                  item.product.images[0]

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 border-b border-stroke pb-6 last:border-none"
                  >
                    {/* IMAGE */}
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-stroke">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <p className="font-medium text-dark dark:text-white">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* PRICE */}
                    <p className="font-semibold text-dark dark:text-white">
                      ${(item.priceEach * item.quantity).toLocaleString()}
                    </p>

                    {/* LINK */}
                    <Link
                      href={`/admin/products/${item.product.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Product
                    </Link>
                  </div>
                )
              })}
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Order Status" className="!p-6.5 lg:col-span-1">
            <OrderStatusTimeline status={order.status} />
          </ShowcaseSection>
        </div>

        {/* PAYMENTS */}
        {order.payments.length > 0 && (
          <ShowcaseSection title="Payment Information" className="!p-6.5">
            <div className="space-y-3 text-sm">
              {order.payments.map(payment => (
                <div
                  key={payment.id}
                  className="flex justify-between border-b border-stroke pb-3 last:border-none"
                >
                  <span>{payment.method}</span>
                  <span>${payment.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        )}
      </div>
    </>
  )
}