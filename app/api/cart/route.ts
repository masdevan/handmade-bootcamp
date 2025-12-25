import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { message: 'userId is required' },
        { status: 400 }
      )
    }

    const cart = await prisma.cartItem.findMany({
      where: { userId: Number(userId) },
      include: {
        product: {
          include: {
            images: {
              orderBy: [
                { isPrimary: 'desc' },
                { id: 'asc' },
              ],
            },
          },
        },
      },
      orderBy: { id: 'desc' }
    })

    return NextResponse.json({
      data: cart
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, productId, quantity, variantColorId, variantSizeId, customRequest } = body

    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { message: 'userId, productId, and quantity are required' },
        { status: 400 }
      )
    }

    const item = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
        variantColorId,
        variantSizeId,
        customRequest
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: [
                { isPrimary: 'desc' },
                { id: 'asc' },
              ],
            },
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Item added to cart',
      data: item
    }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Cart item id is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { quantity, customRequest, variantColorId, variantSizeId } = body

    const updated = await prisma.cartItem.update({
      where: { id: Number(id) },
      data: {
        quantity,
        customRequest,
        variantColorId,
        variantSizeId
      }
    })

    return NextResponse.json({
      message: 'Cart item updated',
      data: updated
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Cart item id is required' },
        { status: 400 }
      )
    }

    await prisma.cartItem.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      message: 'Cart item deleted'
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
