import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-24 text-[#4A3F35]">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

        <p className="text-[#7A6E65] mb-6">
          By accessing or using our website, you agree to be bound by these terms.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="font-bold text-xl mb-2">Use of Website</h2>
            <p className="text-[#7A6E65]">
              You agree to use this website for lawful purposes only and not
              engage in activities that may harm the service.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Products & Pricing</h2>
            <p className="text-[#7A6E65]">
              Prices and availability are subject to change without notice.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Limitation of Liability</h2>
            <p className="text-[#7A6E65]">
              We are not liable for damages arising from the use of our website.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
