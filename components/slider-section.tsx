"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SliderSection() {
  const images = [
    "/images/sliders/handmade.jpg",
    "/images/sliders/handmade-2.webp",
  ]

  const [current, setCurrent] = useState(0)

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [images.length])

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-4 px-4 md:px-8 lg:px-16 bg-white">
      <div className="relative max-w-7xl m-auto py-3">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {images.map((src, index) => (
              <div
                key={index}
                className="relative min-w-full h-[220px] sm:h-[320px] md:h-[420px]"
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <button
  onClick={prev}
  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/50 hover:bg-black rounded-full transition shadow-lg hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
</button>

{/* Next */}
<button
  onClick={next}
  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/50 hover:bg-black rounded-full transition shadow-lg hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
  </svg>
</button>


          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  current === i ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
