'use client'

// import { deleteProduct } from '../actions'
import { TrashIcon } from '@/assets/admin/icons'

export function DeleteProductButton({ productId }: { productId: number }) {
  async function handleDelete() {
    const ok = confirm('Are you sure you want to delete this product?')

    if (!ok) return

    // const res = await deleteProduct(productId)

    // if (!res.success) {
    //   alert(res.message || 'Failed to delete')
    // }
  }

  return (
    <button
      onClick={handleDelete}
      className="hover:text-red-500"
    >
      <span className="sr-only">Delete Product</span>
      <TrashIcon className="h-5 w-5" />
    </button>
  )
}
