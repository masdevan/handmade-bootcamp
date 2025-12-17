import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import { TableProducts } from "./components/index";
import { TableProductsSkeleton } from "./skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Products" },
        ]}
      />

      <div className="space-y-10">
        <Suspense fallback={<TableProductsSkeleton />}>
          <TableProducts />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
