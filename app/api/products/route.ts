import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
            { category: { contains: search } },
          ],
        }
      : undefined

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        images: true,
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const filteredProducts = search
      ? products.filter((product) => {
          const searchLower = search.toLowerCase()
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
          )
        })
      : products

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      description,
      materials,
      notes,
      basePrice,
      category,
      images,
      variants
    } = body

    if (!name || !description || !basePrice || !category) {
      return NextResponse.json(
        { message: 'Field wajib belum lengkap' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        description,
        materials,
        notes,
        basePrice,
        category,
        images: images
          ? {
            create: images.map((img: any) => ({
              url: img.url,
              isPrimary: img.isPrimary ?? false
            }))
          }
          : undefined,
        variants: variants
          ? {
            create: variants.map((v: any) => ({
              type: v.type,
              value: v.value,
              addPrice: v.addPrice
            }))
          }
          : undefined
      },
      include: {
        images: true,
        variants: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

