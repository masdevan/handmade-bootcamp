import { prisma } from "@/lib/prisma";

export async function getPaymentsOverviewData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  const isYearly = timeFrame === "yearly";
  const now = new Date();

  if (isYearly) {
    const data = await prisma.$queryRaw<
      { year: number; paid: number; unpaid: number }[]
    >`
      SELECT 
        YEAR(createdAt) as year,
        SUM(CASE WHEN paymentStatus = 'Paid' THEN totalPrice ELSE 0 END) as paid,
        SUM(CASE WHEN paymentStatus != 'Paid' THEN totalPrice ELSE 0 END) as unpaid
      FROM \`Order\`
      GROUP BY YEAR(createdAt)
      ORDER BY year ASC
    `;

    return {
      received: data.map(d => ({ x: d.year, y: Number(d.paid) })),
      due: data.map(d => ({ x: d.year, y: Number(d.unpaid) })),
    };
  }

  const monthly = await prisma.$queryRaw<
    { month: number; paid: number; unpaid: number }[]
  >`
    SELECT 
      MONTH(createdAt) as month,
      SUM(CASE WHEN paymentStatus = 'Paid' THEN totalPrice ELSE 0 END) as paid,
      SUM(CASE WHEN paymentStatus != 'Paid' THEN totalPrice ELSE 0 END) as unpaid
    FROM \`Order\`
    WHERE YEAR(createdAt) = YEAR(CURDATE())
    GROUP BY MONTH(createdAt)
  `;

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return {
    received: monthly.map(m => ({ x: months[m.month - 1], y: Number(m.paid) })),
    due: monthly.map(m => ({ x: months[m.month - 1], y: Number(m.unpaid) })),
  };
}

export async function getWeeksProfitData(timeFrame?: string) {
  const start =
    timeFrame === "last week"
      ? new Date(Date.now() - 14 * 86400000)
      : new Date(Date.now() - 7 * 86400000);

  const orders = await prisma.order.findMany({
    where: {
      paymentStatus: "Paid",
      createdAt: { gte: start },
    },
    select: {
      totalPrice: true,
      createdAt: true,
    },
  });

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const map = days.map(day => ({
    sales: 0,
    revenue: 0,
  }));

  orders.forEach(o => {
    const d = o.createdAt.getDay();
    map[d].sales += 1;
    map[d].revenue += Number(o.totalPrice);
  });

  return {
    sales: days.map((d, i) => ({ x: d, y: map[i].sales })),
    revenue: days.map((d, i) => ({ x: d, y: map[i].revenue })),
  };
}