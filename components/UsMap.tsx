"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { statesWithLoads, usmap, type LoadsData } from "@/lib/map"

/** Clickable US map: each state opens the table of loads recorded for it. */
export function UsMap() {
  const [active, setActive] = useState<{ id: string; name: string } | null>(null)
  const [loads, setLoads] = useState<LoadsData | null>(null)

  // The 600+ load rows are only fetched when a state is first opened.
  const open = (s: { id: string; name: string }) => {
    setActive(s)
    if (!loads) import("@/lib/loads.json").then((m) => setLoads(m.default as LoadsData))
  }

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active])

  const rows = active && loads ? loads.byState[active.id] : undefined

  return (
    <>
      <svg viewBox={usmap.viewBox} className="usmap block h-auto w-full" role="group" aria-label="United States map">
        <g>
          {usmap.states.map((s) => (
            <path
              key={s.id}
              id={s.id}
              d={s.d}
              role="button"
              tabIndex={0}
              aria-label={s.name}
              className={`state ${statesWithLoads.has(s.id) ? "has-data" : ""}`}
              onClick={() => open(s)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  open(s)
                }
              }}
            />
          ))}
        </g>
        <g aria-hidden>
          {usmap.labels.map((l) => (
            <text key={l.t} x={l.x} y={l.y} className="state-label">
              {l.t}
            </text>
          ))}
        </g>
      </svg>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-10"
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <div className="relative w-full max-w-[1280px] rounded-2xl bg-surface p-6 text-ink shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6)] sm:p-9">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
            >
              <X size={20} />
            </button>
            <h3 className="text-center font-display text-2xl font-bold sm:text-3xl">{active.name}</h3>
            <div className="mt-6 overflow-x-auto">
              {!loads ? (
                <p className="py-8 text-center text-muted">…</p>
              ) : rows?.length ? (
                <table className="w-full min-w-[920px] border-collapse text-sm">
                  <thead>
                    <tr>
                      {loads!.columns.map((c) => (
                        <th key={c} className="whitespace-nowrap px-3.5 pb-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-muted">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className="border-t border-line even:bg-surface-2/60 hover:bg-surface-2">
                        {r.map((cell, j) => (
                          <td key={j} className={`whitespace-nowrap px-3.5 py-3 ${j === 0 ? "font-bold" : "text-muted"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="py-8 text-center italic text-muted">No loads recorded for {active.name} yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
