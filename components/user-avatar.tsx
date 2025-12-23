import Link from "next/link"
import { signOut } from "next-auth/react"

interface User {
  name?: string | null
  email?: string | null
  role?: string
}

export function UserAvatar({ user }: { user: User }) {
  const firstName = user.name?.split(" ")[0] ?? "U"
  const initial = firstName.charAt(0).toUpperCase()

  return (
    <div className="relative group">
      <button
        className="
          w-10 h-10
          rounded-full
          bg-[#C5A48E]
          text-white
          font-bold
          flex items-center justify-center
          hover:bg-[#a18978]
        "
        title={firstName}
      >
        {initial}
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md opacity-0 group-hover:opacity-100 transition">
        {/* <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
          Profile
        </Link> */}

        {/* <Link href="/orders" className="block text-[#C5A48E] px-4 py-2 hover:bg-gray-100">
          Orders
        </Link> */}

        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-[#C5A48E] hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
