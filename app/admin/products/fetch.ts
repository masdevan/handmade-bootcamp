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

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}
