"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderStatusBanner } from "./OrderStatusBanner"

export default function OrderDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchOrder = async () => {
      const res = await fetch(`/api/orders-user/${id}`)
      const data = await res.json()
      setOrder(data)
      setLoading(false)
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading order...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (!order) return null

  const subtotal = order.items.reduce(
    (sum: number, item: any) =>
      sum + item.priceEach * item.quantity,
    0
  )

  const tax = subtotal * 0.1
  const shipping = order.shippingCost || 0
  const total = subtotal + tax + shipping

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link
            href="/orders"
            className="text-sm text-[#8e7768] hover:underline mb-6 inline-block"
          >
            ← Back to orders
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </p>

            {!loading && order && (
              <OrderStatusBanner
                status={order.status}
                shippingMethod={order.shippingMethod}
              />
            )}

            {/* ITEMS */}
            <div className="space-y-6">
              {order.items.map((item: any) => {
                const imageUrl =
                  item.product.images.find((img: any) => img.isPrimary)?.url ||
                  "/placeholder.png"

                return (
                  <div
                    key={item.id}
                    className="flex gap-6 border-b pb-6 last:border-none"
                  >
                    <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-lg">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-lg">
                      ${(item.priceEach * item.quantity).toLocaleString("en-US")}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 space-y-3 border-t pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toLocaleString("en-US")}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (10%)</span>
                <span>${tax.toLocaleString("en-US")}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>${shipping.toLocaleString("en-US")}</span>
              </div>

              <div className="flex justify-between text-lg font-semibold border-t pt-4">
                <span>Total</span>
                <span>${total.toLocaleString("en-US")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
