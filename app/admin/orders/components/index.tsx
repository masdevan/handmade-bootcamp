import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { PencilSquareIcon, PreviewIcon } from "@/assets/admin/icons";
import { AdminPagination } from "@/components/admin/Pagination";
import { headers } from "next/headers";

export async function TableOrders({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const resolvedSearchParams = searchParams instanceof Promise 
    ? await searchParams 
    : searchParams;
  
  const page = Number(resolvedSearchParams.page ?? 1);
  
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const apiUrl = `${protocol}://${host}/api/orders?page=${page}`;
  
  const response = await fetch(apiUrl, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  
  const { data, totalPages, total } = await response.json();

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <Link href={'orders/create'} className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex justify-between">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Orders
        </h2>
      </Link>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Name
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((order: any) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={order.id}
            >
              <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                <div>{order.user.name}</div>
              </TableCell>

              <TableCell>{order.user.email}</TableCell>

              <TableCell>{order.status}</TableCell>

              <TableCell>{order.paymentStatus}</TableCell>

              <TableCell>${order.totalPrice}</TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">

                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="hover:text-primary"
                  >
                    <span className="sr-only">View Order</span>
                    <PreviewIcon />
                  </Link>

                  <Link href={`/admin/orders/${order.id}/edit`} className="hover:text-primary">
                    <span className="sr-only">Edit Order</span>
                    <PencilSquareIcon />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AdminPagination 
        totalPages={totalPages} 
        currentPage={page}
        totalItems={total}
        pageSize={10}
      />
    </div>
  );
}
