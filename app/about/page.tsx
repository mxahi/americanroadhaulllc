import type { Metadata } from "next"
import { BadgeCheck, Route } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { WhyTabs } from "@/components/WhyTabs"
import { Band, CtaLink, PageHero, Pic } from "@/components/ui"
import { about, img } from "@/lib/site"

export const metadata: Metadata = { title: about.title }

const icons = [Route, BadgeCheck]

export default function AboutPage() {
  return (
    <>
      <PageHero title={about.h1} crumbs={[{ label: "Home", href: "/" }, { label: about.h1 }]} image={img("2024/10/GettyImages-BD0147-001-1.jpg")} />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {about.highlights.map((h, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={h.t} delay={i * 80}>
                <article className="card flex h-full items-start gap-5 p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{h.t}</h2>
                    <p className="mt-3 leading-[1.8] text-muted">{h.p}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Pic src={img("2024/10/two-people-working-warehouse.jpg")} sizes="100vw" className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/90 via-[#050e24]/75 to-[#050e24]/50" />
        </div>
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">{about.lead.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{about.lead.title}</h2>
            <p className="mt-6 border-l-2 border-accent pl-5 text-lg leading-[1.8] text-white/80">{about.lead.text}</p>
            <div className="mt-8">
              <CtaLink href="/contact-us">{about.lead.cta}</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Band tone="alt">
        <div className="max-w-3xl">
          <span className="eyebrow">{about.values.eyebrow}</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{about.values.title}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {about.values.items.map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <article className="card h-full p-7">
                <span className="font-display text-4xl font-semibold text-accent/70">{v.n}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{v.t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band>
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{about.why.eyebrow}</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{about.why.title}</h2>
          <div className="mt-8">
            <WhyTabs tabs={about.why.tabs} />
          </div>
          <div className="mt-8">
            <CtaLink href="/contact-us">{about.why.cta}</CtaLink>
          </div>
        </Reveal>
      </Band>
    </>
  )
}
