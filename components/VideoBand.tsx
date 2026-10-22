"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Pic } from "./ui"

const ID = "ypNIts6CZLA"

/** Full-width video band: shows the old site's thumbnail and plays the YouTube video on click. */
export function VideoBand({ poster }: { poster: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="relative isolate min-h-[60vh] overflow-hidden bg-[#0a1a3a]">
      {playing ? (
        <iframe
          title="American Road Haul LLC video"
          src={`https://www.youtube.com/embed/${ID}?start=1450&playsinline=1&rel=0`}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Play video" className="group absolute inset-0 block h-full w-full">
          <Pic src={poster} sizes="100vw" className="transition duration-700 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/55" aria-hidden />
          <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_0_0_12px_rgba(255,255,255,0.25)] transition group-hover:scale-110">
            <Play size={38} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}
    </section>
  )
}
