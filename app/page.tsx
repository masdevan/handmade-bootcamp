"use client"

import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { SliderSection } from "@/components/slider-section"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SliderSection />
      <section className="py-4 px-4 md:px-8 lg:px-16 bg-white">
        <div className="w-full max-w-7xl m-auto">
          <div className="animate-slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#8e7768]">New Arrivals</h2>
            <p className="text-[#b89680] mb-12 text-lg">Discover our latest collection</p>
          </div>
          <ProductGrid category="new" />
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="w-full max-w-7xl m-auto">
          <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8e7768]">Popular Products</h2>
            <p className="text-[#b89680] mb-12 text-lg">Best sellers this month</p>
          </div>
          <ProductGrid category="popular" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
