export const siteUrl = "https://americanroadhaulllc.com"

export const contact = {
  name: "American Road Haul LLC",
  phone: "(239) 376-5766",
  phoneHref: "tel:+2393765766",
  email: "info@americanroadhaulllc.com",
  emailHref: "mailto:info@americanroadhaulllc.com",
}

/** Static assets copied from the old site's wp-content/uploads folder. */
export const img = (p: string) => `/old/${p}`

/** The two service pages, in the same order and with the same labels as the old site menu. */
export const serviceLinks = [
  { slug: "dispatch-for-po", label: "Dispatch for PO" },
  { slug: "mc-leasing-authority-solutions", label: "MC Leasing / Authority Solutions" },
] as const

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Carriers", href: "/carriers" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const
