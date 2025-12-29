"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    const search = searchParams.get("search") || ""
    setSearchQuery(search)
  }, [searchParams])

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
          <h1 className="text-5xl font-bold mb-4 animate-slide-in-down text-[#8e7768]">Shop All Products</h1>
          <p className="text-[#8e7768] text-lg mb-12 animate-slide-in-down" style={{ animationDelay: "0.1s" }}>
            Browse our complete collection of premium products
          </p>
          
          <div className="mb-12 animate-slide-in-down" style={{ animationDelay: "0.2s" }}>
            <SearchBar 
              initialValue={searchQuery}
              onSearch={(query) => {
                setSearchQuery(query)
                const url = new URL(window.location.href)
                if (query.trim()) {
                  url.searchParams.set("search", query)
                } else {
                  url.searchParams.delete("search")
                }
                window.history.pushState({}, "", url.toString())
              }}
              placeholder="Cari produk berdasarkan nama, deskripsi, atau kategori..."
            />
          </div>
          
          <ProductGrid category="all" searchQuery={searchQuery} />
        </div>
      </main>
      <Footer />
    </>
  )
}
