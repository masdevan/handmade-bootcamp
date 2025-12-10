import { NextResponse } from "next/server"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "all"

  let filteredProducts = MOCK_PRODUCTS

  if (category === "new") {
    filteredProducts = MOCK_PRODUCTS.filter((p) => p.is_new)
  } else if (category === "popular") {
    filteredProducts = MOCK_PRODUCTS.filter((p) => p.is_popular)
  }

  return NextResponse.json(filteredProducts)
}
