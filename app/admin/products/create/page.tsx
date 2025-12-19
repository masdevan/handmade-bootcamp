import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import { CreateProductsForm } from "../components/create-form";
import { ProductForm } from "../components/productForm";
import { createProduct } from "../actions";

export const metadata: Metadata = {
  title: "Create Product",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Products", href: "/admin/products" },
          { label: "Create" },
        ]}
      />

      {/* <CreateProductsForm /> */}
      <ProductForm
          action={createProduct}
        />
    </>
  );
}
