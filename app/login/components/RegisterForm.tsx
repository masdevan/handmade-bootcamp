"use client"

import { useState } from "react"

export function RegisterForm({
  onSubmit,
  onLogin,
}: {
  onSubmit: (email: string, password: string, confirmPassword: string) => void
  onLogin: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Create Account</h1>
      <p className="text-gray-600 mb-10">Join our community</p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(email, password, confirmPassword)
        }}
      >
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-5 py-3 rounded-full
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
          <label className="block text-sm font-bold text-black">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-5 py-3 rounded-full
              border border-black/20
              bg-white text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full px-5 py-3 rounded-full
              border border-black/20
              bg-white text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-4 rounded-full
            bg-black text-white font-bold
            hover:bg-gray-800
            transition-colors duration-200
          "
        >
          Create Account
        </button>
      </form>

      {/* Back to login */}
      <p className="text-center mt-8 text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="font-bold text-black hover:text-gray-700 transition"
        >
          Sign In
        </button>
      </p>
    </>
  )
}
