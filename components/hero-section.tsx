"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-black to-gray-900 text-white py-32 md:py-48 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gray-500 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className={`${isVisible ? "animate-slide-in-left" : ""}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
              Premium Shopping Redefined
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover curated collections of the finest products with exclusive discounts and exceptional quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-100 transition-colors text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors font-bold text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`${isVisible ? "animate-slide-in-right" : ""}`}>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 aspect-square flex items-center justify-center text-8xl font-bold text-white">
                ✨
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/20">
          <div className={`${isVisible ? "animate-fade-in" : ""}`} style={{ animationDelay: "0.3s" }}>
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-gray-400">Products</p>
          </div>
          <div className={`${isVisible ? "animate-fade-in" : ""}`} style={{ animationDelay: "0.4s" }}>
            <p className="text-4xl font-bold">50K+</p>
            <p className="text-gray-400">Happy Customers</p>
          </div>
          <div className={`${isVisible ? "animate-fade-in" : ""}`} style={{ animationDelay: "0.5s" }}>
            <p className="text-4xl font-bold">99%</p>
            <p className="text-gray-400">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
