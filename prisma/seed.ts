import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import bcrypt from 'bcrypt'
import { MOCK_USERS, MOCK_PRODUCTS } from '../lib/mock-data'

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

async function seedUsers() {
  for (const user of MOCK_USERS) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        phone: '08123456789',
        role: user.role,
      },
    })
  }

  console.log('✅ Users seeded')
}

async function seedProducts() {
  for (const product of MOCK_PRODUCTS) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        materials: 'Default Material',
        notes: product.is_new ? 'New Product' : '',
        basePrice: Math.round(product.price),
        category: product.is_popular ? 'Popular' : 'General',
        createdAt: new Date(),
        updatedAt: new Date(),

        images: {
          create: [
            {
              url: product.image_url,
              isPrimary: true,
            },
          ],
        },
      },
    })

    await prisma.productVariant.createMany({
      data: [
        {
          productId: createdProduct.id,
          type: 'COLOR',
          value: 'Default',
          addPrice: 0,
        },
      ],
    })
  }

  console.log('✅ Products seeded')
}

async function main() {
  await seedUsers()
  await seedProducts()
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('🌱 Seeding done successfully')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
