import type { Metadata } from "next"
import { CategoryView, categoryTitle } from "@/components/CategoryView"

export const metadata: Metadata = { title: categoryTitle("News") }

export default function NewsPage() {
  return <CategoryView />
}
