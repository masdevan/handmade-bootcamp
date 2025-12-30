import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      orderID,
      shippingAddress,
      shippingMethod,
    } = await req.json()

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 })
    }

    if (
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.state ||
      !shippingAddress?.zipCode
    ) {
      return NextResponse.json(
        { error: "Shipping address incomplete" },
        { status: 400 }
      )
    }

    /* ================= PAYPAL CAPTURE ================= */

    const accessToken = await getPayPalAccessToken()

    const paypalRes = await fetch(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    const paypalData = await paypalRes.json()

    if (paypalData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      )
    }

    /* ================= USER & CART ================= */

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    })

    if (!user || user.cartItems.length === 0) {
      return NextResponse.json({ error: "Cart empty" }, { status: 400 })
    }

    /* ================= TOTAL ================= */

    const subtotal = user.cartItems.reduce((sum, item) => {
      return sum + item.product.basePrice * item.quantity
    }, 0)

    const tax = subtotal * 0.1
    const total = subtotal + tax

    /* ================= CREATE ORDER ================= */

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: total,
        address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`,
        shippingMethod: shippingMethod || "Standard",
        shippingCost: 0,
        status: "Progress",
        paymentStatus: "Paid",
        createdAt: new Date(),
        updatedAt: new Date(),

        items: {
          create: user.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            variantColorId: item.variantColorId,
            variantSizeId: item.variantSizeId,
            customRequest: item.customRequest,
            priceEach: item.product.basePrice,
          })),
        },

        payments: {
          create: {
            method: "PAYPAL",
            total,
            paidAt: new Date(),
          },
        },
      },
    })

    /* ================= CLEAR CART ================= */

    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
