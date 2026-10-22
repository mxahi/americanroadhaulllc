"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { Search, X } from "lucide-react"
import type { SearchEntry } from "@/lib/search-index"

function Overlay({ onClose, children, top = false }: { onClose: () => void; children: ReactNode; top?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])
  return (
    <div
      className={`fixed inset-0 z-[90] flex justify-center bg-black/65 p-4 backdrop-blur-sm ${top ? "items-start pt-24" : "items-center"}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  )
}

/** Header search: matches page and article titles / text as you type. */
export function SearchPopup({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("")
  const [index, setIndex] = useState<SearchEntry[]>([])
  useEffect(() => {
    import("@/lib/search-index").then((m) => setIndex(m.searchIndex))
  }, [])
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current?.focus(), [])
  const needle = q.trim().toLowerCase()
  const hits = needle ? index.filter((r) => `${r.title} ${r.text}`.toLowerCase().includes(needle)).slice(0, 8) : []

  return (
    <Overlay onClose={onClose} top>
      <div role="dialog" aria-modal="true" aria-label="Search" className="w-full max-w-2xl rounded-2xl bg-surface p-5 text-ink shadow-2xl">
        <div className="flex items-center gap-3">
          <form className="relative flex-1" onSubmit={(e) => e.preventDefault()} role="search">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search here …" aria-label="Search" className="field !pl-11" />
          </form>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-lg border border-line hover:bg-surface-2">
            <X size={18} />
          </button>
        </div>
        {hits.length > 0 && (
          <ul className="mt-4 divide-y divide-line">
            {hits.map((h) => (
              <li key={h.href}>
                <Link href={h.href} onClick={onClose} className="block py-3 font-medium hover:text-accent">
                  {h.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Overlay>
  )
}
