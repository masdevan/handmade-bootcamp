"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Products", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="border-b border-gray-200 bg-black sticky top-0 z-50 animate-slide-in-down">
      <div className="max-w-full px-4 md:px-8 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-white hover:text-gray-300 transition-colors">
            DeeGee
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="text-white hover:text-gray-300 transition-colors font-medium">
              Cart
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
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
            <Link href="/cart" className="block text-white hover:text-gray-300 transition-colors font-medium">
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
