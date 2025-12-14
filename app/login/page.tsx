"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthLayout } from "@/app/login/components/AuthLayout"
import { LoginForm } from "@/app/login/components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"
import { ForgotPasswordForm } from "./components/ForgotPasswordForm"

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login")
  const router = useRouter()

  const handleLogin = (email: string, password: string) => {
    if (email === "admin@deegee.com") {
      router.push("/admin/dashboard")
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <AuthLayout>
          {mode === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              onForgot={() => setMode("forgot")}
              onRegister={() => setMode("register")}
            />
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
