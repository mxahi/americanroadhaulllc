import Image from "next/image"
import { Gauge, Layers, Network, Truck } from "lucide-react"
import { InquiryForm } from "./forms"
import { Reveal } from "./Reveal"
import { Band, CtaLink, PageHero, Pic } from "./ui"
import { img, type ServiceContent } from "@/lib/site"

const icons = [Network, Layers, Gauge]

/** Shared layout of the Dispatch for PO and MC Leasing / Authority Solutions pages. */
export function ServicePage({ s, photo }: { s: ServiceContent; photo: string }) {
  return (
    <>
      <PageHero
        title={s.label}
        crumbs={[{ label: "Home", href: "/" }, { label: s.eyebrow, href: "/#services" }, { label: s.label }]}
        image={img("2024/10/container-operation-port-series.jpg")}
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[40px]">{s.h2}</h2>
            <div className="mt-8 grid gap-4">
              {s.highlights.map((h, i) => {
                const Icon = icons[i]
                return (
                  <article key={h.t} className="card flex items-start gap-5 p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{h.t}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{h.p}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto max-w-md pb-6 pr-6 lg:max-w-none">
              <div className="absolute bottom-0 right-0 h-[88%] w-[88%] rounded-2xl bg-accent" aria-hidden />
              <div className="relative aspect-[15/16] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
                <Pic src={photo} sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Band tone="alt">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">{s.modes.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-tight md:text-4xl">{s.modes.title}</h2>
            <p className="mt-6 max-w-3xl border-l-4 border-accent pl-5 text-[17px] leading-[1.8] text-muted">{s.modes.text}</p>
            <div className="mt-8">
              <CtaLink href="/contact-us">{s.modes.cta}</CtaLink>
            </div>
          </Reveal>
          <Reveal>
            <InquiryForm inquiry={s.inquiry} service={s.label} />
          </Reveal>
        </div>
      </Band>

      <Band>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight md:text-4xl">{s.wheels.title}</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.wheels.items.map((w, i) => (
            <Reveal key={w.t} delay={(i % 3) * 70}>
              <article className="card relative h-full overflow-hidden p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                  <Truck size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{w.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Pic src={img("2024/10/container-operation-port-series.jpg")} sizes="100vw" className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e24]/90 via-[#050e24]/70 to-[#050e24]/40" />
          <Image
            src={img("2024/10/truck-il.svg")}
            alt=""
            width={1309}
            height={366}
            unoptimized
            className="absolute -bottom-6 right-0 hidden w-[760px] max-w-none opacity-80 md:block"
          />
        </div>
        <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{s.quote.title}</h2>
            <p className="mt-4 text-lg text-white/75">{s.quote.text}</p>
          </div>
          <CtaLink href="/contact-us">{s.quote.cta}</CtaLink>
        </div>
      </section>
    </>
  )
}
