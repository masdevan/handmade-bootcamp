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
  basePrice: number
  discount_percent: number
  image_url: string
  stock: number
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
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
          data.basePrice * (1 - data.discount_percent / 100)

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
    product.basePrice * (1 - product.discount_percent / 100)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.basePrice,
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
            <span className="text-[#866f60] font-medium">{product.name}</span>
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
              <h1 className="text-4xl font-bold text-[#b89680]">{product.name}</h1>
              <p className="text-[#9e816e] mb-6 text-lg leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/10">
                <span className="text-5xl font-bold text-[#67564a]">${product.basePrice}</span>
                {product.discount_percent > 0 && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.basePrice.toFixed(2)}</span>
                    <span className="px-4 py-2 bg-red-600 text-white font-bold">Save {product.discount_percent}%</span>
                  </>
                )}
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
              {/* <div className="mt-12 pt-8 border-t border-black/10">
                <h3 className="font-bold text-[#7e6959] text-lg mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="text-[#7e6959]">✓ High quality materials</li>
                  <li className="text-[#7e6959]">✓ 2-year warranty included</li>
                  <li className="text-[#7e6959]">✓ Free shipping worldwide</li>
                  <li className="text-[#7e6959]">✓ 30-day money-back guarantee</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
