import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Post } from "@/lib/site"
import { Pic } from "./ui"

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/${post.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Pic
          src={post.cover}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow self-start !px-2.5 !py-1 !text-[11px]">{post.category}</span>
        <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-accent">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm text-muted">{post.date}</p>
        <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent">
          Read more <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  )
}
