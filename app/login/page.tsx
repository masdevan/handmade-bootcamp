"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Logging in with:", { email, password })
    // Navigate to admin dashboard after login
    if (email === "admin@deegee.com") {
      router.push("/admin")
    }
  }

  const handleAdminLogin = () => {
    setEmail("admin@deegee.com")
    setPassword("password")
    // Simulate immediate navigation
    setTimeout(() => {
      router.push("/admin")
    }, 100)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl animate-scale-in">
          {!isForgotPassword ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black/10">
              {/* Left side - Info & Features */}
              <div className="hidden lg:flex flex-col justify-center bg-gray-50 p-12 border-r border-black/10">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-black mb-3">Welcome to DeeGee</h2>
                  <p className="text-gray-600 text-lg">
                    Your premium shopping destination for tech and lifestyle products
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-black mb-1">Exclusive Deals</p>
                      <p className="text-gray-600">Access our latest discounts and promotions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-black mb-1">Secure Checkout</p>
                      <p className="text-gray-600">Fast and secure payment processing</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-black mb-1">Order Tracking</p>
                      <p className="text-gray-600">Track your orders in real-time</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-black mb-1">24/7 Support</p>
                      <p className="text-gray-600">Customer support whenever you need it</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="p-12 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
                <p className="text-gray-600 mb-10">{isLogin ? "Sign in to your account" : "Join our community"}</p>

                <form className="space-y-6" onSubmit={handleLogin}>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold mb-3">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-bold mb-3">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
                    />
                  </div>

                  {/* Confirm Password (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-bold mb-3">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
                      />
                    </div>
                  )}

                  {/* Remember Me / Forgot Password */}
                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                        <input type="checkbox" className="w-4 h-4 accent-black" />
                        <span className="font-medium">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-black font-bold hover:text-gray-700 transition"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors duration-200"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </button>
                </form>

                {/* Admin Quick Login */}
                {isLogin && (
                  <button
                    onClick={handleAdminLogin}
                    className="w-full mt-4 py-4 bg-gray-100 text-black font-bold hover:bg-gray-200 transition-colors duration-200 border border-black/20"
                  >
                    Admin Dashboard Login
                  </button>
                )}

                {/* Toggle */}
                <p className="text-center mt-8 text-gray-600 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-bold text-black hover:text-gray-700 transition"
                  >
                    {isLogin ? "Register" : "Sign In"}
                  </button>
                </p>

                {/* Social Login */}
                <div className="mt-8 space-y-3">
                  <p className="text-center text-gray-600 text-sm font-medium">Or continue with</p>
                  <button
                    type="button"
                    className="w-full py-3 border border-black/20 font-bold hover:bg-gray-50 transition-colors"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 border border-black/20 font-bold hover:bg-gray-50 transition-colors"
                  >
                    Apple
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black/10">
              {/* Left side - Info */}
              <div className="hidden lg:flex flex-col justify-center bg-gray-50 p-12 border-r border-black/10">
                <h2 className="text-4xl font-bold text-black mb-3">Reset Your Password</h2>
                <p className="text-gray-600 text-lg">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Right side - Form */}
              <div className="p-12 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                <p className="text-gray-600 mb-10">We'll help you get back into your account</p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold mb-3">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors duration-200"
                  >
                    Send Reset Link
                  </button>
                </form>

                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="mt-8 text-center w-full text-black font-bold hover:text-gray-700 transition text-sm"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
