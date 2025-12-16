import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import { TopProducts } from "@/components/admin/Tables/top-products";
import { TopProductsSkeleton } from "@/components/admin/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
