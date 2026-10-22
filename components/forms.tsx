"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import carriers from "@/lib/content-carriers.json"
import contactPage from "@/lib/content-contact.json"
import type { services } from "@/lib/site"
import { mailto } from "@/lib/mail"
import { Dot } from "./ui"

type Data = FormData

/** Opens the visitor's mail app with the form's answers filled in (the site has no mail server of its own). */
function useMailForm(subject: string, rows: (f: Data) => [string, string | undefined | null][]) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    window.location.href = mailto(subject, rows(f))
    setSent(true)
  }
  return { sent, submit }
}

const v = (f: Data, k: string) => (f.get(k) ? String(f.get(k)) : "")

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`mb-1.5 block text-sm font-medium ${className}`}>{children}</span>
}

function Notice({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <p role="status" className="mt-3 text-sm text-muted">
      Your email app opened with the details filled in — press send there to finish.
    </p>
  )
}

export function SubscribeForm({ className = "" }: { className?: string }) {
  const { sent, submit } = useMailForm("Subscribe", (f) => [["Email", v(f, "email")]])
  return (
    <form onSubmit={submit} className={className}>
      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email address"
          autoComplete="email"
          className="field !border-white/20 !bg-white/5 !text-[#f3f0e8] placeholder:!text-white/50"
        />
      </label>
      <button type="submit" className="btn btn-primary mt-3 w-full">
        Submit <Dot />
      </button>
      {sent && <p className="mt-3 text-xs text-white/60">Your email app opened — press send to finish.</p>}
    </form>
  )
}

export function ContactForm() {
  const c = contactPage
  const { sent, submit } = useMailForm("Contact us", (f) => [
    ["First name", v(f, "first")],
    ["Last name", v(f, "last")],
    ["Email", v(f, "email")],
    ["Phone number", v(f, "phone")],
    ["Company name", v(f, "company")],
    ["Subject", v(f, "subject")],
    ["Message", v(f, "message")],
  ])
  return (
    <form onSubmit={submit} className="card p-7 md:p-9">
      <p className="text-lg font-medium leading-snug">{c.formIntro}</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label>
          <Label>{c.labels.first}</Label>
          <input name="first" required placeholder={c.labels.first} autoComplete="given-name" className="field" />
        </label>
        <label>
          <Label>{c.labels.last}</Label>
          <input name="last" required placeholder={c.labels.last} autoComplete="family-name" className="field" />
        </label>
        <label>
          <Label>{c.labels.email}</Label>
          <input name="email" type="email" required placeholder={c.labels.email} autoComplete="email" className="field" />
        </label>
        <label>
          <Label>{c.labels.phone}</Label>
          <input name="phone" type="tel" required placeholder={c.labels.phone} autoComplete="tel" className="field" />
        </label>
        <label className="sm:col-span-2">
          <Label>{c.labels.company}</Label>
          <input name="company" required placeholder={c.labels.company} autoComplete="organization" className="field" />
        </label>
        <label className="sm:col-span-2">
          <Label>{c.labels.subject}</Label>
          <select name="subject" required defaultValue="" className="field">
            <option value="" disabled>
              {c.labels.subject}
            </option>
            {c.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <Label>{c.labels.message}</Label>
          <textarea name="message" rows={5} placeholder={c.labels.message} className="field resize-y" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-7">
        {c.submit} <Dot />
      </button>
      <Notice show={sent} />
    </form>
  )
}

const phoneFields = new Set(["Phone", "City", "MC#", "USDOT#", "FEIN/SSN"])

export function CarrierForm() {
  const c = carriers
  const { sent, submit } = useMailForm("Carrier Setup", (f) => [
    ...c.fields.map((fl, i): [string, string] => [fl.label, v(f, `f${i}`)]),
    [c.equipment.label, v(f, "equipment")],
    [c.factor.label, v(f, "factor")],
    [c.mcLetter, (f.get("mc") as File | null)?.name ? `${(f.get("mc") as File).name} (please attach it to this email)` : ""],
    [c.states.label, v(f, "states")],
  ])
  return (
    <form onSubmit={submit} className="card p-7 md:p-9">
      <p className="text-lg font-medium leading-snug">{c.formIntro}</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {c.fields.map((fl, i) => (
          <label key={fl.label} className={i < 3 ? "sm:col-span-2" : ""}>
            <Label>{fl.label}</Label>
            <input
              name={`f${i}`}
              required
              type={fl.label === "Email" ? "email" : phoneFields.has(fl.label) ? "tel" : fl.label.startsWith("Number") ? "number" : "text"}
              min={fl.label.startsWith("Number") ? 0 : undefined}
              placeholder={fl.placeholder}
              className="field"
            />
          </label>
        ))}
        <label>
          <Label>{c.equipment.label}</Label>
          <select name="equipment" required defaultValue="" className="field">
            <option value="" disabled>
              {c.equipment.label}
            </option>
            {c.equipment.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label>
          <Label>{c.factor.label}</Label>
          <select name="factor" required defaultValue="" className="field">
            <option value="" disabled>
              {c.factor.label}
            </option>
            {c.factor.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <Label>{c.mcLetter}</Label>
          <input name="mc" type="file" required className="field file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-accent-ink" />
        </label>
        <label className="sm:col-span-2">
          <Label>{c.states.label}</Label>
          <input name="states" required placeholder={c.states.placeholder} className="field" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-7">
        {c.submit} <Dot />
      </button>
      <Notice show={sent} />
    </form>
  )
}

export function InquiryForm({ inquiry, service }: { inquiry: (typeof services)[number]["data"]["inquiry"]; service: string }) {
  const { sent, submit } = useMailForm(`Inquiry - ${service}`, (f) => [
    ["Name", v(f, "name")],
    ["Company Name", v(f, "company")],
    ["Email", v(f, "email")],
    ["Message", v(f, "message")],
  ])
  return (
    <form onSubmit={submit} className="card p-7 md:p-8">
      <h3 className="font-display text-2xl font-semibold">{inquiry.title}</h3>
      <div className="mt-6 grid gap-4">
        <label>
          <Label>{inquiry.name}</Label>
          <input name="name" required placeholder={inquiry.name} autoComplete="name" className="field" />
        </label>
        <label>
          <Label>{inquiry.company}</Label>
          <input name="company" required placeholder={inquiry.company} autoComplete="organization" className="field" />
        </label>
        <label>
          <Label>{inquiry.email}</Label>
          <input name="email" type="email" required placeholder={inquiry.email} autoComplete="email" className="field" />
        </label>
        <label>
          <Label>{inquiry.message}</Label>
          <textarea name="message" rows={4} placeholder={inquiry.message} className="field resize-y" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full">
        {inquiry.submit} <Dot />
      </button>
      <Notice show={sent} />
    </form>
  )
}
