"use client"

import { useEffect, useState } from "react"
import { Play, X } from "lucide-react"

const ID = "ypNIts6CZLA"

/** Hero play button: opens the company video in a popup. */
export function VideoButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-lg py-1 pr-2 font-semibold text-white"
        aria-label="Play video"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0a1a3a] shadow-[0_0_0_6px_rgba(255,255,255,0.2)] transition group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>
        Watch Video
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-label="Video" className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                title="American Road Haul LLC video"
                src={`https://www.youtube.com/embed/${ID}?start=1450&playsinline=1&rel=0`}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
