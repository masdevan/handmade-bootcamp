'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import path from 'path'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'

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
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  /* ---------- GET PRODUCT ID ---------- */
  const productIdParam = formData.get('productId')?.toString()
  if (!productIdParam) {
    return error('Product ID is required')
  }
  
  const productId = Number(productIdParam)
  if (isNaN(productId)) {
    return error('Invalid product ID')
  }

  /* ---------- BASIC FIELDS ---------- */
  const name = formData.get('name')?.toString().trim()
  const basePrice = Number(formData.get('basePrice'))
  const category = formData.get('category')?.toString()
  const description = formData.get('description')?.toString() || ''
  const materials = formData.get('materials')?.toString() || ''
  const notes = formData.get('notes')?.toString() || ''

  const images = formData.getAll('images') as File[]
  const deleteImagesParam = formData.get('deleteImages')?.toString()

  /* ---------- FIELD VALIDATION ---------- */
  if (!name || !category || Number.isNaN(basePrice)) {
    return error('Please fill all required fields')
  }

  if (basePrice <= 0) {
    return error('Base price must be greater than 0')
  }

  /* ---------- DELETE MARKED IMAGES ---------- */
  let deletedPrimaryImage = false
  if (deleteImagesParam) {
    const imageIdsToDelete = deleteImagesParam
      .split(',')
      .map(id => Number(id.trim()))
      .filter(id => !isNaN(id) && id > 0)
    
    if (imageIdsToDelete.length > 0) {
      const imagesToDelete = await prisma.productImage.findMany({
        where: {
          id: { in: imageIdsToDelete },
          productId,
        },
      })
      
      deletedPrimaryImage = imagesToDelete.some(img => img.isPrimary)

      await prisma.productImage.deleteMany({
        where: {
          id: { in: imageIdsToDelete },
          productId,
        },
      })
    }
  }

  /* ---------- IMAGE VALIDATION (jika ada yang diupload) ---------- */
  const hasNewImages = images.length > 0 && images.some(img => img.size > 0)
  if (hasNewImages) {
    const imageValidation = validateImages(images.filter(img => img.size > 0))
    if (!imageValidation.success) {
      return imageValidation
    }
  }

  /* ---------- UPDATE PRODUCT ---------- */
  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      basePrice,
      category,
      description,
      materials,
      notes,
      updatedAt: new Date(),
    },
  })

  /* ---------- HANDLE IMAGE UPDATES ---------- */
  if (hasNewImages) {
    const uploadDir = path.join(process.cwd(), 'public/images/product')
    await fs.mkdir(uploadDir, { recursive: true })

    const uploadedUrls: string[] = []

    for (const image of images) {
      if (image.size === 0) continue

      const buffer = Buffer.from(await image.arrayBuffer())
      const ext = image.name.split('.').pop() || 'jpg'
      const fileName = `product-${productId}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`

      await fs.writeFile(path.join(uploadDir, fileName), buffer)
      uploadedUrls.push(`/images/product/${fileName}`)
    }

    await prisma.productImage.deleteMany({
      where: { productId }
    })

    if (uploadedUrls.length > 0) {
      await prisma.productImage.createMany({
        data: uploadedUrls.map((url, index) => ({
          productId,
          url,
          isPrimary: index === 0,
        })),
      })
    }
  } else {
    if (deletedPrimaryImage) {
      const remainingImages = await prisma.productImage.findMany({
        where: { productId },
        orderBy: { id: 'asc' },
        take: 1,
      })

      if (remainingImages.length > 0) {
        await prisma.productImage.update({
          where: { id: remainingImages[0].id },
          data: { isPrimary: true },
        })
      }
    }
  }

  const hasPrimaryImage = await prisma.productImage.findFirst({
    where: {
      productId,
      isPrimary: true,
    },
  })

  if (!hasPrimaryImage) {
    const firstImage = await prisma.productImage.findFirst({
      where: { productId },
      orderBy: { id: 'asc' },
    })

    if (firstImage) {
      await prisma.productImage.update({
        where: { id: firstImage.id },
        data: { isPrimary: true },
      })
    }
  }

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

export async function deleteProduct(productId: number) {
  try {
    const images = await prisma.productImage.findMany({
      where: { productId },
    })

    for (const image of images) {
      const filePath = path.join(
        process.cwd(),
        'public',
        image.url
      )

      try {
        await fs.unlink(filePath)
      } catch {
      }
    }

    await prisma.productImage.deleteMany({
      where: { productId },
    })

    await prisma.product.delete({
      where: { id: productId },
    })

    revalidatePath('/admin/products')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete product',
    }
  }
}