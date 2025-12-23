import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#FAF7F4]">
      <h1 className="text-6xl font-bold text-[#4A3F35] mb-4">404</h1>
      <p className="text-[#7A6E65] mb-8">
        Sorry, the page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-8 py-3 bg-[#C5A48E] text-white font-bold hover:bg-[#a18978]"
      >
        Back to Home
      </Link>
    </div>
  )
}
