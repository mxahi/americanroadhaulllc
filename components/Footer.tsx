import Link from "next/link"
import { Check, Mail, Phone } from "lucide-react"
import { contact } from "@/lib/site"
import { Dot } from "./ui"
import { Logo } from "./Header"
import { SubscribeForm } from "./forms"

const company: [string, string][] = [
  ["About", "/about"],
  ["Contact us", "/contact-us"],
  ["Blog", "/category/news"],
  ["FAQ", "/contact-us"],
]

export function Footer() {
  return (
    <footer className="bg-[#0a1a3a] text-[#f3f3f1]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.3fr]">
          <div>
            <Logo onDark footer />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Unleashing a symphony of courier brilliance across every corner
            </p>
            <Link href="/contact-us" className="btn btn-primary mt-6">
              Contact Us <Dot />
            </Link>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Company</h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              {company.map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="transition hover:text-accent">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Need help?</h3>
            <p className="mt-5 text-sm text-white/60">Toll Free</p>
            <a href={contact.phoneHref} className="mt-1 flex items-center gap-2 font-semibold text-accent">
              <Phone size={17} /> {contact.phone}
            </a>
            <p className="mt-4 text-sm text-white/60">Operating Hours</p>
            <p className="mt-1 text-sm font-medium">24 Hours, 7 Days a Week</p>
            <p className="mt-4 text-sm text-white/60">Have a question?</p>
            <a href={contact.emailHref} className="mt-1 flex items-center gap-2 text-sm text-white/80 hover:text-accent">
              <Mail size={16} /> {contact.email}
            </a>
          </div>

          <div>
            <ul className="grid gap-3 text-sm text-white/75">
              {["100% Licensed/ Bonded/Insured", "Local and international delivery", "Trusted & Secure", "Always on time"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <SubscribeForm className="mt-7" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-sm text-white/55">©2026 American Road Haul LLC. All rights reserved.</div>
      </div>
    </footer>
  )
}
