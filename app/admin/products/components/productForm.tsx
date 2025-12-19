'use client'

import InputGroup from '@/components/admin/FormElements/InputGroup'
import { TextAreaGroup } from '@/components/admin/FormElements/InputGroup/text-area'
import { Select } from '@/components/admin/FormElements/select'
import { ShowcaseSection } from '@/components/admin/Layouts/showcase-section'
import { CancelButton } from '@/components/admin/ui/cancelButton'
import { useActionState, useState } from 'react'
import Image from 'next/image'

type ProductImage = {
  id: number
  url: string
  isPrimary: boolean
}

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
  existingImages?: ProductImage[]
  isEdit?: boolean
  productId?: number 
}

const initialState = { success: false, message: '' }

export function ProductForm({ action, defaultValues, existingImages = [], isEdit = false, productId }: ProductFormProps) {
  const [state, formAction] = useActionState(action, initialState)
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([])

  const handleDeleteImage = (imageId: number) => {
    setImagesToDelete(prev => [...prev, imageId])
  }

  const visibleImages = existingImages.filter(img => !imagesToDelete.includes(img.id))

  return (
    <ShowcaseSection title={isEdit ? "Edit Product" : "Create Product"} className="!p-6.5">
      <form
        action={formAction}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {isEdit && productId && (
          <input type="hidden" name="productId" value={productId} />
        )}

        {state?.message && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.message}
          </div>
        )}

        {/* Product Name */}
        <InputGroup
          name="name"
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          required
          defaultValue={defaultValues?.name}
        />

        {isEdit && visibleImages.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark dark:text-white">
              Current Images
            </label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {visibleImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-stroke">
                    <Image
                      src={image.url}
                      alt={`Product image ${image.id}`}
                      fill
                      className="object-cover"
                    />
                    {image.isPrimary && (
                      <div className="absolute top-2 left-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                        Primary
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <input
                    type="hidden"
                    name="deleteImages"
                    value={imagesToDelete.join(',')}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Click × to mark images for deletion. Upload new images below to replace them.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark dark:text-white">
            {isEdit ? 'Upload New Images' : 'Product Images'}
            {!isEdit && <span className="ml-1 select-none text-red">*</span>}
          </label>

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            className="block w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm"
            required={!isEdit}
          />

          <p className="text-xs text-gray-500">
            {isEdit 
              ? 'Upload new images to replace existing ones. Leave empty to keep current images.'
              : 'First image will be used as primary image'
            }
          </p>
        </div>

        <InputGroup
          name="basePrice"
          type="number"
          label="Base Price"
          defaultValue={String(defaultValues?.basePrice || '')}
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
          required
        />

        <TextAreaGroup
          name="description"
          label="Description"
          defaultValue={defaultValues?.description}
          placeholder="Product description"
          required
        />

        <TextAreaGroup
          name="materials"
          label="Materials"
          defaultValue={defaultValues?.materials}
          placeholder="Materials used"
          required
        />

        <TextAreaGroup
          name="notes"
          label="Notes (Optional)"
          defaultValue={defaultValues?.notes}
          placeholder="Additional notes"
        />

        <div className="flex justify-end gap-3 pt-4">
          <CancelButton to="/admin/products" />
          <button 
            type="submit" 
            className="mt-6 flex justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            {isEdit ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  )
}
