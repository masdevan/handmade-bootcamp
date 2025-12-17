import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import { CreateProductsForm } from "../../components/create-form";

export const metadata: Metadata = {
  title: "Edit Products",
};


export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Products", href: "/admin/products" },
          { label: "Edit" },
        ]}
      />

      <CreateProductsForm />
    </>
  );
}
