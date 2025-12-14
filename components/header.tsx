"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Meow_Script } from "next/font/google"
import Image from "next/image"

const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
})

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Products", href: "/shops" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 animate-slide-in-down shadow-sm">
      <div className="max-w-full px-4 md:px-8 lg:px-16 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className={`${meowScript.className} text-4xl text-[#C5A48E] flex flex-row items-center gap-3`}>
            <Image alt="logo" src="/brands/logo.png" width={40} height={40} />
            SilkyTouch
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:bg-[#a18978] py-1 px-2 rounded-xl bg-[#C5A48E] transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="text-[#C5A48E] px-6 py-2 outline outline-[#C5A48E] hover:bg-[#a18978] hover:text-white transition-colors font-medium">
              Cart
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-[#C5A48E] outline text-white outline-[#C5A48E] hover:outline-[#a18978] hover:bg-[#a18978] transition-colors font-medium"
            >
              Login
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-white transition-all" />
            <div className="w-6 h-0.5 bg-white transition-all" />
            <div className="w-6 h-0.5 bg-white transition-all" />
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-6 pb-6 border-t border-gray-700 pt-6 space-y-4 animate-slide-in-down">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}

            <Link href="/cart" className="block text-black hover:text-gray-300 transition-colors font-medium">
              Cart
            </Link>

            <Link
              href="/login"
              className="block w-full text-center px-6 py-2 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
