import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb'
import { getProductById } from '../../fetch'
import { updateProduct } from '../../actions'
import { ProductForm } from '../../components/productForm'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(Number(id))

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Products', href: '/admin/products' },
          { label: 'Edit' },
        ]}
      />

      <ProductForm
        action={updateProduct}
        isEdit={true}
        productId={product.id}
        existingImages={product.images || []}
        defaultValues={{
          name: product.name,
          basePrice: product.basePrice,
          category: product.category,
          description: product.description,
          materials: product.materials,
          notes: product.notes,
        }}
      />
    </>
  )
}
