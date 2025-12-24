import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-[#4A3F35] mb-8">
          Contact Us
        </h1>

        <p className="text-[#7A6E65] mb-12">
          Have questions or need support? We'd love to hear from you.
        </p>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border px-4 py-3 rounded-lg"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <button
            type="submit"
            className="px-8 py-3 bg-[#C5A48E] text-white font-bold hover:bg-[#a18978]"
          >
            Send Message
          </button>
        </form>
      </main>

      <Footer />
    </>
  )
}
