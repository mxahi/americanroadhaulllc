import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight, Plus } from "lucide-react"

/** Image that fills its (relatively positioned) parent. */
export function Pic({
  src,
  alt = "",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
}

export function Dot() {
  return (
    <span className="btn-dot">
      <ArrowUpRight size={17} />
    </span>
  )
}

/** Full-width section band with a centered container. */
export function Band({
  children,
  tone = "base",
  className = "",
}: {
  children: ReactNode
  tone?: "base" | "alt" | "dark"
  className?: string
}) {
  const bg = tone === "alt" ? "bg-surface-2" : tone === "dark" ? "bg-navy text-[#f3f3f1]" : "bg-bg"
  return (
    <section className={`${bg} py-16 md:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string
  title: string
  lead?: string
  center?: boolean
  index?: string
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{title}</h2>
      {lead && <p className="mt-4 text-pretty leading-relaxed text-muted">{lead}</p>}
    </div>
  )
}

export function PageHero({
  title,
  crumbs,
  image,
}: {
  title: string
  crumbs: { label: string; href?: string }[]
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Pic src={image} sizes="100vw" priority className="opacity-40" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050e24]/85 via-[#050e24]/60 to-[#050e24]/30" />
      <div className="container-x py-16 md:py-24">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-accent">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
      </div>
    </section>
  )
}

export function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-4 leading-[1.8] text-muted ${className}`}>
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

export function Faq({ items }: { items: { q: string; a: string[] }[] }) {
  return (
    <div className="grid gap-3">
      {items.map((f, i) => (
        <details key={i} className="card group px-5 py-4 md:px-6" open={i === 0}>
          <summary className="flex items-center justify-between gap-4">
            <span className="font-display text-base font-semibold md:text-lg">{f.q}</span>
            <span className="faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 transition-transform">
              <Plus size={16} />
            </span>
          </summary>
          <div className="mt-3 space-y-3 pr-10 leading-relaxed text-muted">
            {f.a.map((t, j) => (
              <p key={j}>{t}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}

export function CtaLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = "btn btn-primary"
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} <Dot />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children} <Dot />
    </Link>
  )
}
