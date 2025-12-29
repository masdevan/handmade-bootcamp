import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'
import Image from 'next/image'
import Link from 'next/link'
import { PencilSquareIcon } from '@/assets/admin/icons'
import { DeleteProductButton } from '../components/deleteButton'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) {
    notFound()
  }

  const productId = Number(id)

  if (!Number.isInteger(productId)) {
    notFound()
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: [
          { isPrimary: 'desc' },
          { id: 'asc' },
        ],
      },
    },
  })

  if (!product) {
    notFound()
  }

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const otherImages = product.images.filter(img => img.id !== primaryImage?.id)

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Products', href: '/admin/products' },
          { label: product.name },
        ]}
      />

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Product Details
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              <PencilSquareIcon className="h-4 w-4" />
              <span>Edit Product</span>
            </Link>
            <DeleteProductButton productId={product.id} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Images Section */}
          <ShowcaseSection title="Product Images" className="!p-6.5">
            {primaryImage ? (
              <div className="space-y-4">
                {/* Primary Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-stroke">
                  <Image
                    src={primaryImage.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-2 left-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                    Primary
                  </div>
                </div>

                {/* Other Images */}
                {otherImages.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-dark dark:text-white">
                      Additional Images ({otherImages.length})
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {otherImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative aspect-square overflow-hidden rounded-lg border border-stroke"
                        >
                          <Image
                            src={image.url}
                            alt={`${product.name} - Image ${image.id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg border border-stroke bg-gray-100">
                <p className="text-sm text-gray-500">No images available</p>
              </div>
            )}
          </ShowcaseSection>

          {/* Product Information */}
          <div className="space-y-6">
            <ShowcaseSection title="Product Information" className="!p-6.5">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Product Name
                  </label>
                  <p className="mt-1 text-lg font-semibold text-dark dark:text-white">
                    {product.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </label>
                    <p className="mt-1 text-dark dark:text-white">
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Base Price
                    </label>
                    <p className="mt-1 text-lg font-semibold text-dark dark:text-white">
                      ${product.basePrice}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </label>
                  <p className="mt-1 whitespace-pre-wrap text-dark dark:text-white">
                    {product.description || <span className="text-gray-400">No description</span>}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Materials
                  </label>
                  <p className="mt-1 whitespace-pre-wrap text-dark dark:text-white">
                    {product.materials || <span className="text-gray-400">No materials specified</span>}
                  </p>
                </div>

                {product.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Notes
                    </label>
                    <p className="mt-1 whitespace-pre-wrap text-dark dark:text-white">
                      {product.notes}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 border-t border-stroke pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created At
                    </label>
                    <p className="mt-1 text-sm text-dark dark:text-white">
                      {new Date(product.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Updated
                    </label>
                    <p className="mt-1 text-sm text-dark dark:text-white">
                        {new Date(product.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </ShowcaseSection>
          </div>
        </div>
      </div>
    </>
  )
}
