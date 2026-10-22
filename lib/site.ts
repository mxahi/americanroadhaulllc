import home from "./content-home.json"
import about from "./content-about.json"
import contactPage from "./content-contact.json"
import carriers from "./content-carriers.json"
import privacy from "./content-privacy.json"
import posts from "./content-posts.json"
import svc from "./content-services.json"

export { siteUrl, contact, img, nav } from "./nav"
export { usmap, statesWithLoads } from "./map"
export type { LoadsData } from "./map"
export { home, about, contactPage, carriers, privacy, posts }

export type Post = (typeof posts)[number]
export type ServiceContent = typeof svc.mc

export const services = [
  { slug: svc.dp.slug, label: svc.dp.label, data: svc.dp },
  { slug: svc.mc.slug, label: svc.mc.label, data: svc.mc },
] as const

export const categories = [
  { slug: "press-release", label: "Press Release" },
  { slug: "people-and-culture", label: "People and Culture" },
] as const

export const POSTS_PER_PAGE = 10
