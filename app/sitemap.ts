import type { MetadataRoute } from "next"
import { categories, posts, services, siteUrl } from "@/lib/site"
import { newsPageCount } from "@/components/CategoryView"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy-policy", "/about", "/contact-us", "/carriers", ...services.map((s) => `/${s.slug}`)]
  const news = [
    "/category/news",
    ...Array.from({ length: newsPageCount() - 1 }, (_, i) => `/category/news/page/${i + 2}`),
    ...categories.map((c) => `/category/news/${c.slug}`),
  ]
  return [...pages, ...posts.map((p) => `/${p.slug}`), ...news].map((p) => ({ url: `${siteUrl}${p}` }))
}
