import { Suspense } from "react"
import ShopClient from "./shop-client"

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  )
}