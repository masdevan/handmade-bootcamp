import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

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
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          deletedAt: true,
        },
      }),
      prisma.user.count(),
    ])

    const itemsWithStatus = items.map((item) => ({
      ...item,
      status: item.deletedAt ? 'nonaktif' : 'aktif',
    }))

    const totalPages = Math.ceil(total / PAGE_SIZE)

    return NextResponse.json({
      data: itemsWithStatus,
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, role, password } = body

    if (!name || !email || !phone || !role || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      message: 'User created successfully',
      data: user,
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
        { message: 'User id is required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        deletedAt: null,
      },
    })

    return NextResponse.json({
      message: 'User activated successfully',
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
        { message: 'User id is required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
