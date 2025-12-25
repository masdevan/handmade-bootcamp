"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./product-card"

interface Product {
  id: number
  name: string
  basePrice: number
  discount_percent?: number
  images: {
    url: string
  }[]
  is_new?: boolean
  is_popular?: boolean
}

export function ProductGrid({ 
  category = "all",
  searchQuery = ""
}: { 
  category?: "new" | "popular" | "all"
  searchQuery?: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [displayCount, setDisplayCount] = useState(8)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let url = "/api/products"
        const params = new URLSearchParams()
        
        if (searchQuery) {
          params.append("search", searchQuery)
        } else if (category !== "all") {
          params.append("category", category)
        }
        
        if (params.toString()) {
          url += "?" + params.toString()
        }
        
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("[v0] Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, searchQuery])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bg-gray-200 aspect-square animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-[#8d7565]">
          {searchQuery ? `Tidak ada produk yang ditemukan untuk "${searchQuery}"` : "Tidak ada produk tersedia"}
        </p>
      </div>
    )
  }

  const displayedProducts = products.slice(0, displayCount)
  const hasMore = displayCount < products.length

  return (
    <div className="flex flex-col">
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-[#8d7565]">
            Menampilkan {products.length} hasil untuk "{searchQuery}"
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
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
            className="px-8 py-3 bg-[#C5A48E] text-white font-bold hover:bg-[#a18978] transition-colors duration-300"
          >
            Show More Products
          </button>
        </div>
      )}
    </div>
  )
}
