import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryView, categoryTitle, newsPageCount } from "@/components/CategoryView"

export const dynamicParams = false

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, newsPageCount() - 1) }, (_, i) => ({ n: String(i + 2) }))
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const { n } = await params
  return { title: categoryTitle("News", Number(n), newsPageCount()) }
}

export default async function NewsPagedPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const page = Number(n)
  if (!Number.isInteger(page) || page < 2 || page > newsPageCount()) notFound()
  return <CategoryView page={page} />
}
