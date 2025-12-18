"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface AdminPaginationProps {
  totalPages: number;
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
}

export function AdminPagination({ 
  totalPages, 
  currentPage: propCurrentPage,
  totalItems,
  pageSize = 10 
}: AdminPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = propCurrentPage ?? Number(searchParams.get("page") ?? 1);
  
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 7;
    const sideCount = 2;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, validCurrentPage - sideCount);
      const endPage = Math.min(totalPages - 1, validCurrentPage + sideCount);

      if (startPage > 2) {
        pages.push("ellipsis");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems ? (validCurrentPage - 1) * pageSize + 1 : null;
  const endItem = totalItems 
    ? Math.min(validCurrentPage * pageSize, totalItems) 
    : null;

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
      {totalItems && startItem && endItem && (
        <div className="text-sm text-dark-5 dark:text-dark-6">
          Showing <span className="font-medium text-dark dark:text-white">{startItem}</span> to{" "}
          <span className="font-medium text-dark dark:text-white">{endItem}</span> of{" "}
          <span className="font-medium text-dark dark:text-white">{totalItems}</span> products
        </div>
      )}

      <Pagination className="py-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href={validCurrentPage > 1 ? createHref(validCurrentPage - 1) : "#"}
              className={validCurrentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createHref(page)}
                  isActive={page === validCurrentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext 
              href={validCurrentPage < totalPages ? createHref(validCurrentPage + 1) : "#"}
              className={validCurrentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
