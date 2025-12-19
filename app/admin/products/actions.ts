'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import path from 'path'
import fs from 'fs/promises'

const MAX_IMAGE_SIZE = 1000 * 1024 // 1MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

type ActionState = {
  success: boolean
  message?: string
}

/* ===========================
   CREATE PRODUCT
=========================== */
export async function createProduct(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  /* ---------- BASIC FIELDS ---------- */
  const name = formData.get('name')?.toString().trim()
  const basePrice = Number(formData.get('basePrice'))
  const category = formData.get('category')?.toString()
  const description = formData.get('description')?.toString() || ''
  const materials = formData.get('materials')?.toString() || ''
  const notes = formData.get('notes')?.toString() || ''

  const images = formData.getAll('images') as File[]

  /* ---------- FIELD VALIDATION ---------- */
  if (!name || !category || Number.isNaN(basePrice)) {
    return error('Please fill all required fields')
  }

  if (basePrice <= 0) {
    return error('Base price must be greater than 0')
  }

  /* ---------- IMAGE VALIDATION ---------- */
  const imageValidation = validateImages(images)
  if (!imageValidation.success) {
    return imageValidation
  }

  /* ---------- CREATE PRODUCT ---------- */
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

  /* ---------- SAVE IMAGES ---------- */
  const uploadDir = path.join(process.cwd(), 'public/images/product')
  await fs.mkdir(uploadDir, { recursive: true })

  const uploadedUrls: string[] = []

  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer())
    const ext = image.name.split('.').pop() || 'jpg'
    const fileName = `product-${product.id}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`

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

/* ===========================
   UPDATE PRODUCT
=========================== */
export async function updateProduct(
  productId: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name')?.toString().trim()
  const basePrice = Number(formData.get('basePrice'))
  const category = formData.get('category')?.toString()

  if (!name || !category || Number.isNaN(basePrice)) {
    return error('Invalid product data')
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      basePrice,
      category,
      updatedAt: new Date(),
    },
  })

  redirect('/admin/products')
}

/* ===========================
   HELPERS
=========================== */
function validateImages(images: File[]): ActionState {
  if (!images.length) {
    return error('At least one image is required')
  }

  for (const image of images) {
    if (image.size === 0) {
      return error('Empty image file detected')
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return error(`Image "${image.name}" exceeds 1 MB limit`)
    }

    if (!ALLOWED_TYPES.includes(image.type)) {
      return error(`Image "${image.name}" has invalid file type`)
    }
  }

  return { success: true }
}

function error(message: string): ActionState {
  return { success: false, message }
}
