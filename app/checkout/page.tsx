"use client"

import type React from "react"

import { useCartStore } from "@/lib/cart-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"

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

  const isAddressComplete =
  formData.address &&
  formData.city &&
  formData.state &&
  formData.zipCode

  return (
    <>
      <Header />
      <main className="py-4 px-4 md:px-8 lg:px-16 bg-white">
        <div className="relative max-w-7xl m-auto py-3">
          <h1 className="text-4xl font-bold mb-10 animate-slide-in-down text-[#8e7768]">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Address */}
                <div className="border border-[#8e7768]/20 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#8e7768]">Shipping Address</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-bold mb-2 text-[#8e7768]">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#8e7768]/20 focus:border-[#8e7768] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-bold mb-2 text-[#8e7768]">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#8e7768]/20 focus:border-[#8e7768] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2 text-[#8e7768]">State</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#8e7768]/20 focus:border-[#8e7768] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2 text-[#8e7768]">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#8e7768]/20 focus:border-[#8e7768] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isAddressComplete && (
                  <p className="text-sm text-red-600 mt-4">
                    Please complete your shipping address to proceed with payment.
                  </p>
                )}
                

                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    currency: "USD",
                    intent: "capture",
                    components: "buttons",
                    disableFunding: "card,bancontact,blik,eps,giropay,ideal,mybank,p24,sepa,sofort",
                  }}
                >
                  <PayPalButtons
                    fundingSource={FUNDING.PAYPAL}
                    disabled={!isAddressComplete}
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "rect",
                      label: "paypal",
                    }}
                    // style={{ layout: "vertical" }}
                    createOrder={async () => {
                      if (!isAddressComplete) {
                        alert("Please complete your shipping address first.")
                        throw new Error("Address incomplete")
                      }

                      const res = await fetch("/api/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          total: totalPrice * 1.1,
                        }),
                      })

                      const text = await res.text()
                      if (!text) throw new Error("Empty response from server")

                      const data = JSON.parse(text)
                      return data.id
                    }}

                    onApprove={async (data) => {
                      const res = await fetch("/api/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderID: data.orderID,
                          shippingAddress: {
                            address: formData.address,
                            city: formData.city,
                            state: formData.state,
                            zipCode: formData.zipCode,
                          },
                          shippingMethod: "DEGRADASI | Devan, Eci, Guntur, Ridzwan Distribusi Antar Seluruh Indonesia",
                        }),
                      })

                      const result = await res.json()
                      if (!res.ok) {
                        alert(result.error || "Payment failed")
                        return
                      }

                      clearCart()
                      router.push(`/orders/${result.orderId}`)
                    }}



                    onError={(err) => {
                      console.error(err)
                      alert("Payment failed")
                    }}
                  />
                </PayPalScriptProvider>

              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-fade-in">
              <div className="bg-white border border-[#8e7768]/20 p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-[#8e7768]">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => {
                    const discountedPrice = item.price
                    const itemTotal = discountedPrice * item.quantity

                    return (
                      <div key={item.id} className="flex justify-between items-start pb-2 border-[#8e7768]/20">
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm">${itemTotal.toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t-2 border-[#8e7768]/20 pt-6 space-y-3">
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
                  <div className="flex justify-between text-xl pt-3 border-t border-[#8e7768]/20">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="block text-center bg-[#] mt-8 px-4 py-3 border border-[#8e7768]/20 text-[#8e7768] font-bold hover:bg-[#8e7768] hover:text-white transition-colors"
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
