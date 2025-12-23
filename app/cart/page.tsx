"use client"

import { useCartStore } from "@/lib/cart-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalPrice = getTotalPrice()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12">
          <h1 className="text-4xl font-bold mb-12 animate-slide-in-down">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item, index) => {
                  console.log(item)
                  const discountedPrice = item.price
                  const itemTotal = discountedPrice * item.quantity

                  return (
                    <div
                      key={item.id}
                      style={{
                        animation: `slideInUp 0.6s ease-out`,
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "both",
                      }}
                      className="border border-black/10 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover bg-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                          {/* <p className="text-gray-600">${item.discount_percent}%</p> */}
                          <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
                          <p className="text-gray-600">
                            ${discountedPrice.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-black/20">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right w-24">
                          <p className="font-bold text-lg">${itemTotal.toFixed(2)}</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="border-t-2 border-black pt-8">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-2xl font-bold">Total:</span>
                  <span className="text-4xl font-bold text-black">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="flex-1 px-8 py-4 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors text-center"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => clearCart()}
                    className="flex-1 px-8 py-4 border border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => router.push("/checkout")}
                    className="flex-1 px-8 py-4 bg-[#C5A48E] text-white border-[#C5A48E] border
            font-bold cursor-pointer
            hover:bg-transparent hover:text-[#C5A48E] hover:border-[#C5A48E] hover:border
            transition-colors duration-200">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
