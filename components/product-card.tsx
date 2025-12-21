"use client"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    name: string
    basePrice: number
    discount_percent: number
    images: {
      url: string
    }[]
    is_new: boolean
    is_popular: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : "/placeholder.svg"

  return (
    <Link href={`/product/${product.id}`}>
      <div className="transition-colors duration-300 cursor-pointer group h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square w-full rounded-xl border border-gray-200">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            <span className="px-3 py-1 bg-[#C5A48E] text-white text-xs font-bold rounded-lg">Special</span>
          </div>
        </div>

        {/* Content - grows to fill remaining space */}
        <div className="flex flex-col gap-2 mt-2">
          <div>
            <h3 className="font-bold text-lg -mb-2 text-[#8d7565] line-clamp-2 group-hover:text-[#55463c] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price - always at bottom */}
          <div className="flex items-center gap-3">
              <span className="text-sm text-[#584e46]">${product.basePrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
