import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 10

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    
    const validPage = Math.max(1, Math.floor(page))
    const skip = (validPage - 1) * PAGE_SIZE

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: PAGE_SIZE,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
    ])

    const totalPages = Math.ceil(total / PAGE_SIZE)

    return NextResponse.json({
      data: items,
      total,
      totalPages: totalPages || 1,
      currentPage: validPage,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
