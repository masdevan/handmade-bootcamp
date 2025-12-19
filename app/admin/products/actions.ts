'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation'
import path from 'path'
import fs from 'fs/promises'

const MAX_IMAGE_SIZE = 1000 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function createProduct(
  prevState: { success: boolean; message?: string },
  formData: FormData
): Promise<{ success: boolean; message?: string }> {

  const name = formData.get('name') as string
  const basePrice = Number(formData.get('basePrice'))
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const materials = formData.get('materials') as string
  const notes = (formData.get('notes') as string) || ''
  const images = formData.getAll('images') as File[]

  if (!name || Number.isNaN(basePrice) || !category) {
    return {
      success: false,
      message: 'Please fill all required fields',
    }
  }

  if (images.length === 0) {
    return {
      success: false,
      message: 'At least one image is required',
    }
  }

  for (const image of images) {
    if (image.size === 0) {
      return {
        success: false,
        message: 'Empty image file detected',
      }
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return {
        success: false,
        message: `Image "${image.name}" exceeds 1 MB limit`,
      }
    }

    if (!ALLOWED_TYPES.includes(image.type)) {
      return {
        success: false,
        message: `Image "${image.name}" has invalid file type`,
      }
    }
  }

  const product = await prisma.product.create({
    data: {
      name,
      basePrice,
      category,
      description,
      materials,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const uploadDir = path.join(process.cwd(), 'public/images/product')
  await fs.mkdir(uploadDir, { recursive: true })

  const uploadedUrls: string[] = []

  for (const image of images) {
    if (image.size === 0) continue

    const buffer = Buffer.from(await image.arrayBuffer())
    const ext = image.name.split('.').pop() || 'jpg'
    const fileName = `product-${product.id}-${Date.now()}.${ext}`

    await fs.writeFile(path.join(uploadDir, fileName), buffer)

    uploadedUrls.push(`/images/product/${fileName}`)
  }

  await prisma.productImage.createMany({
    data: uploadedUrls.map((url, index) => ({
      productId: product.id,
      url,
      isPrimary: index === 0,
    })),
  })

  redirect('/admin/products')
}
