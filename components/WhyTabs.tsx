"use client"

import { useState } from "react"

/** The "Why us" tab list: 24\7 Support, Flexibility, Personal Guidance, Best rates. */
export function WhyTabs({ tabs, dark = false }: { tabs: { label: string; text: string }[]; dark?: boolean }) {
  const [i, setI] = useState(0)
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t, n) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              n === i
                ? "border-accent bg-accent text-accent-ink"
                : dark
                  ? "border-white/20 text-white/80 hover:border-white/50"
                  : "border-line text-ink hover:border-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* every panel stays in the page (inactive ones hidden) so the text is always in the HTML */}
      {tabs.map((t, n) => (
        <p key={t.label} role="tabpanel" hidden={n !== i} className={`mt-6 text-[17px] leading-[1.85] ${dark ? "text-white/75" : "text-muted"}`}>
          {t.text}
        </p>
      ))}
    </div>
  )
}
