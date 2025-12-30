type OrderStatus = "Paid" | "Progress" | "Delivery" | "Completed"

const steps = [
  { key: "Paid", label: "User Pay", desc: "Payment has been completed" },
  { key: "Progress", label: "Progress", desc: "Order is being processed" },
  { key: "Delivery", label: "On Delivery", desc: "Order is on the way" },
  { key: "Completed", label: "Completed", desc: "Order has been completed" },
]

export default function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = steps.findIndex(step => step.key === status)

  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const completed = index <= currentIndex
        const active = index === currentIndex

        return (
          <div key={step.key} className="flex gap-4">
            {/* DOT */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold
                  ${
                    completed
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-400"
                  }
                `}
              >
                {completed ? "✓" : index + 1}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`h-10 w-px ${
                    completed ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            {/* TEXT */}
            <div>
              <p
                className={`font-medium ${
                  active
                    ? "text-primary"
                    : completed
                    ? "text-dark dark:text-white"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
