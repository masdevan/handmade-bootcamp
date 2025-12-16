"use client"

import { use, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount_percent: number
  image_url: string
  stock: number
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = use(params)

  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [priceHistory, setPriceHistory] = useState<
    { time: string; price: number }[]
  >([])
  const [isAdded, setIsAdded] = useState(false)

  const router = useRouter()
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data: Product = await res.json()
        setProduct(data)

        const currentPrice =
          data.price * (1 - data.discount_percent / 100)

        // Dummy price history for chart
        setPriceHistory([
          { time: "10:00", price: currentPrice - 8 },
          { time: "11:00", price: currentPrice - 3 },
          { time: "12:00", price: currentPrice - 5 },
          { time: "13:00", price: currentPrice + 2 },
          { time: "14:00", price: currentPrice - 1 },
          { time: "15:00", price: currentPrice + 4 },
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

  const discountedPrice =
    product.price * (1 - product.discount_percent / 100)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discount_percent: product.discount_percent,
      quantity,
      image_url: product.image_url,
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
        <div className="max-w-7xl mx-auto py-16">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in">
            <Link href="/" className="text-[#b89680] hover:text-black transition-colors">
              Home
            </Link>
            <span className="mx-2 text-[#b89680]">/</span>
            <span className="text-[#866f60] font-medium">Mbak Eci Anjay Mabar</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="animate-slide-in-left">
              <div className="bg-gray-100 aspect-square flex rounded-2xl items-center justify-center overflow-hidden">
                <img
                  src={product.image_url || "/images/product/eci.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-slide-in-right">
              <h1 className="text-4xl font-bold text-[#b89680]">Guntur Sinar Raya</h1>
              <p className="text-[#9e816e] mb-6 text-lg leading-relaxed">Dengan membeli produk ini owner akan kaya, Dengan membeli produk ini owner akan kaya, Dengan membeli produk ini owner akan kaya, Dengan membeli produk ini owner akan kaya</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/10">
                <span className="text-5xl font-bold text-[#67564a]">$986</span>
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
                  <span className="font-bold text-[#67564a]">Availability: </span>
                  <span className={product.stock > 0 ? "text-[#ac917e] font-bold" : "text-[#a86b40] font-bold"}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-bold text-[#67564a]">SKU: </span>
                  <span className="text-[#ac917e]">DG-{String(product.id).padStart(4, "0")}</span>
                </p>
                <p className="text-lg">
                  <span className="font-bold text-[#67564a]">Rating: </span>
                  <span className="text-[#ac917e]">★★★★★ (245 reviews)</span>
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-bold text-lg text-[#67564a]">Quantity:</span>
                <div className="flex items-center border border-[#67564a]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold min-w-12 text-center text-[#67564a]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#67564a] transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={product.stock === 0}
                  className={`w-full rounded-lg cursor-pointer py-4 font-bold text-lg transition-all duration-300 ${
                    product.stock === 0
                      ? "bg-[#b59680] text-[#eec2a2] cursor-not-allowed"
                      : "bg-[#67564a] text-white hover:bg-[#7f6a5b]"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Buy Now / Checkout"}
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-4 rounded-lg cursor-pointer font-bold text-lg transition-all duration-300 ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : product.stock === 0
                        ? "bg-[#f8f3ef] text-[#7e6959] cursor-not-allowed border border-[#d4b399]"
                        : "bg-white text-[#7e6959] border border-[#7e6959] hover:bg-[#f8f3ef]"
                  }`}
                >
                  {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Product Features */}
              <div className="mt-12 pt-8 border-t border-black/10">
                <h3 className="font-bold text-[#7e6959] text-lg mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="text-[#7e6959]">✓ High quality materials</li>
                  <li className="text-[#7e6959]">✓ 2-year warranty included</li>
                  <li className="text-[#7e6959]">✓ Free shipping worldwide</li>
                  <li className="text-[#7e6959]">✓ 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="mt-16 pt-16 border-t border-black/10">
            <h3 className="text-2xl text-[#866f60] font-bold mb-8">Price History (Last 24h)</h3>
            <div className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e6e1dd"
                  />

                  <XAxis
                    dataKey="time"
                    stroke="#866f60"
                    tick={{ fill: "#866f60", fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#866f60"
                    tick={{ fill: "#866f60", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #866f60",
                      borderRadius: 0,
                      color: "#866f60",
                    }}
                    labelStyle={{ color: "#866f60" }}
                    formatter={(value) => [`$${(value as number).toFixed(2)}`, "Price"]}
                  />

                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#866f60"
                    strokeWidth={2.5}
                    dot={{ fill: "#866f60", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <p className="text-sm text-[#866f60] mt-6 flex flex-wrap gap-2">
                <span>
                  <strong>Current:</strong>{" "}
                  $
                  {(priceHistory[priceHistory.length - 1]?.price || discountedPrice).toFixed(2)}
                </span>
                •
                <span>
                  <strong>Highest:</strong>{" "}
                  ${Math.max(...priceHistory.map((p) => p.price)).toFixed(2)}
                </span>
                •
                <span>
                  <strong>Lowest:</strong>{" "}
                  ${Math.min(...priceHistory.map((p) => p.price)).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
