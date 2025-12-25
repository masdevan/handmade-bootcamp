"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/lib/cart-store"

export function CartLoader() {
  const { data: session } = useSession()
  const loadCart = useCartStore((state) => state.loadCart)

  useEffect(() => {
    if (session?.user?.id) {
      loadCart(Number(session.user.id))
    }
  }, [session?.user?.id, loadCart])

  return null
}

