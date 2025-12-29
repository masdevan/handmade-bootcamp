"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Order = {
  id: number
  totalPrice: number
  status: string
  paymentStatus: string
  createdAt: string
  items: { id: number }[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders-user")
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    }

    fetchOrders()
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-8 text-[#8e7768]">
            My Orders
          </h1>

          {loading && (
            <p className="text-gray-500">Loading orders...</p>
          )}

          {!loading && orders.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">
                You haven’t placed any orders yet.
              </p>
              <Link
                href="/shop"
                className="inline-block text-sm text-white bg-[#8e7768] px-5 py-2 rounded-full hover:opacity-90 transition"
              >
                Start shopping
              </Link>
            </div>
          )}

          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-md transition"
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Order #{order.id}
                  </p>

                  <p className="font-medium text-gray-800">
                    {order.items.length} item(s) 
                    <span
                        className={`px-3 mx-3 py-1 text-xs rounded-full font-medium
                        ${
                            order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                        `}
                    >
                        {order.status}
                    </span>
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <p className="text-lg font-semibold text-gray-800">
                    ${order.totalPrice.toLocaleString()}
                  </p>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {order.paymentStatus}
                  </span>

                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm text-[#8e7768] hover:underline font-medium"
                  >
                    View order detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
