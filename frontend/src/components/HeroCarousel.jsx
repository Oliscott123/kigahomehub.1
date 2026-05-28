import React, { useEffect, useRef, useState } from 'react'

export default function HeroCarousel({ images = [], interval = 4000 }) {
  const [index, setIndex] = useState(0)
  const len = images.length
  const timerRef = useRef(null)

  useEffect(() => {
    if (len <= 1) return
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len, index])

  function start() {
    stop()
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, interval)
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  if (len === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-[1rem]" role="region" aria-label="Homepage image carousel">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ width: `${len * 100}%`, transform: `translateX(-${(index * 100) / len}%)` }}
        onMouseEnter={stop}
        onMouseLeave={start}
        aria-live="polite"
      >
        {images.map((img, i) => (
          <div key={i} className="flex-none w-full">
            <img
              src={img.src}
              alt={img.alt || `slide-${i}`}
              loading="lazy"
              className="h-72 w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <button
          onClick={() => setIndex((i) => (i - 1 + len) % len)}
          className="rounded-full bg-white/80 p-2 text-slate-800 shadow"
          aria-label="Previous"
        >
          ‹
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <button
          onClick={() => setIndex((i) => (i + 1) % len)}
          className="rounded-full bg-white/80 p-2 text-slate-800 shadow"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
