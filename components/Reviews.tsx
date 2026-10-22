"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export type Review = { name: string; text: string; role?: string; avatar?: string }

/** Review slider: 3 cards per view on desktop, 2 on tablet, 1 on phones. */
export function Reviews({ items }: { items: Review[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector("figure")
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Previous reviews"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line transition enabled:hover:bg-accent enabled:hover:text-accent-ink disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next reviews"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line transition enabled:hover:bg-accent enabled:hover:text-accent-ink disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={track}
        className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((r) => (
          <figure
            key={r.name + r.text.slice(0, 12)}
            className="card flex w-full shrink-0 snap-start flex-col p-7 sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
          >
            <Quote size={28} className="text-accent" aria-hidden />
            <blockquote className="mt-4 flex-1 leading-[1.75] text-muted">{r.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              {r.avatar ? (
                <Image src={r.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-display font-semibold text-accent-ink">
                  {r.name[0]}
                </span>
              )}
              <span className="leading-tight">
                <span className="block font-display font-semibold">{r.name}</span>
                {r.role && <span className="mt-0.5 block text-sm text-muted">{r.role}</span>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
