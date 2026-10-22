import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, Star } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { Reviews } from "@/components/Reviews"
import { UsMap } from "@/components/UsMap"
import { VideoButton } from "@/components/VideoButton"
import { WhyTabs } from "@/components/WhyTabs"
import { Band, CtaLink, Pic } from "@/components/ui"
import { home, img, services } from "@/lib/site"

const IMG = {
  hero: img("2024/09/GettyImages-200297202-002-1.jpg"),
  truck: img("2024/09/truck.png"),
  about: img("2024/09/GettyImages-1387784170.jpg"),
  why: img("2024/09/GettyImages-1329868766.jpg"),
  container: img("2024/09/Conatiner-2.png"),
  carriers: img("2024/09/GettyImages-646271897.jpg"),
  pattern: img("2024/09/Conatiner-4.png"),
  truckLine: img("2024/09/truck-il.svg"),
  shape: img("2024/10/shape.svg"),
  triangle: img("2024/09/shape-triangle.svg"),
  posters: [img("2026/06/ChatGPT-Image-Jun-25-2026-10_31_41-PM-1.png"), img("2026/06/ChatGPT-Image-Jun-25-2026-10_25_53-PM-1.png")],
}

const clientLogos = ["tecnologia", "Scuola_Logo_OnlyTop-1", "fiore", "konstruktion", "jolie-1", "caridad-1", "F7"]

