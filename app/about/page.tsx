import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-[#FAF7F4]">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A3F35] mb-6">
            About Silky Touch
          </h1>
          <p className="text-lg text-[#7A6E65] max-w-2xl mx-auto">
            Crafted with passion. Designed to inspire everyday living.
          </p>
        </section>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#4A3F35] mb-6">
              Our Story
            </h2>
            <p className="text-[#7A6E65] leading-relaxed mb-4">
              Silky Touch was born from a passion for craftsmanship and timeless design.
              We believe every product tells a story — one shaped by creativity,
              care, and attention to detail.
            </p>
            <p className="text-[#7A6E65] leading-relaxed">
              From carefully selected materials to thoughtful finishing,
              each piece is curated to bring warmth and elegance into your space.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image
                src={`/images/about-image.webp`}
                alt={`About Us Image`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-[#4A3F35] mb-12">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Craftsmanship", desc: "Every piece is thoughtfully made." },
                { title: "Sustainability", desc: "Responsible materials & processes." },
                { title: "Quality First", desc: "Designed to last, not trend." },
                { title: "Art & Function", desc: "Beauty with purpose." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 border rounded-xl text-center hover:shadow-md transition"
                >
                  <h3 className="font-bold text-[#4A3F35] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A6E65]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-[#4A3F35] mb-6">
            Why Silky Touch
          </h2>
          <p className="text-[#7A6E65] max-w-3xl mx-auto mb-10">
            We curate products that blend elegance and functionality,
            ensuring every item feels personal, meaningful, and timeless.
          </p>

          <a
            href="/shop"
            className="inline-block px-10 py-4 bg-[#C5A48E] text-white font-bold hover:bg-[#a18978] transition"
          >
            Explore Our Collection
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
