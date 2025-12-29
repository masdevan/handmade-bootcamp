"use client"

import { useCartStore } from "@/lib/cart-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { MoveLeft, ShoppingCart, Trash2 } from "lucide-react"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, loadCart, loading, error } = useCartStore()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (session?.user?.id) {
      loadCart(Number(session.user.id))
    }
  }, [session?.user?.id, loadCart])

  if (!mounted) return null

  const totalPrice = getTotalPrice()

  return (
    <>
      <Header />
      <main className="py-4 px-4 md:px-8 lg:px-16 bg-white">
        <div className="relative max-w-7xl m-auto py-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8e7768] mb-12 animate-slide-in-up">Shopping Cart</h1>

        <div className="flex justify-between items-center mb-5">
          <button
              onClick={() => router.push("/")}
              className="flex flex-row items-center cursor-pointer gap-2 px-2 py-4 border border-none hover:text-[#C5A48E] text-[#a38876] font-bold transition-colors text-left animate-slide-in-up">
              <MoveLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
          </button>

          <button
            onClick={() => clearCart()}
            className="px-4 py-2 bg-red-600 cursor-pointer text-white font-bold hover:bg-red-700 transition-colors"
          >
            Clear Cart
          </button>
        </div>

          {loading ? (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-2xl text-gray-600 mb-6">Loading cart...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-2xl text-red-600 mb-6">{error}</p>
            </div>
          ) : items.length === 0 ? (
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
                  if (!item.cartItemId) return null
                  
                  const discountedPrice = item.price
                  const itemTotal = discountedPrice * item.quantity

                  return (
                    <div
                      key={item.cartItemId}
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
                          <p className="text-gray-600 mb-2 text-sm line-clamp-2">{item?.description}</p>
                          <p className="text-gray-600">
                            ${discountedPrice.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-black/20">
                          <button
                            onClick={() => updateQuantity(item.cartItemId!, item.quantity - 1)}
                            disabled={loading}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId!, item.quantity + 1)}
                            disabled={loading}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          onClick={() => removeItem(item.cartItemId!)}
                          disabled={loading}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              
              <div className="border-t-2 border-black">
              <div>
            </div>

                <div className="flex items-center">
                  <div className="py-4 flex justify-end">
                    <table className="table-fixed w-1/4">
                      <tbody>
                        <tr>
                          <td className="text-left p-2">
                            Total
                          </td>
                          <td className="p-4 text-right">
                            ${totalPrice.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left p-2">
                            Delivery Fee
                          </td>
                          <td className="p-4 text-right">
                            Free
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left p-2">
                            Subtotal
                          </td>
                          <td className="p-4 text-right font-bold">
                            ${totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                <div className="py-4 flex justify-end">
                <button
                    onClick={() => router.push("/checkout")}
                    className="flex flex-row items-center gap-2 px-8 py-4 bg-[#C5A48E] text-white border-[#C5A48E] border
                          font-bold cursor-pointer
                          hover:bg-white hover:text-[#C5A48E] hover:border-[#C5A48E] hover:border
                          transition-colors duration-200">
                    <ShoppingCart className="w-5 h-5 text-white hover:text-[#C5A48E]" />
                    <span>Checkout</span>
                  </button>
                  </div>
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
