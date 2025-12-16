import Image from "next/image"
import Link from "next/link"
import { Meow_Script } from "next/font/google"

const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
})
export function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className={`${meowScript.className} text-4xl text-[#C5A48E] flex flex-row items-center gap-2`}>
              <Image alt="logo" src="/brands/logo.png" width={40} height={40} />
              SilkyTouch
            </Link>
            <p className="text-[#857164]">Premium shopping experience with curated collections and exclusive deals.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-[#ba9a85]">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/shop" className="text-[#857164] transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/shop?new" className="text-[#857164] transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/shop?popular" className="text-[#857164] transition-colors">
                  Popular
                </a>
              </li>
              <li>
                <a href="/shop?sale" className="text-[#857164] transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-[#ba9a85]">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="text-[#857164] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#857164] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#857164] transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#857164] transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-[#ba9a85]">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/help" className="text-[#857164] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-[#857164] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-[#857164] transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[#857164] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-gray-500 text-sm">© 2025 SilkyTouch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
