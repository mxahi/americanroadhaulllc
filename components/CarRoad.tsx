"use client"

import { useEffect, useId, useRef, useState } from "react"

type Layout = {
  w: number
  docH: number
  d: string
  roadW: number
  turns: number[]
  y0: number
  yE: number
  loopR: number
}

const RADIUS = 44 // roundness of the turns

/**
 * Desktop-only watermark: a thin outlined road runs down the page along the empty margins and turns
 * (with rounded corners) across the gaps between sections - never over text. It starts and ends in a
 * round turn-around loop. A small truck drives along it as the page scrolls and always stays on screen:
 * down toward the footer, and back up to its parking spot when scrolling up.
 */
export function CarRoad() {
  const uid = useId().replace(/:/g, "")
  const car = useRef<HTMLDivElement>(null)
  const guide = useRef<SVGPathElement>(null)
  const [layout, setLayout] = useState<Layout | null>(null)

  // Measure the page and build the road from the real section positions.
  useEffect(() => {
    const measure = () => {
      const w = document.documentElement.clientWidth
      const vh = window.innerHeight
      const content = Math.min(w, 1480)
      const gutter = (w - content) / 2 + (w >= 1536 ? 64 : 48)
      const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
      if (!desktop || w < 1280 || gutter < 40) return setLayout(null)

      const docH = Math.ceil(document.body.getBoundingClientRect().height)
      const roadW = Math.max(22, Math.min(36, gutter * 0.3))
      const xR = w - gutter / 2
      const xL = gutter / 2
      const roomR = (gutter / 2 - roadW / 2 - 10) / 2
      const loopR = roomR >= 26 ? Math.min(54, roomR) : 0
      const tops = Array.from(document.querySelectorAll<HTMLElement>("main > section")).map(
        (s) => s.getBoundingClientRect().top + window.scrollY,
      )
      const footer = document.querySelector("footer")
      const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : docH - 400
      // Turn across the whitespace gap between every second pair of sections. The count is kept odd so the
      // road is on the left when it reaches the footer, crosses along the top of the footer, and ends on the right.
      const gaps = tops.filter((_, i) => i >= 1 && i % 2 === 1 && tops[i] < footerTop - 200)
      if (gaps.length % 2 === 0) gaps.pop()
      const crossings = [...gaps, footerTop]
      const y0 = Math.max(0.5 * vh, 300)
      const r = RADIUS
      const yE = Math.max(y0 + 400, footerTop + r + loopR + 36)

      let x = xR
      let d = `M ${xR} ${y0}`
      if (loopR) d += ` A ${loopR} ${loopR} 0 0 1 ${xR - 2 * loopR} ${y0} A ${loopR} ${loopR} 0 0 1 ${xR} ${y0}`
      const used: number[] = []
      for (const yh of crossings) {
        if (yh - r < y0 + loopR + 60) continue
        const toLeft = x === xR
        const x2 = toLeft ? xL : xR
        d += ` L ${x} ${yh - r}`
        // down -> sideways (rounded), straight across the gap, sideways -> down (rounded)
        d += ` A ${r} ${r} 0 0 ${toLeft ? 1 : 0} ${toLeft ? x - r : x + r} ${yh}`
        d += ` L ${toLeft ? x2 + r : x2 - r} ${yh}`
        d += ` A ${r} ${r} 0 0 ${toLeft ? 0 : 1} ${x2} ${yh + r}`
        x = x2
        used.push(yh)
      }
      d += ` L ${x} ${yE}`
      if (loopR) {
        const side = x === xR ? -1 : 1 // loop toward the page centre
        const sweep = x === xR ? 1 : 0
        d += ` A ${loopR} ${loopR} 0 0 ${sweep} ${x + side * 2 * loopR} ${yE} A ${loopR} ${loopR} 0 0 ${sweep} ${x} ${yE}`
      }
      setLayout({ w, docH, d, roadW, turns: used, y0, yE, loopR })
    }

    measure()
    const t = window.setTimeout(measure, 1200) // after images / fonts settle
    window.addEventListener("resize", measure)
    window.addEventListener("load", measure)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", measure)
      window.removeEventListener("load", measure)
      ro.disconnect()
    }
  }, [])

  // Drive the car with the scroll position.
  useEffect(() => {
    const el = car.current
    const path = guide.current
    if (!layout || !el || !path) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none"
      return
    }

    const STEP = 4
    const L = path.getTotalLength()
    const xs: number[] = []
    const ys: number[] = []
    for (let s = 0; s <= L; s += STEP) {
      const p = path.getPointAtLength(s)
      xs.push(p.x)
      ys.push(p.y)
    }
    const n = xs.length
    const loopLen = layout.loopR ? 2 * Math.PI * layout.loopR : 0
    const iLoopStart = layout.loopR ? Math.min(n - 3, Math.ceil(loopLen / STEP)) : 0 // first lane sample
    const iLoopEnd = layout.loopR ? Math.max(iLoopStart + 2, Math.floor((L - loopLen) / STEP)) : n - 1 // last lane sample
    const vh = () => window.innerHeight
    const A = () => vh() * 0.2 // scroll window in which the car sweeps across a turn
    const S = () => (layout.loopR ? vh() * 0.2 : 0) // scroll spent circling each end loop

    const firstAtOrAfter = (from: number, y: number) => {
      let lo = from
      let hi = iLoopEnd
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (ys[mid] < y) lo = mid + 1
        else hi = mid
      }
      return lo
    }

    // On straight lanes the car sits exactly at `Yc`; across a turn it sweeps sideways while `Yc` moves
    // through that turn's window, so it is never far from where the page is being viewed.
    const laneIndex = (Yc: number) => {
      const a = A()
      let from = iLoopStart
      for (const yh of layout.turns) {
        const iTop = firstAtOrAfter(from, yh - a)
        if (Yc <= ys[iTop]) return firstAtOrAfter(from, Yc)
        const iBot = firstAtOrAfter(iTop, yh + a)
        if (Yc <= ys[iBot]) {
          const t = (Yc - ys[iTop]) / Math.max(1, ys[iBot] - ys[iTop])
          let total = 0
          const cum: number[] = [0]
          for (let i = iTop + 1; i <= iBot; i++) {
            total += Math.abs(ys[i] - ys[i - 1]) + Math.abs(xs[i] - xs[i - 1]) * 0.2
            cum.push(total)
          }
          const want = t * total
          let k = 0
          while (k < cum.length - 1 && cum[k] < want) k++
          return iTop + k
        }
        from = iBot
      }
      return firstAtOrAfter(from, Yc)
    }

    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - vh())
    let target = window.scrollY
    let current = target
    let lastTarget = target
    let heading = 0
    let facing = 0
    let raf = 0
    let timer = 0

    const draw = () => {
      const max = maxScroll()
      const s = S()
      let i: number
      if (layout.loopR && current < s) {
        i = Math.round((current / s) * iLoopStart) // circling the start loop
      } else if (layout.loopR && current > max - s) {
        i = iLoopEnd + Math.round(((current - (max - s)) / s) * (n - 1 - iLoopEnd)) // circling the end loop
      } else {
        const q = Math.min(1, Math.max(0, (current - s) / Math.max(1, max - 2 * s)))
        i = laneIndex(layout.y0 + q * (layout.yE - layout.y0))
      }
      i = Math.min(n - 2, Math.max(1, i))
      const tangent = (Math.atan2(ys[i + 1] - ys[i - 1], xs[i + 1] - xs[i - 1]) * 180) / Math.PI
      if (target > lastTarget + 0.5) facing = 0
      else if (target < lastTarget - 0.5) facing = 180
      const want = tangent - 90 + facing // the car sprite points down at 0deg
      let diff = ((want - heading + 540) % 360) - 180
      if (Math.abs(diff) < 0.05) diff = 0
      heading += diff * 0.2
      el.style.transform = `translate(${xs[i] - 15}px, ${ys[i] - 46}px) rotate(${heading}deg)`
    }
    const step = () => {
      const delta = target - current
      current += delta * 0.16
      draw()
      lastTarget = target
      if (Math.abs(delta) > 0.5) schedule()
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      raf = requestAnimationFrame(step)
      timer = window.setTimeout(step, 50)
    }
    const onScroll = () => {
      target = window.scrollY
      schedule()
    }
    heading = (Math.atan2(ys[4] - ys[0], xs[4] - xs[0]) * 180) / Math.PI - 90
    draw()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [layout])

  if (!layout) return null
  const { w, docH, d, roadW } = layout

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-[45] hidden w-full overflow-hidden xl:block"
      style={{ height: docH }}
      aria-hidden
    >
      <svg width={w} height={docH} className="absolute left-0 top-0">
        <defs>
          {/* cut the middle out of the road so only its two edges remain (no fill) */}
          <mask id={`edge-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={docH}>
            <rect width={w} height={docH} fill="#fff" />
            <path d={d} fill="none" stroke="#000" strokeWidth={roadW - 2.4} strokeLinecap="butt" strokeLinejoin="round" />
          </mask>
        </defs>
        <path ref={guide} d={d} fill="none" stroke="none" />
        <path
          d={d}
          fill="none"
          stroke="#8a8a8a"
          strokeOpacity="0.6"
          strokeWidth={roadW}
          strokeLinecap="butt"
          strokeLinejoin="round"
          mask={`url(#edge-${uid})`}
        />
        <path d={d} fill="none" stroke="#8a8a8a" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="9 11" />
      </svg>
      <div ref={car} className="absolute left-0 top-0 will-change-transform" style={{ width: 30, height: 92 }}>
        {/* top-down tractor-trailer, cab (nose) pointing down */}
        <svg viewBox="0 0 36 110" width="30" height="92">
          <defs>
            <linearGradient id={`trailer-${uid}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#aeb5c0" />
              <stop offset="0.4" stopColor="#f1f3f6" />
              <stop offset="1" stopColor="#9aa2ae" />
            </linearGradient>
            <linearGradient id={`cab-${uid}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#16263f" />
              <stop offset="0.4" stopColor="#2f4a78" />
              <stop offset="1" stopColor="#14223a" />
            </linearGradient>
            <filter id={`blur-${uid}`} x="-30%" y="-10%" width="160%" height="120%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>
          {/* ground shadow */}
          <ellipse cx="19" cy="56" rx="16" ry="52" fill="#000" opacity="0.26" filter={`url(#blur-${uid})`} />
          {/* trailer tyres and cab tyres */}
          <rect x="1" y="48" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="1" y="59" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="30.5" y="48" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="30.5" y="59" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="2" y="76" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="29.5" y="76" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="2" y="96" width="4.5" height="9" rx="1.6" fill="#111" />
          <rect x="29.5" y="96" width="4.5" height="9" rx="1.6" fill="#111" />
          {/* trailer */}
          <rect x="4" y="1.5" width="28" height="68" rx="3" fill={`url(#trailer-${uid})`} stroke="#7b838f" strokeWidth="0.8" />
          <path d="M8 6 V66 M13 6 V66 M18 6 V66 M23 6 V66 M28 6 V66" stroke="#7b838f" strokeOpacity="0.35" strokeWidth="0.6" />
          <rect x="4" y="1.5" width="28" height="3.2" rx="1.2" fill="#c0392b" />
          {/* fifth wheel / coupling */}
          <rect x="14" y="69" width="8" height="8" rx="1.5" fill="#2a2f36" />
          {/* cab */}
          <path
            d="M18 72 C26.5 72 30 74 30 80 L30 100 C30 106 25.500 109 18 109 C10.500 109 6 106 6 100 L6 80 C6 74 9.500 72 18 72 Z"
            fill={`url(#cab-${uid})`}
            stroke="#0f1a2c"
            strokeWidth="0.8"
          />
          {/* sleeper roof and roof fairing */}
          <rect x="9.500" y="74" width="17" height="13" rx="3" fill="#dfe4ea" stroke="#7b838f" strokeWidth="0.6" />
          {/* windscreen and bonnet */}
          <path d="M9.500 91 L26.500 91 L25 99 C21.500 100.500 14.500 100.500 11 99 Z" fill="#0f151d" />
          <path d="M12 94 L18 94" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
          <rect x="1" y="91" width="4" height="4" rx="1" fill="#59606b" />
          <rect x="31" y="91" width="4" height="4" rx="1" fill="#59606b" />
          {/* headlights and tail lights */}
          <rect x="8" y="105" width="6" height="2.600" rx="1.200" fill="#fff6d1" />
          <rect x="22" y="105" width="6" height="2.600" rx="1.200" fill="#fff6d1" />
          <rect x="6" y="66" width="5" height="2" rx="1" fill="#c0392b" />
          <rect x="25" y="66" width="5" height="2" rx="1" fill="#c0392b" />
        </svg>
      </div>
    </div>
  )
}