export default function Home() {
  const h = home

  return (
    <>
      {/* ================= Hero (full width) ================= */}
      <section className="relative isolate z-10 overflow-hidden bg-[#0a1a3a] pb-10 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)] md:pb-14">
        <div className="absolute inset-0 -z-10">
          <Pic src={IMG.hero} sizes="100vw" priority className="object-[60%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/95 via-[#050e24]/75 to-[#050e24]/45" />
          <Image src={IMG.shape} alt="" width={647} height={702} unoptimized className="pointer-events-none absolute -right-20 top-1/2 hidden h-[130%] w-auto max-w-none -translate-y-1/2 opacity-[0.06] lg:block" />
        </div>
        <div className="container-x grid items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
          <div>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-[1.1] md:text-5xl">
              {h.heroLines[0]} <span className="text-[#ff5a64]">{h.heroLines[1]}</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/80">{h.lead}</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <CtaLink href="/contact-us">{h.heroCta}</CtaLink>
              <VideoButton />
            </div>
            <ul className="mt-10 grid max-w-xl gap-x-6 gap-y-3 text-sm font-medium text-white/85 sm:grid-cols-2">
              {["100% Licensed/ Bonded/Insured", "Local and international delivery", "Trusted & Secure", "Always on time"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] pb-12 lg:mx-0 lg:justify-self-end">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl border-2 border-accent/70" aria-hidden />
            <div className="relative aspect-square rotate-[2deg] overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <Pic src={IMG.posters[0]} sizes="(min-width: 1024px) 40vw, 90vw" priority />
            </div>
            <div className="absolute -bottom-0 left-0 right-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1a3a]/95 p-5 shadow-[var(--shadow)] backdrop-blur sm:left-[-28px] sm:right-auto sm:w-[360px]">
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
                {h.stats.map((s) => (
                  <div key={s.l}>
                    <dt className="font-display text-2xl font-semibold text-[#ff5a64] md:text-3xl">{s.n}</dt>
                    <dd className="mt-0.5 text-xs text-white/70">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section
        id="services"
        className="relative z-[5] -mt-14 scroll-mt-24 bg-surface-2 pb-20 pt-24 [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-48px))] md:pb-24 md:pt-28"
      >
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{h.services.eyebrow}</span>
            <h2 className="mt-4 max-w-4xl text-balance text-2xl font-semibold leading-[1.25] md:text-[34px]">{h.services.title}</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link href={`/${s.slug}`} className="card group block overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                  <div className="relative aspect-square overflow-hidden bg-[#0a1a3a]">
                    <Pic src={IMG.posters[i]} sizes="(min-width: 768px) 45vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <h3 className="font-display text-xl font-semibold group-hover:text-accent">{s.label}</h3>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <div className="relative isolate flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl bg-[#0a1a3a] p-7 text-white md:flex-row md:items-center md:p-9">
              <Image src={IMG.triangle} alt="" width={296} height={295} unoptimized className="pointer-events-none absolute -right-10 -top-16 -z-10 h-64 w-auto opacity-[0.07]" />
              <p className="max-w-3xl text-lg font-semibold leading-snug md:text-xl">{h.services.quote}</p>
              <CtaLink href="/contact-us">{h.services.quoteCta}</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= State map ================= */}
      <Band className="-mt-12 !pt-28 md:!pt-36">
        <div className="text-center">
          <span className="eyebrow">{h.mapEyebrow}</span>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <UsMap />
        </div>
      </Band>

      {/* ================= About ================= */}
      <Band tone="alt">
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-md pb-6 pr-6 lg:max-w-none">
              <div className="absolute bottom-0 right-0 h-[88%] w-[88%] rounded-2xl bg-accent" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
                <Pic src={IMG.about} sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">{h.about.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl text-balance text-2xl font-semibold leading-[1.3] tracking-tight md:text-[32px]">{h.about.title}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-accent" aria-hidden />
            <p className="mt-8 max-w-3xl border-l-4 border-accent pl-5 text-[18px] leading-[1.75] text-ink">{h.about.text}</p>
            <div className="mt-8">
              <CtaLink href="/about">{h.about.cta}</CtaLink>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ================= Why us (dark) ================= */}
      <section className="relative isolate overflow-hidden bg-navy text-[#f3f3f1]">
        <div className="absolute inset-0 -z-10">
          <Pic src={IMG.why} sizes="100vw" className="opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/90 via-[#050e24]/75 to-[#050e24]/55" />
        </div>
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">{h.why.eyebrow}</span>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight md:text-[40px]">{h.why.title}</h2>
            <div className="mt-8 max-w-3xl">
              <WhyTabs tabs={h.why.tabs} dark />
            </div>
          </Reveal>
          <Reveal className="self-center">
            <div className="relative overflow-hidden rounded-2xl bg-accent p-8 text-accent-ink md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/25 blur-3xl" aria-hidden />
              <h3 className="relative text-balance font-display text-2xl font-semibold leading-tight md:text-3xl">{h.why.ctaTitle}</h3>
              <Link href="/contact-us" className="btn relative mt-7 bg-[#0a1a3a] text-white hover:brightness-125">
                {h.why.cta} <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Easy set up ================= */}
      <Band tone="dark" className="relative isolate overflow-hidden">
        <Image src={IMG.pattern} alt="" width={805} height={1431} unoptimized className="pointer-events-none absolute -right-24 top-0 -z-10 hidden h-full w-auto max-w-none opacity-[0.07] lg:block" />
        <Image src={IMG.truckLine} alt="" width={1309} height={366} unoptimized className="pointer-events-none absolute -left-10 bottom-0 -z-10 hidden w-[720px] max-w-none opacity-60 md:block" />
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-[40px]">
              {h.setup.title[0]} <span className="text-[#ff5a64]">{h.setup.title[1]}</span>
            </h2>
            <Image src={IMG.container} alt="" width={805} height={585} className="mx-auto mt-8 h-auto w-full max-w-sm" />
          </Reveal>
          <ol className="grid gap-4">
            {h.setup.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <li className="flex items-start gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent font-display text-lg font-semibold text-accent-ink">{s.n}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{s.p}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Band>

      {/* ================= Carriers teaser ================= */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Pic src={IMG.carriers} sizes="100vw" className="opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/95 via-[#050e24]/80 to-[#050e24]/50" />
        </div>
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">{h.carriersTeaser.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{h.carriersTeaser.title}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {h.carriersTeaser.items.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-5 py-4 font-medium">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink href="/carriers">{h.carriersTeaser.cta}</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Reviews ================= */}
      <Band>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{h.reviews.eyebrow}</span>
            <div className="mt-5 flex items-center gap-5">
              <span className="font-display text-6xl font-semibold leading-none">{h.reviews.rating}</span>
              <div>
                <div className="flex gap-1 text-accent" aria-hidden>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-medium text-muted">
                  {h.reviews.ratingLabel} <span className="text-ink">{h.reviews.count}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Reviews items={h.reviews.items.map((r) => ({ name: r.name, text: r.text, role: r.role }))} />
        </div>
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-line pt-12" aria-label="Clients">
          {clientLogos.map((l) => (
            <li key={l}>
              <Image src={img(`2024/09/${l}.svg`)} alt="" width={150} height={24} unoptimized className="logo-svg h-6 w-auto max-w-[150px]" />
            </li>
          ))}
        </ul>
      </Band>
    </>
  )
}
