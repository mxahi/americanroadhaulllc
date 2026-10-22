import { posts, services } from "./site"

export type SearchEntry = { title: string; href: string; text: string }

/** Pages and articles the header search looks through (loaded only when the search box is opened). */
export const searchIndex: SearchEntry[] = [
  { title: "Home", href: "/", text: "" },
  { title: "About", href: "/about", text: "" },
  ...services.map((s) => ({ title: s.label, href: `/${s.slug}`, text: s.data.h2 })),
  { title: "Carriers", href: "/carriers", text: "" },
  { title: "Contact us", href: "/contact-us", text: "" },
  { title: "Privacy Policy", href: "/privacy-policy", text: "" },
  ...posts.map((p) => ({ title: p.title, href: `/${p.slug}`, text: p.body.map((b) => b.x).join(" ") })),
]
