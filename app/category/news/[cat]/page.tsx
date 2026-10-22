import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryView, categoryTitle } from "@/components/CategoryView"
import { categories } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((c) => ({ cat: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params
  const c = categories.find((x) => x.slug === cat)
  return c ? { title: categoryTitle(c.label) } : {}
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params
  const category = categories.find((x) => x.slug === cat)
  if (!category) notFound()
  return <CategoryView category={category} />
}
