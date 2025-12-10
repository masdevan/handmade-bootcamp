"use client"

import type React from "react"

import { useCartStore } from "@/lib/cart-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalPrice = getTotalPrice()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      alert(`Order placed successfully! Order ID: #${Math.floor(Math.random() * 1000000)}`)
      router.push("/")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12 text-center">
            <h1 className="text-4xl font-bold mb-6">Checkout</h1>
            <p className="text-2xl text-gray-600 mb-8">Your cart is empty</p>
            <Link href="/" className="inline-block px-8 py-3 bg-black text-white font-bold hover:bg-gray-800">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12">
          <h1 className="text-4xl font-bold mb-12 animate-slide-in-down">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Billing Information */}
                <div className="border border-black/10 p-8">
                  <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border border-black/10 p-8">
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-bold mb-2">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-bold mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border border-black/10 p-8">
                  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-bold mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block font-bold mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          required
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-8 py-4 bg-black text-white font-bold text-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                >
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-fade-in">
              <div className="bg-white border border-black/10 p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => {
                    const discountedPrice = item.price * (1 - item.discount_percent / 100)
                    const itemTotal = discountedPrice * item.quantity

                    return (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b border-black/10">
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm">${itemTotal.toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t-2 border-black pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-bold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span className="font-bold">${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl pt-3 border-t border-black/20">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="block text-center mt-8 px-4 py-3 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
