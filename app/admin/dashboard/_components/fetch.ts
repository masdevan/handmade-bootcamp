import { prisma } from "@/lib/prisma";

export async function getOverviewData() {
  const [
    totalOrders,
    totalProfit,
    totalProducts,
    totalUsers,
  ] = await Promise.all([
    prisma.order.count(),

    prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
    }),

    prisma.product.count(),

    prisma.user.count(),
  ]);

  return {
    views: {
      value: totalOrders,
    },
    profit: {
      value: totalProfit._sum.totalPrice ?? 0,
    },
    products: {
      value: totalProducts,
    },
    users: {
      value: totalUsers,
    },
  };
}
