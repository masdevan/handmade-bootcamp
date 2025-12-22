import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json()

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const res = await fetch(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    const text = await res.text()
    if (!text) {
      return NextResponse.json({ error: "Empty PayPal response" }, { status: 500 })
    }

    const data = JSON.parse(text)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
