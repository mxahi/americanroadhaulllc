import { contact } from "./nav"

/** Builds a mailto: link that opens the visitor's mail app with the form's details filled in. */
export function mailto(subject: string, rows: [string, string | undefined | null][]) {
  const body = rows
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`)
    .join("\n")
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
