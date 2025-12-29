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
      <h1 className="text-3xl font-bold mb-2 text-[#857164]">Forgot Password?</h1>
      <p className="text-[#857164] mb-10">
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

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-4 rounded-lg
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
        className="mt-8 w-full text-center text-sm font-bold text-[#857164] hover:text-[#b69d8c] transition"
      >
        Back to Login
      </button>
    </>
  )
}
