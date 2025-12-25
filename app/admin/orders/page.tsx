import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import { TableOrders } from "./components/index";
import { TableOrdersSkeleton } from "./skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Orders",
};

const TablesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Orders" },
        ]}
      />

      <div className="space-y-10">
        <Suspense fallback={<TableOrdersSkeleton />}>
          <TableOrders searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
