"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SuccessPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-xl w-full px-6 text-center animate-fade-in">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">
            Payment Successful 🎉
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase.  
            Your payment has been processed successfully and your order is now confirmed.
          </p>

          {/* Info Box */}
          <div className="border border-black/10 p-6 mb-8 text-left">
            <p className="font-semibold mb-2">What happens next?</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>Your order is being prepared</li>
              <li>We will notify you once it ships</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-black text-white font-bold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="px-8 py-3 border border-black font-bold hover:bg-black hover:text-white transition"
            >
              View My Orders
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
