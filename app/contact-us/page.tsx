import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/forms"
import { Dot, PageHero } from "@/components/ui"
import { contact, contactPage as c } from "@/lib/site"

export const metadata: Metadata = { title: c.title }

export default function ContactPage() {
  return (
    <>
      <PageHero title={c.h1} crumbs={[{ label: "Home", href: "/" }, { label: c.h1 }]} />
      <section className="container-x py-16 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">{c.getInTouch}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{c.company}</h2>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">{c.officeLabel}</p>

            <ul className="mt-4 grid gap-3">
              <li className="card flex items-start gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
                  <MapPin size={22} />
                </span>
                <address className="self-center font-display text-lg font-semibold not-italic leading-snug">
                  {c.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </li>
              <li>
                <a href={contact.phoneHref} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                    <Phone size={22} />
                  </span>
                  <span className="font-display text-lg font-semibold group-hover:text-accent">{c.phone}</span>
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                    <Mail size={22} />
                  </span>
                  <span className="font-display text-lg font-semibold group-hover:text-accent">{c.email}</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="card p-6">
                <h3 className="font-display text-lg font-semibold">{c.onboard.t}</h3>
                <p className="mt-3 text-sm text-muted">{c.onboard.p}</p>
                <Link href="/carriers#carrier-setup" className="btn btn-primary mt-5">
                  {c.onboard.cta} <Dot />
                </Link>
              </div>
              <div className="card p-6">
                <h3 className="font-display text-lg font-semibold">{c.payment.t}</h3>
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
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
