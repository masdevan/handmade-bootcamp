import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import { TableUsers } from "./components/index";
import { TableUsersSkeleton } from "./skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Users" },
        ]}
      />

      <div className="space-y-10">
        <Suspense fallback={<TableUsersSkeleton />}>
          <TableUsers />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
