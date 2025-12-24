"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#FAF7F4]">
      <h1 className="text-6xl font-bold text-[#4A3F35] mb-4">500</h1>
      <p className="text-[#7A6E65] mb-8">
        Something went wrong. Please try again.
      </p>

      <button
        onClick={reset}
        className="px-8 py-3 bg-[#C5A48E] text-white font-bold hover:bg-[#a18978]"
      >
        Try Again
      </button>
    </div>
  )
}
