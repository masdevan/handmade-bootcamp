import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Meow_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css" 


const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })
const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "SilkyTouch - Buy the best handmade local items",
  description: "Shop the latest products with the best price",
  icons: {
    icon: [
      {
        url: "/brands/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brands/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/brands/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${geist.className} antialiased bg-white`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}