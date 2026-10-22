"use client"

import { useState, type FormEvent } from "react"
import { mailto } from "@/lib/mail"
import { Dot } from "./ui"

/** The old site's "What do you think? / Leave a Reply" form. Comments arrive by email (no database on this site). */
export function CommentForm({ title }: { title: string }) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    window.location.href = mailto(`Comment on: ${title}`, [
      ["Comment", String(f.get("comment") ?? "")],
      ["Name", String(f.get("author") ?? "")],
      ["Email", String(f.get("email") ?? "")],
      ["Website", String(f.get("url") ?? "")],
    ])
    setSent(true)
  }
  const req = <span className="text-accent">*</span>
  return (
    <section className="mx-auto mt-14 max-w-3xl">
      <h5 className="font-display text-lg font-semibold text-muted">What do you think?</h5>
      <h5 className="mt-2 font-display text-2xl font-semibold">Leave a Reply</h5>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <p className="text-sm text-muted">
          Your email address will not be published. Required fields are marked {req}
        </p>
        <label>
          <span className="mb-1.5 block text-sm font-medium">Comment {req}</span>
          <textarea name="comment" rows={6} maxLength={65525} required className="field resize-y" />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-1.5 block text-sm font-medium">Name {req}</span>
            <input name="author" type="text" required maxLength={245} autoComplete="name" className="field" />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium">Email {req}</span>
            <input name="email" type="email" required maxLength={100} autoComplete="email" className="field" />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium">Website</span>
            <input name="url" type="url" maxLength={200} autoComplete="url" className="field" />
          </label>
        </div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input name="cookies" type="checkbox" value="yes" className="mt-1 h-4 w-4 accent-[var(--accent)]" />
          Save my name, email, and website in this browser for the next time I comment.
        </label>
        <button type="submit" className="btn btn-primary self-start">
          Post Comment <Dot />
        </button>
        {sent && <p role="status" className="text-sm text-muted">Your email app opened with the comment filled in — press send there to finish.</p>}
      </form>
    </section>
  )
}
