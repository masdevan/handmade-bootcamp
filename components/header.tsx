"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Meow_Script } from "next/font/google"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { UserAvatar } from "./user-avatar"
import { ShoppingCart, User } from "lucide-react"
import { SearchBar } from "./search-bar"

const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
})

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState("")

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`)
    } else {
      router.push("/shop")
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 animate-slide-in-down shadow-sm">
      <div className="max-w-7xl m-auto py-3">
        <div className="flex items-center md:justify-between justify-around">
          <Link href="/" className={`${meowScript.className} text-4xl text-[#C5A48E] flex flex-row items-center gap-3`}>
            <Image alt="logo" src="/brands/logo.png" width={40} height={40} />
            SilkyTouch
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Cari produk..."
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#C5A48E] hover:text-[#a18978] font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
          <Link
            href="/cart"
            className="flex items-center gap-2 px-6 py-2 font-medium text-[#C5A48E] outline outline-1 outline-[#C5A48E]
                      hover:bg-[#a18978] hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Link>

          {status === "loading" ? null : !session ? (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-2 font-medium text-white bg-[#C5A48E]
                        outline outline-1 outline-[#C5A48E] hover:bg-[#a18978] hover:outline-[#a18978]
                        transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          ) : (
            <UserAvatar user={session.user} />
          )}

          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-[#8e7768] transition-all" />
            <div className="w-6 h-0.5 bg-[#8e7768] transition-all" />
            <div className="w-6 h-0.5 bg-[#8e7768] transition-all" />
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-6 pb-6 border-t border-[#C5A48E] pt-6 space-y-4 animate-slide-in-down">
            <div className="px-6 mb-4">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Cari produk..."
              />
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[#C5A48E] hover:text-[#a18978] transition-colors font-medium ml-6"
              >
                {item.label}
              </Link>
            ))}

            <Link href="/cart" className="block text-[#C5A48E] hover:text-gray-300 transition-colors font-medium ml-6">
              Cart
            </Link>

            <Link
              href="/login"
              className="w-full text-center px-6 py-2 bg-[#C5A48E] text-white hover:bg-gray-100 transition-colors font-medium ml-6"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
