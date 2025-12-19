'use client'

import InputGroup from '@/components/admin/FormElements/InputGroup'
import { TextAreaGroup } from '@/components/admin/FormElements/InputGroup/text-area'
import { Select } from '@/components/admin/FormElements/select'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'
import { CancelButton } from '@/components/admin/ui/cancelButton'
import { useActionState } from 'react'

type ProductFormProps = {
  action: any
  defaultValues?: {
    name?: string
    basePrice?: number
    category?: string
    description?: string
    materials?: string
    notes?: string
  }
}

const initialState = { success: false, message: '' }

export function ProductForm({ action, defaultValues }: ProductFormProps) {
  const [state, formAction] = useActionState(action, initialState)

  return (
    <ShowcaseSection title="Product Form" className="!p-6.5">
      <form
        action={formAction}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {state.message && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}

        <InputGroup
          name="name"
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          required
          defaultValue={defaultValues?.name}
        />

        {/* Images */}
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

        <InputGroup
          name="basePrice"
          type="number"
          label="Base Price"
          defaultValue={String(defaultValues?.basePrice)}
          placeholder="Enter base price"
          required
          
        />

        <Select
          name="category"
          label="Category"
          defaultValue={defaultValues?.category}
          placeholder="Select category"
          items={[
            { label: 'Popular', value: 'Popular' },
            { label: 'General', value: 'General' },
          ]}
        />

        <TextAreaGroup
          name="description"
          label="Description"
          defaultValue={defaultValues?.description}
          placeholder="Product description"
        />

        <TextAreaGroup
          name="materials"
          label="Materials"
          defaultValue={defaultValues?.materials}
          placeholder="Materials used"
        />

        <TextAreaGroup
          name="notes"
          label="Notes"
          defaultValue={defaultValues?.notes}
          placeholder="Additional notes"
        />

        <div className="flex justify-end gap-3">
          <CancelButton to="/admin/products" />
          <button type="submit" className="mt-6 flex justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  )
}
