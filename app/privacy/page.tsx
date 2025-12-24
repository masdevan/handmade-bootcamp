import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-24 text-[#4A3F35]">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-[#7A6E65] mb-6">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="font-bold text-xl mb-2">Information We Collect</h2>
            <p className="text-[#7A6E65]">
              We may collect personal information such as name, email address,
              and payment details when you use our services.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">How We Use Information</h2>
            <p className="text-[#7A6E65]">
              Information is used to process orders, improve our services,
              and communicate important updates.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Data Protection</h2>
            <p className="text-[#7A6E65]">
              We implement security measures to protect your data and never
              sell your information to third parties.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
