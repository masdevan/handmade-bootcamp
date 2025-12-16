"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthLayout } from "@/app/login/components/AuthLayout"
import { LoginForm } from "@/app/login/components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"
import { ForgotPasswordForm } from "./components/ForgotPasswordForm"

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
        
        if (session?.user?.role === "ADMIN") {
          router.push("/admin")
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
            <RegisterForm onSubmit={() => {}} onLogin={() => setMode("login")} />
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
