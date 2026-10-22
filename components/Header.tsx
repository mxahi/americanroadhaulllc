"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, Mail, Menu, Phone, Search, X } from "lucide-react"
import { contact, img, nav, serviceLinks as services } from "@/lib/nav"
import { ThemeToggle } from "./ThemeToggle"
import { SearchPopup } from "./Popups"

export function Logo({ className = "", onDark = false, footer = false }: { className?: string; onDark?: boolean; footer?: boolean }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="American Road Haul LLC home">
      <span className={`block overflow-hidden rounded-lg ${onDark ? "bg-white px-1.5" : ""}`}>
        <Image
          src={img(footer ? "2024/09/cdf6dbaa-76c9-4b95-a1b6-3f3598a21a29-removebg-preview-1.png" : "2026/06/cdf6dbaa-76c9-4b95-a1b6-3f3598a21a29-removebg-preview.png")}
          alt="American Road Haul LLC"
          width={612}
          height={408}
          className="h-[58px] w-auto"
          priority
        />
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [popup, setPopup] = useState<null | "search">(null)

  // Close menus after navigating (adjusting state during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
    setMenu(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const active = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href))
  const onService = services.some((s) => pathname.startsWith(`/${s.slug}`))
  const link = (href: string, on = active(href)) =>
    `whitespace-nowrap rounded-lg px-4 py-2 text-[15px] font-medium transition hover:text-accent ${on ? "text-accent" : ""}`

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-accent text-[13px] font-semibold text-white md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <a href={contact.emailHref} className="flex items-center gap-2 hover:underline">
            <Mail size={14} /> {contact.email}
          </a>
          <a href={contact.phoneHref} className="flex items-center gap-2 hover:underline">
            <Phone size={14} /> {contact.phone}
          </a>
        </div>
      </div>

      <div className="bg-[#0a1a3a] text-white">
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Logo onDark />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {nav.map((n) =>
              n.label === "Services" ? (
                <div key={n.href} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                  <Link href={n.href} className={`flex items-center gap-1 ${link(n.href, onService)}`}>
                    {n.label} <ChevronDown size={14} className={`transition ${menu ? "rotate-180" : ""}`} />
                  </Link>
                  <div
                    className={`absolute left-0 top-full w-80 pt-3 transition ${
                      menu ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
                    }`}
                  >
                    <ul className="card p-2 shadow-[var(--shadow)]">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/${s.slug}`} className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-2">
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={link(n.href)}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPopup("search")} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-lg border border-white/25 text-white transition hover:border-white">
              <Search size={18} />
            </button>
            <ThemeToggle />
            <Link href="/contact-us" className="btn btn-primary hidden md:inline-flex">
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/25 text-white xl:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {popup === "search" && <SearchPopup onClose={() => setPopup(null)} />}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-transform duration-300 xl:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-[76px] items-center justify-between border-b border-line">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line"
          >
            <X size={20} />
          </button>
        </div>
        <div className="container-x h-[calc(100%-76px)] overflow-y-auto pb-10">
          <ul className="divide-y divide-line">
            {nav.map((n) => (
              <li key={n.href} className="py-4">
                <Link href={n.href} className="block font-display text-xl font-semibold">
                  {n.label}
                </Link>
                {n.label === "Services" && (
                  <ul className="mt-3 grid gap-2 pl-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} className="text-sm text-muted hover:text-accent">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact-us" className="btn btn-primary mt-6 w-full">
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  )
}
