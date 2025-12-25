import { create } from "zustand"

interface CartItem {
  cartItemId?: number 
  id: string | number
  name: string
  price: number
  discount_percent?: number
  quantity: number
  description?: string
  image_url: string
  product?: {
    id: number
    name: string
    basePrice: number
    description: string
    images?: { url: string }[]
  }
}

interface CartStore {
  items: CartItem[]
  loading: boolean
  error: string | null
  loadCart: (userId: number) => Promise<void>
  addItem: (item: Omit<CartItem, "quantity" | "cartItemId"> & { quantity: number }, userId: number) => Promise<void>
  removeItem: (cartItemId: number) => Promise<void>
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  loadCart: async (userId: number) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/cart?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Failed to load cart")
      }
      const { data } = await response.json()
      
      const transformedItems: CartItem[] = data.map((item: any) => {
        const primaryImage = item.product?.images?.find((img: any) => img.isPrimary)
        const firstImage = item.product?.images?.[0]
        const imageUrl = primaryImage?.url || firstImage?.url || "/placeholder.svg"
        
        return {
          cartItemId: item.id,
          id: item.productId,
          name: item.product?.name || "",
          price: item.product?.basePrice || 0,
          quantity: item.quantity,
          description: item.product?.description || "",
          image_url: imageUrl,
          product: item.product,
        }
      })
      
      set({ items: transformedItems, loading: false })
    } catch (error) {
      console.error("Error loading cart:", error)
      set({ error: "Failed to load cart", loading: false })
    }
  },

  addItem: async (item, userId) => {
    set({ loading: true, error: null })
    try {
      const existingItem = get().items.find((i) => i.id === item.id)
      
      if (existingItem && existingItem.cartItemId) {
        await get().updateQuantity(existingItem.cartItemId, existingItem.quantity + item.quantity)
        return
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: Number(item.id),
          quantity: item.quantity,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add item to cart")
      }

      const { data } = await response.json()
      
      const productImage = data.product?.images?.find((img: any) => img.isPrimary) || data.product?.images?.[0]
      const imageUrl = productImage?.url || item.image_url || "/placeholder.svg"
      
      const newItem: CartItem = {
        cartItemId: data.id,
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: data.quantity,
        description: item.description,
        image_url: imageUrl,
        product: data.product,
      }

      set((state) => ({
        items: [...state.items, newItem],
        loading: false,
      }))
    } catch (error: any) {
      console.error("Error adding item to cart:", error)
      set({ error: error.message || "Failed to add item to cart", loading: false })
    }
  },

  removeItem: async (cartItemId: number) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/cart?id=${cartItemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from cart")
      }

      set((state) => ({
        items: state.items.filter((i) => i.cartItemId !== cartItemId),
        loading: false,
      }))
    } catch (error) {
      console.error("Error removing item from cart:", error)
      set({ error: "Failed to remove item from cart", loading: false })
    }
  },

  updateQuantity: async (cartItemId: number, quantity: number) => {
    if (quantity < 1) {
      await get().removeItem(cartItemId)
      return
    }

    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/cart?id=${cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update quantity")
      }

      set((state) => ({
        items: state.items.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity } : i
        ),
        loading: false,
      }))
    } catch (error) {
      console.error("Error updating quantity:", error)
      set({ error: "Failed to update quantity", loading: false })
    }
  },

  clearCart: () => {
    set({ items: [], error: null })
  },

  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => {
      const price = item.price
      return total + price * item.quantity
    }, 0)
  },
}))
