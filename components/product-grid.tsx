"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./product-card"

interface Product {
  id: string
  name: string
  price: number
  discount_percent: number
  image_url: string
  is_new: boolean
  is_popular: boolean
}

export function ProductGrid({ category = "all" }: { category?: "new" | "popular" | "all" }) {
  const [products, setProducts] = useState<Product[]>([])
  const [displayCount, setDisplayCount] = useState(8)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?category=" + category)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("[v0] Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 aspect-square animate-pulse" />
        ))}
      </div>
    )
  }

  const displayedProducts = products.slice(0, displayCount)
  const hasMore = displayCount < products.length

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            style={{
              animation: `slideInUp 0.6s ease-out`,
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setDisplayCount((prev) => prev + 4)}
            className="px-8 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors duration-300"
          >
            Show More Products
          </button>
        </div>
      )}
    </div>
  )
}
