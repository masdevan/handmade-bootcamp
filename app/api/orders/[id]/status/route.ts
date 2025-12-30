import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ALLOWED_STATUS = ['Progress', 'Delivery', 'Completed', 'Cancelled']

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = Number(id)

    if (!Number.isInteger(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order id' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { status } = body

    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder,
    })
  } catch (error: any) {
    console.error('UPDATE ORDER STATUS ERROR 👉', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    )
  }
}