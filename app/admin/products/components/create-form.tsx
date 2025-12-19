'use client'

import InputGroup from "@/components/admin/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/admin/FormElements/InputGroup/text-area";
import { Select } from "@/components/admin/FormElements/select";
import { ShowcaseSection } from "@/components/admin/Layouts/showcase-section";
import { createProduct } from "../actions";
import { CancelButton } from "@/components/admin/ui/cancelButton";
import { useActionState } from "react";

const initialState = { success: false, message: '' }

export function CreateProductsForm() {
  const [state, formAction] = useActionState(createProduct, initialState)
  
  return (
    <ShowcaseSection title="Create Product" className="!p-6.5">
      <form action={formAction} className="space-y-6">

        
        {/* Product Name */}
        <InputGroup
          name="name"
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          required
        />

        {/* Product Images */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark dark:text-white">
            Product Images <span className="ml-1 select-none text-red">*</span>
          </label>

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            className="block w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm"
            required
          />

          <p className="text-xs text-gray-500">
            First image will be used as primary image
          </p>
        </div>


        {/* Base Price */}
        <InputGroup
          name="basePrice"
          label="Base Price"
          type="number"
          placeholder="Enter base price"
          required
        />

        {/* Category */}
        <Select
          name="category"
          label="Category"
          placeholder="Select category"
          items={[
            { label: "Popular", value: "Popular" },
            { label: "General", value: "General" },
          ]}
          required
        />

        {/* Description */}
        <TextAreaGroup
          name="description"
          label="Description"
          placeholder="Product description"
          required
        />

        {/* Materials */}
        <TextAreaGroup
          name="materials"
          label="Materials"
          placeholder="Materials used"
          required
        />

        {/* Notes */}
        <TextAreaGroup
          name="notes"
          label="Notes (Optional)"
          placeholder="Additional notes"
        />

        {/* Error Message */}
        {state?.message && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.message}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <CancelButton to="/admin/products" />

          <button type="submit" className="mt-6 flex justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Save Product
          </button>
        </div>

      </form>
    </ShowcaseSection>
  );
}
