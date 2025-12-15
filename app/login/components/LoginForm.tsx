"use client"

import { useState } from "react"

export function LoginForm({
  onSubmit,
  onForgot,
  onRegister,
}: {
  onSubmit: (email: string, password: string) => void
  onForgot: () => void
  onRegister: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-10">Sign in to your account</p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(email, password)
        }}
      >
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-5 py-3
              rounded-full
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-5 py-3
              rounded-full
              border border-black/20
              bg-white text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              transition
            "
            required
          />
        </div>

        {/* Forgot */}
        <div className="text-right">
          <button
            type="button"
            onClick={onForgot}
            className="text-sm font-bold text-black hover:text-gray-700 transition"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-4
            rounded-full
            bg-[#C5A48E] text-white
            font-bold
            hover:bg-transparent hover:text-[#C5A48E] hover:border-[#C5A48E] hover:border
            transition-colors duration-200
          "
        >
          Sign In
        </button>
      </form>

      {/* Register */}
      <p className="text-center mt-8 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="font-bold text-black hover:text-gray-700 transition"
        >
          Register
        </button>
      </p>
    </>
  )
}
