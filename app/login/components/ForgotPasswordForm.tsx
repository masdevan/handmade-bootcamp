"use client"

import { useState } from "react"

export function ForgotPasswordForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (email: string) => void
  onBack: () => void
}) {
  const [email, setEmail] = useState("")

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
      <p className="text-gray-600 mb-10">
        Enter your email and we’ll send you a reset link
      </p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(email)
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

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-4 rounded-full
            bg-[#C5A48E] text-white font-bold
            hover:bg-transparent hover:text-[#C5A48E] hover:border-[#C5A48E] hover:border
            transition-colors duration-200
          "
        >
          Send Reset Link
        </button>
      </form>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mt-8 w-full text-center text-sm font-bold text-black hover:text-gray-700 transition"
      >
        Back to Login
      </button>
    </>
  )
}
