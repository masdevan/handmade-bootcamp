"use client"

import { use, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount_percent: number
  image_url: string
  stock: number
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // const { id } = use(params)
  const id = use(params).id
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([])
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        const data = await response.json()
        setProduct(data)

        // Initialize price history
        const currentPrice = data.price * (1 - data.discount_percent / 100)
        setPriceHistory([
          { time: "00:00", price: currentPrice },
          { time: "04:00", price: currentPrice + (Math.random() - 0.5) * 10 },
          { time: "08:00", price: currentPrice + (Math.random() - 0.5) * 10 },
          { time: "12:00", price: currentPrice + (Math.random() - 0.5) * 10 },
          { time: "16:00", price: currentPrice + (Math.random() - 0.5) * 10 },
          { time: "20:00", price: currentPrice + (Math.random() - 0.5) * 10 },
          { time: "Now", price: currentPrice },
        ])
      } catch (error) {
        console.error("Failed to fetch product:", error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  const discountedPrice = product.price * (1 - product.discount_percent / 100)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discount_percent: product.discount_percent,
      quantity,
      image_url: product.image_url, // Added image_url to cart
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleCheckout = () => {
    handleAddToCart()
    router.push("/cart")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="animate-slide-in-left">
              <div className="bg-gray-100 aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-slide-in-right">
              <h1 className="text-4xl font-bold mb-4 text-black">{product.name}</h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/10">
                <span className="text-5xl font-bold text-black">${discountedPrice.toFixed(2)}</span>
                {product.discount_percent > 0 && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="px-4 py-2 bg-red-600 text-white font-bold">Save {product.discount_percent}%</span>
                  </>
                )}
              </div>

              {/* Stock & Rating */}
              <div className="mb-8 space-y-3 pb-8 border-b border-black/10">
                <p className="text-lg">
                  <span className="font-bold">Availability: </span>
                  <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-bold">SKU: </span>
                  <span className="text-gray-600">DG-{String(product.id).padStart(4, "0")}</span>
                </p>
                <p className="text-lg">
                  <span className="font-bold">Rating: </span>
                  <span className="text-gray-600">★★★★★ (245 reviews)</span>
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-bold text-lg">Quantity:</span>
                <div className="flex items-center border border-black/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={product.stock === 0}
                  className={`w-full py-4 font-bold text-lg transition-all duration-300 ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Buy Now / Checkout"}
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-4 font-bold text-lg transition-all duration-300 ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : product.stock === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                        : "bg-white text-black border border-black/20 hover:bg-gray-50"
                  }`}
                >
                  {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Product Features */}
              <div className="mt-12 pt-8 border-t border-black/10">
                <h3 className="font-bold text-lg mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ High quality materials</li>
                  <li>✓ 2-year warranty included</li>
                  <li>✓ Free shipping worldwide</li>
                  <li>✓ 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="mt-16 pt-16 border-t border-black/10">
            <h3 className="text-2xl font-bold mb-8">Price History (Last 24h)</h3>
            <div className="bg-gray-50 p-8">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #000",
                      borderRadius: 0,
                    }}
                    formatter={(value) => `$${(value as number).toFixed(2)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#000"
                    dot={{ fill: "#000", r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-6">
                <strong>Current Price:</strong> $
                {(priceHistory[priceHistory.length - 1]?.price || discountedPrice).toFixed(2)} •
                <strong> Highest:</strong> ${Math.max(...priceHistory.map((p) => p.price)).toFixed(2)} •
                <strong> Lowest:</strong> ${Math.min(...priceHistory.map((p) => p.price)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
