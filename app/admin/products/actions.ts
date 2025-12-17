// app/admin/products/actions.ts
'use server'

import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  // simpan ke database
  // await prisma.product.create(...)

  redirect('/admin/products')
}
