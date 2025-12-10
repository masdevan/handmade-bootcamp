import { NextResponse } from "next/server"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
