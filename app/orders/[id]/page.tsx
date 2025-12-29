"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

          {loading && <p>Loading order...</p>}

          {!loading && order?.status === "Progress" && (
            <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
                <p className="font-semibold text-yellow-800 mb-1">
                ⏳ Order in Progress
                </p>

                <p className="text-sm text-yellow-700">
                Your order is currently being processed.
                If you would like to check the latest progress, please contact us via WhatsApp.
                </p>

                <a
                href="https://wa.me/+6285728133473"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition"
                >
                Contact via WhatsApp
                </a>
            </div>
          )}

          {!loading && order && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              </p>

              {/* ITEMS */}
              <div className="space-y-4">
                {order.items.map((item: any) => {
                  const imageUrl =
                    item.product.images.find((img: any) => img.isPrimary)
                      ?.url || "/placeholder.png"

                  return (
                    <div
                    key={item.id}
                    className="flex gap-6 border-b pb-6 last:border-none"
                    >
                    {/* IMAGE */}
                    <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                        src={
                            item.product.images.find((img: any) => img.isPrimary)?.url ||
                            "/placeholder.png"
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                    />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                        <p className="font-medium text-lg">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                        </p>
                    </div>

                    {/* PRICE */}
                    <p className="font-semibold text-lg">
                        ${(item.priceEach * item.quantity).toLocaleString("en-US")}
                    </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
