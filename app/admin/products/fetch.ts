import * as logos from "@/assets/admin/logos";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const PAGE_SIZE = 10;

export async function getTopProducts(page = 1) {
  noStore();

  const validPage = Math.max(1, Math.floor(page));
  const skip = (validPage - 1) * PAGE_SIZE;

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        orderItems: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  const data = items.map((product) => ({
    id: product.id,
    image: product.images[0]?.url ?? "/images/placeholder.png",
    name: product.name,
    category: product.category,
    price: product.basePrice,
    sold: product.orderItems.reduce((sum, i) => sum + i.quantity, 0),
  }));

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    data,
    total,
    totalPages: totalPages || 1,
    currentPage: validPage,
  };
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  })
}