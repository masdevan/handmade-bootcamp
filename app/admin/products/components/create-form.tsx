import InputGroup from "@/components/admin/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/admin/FormElements/InputGroup/text-area";
import { Select } from "@/components/admin/FormElements/select";
import { ShowcaseSection } from "@/components/admin/Layouts/showcase-section";
import { createProduct } from "../actions";
import { CancelButton } from "@/components/admin/ui/cancelButton";

export function CreateProductsForm() {
  return (
    <ShowcaseSection title="Create Product" className="!p-6.5">
      <form action={createProduct} className="space-y-6">
        
        {/* Product Name */}
        <InputGroup
          name="name"
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          required
        />

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
            { label: "Furniture", value: "furniture" },
            { label: "Decoration", value: "decoration" },
            { label: "Custom", value: "custom" },
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
