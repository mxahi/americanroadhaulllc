import type { Metadata } from "next"
import { Check } from "lucide-react"
import { CarrierForm } from "@/components/forms"
import { Reveal } from "@/components/Reveal"
import { Band, PageHero, Pic } from "@/components/ui"
import { carriers as c, contact, img } from "@/lib/site"

export const metadata: Metadata = { title: c.title }

export default function CarriersPage() {
  return (
    <>
      <PageHero title={c.h1} crumbs={[{ label: "Home", href: "/" }, { label: c.h1 }]} image={img("2024/09/bernd-dittrich-bUnsDLFRNWc-unsplash.jpg")} />

      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Pic src={img("2024/10/pascal-meier-HfYk04kY0ZQ-unsplash.jpg")} sizes="100vw" className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/90 via-[#050e24]/75 to-[#050e24]/50" />
        </div>
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-4xl">
            <span className="eyebrow">{c.why.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">
              {c.why.title[0]} <span className="text-[#ff5a64]">{c.why.title[1]}</span> {c.why.title[2]}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.perks.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <article className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm">
                  <span className="font-display text-4xl font-semibold text-accent/80">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{p.t}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-white/70">{p.p}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0a1a3a] text-white">
        <div className="absolute inset-0 -z-10">
          <Pic src={img("2024/10/man-working-as-truck-driver.jpg")} sizes="100vw" className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/90 via-[#050e24]/75 to-[#050e24]/40" />
        </div>
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">{c.owner.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{c.owner.title}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.owner.items.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-5 py-4 font-medium">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Band tone="alt" className="scroll-mt-20">
        <div id="carrier-setup" className="scroll-mt-28 grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="grid gap-5">
            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold">{c.onboard.t}</h3>
              <p className="mt-3 text-sm text-muted">{c.onboard.p}</p>
              <a href="#carrier-setup-form" className="btn btn-primary mt-5">
                {c.onboard.cta}
              </a>
            </div>
            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold">{c.payment.t}</h3>
              <p className="mt-3 text-sm text-muted">{c.payment.emailLabel}</p>
              <a href={contact.emailHref} className="font-semibold hover:text-accent">
                {c.payment.email}
              </a>
              <p className="mt-3 text-sm text-muted">{c.payment.phoneLabel}</p>
              <a href={contact.phoneHref} className="font-semibold hover:text-accent">
                {c.payment.phone}
              </a>
              <p className="mt-3 text-sm text-muted">{c.payment.note}</p>
            </div>
          </div>
          <div id="carrier-setup-form" className="scroll-mt-28">
            <CarrierForm />
          </div>
        </div>
      </Band>
    </>
  )
}
