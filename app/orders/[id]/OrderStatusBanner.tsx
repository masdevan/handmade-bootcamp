"use client"

import Link from "next/link"

type OrderStatusBannerProps = {
  status: "Progress" | "Delivery" | "Completed"
  shippingMethod?: string
}

export function OrderStatusBanner({
  status,
  shippingMethod,
}: OrderStatusBannerProps) {
  if (status === "Progress") {
    return (
      <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
        <p className="font-semibold text-yellow-800 mb-1">
          ⏳ Order in Progress
        </p>
        <p className="text-sm text-yellow-700">
          Your order is currently being processed.
          If you would like to check the latest progress, please contact us via WhatsApp.
        </p>

        <WhatsAppButton status="Progress" />
      </div>
    )
  }

  if (status === "Delivery") {
    return (
      <div className="mb-6 rounded-xl border border-blue-300 bg-blue-50 p-4">
        <p className="font-semibold text-blue-800 mb-1">
          🚚 Order on Delivery
        </p>
        <p className="text-sm text-blue-700">
          Your order is currently being delivered using{" "}
          <span className="font-medium">
            {shippingMethod || "our shipping service"}
          </span>.
        </p>

        <WhatsAppButton status="Delivery" />
      </div>
    )
  }

  if (status === "Completed") {
    return (
      <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4">
        <p className="font-semibold text-green-800 mb-1">
          ✅ Order Completed
        </p>
        <p className="text-sm text-green-700">
          Thank you for using our platform.
        </p>
        <p className="text-sm text-green-700 mt-1">
          If you have any feedback or complaints, feel free to contact us via WhatsApp.
        </p>

        <WhatsAppButton status="Completed" />
      </div>
    )
  }

  return null
}

type WhatsAppButtonProps = {
  status: "Progress" | "Delivery" | "Completed"
}

function WhatsAppButton({ status }: WhatsAppButtonProps) {
  const statusStyles: Record<
    WhatsAppButtonProps["status"],
    { bg: string; hover: string }
  > = {
    Progress: {
      bg: "bg-yellow-600",
      hover: "hover:bg-yellow-700",
    },
    Delivery: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    Completed: {
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
    },
  }

  const styles = statusStyles[status]

  return (
    <a
      href="https://wa.me/+6285728133473"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block mt-3 text-sm font-medium text-white px-4 py-2 rounded-lg transition ${styles.bg} ${styles.hover}`}
    >
      Contact via WhatsApp
    </a>
  )
}
