'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'

const STATUS_OPTIONS = [
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Progress', label: 'Progress' },
  { value: 'Delivery', label: 'On Delivery' },
  { value: 'Completed', label: 'Completed' },
]

export default function OrderStatusForm({ order }: any) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status)
  const [loading, setLoading] = useState(false)

  const updateStatus = async () => {
    setLoading(true)

    const res = await fetch(`/api/orders/${order.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    setLoading(false)

    if (res.ok) {
      router.push(`/admin/orders`)
      router.refresh()
    } else {
      alert('Failed to update status')
    }
  }

  return (
    <ShowcaseSection
          title={`Update Order Status`}
          className="!p-6.5 lg:col-span-2"
        >
        <div className="mb-6 space-y-1 text-sm ">
          <p><b>Customer:</b> {order.user.name}</p>
          <p><b>Email:</b> {order.user.email}</p>
          <p><b>Total:</b> ${order.totalPrice.toLocaleString()}</p>
          <p><b>Payment:</b> {order.paymentStatus}</p>
        </div>

        <label className="mb-1 block text-sm font-medium">Order Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mb-6 w-full rounded-lg border px-4 py-2 text-sm"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={updateStatus}
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
    </ShowcaseSection>
  )
}
