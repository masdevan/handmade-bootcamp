"use client"

import { useState } from "react"

export function RegisterForm({
  onSubmit,
  onLogin,
}: {
  onSubmit: (name: string, email: string, password: string, phone: string) => Promise<void>
  onLogin: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-[#857164]">Create Account</h1>
      <p className="text-[#857164] mb-10">Join our community</p>

      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault()
          if (password !== confirmPassword) {
            return
          }
          setLoading(true)
          try {
            await onSubmit(name, email, password, phone)
          } finally {
            setLoading(false)
          }
        }}
      >
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#857164]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-5 py-3 rounded-lg
              border border-black/20
              bg-white text-[#857164]
              placeholder:text-[#b69d8c]
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#857164]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-5 py-3 rounded-lg
              border border-black/20
              bg-white text-[#857164]
              placeholder:text-[#b69d8c]
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#857164]">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="081234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
              w-full px-5 py-3 rounded-lg
              border border-black/20
              bg-white text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#857164]">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-5 py-3 rounded-lg
              border border-black/20
              bg-white text-[#857164]
              placeholder:text-[#b69d8c]
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#857164]">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full px-5 py-3 rounded-lg
              border border-black/20
              bg-white text-[#857164]
              placeholder:text-[#b69d8c]
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-4 rounded-lg
            bg-[#C5A48E] text-white font-bold
            hover:bg-transparent hover:text-[#C5A48E] hover:border-[#C5A48E] hover:border
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Back to login */}
      <p className="text-center mt-8 text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="font-bold cursor-pointer text-[#857164] hover:text-[#b69d8c] transition"
        >
          Sign In
        </button>
      </p>
    </>
  )
}
