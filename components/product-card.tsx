"use client"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    discount_percent: number
    image_url: string
    is_new: boolean
    is_popular: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discount_percent / 100)

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white border border-black/10 hover:border-black/30 transition-colors duration-300 cursor-pointer group h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square w-full flex-shrink-0">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.is_new && <span className="px-3 py-1 bg-black text-white text-xs font-bold">NEW</span>}
            {product.is_popular && <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold">POPULAR</span>}
            {product.discount_percent > 0 && (
              <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold">-{product.discount_percent}%</span>
            )}
          </div>
        </div>

        {/* Content - grows to fill remaining space */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-bold text-base mb-2 text-black line-clamp-2 group-hover:text-gray-700 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price - always at bottom */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-lg font-bold text-black">${discountedPrice.toFixed(2)}</span>
            {product.discount_percent > 0 && (
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
