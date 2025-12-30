import Image from 'next/image'
import Link from 'next/link'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'

export default function OrderItems({ items }: { items: any[] }) {
  return (
    <ShowcaseSection
      title={`Ordered Items (${items.length})`}
      className="!p-6.5 lg:col-span-2"
    >
      <div className="space-y-6">
        {items.map((item) => {
          const primaryImage =
            item.product.images.find((img: any) => img.isPrimary) ||
            item.product.images[0]

          return (
            <div
              key={item.id}
              className="flex items-center gap-6 border-b pb-6 last:border-none"
            >
              {/* IMAGE */}
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              {/* PRICE */}
              <p className="font-semibold">
                ${(item.priceEach * item.quantity).toLocaleString()}
              </p>

              {/* LINK */}
              <Link
                href={`/admin/products/${item.product.id}`}
                className="text-sm text-primary hover:underline"
              >
                View
              </Link>
            </div>
          )
        })}
      </div>
    </ShowcaseSection>
  )
}
