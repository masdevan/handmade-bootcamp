"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
          <h1 className="text-5xl font-bold mb-4 animate-slide-in-down">Shop All Products</h1>
          <p className="text-gray-600 text-lg mb-12 animate-slide-in-down" style={{ animationDelay: "0.1s" }}>
            Browse our complete collection of premium products
          </p>
          <ProductGrid category="all" />
        </div>
      </main>
      <Footer />
    </>
  )
}
