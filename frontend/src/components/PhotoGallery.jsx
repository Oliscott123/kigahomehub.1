import React, { useState } from 'react'

export default function PhotoGallery({ images = [] }) {
  const imgs = images.slice(0, 5)
  const [index, setIndex] = useState(0)

  if (!imgs.length) {
    return <div className="rounded-3xl bg-slate-100 p-16 text-center text-slate-500">No images available</div>
  }

  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden">
        <img src={imgs[index]} alt={`image-${index}`} className="h-96 w-full object-cover" />
        <button
          onClick={() => setIndex((i) => (i - 1 + imgs.length) % imgs.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % imgs.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex gap-3">
        {imgs.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-20 w-28 overflow-hidden rounded-lg ${i === index ? 'ring-2 ring-cyan-400' : ''}`}
          >
            <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
