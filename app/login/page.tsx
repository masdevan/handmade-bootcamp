"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "../../components/auth/RegisterForm"
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm"

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      if (result?.ok) {
        const session = await getSession()
        
        if (session?.user?.role === "ADMIN" || session?.user?.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/")
        }
        router.refresh()
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  const handleRegister = async (name: string, email: string, password: string, phone: string) => {
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.")
        setLoading(false)
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/")
        router.refresh()
      } else {
        setError("Registration successful! Please login.")
        setMode("login")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <AuthLayout>
          {mode === "login" && (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-full bg-red-100 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}
              <LoginForm
                onSubmit={handleLogin}
                onForgot={() => setMode("forgot")}
                onRegister={() => setMode("register")}
              />
            </>
          )}

          {mode === "register" && (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-full bg-red-100 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}
              <RegisterForm 
                onSubmit={handleRegister} 
                onLogin={() => {
                  setError("")
                  setMode("login")
                }} 
              />
            </>
          )}
          {mode === "forgot" && (
            <ForgotPasswordForm onSubmit={() => {}} onBack={() => setMode("login")} />
          )}
        </AuthLayout>
      </main>
      <Footer />
    </>
  )
}
