import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { PencilSquareIcon } from "@/assets/admin/icons";
import { AdminPagination } from "@/components/admin/Pagination";
import { headers } from "next/headers";
import { SuspendUserButton } from "./deleteButton";

export async function TableUsers({
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
  const apiUrl = `${protocol}://${host}/api/users?page=${page}`;
  
  const response = await fetch(apiUrl, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const { data, totalPages, total } = await response.json();

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <Link href={'users/create'} className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex justify-between">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Users
        </h2>
        <div className="">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[30px] py-[10px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <span>Create</span>
            </label>
          </div>
      </Link>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Name
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user: any) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={user.id}
            >
              <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                <div>{user.name}</div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.phone}</TableCell>

              <TableCell>{user.role}</TableCell>

              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === 'aktif'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {user.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                </span>
              </TableCell>

              <TableCell>
                {new Date(user.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                 
                  <Link href={`/admin/users/${user.id}/edit`} className="hover:text-primary">
                    <span className="sr-only">Edit User</span>
                    <PencilSquareIcon />
                  </Link>

                  <SuspendUserButton userId={user.id} status={user.status} />
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
